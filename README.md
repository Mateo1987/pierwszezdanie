# PierwszeZdanie
Prosta stronka prezentująca pierwsze zdanie z losowej powieści z wolnych lektur
http://hadora.pl/pierwszezdanie

PHP zupełnie podstawowe - do ulepszenia.

Póki co korzystam z brzydkiego i pewnie bardzo nieefektywnego hacka - ładuję cały xml książki do niewidocznego diva, 
po czym jquery wyciągam potrzebne wartości. 
Nie byłem jednak w stanie wyciągnąć niektórych danych w php.
Problem dotyczy obsługi namespaces w xml.
Jak dotrzeć do dc:relation.coverImage.url?
Rozbijam się o problem namespaces w xml, opisany np. tutaj: http://blog.sherifmansour.com/?p=302

Początkowo próbowałem poradzić sobie z samym php i pewnie docelowo tak trzeba by to zrobić. 

TODO
- dodanie obsługi innych odpowiednich typów literatury, oprócz powieści
- pozbycie się brzydkiego hacka i czytanie wszystkich potrzebnych zmiennych wprost z xml i json
- rysowanie tekstu na canvas, by dało się szerować w social media
- odświeżanie obrazka ajaxem
- stały adres każdego cytatu, by dało się do niego linkować
- opcja zmiany tła na inne(własne?)
- wyszukiwanie książek po tytule

API WOLNYCYH LEKTUR
Strona powstała dzięki API Wolnych Lektur.
http://wolnelektury.pl/api

Szkoda, że w json w obiekcie danej książki nie ma adresu xml. Początkowo próbowałem generować adres pliku xml przez analogię do adresu url książki, ale okazuje się, że nie zawsze są analogiczne. 

Pamiętaj, by korzystać i wspierać wolnelektury!
https://wolnelektury.pl/

O PROJEKCIE
Projekt nie jest w żaden sposób związany z wolnymi lekturami i Fundacją Nowoczesna Polska.
PierwszeZdanie zostało przygotowane jako zadanie szkoleniowe do nauki html/css/javascript i php.


