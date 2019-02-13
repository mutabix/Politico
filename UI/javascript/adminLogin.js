function formValidator() {
    const result = document.getElementById("wrongInput");
    const pwd = document.getElementById("password").value;
    const name = document.getElementById('name').value;
    if (pwd !== 999999 && name !== 'moise') {
        result.innerHTML = 'Password and Username didn\'t match!'
        return;
    };
    window.location.assign('admin-dashboard.html');
}