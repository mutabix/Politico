function formValidator() {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const email = document.getElementById('email').value;
    if (pwd !== '123456' && email !== 'rwibutso.mo@gmail.com') {
        result.innerHTML = 'Password and Email didn\'t match!'
        return;
    };
    window.location.assign('home.html');
}
