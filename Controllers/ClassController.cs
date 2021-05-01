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

        private Class _mockClass = new Class
        {
            Discipline = "lorem ipsum"
        };
        
        // GET: api/class
        [HttpGet("{id}")]
        public async Task<Class> GetClasses()
        {
            return _mockClass;
        }

        [HttpPut("update/{id}")]
        public async Task UpdateClass()
        {
            
        }
    }
}