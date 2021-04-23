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
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassItem>>> GetTodoItems()
        {
            return await _context.ClassItems.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.ClassItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        private bool TodoItemExists(long id)
        {
            return _context.ClassItems.Any(e => e.Id == id);
        }
    }
}