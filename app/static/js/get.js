window.onload = function () {
    var fname = window.localStorage.getItem('fname', fname)
    var lname = window.localStorage.getItem('lname', lname)
    var user_id = window.localStorage.getItem('user_id', user_id)
    var catalog_name = window.localStorage.getItem('catalog_name', catalog_name)

    $('#fullname').html(fname+ ' '+ lname);
    $('#fullname2').html(fname+ ' '+ lname + ' - Web Developer <small>Member since Nov. 2012</small>');
    $('#fullname3').html(fname+ ' '+ lname);
    $('#fullname4').html('Welcome, '+fname+ ' '+ lname);
    // $('#admins').html(admins);
    $('#catalog_name').html('<p>' +catalog_name+ '</p>')   



}
    
// function getuseraccount

function getadminhtml(email_address, is_admin, is_active) {
    return '<tr>' +
                  '<td>' + email_address + '</td>' +
                  '<td>' +is_admin + '</td>' +
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

                $("#admins").append(getadminhtml(email_address, is_admin, is_active));
                    
                        
                }

                $("#page_users").show()
                $("#page_admin").show();
                $("#page_establishmentpersonnel").hide();
                $("#page_customer").hide();
                $("#page_establishment").hide();
                $("#page_catalog").hide();
                $("#page_sex").hide();
                $("#page_category").hide();
                $("#page_subcategory").hide();
                $("#page_product").hide();
                $("#prod_info").hide();

                $("#admins").show();
                $("#customers").hide();
                $("#establishments_personnels").hide();
                $("#establishments").hide();
                $("#catalogs").hide();
                $("#gender").hide();
                $("#categories").hide();
                $("#subcategories").hide();


            } else {
                $("#admins").html("");
                alert('Error')
            }

        },

    });

}

function getestablishmentpersonnelhtml(email_address, is_establishment, is_active) {
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
            $("#establishments_personnels").html("");
            if(res.status=='ok'){
                for (i=0; i<res.count; i++) {
                    email_address = res.entries[i].email_address;
                    is_establishment = res.entries[i].is_establishment;
                    is_active = res.entries[i].is_active;
                    $("#establishments_personnels").append(getestablishmentpersonnelhtml(email_address, is_establishment, is_active));
                }
            } else {
                $("#establishments_personnels").html("");
                alert('Error')
            }

            $("#page_admin").hide();
            $("#page_establishmentpersonnel").show();
            $("#page_customer").hide();
            $("#page_establishment").hide();
            $("#page_catalog").hide();
            $("#page_sex").hide();
            $("#page_category").hide();
            $("#page_subcategory").hide();
            $("#page_product").hide();
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").show();
            $("#customers").hide();
            $("#establishments").hide();
            $("#catalogs").hide();
            $("#gender").hide();
            $("#categories").hide();
            $("#subcategories").hide();
        },



    });

}

function getcustomerhtml(email_address, is_customer, is_active) {
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
                    $("#customers").append(getcustomerhtml(email_address, is_customer, is_active));
                }
            } else {
                $("#customers").html("");
                alert('Error')
            }

            $("#page_admin").hide();
            $("#page_establishmentpersonnel").hide();
            $("#page_customer").show();
            $("#page_establishment").hide();
            $("#page_catalog").hide();
            $("#page_sex").hide();
            $("#page_category").hide();
            $("#page_subcategory").hide();
            $("#page_product").hide();
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").hide();
            $("#customers").show();
            $("#establishments").hide();
            $("#catalogs").hide();
            $("#gender").hide();
            $("#categories").hide();
            $("#subcategories").hide();
        },



    });

}

function getestablishmenthtml(establishment_id, establishment_name, user_id) {

    return '<tr> ' +
              '<td>' + establishment_id+ '</td>' +
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
                  establishment_id = res.entries[i].establishment_id;
                  establishment_name = res.entries[i].establishment_name;
                  user_id = res.entries[i].user_id;
                  $("#establishments").append(getestablishmenthtml(establishment_id, establishment_name, user_id));
                }
            } else {
                $("#establishments").html("");
                alert('Error')
            }

            $("#page_admin").hide();
            $("#page_establishmentpersonnel").hide();
            $("#page_customer").hide();
            $("#page_establishment").show();
            $("#page_catalog").hide();
            $("#page_sex").hide();
            $("#page_category").hide();
            $("#page_subcategory").hide();
            $("#page_product").hide();
            $("#page_users").hide()
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").hide();
            $("#customers").hide();
            $("#establishments").show();
            $("#catalogs").hide();
            $("#gender").hide();
            $("#categories").hide();
            $("#subcategories").hide();
        
        },



    });
}

