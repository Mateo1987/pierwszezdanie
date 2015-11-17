$(document).ready(function() {


	
	// sprawdzamy, czy zdanie nie jest puste
	//FIXME dziala, ale najpierw wyświetla stronę z pustym cytatem
	//Idealnie byłoby odfiltrowywać te rzeczy na poziomie php
	var notEmpty = function(sntc){
		if (sntc.length<4){
			console.log('odswiezamy');
			location.reload();
		}
	}
	notEmpty(sentence);
    
    // zmienne potrzebne do rysowania obrazka
	var book_credits = title + ", "+author;
	var image_credits = "Obrazek tła: davebloggs007@Flickr CC BY 2.0"
	var canvas = document.getElementById("main-canvas");
	var imageObj = new Image();
	var finalSentence = '';
	var us = "pierwszezdanie.pl";
	console.log(sentence);

	// zamieniamy długie myślniki na krótki
	var dash = function(sntc){
		finalSentence = sntc.replace(/---/g,"-");
	}
	dash(sentence);

	//tekst na obrazek
	function writeText(){
		CanvasTextWrapper(canvas, finalSentence,{
			textAlign: "center",
			font: "40pt Arvo",
			lineHeight: 3,
			verticalAlign: "middle",
			strokeText: true,
			paddingX: 10,
			paddingY: 20
		});   
		CanvasTextWrapper(canvas, book_credits,{
			textAlign: "left",
			font: "italic 20pt Arvo",
			lineHeight: 3,
			verticalAlign: "bottom",
			paddingX: 50,
			paddingY: 50
		});
		CanvasTextWrapper(canvas, image_credits,{
			textAlign: "left",
			font: "italic 10pt Arvo",
			lineHeight: 3,
			verticalAlign: "bottom",
			paddingX: 50,
			paddingY: 5
		});
		CanvasTextWrapper(canvas, us,{
			textAlign: "right",
			font: "italic 10pt Arvo",
			lineHeight: 3,
			verticalAlign: "bottom",
			paddingX: 50,
			paddingY: 5
		});
	}

	// rysujemy canvas
	imageObj.onload = function() {
		context.drawImage(imageObj, 0, 0);
		writeText();
	};
	imageObj.onerror = function() {
		console.log("image error");
	}

	//chwilowo na sztywno obrazek tła
	imageObj.src = './img/4689.jpg';
	canvas.width = 1000;
	canvas.height = 600;
	context = canvas.getContext("2d");
	context.lineWidth = 1;
	context.strokeStyle = "black";
	context.fillStyle = 'white';
	
	// przycisk odśwież
	$('.refresh').click(function(){
		location.reload();
	});

	//zmiana tła
	$('.white div').click(function(){
		context.fillStyle = "white";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "black";
		writeText();
	})
	$('.black div').click(function(){
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		writeText();
	})
	$('.picture div').click(function(){
		context.drawImage(imageObj, 0, 0);
		context.fillStyle = "white";
		writeText();
	})

});
