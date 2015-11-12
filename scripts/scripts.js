$(document).ready(function() {
	/*wyciagamy adres obrazka i credits obrazka z załadowanego
	do niewidocznego div xml ksiazki
	znaki \\ sluza do ucieczki przed dwukropkie i kropka*/

    var cover = $('dc\\:relation\\.coverImage\\.url').text();
    var credits = $('dc\\:relation\\.coverImage\\.attribution').text();
    // var background = 'url("'+cover+'")';
    // $('canvas').css("background-image",background);
    $('.photo_credits').append(credits);
    var canvas = document.getElementById('main-canvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    // wolnelektury chyba zablokowały możliwość pobierania obrazków od nich.
    //TODO użyć api flickr
    imageObj.onload = function() {
    	context.drawImage(imageObj, 0, 0);
    	console.log(imageObj.width);
    };
    imageObj.onerror = function() {
    	console.log("no");
    }
    imageObj.src = cover;
});
