function formValidator() {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const userLocation = document.getElementById('location').value;
    const email = document.getElementById('email').value;
    if (pwd.length < 6) {
        result.innerHTML = 'Password should be 6 characters long!'
        return;
    };
    window.location.assign('./templates/home.html');

}
