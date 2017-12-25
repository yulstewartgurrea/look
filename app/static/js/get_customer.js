window.onload = function () {
    var fname = window.localStorage.getItem('fname', fname)
    var lname = window.localStorage.getItem('lname', lname)
    var user_id = window.localStorage.getItem('user_id', user_id)

    $('#fullname').html(fname+ ' '+ lname);
    $('#fullname2').html(fname+ ' '+ lname + ' - Web Developer <small>Member since Nov. 2012</small>');
    $('#fullname3').html(fname+ ' '+ lname);
    $('#fullname4').html('Welcome, '+fname+ ' '+ lname);
    $('#myaccount').html('<li onclick="getuseraccount('+user_id+');">'+'<a href="#">'+'My Account'+'</a>'+'</li>');
    $('#updateuseraccount1').html('<a class="readmore" href="#">'+ 'Update'+ '</a>');
    $('#updateuseraccount2').html('<a class="readmore" href="#">'+ 'Update'+ '</a>');
    $('#updateuseraccount3').html('<a class="readmore" href="#">'+ 'Update'+ '</a>');


    // $('#admins').html(admins);


}

function getuseraccount(user_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/account/'+ user_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#useraccountpersonaldetails").html("");
            $("#useraccountbillingaddress").html("");
            $("#useraccountpermanentaddress").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.useraccountcount; i++) {
                    user_id = res.useraccount[i].user_id;
                    fname = res.useraccount[i].fname;
                    lname = res.useraccount[i].lname;
                    email_address = res.useraccount[i].email_address;
                    img = res.useraccount[i].img;
                    $("#useraccountpersonaldetails").append(getuseraccountpersonaldetailshtml(user_id, fname, lname, email_address, img))
                }

                for(i=0; i<res.billingaddresscount; i++) {
                    billingaddress_user_id = res.billingaddress[i].user_id;
                    billingaddress_postalcode = res.billingaddress[i].postalcode;
                    billingaddress_brgy = res.billingaddress[i].brgy;
                    billingaddress_city = res.billingaddress[i].city;
                    billingaddress_street = res.billingaddress[i].street;
                    billingaddress_pnum = res.billingaddress[i].pnum;
                    $("#useraccountbillingaddress").append(getuseraccountbillingaddresshtml(billingaddress_user_id, billingaddress_postalcode,
                    	billingaddress_brgy, billingaddress_city, billingaddress_street, billingaddress_pnum))
                }

                for(i=0; i<res.permanentaddresscount; i++) {
                    permanentaddress_user_id = res.permanentaddress[i].user_id;
                    permanentaddress_postalcode = res.permanentaddress[i].postalcode;
                    permanentaddress_brgy = res.permanentaddress[i].brgy;
                    permanentaddress_city = res.permanentaddress[i].city;
                    permanentaddress_street = res.permanentaddress[i].street;
                    permanentaddress_pnum = res.permanentaddress[i].pnum;
                    $("#useraccountpermanentaddress").append(getuseraccountpermanentaddresshtml(permanentaddress_user_id, permanentaddress_postalcode,
                    	permanentaddress_brgy, permanentaddress_city, permanentaddress_street, permanentaddress_pnum))
                }

                $("#page_landing").hide();
                $("#page_useraccount").show();
                $("#page_products").hide();
                $("#page_productdetails").hide();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#useraccountpersonaldetails").show();
                $("#useraccountbillingaddress").show();
                $("#useraccountpermanentaddress").show();
                $("#genderinclothing").hide();


            } else {
                $("#useraccountdetails").html("");
                $("#useraccountbillingaddress").html("");
            	$("#useraccountpermanentaddress").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
    });
}

function getuseraccountpersonaldetailshtml(user_id, fname, lname, email_address, img) {
	return 	'<p> Name: ' + fname + ' ' + lname + '</p>' +
			'<p> Email_address: ' + email_address + '</p>' 



}

function getuseraccountbillingaddresshtml(billingaddress_user_id, billingaddress_postalcode,
                    	billingaddress_brgy, billingaddress_city, billingaddress_street, billingaddress_pnum) {
	return 	'<p>' + billingaddress_street + ' ' + billingaddress_brgy + ' ' + billingaddress_city  + ' City' +'</p>' 
	
}

