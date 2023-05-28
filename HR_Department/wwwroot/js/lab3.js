(() => {const url = 'api/Departments';
let departments = [];

 function getDepartments() {
    fetch(url)
        .then(response => response.json())
        .then(data => _displayDepartments(data))
        .catch(error => console.error('Unable to get departments.', error));
}

    window.addDepartments = function addDepartments()
{
    const addNameTextbox = document.getElementById('add-nam');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addEmployeesNumTextbox = document.getElementById('add-employeesNum');
    const department = {
        name: addNameTextbox.value.trim(),
        description: addDescriptionTextbox.value.trim(),
        employeesNum: addEmployeesNumTextbox.value.trim(),
    };
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(department)
    })
        .then(response => response.json())
        .then(() => {
            getDepartments();
            addNameTextbox.value = '';
            addDescriptionTextbox.value = '';
            addEmployeesNumTextbox.value = '';
        })
        .catch(error => console.error('Unable to add Departments.', error));
}

    window.deleteDepartments = function deleteDepartments(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getDepartments())
        .catch(error => console.error('Unable to delete Department.', error));
}

    window.displayEditFormDepartment = function displayEditFormDepartment(id) {
    const department = departments.find(departments => departments.id === id);
    document.getElementById('edit-idd').value = department.id;
    document.getElementById('edit-nam').value = department.name;
    document.getElementById('edit-description').value = department.description;
    document.getElementById('edit-employeesNum').value = department.employeesNum;
    document.getElementById('EditDepartments').style.display = 'block';
}

    window.updateDepartments = function updateDepartments() {
    const departmentId = document.getElementById('edit-idd').value;
    const department = {
        id: parseInt(departmentId,10),
        name: document.getElementById('edit-nam').value.trim(),
        description: document.getElementById('edit-description').value.trim(),
        employeesNum: document.getElementById('edit-employeesNum').value.trim(),
        
        
    };

    fetch(`${url}/${departmentId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(department)
    })
        .then(() => getDepartments())
        .catch(error => console.error('Unable to update department.', error));
    closeDepartmentInput();
    return false;
}

    window.closeDepartmentInput = function closeDepartmentInput() {
    document.getElementById('EditDepartments').style.display = 'none';
}

function _displayDepartments(data) {
    const tBody = document.getElementById('Departments');
    tBody.innerHTML = '';

    const button = document.createElement('button');

    data.forEach(department => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditFormDepartment(${department.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteDepartments(${department.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodeid = document.createTextNode(department.id);
        td1.appendChild(textNodeid);

        let td2 = tr.insertCell(1);
        let textNodeName = document.createTextNode(department.name);
        td2.appendChild(textNodeName);

        let td3 = tr.insertCell(2);
        let textNodeDescription = document.createTextNode(department.description);
        td3.appendChild(textNodeDescription);

        let td4 = tr.insertCell(3);
        let textNodeEmployeesNum = document.createTextNode(department.employeesNum);
        td4.appendChild(textNodeEmployeesNum);

        let td5 = tr.insertCell(4);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(5);
        td6.appendChild(deleteButton);
    });
    departments = data;

    //Тут тригериться событие (event)
    const newDepartmentsEvent = new CustomEvent("newDepartments", {
        detail: { newDepartments: () => departments },
    });
    window.dispatchEvent(newDepartmentsEvent);
    }
    getDepartments()
})()