<?php
  // library for parsing xml
  include('simple_html_dom.php');

  /*json file from wonelektury's api stored locally, because it is really big
  https://wolnelektury.pl/api/books/
  FIXME find a way to parse it online or implement some refreshing mechanism*/
  $json = file_get_contents("./json/books.json");
  $books = json_decode($json);
  $novels = array();
  $chosenAuthor = "";
  $chosenTitle = "";
  $chosenUrl = "";
  $chosenXML = "";
  $sentence = "";
  $akap = "";
  $backgroundImage = "";
  $imageCredits = "";

  // fill array with novels
  foreach ($books as $book) {
    if ($book->genre == "Powieść") {
      $newHref = $book->href;
      array_push($novels,$newHref);
    }
  }

  // choose random novel
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
    //when there is no fullstop in first paragraph
    if (strpos($abc,"/.") != false){
      $sentence = $abc.".";
    }
    else {
      $sentence = strstr($abc, '.', true).".";
    }
  }

  // here we work on book xml file
  // FIXME include fixes for atypical xml structure
  function chooseSentence($xml) {
    global $sentence;
    global $akap;
    global $chosenXML;
    $chosen_book_xml = simplexml_load_file($xml);
    $akap = $chosen_book_xml->powiesc->akap[0];
    if (strlen($akap)==0){
      $akap = $chosen_book_xml->opowiadanie->akap;
      if (strlen($akap)==0){
        $akap = $chosen_book_xml->opowiadanie->akap_dialog;
      }
    }
  createSentence($akap);
  }

  /*find imageURL and imageCredits in book xml*/
  function getImageURl($xml){
    global $chosenXML;
    global $backgroundImage;
    global $imageCredits;
    $chosen_book_xml = simplexml_load_file($xml);
    $rdf = $chosen_book_xml->children("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    if (is_null($rdf)) {
      // In case RDF is within master
      $rdf = $chosen_book_xml[0]->children("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    }
    $description = $rdf->children("http://www.w3.org/1999/02/22-rdf-syntax-ns#")->Description;
    $dc = $description->children("http://purl.org/dc/elements/1.1/");
    $backgroundImage = $dc->{"relation.coverImage.url"};
    $imageCredits = $dc->{"relation.coverImage.attribution"};
  }

  /*check if background image already downloaded, if not, download it.*/
  function imageCache($imageWWW){
    global $backgroundImage;

    // prepare file name
    $position = strpos($backgroundImage,"image/")+7;
    $fileName = substr($backgroundImage,$position);

    // check if the file is in directory
    $fileInDirectory = "./covers/".$fileName;
    if (!file_exists($fileInDirectory)){
      //download file
      $ch = curl_init();
      $source = $backgroundImage;
      curl_setopt($ch, CURLOPT_URL, $source);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $data = curl_exec ($ch);
      curl_close ($ch);
      $destination = $fileInDirectory;
      $file = fopen($destination, "w+");
      fputs($file, $data);
      fclose($file);
    }
    $backgroundImage = $fileInDirectory;
  }

  chooseBook();
  chooseSentence($chosenXML);
  getImageURl($chosenXML);
  imageCache($backgroundImage);
?>
