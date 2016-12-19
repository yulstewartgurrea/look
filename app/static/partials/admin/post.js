function addcatalog() {
    var catalog_name = $('#catalog_name').val();

    var data = JSON.stringify({"catalog_name": catalog_name})

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

    var data = JSON.stringify({"gender_name": gender_name})
}