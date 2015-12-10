<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">
  <?php include 'php/books.php'; ?>
  <script src="bower_components/canvas-text-wrapper/canvas-text-wrapper.js"></script>
  <script type="text/javascript">
	    var sentence = <?php echo json_encode($sentence);?>;
	    var title = <?php echo json_encode($chosenTitle);?>;
	    var author = <?php echo json_encode($chosenAuthor);?>;
      var image = <?php echo json_encode($backgroundImage);?>;
      var credits = <?php echo json_encode($imageCredits);?>;
  </script>
  <script type="text/javascript" src="scripts/scripts.js"></script>
</head>
<body>
<header>
	<h1>PierwszeZdanie.pl<span class="details"> - pierwsze zdanie z losowej powieści z Wolnych Lektur</span></h1>
</header>
<section class='canvas-section'>
  <canvas id="main-canvas">
  </canvas>
  <div class = "options">
    <div class="gear icon">
      <img src="img/modify.png" height="32" width="32" />
      <ul class = "options-choice">
        <li class="picture"><div>A</div></li>
        <li class="white"><div>A</div></li>
        <li class="black"><div>A</div></li>
      </ul>
    </div>
    <div class="more icon">
      <a href=<?php echo "$chosenUrl"; ?> target="_blank">
      <img src="img/books.png" width="32" height="32">
      <span class ="more-text">"<?php echo $chosenTitle;?>" - pobierz za darmo na wolnelektury.pl</span>
      </a>
    </div>
  </div>
</section>

<div class="below-canvas">
	<img class="refresh icon" src = "img/refresh-86.png" height="64" width="64" />
	</div>
<div class="social">
</div>
<footer>
<a href = "https://github.com/halas/pierwszezdanie"><span>Znajdź projekt na</span>
<img src="img/GitHub-Mark-Light-32px.png"></a>
</footer>

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
