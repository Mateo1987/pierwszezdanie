/*$(document).ready(function() {
	// wyciagamy adres obrazka i credits obrazka z załadowanego
	// do niewidocznego div xml ksiazki
	// znaki \\ sluza do ucieczki przed dwukropkie i kropka
	var cover = $('dc\\:relation\\.coverImage\\.url');
	var credits = $('dc\\:relation\\.coverImage\\.attribution');
	console.log(image);
	console.log(credits);
	$('.photo_credits').(credits);
	$('.canvas_background').css("background-image","url("+cover+"')")
});*/

$(document).ready(function() {
    var cover = $('dc\\:relation\\.coverImage\\.source').contents();
    console.log(cover);
    var backgroundCss = "url('"+cover+"')";
    $('.canvas_background').css("background-image",backgroundCss);

});