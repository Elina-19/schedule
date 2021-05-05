using System.Collections.Generic;

namespace Schedule.Models
{
    public class Audience
    {
        public int Number { get; set; }
        public string Floor { get; set; }
        public Lesson CurrentLesson { get; set; }
        public List<Lesson> Lessons { get; set; }
    }
}
