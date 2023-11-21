using System;
using MediatR;

namespace Application.Features.Customers.Command1
{
    public class RegisterCommand : IRequest<Guid>
    {
        public string LON_User_Name { get; set; }
        public string LON_Login_Name { get; set; }
        public string LON_Login_Password { get; set; }


    }
}
