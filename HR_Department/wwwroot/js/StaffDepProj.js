(() => {

    const uri = 'api/Staffs';
    let staffs = [];

    function GetStaffDepProj()
    {
        fetch(uri +'/StaffDepProj')
            .then(response => response.json())
            .then(data => _displayStaffs(data))
            .catch(error => console.error('Unable to get staff.', error));
    }

    function _displayStaffs(data) {
        const tBody = document.getElementById('StaffDepProj');
        tBody.innerHTML = '';

        const button = document.createElement('button');

        data.forEach(staff => {
            

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
            let textNodeDepartment = document.createTextNode(staff.department?.name);
            td4.appendChild(textNodeDepartment);

            let td5 = tr.insertCell(4);
            let projectslist = staff.projects.map(project => project.name).join("\r\n")
            let textNodeprojectslist = document.createTextNode(projectslist);
            td5.appendChild(textNodeprojectslist);

          
        });

        staffs = data;

        
    }
    GetStaffDepProj()
})()

   
