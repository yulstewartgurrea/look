// $(document).ready(function(){
//     // $('#loginform').submit(function(e) {
//     //     $('#loginbutton').prop('disabled', true);
//     //     data = $(this).serialize();
//     //     $.ajax({
//     //         url: 'http://127.0.0.1:5000/login',
//     //         type: 'POST',
//     //         data: $('#loginform').serialize(),
//     //         dataType: 'json',
//     //         success: function(res) {
//     //             if(res.status == 'Login Successful'){
//     //                 $('form#loginform').html('');
//     //                 alert('Login Successful');
//     //             } else if(res.status=='Invalid email or password') {
//     //                 alert('Invalid email or password')
//     //             }
//     //             else {
//     //                 alert('Error in database')
//     //             }
//     //         }
//     //     });
//     //     $('#loginbutton').prop('disabled', false);
//     //     e.preventDefault();
//     // });
//     // var email_address = $("#email_address").val();
//     // var password = $("#password").val();
//     // var data = JSON.stringify(({"email_address": email_address, "password": password}));
//     //
//     // $.ajax({
//     //     url: 'http://127.0.0.1:5000/login',
//     //     contentType:"application/json; charset=utf-8",
//     //     type: 'POST',
//     //     data: $('form').serialize(),
//     //     dataType: 'json',
//     //     success: function(res) {
//     //         if(res.status == 'Login Successful'){
//     //             alert('Login Successful');
//     //         } else if(res.message=='Invalid email or password') {
//     //                alert('Invalid email or password')
//     //         } else {
//     //             alert('Error in database')
//     //             }
//     //         }
//     //     });
//
//
// });

function login() {

    var email_address = $("#email_address").val();
    var password = $("#password").val();

    var data = JSON.stringify(({"email_address": email_address, "password": password}));

    $.ajax({
        url: 'http://localhost:5000/login',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function(res) {
            if(res.status == 'Login Successful'){
                alert('Login Successful');

            } else if(res.status=='Invalid email or password') {
                   alert('Invalid email or password');
            } else {
                alert('Error in database');
                }
            }

    });
}