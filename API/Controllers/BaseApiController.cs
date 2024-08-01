using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
        private  IMediator? mediator;

        protected IMediator Mediator=> mediator ??=HttpContext.RequestServices.GetService<IMediator>()!;

        
    }
}