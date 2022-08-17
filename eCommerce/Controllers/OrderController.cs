using Entities;
using Entities.Models;
using Entities.ViewModels;
using HireMe.StoredProcedures.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using Services.Interfaces;

namespace eCommerce.Controllers
{
   // [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IspOrder _spOrderService;

        private readonly string itemNotFound = "The order is not found.";
        private readonly string userNotFound = "User is not found.";
        private readonly string noResults = "There is no results to show.";

        public OrderController(UserManager<User> userManager, IspOrder spOrderService)
        {
            _userManager = userManager;
            _spOrderService = spOrderService;
        }

        [HttpGet]
        [Route("orders/listing")]
        public async Task<IActionResult> Index(int currentPage = 1, int categoryid = 0, string SearchString = null, string LocationId = null)
        {
            // var filter = new Filter();
            var viewModel = new OrderVW
            {
               // AllLocations = _locationService.GetAllSelectList(),
              //  AllCategories = _categoriesService.GetAllSelectList()
            };


            viewModel.Result = await _spOrderService.GetAll<OrderVW>(new { Name = SearchString, Location = LocationId, Categoryid = categoryid }, GetActionEnum.GetAllFiltering, false, null);

            if (await viewModel.Result.AnyAsync()) // prevent 'SqlException: The offset specified in a OFFSET clause may not be negative.'
            {
                int count = await viewModel.Result.CountAsync().ConfigureAwait(false);
                viewModel.Pager = new Pager(count, currentPage);

                viewModel.Result = viewModel.Result
                .Skip((viewModel.Pager.CurrentPage - 1) * viewModel.Pager.PageSize)
                .Take(viewModel.Pager.PageSize);
            }
            else return NotFound(noResults);

            return Ok(viewModel);
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("order/info/{id}")]
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
        [Route("order/create")]
        public async Task<IActionResult> Create([FromBody] OrderInput Input)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user is null)
            {
                return NotFound(userNotFound);
            }

            var entity = await _spOrderService.CRUD(Input, ActionEnum.Create, true, "NotMapped", user);
            if (!entity.Success)
            {
                return NotFound(entity.Exception);
            }

            return this.Ok(entity);
        }

        [HttpPut]
        [Route("order/update")]
        public async Task<IActionResult> Update([FromBody] OrderInput Input)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user is null)
            {
                return NotFound(userNotFound);
            }

            var entity = await _spOrderService.CRUD(Input, ActionEnum.Update, true, "NotMapped", user);
            if (!entity.Success)
            {
                return NotFound(entity.Exception);
            }

            return this.Ok(entity);
        }

        [HttpDelete]
        [Route("order/delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user is null)
            {
                return NotFound(userNotFound);
            }

            var entity = await _spOrderService.CRUD(new { Id = id }, ActionEnum.Delete, false, null, user);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }
    }
}