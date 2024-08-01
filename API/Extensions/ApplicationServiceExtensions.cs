using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();


           services
            .AddDbContext<DataContext>(x => x.UseSqlite(configuration.GetConnectionString("DefaultConnection")));

           services.AddAutoMapper(typeof(List.Handler).Assembly);

            services.AddMediatR(x =>
            x.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            return services;
        }
    }
}