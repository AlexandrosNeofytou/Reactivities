using API.Extensions;
using API.Middlewares;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddCors(x=>x.AddPolicy("CorsPolicy"
,x=>x.AllowAnyHeader().WithOrigins("http://localhost:3000").AllowAnyMethod()));

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();


app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

using var scope=app.Services.CreateScope();
{
    var services=scope.ServiceProvider;

    try
    {   
        DataContext context=services.GetRequiredService<DataContext>();
        context.Database.Migrate();
        await Seed.SeedData(context);
    }
    catch(Exception e)
    {
        var logger=services.GetRequiredService<ILogger<Program>>();
    

        logger.LogError(e,"Error has occured with the migrations");
    }
}

app.Run();
