using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FloorController : ControllerBase
    {
        private Floor _mockFloor = new Floor()
        {
            Audiences = new []{new Audience()
            {
                Discipline = "lorem ipsum"
            }
                
            }
        };
        
        // GET: api/floor/{id}
        [HttpGet( "{id}" )]
        public async Task<Floor> GetFloor()
        {
            return _mockFloor;
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
