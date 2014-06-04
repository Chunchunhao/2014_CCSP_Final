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

var ta=parseInt(document.getElementById("taa").innerHTML);
var tp=parseInt(document.getElementById("tpp").innerHTML);
var tg=parseInt(document.getElementById("tgg").innerHTML);
var tb=parseInt(document.getElementById("tbb").innerHTML);
tp=tp/ta;
tg=tg/ta;
tb=tb/ta;
console.log(tp);
$(function () {
    $('#highC').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: '發/推/噓文數比較'
        },
        tooltip: {
    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: '百分比',
            data: [
                ['發文數',   tp],
                ['推文數',   tg],
                ['噓文數',   tb]
            ]
        }]
    });
});

tArray=document.getElementsByTagName("cite");
ttA=[];
for (var i=0;i<tArray.length;i++){
	ttA.push([Date.parse(tArray[i].innerText),1]);
}

// console.log(ttA[0]);
$(function () {

    
    	$('#highCT').highcharts({
    	
		    title: {
		        text: ''
		    },
		
		    xAxis: {
		        type: 'datetime'
		    },
		    
		    yAxis: {
		        title: {
		            text: null
		        }
		    },
		
		    tooltip: {
		        crosshairs: true,
		        // shared: true,
		        valueSuffix: 'time'
		    },
		    
		    legend: {
		    },
		
		    series: [{
		    	name: '發表文章',
		    	data: ttA,
		    	zIndex: 1,
		    	marker: {
		    		fillColor: 'white',
		    		lineWidth: 2,
		    		lineColor: Highcharts.getOptions().colors[0]
		    	}
		    }]
		
		});
    
});