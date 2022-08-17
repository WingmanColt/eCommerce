using System.ComponentModel.DataAnnotations;

namespace HireMe.StoredProcedures.Enums
{
    public enum ContestantCrudActionEnum : int
    {
        None = 0,

        [Display(Name = "Create")]
        Create = 1,

        [Display(Name = "Update")]
        Update = 2,

        [Display(Name = "Delete")]
        Delete = 3,

        [Display(Name = "UpdatePromotion")]
        UpdatePromotion = 4,

        [Display(Name = "RefreshDate")]
        RefreshDate = 5,

        [Display(Name = "UpdateUser")]
        UpdateUser = 6
    }

    public enum ContestantGetActionEnum : int
    {
        None = 0,

        [Display(Name = "GetAllFiltering")]
        GetAllFiltering = 1,

        [Display(Name = "GetAllBy")]
        GetAllBy = 2,

        [Display(Name = "GetAllForDashboard")]
        GetAllForDashboard = 3,

        [Display(Name = "GetTop")]
        GetTop = 4,

        [Display(Name = "GetLast")]
        GetLast = 5
    }
}
