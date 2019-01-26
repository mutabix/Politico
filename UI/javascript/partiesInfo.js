
const partiesInfo = document.getElementById('parties-info');

const partiesButton = document.getElementById('parties-button').addEventListener('click', () => {
    partiesInfo.innerHTML = '<object height="480" width="1500" type="text/html" data="parties.html"></object>';
});

const candidatesButton = document.getElementById('candidates-button').addEventListener('click', () => {
    partiesInfo.innerHTML = '<object height="480" width="1500" type="text/html" data="candidates.html"></object>';
});
