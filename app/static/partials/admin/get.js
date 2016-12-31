function getadmin(email_address, is_admin, is_active) {
    return '<tr>' +
                  '<td>' + email_address + '</td>' +
                  '<td>' + is_admin + '</td>' +
                  '<td>' + is_active + '</td>' +
                '</tr>'
}

function getadmins() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/admins',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $("#admins").html("");
            if(res.status=='ok'){
                for (i=0; i<res.count; i++) {
                    email_address = res.entries[i].email_address;
                    is_admin = res.entries[i].is_admin;
                    is_active = res.entries[i].is_active;
                    user_id = res.entries[i].user_id;
                    $("#admins").append(getadmin(email_address, is_admin, is_active));
                }
            } else {
                $("#admins").html("");
                alert('Error')
            }
        }



    });

}

function getcustomer(email_address, is_customer, is_active) {
    return '<tr> ' +
            '<td>' + email_address + '</td>' +
            '<td>' + is_customer + '</td>' +
            '<td>' + is_active + '</td>' +
            '</tr>'
}

function getcustomers() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/customers',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $("#customers").html("");
            if(res.status=='ok'){
                for (i=0; i<res.count; i++) {
                    email_address = res.entries[i].email_address;
                    is_customer= res.entries[i].is_customer;
                    is_active = res.entries[i].is_active;
                    $("#customers").append(getcustomer(email_address, is_customer, is_active));
                }
            } else {
                $("#customers").html("");
                alert('Error')
            }
        }



    });

}

function getestablishmentpersonnel(email_address, is_establishment, is_active) {
    return '<tr> '+
                '<td>' + email_address+ '</td>' +
                '<td>' + is_establishment+ '</td>' +
                '<td>' + is_active+ '</td>' +
            '</tr>'

}

function getestablishmentpersonnels() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/establishment_personnels',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $("#establishment_personnels").html("");
            if(res.status=='ok'){
                for (i=0; i<res.count; i++) {
                    email_address = res.entries[i].email_address;
                    is_establishment = res.entries[i].is_establishment;
                    is_active = res.entries[i].is_active;
                    $("#establishments_personnels").append(getestablishmentpersonnel(email_address, is_establishment, is_active));
                }
            } else {
                $("#establishments_personnels").html("");
                alert('Error')
            }
        }



    });

}

function getgender(gender_name)
{
   return '<tr> ' +
            '<td>' + gender_name+ '</td>' +
           '</tr>'

}

function getgenders() {

$.ajax({
    		url: 'http://127.0.0.1:5000/api/get/gender',
    		// url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("#gender").html("");
				if (resp.status  == 'ok') {
				   for (i = 0; i < resp.count; i++) {
					   gender_name = resp.entries[i].gender_name;
                       $("#gender").append(getgender(gender_name));
				   }
				} else {
					$("#gender").html("");
					alert('Error');
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},

		});
}

function getestablishment(establishment_name, user_id) {

    return '<tr> ' +
            '<td>' + establishment_name+ '</td>' +
            '<td>' + user_id+ '</td>' +
           '</tr>'
}

function getestablishments() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/establishment',
        contentType:"application/json; charset=utf-8",
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $("#establishments").html("");
            if(res.status=='ok'){
                for (i=0; i<res.count; i++) {
                    establishment_name = res.entries[i].establishment_name;
                    user_id = res.entries[i].user_id;
                    $("#establishments").append(getestablishment(establishment_name, user_id));
                }
            } else {
                $("#establishments").html("");
                alert('Error')
            }
        }



    });
}

function get_catalog(catalog_name){
    return '<tr> ' +
            '<td>' + catalog_name+ '</td>' +
            '</tr>'
}

function getcatalogs() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/catalog',
        type: 'GET',
        dataType: 'json',
        success: function(res){
            $("#catalogs").html("");
            if(res.status=='ok'){
                for(i=0; i<res.count; i++){
                    catalog_name = res.entries[i].catalog_name;
                    $("#catalogs").append(get_catalog(catalog_name))
                }
            } else {
                $("#catalogs").html("");
                alert("Error")
            }
        }

    });
}

function getcategory(category_id, category_name, catalog_id, gender_id) {
    return '<tr> ' +
                '<td>' + category_name+ '</td>' +
                '<td>' + catalog_id+ '</td>' +
                '<td>' + gender_id+ '</td>' +
            '</tr>'

}



function getcategories(){
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/category',
        type: 'GET',
        dataType: 'json',
        success: function(res){
            $("#categoriess").html("");
            if(res.status=='ok'){
                for(i=0; i<res.count; i++){
                    category_id = res.entries[i].category_id;
                    category_name = res.entries[i].category_name;
                    catalog_id = res.entries[i].catalog_id;
                    gender_id = res.entries[i].gender_id;
                    $("#categoriess").append(getcategory(category_id, category_name, catalog_id, gender_id))
                }
            } else {
                $("#categoriess").html("");
                alert("Error")
            }
        }

    });
}

function getsubcategory(subcategory_id, subcategory_name, category_id) {
    return      '<tr> ' +
                  '<td>' + subcategory_name+ '</td>' +
                  '<td>' + category_id+ '</td>' +
                '</tr>'

}

function getsubcategories() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/subcategory',
        type: 'GET',
        dataType: 'json',
        success: function(res){
            $("#subcategories").html("");
            if(res.status=='ok'){
                for(i=0; i<res.count; i++){
                    subcategory_id = res.entries[i].subcategory_id;
                    subcategory_name = res.entries[i].subcategory_name;
                    category_id = res.entries[i].category_id;
                    $("#subcategories").append(getsubcategory(subcategory_id, subcategory_name, category_id))
                }
            } else {
                $("#subcategories").html("");
                alert("Error")
            }
        }

    });

}

function getproduct(product_id, image, product_name, price ) {
     return    '<tr> ' +
                  '<td>' + product_id+ '</td>' +
                  '<td>' + image+ '</td>' +
                  '<td>' + product_name + '</td>' +
                  '<td>' + price + '</td>' +
                '</tr>'


}


function getproducts() {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/product',
        type: 'GET',
        dataType: 'json',
        success: function(res){
            $("#products").html("");
            if(res.status=='ok'){
                for(i=0; i<res.count; i++){
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    $("#products").append(getproduct(product_id, image, product_name, price))
                }
            } else {
                $("#products").html("");
                alert("Error")
            }
        }

    });

}

