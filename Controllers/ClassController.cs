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
        
        /*
         * Видимо мою мысль не поняли
         * Этот контроллер должен отвечать только за получения конкретной аудитории, т.е.
         * api/class/{id}
         * В данном случае, этаж тут никакой роли не играет.
         *
         * Для этажа надо создать отдельный контроллер
         * в котором будут запросы по типу, api/floor/{id}
         * И в ответ на этот запрос, должен возвращаться массив объектов, в котором описаны аудитории
         */
        
        // GET: api/classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
        {
            return await _context.Classes.ToListAsync();
        }

        // GET: api/classes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Class>> GetClass(long id)
        {
            var certainClass = await _context.Classes.FindAsync(id);

            if (certainClass == null)
            {
                return NotFound();
            }

            return certainClass;
        }
    }
}