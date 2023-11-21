using System;
using Application.Features.Customers.Command;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace SanitoryBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IMediator _mediatr;

        public CustomersController(IMediator mediator)
        {
            _mediatr = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegisterCommand command)
        {
            return Ok(await _mediatr.Send(command));
        }

    }
}
