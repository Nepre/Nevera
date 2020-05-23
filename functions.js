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

// Para cambiar el titulo de los settings dependiendo de donde pinches
$(document).ready(function(){
	$("li").click(function(){
		$("h2").html($(this).text());
	});
});

function switchGridList(){
	$('button').click(function(e) {
		if ($(this).hasClass('grid')) {
			console.log("Grid");
			$('.shopping-list').removeClass('flex-col w-auto').addClass('flex-col lg:inline-flex p-0 lg:p-2 lg:w-1/2');
		}
		else if($(this).hasClass('list')) {
			console.log("List");
			$('.shopping-list').removeClass('lg:inline-flex lg:w-1/2').addClass('flex-col p-0 w-auto');
		}
	});
}

// Items de la lista de compra
var items = [{"file":"bread.png", "alt":"Pan", "title":"Hogaza de pan de leña", "price":"1.10", "quantity":1}, {"file":"egg.png", "alt":"Huevos", "title":"Docena de huevos", "price":"0.95", "quantity":1}, 
	{"file":"meat.png", "alt":"Carne", "title":"Carne de ternera", "price":"9.75", "quantity":1}, {"file":"fish.png", "alt":"Pescado", "title":"Dorada", "price":"6.50", "quantity":1}, 
	{"file":"carrots.png", "alt":"Zanahorias", "title":"Zanahorias", "price":"0.64", "quantity":1}, {"file":"apples.png", "alt":"Manzanas", "title":"Manzanas rojas", "price":"1.23", "quantity":1}];

// Función para aumentar la cantidad de un producto determinado
function increment(id, item) {
	// Cambiamos el value del input
	let value = $(id).next('input').val();
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

function showShoppingList(){
	if(screen.width < 768)
		$('.burger').hide();
	let title = "<h2 class='text-4xl w-full mb-2 z-40'>Lista de la compra</h2>";
	let totalPrice = 0;
	let id = 0;
	for(let i = 0; i < items.length; i++){
		let price = (items[i].price * items[i].quantity).toFixed(2);
		let shoppingItems = "<div id='" + id + "' class='shopping-list flex flex-col w-auto'>" +
			"<div class='rounded-lg flex bg-gray-200 my-2 shadow-sm'>" +
				"<div class='relative h-32 w-40'>" + 
					"<span onclick='$(this).parent().parent().parent().remove();' title='Eliminar' class='fas fa-times absolute bg-purple-300 p-2 hover:text-gray-600 rounded-tl-lg rounded-br-lg cursor-pointer'></span>" +
					"<img src='resources/" + items[i].file + "' alt='" + items[i].alt + "' class='static w-full h-full rounded-l-lg object-cover'>" +
				"</div>" +
				"<div class='data flex-col w-full'>" + 
					"<h3 class='px-4 py-2 text-2xl'>" + items[i].title + "</h3>" +
					"<h4 class='price font-bold px-4'>Precio: " + price + "€</h4>" +
				"</div>" +
				"<div class='bg-purple-300 selector flex flex-col justify-center rounded-r-lg w-12'>" +
					"<button onclick='increment(this, " + i +")' title='Aumentar cantidad' class='my-auto'><span class='fas fa-plus hover:text-gray-600'></span></button>" +
					"<input type='number' name='Cantidad' value='" + items[i].quantity + "' class='bg-purple-100 h-10 text-center font-bold'>" +
					"<button onclick='decrement(this, " + i +")' title='Disminuir cantidad' class='my-auto'><span class='fas fa-minus hover:text-gray-600'></span></button>" +
				"</div>" +
			"</div>" +
		"</div>";
		title += shoppingItems;
		id++;
		totalPrice += Number(price);
	}
	
	$(".principal").html(title);
	$(".total-price").html(totalPrice + "€"); // Hay que mostrar el precio total constantemente, pero ahora mismo no sé cómo hacerlo
	
	return false;
}

var meat = [{"file":"meat.png", "alt":"Carne", "title":"Carne de ternera", "price":"9.75", "quantity":1}, {"file":"burger.png", "alt":"Hamburguesa", "title":"Hamburguesa de ternera y cerdo", "price":"2.05", "quantity":1},
{"file":"chicken-breast.png", "alt":"Pollo", "title":"Pechuga de pollo", "price":"5.27", "quantity":1}]

function showFoodItems(id){
	if(screen.width < 768)
		$('.burger').hide();
	let total = "<h2 class='text-4xl w-full mb-2 z-40'>" + $(id).text() + "</h2>";
	switch($(id).text()){
		case "Carne":
			let id = 0;
			for(let i = 0; i < meat.length; i++){
				let meatItems = "<div id='" + id + "' class='shopping-list flex flex-col w-auto'>" +
					"<div class='rounded-lg flex bg-gray-200 my-2 shadow-sm'>" +
						"<div class='relative h-32 w-40'>" + 
							"<img src='resources/" + meat[i].file + "' alt='" + meat[i].alt + "' class='static w-full h-full rounded-l-lg object-cover'>" +
						"</div>" +
						"<div class='data flex-col w-full'>" + 
							"<h3 class='px-4 py-2 text-2xl'>" + meat[i].title + "</h3>" +
							"<h4 class='price font-bold px-4'>Precio: " + meat[i].price + "€</h4>" +
						"</div>" +
						"<div class='bg-purple-300 selector flex flex-col justify-center rounded-r-lg w-16 cursor-pointer'>" +
							"<button title='Añadir' class='my-auto'><span class='fas fa-plus hover:text-gray-600'></span></button>" +
						"</div>" +
					"</div>" +
				"</div>";
				total += meatItems;
				id++;
			}
			$(".principal").html(total);
		break;

		default:
		break;
	}
	return false;
}

/************/