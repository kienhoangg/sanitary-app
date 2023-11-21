using System;
using System.Data;
using Contracts.Interfaces;
using Dapper;
using Infrastructure.Implements;
using MediatR;

namespace Application.Features.Customers.Command
{
    public class RegisterCommand : IRequest<Guid>
    {
        public string LON_User_Name { get; set; }
        public string LON_Login_Name { get; set; }
        public string LON_Login_Password { get; set; }
        public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Guid>
        {
            private readonly IApplicationWriteDbConnection _writeDbConnection;
            public RegisterCommandHandler(IApplicationWriteDbConnection writeDbConnection)
            {
                _writeDbConnection = writeDbConnection;
            }

            public async Task<Guid> Handle(RegisterCommand request, CancellationToken cancellationToken)
            {

                var query = "INSERT INTO [USER] (LON_User_Name, LON_Login_Password) VALUES (@LON_User_Name, @LON_Login_Password)";

                var parameters = new DynamicParameters();
                parameters.Add("LON_User_Name", request.LON_User_Name, DbType.String);
                parameters.Add("LON_Login_Password", request.LON_Login_Password, DbType.String);
                var userId = await _writeDbConnection.ExecuteAsync(query, parameters);
                return new Guid();
            }
        }

    }

}
