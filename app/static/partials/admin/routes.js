$(document).ready(function(){

	$("#users").click(function(){
		$("#addusers").load("addusers.html");
	});

	$('#products').click(function(){
		$("#addproducts").load("addproducts.html");
	});

	$("#catalog").click(function(){
		$("#addcatalogs").load("ecs.html");
	});

	$("#categories").click(function(){
		$("#addcategories").load("addcategories.html");
	})


});