function getuseraccountpermanentaddresshtml(permanentaddress_user_id, permanentaddress_postalcode,
                    	permanentaddress_brgy, permanentaddress_city, permanentaddress_street, permanentaddress_pnum) {
	return 	'<p>' + permanentaddress_street + ' ' + permanentaddress_brgy + ' ' + permanentaddress_city  + ' City' +'</p>' 
	
}

function get_allproducts() {
	$.ajax({
        url: 'http://127.0.0.1:5000/api/get/product',
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#allproducts").html("");
            $("#customeracategories").html("")
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    product_description = res.entries[i].product_description;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    catalog_id = res.entries[i].catalog_id;
                    gender_id = res.entries[i].gender_id;
                    category_id = res.entries[i].category_id;
                    subcategory_id = res.entries[i].subcategory_id;
                    establishment_id = res.entries[i].establishment_id;
                    $("#allproducts").append(get_allproductshtml(product_id, product_name, price, image, establishment_id))
                }

                for(i=0; i<res.catalogcount; i++) {
                    catalog_id = res.catalog[i].catalog_id;
                    catalog_name = res.catalog[i].catalog_name;
                    $("#customeracategories").append(get_allproductscategorieshtml(catalog_id, catalog_name))
                }

                $("#page_landing").hide();
                $("#page_useraccount").hide();
                $("#page_products").show();
                $("#page_productdetails").hide();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#allproducts").show();
                $("#productdetails").hide();
                $("#genderinclothing").hide();
                $("#productbycatalog").hide();


            } else {
            	$("#allproducts").html("");
            	$("#customeracategories").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
    });
}

function get_allproductshtml(product_id, product_name, price, image, establishment_id) {
	return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    // '<span class="sale-text">Sale</span>'+
                   ' <div class="product-img">'+
                        '<a href="#">'+
                            '<img class="primary-image" src="../../media/'+image+'" alt="" />'+
                            // '<img class="secondary-image" src="../../web/img/product/18.jpg" alt="" />'+
                        '</a>'+
                       ' <div class="actions">'+
                            '<div class="action-buttons">'+
                                '<div class="add-to-cart">'+
                                    '<a href="#">Add to cart</a>'+
                                '</div>'+
                                '<div class="add-to-links">'+
                                    '<div class="add-to-wishlist">'+
                                        '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="compare-button">'+
                                        '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                                    '</div>'+                                 
                                '</div>'+
                                '<div class="quickviewbtn">'+
                                    '<a href="#" data-toggle="tooltip" title="Quick View"><i class="fa fa-search-plus"></i></a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'  +                        
                    '</div>'+
                    '<div class="product-content">'+
                        '<h2 class="product-name" onclick="get_productbyid(\''+product_id+'\', '+establishment_id+');"><a href="#">'+product_name+'</a></h2>'+
                        // '<div class="pro-rating">'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        // '</div>'+
                        '<div class="price-box">'+
                            '<span class="new-price">Php'+price+'</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'

}

function get_allproductscategorieshtml(catalog_id, catalog_name) {
	return '<li onclick="get_productandgenderbyclothing('+catalog_id+');">'+'<a href="#">' +catalog_name+'('+catalog_id+')'+ '</a>'+'</li>';

}

