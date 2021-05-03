using System.Collections;
using System.Collections.Generic;

namespace Schedule.Models
{
    public class Floor
    {
        public int Id { get; set; }
        public IEnumerable<Audience> Audiences { get; set; }
    }
}