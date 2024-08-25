using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>?>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>?>
        {
            private readonly DataContext dataContext;

            public Handler(DataContext dataContext)
            {
                this.dataContext = dataContext;
            }
            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityToRemove=await dataContext.Activities.FindAsync(request.Id);

                if(activityToRemove is null)
                {
                    return null;
                }

                dataContext.Remove(activityToRemove);

                var result=await dataContext.SaveChangesAsync();

                if(result > 0)
                {
                   return Result<Unit>.Success(Unit.Value);
                }

                return  Result<Unit>.Failure("Failed to delete activity");

            }
        }
    }
}