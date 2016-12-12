function login() {

    $.ajax({
        url:'http://127.0.0.1:5000/login/',
        type: 'POST',
        dataType: 'json',
        success: function(res) {
            if (res['message'] == 'Login successful'){
                $('div#message_login').html('');
            } else {
                $('div#message_login').html('')

            }
        }





    });


}