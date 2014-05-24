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

$(document).ready(function() {

	$(".various").fancybox({
		// padding		:0,
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
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


