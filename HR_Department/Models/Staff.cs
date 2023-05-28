using System.ComponentModel.DataAnnotations.Schema;

namespace HR_Department.Models
{
    public class Staff : User
    {


        public string Position { get; set; }

        public string Shedule { get; set; }

        public float Salary { get; set; }

        public Department? Department { get; set; }

        public int? DepartmentId { get; set; } = null!;

        public List<Project> Projects { get; set; } = new();

    }
}
