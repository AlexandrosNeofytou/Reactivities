using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{


    public class Query : IRequest<Result<List<Activity>>>{}

    public class Handler : IRequestHandler<Query, Result<List<Activity>>>
    {
        private readonly DataContext dataContext;

        public Handler(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            return Result<List<Activity>>.Success(await dataContext.Activities.ToListAsync());
        }
    }
}
