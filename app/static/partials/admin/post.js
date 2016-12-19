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
            if(res.status=='Ok') {
                alert("Catalog Added")
            } else {
                alert("Error")
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
            if(res.status=='ok') {
                alert("Gender Added!")
            } else {
                alert("error")
            }
        }
    });

}

function addestablishment() {
    var establishment_name =$(' #establishment_name').val();
    var user_id =$(' #user_id').val();

    var data = JSON.stringify({"user_id": user_id ,"establishment_name": establishment_name });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/establishment',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.status=='Ok') {
                alert("Establishment Added!")
            } else {
                alert("error")
            }
        }
    });
}

function addcategory() {
    var category_name =$(' #category_name').val();
    var catalog_id =$(' #catalog_id').val();
    var gender_id =$(' #gender_id').val();

    var data = JSON.stringify({"category_name": category_name ,"catalog_id": catalog_id, "gender_id": gender_id });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/category',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.status=='Ok') {
                alert("Category Added!")
            } else {
                alert("error")
            }
        }
    });
}

function addsubcategory() {
    var category_name =$(' #subcategory_name').val();
    var category_id =$(' #category_id').val();


    var data = JSON.stringify({"subcategory_name": subcategory_name ,"category_id": category_id });

    $.ajax({
        url: 'http://127.0.0.1:5000/api/add/subcategory',
        type: 'POST',
        contentType:"application/json; charset=utf-8",
        data: data,
        dataType:'json',
        success: function(res){
            if(res.status=='Ok') {
                alert("SubCategory Added!")
            } else {
                alert("error")
            }
        }
    });
}