$(document).ready(function() {
	/*wyciagamy adres obrazka i credits obrazka z załadowanego
	do niewidocznego div xml ksiazki
	znaki \\ sluza do ucieczki przed dwukropkiem i kropka*/

    var cover = 'http://lorempixel.com/1000/600/nature';
    var credits = $('dc\\:relation\\.coverImage\\.attribution').text();
    var canvas = document.getElementById('main-canvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    console.log("cześć");
    console.log(credits);
    // wolnelektury chyba zablokowały możliwość pobierania obrazków od nich.
    //chwilowo używam lorempixel
    //TODO użyć api flickr lub pobieać obrazki php (może to znów same origin?)

   	//function to wrap text within canvas depending on the text length

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
             context.fillText(line, x, y);
             line = words[n] + ' ';
             y += lineHeight;
          }
          else {
        	line = testLine;
          }
        }
      	context.fillText(line, x, y);
  	}

    imageObj.src = cover;
    var maxWidth = canvas.width*0.8;
    var lineHeight = 25;
    var x = (canvas.width - maxWidth) / 2;
    var y = 60;
    console.log(x);
    context.font = '14pt Arial';
    
    // context.lineWidth = 3;
    // context.strokeStyle = '#000000';
    imageObj.onload = function() {
    	console.log("dzialamy");
	   	context.drawImage(imageObj, 0, 0);
	   	context.fillStyle = 'white';
	   	wrapText(context, sentence, x, y, maxWidth, lineHeight);
    };
    imageObj.onerror = function() {
    	console.log("no");
    };
    // wrapText(context, sentence, x, y, maxWidth, lineHeight););*/

});
