using System.ComponentModel.DataAnnotations;

namespace EmployeeCard.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Designation { get; set; }

        [Required]
        public string Department { get; set; }

        [Required]
        public int Phone { get; set; }
    }
}
