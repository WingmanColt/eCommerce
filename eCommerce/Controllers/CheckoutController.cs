using Core.Helpers;
using Entities.Models;
using HireMe.StoredProcedures.Enums;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace eCommerce.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IspOrder _spOrderService;
        private readonly IspCheckout _spCheckout;

        private readonly string checkoutNotFound = "Checkout details are not found.";

        private readonly string userNotFound = "User is not found.";
        private readonly string noResults = "There is no results to show.";

        public CheckoutController(
            IAccountService accountService, 
            IspOrder spOrderService, 
            IspCheckout spCheckout)
        {
            _accountService = accountService;
            _spOrderService = spOrderService;
            _spCheckout = spCheckout;
        }

        [HttpGet]
        [Route("get-checkout")]
        public async Task<IActionResult> GetCheckout([FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var checkout = await _spCheckout.GetByUserIdAsync<Checkout>(userId);
            if (checkout is null)
            {
                return Ok(checkoutNotFound);
            }

            return Ok(checkout);
        }

        [HttpPost]
        [Route("add-checkout")]
        public async Task<IActionResult> Create([FromHeader] string accessToken, [FromBody] CheckoutInput Input)
        {
            string userId = _accountService.ValidateToken(accessToken);
            OperationResult _oResult; 
            if (String.IsNullOrEmpty(userId) && !Input.IsGuest)
            {
                return NotFound(userNotFound);
            }
            var entity = await _spCheckout.CRUD(Input, ActionEnum.Create, true, "NotMapped", userId);
            if (entity.Success)
            {
                foreach (var order in Input.Orders)
                {
                    order.CheckoutId = (int)entity.Id;
                    _oResult = await _spOrderService.CRUD(order, ActionEnum.Create, true, "NotMapped", userId);
                }
            }
            else return Ok(entity.FailureMessage);

           return this.Ok(entity);
        }


        [HttpPost]
        [Route("delete-checkout")]
        public async Task<IActionResult> Delete(Checkout checkout, [FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var entity = await _spCheckout.CRUD(checkout, ActionEnum.Delete, false, null, userId) ;
            if (entity is null)
            {
                return Ok(checkoutNotFound);
            }

            return this.Ok(entity);
        }
    }
}