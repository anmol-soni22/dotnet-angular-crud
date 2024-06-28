namespace Task_Management_System.Models.Domain
{
    public class Tasks
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}
