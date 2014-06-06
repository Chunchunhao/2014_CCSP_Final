  (function(){

var tmpl = ""
$('#open').click(function(){
	$('.sidebar')
  .sidebar({
    overlay: true
  })
  .sidebar('toggle')
;
});

$('.enterm').keyup(function(e){
	if(e.which !== 13)
		return;
	var ins = "<div>" + $(this).val() + "</div>";
	$(ins).appendTo($('div.field'));
});

  }());