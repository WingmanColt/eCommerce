using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Enums
{
    public enum ApproveType : int
    {
        Waiting = 0,
        Rejected = 1,
        Success = 2
    }
    public enum Status : int
    {
        Available = 0,
        Sold = 1,
        Unavailable = 2,
        Archived = 3
    }
    public enum ItemType : int
    {
        Normal = 0,
        Bundle = 1,
        Digital = 2
    }
    public enum Gender : int
    {
        None = 0,
        Unisex = 1,
        Men = 2,
        Women = 3,
        Kids = 4
    }
    public enum PremiumPackage : int
    {
        [Display(Description = "#ECEDF2")]
        None = 0,
        [Display(Name = "Bronze", Description = "#7A4105", ShortName = "lab la-hotjar")]
        Bronze = 1,
        [Display(Name = "Silver", Description = "#9D9D9D", ShortName = "las la-rocket")]
        Silver = 2,
        [Display(Name = "Gold", Description = "#F1CC06", ShortName = "las la-crown", Prompt = "flash")]
        Gold = 3
    }
    public enum Roles : int
    {
        [Display(Name = "Потребител", Description = "#177dff", ShortName = "User")]
        User = 0,
        [Display(Name = "Продавач", Description = "#16b92b", ShortName = "Vendor")]
        Vendor = 1,
        [Display(Name = "Модератор", Description = "#16b92b", ShortName = "Moderator")]
        Moderator = 2,
        [Display(Name = "Администратор", Description = "#c72d2d", ShortName = "Admin")]
        Admin = 3
    }
    public static class EnumExtensions
    {
        public static string? GetDisplayName(this Enum enu)
        {
            var attr = GetDisplayAttribute(enu);
            return attr != null ? attr.Name : enu.ToString();
        }
        public static string? GetDescription(this Enum enu)
        {
            var attr = GetDisplayAttribute(enu);
            return attr != null ? attr.Description : enu.ToString();
        }

        public static string? GetShortName(this Enum enu)
        {
            var attr = GetDisplayAttribute(enu);
            return attr != null ? attr.ShortName : enu.ToString();
        }
        private static DisplayAttribute GetDisplayAttribute(object value)
        {
            Type type = value.GetType();
            if (!type.IsEnum)
            {
                throw new ArgumentException(string.Format("Type {0} is not an enum", type));
            }

            // Get the enum field.
            var field = type.GetField(value.ToString());
            return field == null ? null : field.GetCustomAttribute<DisplayAttribute>();
        }
    }
}
