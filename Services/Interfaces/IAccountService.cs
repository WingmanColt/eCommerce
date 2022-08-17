using Models;

namespace Services.Interfaces
{
    public interface IAccountService
    {
        string CreateJwt(User accountUser);
        string ValidateToken(string token);
    }
}