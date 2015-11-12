$(document).ready(function() {
	/*wyciagamy adres obrazka i credits obrazka z załadowanego
	do niewidocznego div xml ksiazki
	znaki \\ sluza do ucieczki przed dwukropkie i kropka*/

    var cover = 'http://lorempixel.com/1000/600';
    var credits = $('dc\\:relation\\.coverImage\\.attribution').text();
    $('.photo_credits').append(credits);
    var canvas = document.getElementById('main-canvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    // wolnelektury chyba zablokowały możliwość pobierania obrazków od nich.
    //chwilowo używam lorempixel
    //TODO użyć api flickr lub pobieać obrazki php (może to znów same origin?)
    imageObj.onload = function() {
    	context.drawImage(imageObj, 0, 0);
    	console.log(imageObj.width);
    };
    imageObj.onerror = function() {
    	console.log("no");
    }
    imageObj.src = cover;

});
