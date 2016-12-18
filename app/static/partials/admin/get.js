function getadmin() {
    return '<div class="box">' +
    '<div class="box-body">' +
              '<table id="example2" class="table table-bordered table-hover">' +
                '<thead>' +
                '<tr>' +
                  '<th>  Email Address  </th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr> ' +
                  '<td>' + email_address + '</td>' +
                '</tr>'+
                '</tbody>'+
                '<tfoot>'+
                '<tr>'+
                  '<th>Email Address</th>'+
                '</tr>'+
                '</tfoot>'+
              '</table>'+
            '</div>'+
          '</div>'
}

function getadmins() {
    $.ajax({
        url: 'http://127.0.0.1:5000/get_establishment',
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

function getcustomer() {
    return '<div class="box">' +
    '<div class="box-body">' +
              '<table id="example2" class="table table-bordered table-hover">' +
                '<thead>' +
                '<tr>' +
                  '<th>  Email Address  </th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr> ' +
                  '<td>' + email_address + '</td>' +
                '</tr>'+
                '</tbody>'+
                '<tfoot>'+
                '<tr>'+
                  '<th>Email Address</th>'+
                '</tr>'+
                '</tfoot>'+
              '</table>'+
            '</div>'+
          '</div>'
}

function getcustomers() {
    $.ajax({
        url: 'http://127.0.0.1:5000/get_establishment',
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

function getestablishmentpersonnel() {
    return '<div class="box">' +
    '<div class="box-body">' +
              '<table id="example2" class="table table-bordered table-hover">' +
                '<thead>' +
                '<tr>' +
                  '<th>  Gender Name  </th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr> ' +
                  '<td>' + gender_name+ '</td>' +
                '</tr>'+
                '</tbody>'+
                '<tfoot>'+
                '<tr>'+
                  '<th>Gender Name</th>'+
                '</tr>'+
                '</tfoot>'+
              '</table>'+
            '</div>'+
          '</div>'

}

function getestablishmentpersonnels() {
    $.ajax({
        url: 'http://127.0.0.1:5000/get_establishment',
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

function getgender(gender_name)
{
   return '<div class="box">' +
    '<div class="box-body">' +
              '<table id="example2" class="table table-bordered table-hover">' +
                '<thead>' +
                '<tr>' +
                  '<th>  Gender Name  </th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr> ' +
                  '<td>' + gender_name+ '</td>' +
                '</tr>'+
                '</tbody>'+
                '<tfoot>'+
                '<tr>'+
                  '<th>Gender Name</th>'+
                '</tr>'+
                '</tfoot>'+
              '</table>'+
            '</div>'+
          '</div>'

}

function getgenders() {

$.ajax({
    		url: 'http://127.0.0.1:5000/get_gender',
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

    return '<div class="box">' +
    '<div class="box-body">' +
              '<table id="example2" class="table table-bordered table-hover">' +
                '<thead>' +
                '<tr>' +
                  '<th>  Establishment Name  </th>' +
                  '<th>  User  </th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr> ' +
                  '<td>' + establishment_name+ '</td>' +
                  '<td>' + user_id+ '</td>' +
                '</tr>'+
                '</tbody>'+
                '<tfoot>'+
                '<tr>'+
                  '<th>Establishment Name</th>'+
                  '<th>User id</th>'+
                '</tr>'+
                '</tfoot>'+
              '</table>'+
            '</div>'+
          '</div>'
}

function getestablishments() {
    $.ajax({
        url: 'http://127.0.0.1:5000/get_establishment',
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
    return '<div class="box">' +
    '<div class="box-body">' +
              '<table id="example2" class="table table-bordered table-hover">' +
                '<thead>' +
                '<tr>' +
                  '<th>  Catalog Name  </th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<tr> ' +
                  '<td>' + catalog_name+ '</td>' +
                '</tr>'+
                '</tbody>'+
                '<tfoot>'+
                '<tr>'+
                  '<th>Catalog Name</th>'+
                '</tr>'+
                '</tfoot>'+
              '</table>'+
            '</div>'+
          '</div>'
}

function getcatalogs() {
    $.ajax({
        url: 'http://127.0.0.1:5000/get_catalog',
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