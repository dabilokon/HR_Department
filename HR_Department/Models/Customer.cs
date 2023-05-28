namespace HR_Department.Models
{
    public class Customer : User
    {

        //Посилання на проєкт якій замовив клієнт
        public Project? Project { get; set; }

        public int? ProjectId { get; set; }

    }
}