function get_cataloghtml(catalog_id, catalog_name){
    return '<tr> ' +
              '<td>' + catalog_id+ '</td>' +
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
                  catalog_id = res.entries[i].catalog_id;
                  catalog_name = res.entries[i].catalog_name;
                  $("#catalogs").append(get_cataloghtml(catalog_id, catalog_name))
                }
            } else {
                $("#catalogs").html("");
                alert("Error")
            }

            $("#page_admin").hide();
            $("#page_establishmentpersonnel").hide();
            $("#page_customer").hide();
            $("#page_establishment").hide();
            $("#page_catalog").show();
            $("#page_sex").hide();
            $("#page_category").hide();
            $("#page_subcategory").hide();
            $("#page_product").hide();
            $("#page_users").hide()
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").hide();
            $("#customers").hide();
            $("#establishments").hide();
            $("#catalogs").show();
            $("#gender").hide();
            $("#categories").hide();
            $("#subcategories").hide();

        },

    });
}

function getgenderhtml(gender_id, gender_name) {
   return '<tr> ' +
            '<td>' + gender_id+ '</td>' +
            '<td>' + gender_name+ '</td>' +
          '</tr>'

}

function getgenders() {

$.ajax({
    		url: 'http://127.0.0.1:5000/api/get/gender',
    		// url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(res) {
				$("#gender").html("");
				if (res.status  == 'ok') {
				   for (i = 0; i < res.count; i++) {
            gender_id = res.entries[i].gender_id;
            gender_name = res.entries[i].gender_name;
            $("#gender").append(getgenderhtml(gender_id, gender_name));
				   }
				} else {
					$("#gender").html("");
					alert('Error');
				}

        $("#page_admin").hide();
            $("#page_establishmentpersonnel").hide();
            $("#page_customer").hide();
            $("#page_establishment").hide();
            $("#page_catalog").hide();
            $("#page_sex").show();
            $("#page_category").hide();
            $("#page_subcategory").hide();
            $("#page_product").hide();
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").hide();
            $("#customers").hide();
            $("#establishments").hide();
            $("#catalogs").hide();
            $("#gender").show();
            $("#categories").hide();
            $("#subcategories").hide();
            $("#page_users").hide()

    		},
    		error: function (e) {
        		alert("danger");
   			},

		});
}

function getcategoryhtml(category_id, category_name, catalog_id, gender_id) {
    return '<tr> ' +
                '<td>' + category_id+ '</td>' +
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
            $("#categories").html("");
            if(res.status=='ok'){
                for(i=0; i<res.count; i++){
                    category_id = res.entries[i].category_id;
                    category_name = res.entries[i].category_name;
                    catalog_id = res.entries[i].catalog_id;
                    gender_id = res.entries[i].gender_id;
                    $("#categories").append(getcategoryhtml(category_id, category_name, catalog_id, gender_id))
                }
            } else {
                $("#categories").html("");
                alert("Error")
            }

            $("#page_admin").hide();
            $("#page_establishmentpersonnel").hide();
            $("#page_customer").hide();
            $("#page_establishment").hide();
            $("#page_catalog").hide();
            $("#page_sex").hide();
            $("#page_category").show();
            $("#page_subcategory").hide();
            $("#page_product").hide();
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").hide();
            $("#customers").hide();
            $("#establishments").hide();
            $("#catalogs").hide();
            $("#gender").hide();
            $("#categories").show();
            $("#subcategories").hide();
            $("#page_users").hide()

        },

    });
}

