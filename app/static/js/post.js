function login() {

    var email_address = $("#email_address").val();
    var password = $("#password").val();

    var data = JSON.stringify({"email_address": email_address, "password": password});

    $.ajax({
        url: 'http://127.0.0.1:5000/login',
        // url: 'http://localhost:5000/login',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res) {
            // $("#customercatalogs").html("");
            if(res.status === 'Login successful' && res.userinfo[0].is_admin===true && res.userinfo[0].is_active===true) {
                window.location.href="../partials/admin/dashboard.html";
                // window.location.assign();
                alert('Login Successful');

                localStorage.setItem('fname', res.userinfo[0].fname);
                localStorage.setItem('lname', res.userinfo[0].lname);
                localStorage.setItem('user_id', res.userinfo[0].user_id);

                

                console.log(res)

            } else if(res.status === 'Login successful' && res.userinfo[0].is_establishment===true && res.userinfo[0].is_active===true) {
                alert('Login Successful');
                window.location.href="../partials/establishment/e_dashboard.html";

                window.localStorage.setItem('fname', res.userinfo[0].fname);
                window.localStorage.setItem('lname', res.userinfo[0].lname);
                window.localStorage.setItem('user_id', res.userinfo[0].user_id);

                console.log(res)
                alert('Welcome ' + fname);


            } else if(res.status === 'Login successful' && res.userinfo[0].is_customer===true && res.userinfo[0].is_active===true) {
                alert('Login Successful');
                window.location.href="../partials/shop/index.html";

                window.localStorage.setItem('fname', res.userinfo[0].fname);
                window.localStorage.setItem('lname', res.userinfo[0].lname);
                window.localStorage.setItem('user_id', res.userinfo[0].user_id);

                for(i=0; i<res.catalogcount; i++){
                  catalog_id = res.catalog[i].catalog_id;
                  catalog_name = res.catalog[i].catalog_name;
                  $("#customercatalogs").append(get_customercataloghtml(catalog_id, catalog_name))
                }

                // $("#page_login").hide();
                $("#page_landing").show();
                $("#page_useraccount").hide();
                $("#page_products").hide();
                $("#page_productdetails").hide();

                $("#customercatalogs").show();

                console.log(res)
            } else {
                   alert('Invalid email or password');
            }
        }

    });
}

function get_customercataloghtml(catalog_id, catalog_name) {
    return '<p>' + catalog_id+ ' ' + catalog_name + '</p>' +
            '<p id="catalog_name"'> + '</p>'   
}

function fnamehtml(fname) {
    return '<p>' + fname + '</p>'
}

function logout() {
    $.ajax({
        url: 'http://127.0.0.1:5000/logout',
        type: 'POST',
        success: function(res){
            alert(res.message);
            window.location.href="../login.html"
            localStorage.clear();
        }

    });
}

function addadmin() {
    var email_address = $('#email_address').val();
    var password = $('#password').val();

    var data = JSON.stringify({"email_address": email_address, "password": password});

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/admin',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res){
            if(res.message=='Ok') {
                

                $('#modal-add-user').modal('hide');
                
                alert("Admin Added")

            } else {
                alert(res.message)
            }
        }

    });
}

function addestablishment_personnel() {
    var email_address = $('#email_address2').val();
    var password = $('#password2').val();

    var data = JSON.stringify({"email_address": email_address, "password": password});

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/establishment_personnel',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("Establishment Personnel Added")

                $('#modal-add-user').modal('hide');

            } else {
                alert(res.message)
            }
        }

    });
}

function addcustomer() {
    var email_address = $('#email_address3').val();
    var password = $('#password3').val();

    var data = JSON.stringify({"email_address": email_address, "password": password});

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/customer',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("Customer Added")

                $('#modal-add-user').modal('hide');

            } else {
                alert(res.message)
            }
        }

    });
}

function addcatalog() {
    var catalog_name = $('#catalog_name').val();

    var data = JSON.stringify({"catalog_name": catalog_name});

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/catalog',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType: 'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("Catalog Added")

                $('#modal-add-catalog').modal('hide');

            } else {
                alert(res.message)
            }
        }

    });
}

function addgender() {
    var gender_name =$('#gender_name').val();

    var data = JSON.stringify({"gender_name": gender_name});

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/gender',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){ 
            if(res.message=='Ok') {
                alert("Gender Added!")

                $('#modal-add-gender').modal('hide');

            } else {
                alert(res.message)
            }
        }
    });

}

function addestablishment() {
    var establishment_name =$('#establishment_name').val();
    var user_id =$('#user_id').val();

    var data = JSON.stringify({"user_id": user_id ,"establishment_name": establishment_name });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/establishment',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("Establishment Added!")

                $('#modal-add-establishment').modal('hide');

            } else {
                alert(res.message)
            }
        }
    });
}

function addcategory() {
    var category_name =$('#category_name').val();
    var catalog_id =$('#catalog_id').val();
    var gender_id =$('#gender_id').val();

    var data = JSON.stringify({"category_name": category_name ,"catalog_id": catalog_id, "gender_id": gender_id });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/category',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("Category Added!")

                $('#modal-add-category').modal('hide');

            } else {
                alert(res.message)
            }
        }
    });
}

function addsubcategory() {
    var subcategory_name =$('#subcategory_name').val();
    var category_id =$('#category_id').val();


    var data = JSON.stringify({"subcategory_name": subcategory_name , "category_id": category_id });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/subcategory',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("SubCategory Added!")

                $('#modal-add-subcategory').modal('hide');

            } else {
                alert(res.message)
            }
        }
    });
}

function addproduct() {
    var establishment_id =$('#establishment_id').val();
    var product_name =$('#product_name').val();
    var product_description =$('#product_description').val();
    var catalog_id2 =$('#catalog_id2').val();
    var gender_id2 =$('#gender_id2').val();
    var category_id2 =$('#category_id2').val();
    var subcategory_id =$('#subcategory_id').val();
    var image =$('#image').val();
    var price =$('#price').val();


    var data = JSON.stringify({"establishment_id": establishment_id ,"product_name": product_name,
                "product_description": product_description, "catalog_id": catalog_id2,
            "gender_id": gender_id2, "category_id": category_id2,
        "subcategory_id": subcategory_id, "price": price, "image": image });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/product',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.message=='Ok') {
                alert("Product Added!")

                $('#modal-add-product').modal('hide');
            } else {
                alert(res.message)
            }
        }
    });
}