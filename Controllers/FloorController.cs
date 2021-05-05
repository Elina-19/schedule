using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FloorController : ControllerBase
    {
        // GET: api/floor/{id}
        [HttpGet( "{id}" )]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Floor))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetFloor(int id)
        {
            switch ( id )
            {
                case 12:
                    return Ok(MockData.Floor12);
                case 13:
                    return Ok(MockData.Floor13);
                default:
                    return NotFound();
            }
        }

        // PUT
        [HttpPut("update/{id}")]
        public async Task UpdateFloor()
        {
            
        }
        
        // POST
        [HttpPost]
        public async Task Post()
        {
            
        }
        
        // DELETE
        [HttpDelete("{id}")]
        public async Task Delete()
        {
            
        }
    }
}
