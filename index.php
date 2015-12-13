<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script async src="bower_components/canvas-text-wrapper/canvas-text-wrapper.js"></script>
  <script async type="text/javascript" src="scripts/scripts.js"></script>
</head>
<body>
<header>
	<h1>PierwszeZdanie.pl<span class="details"> - pierwsze zdanie z losowej powieści z Wolnych Lektur</span></h1>
  <div class="burger">&#9776;
    <div class="mobile-menu hidden">
      <div class="gear icon">
        <img src="img/modify.png" height="32" width="32" />
      </div>
      <div class="more icon">
        <a href="" target="_blank">
        <img src="img/books.png" width="32" height="32">
        <span></span>
        </a>
      </div>
      <div class="github icon">
      <a href = "https://github.com/halas/pierwszezdanie"  target="_blank">
      <img src="img/GitHub-Mark-32px.png" height="32" width='32'/>
      <span>Znajdź projekt na Github</span></a>
      </div>
    </div>
    <div class="options-extended hidden">
      <div class="arrow icon">
        <img src="img/left-arrow.png" height="32" width="32" />
      </div>
      <ul>
        <li class="picture"><div>A</div></li>
        <li class="white"><div>A</div></li>
        <li class="black"><div>A</div></li>
      </ul>
    </div>
  </div>
</header>
<section class='canvas-section'>
  <div class='for-canvas canvas'>
    <canvas class='canvas' id="main-canvas">
    </canvas>
    <div class='behind-canvas'>
    <span>Czekaj, trwa ładowanie pierwszego zdania</span>
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    </div>
  </div>
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
      <a href="" target="_blank">
      <img src="img/books.png" width="32" height="32">
      <span class ="more-text"></span>
      </a>
    </div>
  </div>
</section>

<div class="below-canvas">
	<img class="refresh icon" src = "img/refresh-86.png" height="64" width="64" />
	</div>
<footer>
<a href = "https://github.com/halas/pierwszezdanie"><span>Znajdź projekt na</span>
<img src="img/GitHub-Mark-Light-32px.png" height="32" width="32"></a>
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
