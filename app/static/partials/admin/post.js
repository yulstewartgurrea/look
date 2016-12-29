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
    var catalog_id =$('#catalog_id2').val();
    var gender_id =$('#gender_id2').val();
    var category_id =$('#category_id2').val();
    var subcategory_id =$('#subcategory_id').val();
    var image =$('#image').val();
    var price =$('#price').val();


    var data = JSON.stringify({"establishment_id": establishment_id ,"product_name": product_name,
                "product_description": product_description, "catalog_id": catalog_id,
            "product_gender": gender_id, "product_category": category_id,
        "product_subcategory": subcategory_id, "price": price, "image": image });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/product',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.status=='Ok') {
                alert("Product Added!")
            } else {
                alert("error")
            }
        }
    });
}