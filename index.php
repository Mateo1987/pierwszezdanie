<html>
<head>
  <meta charset="utf-8">
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <link rel="stylesheet" href="css/style.css">
  <script type="text/javascript" src="scripts/scripts.js"></script>
</head>
<body>
<div class="invisible">
<?php include 'php/books.php'; ?>
</div>
<?php 
    echo "<h1 class='paragrpah'>$akap</h1>";
    echo "<h2 class='title'>$title</h2>";
    echo "<h3 class='author'>$author</h2>";
?> 
<div class='canvas_background'></div>
<p class='photo_credits'></p>
</body>
</html>
