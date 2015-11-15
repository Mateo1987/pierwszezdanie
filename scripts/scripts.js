$(document).ready(function() {
	var book_credits = title + ", "+author;
	var canvas = document.getElementById("main-canvas");
	canvas.width = 1000;
	canvas.height = 600;
	context = canvas.getContext("2d");
	context.lineWidth = 1;
	context.strokeStyle = "black";
	context.fillStyle = 'white';
	CanvasTextWrapper(canvas, sentence,{
		textAlign: "center",
		font: "40pt Arial",
		lineHeight: 3,
		verticalAlign: "middle",
		strokeText: true,
		paddingX: 10,
		paddingY: 20
	});   
	CanvasTextWrapper(canvas, book_credits,{
		textAlign: "left",
		font: "italic 20pt Arial",
		lineHeight: 3,
		verticalAlign: "bottom",
		strokeText: true,
		paddingX: 50,
		paddingY: 20
	});   
});
