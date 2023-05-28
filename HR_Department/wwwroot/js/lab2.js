(() => {
    const uri = 'api/Staffs';
    let staffs = [];

    window.addEventListener("newDepartments", (e) => {
        const departmentlist = e.detail.newDepartments()
        fillDepartmentsList(document.getElementById("add-department"), departmentlist);
        fillDepartmentsList(document.getElementById("edit-department"), departmentlist);
    })



    function fillDepartmentsList(selectelement, departmentsList) {
        selectelement.replaceChildren();
        //console.log(arguments)
        const option = document.createElement('option');

        departmentsList.forEach(department => {
            let newoption = option.cloneNode(false);
            newoption.innerText = department.name;
            newoption.value = department.id;
            selectelement.appendChild(newoption)
        });



    }

    function getStaffs() {
        fetch(uri)
            .then(response => response.json())
            .then(data => _displayStaffs(data))
            .catch(error => console.error('Unable to get staff.', error));
    }

    window.addStaffs = function addStaffs() {
        const addNameTextbox = document.getElementById('add-name');
        const addPositionTextbox = document.getElementById('add-position');
        const addSheduleTextbox = document.getElementById('add-shedule');
        const addSalaryTextbox = document.getElementById('add-salary');
        const addDepartmentSelect = document.getElementById('add-department')
        const staffs = {
            name: addNameTextbox.value.trim(),
            position: addPositionTextbox.value.trim(),
            shedule: addSheduleTextbox.value.trim(),
            salary: addSalaryTextbox.value.trim(),
            departmentId: addDepartmentSelect.value.trim() || null
        };
        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staffs)
        })
            .then(response => response.json())
            .then(() => {
                getStaffs();
                addNameTextbox.value = '';
                addPositionTextbox.value = '';
                addSheduleTextbox.value = '';
                addSalaryTextbox.value = '';
            })
            .catch(error => console.error('Unable to add Staff.', error));
    }

    window.deleteStaffs = function deleteStaffs(id) {
        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getStaffs())
            .catch(error => console.error('Unable to delete category.', error));
    }

    window.displayEditForm = function displayEditForm(id) {
        const staff = staffs.find(staffs => staffs.id === id);
        document.getElementById('edit-id').value = staff.id;
        document.getElementById('edit-name').value = staff.name;
        document.getElementById('edit-shedule').value = staff.shedule;
        document.getElementById('edit-salary').value = staff.salary;
        document.getElementById('edit-position').value = staff.position;
        document.getElementById('EditStaff').style.display = 'block';
    }

    window.updateStaffs = function updateStaffs() {
        const staffId = document.getElementById('edit-id').value;
        const staff = {
            id: parseInt(staffId, 10),
            name: document.getElementById('edit-name').value.trim(),
            position: document.getElementById('edit-position').value.trim(),
            shedule: document.getElementById('edit-shedule').value.trim(),
            salary: document.getElementById('edit-salary').value.trim(),
            departmentId: document.getElementById('edit-department').value.trim() || null,


        };
        fetch(`${uri}/${staffId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(staff)
        })
            .then(() => getStaffs())
            .catch(error => console.error('Unable to update category.', error));
        closeStaffInput();
        return false;
    }

    window.closeStaffInput = function closeStaffInput() {
        document.getElementById('EditStaff').style.display = 'none';
    }

    function _displayStaffs(data) {
        const tBody = document.getElementById('Staffs');
        tBody.innerHTML = '';

        const button = document.createElement('button');

        data.forEach(staff => {
            let editButton = button.cloneNode(false);
            editButton.innerText = 'Edit';
            editButton.setAttribute('onclick', `displayEditForm(${staff.id})`);

            let deleteButton = button.cloneNode(false);
            deleteButton.innerText = 'Delete';
            deleteButton.setAttribute('onclick', `deleteStaffs(${staff.id})`);

            let tr = tBody.insertRow();

            let td1 = tr.insertCell(0);
            let textNodeid = document.createTextNode(staff.id);
            td1.appendChild(textNodeid);

            let td2 = tr.insertCell(1);
            let textNodeName = document.createTextNode(staff.name);
            td2.appendChild(textNodeName);

            let td3 = tr.insertCell(2);
            let textNodePosition = document.createTextNode(staff.position);
            td3.appendChild(textNodePosition);

            let td4 = tr.insertCell(3);
            let textNodeShedule = document.createTextNode(staff.shedule);
            td4.appendChild(textNodeShedule);

            let td5 = tr.insertCell(4);
            let textNodeSalary = document.createTextNode(staff.salary);
            td5.appendChild(textNodeSalary);

            let td6 = tr.insertCell(5);
            let textNodeDepartment = document.createTextNode(staff.department?.name);
            td6.appendChild(textNodeDepartment);

            let td7 = tr.insertCell(6);
            td7.appendChild(editButton);

            let td8 = tr.insertCell(7);
            td8.appendChild(deleteButton);
        });

        //Тут тригериться событие (event)
        const newStaffsEvent = new CustomEvent("newStaffs", {
            detail: { newStaffs: () => data },
        });
        window.dispatchEvent(newStaffsEvent);

        staffs = data;
    }

    getStaffs()
    
})()