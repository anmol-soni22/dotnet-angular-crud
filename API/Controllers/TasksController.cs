using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Task_Management_System.Data;
using Task_Management_System.Models;
using Task_Management_System.Models.Domain;

namespace Task_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TasksDbContext dbContext;

        public TasksController(TasksDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = dbContext.Tasks.ToList();
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult AddTask(AddTaskRequestDTO request)
        {
            var domainModelTasks = new Tasks
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Description = request.Description
            };

            dbContext.Tasks.Add(domainModelTasks);
            dbContext.SaveChanges();

            return Ok(domainModelTasks);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateTask(Guid id, UpdateTaskRequestDTO request)
        {
            var task = dbContext.Tasks.Find(id);
            if (task != null)
            {
                task.Name = request.Name;
                task.Description = request.Description;

                dbContext.SaveChanges();
                return Ok(task);
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteTask(Guid id) 
        {
            var task = dbContext.Tasks.Find(id);
            if (task != null) { 
                dbContext.Tasks.Remove(task);
                dbContext.SaveChanges();
            }

            return Ok();
        }
    }
}
