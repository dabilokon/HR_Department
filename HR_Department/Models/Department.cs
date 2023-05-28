namespace HR_Department.Models
{
    public class Department
    {
        public Department()
        {
            //Staffs = new List<Staff>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int EmployeesNum { get; set; }

        //public virtual ICollection<Staff> Staffs { get; set; }
    }
}
