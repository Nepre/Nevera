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

function apagarLuzRefrigerador() {
	frigo.refrigeradorLuz = false;
	console.log(frigo.refrigeradorLuz);
}

function alternarLuzRefrigerador() {
	frigo.refrigeradorLuz = !frigo.refrigeradorLuz;
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