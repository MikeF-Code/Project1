// var GMapikey= "AIzaSyAed1ue_g_WurffwWq9oDWwGLpxO9RBZ6E"


// Yelp ajax request
function yelpRestaurantData() {

var location= "Bronx"; /* change to the html element that grabs the destination from the table on the display page */
var Yapikey= "XwSkYev9Zx9I3uRA2EHdtKjbR2N75aL483Khjs9T4dmaQbU0gaZyCPuOzCo_mpgyEMCNUlJNae06jMoHPQggFTKvM5Zxn4hoaBWws_TclBie18PHGlCD4MyG_-XiW3Yx";
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + location + "&term=restaurants&radius=20000&limit=10";
console.log(queryURL);
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer ' + Yapikey,
          },
        method: "GET",
        dataType: 'json',
      }).then(function(response) {
        console.log(response);

        // creating div for restuarant list
        var restaurantDiv = $("#restaurantDiv");
        // adding the header to the div
        var restaurantHeading = $("<h3>Top 10 Popular Restaurants</h3>");
        restaurantDiv.append(restaurantHeading);
        // Generates a list of 10 Restaurants
        for (var i = 0; i < 10; i++){
            // stores the restaurant's name
            var responseData = response.businesses[i].name;
            // creating a p tag element
            var list = $("<p>")
            // add class to p tag
            list.addClass("restaurant-link");
            // add data attribute
            list.attr("data-name", responseData);
            // providing the p tags text
            list.text(responseData);
            console.log(responseData); 
            
                
            // adding the list to the div
            restaurantDiv.append(list);
        }
        // click function storing each restaurnts info to be displayed once clicked
$(document).on("click", ".restaurant-link", displayRestaurantData);

//once click should display a bubble holding info
function displayRestaurantData(){

// creating a div to hold the restaurant name
var restaurants = $("<div class='topRest'>");
var restName = response.businesses[0].name;
console.log("Name: ", restName);
var restaurantName = $("<p>").text("Name: ", restName);

restaurants.append(restaurantName);

// storing the address data
var info = response.businesses[0].location.address1;
console.log("Address: ", info);
// displaying the address on the page 
var locAdd= $("<p>").text("Address: " + info);
// Displaying the rating
restaurants.append(locAdd);

// storing the address phone #
var call = response.businesses[0].phone;
console.log("Phone: ", call);
// displaying the address on the page 
var locContact= $("<p>").text("Phone: " + call);
// Displaying the rating
restaurants.append(locContact);

// storing the restaurant's rating
var restRating = response.businesses[0].rating;
console.log("Rating: ", restRating);
// displaying the restaurant's rating
var rating = $("<p>").text("Rating: ", restRating);
// appends the restuarant's rating 
restaurants.append(rating);

$(".restaurant-link").append(restaurants)
}      
})

}
yelpRestaurantData();



 
// Yelp function for the top 10 Events List 
function yelpEventData() {


    var location= "charlotte"; /* change to the html element that grabs the destination from the table on the display page */
    var categories = "poolbilliards,comedyclubs,tours"
    var Yapikey= "XwSkYev9Zx9I3uRA2EHdtKjbR2N75aL483Khjs9T4dmaQbU0gaZyCPuOzCo_mpgyEMCNUlJNae06jMoHPQggFTKvM5Zxn4hoaBWws_TclBie18PHGlCD4MyG_-XiW3Yx";
    var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + location + "&categories=" + categories + "&radius=20000&limit=10";
    console.log(queryURL);
        $.ajax({
            url: queryURL,
            headers: {
                'Authorization': 'Bearer ' + Yapikey,
              },
            method: "GET",
            dataType: 'json',
          }).then(function(response) {
            console.log(response);
            
            // creating div for event list
            var eventDiv = $("#eventDiv");
            // adding the header to the div
            var eventHeading = $("<h3>Top 10 Popular Attractions</h3>");
            eventDiv.append(eventHeading);

            for (var i = 0; i < 10; i++){
                // stores the restaurant's name
                var responseData = response.businesses[i].name;
                // creating a p tag element
                var list = $("<p>")
                // add class to p tag
                list.addClass("event-link");
                // add data attribute
                list.attr("data-name", responseData);
                // providing the p tags text
                list.text(responseData);
                console.log(responseData)     
                // adding the list to the div
                eventDiv.append(list);
            }
        });
    }   
    // calls function to display the list      
    yelpEventData();

// click function to display each event's info
$(document).on("click", ".event-link", displayEventData);

function displayEventData(){

    // creating a div to hold the event name
    var event = $("<div class='topEvent'>");
    var eventName = response.businesses[i].name;
    console.log("Name: ", eventName);
    var name = $("<p>").text("Name: ", eventName);
    event.append(name);

    // storing the event's alias
    var alias = response.businesses[i].alias;
    var nameDisplay = alias.replace(/-/g, " ");
    console.log("Event description: ", nameDisplay);
    // displaying the address on the page 
    var aliasType= $("<p>").text("Event description: " + nameDisplay);
    // Displaying the rating
    event.append(aliasType);
            
    // storing the address data
    var info = response.businesses[i].location.address1;
    console.log("Address: ", info);
    // displaying the event's address on the page 
    var eventAdd= $("<p>").text("Address: " + info);
    // Displaying the rating
    event.append(eventAdd);
    
    // storing the event phone #
    var call = response.businesses[i].phone;
    console.log("Phone: ", call);
    // displaying the address on the page 
    var eventContact= $("<p>").text("Phone: " + call);
    // Displaying the rating
    event.append(eventContact);
            
    // storing the event's rating
    var eventRating = response.businesses[i].rating;
    console.log("Rating: ", eventRating);
    // displaying the restaurant's rating
    var rating = $("<p>").text("Rating: ", eventRating);
    // Appending the event's rating
    event.append(rating);
    
    $("#eventList").prepend(event);

}
    
    
            




