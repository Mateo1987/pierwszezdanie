# pierwszezdanie
Prosta stronka prezentująca pierwsze zdanie z losowej powieści z wolnych lektur

PHP zupełnie podstawowe - do ulepszenia.

Póki co korzystam z brzydkiego i pewnie bardzo nieefektywnego hacka - ładuję cały xml książki do niewidocznego diva, 
po czym jquery wyciągam potrzebne wartości. 
Nie byłem jednak w stanie wyciągnąć niektórych danych w php.
Problem dotyczy obsługi namespaces w xml.
Jak dotrzeć do dc:relation.coverImage.url?
Opisane np. tutaj: http://blog.sherifmansour.com/?p=302

Początkowo próbowałem poradzić sobie z samym php i pewnie docelowo tak trzeba by to zrobić. Kod z tych początkowych prób zostaje w branch php-parse-xml. 
