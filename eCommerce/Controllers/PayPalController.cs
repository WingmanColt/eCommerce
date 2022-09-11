using Core.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Payments;
using Payments.Models;

namespace eCommerce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PayPalController : ControllerBase
    {
        private readonly PaypalClient _paypalClient;

        private readonly string _webDomain;
        private readonly string _clientID;
        private readonly string _clientSecret;

        public PayPalController(IConfiguration config, PaypalClient paypalClient)
        {
            _paypalClient = paypalClient;
            
            _webDomain = config.GetValue<string>("JWTSettings:validAudience");
            _clientID = config.GetValue<string>("PayPal:ClientId");
            _clientSecret = config.GetValue<string>("PayPal:ClientSecret");
        }


        [HttpPut]
        [AllowAnonymous]
        [Route("create-paypal")]
        public async Task<IActionResult> Create([FromBody] PaypPalInput input)
        {
            AccessToken? accesstoken = await _paypalClient.GetToken(_clientID, _clientSecret);
            if (accesstoken != null)
            {
                var order = new PaypalOrder()
                {
                    Intent = "CAPTURE",
                    Purchase_units = new List<PurchaseUnit>() {

                            new PurchaseUnit() {

                                Amount = new Amount() {
                                    Currency_code = input.currency,
                                    Value = input.price.ToString(),
                                    Breakdown = new Breakdown()
                                    {
                                        Item_total = new Amount()
                                        {
                                            Currency_code = input.currency,
                                            Value = input.price.ToString()
                                        }
                                    }
                                },
                                Description = "Content Boosting",
                                Items = new List<Items>
                                {
                                    new Items()
                                    {
                                        Name = input.name,
                                        Unit_amount = new Amount()
                                        {
                                            Currency_code = input.currency,
                                            Value = input.price.ToString()
                                        },
                                        Quantity = input.quantity.ToString()
                                    }
                                }
                            }
                        },
                    Application_context = new ApplicationContext()
                    {
                        Brand_name = input.brandName,
                        Landing_page = "NO_PREFERENCE",
                        User_action = "PAY_NOW", //Accion para que paypal muestre el monto de pago
                        Return_url = _webDomain + "checkout/Index?handler=Callback&",
                        Cancel_url = _webDomain + "checkout/Cancel"// cuando cancela la operacion
                    }
                };
                var orderResult = await _paypalClient.CreateOrder(order, accesstoken);
                if (orderResult is not null)
                {
                    return Ok(orderResult.Links[1].Href);
                }

           }

            return Ok(_webDomain + "Checkout/Cancel");
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("check-success")]
        public async Task<IActionResult> CheckSuccess()
        {
            var accesstoken = await _paypalClient.GetToken(_clientID, _clientSecret);
           if (accesstoken is not null)
            {
               var result = await _paypalClient.CaptureOrder(accesstoken, "sikish");
                if (result)
                {
                    return Ok(_webDomain + "Checkout/Success");
                }

                return NotFound(_webDomain + "Checkout/Cancel");
            }

            return NotFound(_webDomain + "Checkout/Cancel");
        }


     }

    public class PaypPalInput
    {
        public string? brandName { get; set; }
        public string? currency { get; set; }
        public string? name { get; set; }
        public int? orderId { get; set; }
        public int? quantity { get; set; }
        public int? price { get; set; }
    }
}