using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var activityToRemove=await dataContext.Activities.FindAsync(request.Id);

                if(activityToRemove is null)
                {
                    return;
                }

                dataContext.Remove(activityToRemove);

                await dataContext.SaveChangesAsync();
            }
        }
    }
}