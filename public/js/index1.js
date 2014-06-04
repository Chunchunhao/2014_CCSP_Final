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

var fill = d3.scale.category20();

d3.layout.cloud().size([300, 300])
  .words(["mtvabc","hiimlive","Lavchi","XXXXGAY","zoeforce","boyo","diefishfish",
    "email5566", "mayaman", "erectus", "pz5202", "ionchips", "sofaly", "jyekid",
    "bill0205", "hank11235813","flydragon198"].map(function(d) {
    return {text: d, size: 30 };
  }))
  .padding(5)
  .rotate(function() { return ~~(Math.random() * 2) * 0; })
  .font("Impact")
  .fontSize(function(d) { return d.size; })
  .on("end", draw)
  .start();



function draw(words) {
d3.select("#dd").append("svg")
    .attr("width", 300)
    .attr("height", 300)
  .append("g")
    .attr("transform", "translate(150,150)")
  .selectAll("text")
    .data(words)
  .enter().append("text")
    .style("font-size", function(d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function(d, i) { return fill(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function(d) { return d.text; });
}
