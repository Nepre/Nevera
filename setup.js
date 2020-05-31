var cont = 0;


// ------ DATE ------ //

function checkTime(){
    if($("#fetchOnline").is(":checked")) initDate();
}

function changeWhat(time){
    console.log(time);
    
    if(time){
        $("#dateTime").html("Set current time");
        $("#dateTimeTitle").html("Time");
        var date = new Date();
        var currentTime = date.getHours() + ':' + date.getMinutes()
        $('#timeInput').val(currentTime);
        $("#timeInput").css('visibility', 'visible');
        $("#dateInput").css('visibility', 'hidden');
    }
    else{
        $("#dateTime").html("Set current date");
        $("#dateTimeTitle").html("Date");
        var today = new Date();
        $('#dateInput').val(today.toISOString().substr(0, 10));
        $("#dateInput").css('visibility', 'visible');
        $("#timeInput").css('visibility', 'hidden');
    }
}

// Function credits to Salman A on stackoverflow
// Add nth to number
function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

var weekDaysEnglish = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
var monthEnglish = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   

function initDate(){
    var d = new Date();
    var str  = weekDaysEnglish[d.getDay()] + ", " + monthEnglish[d.getMonth()] + " " + ordinal_suffix_of(d.getDate()) + ", " + d.getFullYear();
    var min = d.getMinutes();
    if(min == 0) min = "00";
    else if(min < 10) min = "0"+min
    var str2 = d.getHours() + ":" + min;
    
    $("#dateH").html(str);
    $("#time").html(str2);
}

function fetchOnline(){
    if(!$("#fetchOnline").is(":checked")){

    }
    else
        $("#dateInput").css('visibility', 'hidden');
    
    //if($("#fetchOnline").prop)
}


// ------ WELCOME ------ //

// Click anywhere and move to the next page
function initWelcome(){
    $('body').click(function(){
        window.location.href = "setup-date.html";
    });
}

// Array of Welcome messages
var welcomeArray = 
[
    ["Hola!", "Pulse para continuar"],
    ["Bonjour!", "Veuillez cliquer pour continuer"],
    ["Welcome!", "Press to continue"],
    ["おはよう！", "続行するには押してください"]

]

// Fade in fade out language
function changeLanguage(){ 
    $("#title").fadeOut();
    $("#subtitle").fadeOut();
    setTimeout(function(){
        cont++;
        if(cont >= welcomeArray.length) cont = 0;
        document.getElementById("title").innerHTML = welcomeArray[cont][0];
        document.getElementById("subtitle").innerHTML = welcomeArray[cont][1];

        $("#title").fadeIn();
        $("#subtitle").fadeIn();
    }, 1200);
}