function get_productbyid(product_id, establishment_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/product/'+product_id+'/'+establishment_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#productdetails").html("");

            var map;
            var marker
            var coordinates = [];
            

            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    product_description = res.entries[i].product_description;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    establishment_id = res.entries[i].establishment_id;
                    establishment_name = res.entries[i].establishment_name;
                    latitude = res.entries[i].latitude;
                    longitude = res.entries[i].longitude;
                    establishment_location = res.entries[i].establishment_location;
                    image1 = res.entries[i].image1;
                    image2 = res.entries[i].image2;
                    image3 = res.entries[i].image3;
                    image4 = res.entries[i].image4;
                    // coordinates.push(latitude);
                    // coordinates.push(longitude);
                    $("#productdetails").append(get_productdetailshtml(product_id, product_name, product_description, price, image,
                                    establishment_id, establishment_name, latitude, longitude, establishment_location,
                                    image1, image2, image3, image4))
                }

                console.log(coordinates);
                // var latitude = 8.229237;
                // var longitude = 124.237868;
                // var lat = coordinates[0];
                // var lng = coordinates[1];
                var latitude = parseFloat(latitude);
                var longitude = parseFloat(longitude);
                console.log(latitude);
                console.log(longitude);

                var latlang = {lat: latitude, lng: longitude};

                var coordinates2 = {
                    zoom: 19,
                    center: latlang
                }

                map = new google.maps.Map(document.getElementById('map'), coordinates2);

                marker = new google.maps.Marker({
                    position: latlang,
                    map: map,
                    title: 'Penshoppe'
                });

                marker.setMap(map);

                document.getElementById('cart_productid').value = product_id;
                
                $("#page_landing").hide();
                $("#page_useraccount").hide();
                $("#page_products").hide();
                $("#page_productdetails").show();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#allproducts").hide();
                $("#productdetails").show();
                $("#genderinclothing").hide();
                $("#productbycatalog").hide();
                $("#map").show();
                $("#maps").show();


            } else {
                $("#allproducts").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
    });

}

