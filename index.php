<html>
 <head>
  <title>Pierwsze zdanie losowej powieśi z wolnych lektur - beta</title>
 </head>
 <body>
<div>
<?php
    
    // biblioteka do parsowania html dom
    include('simple_html_dom.php');
    
    // plik json dostarczony przez api wolnychlektur pobrany lokalnie, bo bardzo duży
    // https://wolnelektury.pl/api/books/
    // FIXME albo trzeba znaleźć sposób, by jednak parsować ten plik online albo wdrożyć mechanikę jego odświeżania co jakiś czas
    $json = file_get_contents("books.json");
    $books = json_decode($json);
    
    // wybieramy tylko powieści, bo są jeszcze dzieła graficzne a i z wierszy niekoniecznie da się ładne pierwsze zdanie wybrać
    //FIXME do poszerzenia o inne rodzaje podobne do powieści, np. nowela
    $novels = [];
    foreach ($books as $book) {
        if ($book->genre == "Powieść") {
    
            // FIXME idealnie byłoby przesyłać tutaj też inne dane o książce, ale nie radzę sobie potem z multidimensional arrays
            array_push($novels,$book->url);
        }
    }
    
    // wybieramy losową powieść
    $random_book = rand(0,count($novels));
    $normal_url =  $novels[$random_book];
    
    // adres strony www powieści na wolnych lekturach
    echo $normal_url;
    
    // tu parsujemy adres xhml ze strony www powieści
    $html = file_get_html($normal_url);
    $links_div = $html->find('div.other-tools ul li a[href*=xml]');

    // zmieniam array na string, bo nie radziłem sobie z array
    $comma_separated = implode(",", $links_div);
    $xml_relative = substr($comma_separated,9,-26);
    $xml_final = "http://wolnelektury.pl$xml_relative";
    
    // tutaj już pracujemy na pliku xml
    // FIXME - wyjątki do obsłużenia: gdy powieść ma części (jak /potop)
    $chosen_book = simplexml_load_file($xml_final);
    $author = $chosen_book->powiesc->autor_utworu;
    $title = $chosen_book->powiesc->nazwa_utworu;
    $akap = $chosen_book->powiesc->akap[0];

    echo "<p>Pierwsze zdanie:$akap</p>";
    echo "<p>autor:$author</p>";
    echo "<p>tytuł:$title</p>";
   
?>
</div>
</body>
</html
