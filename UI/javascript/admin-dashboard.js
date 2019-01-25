const dashboard = document.getElementById('dashboard-info');

const parties = document.getElementById('parties').addEventListener('click', () => {
    dashboard.innerHTML = '<object height="600" width="1050" type="text/html" data="parties.html"></object>';
});

const createParty = document.getElementById('createParty').addEventListener('click', () => {
    dashboard.innerHTML = '<object height="600" width="1050" type="text/html" data="create-party.html"></object>'
});


const createOffice = document.getElementById('createOffice').addEventListener('click', () => {
    dashboard.innerHTML = '<object height="500" width="1050" type="text/html" data="create-office.html"></object>'
});



const editParty = document.getElementById('editParty').addEventListener('click', () => {
    dashboard.innerHTML = '<object height="600" width="1050" type="text/html" data="edit-party.html"></object>'
});

let editor = document.getElementsByClassName('table-data'); 
editor.isContentEditable; 
editor.contentEditable = true;