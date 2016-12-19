$(document).ready(function(){
    $('#loginform').submit(function(e) {
        $('#loginbutton').prop('disabled', true);
        data = $(this).serialize();
        $.ajax({
            url: 'http://127.0.0.1:5000/login',
            type: 'POST',
            data: $('#loginform').serialize(),
            success: function(res) {
                if(res.status == 'Login Successful'){
                    $('form#loginform').html('');
                    alert('Login Successful');
                } else if(res.status=='Invalid email or password') {
                    alert('Invalid email or password')
                }
                else {
                    alert('Error in database')
                }
            }
        });
        $('#loginbutton').prop('disabled', false);
        e.preventDefault();
    });

});