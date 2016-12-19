function rowtask(user_id, email_address) {
	return '<div class="col-lg-12">' +
          '<h4>' + user_id + "&nbsp;&nbsp;" + email_address + '</h4>' 

}	

function getusers() {

$.ajax({
	type: "GET",
	url: "http://127.0.0.1:5000/get_users",
	dataType: 'json',
	success: function(res) {
		$("#users").html("");
		if(res.status == 'ok') {
			for(var i=0; i<res.count; i++) {
				user_id = res.entries[i].user_id;
				email_address = res.entries[i].email_address;
				$("#users").append(rowtask(user_id,email_address))

			}
		}else {
			$("users").html("");
			alert(res.message);

		}

	},
	error: function (e) {
        		alert("danger");
   			},
                beforeSend: function (xhrObj){
          		xhrObj.setRequestHeader("Authorization",
                        "Basic " + btoa("ako:akolagini"));
   			}
	
	});
}

function getgender(gender_name)
{
   return '<div class="col-lg-12">' +
          '<h4>' + gender_name + "&nbsp;&nbsp;"+ '</h4>'

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
					alert(resp.message);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},

		});
}

function getcatalog()
{

$.ajax({
    		url: 'http://127.0.0.1:5000/get_catalog',
    		// url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("catalog").html("");
				if (resp.status  == 'ok') {
				   for (i = 0; i < resp.count; i++)
                                  {
                                       catalog_name = resp.entries[i].catalog_name;

                                       $("#catalog").append(rowtask(gender_name));

	                          }
				} else
				{
                                       $("#catalog").html("");
					alert(resp.message);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},

		});
}

function products()
{

$.ajax({
    		url: 'http://127.0.0.1:5000/get_gender',
    		// url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("gender").html("");
				if (resp.status  == 'ok') {
				   for (i = 0; i < resp.count; i++)
                                  {
                                       gender_name = resp.entries[i].gender_name;

                                       $("#gender").append(rowtask(gender_name));

	                          }
				} else
				{
                                       $("#gender").html("");
					alert(resp.message);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},

		});
}

function getproductdetails()
{

$.ajax({
    		url: 'http://127.0.0.1:5000/get_gender',
    		// url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("gender").html("");
				if (resp.status  == 'ok') {
				   for (i = 0; i < resp.count; i++)
                                  {
                                       gender_name = resp.entries[i].gender_name;

                                       $("#gender").append(rowtask(gender_name));

	                          }
				} else
				{
                                       $("#gender").html("");
					alert(resp.message);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},

		});
}

function getproductbycatalog()
{

$.ajax({
    		url: 'http://127.0.0.1:5000/get_',
    		// url: 'http://127.0.0.1:5000/tasks',
    		type:"GET",
    		dataType: "json",
    		success: function(resp) {
				$("gender").html("");
				if (resp.status  == 'ok') {
				   for (i = 0; i < resp.count; i++)
                                  {
                                       gender_name = resp.entries[i].gender_name;

                                       $("#gender").append(rowtask(gender_name));

	                          }
				} else
				{
                                       $("#gender").html("");
					alert(resp.message);
				}
    		},
    		error: function (e) {
        		alert("danger");
   			},

		});
}