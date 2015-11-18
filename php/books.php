<?php 
    include('simple_html_dom.php');

    /*plik json dostarczony przez api wolnychlektur pobrany lokalnie, bo bardzo duży
    https://wolnelektury.pl/api/books/
    FIXME albo trzeba znaleźć sposób, by jednak parsować ten plik online albo wdrożyć mechanikę jego odświeżania co jakiś czas*/
    $json = file_get_contents("./json/books.json");
    $books = json_decode($json);
    $novels = array();
    $chosenAuthor = "";
    $chosenTitle = "";
    $chosenCover = "";
    $chosenUrl = "";
    $chosenXML = "";
    $sentence = "";
    $akap = "";

    // wypełniamy array powieściami
    foreach ($books as $book) {
        if ($book->genre == "Powieść") {
            $newHref = $book->href;
            array_push($novels,$newHref);
        }
    }
    /*//Obiekt książka do dodawania do array novels
        class Hrefs {
            // Creating some properties (variables tied to an object)
            public $title;
            public $author;
            public $bookUrl;
            public $href;
            public $cover;
            
            // Assigning the values
            public function __construct($title,$author,$bookUrl,$href) {
              $this->title = $title;
              $this->author = $author;
              $this->bookUrl = $bookUrl;
              $this->href = $href;
              $this->cover = $cover;
            }
          }*/

    // funkcja do losowania książki
    function chooseBook() {
        global $novels;
        global $chosenAuthor;
        global $chosenTitle;
        global $chosenUrl;
        global $chosenXML;
        $random_book = rand(0,count($novels));
        $chosen_href = $novels[$random_book];
        $json = file_get_contents($chosen_href);
        $chosen_json = json_decode($json,true);
        $children = $chosen_json['children'];
        if ( empty($children[0]) ) {
            $chosenAuthor = $chosen_json['authors'][0]['name'];
            $chosenTitle = $chosen_json['title'];
            $chosenUrl = $chosen_json['url'];
            $chosenXML = $chosen_json['xml'];
        }
        else {
            echo "niepuste";
            chooseBook();
        }
    }

    // tutaj już pracujemy na pliku x
    // FIXME nietypowa struktura xml, np Eugenia Grandet
    function chooseSentence($xml) {
        global $sentence;
        global $akap;
        global $chosenXML;
        $chosen_book_xml = simplexml_load_file($xml);
        $akap = $chosen_book_xml->powiesc->akap[0];
        if (strlen($akap)==0){
            $akap = $chosen_book_xml->opowiadanie->akap;
            if (strlen($akap)==0){
                echo "krotkie";
                chooseBook();
                chooseSentence($chosenXML);
            }
        }
    $sentence = strstr($akap, '.', true).".";
    }
    
    chooseBook();
    chooseSentence($chosenXML);
    

 ?>
