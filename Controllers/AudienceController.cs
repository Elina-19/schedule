using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoogleParser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private GoogleTableParser _google;

        private Audience _mockAudience = new Audience()
        {
            Discipline = "lorem ipsum"
        };
        
        // GET: api/audience/{id}
        [HttpGet("{id}")]
        public async Task<Audience> GetClasses()
        {
            return _mockAudience;
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