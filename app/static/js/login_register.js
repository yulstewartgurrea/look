function login() {

    var email_address = $("#email_address").val();
    var password = $("#password").val();

    var data = JSON.stringify({"email_address": email_address, "password": password});

    $.ajax({
        // url: 'http://127.0.0.1:5000/login',
        url: 'http://localhost:5000/login',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res) {
            if(res.status == 'Login successful' & res.active =='True'){
                alert('Login Successful');
                window.location.href="../partials/admin/dashboard.html";

            } if(res.status=='Invalid email or password') {
                   alert('Invalid email or password');
            } 
            }

    });
}

function logout() {
    $.ajax({
        url: 'http://http:127.0.0.1/logout'
    })
}