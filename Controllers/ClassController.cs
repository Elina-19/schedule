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
        public async Task<ActionResult<IEnumerable<Class>>> GetClassesByFloor(int floorId)
        {
            List<Class> classesByFloor = await _context.Classes.Where(x => (x.FloorId == floorId)).ToListAsync();
            if (classesByFloor.Count == 0)
            {
                return NotFound();
            }
            return classesByFloor;
        }


        // GET: api/classes/{floorId}/{id}
        [HttpGet("{floorId}/{id}")]
        public async Task<ActionResult<Class>> GetClass(int floorId, long id)
        {
            var certainClass = await _context.Classes.FindAsync(id);

            if (certainClass == null || certainClass.FloorId != floorId)
            {
                return NotFound();
            }

            return certainClass;
        }
    }
}