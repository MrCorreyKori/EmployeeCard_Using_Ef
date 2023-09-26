using EmployeeCard.Data;
using EmployeeCard.IRepository;
using EmployeeCard.Models;

namespace EmployeeCard.Repository
{
    public class EmployeeCardRepository : IEmployeeCardRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployeeCardRepository (ApplicationDbContext context)
        {
            _context = context;
        }


        public IEnumerable<Employee> GetAllEmployees()
        {
            return _context.EmployeeDetails.ToList();
        }

        public Employee GetEmployeeById(int id)
        {
            return _context.EmployeeDetails.Find(id);
        }

        public void AddEmployee(Employee employee)
        {
            _context.EmployeeDetails.Add(employee);
            _context.SaveChanges();
        }

        public void UpdateEmployee(Employee employee)
        {
            _context.EmployeeDetails.Update(employee);
            _context.SaveChanges();
        }

        public void DeleteEmployee(int id)
        {
            var employee = _context.EmployeeDetails.Find(id);
            if (employee != null)
            {
                _context.EmployeeDetails.Remove(employee);
                _context.SaveChanges();
            }
        }
    }
}
