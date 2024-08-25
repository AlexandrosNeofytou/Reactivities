using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {

        private IMediator? mediator;

        protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>()!;


        protected IActionResult HandleResult<T>(Result<T>? result)
        {
            if(result is null)
            {
                return NotFound();
            }
            else if (result.IsSuccess && result.Value is not null)
            {
                return Ok(result.Value);

            }
            else if (result.IsSuccess && result.Value is null)
            {
                return NotFound();

            }

            return BadRequest(result.Error);
        }

    }
}