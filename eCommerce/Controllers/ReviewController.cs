using Entities.Models;
using HireMe.StoredProcedures.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

namespace eCommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IspReviews _spReviewService;

        private readonly string itemNotFound = "The review is not found.";

        public ReviewController(IspReviews spReviewService)
        {
            _spReviewService = spReviewService;
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("get-review")]
        public async Task<IActionResult> Details(Review review)
        {
            var entity = await _spReviewService.GetReviewsAsync<Review>(review.ProductId, review.sendToSupport);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }


        [HttpPost]
        [AllowAnonymous]
        [Route("get-review-count")]
        public async Task<IActionResult> Count(Review review)
        {
            var entity = await _spReviewService.GetAllCountBy(review.ProductId, review.sendToSupport);

            return this.Ok(entity);
        }


        [HttpPost]
        [Route("add-review")]
        public async Task<IActionResult> Create([FromBody] ReviewInput Input)
        {
            var entity = await _spReviewService.CRUD(Input, ActionEnum.Create, true, "NotMapped");
            if (!entity.Success)
            {
                return Ok(entity.Exception);
            }

            return this.Ok(entity);
        }


        [HttpPost]
        [Route("delete-review")]
        public async Task<IActionResult> Delete(Review review)
        {
            var entity = await _spReviewService.CRUD(new { ProductId = review.ProductId, Email = review.Email }, ActionEnum.Delete, false, null);
            if (entity is null)
            {
                return NotFound(itemNotFound);
            }

            return this.Ok(entity);
        }
    }
}