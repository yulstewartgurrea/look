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