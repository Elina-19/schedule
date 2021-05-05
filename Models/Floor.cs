using System.Collections.Generic;

namespace Schedule.Models
{
    public class Floor
    {
        public int Id { get; set; }
        public List<Audience> Audiences { get; set; }
    }
}