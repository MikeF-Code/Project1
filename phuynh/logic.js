<<<<<<< HEAD
var config = {
=======
$(window).on('load',function(){
    $('#startupModal').modal('show');
});

$(document).ready( function () {

    var config = {
>>>>>>> 5ed8067d551fc7bc7a5a263c3c668461fb96ee9b
        apiKey: "AIzaSyAGAhaC7nIXYdXfql1p3bpjPT8vCfQaAxQ",
        authDomain: "project1-test-triptracker.firebaseapp.com",
        databaseURL: "https://project1-test-triptracker.firebaseio.com",
        projectId: "project1-test-triptracker",
        storageBucket: "project1-test-triptracker.appspot.com",
        messagingSenderId: "158304705795"
    };
<<<<<<< HEAD
    firebase.initializeApp(config);

$(document).ready( function () {    

    var id;
    var itinLoad = [];

    var randomid = (Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10);
    id = parseInt(randomid, 10);
    console.log("id is: "+id);
});    
    
function createDestData() {
=======
    firebase.initializeApp(config);    
    
>>>>>>> 5ed8067d551fc7bc7a5a263c3c668461fb96ee9b
    // Event listener for translating user input data into the Trip Planner Entries (TPE) card
    $("#entrySubmit").on("click", function(event) {
        event.preventDefault();
        
        var dateFormat = "MM/DD/YYYY";
        var timeFormat = "h:mm";

        // Entries in the form are stored in variables
        var dest = $("#destInput").val().trim();
        var sDate = $("#datepicker1").val().trim();
        var eDate = $("#datepicker2").val().trim();
        var sTime = $("#timepicker1").val().trim();
        var eTime = $("#timepicker2").val().trim();
        var pMembers = $("#party-members").val().trim();

        // Reconverts date & time format using momentJS
        var startD = moment(sDate, dateFormat).format("MMM Do YYYY");
        var endD = moment(eDate, dateFormat).format("MMM Do YYYY");
        var startT = moment(sTime, timeFormat).format("LT");        
        var endT = moment(eTime, timeFormat).format("LT");

        // Creating new entries for the TPE card
        var newEntry = $("<tr>");
        $("#newEntryList").append(newEntry);

        var newEntryData = {
            dest: dest,
            startDate: startD,
            endDate: endD,
            startTime: startT,
            endTime: endT,
            partyMembers: pMembers
        }

        database.ref('plan/' + id).push(newEntryData);

        // Summited info is converted to be displayed in TPE card
        var destEntryItem = $("<td>").text(newEntryData.dest);
        var sDateEntryItem = $("<td>").text(newEntryData.startD);
        var sTimeEntryItem = $("<td>").text(newEntryData.startT);
        var eDateEntryItem = $("<td>").text(newEntryData.endD);
        var eTimeEntryItem = $("<td>").text(newEntryData.endT);
        var pMembersEntryItem = $("<td>").text(newEntryData.pMembers);
        
        destEntryItem.attr("scope", "col");
        sDateEntryItem.attr("scope", "col");
        sTimeEntryItem.attr("scope", "col");
        eDateEntryItem.attr("scope", "col");
        eTimeEntryItem.attr("scope", "col");
        pMembersEntryItem.attr("scope", "col");

        // Submitted info appended to the new entry for the TPE card
        newEntry.append(destEntryItem);
        newEntry.append(sDateEntryItem);
        newEntry.append(sTimeEntryItem);
        newEntry.append(eDateEntryItem);
        newEntry.append(eTimeEntryItem);
        newEntry.append(pMembersEntryItem);
<<<<<<< HEAD
=======
    });

    $("#showDiv").on("click", function (){
        var x = document.getElementById("activeDiv");
        
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });
>>>>>>> 5ed8067d551fc7bc7a5a263c3c668461fb96ee9b

        $("#destInput").val('');
        $("#datepicker1").val('');
        $("#datepicker2").val('');
        $("#timepicker1").val('');
        $("#timepicker2").val('');
        $("#party-members").val('');
    });    
};

function loadEntry() {

    $("#load-entry").on("click", function(event) {
        event.preventDefault();

        // Pulls the existing itinerary ID out of the text input and assigns it to a variable.
        id  = $("#ID-Input").val().trim();
        console.log(id);
        // Do a one-time read from Firebase, reading the destination objects that were created/written to Firebase on the "itinerary builder" page.  
        database.ref('plan/' + id + '/').once('value').then(function(snapshot){
            console.log(snapshot.val());
            itinLoad = snapshot.val();
            console.log('---------');

            // Since each individual destination returns as an individual object separately from one another, we need to convert that list of objects to an array in order to loop through it and pull the data from each one, in order to propagate our table.
            var itinArray = Object.values(itinLoad)
            console.log("Number of objects in itinerary array: " + itinArray.length);
            console.log(itinArray);

            var itinList = $("<ul></ul>");

            for (var i = 0; i < itinArray.length; i++) {
                console.log(itinArray[i].city);
                console.log(itinArray[i].startDate);
                console.log(itinArray[i].endDate);
                console.log('-------------');
            }
            for (var i = 0; i < itinArray.length; i++) {
                var itinListItem = $("<li></li>");
                var itinA = $("<a></a>");

                itinList.addClass("ui-menu-item");
                itinList.attr("role", "menuitem");

                itinA.addClass("ui-all");
                itinA.attr("tabindex", "-1");

                itinA.text(itinArray[i].city);
                itinListItem.append(itinA);

                itinList.append(itinListItem);
            }
            $("#").append(itinList);
        });
    });
};