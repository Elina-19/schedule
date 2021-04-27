using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace Schedule.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly ClassContext _context;

        // GET: api/classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
        {
            return await _context.Classes.ToListAsync();
        }

        // GET: api/classes/{floorId}
        [HttpGet("{floorId}")]
        public async Task<ActionResult<IEnumerable<Class>>> GetClassesByFloor(int floorid)
        {
            return await _context.Classes.Where(x => (x.FloorId == floorid)).ToListAsync();
        }


        // GET: api/class/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Classes>> GetClass(long id)
        {
            var certainClass = await _context.Class.FindAsync(id);

            if (certainClass == null)
            {
                return NotFound();
            }

            return certainClass;
        }
    }
}