function getsubcategoryhtml(subcategory_id, subcategory_name, category_id) {
    return  '<tr> ' +
                '<td>' + subcategory_id+ '</td>' +
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
                    $("#subcategories").append(getsubcategoryhtml(subcategory_id, subcategory_name, category_id))
                }
            } else {
                $("#subcategories").html("");
                alert("Error")
            }

            $("#page_admin").hide();
            $("#page_establishmentpersonnel").hide();
            $("#page_customer").hide();
            $("#page_establishment").hide();
            $("#page_catalog").hide();
            $("#page_sex").hide();
            $("#page_category").hide();
            $("#page_subcategory").show();
            $("#page_product").hide();
            $("#page_users").hide()
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").hide();
            $("#customers").hide();
            $("#establishments").hide();
            $("#catalogs").hide();
            $("#gender").hide();
            $("#categories").hide();
            $("#subcategories").show();

        },

    });

}

function getproducthtml(product_id, image, product_name, price ) {
     return    '<tr> ' +
                  '<td>' + '<a href="#" onclick="getproductbyid('+product_id+');">' + product_id + '</a>'+'</td>' +
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
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++){
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    $("#products").append(getproducthtml(product_id, image, product_name, price))
                }
            } else {
                $("#products").html("");
                alert("Error")
            }

            $("#page_admin").hide();
            $("#page_establishmentpersonnel").hide();
            $("#page_customer").hide();
            $("#page_establishment").hide();
            $("#page_catalog").hide();
            $("#page_sex").hide();
            $("#page_category").hide();
            $("#page_subcategory").hide();
            $("#page_product").show();
            $("#page_users").hide()
            $("#prod_info").hide();
            $("#prod_info").hide();

            $("#admins").hide();
            $("#establishments_personnels").hide();
            $("#customers").hide();
            $("#establishments").hide();
            $("#catalogs").hide();
            $("#gender").hide();
            $("#categories").hide();
            $("#subcategories").hide();
            $("#products").show();
        }

    });

}

function getproductbyid(product_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/product/'+product_id,
        type: 'GET',
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#prod_info").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    product_description = res.entries[i].product_description;
                    $("#prod_info").append(getproductbyids(product_name, price, image, product_description))
                }

                $("#prod_info").show();
                $("#page_admin").hide();
                $("#page_establishmentpersonnel").hide();
                $("#page_customer").hide();
                $("#page_establishment").hide();
                $("#page_catalog").hide();
                $("#page_sex").hide();
                $("#page_category").hide();
                $("#page_subcategory").hide();
                $("#page_product").hide();
                $("#page_users").hide()

            } else {
                $("#prod_info").html("");
                alert("Error");
            } 
        }

    });
}

