var frigo = new Electro();
var small = false;
var automatic = false;
const widthChange = 767; 

window.setInterval(function(){
	recalculateTotal();
	checkShoppingList();

	if(window.innerWidth > widthChange){
		small = false;
		$(".burger").show();
	}
	else if(window.innerWidth <= widthChange && !small){
		small = true;
		$(".burger").hide();
	} 

	var closemodal = document.querySelectorAll('.modal-close');
	for (var i = 0; i < closemodal.length; i++) {
		closemodal[i].addEventListener('click', toggleModal);
	}
	
	if($(".shopping").is(":visible")){
		$(".left-arrow").removeClass("w-10/12").addClass("w-8/12");
	} else{
		$(".left-arrow").removeClass("w-8/12").addClass("w-10/12");
	}

	temperatureManager();
	checkProximity();
}, 50);

function init(){
	checkLights();
	checkMotores();
	frigo.on("connect", function () {
		console.log("Ya estoy conectado con el frigorifico!!!")
		console.log("Con este hay " + frigo.clientes + " clientes conectados");


		// Activar la luz del refrigerador cuando se abre la puerta
		/*frigo.on("refrigeradorPuerta", function (abierta) {
			console.log("Puerta:", abierta);
			frigo.refrigeradorLuz = abierta;
		});*/
	});
}

function checkProximity(){
	if(frigo.frigorificoPresencia){
		frigo.congeladorLuz = true;
		frigo.refrigeradorLuz = true;
	}
	else{
		if(Cookies.get('fridgelight') != 1) 
			frigo.refrigeradorLuz = false;
		
		if(Cookies.get('freezerlight') != 1) 
			frigo.congeladorLuz = false;
	}
}

function cambiarHora() {
	frigo.refrigeradorLuz = true;
	
}

// Luces

function alternarLuzRefrigerador() {
	var value = !frigo.refrigeradorLuz;
	frigo.refrigeradorLuz = !frigo.refrigeradorLuz;
	if(value){
		if(frigo.congeladorLuz == 1 || frigo.congeladorLuz == 2) turnOnOffButton(true, 3, "orange");
		Cookies.set('fridgelight', 1);
		turnOnOffButton(true, 1, "orange");

	}
	else{
		Cookies.set('fridgelight', 0);
		turnOnOffButton(false, 1, "orange");
		turnOnOffButton(false, 3, "orange");
	}
	return false;
}

function alternarLuzCongelador() {
	var value = !frigo.congeladorLuz;
	frigo.congeladorLuz = !frigo.congeladorLuz;
	if(value){
		Cookies.set('freezerlight', 1);
		if(frigo.refrigeradorLuz == 1 || frigo.refrigeradorLuz == 2) turnOnOffButton(true, 3, "orange");
		turnOnOffButton(true, 2, "orange");
		console.log("ENcendida2");
		
	}
	else{
		Cookies.set('freezerlight', 0);
		turnOnOffButton(false, 2, "orange");
		turnOnOffButton(false, 3, "orange");
	}
	return false;
}

function alternarAmbasLuces() { // Esto luce feote pero no sabia como hacerlo de otra forma
	if(frigo.refrigeradorLuz == true && frigo.congeladorLuz == false){
		frigo.refrigeradorLuz = true;
		frigo.congeladorLuz = true;
		turnOnOffButton(true, 1, "orange");
		turnOnOffButton(true, 2, "orange");
		turnOnOffButton(true, 3, "orange");
	}
	else if(frigo.congeladorLuz == true && frigo.refrigeradorLuz == false){
		frigo.refrigeradorLuz = false;
		frigo.congeladorLuz = false;
		turnOnOffButton(false, 1, "orange");
		turnOnOffButton(false, 2, "orange");
		turnOnOffButton(false, 3, "orange");
	} else if(frigo.congeladorLuz == true && frigo.refrigeradorLuz == true){
		frigo.refrigeradorLuz = false;
		frigo.congeladorLuz = false;
		turnOnOffButton(false, 1, "orange");
		turnOnOffButton(false, 2, "orange");
		turnOnOffButton(false, 3, "orange");
	} else if(frigo.congeladorLuz == false && frigo.refrigeradorLuz == false){
		frigo.refrigeradorLuz = true;
		frigo.congeladorLuz = true;
		turnOnOffButton(true, 1, "orange");
		turnOnOffButton(true, 2, "orange");
		turnOnOffButton(true, 3, "orange");
	}

	return false;
}

