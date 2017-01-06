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
                  // '<td>' + product_id+ '</td>' +
                 // '<td>'+'<button onclick="viewFoodById('+ results.entries[i].food_id +'); $(\'#view-food\').show();$(\'#view-resto\').hide();$(\'#view-all-resto\').hide()" class="btn btn-info">Details</button>'+'</td>'+
                  '<td>'+'<button type="button" onclick="getproductbyid('+product_id+');">' +product_id+'</button>'+'</td>' +
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

function getproductbyids(product_name, price, image, product_description) {
    return  '<section class="content">'+
      // <!-- COLOR PALETTE -->
      '<div class="box box-default color-palette-box">'+
        '<div class="box-body">'+
    // <!-- Content Header (Page header) -->
    '<section class="content-header">'+

    '<section class="content">'+
      // <!-- COLOR PALETTE -->
//       <div class="box box-default color-palette-box">
//         <div class="box-body">
//       <div class="row">
//          <div class="col-md-3">
//             <img data-src="" alt="Nike black Nike Sportswear Futura Icon T-Shirt NI126AA70RQNPH_1" title="Nike Sportswear Futura Icon T-Shirt from Nike in black_1" width="236" height="345" class="b-catalogList__itm-img js-itm-img js-itm-hover-img-front" src="https://dynamic.zacdn.com/MuN21LJlMrmGQSHhgmyCTtcW5Xo=/fit-in/236x345/filters:quality(90):fill(ffffff)/http://static.ph.zalora.net/p/nike-1116-929195-1.jpg">
//          </div>
//           <div class="col-md-6">
//              <span class="info-box-text">Nike</span>
//              <em class="b-catalogList__itmTitle fss">Nike Sportswear Futura Icon T-Shirt</em>
//              <span class="info-box-number">PHP1800</span>
//              <br>
//               The Nike Futura Icon Men's T-Shirt sets you up with a soft cotton jersey feel and a bold Nike corporate logo screen printed across the chest.
//               <br style="font-size: 12px;">
//               <br style="font-size: 12px;">- Cotton
//               <br style="font-size: 12px;">- Round neckline
//               <br style="font-size: 12px;">- Short sleeves
//               <br style="font-size: 12px;">- Smooth, soft cotton jersey fabric for all-day comfort
//               <br style="font-size: 12px;">- Iconic Nike corporate logo is screen printed across the chest
//               <br style="font-size: 12px;">- Taping at the back of the neck helps reduce irritation<br style="font-size: 12px;">- Regular fit
//               <br style="font-size: 12px;">- Unlined

//               <br><br><li><a href="#deliveryInfo" id="cms-usp__freeshipping">
//               <span class="product__uspTxt">Delivery above P995*</span>
//               <span class="btn btn-primary button pull-right"> Free</span></a></li>
//               <br><li><a href="#" id="cms-freeReturn"><span class="product__uspTxt">30 Days Return </span>
//               <span class="btn btn-primary button pull-right"> Free</span></a></li>
//               <br><li><a href="#" id="cms-usp__cod">
//               <span class="product__uspTxt">Cash On Delivery</span>
//               <span class="btn btn-primary button pull-right"> Yes</span></a></li>  
//           </div>
//           <div class="col-md-3">
//             <div class="uc prdSizeTitle">Select Size</div>
//             <div>
//                 <select id="SizeSystem" class="prdSizeOption__sizeSystem">
//                     <option selected="selected" value="International" style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(0, 0, 0); ">International</option>
//                 </select>                                   
//                     <select class="js-subSelect prdSizeOption__sizeDetail">
//                     <option>size</option>
//                       <option class="prd-option-item opt-Sitem-0" data-attribute="size" data-value-class="opt-Sitem-0" data-value-size="S" value="opt-Sitem-0">S</option>
//                       <option class="prd-option-item opt-Mitem-1" data-attribute="size" data-value-class="opt-Mitem-1" data-value-size="M" value="opt-Mitem-1">M</option>
//                       <option class="prd-option-item opt-Litem-2" data-attribute="size" data-value-class="opt-Litem-2" data-value-size="L" value="opt-Litem-2">L</option>
//                       <option class="prd-option-item opt-XLitem-3" data-attribute="size" data-value-class="opt-XLitem-3" data-value-size="XL" value="opt-XLitem-3" style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: rgb(0, 0, 0); ">XL</option>
//                     </select><br>
//              </div>
//           </div>
//             <div>
//               <br><br><br><span class="btn btn-primary button fa fa-shopping-cart"> ADD TO BAG</span>
//               <br><br><span class="btn btn-primary button fa fa-heart"> ADD TO WISHLIST</span>
//             </div>
//       </div>
//             <!-- Main row -->
//       </div>
//     </div>
//     </section>
//       <div class="row">
//         <!-- Left col -->
//         <section class="col-lg-12 connectedSortable">
//         <div class="col-md-12">
//           <!-- Custom Tabs -->
//           <div class="nav-tabs-custom">
//             <ul class="nav nav-tabs">
//               <li class="active"><a href="#tab_1" data-toggle="tab">Details</a></li>
//               <li><a href="#tab_2" data-toggle="tab">Size Details</a></li>
//               <li><a href="#tab_3" data-toggle="tab">Delivery Info</a></li>
//               <li class="pull-right"><a href="#" class="text-muted"><i class="fa fa-gear"></i></a></li>
//             </ul>
//             <div class="tab-content">
//               <div class="tab-pane active" id="tab_1">
//                 <table class="ui-grid ui-gridFull product__attr prd-attributes size1of2">
//                    <tbody>
//                       <tr>
//                         <td class="product__attr_name">SKU (simple)</td>
//                         <td itemprop="sku">NI126AA70RQNPH</td>
//                       </tr>
//                       <tr>
//                          <td class="product__attr_name">Colour</td>
//                          <td itemprop="color">BLACK</td>
//                       </tr>
//                       <tr>
//                          <td class="product__attr_name">Care label</td>
//                          <td>Machine wash cold<br style="font-size: 12px;">Do not bleach<br style="font-size: 12px;">Tumble dry low<br style="font-size: 12px;">Iron on medium<br style="font-size: 12px;">Do not dry clean</td>
//                       </tr>
//                       <tr>
//                          <td class="product__attr_name">Material</td>
//                          <td> 100% Cotton</td>
//                       </tr>
//                      </tbody>
//                 </table>
//               </div>
//               <!-- /.tab-pane -->
//               <div class="tab-pane" id="tab_2">
//                 <div class="">
//                    <span class="mbm">Model's body measurements</span>
//                      <p class="mtm">Height: 6'1"<br> Chest: 38" <br> Waistline 30" <br> Hips: 32"</p>
//                    <span class="mrm">Size of model's garment</span>
//                    <span>M</span>
//                  </div>
//                </div>
//               <!-- /.tab-pane -->
//               <div class="tab-pane" id="tab_3">
//                 <div>Delivered in 1-3 days for Greater NCR, 2-4 days for Major Cities, 5-7 days for Provincial Areas. All in working days
//                 <br><br>You can enjoy free shipping on items sold by ZALORA above PHP995. 
//                 <br><br>Check when you can get your item by keying in your city and barangay in the drop-downs above.</div>
//               </div>
//               <!-- /.tab-pane -->
//             </div>
//             <!-- /.tab-content -->
//           </div>
//           <!-- nav-tabs-custom -->
//         </div>
//         </section>
//       </div>
//       <!-- /.row (main row) -->
//     </section> 
//     <div class="prd-bundle-price-row rfloat pull-right">
//                     <div class="clearfix">
//             <span class="prd-bundle-price-label">
//                 Final price            </span>
//             <span class="prd-bundle-price">
//                 PHP&nbsp;2,092.60            </span>
//             </div>
//             <button class="btn btn-primary" title="Add selection to bag" type="submit" data-type="addBundleToCart" style="opacity: 1; ">
//                 <span class="i-addToCart cartTxt">Add selection to bag</span>
//             </button>
// </div>     
// </div>

'</div>'+
    // <!-- /.content -->
    '</section>'

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
            } else {
                $("#prod_info").html("");
                alert("Error")
            } 
        }

    });
}