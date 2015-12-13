<?php
include('php/books.php');

$books_data = array(
  'sentence' => $sentence,
  'title' => $chosenTitle,
  'author' => $chosenAuthor,
  'image' => $backgroundImage,
  'credits' => $imageCredits,
  'bookUrl' => $chosenUrl
 );
 echo(json_encode($books_data));

?>
