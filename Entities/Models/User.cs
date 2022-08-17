using Entities.Enums;
using Microsoft.AspNetCore.Identity;

namespace Models
{
    public class User : IdentityUser
    {
        [PersonalData]
        public string FirstName { get; set; }

        [PersonalData]
        public string LastName { get; set; }

        public string PictureName { get; set; }

        [PersonalData]
        public bool profileConfirmed { get; set; }

        [PersonalData]
        public bool isExternal { get; set; }
        public bool ActivityReaded { get; set; } = true;

        public Roles Role { get; set; }
        public DateTime ActivityOn { get; set; }


        public double Points { get; set; } = 0;

        // Settings
        public bool EmailNotifyEnable { get; set; } = true;
        public bool SignInSocialEnable { get; set; } = true;

    }
}