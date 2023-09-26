using EmployeeCard.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeCard.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Employee> EmployeeDetails { get; set; }      // variable is db table name
    }
}