function getproductbyids(product_name, price, image, product_description) {
    return '<section class="content">'+
    '<div class="box box-default color-palette-box">'+
        '<div class="box-body">'+
    // <!-- Content Header (Page header) -->
    '<section class="content-header">'+

    '<section class="content">'+
      // <!-- COLOR PALETTE -->
//       <div class="box box-default color-palette-box">
        '<div class="box-body">'+
      '<div class="row">'+
         '<div class="col-md-3">'+
            '<img data-src="" alt="Nike black Nike Sportswear Futura Icon T-Shirt NI126AA70RQNPH_1" title="Nike Sportswear Futura Icon T-Shirt from Nike in black_1" width="236" height="345" class="b-catalogList__itm-img js-itm-img js-itm-hover-img-front" src="https://dynamic.zacdn.com/MuN21LJlMrmGQSHhgmyCTtcW5Xo=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.ph.zalora.net/p/nike-1116-929195-1.jpg">'+
         '</div>'+
          '<div class="col-md-6">'+
             '<span class="info-box-text">'+product_name+'</span>'+
             '<em class="b-catalogList__itmTitle fss">Nike Sportswear Futura Icon T-Shirt</em>'+
             '<span class="info-box-number">Php'+price+'</span>'+
             '<br>'+
              'The Nike Futura Icon Mens T-Shirt sets you up with a soft cotton jersey feel and a bold Nike corporate logo screen printed across the chest.'+
              '<br style="font-size: 12px;">'+
              '<br style="font-size: 12px;">- Cotton'+
              '<br style="font-size: 12px;">- Round neckline'+
              '<br style="font-size: 12px;">- Short sleeves'+
              '<br style="font-size: 12px;">- Smooth, soft cotton jersey fabric for all-day comfort'+
              '<br style="font-size: 12px;">- Iconic Nike corporate logo is screen printed across the chest'+
              '<br style="font-size: 12px;">- Taping at the back of the neck helps reduce irritation<br style="font-size: 12px;">- Regular fit'+
              '<br style="font-size: 12px;">- Unlined'+

              '<br><br><li><a href="#deliveryInfo" id="cms-usp__freeshipping">'+
              '<span class="product__uspTxt">Delivery above P995*</span>'+
              '<span class="btn btn-primary button pull-right"> Free</span></a></li>'+
              '<br><li><a href="#" id="cms-freeReturn"><span class="product__uspTxt">30 Days Return </span>'+
              '<span class="btn btn-primary button pull-right"> Free</span></a></li>'+
              '<br><li><a href="#" id="cms-usp__cod">'+
              '<span class="product__uspTxt">Cash On Delivery</span>'+
              '<span class="btn btn-primary button pull-right"> Yes</span></a></li>'+
          '</div>'+
          '<div class="col-md-3">'+
            '<div class="uc prdSizeTitle">Select Size</div>'+
            '<div>'+                                  
             '</div>'+
          '</div>'+
      '</div>'+
            // <!-- Main row -->
      '</div>'+
    '</div>'+
    '</section>'+
      '<div class="row">'+
        // <!-- Left col -->
        '<section class="col-lg-12 connectedSortable">'+
        '<div class="col-md-12">'+
          '<!-- Custom Tabs -->'+
          '<div class="nav-tabs-custom">'+
            '<ul class="nav nav-tabs">'+
              '<li class="active"><a href="#tab_1" data-toggle="tab">Details</a></li>'+
              '<li><a href="#tab_2" data-toggle="tab">Size Details</a></li>'+
              '<li><a href="#tab_3" data-toggle="tab">Delivery Info</a></li>'+
              '<li class="pull-right"><a href="#" class="text-muted"><i class="fa fa-gear"></i></a></li>'+
            '</ul>'+
            '<div class="tab-content">'+
              '<div class="tab-pane active" id="tab_1">'+
                '<table class="ui-grid ui-gridFull product__attr prd-attributes size1of2">'+
                   '<tbody>'+
                      '<tr>'+
                        '<td class="product__attr_name">SKU (simple)</td>'+
                        '<td itemprop="sku">NI126AA70RQNPH</td>'+
                      '</tr>'+
                      '<tr>'+
                         '<td class="product__attr_name">Colour</td>'+
                         '<td itemprop="color">BLACK</td>'+
                      '</tr>'+
                      '<tr>'+
                         '<td class="product__attr_name">Care label</td>'+
                         '<td>Machine wash cold<br style="font-size: 12px;">Do not bleach<br style="font-size: 12px;">Tumble dry low<br style="font-size: 12px;">Iron on medium<br style="font-size: 12px;">Do not dry clean</td>'+
                      '</tr>'+
                      '<tr>'+
                         '<td class="product__attr_name">Material</td>'+
                         '<td> 100% Cotton</td>'+
                      '</tr>'+
                     '</tbody>'+
                '</table>'+
              '</div>'+
              // '<!-- /.tab-pane -->
              '<div class="tab-pane" id="tab_2">'+
                '<div class="">'+
                   '<span class="mbm">Models body measurements</span>'+
                     '<p class="mtm">Height: 6'+'1"<br> Chest: 38" <br> Waistline 30" <br> Hips: 32"</p>'+
                   '<span class="mrm">Size of models garment</span>'+
                   '<span>M</span>'+
                 '</div>'+
               '</div>'+
              // <!-- /.tab-pane -->
              '<div class="tab-pane" id="tab_3">'+
                '<div>Delivered in 1-3 days for Greater NCR, 2-4 days for Major Cities, 5-7 days for Provincial Areas. All in working days'+
                '<br><br>You can enjoy free shipping on items sold by ZALORA above PHP995. '+
                '<br><br>Check when you can get your item by keying in your city and barangay in the drop-downs above.</div>'+
              '</div>'+
              // <!-- /.tab-pane -->
            '</div>'+
            // <!-- /.tab-content -->
          '</div>'+
          // <!-- nav-tabs-custom -->
        '</div>'+
        '</section>'+
      '</div>'+
      // <!-- /.row (main row) -->
    '</section> '+
            
'</div>'+     
'</div>'+

'</div>'+
'</section>'
    // <!-- /.content -->

}

