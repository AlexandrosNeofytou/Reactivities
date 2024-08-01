using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public required Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                dataContext.Add(request.Activity);

                await dataContext.SaveChangesAsync();
            }
        }
    }

}