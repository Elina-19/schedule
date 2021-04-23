namespace Schedule.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<ClassContext> options)
            : base(options)
        {
        }

        public DbSet<ClassItem> ClassItems { get; set; }
    }
}
