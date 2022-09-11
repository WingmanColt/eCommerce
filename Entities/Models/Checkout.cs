using Ardalis.GuardClauses;
using Entities.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class Checkout
    {
        public Checkout()
        {
            Orders = new HashSet<OrderInput>();
            CartItems = new HashSet<CartItem>();
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Adress { get; set; }
        public string Country { get; set; }
        public string Town { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }

        public string? UserId { get; set; }

        public bool IsGuest { get; set; }
        public bool PickupAtHome { get; set; }

        public ApproveType ApproveType { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ExpiredOn { get; set; }

        [NotMapped]
        public virtual ICollection<OrderInput> Orders { get; set; }

        [NotMapped]
        public virtual ICollection<CartItem> CartItems { get; set; }


        [NotMapped]
        public string StatementType { get; set; }

        public void Update(CheckoutInput input, string? userId)
        {
            Guard.Against.NullOrEmpty(input.FirstName, nameof(input.FirstName), "Please type firstname.");
            FirstName = input.FirstName;

            Guard.Against.NullOrEmpty(input.LastName, nameof(input.LastName), "Please type lastname.");
            LastName = input.LastName;

            Guard.Against.NullOrEmpty(input.Email, nameof(input.Email), "Please type email.");
            Email = input.Email;

            Guard.Against.NullOrEmpty(input.Phone, nameof(input.Phone), "Please type phone.");
            Phone = input.Phone;

            Guard.Against.NullOrEmpty(input.Adress, nameof(input.Adress), "Please type adress.");
            Adress = input.Adress;

            Guard.Against.NullOrEmpty(input.Country, nameof(input.Country), "Please type country.");
            Country = input.Country;

            Guard.Against.NullOrEmpty(input.Town, nameof(input.Town), "Please type town.");
            Town = input.Town;

            Guard.Against.NullOrEmpty(input.State, nameof(input.State), "Please type state.");
            State = input.State;

            Guard.Against.NullOrEmpty(input.PostalCode, nameof(input.PostalCode), "Please type valid postal code.");
            PostalCode = input.PostalCode;

            IsGuest = input.IsGuest;
            PickupAtHome = input.PickupAtHome;

            ApproveType = input.ApproveType;
            Orders = input.Orders;
            CartItems = input.CartItems;

            if(!String.IsNullOrEmpty(userId))
            UserId = userId;

            CreatedOn = DateTime.Now;
            ExpiredOn = DateTime.Now.AddDays(30);
        }
    }
 }
