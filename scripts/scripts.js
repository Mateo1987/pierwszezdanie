$(document).ready(function() {
    // wybieramy książkę
    $.getJSON( "./json/books.json" )
      .done(function( json ) {
        console.log( "JSON Data: " + json.title );
      })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });


    var cover = $('dc\\:relation\\.coverImage\\.source');
    $('#tutaj').append(cover);



});
