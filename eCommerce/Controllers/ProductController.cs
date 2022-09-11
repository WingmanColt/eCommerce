using Core.Helpers;
using Entities;
using Entities.Enums;
using Entities.Models;
using Entities.ViewModels.Products;
using HireMe.StoredProcedures.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.Interfaces;
using System.Linq;

namespace eCommerce.Controllers
{
    //[Authorize]
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IspProduct _spProductService;
        private readonly IAccountService _accountService;
        private readonly IProductExtensionService _extProductService;

        private readonly string itemNotFound = "The product is not found.";
        private readonly string userNotFound = "User is not found.";
        private readonly string noResults = "There is no results to show.";

        public ProductController(
            UserManager<User> userManager, 
            IspProduct spProductService, 
            IAccountService accountService, 
            IProductExtensionService extProductService)
        {
            _userManager = userManager;
            _spProductService = spProductService;
            _accountService = accountService;
            _extProductService = extProductService;
        }

        [HttpGet]
        [Route("listing")]
        public async Task<IActionResult> Index(int? categoryid = 0, string? SearchString = null)
        {
            var result = await _spProductService.GetAll2(new { Title = SearchString, Categoryid = categoryid }, GetActionEnum.GetAllFiltering, false, null);

            return Ok(result);
        }
        public class ProductByLocalStore
        {
            public int productId { get; set; }
            public int quantity { get; set; }
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("get-all-by-Ids")]
        public async Task<IActionResult> Details([FromBody] IAsyncEnumerable<ProductByLocalStore> products)
        {
            List<ProductVW> allProducts = new List<ProductVW>();

            ProductVW productEntity;
            await foreach (var product in products)
            {
                productEntity = await _spProductService.GetByIdAsync(product.productId);
                allProducts.Add(productEntity);
            }


          //  entity.Image = _extProductService.GetImagesAsync(entity.Id);
          //  entity.Variant = _extProductService.GetVariantsAsync(entity.Id);

            return this.Ok(allProducts);
        }
        [HttpGet]
        [AllowAnonymous]
<<<<<<< HEAD
        [Route("info")]
        public async Task<IActionResult> Details(string title)
        {
            var entity = await _spProductService.GetByTitleAsync<ProductVW>(title);

=======
        [Route("info/{title}")]
        public async Task<IActionResult> Details(string title)
        {
            var entity = await _spProductService.GetByTitleAsync<ProductVW>(title);
>>>>>>> f0b8104e1574131bfb7d46f64ab0d76e7a496190
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            entity.Image = _extProductService.GetImagesAsync(entity.Id);
            entity.Variant = _extProductService.GetVariantsAsync(entity.Id);

            return this.Ok(entity);
        }


        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromHeader] string accessToken, [FromBody] ProductInput Input)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound($"We cannot find this user.");
            }

            var entity = await _spProductService.CRUD(Input, ActionEnum.Create, true, "NotMapped", userId);
            if (entity.Success)
            {
                if (Input.Image.Any())
                {
                    var images = Input.Image
                        .Select(x => new Images { 
                        ProductId = (int)entity.Id,
                        Src = x.Src
                    }).AsQueryable();

                    OperationResult result = await _extProductService.CreateImage(images);
                }

                 if (Input.Variant.Any())
                 {
                    var variants = Input.Variant
                      .Select(x => new Variants
                      {
                          ProductId = (int)entity.Id,
                          Color = x.Color,
                          Size = x.Size,
                          //ImageId = result
                      }).AsQueryable();
                    OperationResult result = await _extProductService.CreateVariant(variants);
                 }

                return this.Ok(entity);
            }

            return NotFound(entity.FailureMessage);          
        }

        [HttpPut]
        [Route("update")]
        public async Task<IActionResult> Update([FromBody] ProductInput Input)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user is null)
            {
                return NotFound(userNotFound);
            }

            var entity = await _spProductService.CRUD(Input, ActionEnum.Update, true, "NotMapped", user.Id);
            if (!entity.Success)
            {
                return NotFound(entity.Exception);
            }

            return this.Ok(entity);
        }

        [HttpPost]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user is null)
            {
                return NotFound(userNotFound);
            }

            var entity = await _spProductService.CRUD(new { Id = id }, ActionEnum.Delete, false, null, user.Id);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }

        [HttpGet]
        [Route("getSpecialProduct")]
        public async Task<IActionResult> GetSpecialProduct()
        {
            var result = await _spProductService.GetAll<ProductVW>(null, GetActionEnum.GetSpecialProduct, false, null);
           
            IAsyncEnumerable<ProductVW> result2 = result;
            await foreach (var item in result)
            {
               var images = _extProductService.GetImagesAsync(item.Id);
               var variants = _extProductService.GetVariantsAsync(item.Id);

                result2 = result.Select(x => new ProductVW { 
                   Id = x.Id,
                   Title = x.Title, 
                   Price = x.Price,
                   Rating = x.Rating,   
                   Image = images,
                   Variant = variants,
                   Quantity = x.Quantity
                  });
            }


            
             return Ok(result2.Take(12));                
        }


    }
}