function formValidator() {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const email = document.getElementById('email').value;
    if (!email && pwd.length < 6) {
        result.innerHTML = 'Invalid email or  wrong password'
        return;
    };
    window.location.assign('home.html');
}
