# PierwszeZdanie
Na tę chwilę work in progress/proof of concept :)

Prosta stronka prezentująca pierwsze zdanie z losowej powieści z wolnych lektur
http://pierwszezdanie.pl

PHP zupełnie podstawowe - do ulepszenia.

TODO
- dodanie obsługi innych odpowiednich typów literatury, oprócz powieści
- w php omijanie pustych xmli (np. główny xml książki, która ma części)
- odświeżanie obrazka ajaxem
- stały adres każdego cytatu, by dało się do niego linkować
- wyszukiwanie książek po tytule
- odświeżanie lokalnej kopii books.json lub sposób na szybsze jego parsowanie online
[Wydaje się, ze wolnelektury blokują pobieranie hostowanych przez nich obrazków.]
- wykorzystać api Flickr lub podonego serwisu, znaleźć sposób na obejście blokady bez obciążania serwerów wolnych lektur


API WOLNYCYH LEKTUR
Strona powstała dzięki API Wolnych Lektur.
http://wolnelektury.pl/api

Szkoda, że w json w obiekcie danej książki nie ma adresu xml. Początkowo próbowałem generować adres pliku xml przez analogię do adresu url książki, ale okazuje się, że nie zawsze są analogiczne.

Pamiętaj, by korzystać i wspierać wolnelektury!
https://wolnelektury.pl/

O PROJEKCIE
Projekt nie jest w żaden sposób związany z wolnymi lekturami i Fundacją Nowoczesna Polska.
PierwszeZdanie zostało przygotowane jako zadanie szkoleniowe do nauki html/css/javascript i php.


