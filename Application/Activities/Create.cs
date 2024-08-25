using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public required Activity Activity { get; set; }
        }

        public class CommandValidator:AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                dataContext.Add(request.Activity);

                var result= await dataContext.SaveChangesAsync();

                if(result > 0)
                {
                    return Result<Unit>.Success(new Unit());
                }

                return Result<Unit>.Failure("Failed to created Activity");
            }
        }
    }

}