
const dashboard = document.getElementById('dashboard-info'); 

const parties = document.getElementById('parties').addEventListener('click', () =>{
    dashboard.innerHTML = '<object height="600" width="1050" type="text/html" data="parties.html"></object>';
});

const createParty = document.getElementById('createParty').addEventListener('click', () =>{
    dashboard.innerHTML = '<object height="600" width="1050" type="text/html" data="create-party.html"></object>'
}); 
