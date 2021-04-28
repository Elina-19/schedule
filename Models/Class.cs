namespace Schedule.Models
{
    public class Class
    {
        public long Id { get; set; }
        // FloorId -> Floor. Лучше так переделать 
        public int FloorId { get; set; }
        public int Number { get; set; }
        public string Discipline { get; set; }
        public string Teacher { get; set; }
        public string Groups { get; set; }
    }
}
