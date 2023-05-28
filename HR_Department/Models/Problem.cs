namespace HR_Department.Models
{
    public class Problem
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public Staff? Staff { get; set; }

        public int? StaffId { get; set; }

        public Project? Project { get; set; }

        public int? ProjectId { get; set; }

    }
}
