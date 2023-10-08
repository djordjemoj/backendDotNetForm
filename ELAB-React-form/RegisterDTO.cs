using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace ELAB_React_form
{
    public class RegisterDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PromoCode { get; set; }
    }
}