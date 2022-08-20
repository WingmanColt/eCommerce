using Entities.Models;
using Entities.ViewModels;
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

        private readonly string itemNotFound = "The cart item is not found.";
        private readonly string userNotFound = "User is not found.";
        private readonly string noResults = "There is no results to show.";

        public CartController(
            IAccountService accountService,
            IspCart spCartService)
        {
            _spCartService = spCartService;
            _accountService = accountService;   
        }

        [HttpGet]
        [Route("get-all")]
        public async Task<IActionResult> GetAll([FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var result = await _spCartService.GetAll<CartVW>(new { UserId =  userId}, GetActionEnum.GetAllBy, false, null);
            if (!await result.AnyAsync())
            {
                return NotFound(noResults);
            }

            return Ok(result);
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


        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete([FromHeader] string accessToken, int id)
        {
            string userId = _accountService.ValidateToken(accessToken);

            if (String.IsNullOrEmpty(userId))
            {
                return NotFound(userNotFound);
            }

            var entity = await _spCartService.CRUD(new { Id = id }, ActionEnum.Delete, false, null, userId);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }
    }
}