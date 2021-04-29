using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlooresController : ControllerBase
    {
        private readonly ClassContext _context;

        public FlooresController(ClassContext context)
        {
            _context = context;
        }

        // GET: api/Floores/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Class>>> GetClassesByFloor(long id)
        {
            return await _context.Classes.Where(x => (x.Floor == id)).ToListAsync();
        }
    }
}
