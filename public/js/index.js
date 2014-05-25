var txt=$('#txt_name');
var search=$('#search');

(search).on('click', function(){
	console.log(txt.val());
	uurl='/search/'+txt.val();
	$.ajax({
		type:'GET',
		success:function(result){
			console.log("search success");
			window.location=uurl;
		}
	});
});

txt.on('keyup',function(e){
	if (e.which===13){
		console.log(txt.val());
		uurl='/search/'+txt.val();
		$.ajax({
			type:'GET',
			success:function(result){
				console.log("search success");
				window.location=uurl;
			}
	});
	}
});

$(document).ready(function() {

	$(".various").fancybox({
		// padding		:0,
		maxWidth	: 1000,
		maxHeight	: 600,
		fitToView	: false,
		width		: '80%',
		height		: '80%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		helpers : {
	        overlay : {
	            locked : false// try changing to true and scrolling around the page
	        }
    	}
	});
});


