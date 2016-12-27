function getproduct(product_id, product_name, price, image) {
     return '<div class="box-body">' +
              '<table id="example2" class="table table-bordered table-hover">' +
                '<thead>' +
                '<tr>' +
                  '<th>  Product Id  </th>' +
                  '<th>  Product Name  </th>' +
                  '<th>  Price  </th>' +
                  '<th>  Image  </th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr> ' +
                  '<td>' + product_id+ '</td>' +
                  '<td>' + product_name+ '</td>' +
                  '<td>' + price+ '</td>' +
                  '<td>' + image+ '</td>' +
                '</tr>'+
                '</tbody>'+
                '<tfoot>'+
                '<tr>'+
                  '<th>Product Id</th>'+
                  '<th>Product Name</th>'+
                  '<th>Price</th>'+
                  '<th>Image</th>'+
                '</tr>'+
                '</tfoot>'+
              '</table>'+
            '</div>'+
          '</div>'


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
                    $("#products").append(getproduct(product_id, product_name,price,image))
                }
            } else {
                $("#products").html("");
                alert("Error")
            }
        }

    });

}