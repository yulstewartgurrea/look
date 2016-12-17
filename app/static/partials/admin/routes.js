$(document).ready(function(){

	$("#users").click(function(){
		$("#addusers").load("addusers.html");
	});

	$('#products').click(function(){
		$("#addproducts").load("addproducts.html");
	});

	$("#categories").click(function(){
		$("#addcategories").load("addcategories.html");
	})


});