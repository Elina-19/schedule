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
    public class ClassItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        // GET: api/ClassItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassItem>>> GetClassItems()
        {
            return await _context.ClassItems.ToListAsync();
        }

        // GET: api/ClassItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassItem>> GetClassItem(long id)
        {
            var classItem = await _context.ClassItems.FindAsync(id);

            if (classItem == null)
            {
                return NotFound();
            }

            return classItem;
        }

        private bool ClassItemExists(long id)
        {
            return _context.ClassItems.Any(e => e.Id == id);
        }
    }
}