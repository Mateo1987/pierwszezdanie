$(document).ready(function() {

	var textBlock = 0;
    // variables for drawing canvas
	var book_credits = title + ", "+author;
	var image_credits = credits[0];
	var canvas = document.getElementById("main-canvas");
	var imageObj = new Image();
	var finalSentence = '';
	var us = "pierwszezdanie.pl";
	console.log(sentence);
	console.log(credits[0]);
	console.log(image);

	// change two short dashes to one
	var dash = function(sntc){
		finalSentence = sntc.replace(/---/g,"-");
	}
	dash(sentence);

	// base font size + calculating smaller on smaller screens
	var canvasFontSize = 40;
	var strokeText = true;
	if (canvas.height < 720) {
		var fontRatio = $("canvas").height()/720;
		console.log(fontRatio);
		canvasFontSize = Math.floor(canvasFontSize * fontRatio);
		strokeText = false;
	}
	console.log(canvasFontSize);

	//text to be written on canvas
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

		// set textBlock variable to text height from CanvasTextWrapper textBlockHeight
		// If we give parameter "no", there will be no background (for the white version)
		if (arguments[0] != 'no'){
			textBlock = textBlockHeight;
			drawMainBackground();
			context.fillStyle = 'white';

			// We draw again to have text above background (dirty hack, but works)
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

		// no grey background if we have "no" parameter (for white version of canvas)
		if (arguments[0] != 'no'){
			drawLowerBackground();
			context.fillStyle = 'white';
		}
		CanvasTextWrapper(canvas, book_credits,{
			textAlign: "left",
			font: "italic "+(canvasFontSize/2)+"px Lato",
			lineHeight: 3,
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

	/*determine the way to scale background image*/
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

	// background for the texts on the bottom of the canvas
	function drawLowerBackground(){
		context.beginPath();
		// height of the grey background calculated from the canvasFontSize variable
		// 100 px when there is full height
      	context.rect(0, (canvas.height-(canvasFontSize*2.5)), canvas.width, (canvasFontSize*2.5));
      	context.fillStyle = 'rgba(0,0,0,0.5)';
      	context.fill();
	}

	// darker background below main sentence
	function drawMainBackground(){
		context.beginPath();
      	context.rect(0, ((canvas.height/2)-(textBlock/2)), canvas.width, (textBlock+10));
      	context.fillStyle = 'rgba(0,0,0,0.5)';
      	context.fill();
	}

		// draw canvas
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

	// refresh button
	$('.refresh').click(function(){
		location.reload();
	});

	// change background of the canvaas
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
