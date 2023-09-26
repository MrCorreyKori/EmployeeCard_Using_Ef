using EmployeeCard.IRepository;
using EmployeeCard.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeCard.Controllers
{
    [Route("api/EmployeeCard")]
    [ApiController]
    public class EmployeeCard : Controller
    {
        private readonly IEmployeeCardRepository _repository;

        public EmployeeCard (IEmployeeCardRepository repository)
        {
            _repository = repository;
        }


        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var employees = _repository.GetAllEmployees();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployeeById(int id)
        {
            var employee = _repository.GetEmployeeById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            _repository.AddEmployee(employee);
            return CreatedAtAction(nameof(GetEmployeeById), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }
            _repository.UpdateEmployee(employee);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            _repository.DeleteEmployee(id);
            return NoContent();
        }
    }
}
