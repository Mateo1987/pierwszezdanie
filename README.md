# PierwszeZdanie
Na tę chwilę work in progress/proof of concept :)

Prosta stronka prezentująca pierwsze zdanie z losowej powieści z wolnych lektur
http://pierwszezdanie.pl

PHP zupełnie podstawowe - do ulepszenia.


TODO
- responsywność
- dodanie obsługi innych odpowiednich typów literatury, oprócz powieści, nietypowych przypadków (np. książka zaczyna się od dialogu)
- odświeżanie obrazka ajaxem
- znaczek ładowania na czas ładowania zawartości
- stały adres każdego cytatu, by dało się do niego linkować
- link do pobrania obrazka
- social share
- wyszukiwanie książek po tytule
- odświeżanie lokalnej kopii books.json lub sposób na szybsze jego parsowanie online
[Wydaje się, ze wolnelektury blokują pobieranie hostowanych przez nich obrazków.]



API WOLNYCYH LEKTUR
Strona powstała dzięki API Wolnych Lektur.
http://wolnelektury.pl/api

Szkoda, że w json w obiekcie danej książki nie ma adresu xml. Początkowo próbowałem generować adres pliku xml przez analogię do adresu url książki, ale okazuje się, że nie zawsze są analogiczne.

Pamiętaj, by korzystać i wspierać wolnelektury!
https://wolnelektury.pl/

O PROJEKCIE
Projekt nie jest w żaden sposób związany z wolnymi lekturami i Fundacją Nowoczesna Polska.
PierwszeZdanie zostało przygotowane jako zadanie szkoleniowe do nauki html/css/javascript i php.

Za pomoc w oswojeniu api wolnychlektur i struktury xmli książek dziękuję <a href="https://github.com/rczajka">Radkowi Czajce</a> z <a href="https://github.com/fnp/">Fundacji Nowoczesna Polska</a>


