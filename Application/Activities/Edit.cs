using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext dataContext;
            private readonly IMapper mapper;

            public Handler(DataContext dataContext,IMapper mapper)
            {
                this.dataContext = dataContext;
                this.mapper = mapper;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                Activity? activity=await dataContext.Activities.FindAsync(request.Activity.Id);


                mapper.Map(request.Activity,activity);


                await dataContext.SaveChangesAsync();

            }
        }
    }
}