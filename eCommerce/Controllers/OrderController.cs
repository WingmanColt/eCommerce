using Entities.Models;
using Entities.ViewModels;
using HireMe.StoredProcedures.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace eCommerce.Controllers
{
    // [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IspOrder _spOrderService;

        private readonly string itemNotFound = "The order is not found.";
        private readonly string userNotFound = "User is not found.";
        private readonly string noResults = "There is no results to show.";

        public OrderController(IAccountService accountService, IspOrder spOrderService)
        {
            _accountService = accountService;
            _spOrderService = spOrderService;
        }


        [HttpGet]
        [AllowAnonymous]
        [Route("info/{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var entity = await _spOrderService.GetByIdAsync<OrderVW>(id);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }

        [HttpPost]
        [Route("add-order")]
        public async Task<IActionResult> Create([FromHeader] string accessToken, [FromBody] OrderInput Input)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var entity = await _spOrderService.CRUD(Input, ActionEnum.Create, true, "NotMapped", userId);
            if (!entity.Success)
            {
                return Ok(entity.Exception);
            }

            return this.Ok(entity);
        }


        [HttpPost]
        [Route("delete-order")]
        public async Task<IActionResult> Delete(Order order, [FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var entity = await _spOrderService.CRUD(new { Id = order.Id }, ActionEnum.Delete, false, null, userId);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }
    }
}