function get_productdetailshtml(product_id, product_name, product_description, price, image,
                                establishment_id, establishment_name, latitude, longitude, establishment_location,
                                image1, image2, image3, image4) {
    return '<div class="product-simple-area" >'+
            '<div class="container">'+
                '<div class="row">'+
                    '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
                        '<div class="single-product-image">'+
                            '<div class="single-product-tab">'+
                              '<!-- Nav tabs -->'+
                              '<ul class="nav nav-tabs" role="tablist">'+
                                '<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab"><img alt="" src="../../media/'+image1+'"></a></li>'+
                                '<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab"><img alt="" src="../../media/'+image2+'"></a></li>'+
                                '<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab"><img alt="" src="../../media/'+image3+'"></a></li>'+
                                '<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab"><img alt="" src="../../media/'+image4+'"></a></li>'+
                              '</ul>'+

                              '<!-- Tab panes -->'+
                              '<div class="tab-content">'+
                                '<div role="tabpanel" class="tab-pane active" id="home"><img alt="" src="../../media/'+image+'"></div>'+
                                // '<div role="tabpanel" class="tab-pane" id="profile"><img alt="" src="../../web/img/product/tab/2.jpg"></div>'+
                                // '<div role="tabpanel" class="tab-pane" id="messages"><img alt="" src="../../web/img/product/tab/3.jpg"></div>'+
                                // '<div role="tabpanel" class="tab-pane" id="settings"><img alt="" src="../../web/img/product/tab/4.jpg"></div>'+
                              '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
                        '<div class="single-product-info">'+
                            '<div class="product-nav">'+
                                '<a href="#"><i class="fa fa-angle-right"></i></a>'+
                            '</div>'+
                            '<h3 class="product_title">'+product_name+'</h3>'+
                            '<div class="price-box">'+
                                '<span class="new-price">'+price+'.00</span>'+
                                '<span class="old-price">£190.00</span>'+
                            '</div>'+
                            '<div class="pro-rating">'+
                                '<a href="#"><i class="fa fa-star"></i></a>'+
                                '<a href="#"><i class="fa fa-star"></i></a>'+
                                '<a href="#"><i class="fa fa-star"></i></a>'+
                                '<a href="#"><i class="fa fa-star"></i></a>'+
                                '<a href="#"><i class="fa fa-star"></i></a>'+
                            '</div>'+
                            '<div class="short-description">'+
                                '<p>Lorem ipsum dolor sit amet, consectetur adip+iscing elit. Nam fringilla augue nec est tristique auctor.' +
                                'Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. '+
                                'Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>'  +                    
                            '</div>'+
                            '<div class="stock-status">'+
                                '<label>Availability</label>: <strong>In stock</strong>'+
                            '</div>'+
                            '<form action="#">'+
                                '<div class="quantity">'+
                                    '<input type="number" value="1" />'+
                                    '<button type="submit">Add to cart</button>'+
                                '</div>'+
                            '</form>'+
                            '<div class="add-to-wishlist">'+
                                '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i></a>'+
                                '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                            '</div>'+
                            '<div class="share_buttons">'+
                                '<a href="#"><img src="../../web/img/share-img.png" alt="" /></a>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
        '<!-- product-simple-area end -->'+
        '<div class="product-tab-area">'+
            '<div class="container">'+
                '<div class="row">'+
                    '<div class="col-lg-9 col-md-9">'+
                        '<div class="product-tabs">'+
                            '<div>'+
                              '<!-- Nav tabs -->'+
                              '<ul class="nav nav-tabs" role="tablist">'+
                                '<li role="presentation" class="active"><a href="#tab-desc" aria-controls="tab-desc" role="tab" data-toggle="tab">Description</a></li>'+
                                '<li role="presentation"><a href="#page-comments" aria-controls="page-comments" role="tab" data-toggle="tab">Reviews (1)</a></li>'+
                              '</ul>'+
                              '<!-- Tab panes -->'+
                              '<div class="tab-content">'+
                                '<div role="tabpanel" class="tab-pane active" id="tab-desc">'+
                                    '<div class="product-tab-desc">'+
                                        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor.'+
                                        'Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper.' +
                                        'Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.</p>'+
                                        '<p>Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem,' +
                                        'quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa.' +
                                        'Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque.'+ 
                                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum,' +
                                        'metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc.' +
                                        'Etiam gravida vehicula tellus, in imperdiet ligula euismod eget.</p>'+
                                    '</div>'+
                                '</div>'+
                                '<div role="tabpanel" class="tab-pane" id="page-comments">'+
                                    '<div class="product-tab-desc">'+
                                        '<div class="product-page-comments">'+
                                            '<h2>1 review for Integer consequat ante lectus</h2>'+
                                            '<ul>'+
                                                '<li>'+
                                                    '<div class="product-comments">'+
                                                        '<img src="../../web/img/blog/avatar.png" alt="" />'+
                                                        '<div class="product-comments-content">'+
                                                            '<p><strong>admin</strong> -'+
                                                                '<span>March 7, 2015:</span>'+
                                                                '<span class="pro-comments-rating">'+
                                                                    '<i class="fa fa-star"></i>'    +                          
                                                                    '<i class="fa fa-star"></i>'  +                            
                                                                    '<i class="fa fa-star"></i>'  +                            
                                                                    '<i class="fa fa-star"></i>'  +                            
                                                                '</span>'+
                                                           ' </p>'+
                                                            '<div class="desc">'+
                                                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'+
                                                                'Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum.'+
                                                            '</div>'+
                                                        '</div>'+
                                                    '</div>'+
                                                '</li>'+
                                            '</ul>'+
                                            '<div class="review-form-wrapper">'+
                                                '<h3>Add a review</h3>'+
                                                '<form action="#">'+
                                                    '<input type="text" placeholder="your name"/>'+
                                                    '<input type="email" placeholder="your email"/>'+
                                                    '<div class="your-rating">'+
                                                        '<h5>Your Rating</h5>'+
                                                        '<span>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                        '</span>'+
                                                        '<span>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                        '</span>'+
                                                        '<span>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                        '</span>'+
                                                        '<span>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                            '<a href="#"><i class="fa fa-star"></i></a>'+
                                                        '</span>'+
                                                    '</div>'+
                                                    '<textarea id="product-message" cols="30" rows="10" placeholder="Your Rating"></textarea>'+
                                                    '<input type="submit" value="submit" />'+
                                                '</form>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                              '</div>'+
                            '</div>'+                      
                        '</div>'+
                        '<div class="clear"></div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
}

