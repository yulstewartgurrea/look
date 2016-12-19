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
                if(res.status == 'Ok'){
                    $('form#catalogform').html('');
                    alert('Catalog Added');
                } else if(res.status=='Error') {
                    alert('Error')
                }
                else {
                    alert('Error in database')
                }
            }
        });
        $('#catalogbutton').prop('disabled', false);
        e.preventDefault();
    });


});