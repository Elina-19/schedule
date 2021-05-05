using System.Collections.Generic;

namespace Schedule.Models
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Discipline { get; set; }
        public string Teacher { get; set; }
        public IEnumerable<string> Groups { get; set; }
        public string Time { get; set; }
    }
}