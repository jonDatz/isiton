
let shows = ["Adventure Time", "Courage the Cowardly Dog", "Bojack Horseman"];





function displayShow (){

let show = $(this).attr("data-name");
let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=wH45n8pCbWdmGgONQpIimBMLweZWUWKQ";


console.log(show);
console.log(shows);
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    let results = response.data;

    $("#gifBox").empty();

    console.log(response);

    for (let i = 0; i < 10; i++) {
      console.log(results[i]);


      let showDiv = $("<div>");
      let rating = results[i].rating;
      let p = $("<p>").text("Rating: " + rating);
      let showImage = $("<img>");
      showDiv.attr("class", "card gifImages" );
      showImage.attr("src", results[i].images.fixed_height_still.url);
      showImage.attr("data-still", results[i].images.fixed_height_still.url);
      showImage.attr("data-animate", results[i].images.fixed_height.url);
      showImage.data("state", "still" );
      showImage.attr("class", "dancingGifs");
      showDiv.prepend(p);
      showDiv.prepend(showImage);


      $("#gifBox").prepend(showDiv);
    }

    // *** ANIMATE AND PAUSE GIFS *** //

  $(".dancingGifs").on("click", function () {

    console.log('This ran');

    let state = $(this).data("state");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).data("state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).data("state", "still");
        
    }



  });


  });


}

// *** Runs on Page Load. Shows buttons at top of screen *** //

function showButtons () {
    $('#buttonBox').empty();

    for (let i = 0; i < shows.length; i++) {
        var b = $("<button>");

        b.addClass("btn btn-dark showButtons");

        b.attr("data-name", shows[i]);

        b.text("#" + shows[i]);

        $("#buttonBox").append(b);
        
    }
}


$("#add-Show").on("click", function(event) {
    event.preventDefault();

    // This line of code will grab the input from the textbox
    var show = $("#show-input").val().trim();

    // The movie from the textbox is then added to our array
    shows.push(show);
    $('#show-input').val('');

    // Calling renderButtons which handles the processing of our movie array
    showButtons();
  });





$(document).on("click", ".showButtons", displayShow);
showButtons();

