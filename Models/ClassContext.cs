namespace Schedule.Models
{
    public class ClassContext : DbContext
    {
        public ClassContext(DbContextOptions<ClassContext> options)
            : base(options)
        {
        }

        public DbSet<Class> Classes { get; set; }
    }
}
