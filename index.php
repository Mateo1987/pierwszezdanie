<html>
<head>
  <meta charset="utf-8">
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">
  <?php include 'php/books.php'; ?>
  <script type="text/javascript">
  	<?php 
	    echo "var sentence = '$sentence';";
	    echo "var title = '$chosenTitle';";
	    echo "var author = '$chosenAuthor';";
	?> 
  </script>
  <script type="text/javascript" src="scripts/scripts.js"></script>
</head>
<body>
<header>
	<h1>PierwszeZdanie.pl - pierwsze zdanie z losowej powieści z Wolnych Lektur</h1>
</header>
<canvas id="main-canvas">
</canvas>
<div class="options">
	<img class="refresh icon" src = "img/refresh-86.png" height="32" width="32" />
	<img class="gear icon" src = "img/modify.png" heigth="32" width="32" />
</div>
<div class="social">
</div>
<div class="more">
<a href=<?php echo "$chosenUrl"; ?> target="_blank"><img class="icon" src="img/books.png" width="32" height="32">Przeczytaj online, pobierz na komputer lub czytnik na wolnych lekturach.</a>
<footer>

</footer>


<div class="invisible">
	<?php echo $xmlDoc->saveXML() ?>
	<img id="canvas_background" src="" ?>
</div>




<!-- Google Analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-69964309-1', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>
