using System.ComponentModel.DataAnnotations;

namespace HireMe.StoredProcedures.Enums
{
    public enum ActionEnum : int
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

    public enum GetActionEnum : int
    {
        None = 0,

        [Display(Name = "GetAllFiltering")]
        GetAllFiltering = 1,

        [Display(Name = "GetAllBy")]
        GetAllBy = 2,

        [Display(Name = "GetAll")]
        GetAll = 3,

        [Display(Name = "GetSpecialProduct")]
        GetSpecialProduct = 4,

        [Display(Name = "GetSpecialProduct_2")]
        GetSpecialProduct_2 = 5,

        [Display(Name = "GetSpecialProduct_3")]
        GetSpecialProduct_3 = 6
    }
}
