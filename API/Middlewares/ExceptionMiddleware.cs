using System.Net.Http.Headers;
using System.Text.Json;
using Application.Core;

namespace API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate next;
        private readonly ILogger<ExceptionMiddleware> logger;
        private readonly IHostEnvironment env;

        public ExceptionMiddleware(RequestDelegate next,
        ILogger<ExceptionMiddleware> logger,IHostEnvironment env)
        {
            this.next = next;
            this.logger = logger;
            this.env = env;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await next(httpContext);
            }
            catch (Exception e)
            {
                int statusCode=StatusCodes.Status500InternalServerError;

                httpContext.Response.ContentType="application/json";
                httpContext.Response.StatusCode=statusCode;

                AppException appException=env.IsDevelopment() ? 
                    new AppException(statusCode,e.Message,e.StackTrace) :
                    new AppException(statusCode,"Internal server error");

                JsonSerializerOptions options=new JsonSerializerOptions{
                    PropertyNamingPolicy=JsonNamingPolicy.CamelCase
                };

                var json=JsonSerializer.Serialize(appException,options);

                await httpContext.Response.WriteAsync(json);

            }
        }
    }
}