
$(document).ready(function () {
        // Function to fetch and populate the employee table
        function populateEmployeeTable() {
            $.ajax({
                url: '/api/EmployeeCard', 
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Clear existing table rows
                    $('#employeeTableBody').empty();

                    // Loop through the data and add rows to the table
                    $.each(data, function (index, employee) {
                        var editButton = '<button class="btn btn-primary edit-employee" onclick="editEmployee(' + employee.id + ')">Edit</button>';

                        var deleteButton = '<button class="btn btn-danger delete-employee" onclick="Delete(' + employee.id + ')">Delete</button>';

                        $('#employeeTableBody').append(
                            '<tr>' +
                            '<td>' + employee.name + '</td>' +
                            '<td>' + employee.designation + '</td>' +
                            '<td>' + employee.department + '</td>' +
                            '<td>' + employee.phone + '</td>' +
                            '<td>' + editButton + ' ' + deleteButton + '</td>' + // Add Edit and Delete buttons
                            '</tr>'
                        );
                    });
                },
                error: function () {
     
                    alert('Error fetching data from the server.');
                }
            });
        }

        // Call the function to populate the table when the page loads
        populateEmployeeTable();
    });



// Handle incremental search
$('#searchInput').on('input', function () {
    var searchText = $(this).val().toLowerCase();

    $('#employeeTableBody tr').each(function () {
        var employeeName = $(this).find('td:first').text().toLowerCase();

        if (employeeName.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});



//-----------------------------Insert Data----------------------------//

document.getElementById('saveButton').addEventListener('click', async () => {

    console.log("Save Button Clicked");

    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const department = document.getElementById('department').value;
    const phone = document.getElementById('phone').value;

    console.log("name" + name);
    console.log("Designation" + designation);
    console.log("Department" + department);
    console.log("Phone" + phone);


    const EmployeeData = {

        Name: name,
        Designation: designation,
        Department: department,
        Phone: phone
    };

    await saveData(EmployeeData);
});

async function saveData(EmployeeData) {
    try {
        const response = await fetch('/api/EmployeeCard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EmployeeData)
        });

        if (response.ok) {
            console.log('Data inserted successfully');
            window.location.reload();
        } else {
            const errorMessage = await response.text();
            console.error('Error:', errorMessage);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editEmployee(Id) {
    console.log("Edit button clicked");
    console.log(Id);
    // Open the modal or show the form as you prefer
    $('#addEmployeeModal').modal('show');

    if (Id) {
        try {
            const response = await fetch(`api/EmployeeCard/${Id}`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error(`Error Fetching Data: ${response.statusText}`);
            }

            const employeeData = await response.json();
            console.log(employeeData  , 'EDDD');

            $("#employeeId").val(Id);
            $("#name").val(employeeData.name);
            $("#designation").val(employeeData.designation);
            $("#department").val(employeeData.department);
            $("#phone").val(employeeData.phone);


            document.querySelector("#saveButton").style.display = "none";
            document.querySelector("#updateButton").style.display = "block";
            

        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
    else {
        document.querySelector("#saveButton").style.display = "block";
        document.querySelector("#updateButton").style.display = "none";
    }
}



document.getElementById("updateButton").addEventListener('click', async () => {

    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const department = document.getElementById('department').value;
    const phone = document.getElementById('phone').value;

    const EmployeeData = {
        Id :id,
        Name: name,
        Designation: designation,
        Department: department,
        Phone: phone
    };

    console.log("Employee updated data" , EmployeeData);

    await updateData(EmployeeData);

});


async function updateData(EmployeeData) {
    var Id = EmployeeData.Id;
    try {
        const response = await fetch(`api/EmployeeCard/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EmployeeData)
        });

        if (response.ok) {
            console.log('Data updated successfully');
            $('#addEmployeeModal').modal('hide');

        } else {
            const errorMessage = await response.text();
            console.error('Error updating data:', errorMessage);
        }
    } catch (error) {
        console.error('Exception:', error);
    }
}

document.getElementById("cancelButton").addEventListener("click", function () {
    $('#addEmployeeModal').modal('hide');

    $("#name").val('');
    $("#designation").val('');
    $("#department").val('');
    $("#phone").val('');
});

document.getElementById("AddButton").addEventListener("click", function () {

    $("#name").val('');
    $("#designation").val('');
    $("#department").val('');
    $("#phone").val('');
});

function Delete(Id) {
    console.log("Delete function called");
    console.log(Id);
    $.ajax({
        type: "DELETE",
        url: `/api/EmployeeCard/${Id}`,
        data: { Id: Id },
        success: function (response) {
            console.log("Data Deleted successfully");
            // You can also redirect to another page after successful deletion
            window.location.href = "/home";
        },
        error: function (xhr, status, error) {
            console.log("Error deleting data: " + error);
        }
    });
}


