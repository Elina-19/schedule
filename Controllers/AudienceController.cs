using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.XPath;
using GoogleParser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudienceController : ControllerBase
    {
        // GET: api/audience/{id}
        [HttpGet("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Audience))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetClasses(int id)
        {
            var result = MockData.FindAudience( id );
            
            if ( result == null )
                return BadRequest();

            return Ok( result );
        }

        // PUT api/update/{id}
        [HttpPut("update/{id}")]
        public async Task UpdateAudience()
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