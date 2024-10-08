using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var result=await Mediator.Send(new List.Query());
            
            return HandleResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivityById(Guid id)
        {
            var result= await Mediator.Send(new Details.Query
            {
                Id = id
            });

           return HandleResult(result);


        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var result= await Mediator.Send(new Create.Command()
            {
                Activity = activity
            });

            return HandleResult(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity([FromRoute]Guid id, [FromBody]Activity activity)
        {
            Console.WriteLine("idssssssssssssssss");

            activity.Id = id;

            var result=await Mediator.Send(new Edit.Command()
            {
                Activity = activity
            });

            return HandleResult(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            var result=await Mediator.Send(new Delete.Command()
            {
                Id=id
            });

            return HandleResult(result);
        }
    }
}