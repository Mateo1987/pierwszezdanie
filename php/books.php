<?php 
	/*plik json dostarczony przez api wolnychlektur pobrany lokalnie, bo bardzo duży
    https://wolnelektury.pl/api/books/
    FIXME albo trzeba znaleźć sposób, by jednak parsować ten plik online albo wdrożyć mechanikę jego odświeżania co jakiś czas*/
    $json = file_get_contents("./json/books.json");
    $books = json_decode($json);
    $novels = [];
    // The code below creates the class Book
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
    $chosenBook = $novels[$random_book]->url;



	$xmlDoc = new DOMDocument();
	$xmlDoc->load($chosenBook);
 ?>