function get_productandgenderbyclothing(catalog_id) {
    if(catalog_id == 14) {
        $.ajax({
        url: 'http://127.0.0.1:5000/api/get/catalog/'+catalog_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#productbyclothingcatalog").html("");
            $("#genderinclothing").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    catalog_id = res.entries[i].catalog_id;
                    establishment_id = res.entries[i].establishment_id;
                    $("#productbyclothingcatalog").append(get_productbycataloghtml(product_id, product_name, price, image, catalog_id, establishment_id))
                }

                var catalog_id = catalog_id;

                for(i=0; i<res.gendercount; i++) {
                    gender_id = res.genderentries[i].gender_id;
                    gender_name = res.genderentries[i].gender_name;
                    $("#genderinclothing").append(get_genderinclothinghtml(catalog_id, gender_id, gender_name))
                }

                $("#page_landing").hide();
                $("#page_useraccount").hide();
                $("#page_products").show();
                $("#page_productdetails").hide();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#allproducts").hide();
                $("#productdetails").hide();
                $("#genderinclothing2").show();
                $("#genderinclothing").show();
                $("#productbyclothingcatalog").show();
                $("#productbycataloggender").hide();
                $("#productbycataloggendercategory").hide();
                $("#categoriesbycatalog2").hide();
                $("#categoriesbycatalog").hide();
                $("#productbycatalog").hide();



            } else {
                $("#allproducts").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
        });

    } else {
        $.ajax({
        url: 'http://127.0.0.1:5000/api/get/catalog/'+catalog_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#productbycatalog").html("");
            $("#categoriesbycatalog").html("");

            // $("#genderinclothing").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    catalog_id = res.entries[i].catalog_id;
                    establishment_id = res.entries[i].establishment_id;
                    $("#productbycatalog").append(get_productbycataloghtml(product_id, product_name, price, image, catalog_id, establishment_id))
                }

                var catalog_id = catalog_id;
                for(i=0; i<res.categorycount; i++) {
                    category_id = res.categoryentries[i].category_id;
                    category_name = res.categoryentries[i].category_name;
                    $("#categoriesbycatalog").append(get_categorybycatalog(category_id, category_name, catalog_id))
                }

                $("#page_landing").hide();
                $("#page_useraccount").hide();
                $("#page_products").show();
                $("#page_productdetails").hide();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#allproducts").hide();
                $("#productdetails").hide();
                $("#genderinclothing2").hide();
                $("#genderinclothing").hide();
                $("#productbyclothingcatalog").hide();
                $("#productbycatalog").show();
                $("#categoriesbycatalog2").show();
                $("#categoriesbycatalog").show();

            } else {
                $("#allproducts").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
        });

    }
}

function get_productbycataloghtml(product_id, product_name, price, image, catalog_id, establishment_id) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    // '<span class="sale-text">Sale</span>'+
                   ' <div class="product-img">'+
                        '<a href="#">'+
                            '<img class="primary-image" src="../../media/'+image+'" alt="" />'+
                            // '<img class="secondary-image" src="../../web/img/product/18.jpg" alt="" />'+
                        '</a>'+
                       ' <div class="actions">'+
                            '<div class="action-buttons">'+
                                '<div class="add-to-cart">'+
                                    '<a href="#">Add to cart</a>'+
                                '</div>'+
                                '<div class="add-to-links">'+
                                    '<div class="add-to-wishlist">'+
                                        '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="compare-button">'+
                                        '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                                    '</div>'+                                 
                                '</div>'+
                                '<div class="quickviewbtn">'+
                                    '<a href="#" data-toggle="tooltip" title="Quick View"><i class="fa fa-search-plus"></i></a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'  +                        
                    '</div>'+
                    '<div class="product-content">'+
                        '<h2 class="product-name" onclick="get_productbyid(\''+product_id+'\', '+establishment_id+');"><a href="#">'+product_name+'</a></h2>'+
                        // '<div class="pro-rating">'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        // '</div>'+
                        '<div class="price-box">'+
                            '<span class="new-price">Php'+price+'</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'

}

function get_genderinclothinghtml(catalog_id, gender_id, gender_name) {
    return '<li onclick="get_productbycataloggender(\''+catalog_id+'\', '+gender_id+');"><a href="#">'+gender_name+'</a><span class="count">'+gender_id+'</span></li>';
}

function get_categorybycatalog(category_id, category_name, catalog_id) {
    return '<li onclick="get_productbycatalogcategory(\''+catalog_id+'\', '+category_id+');"><a href="#">'+category_name+'</a><span class="count">'+category_id+'</span></li>';
}

