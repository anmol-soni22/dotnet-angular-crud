namespace Task_Management_System.Models
{
    public class AddTaskRequestDTO
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}
