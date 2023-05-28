(() => {

    const uri = 'api/Staffs';
    let staffs = [];

    function GetStaffDepProj() {
        fetch(uri + '/AllStaffDepProj')
            .then(response => response.json())
            .then(data => _displayStaffs(data))
            .catch(error => console.error('Unable to get staff.', error));
    }

    function _displayStaffs(data) {
        const tBody = document.getElementById('AllStaffDepProj');
        tBody.innerHTML = '';

        data.forEach(staff => {


            let tr = tBody.insertRow();

            let td1 = tr.insertCell(0);
            let textNodeid = document.createTextNode(staff.id);
            td1.appendChild(textNodeid);

            let td2 = tr.insertCell(1);
            let textNodeName = document.createTextNode(staff.position);
            td2.appendChild(textNodeName);

            let td3 = tr.insertCell(2);
            let textNodePosition = document.createTextNode(staff.name);
            td3.appendChild(textNodePosition);


        });

        staffs = data;


    }
    GetStaffDepProj()
})()


