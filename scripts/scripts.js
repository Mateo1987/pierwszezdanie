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
	var mainLineHeight = 1.5;
	var smallLineHeight = 1.5;
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

	function updateLink(ttle,lnk){
		$(".more a").each(function(){
			$(this).attr('href',lnk);
		});
		$('.more span').text(ttle+" -pobierz za darmow na wolnelektury.pl");
		$('.more-text').text(ttle+" -pobierz za darmow na wolnelektury.pl");
	}


	// base font size + calculating smaller on smaller screens
	var canvasFontSize = 40;
	var strokeText = true;
	function calculateFonts(){
		if (canvas.height < 720) {
			var fontRatio = $("canvas").height()/720;
			canvasFontSize = Math.floor(canvasFontSize * fontRatio);
			strokeText = false;
			mainLineHeight = 1.5;
		}
		if (sentence.length > 130 && $("canvas").width() < 900) {
			canvasFontSize = canvasFontSize*0.8;
			mainLineHeight = 4;
		}
		else if (sentence.length > 200 && $("canvas").width() < 900){
			canvasFontSize = canvasFontSize*0.6;
			mainLineHeight = 5;
		}
		else if (sentence.length > 400 && $("canvas").width() < 900) {
			canvasFontSize = canvasFontSize*0.2;
			mainLineHeight = 6;
		}
		console.log(canvasFontSize);
	}


	// sent lineheight for book and image credits on smaller screens
	function lineHeight(){
		if ($("canvas").width() < 600) {
			smallLineHeight = 3;
		}
	}


	//text to be written on canvas
	function writeText(sntc,ttle,athor,crdts){
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
		if (arguments[0] != 'no'){
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
		if (arguments[0] != 'no'){
			drawLowerBackground();
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
      	context.rect(0, ((canvas.height/2)-(textBlock/2)), canvas.width, (textBlock+15));
      	context.fillStyle = 'rgba(0,0,0,0.5)';
      	context.fill();
	}

		// draw canvas
	function drawCanvas(sntc,ttle,athor,crdts,imge){
		imageObj.onload = function() {
			calculateFonts();
			lineHeight();
			addjustSize(canvas.width,canvas.height,imageObj.width,imageObj.height);
		   	context.drawImage(imageObj, centerShiftX, centerShiftY, drawingWidth, drawingHeight);
		   	writeText(sntc,ttle,athor,crdts);
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


	// refresh button
	$('.refresh').click(function(){
		getBook(function(){
			alert(author);
			});
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