function get_productbycataloggender(catalog_id, gender_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/catalog/'+catalog_id+'/gender/'+gender_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#productbycataloggender").html("");
            $("#clothingcategories").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    catalog_id = res.entries[i].catalog_id;
                    gender_id = res.entries[i].gender_id;
                    establishment_id = res.entries[i].establishment_id;
                    $("#productbycataloggender").append(get_productbycataloggenderhtml(product_id, product_name, price, image, catalog_id,
                                gender_id, establishment_id))
                }

                for(i=0; i<res.categorycount; i++) {
                    category_id = res.categoryentries[i].category_id;
                    category_name = res.categoryentries[i].category_name;
                    $("#clothingcategories").append(get_categorybycataloggenderhtml(category_id, category_name, catalog_id, gender_id))
                }

                $("#page_landing").hide();
                $("#page_useraccount").hide();
                $("#page_products").show();
                $("#page_productdetails").hide();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#allproducts").hide();
                $("#productdetails").hide();
                $("#genderinclothing2").show();
                $("#genderinclothing").show();
                $("#productbycatalog").hide();
                $("#productbycataloggender").show();
                $("#clothingcategories2").show();
                $("#clothingcategories").show();
                $("#productbycataloggendercategory").hide();
                $("#productbyclothingcatalog").hide();

            } else {
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
    });

}

function get_productbycataloggenderhtml(product_id, product_name, price, image, catalog_id, gender_id, establishment_id) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    // '<span class="sale-text">Sale</span>'+
                   ' <div class="product-img">'+
                        '<a href="#">'+
                            '<img class="primary-image" src="../../media/'+image+'" alt="" />'+
                            // '<img class="secondary-image" src="../../web/img/product/18.jpg" alt="" />'+
                        '</a>'+
                       ' <div class="actions">'+
                            '<div class="action-buttons">'+
                                '<div class="add-to-cart">'+
                                    '<a href="#">Add to cart</a>'+
                                '</div>'+
                                '<div class="add-to-links">'+
                                    '<div class="add-to-wishlist">'+
                                        '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="compare-button">'+
                                        '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                                    '</div>'+                                 
                                '</div>'+
                                '<div class="quickviewbtn">'+
                                    '<a href="#" data-toggle="tooltip" title="Quick View"><i class="fa fa-search-plus"></i></a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'  +                        
                    '</div>'+
                    '<div class="product-content">'+
                        '<h2 class="product-name" onclick="get_productbyid(\''+product_id+'\', '+establishment_id+');"><a href="#">'+product_name+'</a></h2>'+
                        // '<div class="pro-rating">'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        // '</div>'+
                        '<div class="price-box">'+
                            '<span class="new-price">Php'+price+'</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
}

function get_categorybycataloggenderhtml(category_id, category_name, catalog_id, gender_id) {
    return '<li onclick="get_productbyclothinggendercategory(\''+catalog_id+'\', '+gender_id+', '+category_id+');">'+'<a href="#">'+category_name+'</a> <span class="count">'+category_id+'</span></li>'
}

function get_productbycatalogcategory(catalog_id, category_id) {
    $.ajax({
        url: 'http://127.0.0.1:5000/api/get/catalog/'+catalog_id+'/category/'+category_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#productbycatalogcategory").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    establishment_id = res.entries[i].establishment_id;
                    $("#productbycatalogcategory").append(get_productbycatalogcategoryhtml(product_id, product_name, price, image,
                                    establishment_id))
                }

                $("#page_landing").hide();
                $("#page_useraccount").hide();
                $("#page_products").show();
                $("#page_productdetails").hide();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#allproducts").hide();
                $("#productdetails").hide();
                $("#genderinclothing2").hide();
                $("#genderinclothing").hide();
                $("#productbycatalog").hide();
                $("#productbycataloggender").hide();
                $("#productbycatalogcategory").show();
                $("#productbycataloggendercategory").hide();

            } else {
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
    });

}

function get_productbycatalogcategoryhtml(product_id, product_name, price, image, establishment_id) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    // '<span class="sale-text">Sale</span>'+
                   ' <div class="product-img">'+
                        '<a href="#">'+
                            '<img class="primary-image" src="../../media/'+image+'" alt="" />'+
                            // '<img class="secondary-image" src="../../web/img/product/18.jpg" alt="" />'+
                        '</a>'+
                       ' <div class="actions">'+
                            '<div class="action-buttons">'+
                                '<div class="add-to-cart">'+
                                    '<a href="#">Add to cart</a>'+
                                '</div>'+
                                '<div class="add-to-links">'+
                                    '<div class="add-to-wishlist">'+
                                        '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="compare-button">'+
                                        '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                                    '</div>'+                                 
                                '</div>'+
                                '<div class="quickviewbtn">'+
                                    '<a href="#" data-toggle="tooltip" title="Quick View"><i class="fa fa-search-plus"></i></a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'  +                        
                    '</div>'+
                    '<div class="product-content">'+
                        '<h2 class="product-name" onclick="get_productbyid(\''+product_id+'\', '+establishment_id+');"><a href="#">'+product_name+'</a></h2>'+
                        // '<div class="pro-rating">'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        // '</div>'+
                        '<div class="price-box">'+
                            '<span class="new-price">Php'+price+'</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
}

