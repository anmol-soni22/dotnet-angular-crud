using Microsoft.EntityFrameworkCore;
using Task_Management_System.Models.Domain;

namespace Task_Management_System.Data
{
    public class TasksDbContext : DbContext
    {
        public TasksDbContext(DbContextOptions<TasksDbContext> options) : base(options)
        {
        }

        public DbSet<Tasks> Tasks { get; set; }
    }
}
