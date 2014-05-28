var txt=$('#txt_name');
var txt2=$('#txt_name2');
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
		// console.log(txt.val());
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

txt2.on('keyup',function(e){
	// console.log(txt2.val());
	// console.log(e.which);
	if (e.which===13){
		console.log(txt2.val());
		uurl='./'+txt2.val();
		$.ajax({
			type:'GET',
			success:function(result){
				console.log("search success");
				window.location=uurl;
			}
	});
	}
});

//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(document).ready(function() {

	$(".various").fancybox({
		// padding		:0,
		maxWidth	: 1000,
		maxHeight	: 800,
		fitToView	: false,
		width		: '80%',
		height		: '95%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		afterLoad: function() {
	        this.title = '<a href="' + this.href + '" target="_blank">'+this.title+'</a> ' ;
	    },
		helpers : {
	        overlay : {
	            locked : false// try changing to true and scrolling around the page
	        },
	        title: {
            	type: 'outside',
            	position: 'top'
        	}
    	}
	});
});


