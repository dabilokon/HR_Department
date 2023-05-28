using System.ComponentModel.DataAnnotations.Schema;

namespace HR_Department.Models
{
    public class Project
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Staff> Staffs { get; set; } = new();

        public List<Problem> Problems { get; set; } = new();

    }

}
