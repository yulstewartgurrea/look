$(document).ready(function(){
	$("#add").click(function(){
		$("#au").show();
		$("#ecss").hide();
		$("#cs2").hide();
		$("#prod2").hide();
		$("#product_details").hide();

	});

	$("#ecs").click(function(){
		$("#ecss").show();
		$("#au").hide();
		$("#prod2").hide();
		$("#cs2").hide();
		$("#product_details").hide();
	});

	$("#cs").click(function(){
		$("#cs2").show();
		$("#ecss").hide();
		$("#prod2").hide();
		$("#au").hide();
		$("#product_details").hide();
	});

	$("#prod").click(function(){
		$("#prod2").show();
		$("#ecss").hide();
		$("#au").hide();
		$("#cs2").hide();
		$("#product_details").hide();
	});



});