function get_productbyclothinggendercategory(catalog_id, gender_id, category_id) {
    if(catalog_id == 14 && gender_id == 13) {
        $.ajax({
        url: 'http://127.0.0.1:5000/api/get/catalog/'+catalog_id+'/gender/'+gender_id+'/category/'+category_id,
        type: 'GET',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function(res){
            console.log(res);
            $("#productbycataloggendercategory").html("");
            if(res.status=='Ok'){
                for(i=0; i<res.count; i++) {
                    product_id = res.entries[i].product_id;
                    product_name = res.entries[i].product_name;
                    price = res.entries[i].price;
                    image = res.entries[i].image;
                    establishment_id = res.entries[i].establishment_id;
                    $("#productbycataloggendercategory").append(get_productbycataloggendercategoryhtml(product_id, product_name, price, image, establishment_id))
                }

                $("#page_landing").hide();
                $("#page_useraccount").hide();
                $("#page_products").show();
                $("#page_productdetails").hide();
                // $("#page_cart").hide();
                // $("#page_checkout").hide();

                $("#allproducts").hide();
                $("#productdetails").hide();
                $("#genderinclothing2").show();
                $("#genderinclothing").show();
                $("#productbycatalog").hide();
                $("#productbycataloggender").hide();
                $("#productbycataloggendercategory").show()

            } else {
                $("#allproducts").html("");
                alert("Error")
            }
        },

        error: function(e){
                alert("Naay wrong charot!: " + e);
        },
        // beforeSend: function (xhrObj){

        //     xhrObj.setRequestHeader("Authorization", "Basic " + btoa( auth_user ));

        // }
        });

    }
}

function get_productbycataloggendercategoryhtml(product_id, product_name, price, image, establishment_id) {
    return '<div class="col-lg-4 col-md-4 col-sm-4">'+
                '<div class="single-product">'+
                    // '<span class="sale-text">Sale</span>'+
                   ' <div class="product-img">'+
                        '<a href="#">'+
                            '<img class="primary-image" src="../../media/'+image+'" alt="" />'+
                            // '<img class="secondary-image" src="../../web/img/product/18.jpg" alt="" />'+
                        '</a>'+
                       ' <div class="actions">'+
                            '<div class="action-buttons">'+
                                '<div class="add-to-cart">'+
                                    '<a href="#">Add to cart</a>'+
                                '</div>'+
                                '<div class="add-to-links">'+
                                    '<div class="add-to-wishlist">'+
                                        '<a href="#" data-toggle="tooltip" title="Add to Wishlist"><i class="fa fa-star"></i>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="compare-button">'+
                                        '<a href="#" data-toggle="tooltip" title="Compare"><i class="fa fa-exchange"></i></a>'+
                                    '</div>'+                                 
                                '</div>'+
                                '<div class="quickviewbtn">'+
                                    '<a href="#" data-toggle="tooltip" title="Quick View"><i class="fa fa-search-plus"></i></a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'  +                        
                    '</div>'+
                    '<div class="product-content">'+
                        '<h2 class="product-name" onclick="get_productbyid(\''+product_id+'\', '+establishment_id+');"><a href="#">'+product_name+'</a></h2>'+
                        // '<div class="pro-rating">'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        //     '<a href="#"><i class="fa fa-star"></i></a>'+
                        // '</div>'+
                        '<div class="price-box">'+
                            '<span class="new-price">Php'+price+'</span>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'
}

function addtocart() {
    var cart_id = $('#cart_id').val();
    var user_id = $('#cart_userid').val();
    var product_id = $('#cart_productid').val();

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