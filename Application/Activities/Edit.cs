using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public required Activity Activity { get; set; }
        }

        public class EditValidator:AbstractValidator<Command>
        {
            public EditValidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>?>
        {
            private readonly DataContext dataContext;
            private readonly IMapper mapper;

            public Handler(DataContext dataContext,IMapper mapper)
            {
                this.dataContext = dataContext;
                this.mapper = mapper;
            }
            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity? activity=await dataContext.Activities.FindAsync(request.Activity.Id);

                if(activity is null)
                {
                    return null;
                }



                mapper.Map(request.Activity,activity);


                var result=await dataContext.SaveChangesAsync();

                if(result > 0)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("failed to update activity");
                


            }
        }
    }
}