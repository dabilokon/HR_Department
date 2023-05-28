using System.ComponentModel.DataAnnotations;

namespace HR_Department.Models
{
    
    public class AddStaffToProjectDTO
    {
        [Required]
        public int StaffId { get; set; }

        [Required]
        public int ProjectId { get; set; }   
    }
}
