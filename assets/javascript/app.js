
// Default buttons
var topics = ["Bugs Bunny", "Sylvester the Cat", "Daffy Duck", "Road Runner", 
"Elmer Fudd", "Wile E. Coyote", "Tweety Bird", "Yosemite Sam", "Porky Pig",
"Pepe Le Pew", "Michigan J. Frog", "Foghorn Leghorn", "Marvin the Martian",
"The Tasmanian Devil"];
// max number of gifs to show
var maxResults = 6;

$( document ).ready(function() {
topicsButtons();
});


// Take the strings in the topics array and create a button for each
function topicsButtons() {

  // $("#topics").html("");
  for (var i = 0; i < topics.length; i++) {
    // create a new row for each 4 buttons
    if ((i % 4 === 0) && (i > 0)) {
      $("#topics").append("<div>") 
    }

    $("#topics").append("<button data-wb='" + topics[i] + "'>" + topics[i]);
  }



  $("button").on("click", function() {
    // Grabbing and storing the data-wb property value from the button
    var wb = $(this).attr("data-wb");

    // Test to see if a WB button and not the submit button
    if (typeof wb !== typeof undefined && wb !== false) {
      
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        wb + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })

      // After data comes back from the request
      .done(function(response) {
        console.log(queryURL);

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // limit the number of gifs
        if (results.length < maxResults ) {
          maxResults = results.length;
        }

        // Looping through each result item
        for (var i = 0; i < maxResults; i++) {

          // Creating and storing a div tag
          var wbDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

          // Creating and storing an image tag
          var wbImage = $("<img class='gif'>");
          // Setting the src attribute of the image to a property pulled off the result item
          wbImage.attr("src", results[i].images.fixed_height_still.url);
          wbImage.attr("data-still", results[i].images.fixed_height_still.url);
          wbImage.attr("data-animate", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the wbDiv
          wbDiv.append(p);
          wbDiv.append(wbImage);

          // Prependng the wbDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(wbDiv);
        }




      $("img").on("click", function() {
        // $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "animate") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "still");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "animate");
        }
      })


      }) // .done
    } // close of "if" statement above for test to see if a WB button.

    // if not a WB button, it is a submit button, so append the value to the topics array
    // and re-draw the buttons.
    else {
      topics.push($("#newCharacter").val().trim());
      $("#topics").html("");
      $("#newCharacter").attr("value", "");
      topicsButtons();
    } 
  }) // button click    
}; // topicsButton

