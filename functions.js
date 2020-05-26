var frigo = new Electro();
var small = false;
const widthChange = 767; 

window.setInterval(function(){
	recalculateTotal();

	if(window.innerWidth > widthChange){
		small = false;
		$(".burger").show();
	}
	else if(window.innerWidth <= widthChange && !small){
		small = true;
		$(".burger").hide();
	} 
}, 50);

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

/* ITEMS*/
// Items de la lista de compra
var items = [{"file":"bread.png", "alt":"Pan", "title":"Hogaza de pan de leña", "price":"1.10", "quantity":1}, {"file":"egg.png", "alt":"Huevos", "title":"Docena de huevos", "price":"0.95", "quantity":1}, 
	{"file":"meat.png", "alt":"Carne", "title":"Carne de ternera", "price":"9.75", "quantity":1}, {"file":"fish.png", "alt":"Dorada", "title":"Dorada", "price":"6.50", "quantity":1}, 
	{"file":"carrots.png", "alt":"Zanahorias", "title":"Zanahorias", "price":"0.64", "quantity":1}, {"file":"apples.png", "alt":"Manzanas", "title":"Manzanas rojas", "price":"1.23", "quantity":1}];
// Items de la lista de carne
var meat = [{"file":"meat.png", "alt":"Carne", "title":"Carne de ternera", "price":"9.75", "quantity":1}, {"file":"burger.png", "alt":"Hamburguesa", "title":"Hamburguesa de ternera y cerdo", "price":"2.05", "quantity":1},
{"file":"chicken-breast.png", "alt":"Pollo", "title":"Pechuga de pollo", "price":"5.27", "quantity":1}];
// Items de la lista de fruta
var fruit = [{"file":"strawberries.png", "alt":"Fresas", "title":"Fresas", "price":"3.75", "quantity":1}, {"file":"apples.png", "alt":"Manzanas", "title":"Manzanas rojas", "price":"1.23", "quantity":1},
{"file":"peaches.png", "alt":"Melocotones", "title":"Melocotones", "price":"1.14", "quantity":1}, {"file":"pear.png", "alt":"Peras", "title":"Peras", "price":"2.35", "quantity":1},
{"file":"bananas.png", "alt":"Plátanos", "title":"Plátanos", "price":"3.15", "quantity":1}, {"file":"watermelon.png", "alt":"Sandía", "title":"Sandía entera", "price":"7.16", "quantity":1}];
// Items de la lista de ovolácteos
var eggmilk = [{"file":"egg.png", "alt":"Huevos", "title":"Docena de huevos", "price":"0.95", "quantity":1}, {"file":"milk.png", "alt":"Leche", "title":"Leche de vaca entera", "price":"0.79", "quantity":1},
{"file":"cheese.png", "alt":"Mozzarella", "title":"Queso mozarella", "price":"0.80", "quantity":1}];
// Items de la lista de pan
var bread = [{"file":"bread.png", "alt":"Pan", "title":"Hogaza de pan de leña", "price":"1.10", "quantity":1}, {"file":"sandwichbread.png", "alt":"Pan de molde", "title":"Pan de molde", "price":"1.99", "quantity":1}];
// Items de la lista de pescado
var fish = [{"file":"fish.png", "alt":"Dorada", "title":"Dorada", "price":"6.50", "quantity":1}, {"file":"seabass.png", "alt":"Lubina", "title":"Lubina salvaje", "price":"40.60", "quantity":1}, 
{"file":"hake.png", "alt":"Merluza", "title":"Merluza", "price":"4.25", "quantity":1}, {"file":"salmon.png", "alt":"Salmón", "title":"Salmón noruego", "price":"13.90", "quantity":1}, 
{"file":"sardine.png", "alt":"Sardinas", "title":"Sardinas", "price":"4.96", "quantity":1}];
// Items de la lista de verduras
var veggies = [{"file":"eggplant.png", "alt":"Berenjena", "title":"Berenjena", "price":"0.54", "quantity":1}, {"file":"broccoli.png", "alt":"Brócoli", "title":"Brócoli", "price":"1.45", "quantity":1},
{"file":"zucchini.png", "alt":"Calabacín", "title":"Calabacín", "price":"0.49", "quantity":1}, {"file":"potatoes.png", "alt":"Patatas", "title":"Patata nueva", "price":"1.34", "quantity":1}, 
{"file":"peppers.png", "alt":"Pimientos", "title":"Trío de pimientos tricolor", "price":"1.19", "quantity":1}, {"file":"carrots.png", "alt":"Zanahorias", "title":"Zanahorias", "price":"0.64", "quantity":1}];
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

// Función para mostrar los elementos de la lista de la compra
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
					"<span onclick='$(this).parent().parent().parent().remove();' title='Eliminar' class='fas fa-times absolute bg-purple-300 hover:bg-purple-200 p-2 hover:text-gray-600 rounded-tl-lg rounded-br-lg cursor-pointer'></span>" +
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
		title += shoppingItems;
		id++;
		totalPrice += Number(price);
	}
	
	$(".principal").html(title);
	$(".total-price").html(totalPrice + "€"); // Hay que mostrar el precio total constantemente, pero ahora mismo no sé cómo hacerlo
	checkGrid();
	
	return false;
}

// Función para mostrar los elementos de cada apartado de la "tienda"
function showFoodItems(a){
	if(screen.width < 768)
		$('.burger').hide();

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
	}
	else{
		$('.shopping-list').removeClass('lg:inline-flex lg:w-1/2').addClass('flex-col p-0 w-auto');
	}
}

// Función para cambiar el modo de visualización de grid a lista y viceversa
function switchGridList(){
	$('button').click(function(e) {
		if ($(this).hasClass('grid')) {
			console.log("Grid");
			Cookies.set('grid', 1);
			$('.shopping-list').removeClass('flex-col w-auto').addClass('flex-col lg:inline-flex p-0 lg:p-2 lg:w-1/2');
		}
		else if($(this).hasClass('list')) {
			console.log("List");
			Cookies.set('grid', 2);
			$('.shopping-list').removeClass('lg:inline-flex lg:w-1/2').addClass('flex-col p-0 w-auto');
		}
	});
}

function checkPrevPage(){
	$("#atras").attr("onclick", "location.href='"+ Cookies.get("prevPlace") +"'");
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
		"<button title='Cancelar' class='px-4 bg-transparent p-3 rounded-lg text-gray-700 hover:bg-purple-300 hover:text-white mr-2'>Cancelar</button>" +
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

	"<p class='p-modal'>Pulsa 'Hecho' para recibir la siguiente compra en tu domicilio.</p>" +
	
	"<ul class=''>";
	
	for(let i = 0; i < items.length; i++){
		innerHTML += "<li><span title='Cerrar' class='fas fa-times fill-current text-grey hover:text-purple-300 px-4'></span>" + items[i].title + "</li>";
	}

	innerHTML += "</ul>" + 

	"<div class='flex justify-end pt-2'>" +
		"<button title='Cancelar' class='px-4 bg-transparent p-3 rounded-lg text-gray-700 hover:bg-purple-300 hover:text-white mr-2'>Cancelar</button>" +
		"<button title='Hecho' class='modal-close px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Hecho</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
	});
});
