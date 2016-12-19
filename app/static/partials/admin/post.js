$(document).ready(function(){
    $('#catalogform').submit(function(e) {
        $('#catalogbutton').prop('disabled', true);
        data = $(this).serialize();
        $.ajax({
            url: 'http://127.0.0.1:5000/new_catalog',
            type: 'POST',
            data: $('#catalogform').serialize(),
            dataType: 'json',
            success: function(res) {
                if(res.status == 'Login Successful'){
                    $('form#catalogform').html('');
                    alert('Login Successful');
                } else if(res.status=='Invalid email or password') {
                    alert('Invalid email or password')
                }
                else {
                    alert('Error in database')
                }
            }
        });
        $('#catalogbutton').prop('disabled', false);
        e.preventDefault();
    });


})