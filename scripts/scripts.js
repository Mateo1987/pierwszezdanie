$(document).ready(function() {

	var textBlock = 0;
    // zmienne potrzebne do rysowania obrazka
	var book_credits = title + ", "+author;
	var image_credits = credits[0];
	var canvas = document.getElementById("main-canvas");
	var imageObj = new Image();
	var finalSentence = '';
	var us = "pierwszezdanie.pl";
	console.log(sentence);
	console.log(credits[0]);
	console.log(image);

	// zamieniamy długie myślniki na krótki
	var dash = function(sntc){
		finalSentence = sntc.replace(/---/g,"-");
	}
	dash(sentence);

	// bazowy rozmiar czcionki zależnie od rozmiaru ekranu
	var canvasFontSize = 40;
	var strokeText = true;
	if (canvas.height < 720) {
		var fontRatio = $("canvas").height()/720;
		console.log(fontRatio);
		canvasFontSize = Math.floor(canvasFontSize * fontRatio);
		strokeText = false;
	}
	console.log(canvasFontSize);

	//tekst na obrazek
	function writeText(){
		CanvasTextWrapper(canvas, finalSentence,{
			textAlign: "center",
			font: "bold "+canvasFontSize+"px Lato",
			lineHeight: 1.5,
			verticalAlign: "middle",
			strokeText: strokeText,
			paddingX: 20,
			paddingY: 20
		}); 

		// Ustawiamy zmienną text block na wysokość text block głównego zdania
		// Jeśli damy funkcji argument "no", to bez szarego tła (dla białej wersji)
		if (arguments[0] != 'no'){
			textBlock = textBlockHeight;
			drawMainBackground();
			context.fillStyle = 'white'; 

			// Rysujemy jeszcze raz, żeby tekst był nad tłem (brzydki hack ale działa)
			CanvasTextWrapper(canvas, finalSentence,{
				textAlign: "center",
				font: "bold "+canvasFontSize+"px Lato",
				lineHeight: 1.5,
				verticalAlign: "middle",
				strokeText: strokeText,
				paddingX: 20,
				paddingY: 20
			}); 
		}

		// bez szarego tła jeśli do funkcji dodano parametr "no" (dla białej wersji obrazka)
		if (arguments[0] != 'no'){
			drawLowerBackground(); 
			context.fillStyle = 'white'; 
		}
		CanvasTextWrapper(canvas, book_credits,{
			textAlign: "left",
			font: "italic "+(canvasFontSize/2)+"px Lato",
			lineHeight: 1.5,
			verticalAlign: "bottom",
			paddingX: 50,
			paddingY: (canvasFontSize*1.25)
		});
		CanvasTextWrapper(canvas, image_credits,{
			textAlign: "left",
			font: "italic "+(canvasFontSize*0.375)+"px Lato",
			lineHeight: 1.5,
			verticalAlign: "bottom",
			paddingX: 50,
			paddingY: 5
		});
		CanvasTextWrapper(canvas, us,{
			textAlign: "right",
			font: "italic "+(canvasFontSize*0.375)+"px Lato",
			lineHeight: 1.5,
			verticalAlign: "bottom",
			paddingX: 50,
			paddingY: 5
		});
	}
	var drawingWidth;
	var drawingHeight;
	var centerShiftX = 0;
	var centerShiftY = 0;
	
	/*ustalamy sposób skalowania obrazka*/
	function addjustSize (cnvsWidth,cnvsHeight,imgWidth,imgHeight){
		var ratio = cnvsWidth/imgWidth;
		drawingWidth = imgWidth * ratio;
		drawingHeight = imgHeight * ratio;
		if (drawingHeight < cnvsHeight) {
			var ratio2 = cnvsHeight/drawingHeight;
			drawingHeight = ratio2 * cnvsHeight;
			drawingWidth = ratio2 * cnvsWidth;
		}
	}

	// rysujemy tło ciemniejsze pod napisy na dole
	function drawLowerBackground(){
		context.beginPath();
		// wysokość tła i jego pozycja kalkulowana na podstawie aktualnej wartości canvasFontSize 
		// 100 px przy pełnej wysokości
      	context.rect(0, (canvas.height-(canvasFontSize*2.5)), canvas.width, (canvasFontSize*2.5));
      	context.fillStyle = 'rgba(0,0,0,0.5)';
      	context.fill();
	}

	// rysujemy tło ciemniejsze pod głównym zdaniem
	function drawMainBackground(){
		context.beginPath();
      	context.rect(0, ((canvas.height/2)-(textBlock/2)), canvas.width, (textBlock+10));
      	context.fillStyle = 'rgba(0,0,0,0.5)';
      	context.fill();
	}

		// rysujemy canvas
	imageObj.onload = function() {
		addjustSize(canvas.width,canvas.height,imageObj.width,imageObj.height);
	   	context.drawImage(imageObj, centerShiftX, centerShiftY, drawingWidth, drawingHeight);
	   	writeText();
	};
	imageObj.onerror = function() {
		console.log("image error");
	}

	imageObj.src = image;
	canvas.width = $("canvas").width();
	canvas.height = $("canvas").height();
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
		writeText('no');
	})
	$('.black div').click(function(){
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		writeText();
	})
	$('.picture div').click(function(){
		context.drawImage(imageObj, centerShiftX, centerShiftY, drawingWidth, drawingHeight);
		context.fillStyle = "white";
		writeText();
	})

});
