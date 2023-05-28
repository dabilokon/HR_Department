(() => {

    const uri = 'api/Projects';
    const uristaff = 'api/Staffs';
    let projects = [];


    let currentProjectId = null

    window.addEventListener("newStaffs", (e) => {
        const stafflist = e.detail.newStaffs()
        
        const selectelement = document.getElementById('addproject-staff');
        selectelement.replaceChildren();
       
        const option = document.createElement('option');

        stafflist.forEach(staff => {
            let newoption = option.cloneNode(false);
            newoption.innerText = staff.name;
            newoption.value = staff.id;
            selectelement.appendChild(newoption)
        });
    })



    window.addProject = function addProject() {
        const addNameTextbox = document.getElementById('addproject-name');

        
        const projectdata = {
            name: addNameTextbox.value.trim(),
        };
        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectdata)
        })
            .then(response => response.json())
            .then(() => {
                getProjects();
                addNameTextbox.value = '';
            })
            .catch(error => console.error('Unable to add Project.', error));
    }

    window.addProjectStaff =function addProjectStaff()
    {
        //console.log(currentProjectId)
        const staffid = document.getElementById('addproject-staff').value

        fetch(uri+'/addStaff', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                StaffId: parseInt(staffid),
                ProjectId:parseInt(currentProjectId)
            })
        })
            
            .then(() => {
                
                displayProjectStaffEditForm(currentProjectId)
            })
            .catch(error => console.error('Unable to add Project.', error));

    }

    window.deleteProject = function deleteProject(id)
    {
        fetch(`${uri}/${id}`, {
            method: 'DELETE'
        })
            .then(() => getProjects())
            .catch(error => console.error('Unable to delete Project.', error));
    }

    window.updateProject = function updateProject() {
        const ProjectId = document.getElementById('editproject-id').value;
        const project = {
            id: parseInt(ProjectId, 10),
            name: document.getElementById('editproject-name').value.trim(),
        };
        fetch(`${uri}/${ProjectId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then(() => getProjects())
            .catch(error => console.error('Unable to update Project.', error));
        closeProjectInput();
        return false;
    }

    window.closeProjectInput = function closeProjectInput() {
        document.getElementById('EditProject').style.display = 'none';
    }

    function getProjects() {
        fetch(uri)
            .then(response => response.json())
            .then(data => _displayProjects(data))
            .catch(error => console.error('Unable to get staff.', error));
    }

    window.displayProjectEditForm = function displayProjectEditForm(id)
    {
        const project = projects.find(projects => projects.id === id);
        document.getElementById('editproject-id').value = project.id;
        document.getElementById('editproject-name').value = project.name;
        document.getElementById('EditProject').style.display = 'block';
        

    }

    function _displayProjects(data) {
        const tBody = document.getElementById('Projects');
        tBody.innerHTML = '';

        const button = document.createElement('button');

        data.forEach(project => {
            //debugger
            let editButton = button.cloneNode(false);
            editButton.innerText = 'Edit';
            editButton.setAttribute('onclick', `displayProjectEditForm(${project.id})`);

            //Додаємо кнопку для редагування віконавців проєкту
            let editProjectStaffButton = button.cloneNode(false);
            editProjectStaffButton.innerText = 'EditStaff';
            editProjectStaffButton.setAttribute('onclick', `displayProjectStaffEditForm(${project.id})`);

            let deleteButton = button.cloneNode(false);
            deleteButton.innerText = 'Delete';
            deleteButton.setAttribute('onclick', `deleteProject(${project.id})`);

            let tr = tBody.insertRow();
            let td = tr.insertCell(0);

            
            let textNodeid = document.createTextNode(project.id);
            td.appendChild(textNodeid);

            td = tr.insertCell(1);
            let textNodeName = document.createTextNode(project.name);
            td.appendChild(textNodeName);

            td = tr.insertCell(2);
            td.appendChild(editButton);
            td.appendChild(editProjectStaffButton)

            td = tr.insertCell(3);
            td.appendChild(deleteButton);


        });
        projects = data;
    }

    window.displayProjectStaffEditForm = function displayProjectStaffEditForm(id) {
        
        document.getElementById('EditProjectStaff').style.display = 'block';
        currentProjectId = id;

        fetch(uristaff +'/GetByProject/'+id)
            .then(response => response.json())
            .then(data => {
                const tBody = document.getElementById('ProjectsStaff');
                tBody.innerHTML = '';

                const button = document.createElement('button');

                data.forEach(staff => {
                    //debugger
                    let DeleteStaffButton = button.cloneNode(false);
                    DeleteStaffButton.innerText = 'Видалити';
                    DeleteStaffButton.setAttribute('onclick', `DeleteStaffFromProject(${staff.id})`);

                    
                    let tr = tBody.insertRow();
                    let td = tr.insertCell(0);


                    let textNodeid = document.createTextNode(staff.id);
                    td.appendChild(textNodeid);

                    td = tr.insertCell(1);
                    let textNodeName = document.createTextNode(staff.name);
                    td.appendChild(textNodeName);

                    td = tr.insertCell(2);
                    td.appendChild(DeleteStaffButton);
                });

            })
            .catch(error => console.error('Unable to get staff.', error));


    }

    window.DeleteStaffFromProject = function DeleteStaffFromProject( staffid )
    {
        console.log(staffid)
    }

    window.CloseEditProjectStaffForm =function CloseEditProjectStaffForm()
    {
        document.getElementById('EditProjectStaff').style.display = 'none';
    }

    getProjects()

   
}
) ()