function checkLightButtons(color){

	if(frigo.refrigeradorLuz){
		document.getElementById("span1").innerHTML = "On"; 
		document.getElementById("button1").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else{
		document.getElementById("span1").innerHTML = "Off"; 
		document.getElementById("button1").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}

	if(frigo.congeladorLuz){
		document.getElementById("span2").innerHTML = "On";
		document.getElementById("button2").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300 focus:outline-none lg:ml-24 focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else{
		document.getElementById("span2").innerHTML = "Off"; 
		document.getElementById("button2").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none lg:ml-24 focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	
	if(frigo.congeladorLuz && frigo.refrigeradorLuz){
		document.getElementById("span3").innerHTML = "On"; 
		document.getElementById("button3").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300  focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else{
		document.getElementById("span3").innerHTML = "Off"; 
		document.getElementById("button3").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	
}

function checkMotorButtons(color){

	if(Cookies.get('fridgemotor') == 1 || Cookies.get('fridgemotor') == 2){
		document.getElementById("span1").innerHTML = "On"; 
		document.getElementById("button1").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else{
		document.getElementById("span1").innerHTML = "Off"; 
		document.getElementById("button1").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}

	if(Cookies.get('freezermotor') == 1 || Cookies.get('freezermotor') == 2){
		document.getElementById("span2").innerHTML = "On";
		document.getElementById("button2").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300 focus:outline-none lg:ml-24 focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else{
		document.getElementById("span2").innerHTML = "Off"; 
		document.getElementById("button2").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none lg:ml-24 focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	
	if((Cookies.get('fridgemotor') == 1 || Cookies.get('fridgemotor') == 2) && (Cookies.get('freezermotor') == 1 || Cookies.get('freezermotor') == 2)){
		document.getElementById("span3").innerHTML = "On"; 
		document.getElementById("button3").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300  focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else{
		document.getElementById("span3").innerHTML = "Off"; 
		document.getElementById("button3").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	
}

function turnOnOffButton(onoff, button, color){

	if(onoff && button==1){
		document.getElementById("span1").innerHTML = "On"; 
		document.getElementById("button1").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300  focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else if(button==1){
		document.getElementById("span1").innerHTML = "Off"; 
		document.getElementById("button1").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}

	if(onoff && button==2){
		document.getElementById("span2").innerHTML = "On"; 
		document.getElementById("button2").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300  focus:outline-none lg:ml-24 focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else if(button==2){
		document.getElementById("span2").innerHTML = "Off"; 
		document.getElementById("button2").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none lg:ml-24 focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	
	if(onoff && button==3){
		document.getElementById("span3").innerHTML = "On"; 
		document.getElementById("button3").className =  "flex flex-wrap justify-center items-center bg-"+ color +"-400 hover:bg-"+ color +"-300  focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	else if(button==3){
		document.getElementById("span3").innerHTML = "Off"; 
		document.getElementById("button3").className =  "flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	}
	
}


function alternarMotorRefrigerador() {	

	if(Cookies.get('fridgemotor') == 0){
		turnOnOffButton(true, 1, "blue");
		if(Cookies.get('freezermotor') == 1 || Cookies.get('freezermotor') == 2) turnOnOffButton(true, 3, "blue");

		if(Cookies.get('powerMode') == 2)		
			Cookies.set('fridgemotor', 2);
		else
			Cookies.set('fridgemotor', 1);
	}
	else{
		turnOnOffButton(false, 1, "blue");
		turnOnOffButton(false, 3, "blue");
		Cookies.set('fridgemotor', 0);
	}
	return false;
}

function alternarMotorCongelador() {
	console.log("alternando1");
	
	if(Cookies.get('freezermotor') == 0){
		turnOnOffButton(true, 2, "blue");
		console.log("alternando2");
		if(Cookies.get('fridgemotor') == 1 || Cookies.get('fridgemotor') == 2){
			console.log("alternando3");
			turnOnOffButton(true, 3, "blue");
		} 

		if(Cookies.get('powerMode') == 2){
			Cookies.set('freezermotor', 2);
		}
		else
		Cookies.set('freezermotor', 1);
	}
	else{
		turnOnOffButton(false, 2, "blue");
		turnOnOffButton(false, 3, "blue");
		Cookies.set('freezermotor', 0);
	}
}

function alternarAmbosMotores() { // Esto luce feote pero no sabia como hacerlo de otra forma
	if((Cookies.get('fridgemotor') == 1 || Cookies.get('fridgemotor') == 2) && Cookies.get('freezermotor') == 0){
		Cookies.set('fridgemotor', 1);
		Cookies.set('freezermotor', 1);
		turnOnOffButton(true, 1, "blue");
		turnOnOffButton(true, 2, "blue");
		turnOnOffButton(true, 3, "blue");
	} else if((Cookies.get('freezermotor') == 1 || Cookies.get('freezermotor') == 2) && Cookies.get('fridgemotor') == 0){
		Cookies.set('fridgemotor', 0);
		Cookies.set('freezermotor', 0);
		turnOnOffButton(false, 1, "blue");
		turnOnOffButton(false, 2, "blue");
		turnOnOffButton(false, 3, "blue");
	} else if((Cookies.get('freezermotor') == 1 || Cookies.get('freezermotor') == 2) && (Cookies.get('fridgemotor') == 1 || Cookies.get('fridgemotor') == 2)){
		Cookies.set('fridgemotor', 0);
		Cookies.set('freezermotor', 0);
		turnOnOffButton(false, 1, "blue");
		turnOnOffButton(false, 2, "blue");
		turnOnOffButton(false, 3, "blue");
	} else if(Cookies.get('freezermotor') == 0 && Cookies.get('fridgemotor') == 0){
		Cookies.set('fridgemotor', 1);
		Cookies.set('freezermotor', 1);
		turnOnOffButton(true, 1, "blue");
		turnOnOffButton(true, 2, "blue");
		turnOnOffButton(true, 3, "blue");
	}
	return false;
}

function checkLights(){	
	if(Cookies.get('fridgelight') == 1) // ON
		frigo.refrigeradorLuz = true;
	else if(Cookies.get('fridgelight') == 0) // OFF
		frigo.refrigeradorLuz = false;	
	if(Cookies.get('freezerlight') == 1) // ON
		frigo.congeladorLuz = true;
	else if(Cookies.get('freezerlight') == 0)// OFF
		frigo.congeladorLuz = false;	
	return false;
}

function checkMotores(){	
	if(Cookies.get('fridgemotor') == 1) // ON
		frigo.refrigeradorMotor = 1;
	else if(Cookies.get('fridgemotor') == 2)
		frigo.refrigeradorMotor = 2;
	else // OFF
		frigo.refrigeradorMotor = 0;	
	if(Cookies.get('freezermotor') == 1) // ON
		frigo.congeladorMotor = 1;
	else if(Cookies.get('freezermotor') == 2)
		frigo.congeladorMotor = 2;
	else // OFF
		frigo.congeladorMotor = 0;	
	return false;
}

// Hacer en settings poner temperatura objetivo de cada una de las opciones
// Hacer que si vuelvas a pulsar vuelva al modo normal (cuando tengamos uno)


var modesAndTarget = [
	{"mode":"eco", "targetFridge":6, "targetFreezer":-3}, 
	{"mode":"normal", "targetFridge":4, "targetFreezer":-4}, 
	{"mode":"boost", "targetFridge":3, "targetFreezer":-5}, 
	{"mode":"off", "targetFridge":0, "targetFreezer":0}, 
];


function temperatureManager(){

	
	var mode = Cookies.get('powerMode');
	var freezer = (Cookies.get('freezermotor') == 0)? false:true;
	var fridge = (Cookies.get('fridgemotor') == 0)? false:true;

	//console.log("freezer " + freezer);
	//console.log("fridge " + Cookies.get('fridgemotor'));
	
	if(mode == undefined) mode = 1;
	
	if(fridge){
		if(frigo.refrigeradorTemperatura < modesAndTarget[mode-1].targetFridge){ // Si la temperatura es menor que el target apagamos el motor
			frigo.refrigeradorMotor = 0;
		}
		else{ // Sino ponemos el modo que toca, normal si estamos en modo normal o eco y super si estamos en el modo boost 3
			if(mode == 3) frigo.refrigeradorMotor = 2;
			else frigo.refrigeradorMotor = 1;
		}
	}
	else{
		frigo.refrigeradorMotor = 0;
	}
	
	if(freezer){
		if(frigo.congeladorTemperatura < modesAndTarget[mode-1].targetFreezer){ // Si la temperatura es menor que el target apagamos el motor
			frigo.congeladorMotor = 0;
		}
		else{ // Sino ponemos el modo que toca, normal si estamos en modo normal o eco y super si estamos en el modo boost 3
			if(mode == 3) frigo.congeladorMotor = 2;
			else frigo.congeladorMotor = 1;
		}
	}
	else{
		frigo.congeladorMotor = 0;
	}
}

function normalMode(){
	Cookies.set('powerMode', 2);
	document.getElementById("button1").className = 	"flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
	document.getElementById("button2").className = 	"bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
}

function ecoMode(direct){

	if(direct == undefined) direct = false;
	// frigo.refrigeradorMotor = 1;
	// frigo.congeladorMotor = 1;
	if(Cookies.get('powerMode') == 1 && !direct){
		Cookies.set('powerMode', 2);
		document.getElementById("button1").className = 	"flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
		document.getElementById("button2").className = 	"bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
		return;
	}
	document.getElementById("button1").className = 	"flex flex-wrap justify-center items-center bg-green-500 hover:bg-green-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
	document.getElementById("button2").className = 	"bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
	Cookies.set('powerMode', 1);
	//"flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
	//"bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6"
}

function ultraCoolHyperExtraFreezingMode(direct){
	if(direct == undefined) direct = false;
	// frigo.refrigeradorMotor = 2;
	// frigo.congeladorMotor = 2;
	if(Cookies.get('powerMode') == 3 && !direct){
		Cookies.set('powerMode', 2);
		document.getElementById("button1").className = 	"flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
		document.getElementById("button2").className = 	"bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
		return;
	}
	Cookies.set('powerMode', 3);
	document.getElementById("button1").className = 	"flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
	document.getElementById("button2").className = 	"bg-blue-400 hover:bg-blue-300 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";

}

// TODO:: toquetear esto para que el modo eco solo se quede a una temperatura x que puede ser 6 grados arriba, 0 abajo
// Mientras que el modo normal sea otra temperatura
// Y el super sea una aún más baja
function checkFrideMode(){
	console.log(Cookies.get('powerMode'));
	
	if(Cookies.get('powerMode') == 3){
		ultraCoolHyperExtraFreezingMode(true);
	}
	else if(Cookies.get('powerMode') == 1){
		ecoMode(true);
	}
	else{
		normalMode();
	}
}

function deleteElement(id){
	$(id).hide();
}

function addElement(){
	$(".new-tag").show();
	$(".new-tag").html("<div class='new-tag m-1 text-xs flex inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-purple-300 text-gray-700 rounded-full'><p>Pan</p><span title='Eliminar' class='fas fa-times cursor-pointer px-1 py-2 fill-current text-grey'></span></div>");
}

function setHora(){
	setInterval(function(){
		var date = new Date();
		setTime(date);
	}, 1);
}

function setTime(dateobj){
	var hours = ("0" + dateobj.getHours()).slice(-2);
	var minutes = ("0" + dateobj.getMinutes()).slice(-2);
	var converted_date = "";

	converted_date = hours + ":" + minutes;
	document.getElementById("hour").innerHTML = converted_date;
}

/*** JQUERY ***/

// Menu de hamburguesa
$(document).ready(function(){
	$(".fa-bars").click(function(){
		$(".burger").toggle();
	});
});

/* SETTINGS & SHOPPING LIST */
$(document).ready(function(){
	var current_title = $(document).attr('title');
	if (current_title == "Compra") {
		var openmodal = document.querySelectorAll('.modal-open')
		for (var i = 0; i < openmodal.length; i++) {
			openmodal[i].addEventListener('click', function(event){
			event.preventDefault()
			toggleModal()
			})
		}
			
		const overlay = document.querySelector('.modal-overlay')
		overlay.addEventListener('click', toggleModal)


		document.onkeydown = function(evt) {
			evt = evt || window.event
			var isEscape = false
			if ("key" in evt) {
			isEscape = (evt.key === "Escape" || evt.key === "Esc")
			} else {
			isEscape = (evt.keyCode === 27)
			}
			if (isEscape && document.body.classList.contains('modal-active')) {
				toggleModal()
			}
		};
	}
	if (current_title == "Inicio") {
		document.onkeydown = function(evt) {
			evt = evt || window.event
			var isEscape = false
			if ("key" in evt) {
			isEscape = (evt.key === "Escape" || evt.key === "Esc")
			} else {
			isEscape = (evt.keyCode === 27)
			}
			if (isEscape) {
				initialIndex();
			}
		};
	}
});

// ---- Settings ----

// Para cambiar el titulo de los settings dependiendo de donde pinches
$(document).ready(function(){
	$("li").click(function(){
		setShopping($(this).text());
		setSetting($(this).text());
	});
});

function setShopping(text){
	if(window.location.pathname != ("/interfaz/shopping.html")) return;
	$("h2").html(text);
}

function setSetting(text){
	if(window.location.pathname != ("/interfaz/settings.html")) return;
	switch(text){
		case "Idioma":
			console.log("Idioma");
			break;

		default:
			$("#contenido").html(ajustesGenerales);
			console.log("Ajustes generales");		
	}

}

function changeInput(idInput, checkedIn){	
	if(!checkedIn){
		document.getElementById(idInput).className = "absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out";
	}
	else{
		document.getElementById(idInput).className = "absolute block w-4 h-4 mt-1 ml-1 rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out bg-purple-400 transform translate-x-full"
	}
}

function changeDetection(set){
	Cookies.set("automaticDetection", (set)? 1:0);
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

function changeLight(set){
	Cookies.set("automaticLight", (set)? 1:0);
}

function changeScreen(set){
	Cookies.set("inputPantalla", (set)? 1:0);
}


function Idioma(){
	
}

/* ITEMS*/
// Items de la lista de compra
var items = [{"file":"bread.png", "alt":"Pan", "title":"Hogaza de pan de leña", "price":"1.10", "quantity":1, "id":12}, {"file":"egg.png", "alt":"Huevos", "title":"Docena de huevos", "price":"0.95", "quantity":1, "id":9}, 
{"file":"meat.png", "alt":"Carne", "title":"Carne de ternera", "price":"9.75", "quantity":1, "id":0}, {"file":"fish.png", "alt":"Dorada", "title":"Dorada", "price":"6.50", "quantity":1, "id":14}, 
{"file":"carrots.png", "alt":"Zanahorias", "title":"Zanahorias", "price":"0.64", "quantity":1, "id":25}, {"file":"apples.png", "alt":"Manzanas", "title":"Manzanas rojas", "price":"1.23", "quantity":1, "id":4}];
// Items de la lista de carne
var meat = [{"file":"meat.png", "alt":"Carne", "title":"Carne de ternera", "price":"9.75", "quantity":1, "id":0}, {"file":"burger.png", "alt":"Hamburguesa", "title":"Hamburguesa de ternera y cerdo", "price":"2.05", "quantity":1, "id":1},
{"file":"chicken-breast.png", "alt":"Pollo", "title":"Pechuga de pollo", "price":"5.27", "quantity":1, "id":2}];
// Items de la lista de fruta
var fruit = [{"file":"strawberries.png", "alt":"Fresas", "title":"Fresas", "price":"3.75", "quantity":1, "id":3}, {"file":"apples.png", "alt":"Manzanas", "title":"Manzanas rojas", "price":"1.23", "quantity":1, "id":4},
{"file":"peaches.png", "alt":"Melocotones", "title":"Melocotones", "price":"1.14", "quantity":1, "id":5}, {"file":"pear.png", "alt":"Peras", "title":"Peras", "price":"2.35", "quantity":1, "id":6},
{"file":"bananas.png", "alt":"Plátanos", "title":"Plátanos", "price":"3.15", "quantity":1, "id":7}, {"file":"watermelon.png", "alt":"Sandía", "title":"Sandía entera", "price":"7.16", "quantity":1, "id":8}];
// Items de la lista de ovolácteos
var eggmilk = [{"file":"egg.png", "alt":"Huevos", "title":"Docena de huevos", "price":"0.95", "quantity":1, "id":9}, {"file":"milk.png", "alt":"Leche", "title":"Leche de vaca entera", "price":"0.79", "quantity":1, "id":10},
{"file":"cheese.png", "alt":"Mozzarella", "title":"Queso mozarella", "price":"0.80", "quantity":1, "id":11}];
// Items de la lista de pan
var bread = [{"file":"bread.png", "alt":"Pan", "title":"Hogaza de pan de leña", "price":"1.10", "quantity":1, "id":12}, {"file":"sandwichbread.png", "alt":"Pan de molde", "title":"Pan de molde", "price":"1.99", "quantity":1, "id":13}];
// Items de la lista de pescado
var fish = [{"file":"fish.png", "alt":"Dorada", "title":"Dorada", "price":"6.50", "quantity":1, "id":14}, {"file":"seabass.png", "alt":"Lubina", "title":"Lubina salvaje", "price":"40.60", "quantity":1, "id":15}, 
{"file":"hake.png", "alt":"Merluza", "title":"Merluza", "price":"4.25", "quantity":1, "id":16}, {"file":"salmon.png", "alt":"Salmón", "title":"Salmón noruego", "price":"13.90", "quantity":1, "id":17}, 
{"file":"sardine.png", "alt":"Sardinas", "title":"Sardinas", "price":"4.96", "quantity":1, "id":18}];
// Items de la lista de verduras
var veggies = [{"file":"eggplant.png", "alt":"Berenjena", "title":"Berenjena", "price":"0.54", "quantity":1, "id":20}, {"file":"broccoli.png", "alt":"Brócoli", "title":"Brócoli", "price":"1.45", "quantity":1, "id":21},
{"file":"zucchini.png", "alt":"Calabacín", "title":"Calabacín", "price":"0.49", "quantity":1, "id":22}, {"file":"potatoes.png", "alt":"Patatas", "title":"Patata nueva", "price":"1.34", "quantity":1, "id":23}, 
{"file":"peppers.png", "alt":"Pimientos", "title":"Trío de pimientos tricolor", "price":"1.19", "quantity":1, "id":24}, {"file":"carrots.png", "alt":"Zanahorias", "title":"Zanahorias", "price":"0.64", "quantity":1, "id":25}];
// Array de la lista en la que estoy actualmente
var array = 0;
/********/

// Función para aumentar la cantidad de un producto determinado
function increment(id, item) {
	// Cambiamos el value del input
	let value = $(id).next('input').val();
	if(value < 100)
		value++ ;
	$(id).next('input').val(value);
	// Y además la cantidad asociada al item
	items[item].quantity = value;
	// Con esto conseguimos que aparezca el nuevo precio cuando aumentamos la cantidad
	$(id).parent().prev().children('h4').html("Precio: " + (items[item].price * value).toFixed(2)+ "€");

	return false;
}

// Función para decrementar la cantidad de un producto determinado
function decrement(id, item){
	// Cambiamos el value del input
	let value = $(id).prev('input').val();
	// Comprobamos que no puedas tener menos de 1 cantidad por item, si se quiere eliminar, se pulsa la 'x'
	if(value > 1)
		value-- ;
	$(id).prev('input').val(value);
	// Con esto conseguimos que aparezca el nuevo precio cuando disminuimos la cantidad
	$(id).parent().prev().children('h4').html("Precio: " + (items[item].price * value).toFixed(2)+ "€");

	return false;
}

function recalc(id, item){
	let value = $(id).val();

	if(value > 100)
		value = 100;

	if(value < 1)
		value = 1;
	// Y además la cantidad asociada al item
	items[item].quantity = value;
	// Con esto conseguimos que aparezca el nuevo precio cuando aumentamos la cantidad
	$(id).parent().prev().children('h4').html("Precio: " + (items[item].price * value).toFixed(2)+ "€");
	$(id).val(value);

	return false;
}

// Función para eliminar los elementos del array de items
function removeItem(id){ 
	items.splice(id, 1);
	showShoppingList();
	return false;
}

// Función para mostrar los elementos de la lista de la compra
function showShoppingList(){
	let totalPrice = 0;
	let innerHTML = "<h2 class='text-4xl w-full mb-2 z-40'>Lista de la compra</h2>";
	if(items.length == 0){
		innerHTML += "<div class='flex flex-wrap justify-center items-center'>" +
			"<h4 class='bg-purple-100 p-2 rounded-sm mt-4'>¡Oops, parece que tu lista de la compra está vacía! Selecciona los productos desde la lista o introdúcelos por código de barras a mano o con el lector.</h4>" +
		"</div>";
		$('.principal').html(innerHTML);
	} else{
		let id = 0;
		for(let i = 0; i < items.length; i++){
			let price = (items[i].price * items[i].quantity).toFixed(2);
			let shoppingItems = "<div id='" + id + "' class='shopping-list flex flex-col w-auto'>" +
				"<div class='rounded-lg flex bg-gray-200 my-2 shadow-sm'>" +
					"<div class='relative h-32 w-40'>" + 
						"<span onclick='removeItem(" + i + ");' title='Eliminar' class='fas fa-times absolute bg-purple-300 hover:bg-purple-200 p-2 hover:text-gray-600 rounded-tl-lg rounded-br-lg cursor-pointer'></span>" +
						"<img src='resources/" + items[i].file + "' alt='" + items[i].alt + "' class='static w-full h-full rounded-l-lg object-cover'>" +
					"</div>" +
					"<div class='data flex-col w-full'>" + 
						"<h3 class='px-4 py-2 text-2xl'>" + items[i].title + "</h3>" +
						"<h4 class='price font-bold px-4'>Precio: " + price + "€</h4>" +
					"</div>" +
					"<div class='selector flex flex-col justify-center rounded-r-lg w-12 bg-purple-100'>" +
						"<button onclick='increment(this, " + i +")' title='Aumentar cantidad' class='my-auto w-full h-full mb-2 bg-purple-300 hover:bg-purple-200 rounded-tr-lg'><span class='fas fa-plus hover:text-gray-600'></span></button>" +
						"<input onchange = 'recalc(this, " + i +");' type='number' name='Cantidad' value='" + items[i].quantity + "' class='bg-purple-100 text-center font-bold'>" +
						"<button onclick='decrement(this, " + i +")' title='Disminuir cantidad' class='my-auto w-full h-full mt-2 bg-purple-300 hover:bg-purple-200 rounded-br-lg'><span class='fas fa-minus hover:text-gray-600'></span></button>" +
					"</div>" +
				"</div>" +
			"</div>";
			innerHTML += shoppingItems;
			id++;
			totalPrice += Number(price);
		}
		
		$(".principal").html(innerHTML);
	}
	$(".total-price").html(totalPrice + "€"); // Hay que mostrar el precio total constantemente, pero ahora mismo no sé cómo hacerlo
	checkGrid();
	
	return false;
}

// Función para mostrar los elementos de cada apartado de la "tienda"
function showFoodItems(a){
	if(window.innerWidth <= widthChange){
		small = true;
		$(".burger").hide();
	}
	let total = "<h2 class='text-4xl w-full mb-2 z-40'>" + $(this).text() + "</h2>";
	array = a;

	for(let i = 0; i < array.length; i++){
		let divItems = "<div class='shopping-list flex flex-col w-auto'>" +
			"<div class='rounded-lg flex bg-gray-200 my-2 shadow-sm'>" +
				"<div class='relative h-32 w-40'>" + 
					"<img src='resources/" + array[i].file + "' alt='" + array[i].alt + "' class='static w-full h-full rounded-l-lg object-cover'>" +
				"</div>" +
				"<div class='data flex-col w-full'>" + 
					"<h3 class='px-4 py-2 text-2xl'>" + array[i].title + "</h3>" +
					"<h4 class='price font-bold px-4'>Precio: " + array[i].price + "€</h4>" +
				"</div>" +
				"<button onclick='addToItems(array, " + i + ");' title='Añadir' class='hover:bg-purple-200 bg-purple-300 selector flex flex-col justify-center items-center rounded-r-lg w-16 cursor-pointer'>" +
					"<span class='fas fa-plus hover:text-gray-600'></span>" +
				"</button>" +
			"</div>" +
		"</div>";
		total += divItems;
	}
	$(".principal").html(total);

	checkGrid();

	return false;
}

// Función para añadir elementos a la lista de la compra
function addToItems(array, id){
	let exists = false;
	let element = 0;
	// Recorro todos los elementos de la lista de la compra y busco si el que acabo de añadir existe ya o no
	for(let i = 0; i < items.length; i++){
		if(items[i].file == array[id].file){
			exists = true;
			element = i;
			break;
		}
	}
	if(exists) // Si existe, aumentamos la cantidad
		items[element].quantity++;
	else // Si no existe, lo añadimos al array de items
		items.push(array[id]);

	return false;
}

// Función para recalcular el precio total constantemente
function recalculateTotal(){
	var totalPrice = 0;
	for(let i = 0; i < items.length; i++){
		let price = (items[i].price * items[i].quantity).toFixed(2);
		totalPrice += Number(price);
	}

	let finalPrice = totalPrice.toFixed(2);
	$(".total-price").html(finalPrice + "€"); // Hay que mostrar el precio total constantemente, pero ahora mismo no sé cómo hacerlo

}

function checkGrid(){
	if (Cookies.get("grid") == 1) {
		$('.shopping-list').removeClass('flex-col w-auto').addClass('flex-col lg:inline-flex p-0 lg:p-2 lg:w-1/2');
		$('.fa-th-large').removeClass('text-gray-900').addClass('text-purple-500');
		$('.fa-th-list').removeClass('text-purple-500').addClass('text-gray-900');
	}
	else{
		$('.fa-th-large').removeClass('text-purple-500').addClass('text-gray-900');
		$('.fa-th-list').removeClass('text-gray-900').addClass('text-purple-500');
		$('.shopping-list').removeClass('lg:inline-flex lg:w-1/2').addClass('flex-col p-0 w-auto');
	}
	return false;
}

// Función para cambiar el modo de visualización de grid a lista y viceversa
function switchGridList(){
	$('button').click(function(e) {
		if ($(this).hasClass('grid')) {
			console.log("Grid");
			Cookies.set('grid', 1);
			$('.fa-th-large').removeClass('text-gray-900').addClass('text-purple-500');
			$('.fa-th-list').removeClass('text-purple-500').addClass('text-gray-900');
			$('.shopping-list').removeClass('flex-col w-auto').addClass('flex-col lg:inline-flex p-0 lg:p-2 lg:w-1/2');
		}
		else if($(this).hasClass('list')) {
			console.log("List");
			Cookies.set('grid', 2);
			$('.fa-th-large').removeClass('text-purple-500').addClass('text-gray-900');
			$('.fa-th-list').removeClass('text-gray-900').addClass('text-purple-500');
			$('.shopping-list').removeClass('lg:inline-flex lg:w-1/2').addClass('flex-col p-0 w-auto');
		}
	});
}

function checkPrevPage(){	
	if(Cookies.get("prevPlace") == undefined || window.location.pathname == ("/interfaz/"+Cookies.get("prevPlace"))){
		$("#atras").attr("onclick", "location.href='index.html'");
	}
	else{
		$("#atras").attr("onclick", "location.href='"+ Cookies.get("prevPlace") +"'");
	}
}

/************/

$(document).ready(function(){
	$(".bar-code").click(function(){
		let innerHTML = "<div class='flex justify-between items-center pb-3'>" +
		"<p class='text-2xl font-bold'>Añadir producto</p>" +
		"<div class='modal-close cursor-pointer z-50'>" +
			"<span title='Cerrar' class='fas fa-times fill-current text-grey hover:text-purple-300'></span>" +
		"</div>" +
	"</div>" +

	"<p class='p-modal'>Coloque el código de barras del producto frente al lector del frigorífico o introduzca el código a mano.</p>" +
	"<div class='flex'>" +
		"<input type='number' placeholder='ej.: 1234 5678 9123' class='border-2 border-gray-300 rounded-lg p-2 w-full my-2'>" +
		"<span title='Añadir' onclick='addElement();' class='p-6 cursor-pointer fas fa-plus fill-current text-grey hover:text-purple-300'></span>" +
	"</div>" +

	"<div class='tags flex'>" +
		"<div onclick='deleteElement(this);' class='m-1 text-xs flex inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-purple-300 text-gray-700 rounded-full'>" +
			"<p>Huevos</p>" +
			"<span title='Eliminar' class='fas fa-times cursor-pointer px-1 py-2 fill-current text-grey'></span>" +
		"</div>" +

		"<div onclick='deleteElement(this);' class='m-1 text-xs flex inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-purple-300 text-gray-700 rounded-full'>" +
			"<p>Leche</p>" +
			"<span title='Eliminar' class='fas fa-times cursor-pointer px-1 py-2 fill-current text-grey'></span>" +
		"</div>" +

		"<div onclick='deleteElement(this);' class='new-tag'>" +

		"</div>" +
	"</div>" +

	"<div class='flex justify-end pt-2'>" +
		"<button title='Cancelar' class='modal-close px-4 bg-transparent p-3 rounded-lg text-gray-700 hover:bg-purple-300 hover:text-white mr-2'>Cancelar</button>" +
		"<button title='Hecho' class='modal-close px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Hecho</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
	});
});

$(document).ready(function(){
	$(".order").click(function(){
		let innerHTML = "<div class='flex justify-between items-center pb-3'>" +
		"<p class='text-2xl font-bold'>Resumen del pedido</p>" +
		"<div class='modal-close cursor-pointer z-50'>" +
			"<span title='Cerrar' class='fas fa-times fill-current text-grey hover:text-purple-300'></span>" +
		"</div>" +
	"</div>" +

	"<p class='p-modal'>Pulsa 'Continuar' para confirmar el envío a tu domicilio de la siguiente compra.</p>" +
	
	"<ul class='order-list mt-3'>";
	
	for(let i = 0; i < items.length; i++){
		innerHTML += "<li class='bg-purple-200 p-1 rounded-sm m-2 ml-0'><span title='Eliminar' onclick='removeFinalItem(" + i + ");' class='fas fa-times fill-current text-grey hover:text-purple-300 px-4 cursor-pointer'></span>" + items[i].title + " <b>x" + items[i].quantity + "</b></li>";
	}

	innerHTML += "</ul>" + 

	"<p class='order-price mt-3 font-bold bg-purple-300 mr-2 px-3 py-1 rounded-sm'>Total: " + $('.total-price').text() + "</p>" +

	"<div class='flex justify-end pt-2'>" +
		"<button title='Cancelar' class='modal-close px-4 bg-transparent p-3 rounded-lg text-gray-700 hover:bg-purple-300 hover:text-white mr-2'>Cancelar</button>" +
		"<button onclick='showFinalModal();' title='Continuar' class='px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Continuar</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
	});
});

function showFinalModal(){
	let innerHTML = "<div class='flex justify-between items-center pb-3'>" +
		"<p class='text-2xl font-bold'>¡Su pedido se ha realizado con éxito!</p>" +
		"<div class='modal-close cursor-pointer z-50 -mt-8'>" +
			"<span title='Cerrar' class='fas fa-times fill-current text-grey hover:text-purple-300'></span>" +
		"</div>" +
	"</div>" +

	"<p class='p-modal'>Pulsa 'Hecho' para finalizar.</p>" +

	"<div class='flex justify-end pt-2'>" +
		"<button onclick='items.splice(0, items.length); showShoppingList();' title='Hecho' class='modal-close px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Hecho</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
}

function removeFinalItem(id){
	removeItem(id);

	console.log($('.total-price').text());
	
	let innerHTML = "";
	for(let i = 0; i < items.length; i++){
		innerHTML += "<li class='bg-purple-200 p-1 rounded-sm m-2 ml-0'><span title='Eliminar' onclick='removeFinalItem(" + i + ");' class='fas fa-times fill-current text-grey hover:text-purple-300 px-4 cursor-pointer'></span>" + items[i].title + " x" + items[i].quantity + "</li>";
	}
	$('.order-list').html(innerHTML);
	$('.order-price').html("Total: " + $('.total-price').text());

	return false;
}

function checkShoppingList(){
	if(items.length > 0){
		$(".fa-circle").show();
	} else if(items.length <= 0){
		$(".fa-circle").hide();
	}
	return false;
}

function toggleModal () {
	const body = document.querySelector('body')
	const modal = document.querySelector('.modal')
	modal.classList.toggle('opacity-0')
	modal.classList.toggle('pointer-events-none')
	body.classList.toggle('modal-active')
}



/* EXPERIMENTOS INDEX */

function initialIndex(){
	$('.back').hide();
	$('.shopping').hide();
	let innerHTML = "<div class='flex flex-wrap md:flex-no-wrap justify-center'>" +
		"<button onclick='selectPage(0);' type='button' class='bg-purple-500 hover:bg-purple-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 transition ease-in-out duration-500'>" +
			"<span class='fas fa-power-off text-white'></span>" +
		"</button>" +

		"<button onclick='selectPage(1);' type='button' class='bg-purple-500 hover:bg-purple-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 transition ease-in-out duration-500'>" +
			"<span class='far fa-lightbulb text-white'></span>" +
		"</button>" +
	"</div>" +

	"<div class='flex flex-wrap md:flex-no-wrap justify-center'>" +
		"<button onclick='location.href=\"shopping.html\"; Cookies.set(\"prevPlace\", \"index.html\");' type='button' class='shop bg-purple-500 hover:bg-purple-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6'>" +
			"<span class='fas fa-shopping-basket text-gray-200'></span>" +
		"</button>" +

		"<button onclick='selectPage(2);' type='button' class='bg-purple-500 hover:bg-purple-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 transition ease-in-out duration-500'>" +
			"<span class='fas fa-charging-station text-white pl-3'></span>" +
		"</button>" +
	"</div>";

	$('.index-content').html(innerHTML);
	return false;
}

var page = [{"title":"On/Off", "bigbtn":"power-off", "function1":"alternarMotorRefrigerador()", "function2":"alternarMotorCongelador()", "function3":"alternarAmbosMotores()"}, 
{"title":"Luces", "bigbtn":"lightbulb", "function1":"alternarLuzRefrigerador()", "function2":"alternarLuzCongelador()", "function3":"alternarAmbasLuces()"},
{"title":"Consumo energético", "bigbtn":"charging-station", "function1":"ecoMode();", "function2":"ultraCoolHyperExtraFreezingMode()", "function3":""}];

function selectPage(id){
	$('.back').show();
	$('.shopping').show();

	let innerHTML = "<h1 id='titlePage' class='text-4xl'>" + page[id].title + "</h1>" +
	"<div class='flex flex-wrap justify-center lg:flex-no-wrap lg:items-center'>" +
		"<button type='button' class='hidden lg:block bg-purple-500 cursor-default text-6xl big-btn rounded-full ml-10'>" +
			"<span class='xxl-font fas fa-" + page[id].bigbtn + " text-white'></span>" +
		"</button>" +
	"<div class='flex flex-wrap md:flex-no-wrap md:flex-col justify-center'>";

	if(id != 2){
		innerHTML += "<button id='button1' type='button' onclick='return " + page[id].function1 + ";' class='flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6'>" +
				"<p class='text-gray-200 text-xl'>Refrigerador <span id='span1'>Off</span></p>" +
			"</button>" +
			"<button id='button2' type='button' onclick='return " + page[id].function2 + ";' class='bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 lg:ml-24'>" +
				"<p class='text-gray-200 text-xl'>Congelador <span id='span2'>On</span></p>" +
			"</button>" +
			"<button id='button3' type='button' onclick='return " + page[id].function3 + ";' class='bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6'>" +
				"<p class='text-gray-200 text-xl'>Ambos <span id='span3'>On</span></p>" +
			"</button>";
	} else{
		innerHTML += "<button id='button1' type='button' onclick='return " + page[id].function1 + ";' class='flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6'>" +
				"<p class='fas fa-leaf text-gray-200'></p>" +
			"</button>" +
			"<button id='button2' type='button' onclick='return " + page[id].function2 + ";' class='bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6' >" +
				"<p class='fas fa-snowflake text-gray-200'></p>" +
			"</button>";
	}
	innerHTML += "</div></div>";

	$('.index-content').html(innerHTML);
	if(page[id].title == "Luces") checkLightButtons("orange");
	if(page[id].title == "Consumo energético") checkFrideMode();
	if(page[id].title == "On/Off") checkMotorButtons("blue");
 	return false;
}