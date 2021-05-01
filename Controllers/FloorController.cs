using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Schedule.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlooresController : ControllerBase
    {
        [HttpGet( "{id}" )]
        public async Task GetFloor()
        {
            
        }

    }
}
