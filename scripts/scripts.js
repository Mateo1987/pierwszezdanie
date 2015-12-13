// namespace to help initialize
var myVars = {};
$(document).ready(function() {

	var sentence = '';
	var title = '';
	var author = '';
	var image = '';
	var credits = '';

	var textBlock = 0;
    // variables for drawing canvas
	var canvas = document.getElementById("main-canvas");
	var imageObj = new Image();
	var us = "pierwszezdanie.pl";

	// for mobile menu manipulations
	myVars.extendedOptionsHidden = true;

	// make ajax call for new book data and draw canvas on success
	function getBook(){
		console.log("start");
		$.ajax({
		        url : 'http://hadora.pl/pierwszezdanie/get_book.php',
		        type : 'POST',
		        dataType : 'json',
		        success : function (result) {
							sentence = result['sentence'];
							title = result['title'];
							author = result['author'];
							image = result['image'];
							credits = result['credits'];
							bookUrl = result['bookUrl'];
							drawCanvas(sentence,title,author,credits,image);
							updateLink(title,bookUrl);
		        },
		        error : function () {
		           console.log("error");
		        }
		    })
	}

	function removeLoading(){
		$('.behind-canvas').addClass('hidden');
	}

	// update links to book
	function updateLink(ttle,lnk){
		$(".more a").each(function(){
			$(this).attr('href',lnk);
		});
		$('.more span').text(ttle+" - pobierz za darmo na wolnelektury.pl");
		$('.more-text').text(ttle+" - pobierz za darmo na wolnelektury.pl");
	}

	// calculate line height and font size depending on screen size and sentence length
	function calculateFonts(){
		var cnvsFntSze = 40;
		if (canvas.height < 720 && canvas.width > canvas.height) {
			var fontRatio = $("canvas").height()/720;
			cnvsFntSze = Math.floor(cnvsFntSze * fontRatio);
			strokeText = false;
			return [1.5, cnvsFntSze];
		}
		else if (canvas.width < 400 && canvas.width < canvas.height) {
			var fontRatio = $("canvas").width()/720;
			cnvsFntSze = Math.floor(cnvsFntSze * fontRatio);
			strokeText = false;
			return [1.5, cnvsFntSze];
		}
		if (sentence.length > 130 && $("canvas").width() < 900) {
			cnvsFntSze = cnvsFntSze*0.8;
			return [4, cnvsFntSze];
		}
		else if (sentence.length > 200 && $("canvas").width() < 900){
			cnvsFntSze = cnvsFntSze*0.6;
			return [5, cnvsFntSze];
		}
		else if (sentence.length > 400 && $("canvas").width() < 900) {
			cnvsFntSze = cnvsFntSze*0.2;
			return [6, cnvsFntSze];
		}
		else {
			return [1.5, cnvsFntSze];
		}
	}


	// set lineheight for book and image credits on smaller screens
	function lineHeight(){
		if ($("canvas").width() < 600) {
			return 3;
		}
		else {
			return 1.5;
		}
	}


	//text to be written on canvas
	function writeText(sntc,ttle,athor,crdts){
		var canvasFontSize = calculateFonts()[1];
		var strokeText = true;
		var mainLineHeight = calculateFonts()[0];
		var smallLineHeight = lineHeight();
		var book_credits = ttle + ", "+athor;
		var image_credits = crdts[0];
		// replace two dashes with one
		var finalSentence = sntc.replace(/---/g,"-");
		CanvasTextWrapper(canvas, finalSentence,{
			textAlign: "center",
			font: "bold "+canvasFontSize+"px Lato",
			lineHeight: mainLineHeight,
			verticalAlign: "middle",
			strokeText: strokeText,
			paddingX: 20,
			paddingY: 20
		});

		// set textBlock variable to text height from CanvasTextWrapper textBlockHeight
		// If we give parameter "no", there will be no background (for the white version)
		if (arguments[4] != 'no'){
			textBlock = textBlockHeight;
			drawMainBackground();
			context.fillStyle = 'white';

			// We draw again to have text above background (dirty hack, but works)
			CanvasTextWrapper(canvas, finalSentence,{
				textAlign: "center",
				font: "bold "+canvasFontSize+"px Lato",
				lineHeight: mainLineHeight,
				verticalAlign: "middle",
				strokeText: strokeText,
				paddingX: 20,
				paddingY: 20
			});
		}

		// no grey background if we have "no" parameter (for white version of canvas)
		if (arguments[4] != 'no'){
			console.log(arguments[0]);
			drawLowerBackground(canvasFontSize);
			context.fillStyle = 'white';
		}
		CanvasTextWrapper(canvas, book_credits,{
			textAlign: "left",
			font: "italic "+(canvasFontSize/2)+"px Lato",
			lineHeight: smallLineHeight,
			verticalAlign: "bottom",
			paddingX: canvasFontSize,
			paddingY: (canvasFontSize*1.25)
		});
		CanvasTextWrapper(canvas, image_credits,{
			textAlign: "left",
			font: "italic "+(canvasFontSize*0.375)+"px Lato",
			lineHeight: 1.5,
			verticalAlign: "bottom",
			paddingX: canvasFontSize,
			paddingY: 5
		});
		CanvasTextWrapper(canvas, us,{
			textAlign: "right",
			font: "italic "+(canvasFontSize*0.375)+"px Lato",
			lineHeight: 1.5,
			verticalAlign: "bottom",
			paddingX: canvasFontSize,
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
	function drawLowerBackground(fntSize){
		context.beginPath();
		// height of the grey background calculated from the canvasFontSize variable
		// 100 px when there is full height
      	context.rect(0, (canvas.height-(fntSize*2.5)), canvas.width, (fntSize*2.5));
      	context.fillStyle = 'rgba(0,0,0,0.5)';
      	context.fill();
	}

	// darker background below main sentence
	function drawMainBackground(){
		context.beginPath();
      	context.rect(0, ((canvas.height/2)-(textBlock/2)), canvas.width, (textBlock+15));
      	context.fillStyle = 'rgba(0,0,0,0.5)';
      	context.fill();
	}

		// draw canvas

	function drawCanvas(sntc,ttle,athor,crdts,imge){
		imageObj.onload = function() {
			addjustSize(canvas.width,canvas.height,imageObj.width,imageObj.height);
	   	context.drawImage(imageObj, centerShiftX, centerShiftY, drawingWidth, drawingHeight);
	   	writeText(sntc,ttle,athor,crdts);
			removeLoading();
		};
		imageObj.onerror = function() {
			console.log("image error");
		}

		imageObj.src = imge;
		canvas.width = $("canvas").width();
		canvas.height = $("canvas").height();
		context = canvas.getContext("2d");
		context.lineWidth = 1;
		context.strokeStyle = "black";
		context.fillStyle = 'white';

	}

	// clear canvas
	function clearCanvas(){
		context.clearRect(0, 0, canvas.width, canvas.height);
		canvas.width = $("canvas").width();
		canvas.height = $("canvas").height();
		context = canvas.getContext("2d");
	}


	// refresh button
	$('.refresh').click(function(){
		$('.behind-canvas').removeClass('hidden');
		getBook();
	});



	// change background of the canvaas
	$('.white div').click(function(){
		context.fillStyle = "white";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "black";
		writeText(sentence,title,author,credits,'no');
	})
	$('.black div').click(function(){
		context.fillStyle = "black";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "white";
		writeText(sentence,title,author,credits);
	})
	$('.picture div').click(function(){
		context.drawImage(imageObj, centerShiftX, centerShiftY, drawingWidth, drawingHeight);
		context.fillStyle = "white";
		writeText(sentence,title,author,credits);
	})

	// mobile menu showing and hiding
	$(".burger").click(function(){
		if (myVars.extendedOptionsHidden){
			$(".mobile-menu").toggleClass("hidden");
		} else {
			$(".options-extended").addClass("hidden");
			myVars.extendedOptionsHidden = true;
		}
	});
	$(".mobile-menu .gear").click(function(event){
		event.stopPropagation();
		$(".options-extended").removeClass("hidden");
		$(".mobile-menu").addClass("hidden");
		myVars.extendedOptionsHidden = !myVars.extendedOptionsHidden;
	});
	$(".options-extended .arrow").click(function(event){
		event.stopPropagation();
		$(this).parent().addClass("hidden");
		$(".mobile-menu").removeClass("hidden");
		myVars.extendedOptionsHidden = !myVars.extendedOptionsHidden;
	});

	getBook();

});
