<?php 
    // biblioteka do parsowania xml
    include('simple_html_dom.php');

    /*plik json dostarczony przez api wolnychlektur pobrany lokalnie, bo bardzo duży
    https://wolnelektury.pl/api/books/
    FIXME albo trzeba znaleźć sposób, by jednak parsować ten plik online albo wdrożyć mechanikę jego odświeżania co jakiś czas*/
    $json = file_get_contents("../json/books.json");
    $books = json_decode($json);
    $novels = array();
    $chosenAuthor = "";
    $chosenTitle = "";
    $chosenCover = "";
    $chosenUrl = "";
    $chosenXML = "";
    $sentence = "";
    $akap = "";
    $backgroundImage = "";
    $imageCredits = "";

    // wypełniamy array powieściami
    foreach ($books as $book) {
        if ($book->genre == "Powieść") {
            $newHref = $book->href;
            array_push($novels,$newHref);
        }
    }
  
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
            chooseBook();
        }
    }

    function createSentence($abc){
        global $sentence;
        //gdy zdanie nie końćzy się korpką
        if (strpos($abc,"/.") != false){
            $sentence = $abc.".";
        }
        else {
            $sentence = strstr($abc, '.', true).".";
        }
    }

    // tutaj już pracujemy na pliku xml
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
                chooseBook();
                chooseSentence($chosenXML);
            }
        }
    createSentence($akap);
    }
    /*funkcja do wyciągania adresu url obrazka tła z pliku xml*/
    function getImageURl($xml){
        global $chosenXML;
        global $backgroundImage;
        global $imageCredits;
        $chosen_book_xml = simplexml_load_file($xml);
        $rdf = $chosen_book_xml->children("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
        if (is_null($rdf)) {
            // Na wypadek RDF wewnÄ…trz mastera.
            $rdf = $chosen_book_xml[0]->children("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
        }

        $description = $rdf->children("http://www.w3.org/1999/02/22-rdf-syntax-ns#")->Description;
        $dc = $description->children("http://purl.org/dc/elements/1.1/");
        $backgroundImage = $dc->{"relation.coverImage.url"};
        $imageCredits = $dc->{"relation.coverImage.attribution"};
    }
    
    chooseBook();
    chooseSentence($chosenXML);
    getImageURl($chosenXML);

 ?>
