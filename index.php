<html>
 <head>
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <link rel="stylesheet" href="style.css">
  <script type="text/javascript" src="scripts.js"></script>
 </head>
 <body>
<div class="invisible">
 <?php
$xmlDoc = new DOMDocument();
$xmlDoc->load("http://wolnelektury.pl/media/book/xml/20-000-mil-podmorskiej-zeglugi.xml");

echo $xmlDoc->saveXML();
?>
</div>
<div>
A tu widać:
<p id="tutaj"></p>
</div>
</body>
</html
