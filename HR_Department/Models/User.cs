using System.ComponentModel.DataAnnotations;

namespace HR_Department.Models
{
    public abstract class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

    }
}
