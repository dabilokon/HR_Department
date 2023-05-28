using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using HR_Department.Models;

namespace HR_Department.Models
{
    public class HRDepartmentContext: DbContext
    {
        public DbSet<HR_Department.Models.Department> Departments { get; set; } = default!;

        public HRDepartmentContext(DbContextOptions<HRDepartmentContext>options)
            : base(options) 
        {
            Database.EnsureCreated();
        } 

        public DbSet<HR_Department.Models.Staff> Staffs { get; set; } = default!;

        public DbSet<HR_Department.Models.Project> Projects { get; set; } = default!;

        public DbSet<HR_Department.Models.Problem> Problems { get; set; } = default!;

        public DbSet<HR_Department.Models.Customer> Customers { get; set; } = default!;


    }  
}

