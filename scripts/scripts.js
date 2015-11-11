$(document).ready(function() {
	/*wyciagamy adres obrazka i credits obrazka z załadowanego
	do niewidocznego div xml ksiazki
	znaki \\ sluza do ucieczki przed dwukropkie i kropka*/

    var cover = $('dc\\:relation\\.coverImage\\.url').text();
    var credits = $('dc\\:relation\\.coverImage\\.attribution').text();
    $('#canvas_background').attr("src",cover);
    $('.photo_credits').append(credits);
 
});
