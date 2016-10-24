function rowtask(user_id, email_address) {
	return '<div class="col-lg-12">' +
          '<h4>' + user_id + "&nbsp;&nbsp;" + email_address + '</h4>' 

}	

function getusers() {

$.ajax({
	type: "GET",
	url: "/getusers",
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