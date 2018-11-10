$(window).on('load',function(){
    $('#startupModal').modal('show');
});

$(document).ready( function () {

    var config = {
        apiKey: "AIzaSyAGAhaC7nIXYdXfql1p3bpjPT8vCfQaAxQ",
        authDomain: "project1-test-triptracker.firebaseapp.com",
        databaseURL: "https://project1-test-triptracker.firebaseio.com",
        projectId: "project1-test-triptracker",
        storageBucket: "project1-test-triptracker.appspot.com",
        messagingSenderId: "158304705795"
    };
    firebase.initializeApp(config);    
    
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

        // Summited info is converted to be displayed in TPE card
        var destEntryItem = $("<th>").text(dest);
        var sDateEntryItem = $("<th>").text(startD);
        var sTimeEntryItem = $("<th>").text(startT);
        var eDateEntryItem = $("<th>").text(endD);
        var eTimeEntryItem = $("<th>").text(endT);
        var pMembersEntryItem = $("<th>").text(pMembers);
        
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
    });

    $("#showDiv").on("click", function (){
        var x = document.getElementById("activeDiv");
        
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    });


});