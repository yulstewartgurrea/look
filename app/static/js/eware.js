// function login() {
//
//     $.ajax({
//         url:'http://127.0.0.1:5000/login/',
//         type: 'POST',
//         dataType: 'json',
//         success: function(res) {
//             if (res['message'] == 'Login successful'){
//                 $('div#message_login').html('');
//
//             } else {
//                 $('div#message_login').html('')
//
//             }
//         }
//
//
//
//
//
//     });
//
//
// }

function login() {

    $.ajax({
        url:'http://127.0.0.1:5000/login/',
        type: 'POST',
        dataType: 'json',
        success: function(res) {
            if (res['message'] == 'Login successful' && res['admin'] == True && res['active']==True){
                windows.location.href = "index.html"

            } else {
                $('div#message_login').html('<div class="alert alert-danger"><strong>Try again!</strong> Invalid login credentials.</div>')

            }
        }





    });


}
