<html>
 <head>
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
 </head>
 <body>
<div>
<?php
    include('simple_html_dom.php');
    $json = file_get_contents("books.json");
    $books = json_decode($json);
    $novels = [];
    foreach ($books as $book) {
        if ($book->genre == "Powieść") {
            array_push($novels,$book->url);
        }
    }
    $random_book = rand(0,count($novels));
    $normal_url =  $novels[$random_book];
    echo $normal_url;
    $html = file_get_html($normal_url);
    $xml_relative = $html->find('div.other-tools ul li');
    $comma_separated = implode(",", $xml_relative);
    $xml_relative = substr($str, 0, strpos($str, '_'));
    echo $comma_separated;
    echo $xml_relative[0];
/*    $xml_url = "http://wolnelektury.pl/media/book/xml/$title_no_dash.xml";
    echo $xml_url;
    $chosen_book = simplexml_load_file($xml_url);
    $author = $chosen_book->powiesc->autor_utworu;
    $title = $chosen_book->powiesc->nazwa_utworu;
    $sentence = $chosen_book->powiesc->akap[0];
    echo "<p>Pierwsze zdanie:$sentence</p>";
    echo "<p>autor:$author</p>";
    echo "<p>tytuł:$title</p>";*/
   
?>
</div>
</body>
</html
