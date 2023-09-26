using EmployeeCard.Models;

namespace EmployeeCard.IRepository
{
    public interface IEmployeeCardRepository
    {
        IEnumerable<Employee> GetAllEmployees();
        Employee GetEmployeeById(int id);
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        void DeleteEmployee(int id);
    }
}
