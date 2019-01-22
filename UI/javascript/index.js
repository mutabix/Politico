
    $("#usualUser").click(function () {
        $("h1").text("Log In");
        $(".logo").css({
            "width": "120px",
            "height": "120px",
            "top": "10px"
        });
        $("#signup-form").fadeOut(200);
        $("#login-form").delay(300).fadeIn(500);
        $(".other-options").fadeOut(200);
    });

    $("#signup-btn,#getpass-btn").click(function () {
        $("h1").text("Sign Up");
        $(".logo").css({
            "width": "150px",
            "height": "150px",
            "top": "30px"
        });

        $("#login-form,#fpass-form").fadeOut(200);
        $("#signup-form").delay(300).fadeIn(500);
        $(".other-options").fadeIn(300);
    });

    $("#fPass").click(function () {
        $("h1").text("Forgotten password");
        $(".logo").css({
            "width": "190px",
            "height": "190px",
            "top": "40px"
        });

        $("#signup-form").fadeOut(200);
        $("#fpass-form").delay(300).fadeIn(500);
        $(".other-options").fadeOut(200);
    });
