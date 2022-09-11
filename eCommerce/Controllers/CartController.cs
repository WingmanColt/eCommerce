using Entities.Models;
using Entities.ViewModels;
using Entities.ViewModels.Products;
using HireMe.StoredProcedures.Enums;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace eCommerce.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IspCart _spCartService;
        private readonly IspProduct _spProductService;
        private readonly ICartItemService _cartItemService;
        private readonly IProductExtensionService _extProductService;

        private readonly string cartNotFound = "The cart is not found.";
        private readonly string itemNotFound = "The cart item is not found.";
        private readonly string userNotFound = "User is not found.";
        private readonly string noResults = "There is no results to show.";

        public CartController(
            IAccountService accountService,
            ICartItemService cartItemService,
            IspProduct spProductService,
            IProductExtensionService extProductService,
            IspCart spCartService)
        {
            _spCartService = spCartService;
            _spProductService = spProductService;
            _accountService = accountService;
            _cartItemService = cartItemService;
            _extProductService = extProductService;
        }
        [HttpGet]
        [Route("get-cart")]
        public async Task<IActionResult> GetCart([FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var cart = await _spCartService.GetByUserIdAsync<CartVW>(userId);
            if (cart is null)
            {
                return NotFound(cartNotFound);
            }

            return Ok(cart);
        }
        [HttpGet]
        [Route("get-cart-items")]
        public async Task<IActionResult> GetAll([FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var cart = await _spCartService.GetByUserIdAsync<CartVW>(userId);
            if (cart is null)
            {
                return Ok(cartNotFound);
            }

            cart.CartItems = _cartItemService.GetAllByCart(cart.Id);
            if (!await cart.CartItems.AnyAsync())
            {
                return Ok(noResults);
            }

            return Ok(cart.CartItems);
        }

        [HttpGet]
        [Route("get-all-bycart")]
        public async Task<IActionResult> GetAllProductsByCart([FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }
            var cartVW = new CartVW();

            cartVW = await _spCartService.GetByUserIdAsync<CartVW>(userId);
            if (cartVW is null)
            {
                return NotFound(cartNotFound);
            }

            cartVW.CartItems = _cartItemService.GetAllByCart(cartVW.Id);
            if (!await cartVW.CartItems.AnyAsync())
            {
                return NotFound(noResults);
            }

            List<ProductVW> productsList = new List<ProductVW>();
            ProductVW product;
            await foreach (var entity in cartVW.CartItems)
            {
                product = await _spProductService.GetByIdAsync(entity.ProductId).ConfigureAwait(true);
                if(product is not null)
                    productsList.Add(product);
            }

            cartVW.Products = productsList;

            return Ok(cartVW);
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromHeader] string accessToken, [FromBody] CartInput Input)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var entity = await _spCartService.CRUD(Input, ActionEnum.Create, true, "NotMapped", userId);
            if (!entity.Success)
            {
                return NotFound(entity.Exception);
            }

            return this.Ok(entity);
        }

        [HttpPost]
        [Route("add-item")]
        public async Task<IActionResult> CreateCartItem([FromHeader] string accessToken, [FromBody] CartItem Input)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var cart = await _spCartService.GetByUserIdAsync<CartVW>(userId);
            if (cart is null)
            {
                return NotFound(cartNotFound);
            }

            Input.CartId = cart.Id;
            var entity = await _cartItemService.Create(Input);
            if (!entity.Success)
            {

                return Ok(entity);
            }

            
            return Ok(entity);
        }


        [HttpPost]
        [Route("delete-item")]
        public async Task<IActionResult> Delete(Product product, [FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var entity = await _cartItemService.Delete(product.Id);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }
    }
}