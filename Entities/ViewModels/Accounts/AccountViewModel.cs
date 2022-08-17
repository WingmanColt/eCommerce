using System.ComponentModel.DataAnnotations;

namespace Entities.ViewModels.Accounts
{

    public class AccountViewModel 
    {
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} password must be at least {2} and {1} characters.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
       // [Compare("Password", ErrorMessage = "Passwords dosen`t match.")]
        public string ConfirmPassword { get; set; }

        [StringLength(20, ErrorMessage = "{0} must be at least {2} and {1} characters", MinimumLength = 3)]
        [Display(Name = "Firstname")]
        public string FirstName { get; set; }

        [StringLength(20, ErrorMessage = "{0} must be at least {2} and {1} characters", MinimumLength = 3)]
        [Display(Name = "Lastname")]
        public string LastName { get; set; }

        [Display(Name = "Remember me")]
        public bool RememberMe { get; set; }

        public string ReturnUrl { get; set; }

        public string ErrorMessage { get; set; }
        //public IList<AuthenticationScheme> ExternalLogins { get; set; }

    }

}