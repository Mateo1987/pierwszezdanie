<html>
<head>
  <meta charset="utf-8">
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">
  <script type="text/javascript" src="scripts/scripts.js"></script>
</head>
<body>
<?php include 'php/books.php'; ?>
<header>
	<h1>PierwszeZdanie.pl - pierwsze zdanie z losowej powieści z Wolnych Lektur</h1>
</header>
<canvas id="main-canvas" width="1000" height="600">
</canvas>
<?php 
    echo "<h1 class='paragrpah'>$sentence</h1>";
    echo "<h2 class='title'>$title</h2>";
    echo "<h3 class='author'>$author</h2>";
?> 
<p class='photo_credits'>Ilustracja tła: </p>

<div class="options">
</div>
<div class="social">
</div>
<div class="more">
Przeczytaj online, pobierz na komputer lub czytnik na wolnych lekturach:
<a href="" target="_blank"><img src = ""></a> 
</div>
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
