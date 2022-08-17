using Core.Helpers;
using eCommerce.Utility;
using Entities.Enums;
using Entities.ViewModels.Accounts;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Services.Interfaces;

namespace eCommerce.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly JwtHandler _jwtHandler;
        private readonly IAccountService _accountService;
        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager, 
            IAccountService accountService,
            RoleManager<IdentityRole> roleManager,
            JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _accountService = accountService;
            _roleManager = roleManager;
            _jwtHandler = jwtHandler;
        }


        // route is like that cuz we are using ajax url in script.js !
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(AccountViewModel viewModel)
        {
            if (_signInManager.IsSignedIn(User))
            {
                viewModel.ErrorMessage = "You already have logged in.";

                return NotFound(viewModel.ErrorMessage);
            }

            // valid problems
            // viewModel.ConfirmPassword = viewModel.Password;

            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                //var result = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, Input.RememberMe, lockoutOnFailure: false);

                User user = await _userManager.FindByEmailAsync(viewModel.Email);

                if (user is null)
                {
                    viewModel.ErrorMessage = "There is no user with this email.";

                    return NotFound(viewModel.ErrorMessage);
                }
                var result = await _signInManager.PasswordSignInAsync(user?.UserName, viewModel.Password, viewModel.RememberMe, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    //  var signingCredentials = _jwtHandler.GetSigningCredentials();
                    // var claims = _jwtHandler.GetClaims(user);
                    // var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
                    // var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    string token = _accountService.CreateJwt(user);
                    return Ok(new { IsAuthSuccessful = true, Token = token });
                }

                if (result.IsLockedOut)
                {
                    viewModel.ErrorMessage = "This profile is locked for 24 hours.";

                    return NotFound(viewModel.ErrorMessage);
                }
                else
                {
                    if (user?.EmailConfirmed != true)
                    {
                        viewModel.ErrorMessage = "Please confirm your email adress.";
                    }
                    else
                    {
                        viewModel.ErrorMessage = "Error occured, please try again later.";
                    }
                    return NotFound(viewModel.ErrorMessage);
                }
            }  

            viewModel.ErrorMessage = "Error occured, wrong email or password.";
            return NotFound(viewModel.ErrorMessage);
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] AccountViewModel viewModel)
        {
            if (_signInManager.IsSignedIn(User))
            {
                viewModel.ErrorMessage = "You already have logged in.";
                return NotFound(viewModel.ErrorMessage);
            }

            if (ModelState.IsValid)
            {

                var user = new User
                {
                    isExternal = false,
                    Email = viewModel.Email,
                    UserName = StringHelper.GetUntilOrEmpty(viewModel.Email, "@"),
                    FirstName = viewModel.FirstName,
                    LastName = viewModel.LastName,
                    PictureName = "200x200.jpg"
                };



                var result = await _userManager.CreateAsync(user, viewModel.Password);
                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var email = await _userManager.GetEmailAsync(user);

                    var callbackUrl = Url.Page(
                        "/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { userId = user.Id, code = code },
                        protocol: Request.Scheme);

                  //  await _senderService.SendEmailAsync(email, "Потвърди емайл адрес", callbackUrl);
                    var count = await _userManager.Users.FirstOrDefaultAsync();//.CountAsync().ConfigureAwait(false);

                    if (count == null)
                    {
                       // await CreateRole();
                        //await _userManager.AddToRoleAsync(user, "Admin");
                       // await _userManager.RemoveFromRoleAsync(user, "User");

                        user.profileConfirmed = true;
                        user.EmailConfirmed = true;
                        user.Role = Roles.Admin;
                    }
                    else
                    {
                        //await CreateRole();
                        //await _userManager.AddToRoleAsync(user, "User");
                        user.Role = Roles.User;     
                    }


                    if (_userManager.Options.SignIn.RequireConfirmedAccount)
                    {
                        viewModel.ErrorMessage = "Please confirm your email first.";
                        return NotFound(viewModel);
                        //return RedirectToPage("RegisterConfirmation", new { email = viewModel.Email, /*returnUrl = returnUrl*/ });
                    }
                    else
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return Ok(user);
                    }

                }
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            viewModel.ErrorMessage = "Error occured, try again later.";
            return NotFound(viewModel.ErrorMessage);
        }

        [HttpPost]
        //[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return NotFound($"Unable to load user with ID '{_userManager.GetUserId(User)}'.");
            }

            if (_signInManager.IsSignedIn(User))
            {
                await _signInManager.SignOutAsync();
                HttpContext.Response.Cookies.Delete(".AspNetCore.Cookies");
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
       // [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        [Route("get-user")]
        public async Task<IActionResult> GetUser([FromHeader] string accessToken)
        {
            string userId = _accountService.ValidateToken(accessToken);

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(null);
            }

            return Ok(user);
        }


        private async Task CreateRole()
        {
            await _roleManager.CreateAsync(new IdentityRole("Admin"));
            await _roleManager.CreateAsync(new IdentityRole("Moderator"));
            await _roleManager.CreateAsync(new IdentityRole("Vendor"));
            await _roleManager.CreateAsync(new IdentityRole("User"));
        }

    }
}
