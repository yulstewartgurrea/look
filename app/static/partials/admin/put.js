function update_product(product_id) {
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
                "product_description": product_description, "catalog_id": catalog_id2, "gender_id": gender_id2,
                "category_id": category_id2, "subcategory_id": subcategory_id, "price": price, "image": image });

    $.ajax({
    	url: 'http://127.0.0.1:5000/api/update/product/<string:product_id>',
    	type: 'PUT',
    	contentType: 'application/json; charset=utf-8',
    	dataType: 'json',
    	date: data

    });
}