using Entities.Models;
using HireMe.StoredProcedures.Enums;
using HireMe.StoredProcedures.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace eCommerce.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IspCategories _spCategories;

        public CategoriesController(IspCategories spCategories)
        {
            _spCategories = spCategories;
        }

        [HttpGet]
        [Route("get-categories")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _spCategories.GetAll<Category>(GetActionEnum.GetAll);

            return Ok(result);
        }

    }
}
