using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class JwtSetting
    {
        public string? Secret { get; set; }
        public string? AllowedIPAddresses { get; set; }
    }

    public class AccountService : IAccountService
    {
        private readonly string _secret = "SexOnTeBeachSecretKey";
        public AccountService(IConfiguration config)
        {
            //_secret = config.GetSection("JWTSettings").GetSection("securityKey").ToString();
        }

        public string CreateJwt(User accountUser)
        {
            var key = Encoding.ASCII.GetBytes("SexOnTeBeachSecretKey");

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Expires = DateTime.Now.AddDays(20),
                Subject = new ClaimsIdentity(new Claim[]
                   {
                      // new Claim(ClaimTypes.Name, accountUser.Email),
                       new Claim(ClaimTypes.NameIdentifier, accountUser.Id.ToString())
                   }),
                SigningCredentials = new SigningCredentials(
                       new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature
                       )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);
            return jwt;
        }

        public string ValidateToken(string token)
        {
            if (String.IsNullOrEmpty(token))
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("SexOnTeBeachSecretKey"); 
            try
            {
                tokenHandler.ValidateToken(token.Replace(',', ' ').Replace('"', ' ').Trim(), new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = jwtToken.Claims.FirstOrDefault(x => x.Type == "nameid").Value;

                // return user id from JWT token if validation successful
                return userId;
            }
            catch
            {
                // return null if validation fails
                return null;
            }
        }
    }
}
