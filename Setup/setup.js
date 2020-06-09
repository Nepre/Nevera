var cont = 0;


// ------ DATE ------ //

function checkTime(){
    if(document.getElementById("fetchOnline").checked){
        $('#modalHAc').css('pointer-events','none');
        $('#modalHDate').css('pointer-events','none');
        initDate();
    } 
    else{
        $('#modalHAc').css('pointer-events','auto');
        $('#modalHDate').css('pointer-events','auto');
    }
}

function changeWhat(time){
    
    if(time){
        $("#dateTime").html("Set current time");
        $("#dateTimeTitle").html("Time");
        var date = new Date();
        var currentTime = date.getHours() + ':' + date.getMinutes()
        $('#timeInput').val(currentTime);
        $("#timeInput").css('visibility', 'visible');
        $("#dateInput").css('visibility', 'hidden');
        $("#valueModal").text("0");
    }
    else{
        $("#dateTime").html("Set current date");
        $("#dateTimeTitle").html("Date");
        var today = new Date();
        $('#dateInput').val(today.toISOString().substr(0, 10));
        $("#dateInput").css('visibility', 'visible');
        $("#timeInput").css('visibility', 'hidden');
        $("#valueModal").text("1");
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

$(document).ready(function(){
	$(".date").click(function(){
		let innerHTML = "<div class='flex justify-between items-center pb-3'>" +
		"<p class='text-2xl font-bold'>Cambiar la fecha</p>" +
		"<div class='modal-close cursor-pointer z-50'>" +
			"<span title='Cerrar' class='fas fa-times fill-current text-grey hover:text-purple-300'></span>" +
		"</div>" +
	"</div>" +

	"<p class='p-modal'>Selecciona una nueva fecha para tu frigorífico, puedes cambiarla en cualquier momento.</p>" +

	"<div class='flex'>" +
		"<input id='dateInput' class='text-center justify-start border-2 border-gray-300 rounded-lg p-2 w-full my-2' type='date'>" +
	"</div>" +

	"<div class='flex justify-end pt-2'>" +
		"<button title='Cancelar' class='modal-close focus:outline-none focus:shadow-outline px-4 bg-transparent p-3 rounded-lg text-gray-700 hover:bg-purple-300 hover:text-white mr-2'>Cancelar</button>" +
		"<button title='Guardar' class='focus:outline-none focus:shadow-outline px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Guardar</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
	});
});

$(document).ready(function(){
	$(".time").click(function(){
		let innerHTML = "<div class='flex justify-between items-center pb-3'>" +
		"<p class='text-2xl font-bold'>Cambiar la hora</p>" +
		"<div class='modal-close cursor-pointer z-50'>" +
			"<span title='Cerrar' class='fas fa-times fill-current text-grey hover:text-purple-300'></span>" +
		"</div>" +
	"</div>" +

	"<p class='p-modal'>Selecciona una nueva hora para tu frigorífico, puedes cambiarla en cualquier momento.</p>" +

	"<div class='flex'>" +
		"<input id='timeInput' type='time' class='text-center border-2 border-gray-300 rounded-lg p-2 w-full my-2' type='date'>" +
	"</div>" +


	"<div class='flex justify-end pt-2'>" +
		"<button title='Cancelar' class='modal-close focus:outline-none focus:shadow-outline px-4 bg-transparent p-3 rounded-lg text-gray-700 hover:bg-purple-300 hover:text-white mr-2'>Cancelar</button>" +
		"<button title='Guardar' class='focus:outline-none focus:shadow-outline px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Guardar</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
	});
});


// ------ WELCOME ------ //

// Click anywhere and move to the next page
function initWelcome(){
    $('body').click(function(){
        window.location.href = "hey.html";
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

function changeInput(idInput, checkedIn){
    if(!checkedIn){
        document.getElementById(idInput).className = "absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out";
    }
    else{
        document.getElementById(idInput).className = "absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full"
    }
}

$(document).ready(function(){
	$("#temperatureRangeId").mousemove(function(){
        $("#temperatureOutputId").html($("#temperatureRangeId").val() + "ºC");
    });
    $("#temperaturaConRangeId").mousemove(function(){
        $("#temperatureConOutputId").html($("#temperaturaConRangeId").val() + "ºC");        
	});
});

function changeInput(idInput, checkedIn){
		
	if(!checkedIn){
		document.getElementById(idInput).className = "absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out";
	}
	else{
		document.getElementById(idInput).className = "absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full"
	}
}

function changeDetection(set){
	//Cookies.set("automaticDetection", (set)? 1:0);
	if(!set){
		changeInput('inputLuz', false);
		$('#checked2').prop('disabled', true);

		changeInput('inputPantalla', false);
		$('#checked3').prop('disabled', true);
	}
	else{
		changeInput('inputLuz', true);
		$('#checked2').prop('disabled', false);

		changeInput('inputPantalla', true);
		$('#checked3').prop('disabled', false);
	}
}