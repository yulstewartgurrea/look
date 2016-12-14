function login() {

    $.ajax({
        url:'http://127.0.0.1:5000/login',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.message == 'Login successful'){
                $('div#message_login').html('<div class="alert alert-danger"><strong>Valid</strong> Valid login credentials.</div>')
            } else {
                console.log('error')
                $('div#message_login').html('<div class="alert alert-danger"><strong>Try again!</strong> Invalid login credentials.</div>')

            }

        },
        error: function (e) {
                  alert('Not authorized!')
                  console.log(e);

                }

    });


}

function new_customer() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_customer',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });


}

function new_establishment() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_establishment',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });
}

function new_admin() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_admin',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });
}

function new_gender() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_gender',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });
}

function new_catalog() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_catalog',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });
}

function new_category() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_category',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });
}

function new_subcategory() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_subcategory',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });
}

function new_product() {
    $.ajax({
        url: 'http://127.0.0.1:5000/new_product',
        type: 'POST',
        data: $('form').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status == 'ok') {
                console.log(res);
            } else {
                console.log('error')
            }
        }

    });
}



