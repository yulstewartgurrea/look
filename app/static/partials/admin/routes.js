$(document).ready(function(){
	$("#users").click(function(){
		$("#addusers").load("addusers.html");
	});

	$('#categories').click(function(){
		$("#addcategories").load("addcategories.html")
	});


});