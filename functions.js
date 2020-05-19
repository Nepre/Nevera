var frigo = new Electro();

function init(){
	frigo.on("connect", function () {
		console.log("Ya estoy conectado con el frigorifico!!!")
		console.log("Con este hay " + frigo.clientes + " clientes conectados");


		// Activar la luz del refrigerador cuando se abre la puerta
		frigo.on("refrigeradorPuerta", function (abierta) {
			console.log("Puerta:", abierta);
			frigo.refrigeradorLuz = abierta;
		});
	});
}

function encenderLuzRefrigerador() {
	frigo.refrigeradorLuz = true;
	console.log(frigo.refrigeradorLuz);
	
}

function cambiarHora() {
	frigo.refrigeradorLuz = true;
	console.log(frigo.refrigeradorLuz);
	
}

function apagarLuzRefrigerador() {
	frigo.refrigeradorLuz = false;
	console.log(frigo.refrigeradorLuz);
}

function alternarLuzRefrigerador() {
	frigo.refrigeradorLuz = !frigo.refrigeradorLuz;
}

function alternarLuzCongelador() {
	frigo.congeladorLuz = !frigo.congeladorLuz;
}

function alternarAmbasLuces() {
	frigo.refrigeradorLuz = !frigo.refrigeradorLuz;
	frigo.congeladorLuz = !frigo.congeladorLuz;
}

function deleteElement(id){
	$(id).hide();
}

function addElement(){
	$(".new-tag").show();
	$(".new-tag").html("<div class='new-tag m-1 text-xs flex inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-purple-300 text-gray-700 rounded-full'><p>Pan</p><span title='Eliminar' class='fas fa-times cursor-pointer px-1 py-2 fill-current text-grey'></span></div>");
}

setInterval(function(){
	var date = new Date();
	setTime(date);
}, 1);

function setTime(dateobj){
	var hours = ("0" + dateobj.getHours()).slice(-2);
	var minutes = ("0" + dateobj.getMinutes()).slice(-2);
	var converted_date = "";

	converted_date = hours + ":" + minutes;
   	document.getElementById("hour").innerHTML = converted_date;
}

/** JQUERY **/

// Menu de hamburguesa
$(document).ready(function(){
	$(".fa-bars").click(function(){
		$(".burger").toggle();
	});
});

/* SETTINGS & SHOPPING LIST */

// Para cambiar el titulo de los settings dependiendo de donde pinches
$(document).ready(function(){
	$("li").click(function(){
		$("h2").html($(this).text());
	});
});

/************/

function showShoppingList(){
	let title = "<h2 class='text-4xl w-full mb-2 z-40'>Lista de la compra</h2>";
	let shoppingItems = "<div class='shopping-list flex flex-col w-auto'>" +
		"<div class='rounded-lg flex bg-gray-200 my-2'>" +
			"<img src='resources/egg.png' alt='Huevos' class='h-32 w-32 rounded-l-lg object-cover'>" +
			"<div class='data flex-col w-full'>" + 
				"<h3 class='px-4 py-2 text-2xl'>Docena de huevos</h3>" +
				"<h4 class='px-4'>Precio: 0.95€</h4>" +
			"</div>" +
			"<div class='bg-purple-300 selector flex flex-col justify-center rounded-r-lg w-12'>" +
				"<button class='my-auto'><span class='fas fa-plus'></span></button>" +
				"<input type='number' name='Cantidad' value='1' class='bg-purple-100 h-10 text-center pl-3 font-bold'>" +
				"<button class='my-auto'><span class='fas fa-minus'></span></button>" +
			"</div>" +
		"</div>" +
	"</div>";

	for(let i = 0; i < 6; i++)
		title += shoppingItems;
	
	$(".principal").html(title);
	
	return false;
}

function showFoodItems(id){
	$(".principal").html("<h2 class='text-4xl w-full mb-2 z-40'>" + $(id).text() + "</h2>");
	return false;
}