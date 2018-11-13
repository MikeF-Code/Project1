// Initialize Firebase - this will need to be changed to the "Live" database before we present on Saturday
var config = {
    apiKey: "AIzaSyCLx6kDo1VEfFY1_ZWD9Ux9jEU0WHQR3wE",
    authDomain: "project1-triptracker.firebaseapp.com",
    databaseURL: "https://project1-triptracker.firebaseio.com",
    projectId: "project1-triptracker",
    storageBucket: "project1-triptracker.appspot.com",
    messagingSenderId: "574177293475"
  };
      
firebase.initializeApp(config);

var database = firebase.database();

// id is a variable that will hold the randomly generated or user-supplied 16 digit number that our code is using to pull specific datasets out of the Firebase DB.  Logic for this is visible in the code below.
var id;

// itineraryLoad is the object that contains a number of sub-objects when loading an existing travel itinerary from FireBase.  I initialize the variable here to ensure that our page knows the variable type is 'object'.  Additional logic utilizing this variable will be seen below.
var itineraryLoad = {};

var cities = [];
var startDates = [];
var endDates = [];
var activities = {

};

// This function is to generate a random ID value.  This will need some editing, as we cannot actually run this on document ready, seeing as how we have three separate HTML files that will be loading at various points during the app's use.  If we leave this as-is, the 'id' variable will be overwritten with a new 16 digit number every time any of the 3 pages loads, and we really only want this to happen if a user clicks the "New Itinerary" button on our landing page.
$(document).ready( function() {

    // Materialize Initializations
    $('.modal').modal();
    $('.datepicker').datepicker();

    // Display the modal
    $("#loadItinerary").modal('open');

    // Random background image
    // var randomBG = Math.floor(Math.random() * 10);

    console.log("Document loaded.")
    // This generates a random 16 digit string as two sets of 8 digit number strings, which are then concatanated together to make the 16 digit whole.  This ensures a possible leading 0 isn't cut off, turning it into a 15 digit number.
    var randomid = (Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10);
    // Convert 16 digit string to number type - this may not be necessary, as I don't believe we're performing any actual mathematical operations on this number.
    id = parseInt(randomid, 10);
    console.log("id is: "+id);
    console.log(typeof id);

    // Push id number into HTML display
    $("#tripId").text(id);
});

// This function is for writing data to FireBase, taken from the "itinerary builder" page.  I don't have that page currently available, so I am using placeholder ids until we have been provided a working copy by Michelle.  You'll want to replicate this function (with different jQuery selectors) for the "activity selection" page, where you'll be logging start and end times for the suggested places the users select on that page.
$("#destinationSubmit").on("click", function(event) {
    event.preventDefault();
    
    // Grabs user input of destination city, the first day they'll be at said destination, and the last day they'll be at that destination.
    var cityName = $("#city-name-input").val().trim();
    var startDate = $("#start-date-input").val().trim();
    var endDate = $("#end-date-input").val().trim();
    
    var newRow = $("<tr>").append(
        $("<td>").text(cityName),
        $("<td>").text(startDate),
        $("<td>").text(endDate)
    );

    $("#destinationTable > tbody").append(newRow);

    // Creates local "temporary" object for holding destination data.
    var newDestination = {
        city: cityName,
        startDate: startDate,
        endDate: endDate
    };
    

    // Uploads destination data to the database
    database.ref('plan/' + id + '/cities/').push(newDestination);
    
    // Logs everything to console for testing/verification
    console.log(newDestination.city);
    console.log(newDestination.startDate);
    console.log(newDestination.endDate);
    
    // Clears all of the text-boxes
    $("#city-name-input").val("");
    $("#start-date-input").val("");
    $("#end-date-input").val("");
    });

// This function is for writing the "attraction scheduler" data to FireBase.



// This function will allow the user to load an existing itinerary from FireBase, when a valid ID number is supplied.  It currently does NOT pull individual activity/time data, so it may need to be extended to incorporate this functionality.  This function will need to have some functionality added where the ID number is checked against FireBase itself to ensure it actually exists - if you need a hand with that, I can write that functionality for you.  I have commented out the part that uses jQuery to append HTML to the hidden table on the landing page, since you'll be in control of the format of that table. Please use the "modal.html" page found on the Michelle branch as your point of reference for the jQuery, and keep in mind the format of the page as demonstrated to you on the sheet of paper I showed you towards the end of class today.  If any of this seems unclear, reach out to me and I'll clarify further!
$("#loadPlan").on("click", function(event) {
    event.preventDefault();

    // Pulls the existing itinerary ID out of the text input and assigns it to a variable.
    id  = $("#loadId").val().trim();
    console.log(id);
    $("#tripId").text(id);

    // Do a one-time read from Firebase, reading the destination objects that were created/written to Firebase on the "itinerary builder" page.  
    database.ref('plan/' + id + '/cities/').once('value').then(function(snapshot){
        console.log(snapshot.val());
        itineraryLoad = snapshot.val();
        console.log('---------');
        console.log("Itinerary Load object:");
        console.log(itineraryLoad);
        // Since each individual destination returns as an individual object separately from one another, we need to convert that list of objects to an array in order to loop through it and pull the data from each one, in order to propagate our table.
        var itineraryArray = Object.values(itineraryLoad)
        console.log("Number of objects in itinerary array: " + itineraryArray.length);
        console.log(itineraryArray);
        for (var i = 0; i < itineraryArray.length; i++) {
            console.log("City "+i+" is: "+itineraryArray[i].city);
            console.log("Arrival Date "+i+" is: "+itineraryArray[i].startDate);
            console.log("Departure Date "+i+" is: "+itineraryArray[i].endDate);
            console.log('-------------');
            // jQuery for creation of card/table
            var dayCityRow = $("<div>");
            dayCityRow.addClass("row");
            var dayCityCol = $("<div>");
            dayCityCol.addClass("col s8 offset-s2");
            var dayCityCard = $("<div>");
            dayCityCard.addClass("card grey lighten-4");
            var dayCityTable = $("<table>");
            dayCityTable.addClass("striped centered");
            var dayCityTbody = $("<tbody>");
            var dayCityTrow = $("<tr>").append(
                $("<td>").text(itineraryArray[i].city),
                $("<td>").text(itineraryArray[i].startDate),
                $("<td>").text(itineraryArray[i].endDate)
            );
            dayCityTbody.append(dayCityTrow);
            dayCityTable.append(dayCityTbody);
            dayCityCard.append(dayCityTable);
            dayCityCol.append(dayCityCard);
            dayCityRow.append(dayCityCol);

            $("#finishedPlan").append(dayCityRow);
        };
    });
});