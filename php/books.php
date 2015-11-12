<?php 
    include('simple_html_dom.php');
	/*plik json dostarczony przez api wolnychlektur pobrany lokalnie, bo bardzo duży
    https://wolnelektury.pl/api/books/
    FIXME albo trzeba znaleźć sposób, by jednak parsować ten plik online albo wdrożyć mechanikę jego odświeżania co jakiś czas*/
    $json = file_get_contents("./json/books.json");
    $books = json_decode($json);
    $novels = array();
    //Obiekt książka do dodawania do array novels
        class Book {
            // Creating some properties (variables tied to an object)
            public $title;
            public $author;
            public $bookUrl;
            public $href;
            
            // Assigning the values
            public function __construct($title,$author,$bookUrl,$href) {
              $this->title = $title;
              $this->author = $author;
              $this->bookUrl = $bookUrl;
              $this->href = $href;
            }
          }
	/*wybieramy tylko powieści, bo są jeszcze dzieła graficzne a i z wierszy niekoniecznie da się ładne pierwsze zdanie wybrać
    FIXME do poszerzenia o inne rodzaje podobne do powieści, np. nowela, uwaga bo inna struktura xml*/
    foreach ($books as $book) {
        if ($book->genre == "Powieść") {
        	$newTitle = $book->title;
        	$newAuthor = $book->author;
        	$newUrl = $book->url;
        	$newHref = $book->href;
			$newNovel = new Book($newTitle,$newAuthor,$newUrl,$newHref);    
            array_push($novels,$newNovel);
        }
    }
    // wybieramy losową powieść
    $random_book = rand(0,count($novels));
    $chosen_book = $novels[$random_book];

    //autora, tytuł bierzemy z obiektu wylosowanej książki
    $author = $chosen_book->author;
    $title = $chosen_book->title;
    // echo var_dump($chosen_book);    
    //adres pliku xml parsujemy ze strony html książki
    $html = file_get_html($chosen_book->bookUrl);
    $links_div = $html->find('div.other-tools ul li a[href*=xml]');
    // zmieniam array na string, bo łatwiej znaleźć
    $comma_separated = implode(",", $links_div);
    $xml_relative = substr($comma_separated,9,-26);
    $xml_final = "http://wolnelektury.pl$xml_relative";
    
    // tutaj już pracujemy na pliku xml
    // FIXME - wyjątki do obsłużenia: gdy powieść ma części (jak /potop),
    // nietypowa struktura xml, np Eugenia Grandet
    $chosen_book_xml = simplexml_load_file($xml_final);
    $akap = $chosen_book_xml->powiesc->akap[0];
    if (strlen($akap)==0){
        $akap = $chosen_book_xml->opowiadanie->akap;
    }
    $sentence = strstr($akap, '.', true).".";

  
    // tu ładujemy całą książke xml w stronę. 
    // echo $xmlDoc->saveXML()ujawnia tę wartość w index.php
    // w niewidocznym divie. Z niego jQuery wyciągamy adres obrazka i credits obrazka
    // FIXME - wszystkie dane wyciągać z xml php
	$xmlDoc = new DOMDocument();
    $xmlDoc->load($xml_final);
 ?>