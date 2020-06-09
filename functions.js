var frigo = new Electro();
var small = false;
var automatic = false;
var alerthigh = false;
var alertopen = false;
const widthChange = 767; 
const second = 1000;
const minute = 60;

function isString(x) {
	return Object.prototype.toString.call(x) === "[object String]";
}

// Update
window.setInterval(function(){
	recalculateTotal();
	checkShoppingList();
	let code = $('#code').val(frigo.frigorificoCodigo);


	if(window.innerWidth > widthChange){
		small = false;
		$(".burger").show();
	}
	else if(window.innerWidth <= widthChange && !small){
		small = true;
		$(".burger").hide();
	} 

	if(document != null) var closemodal = document.querySelectorAll('.modal-close');
	for (var i = 0; i < closemodal.length; i++) {
		closemodal[i].addEventListener('click', toggleModal);
	}
	
	if($(".shopping").is(":visible")){
		$(".left-arrow").removeClass("w-10/12").addClass("w-8/12");
	} else{
		$(".left-arrow").removeClass("w-8/12").addClass("w-10/12");
	}

	$("#temp-frigo").html(Math.round(frigo.refrigeradorTemperatura));
	$("#temp-conge").html(Math.round(frigo.congeladorTemperatura));

	var date = new Date();
	var min = date.getMinutes();

	if(frigo.frigorificoHora != undefined && typeof frigo.frigorificoHora.getMinutes === 'function') min = frigo.frigorificoHora.getMinutes();

    if(min == 0) min = "00";
	else if(min < 10) min = "0"+min;

	var hours =  date.getHours();
	
	if(frigo.frigorificoHora != undefined && typeof frigo.frigorificoHora.getHours === 'function') hours = frigo.frigorificoHora.getHours() + ":" + min;
	
	$("#hour").html(hours);

	temperatureManager();
	checkProximity();
	checkScreen();
	theme();

	if(!alerthigh && (frigo.refrigeradorTemperatura > 15 || frigo.congeladorTemperatura > 2)){
		if(Cookies.get('alertTemperature') == undefined || Cookies.get('alertTemperature') == 1) $(".alert-high").show();
		//frigo.frigorificoAlarma = true;
	} else{
		//frigo.frigorificoAlarma = false;
		$(".alert-high").hide();
	}
	
}, 10);

window.setInterval(function(){
    var secondsOpen = 0;
    if(frigo.refrigeradorPuerta == true || frigo.congeladorPuerta == true){
        if(Cookies.get('secondsOpen') != undefined){
            secondsOpen = parseInt(Cookies.get('secondsOpen'));
            secondsOpen++;
            Cookies.set('secondsOpen', secondsOpen);
        }else{
            Cookies.set('secondsOpen', 0);
        }
    }
    else{
        Cookies.set('secondsOpen', 0);
    }
    if(secondsOpen > 60) {
		$(".alert-open").show();
		frigo.frigorificoAlarma = true;
	} else {
		$(".alert-open").hide();
		frigo.frigorificoAlarma = false;
	}

	if(Cookies.get('counterTurnOffScreen') != undefined){
		var timer = Cookies.get('counterTurnOffScreen');
		timer++;
		Cookies.set('counterTurnOffScreen', timer);
	}
	else{
		Cookies.set('counterTurnOffScreen', 0);
	}
	
}, second);

function getCookiesChart(nameCookie){

	if( Cookies.get(nameCookie) == undefined) return [0,0,0,0,0,0];
	var data = Cookies.get(nameCookie).split(",");
	for (let i = 0; i < data.length; i++) {
		data[i] = parseFloat(data[i]);
	}
	return data;
}

function checkScreen(){
	if(frigo == null || frigo == undefined) return;
	
	if(Cookies.get('powerMode') == undefined) Cookies.set('powerMode', 2);

	if(Cookies.get('powerMode') == 0) return;
	
	if(Cookies.get('powerMode') == 3){
		if(Cookies.get('inputPantallaBoost') != undefined && Cookies.get('inputPantallaBoost') == 1 && frigo.frigorificoPresencia){
			if(Cookies.get('screenAttenuationBoost') != undefined && Cookies.get('screenAttenuationBoost') == 1){
				frigo.frigorificoPantalla = 1;
			}
			else{
				frigo.frigorificoPantalla = 2;
			}
			Cookies.set('counterTurnOffScreen', 0);
		}
		else{
			if(Cookies.get('counterTurnOffScreen') != undefined){
				if(parseInt(Cookies.get('timeTo')) * minute < parseInt(Cookies.get('counterTurnOffScreen'))){
					frigo.frigorificoPantalla = 0;
				}
			}
		}
	}
	else{
		if(Cookies.get('inputPantalla') != undefined && Cookies.get('inputPantalla') == 1 && frigo.frigorificoPresencia){
			if(Cookies.get('screenAttenuation') != undefined && Cookies.get('screenAttenuation') == 1){
				frigo.frigorificoPantalla = 1;
			}
			else{
				frigo.frigorificoPantalla = 2;
			}
			Cookies.set('counterTurnOffScreen', 0);
		}
		else{
			if(Cookies.get('counterTurnOffScreen') != undefined){
				if(parseInt(Cookies.get('timeTo')) * minute < parseInt(Cookies.get('counterTurnOffScreen'))){
					frigo.frigorificoPantalla = 0;
				}
			}
		}
	}
}

var dataChartFrigo = [0,0,0,0,0,0];
var dataChartCongelador = [0,0,0,0,0,0];
var dataConsumo = [0,0,0,0,0,0];

window.setInterval(function(){
	addToChart();
	
	if($('#settingsName').text() == 'Estadísticas') setChart();
	if(Cookies.get('consumo') == undefined){
		Cookies.set('consumo', frigo.frigorificoConsumo);
	} else{
		if((frigo.frigorificoConsumo - parseInt(Cookies.get('consumo'))) > 20000){
			$(".alert-consumo").show();			
		} else $(".alert-consumo").hide();
		Cookies.set('consumo', frigo.frigorificoConsumo);
	}
}, 30*second);

var cont = 1;
var media = 0;

function addToChart(){

	dataChartFrigo = getCookiesChart("dataChartFrigo");
	dataChartFrigo.shift();
	dataChartFrigo.push(frigo.refrigeradorTemperatura);
	Cookies.set("dataChartFrigo", dataChartFrigo);

	dataChartCongelador = getCookiesChart("dataChartCongelador");
	dataChartCongelador.shift();
	dataChartCongelador.push(frigo.congeladorTemperatura);	
	Cookies.set("dataChartCongelador", dataChartCongelador);

	dataConsumo = getCookiesChart("dataConsumo");
	dataConsumo.shift();
	dataConsumo.push(parseFloat(frigo.frigorificoConsumo) / 1000);	

	Cookies.set("dataConsumo", dataConsumo);
}

function changeChart(){
	var current = 0;
	if(Cookies.get("chartChoice") != undefined) current = parseInt(Cookies.get("chartChoice"));
	console.log(current);
	
	if(current == 0){
		Cookies.set('chartChoice',1);
		document.getElementById('buttonChangeChart').innerHTML = "Temperatura";
	} 
	else{
		Cookies.set('chartChoice', 0);
		document.getElementById('buttonChangeChart').innerHTML = "Consumo Total";
	} 
	
	setChart();
}

function setChart(){
	dataChartFrigo = getCookiesChart("dataChartFrigo");
	dataChartCongelador = getCookiesChart("dataChartCongelador");
	dataConsumo = getCookiesChart("dataConsumo");
	if(Cookies.get("chartChoice") == undefined || Cookies.get("chartChoice") == 0) document.getElementById('buttonChangeChart').innerHTML = "Temperatura";
	else document.getElementById('buttonChangeChart').innerHTML = "Consumo Total";
	
	var labels1 = ['Hace 2min 30s', 'Hace 2min', 'Hace 1min 30s', 'Hace 1min', 'Hace 30s', 'Ahora'];
	
	setTimeout(() => {
		
		if(Cookies.get("chartChoice") == undefined || Cookies.get("chartChoice") == 0){
			if(window.location.pathname != ("/interfaz/settings.html")) return;
			var data = {
				labels: labels1,
				series: [
					dataChartFrigo,
					dataChartCongelador
				]
				};
		
			new Chartist.Line('.ct-chart', data, optionsChart);
		}
		else{
			if(window.location.pathname != ("/interfaz/settings.html")) return;
			var data = {
				labels: labels1,
				series: [
					dataConsumo
				]
				};
		
			new Chartist.Line('.ct-chart', data, optionsChart2);
		}
	}, 100);


}

function changeScreenTime(){
	var time = $('#timeTo').html();
	if(time == "Nunca") Cookies.set('timeTo', 0);
	else Cookies.set('timeTo', time.split(" ")[0]);
}

function changeScreenAttenuation(set){
	Cookies.set("screenAttenuation", (set)? 1:0);
}

function changeScreenAttenuationBoost(set){
	Cookies.set("screenAttenuationBoost", (set)? 1:0);
}

function changeScreenTimeButtons(){
	var time;
	if(Cookies.get('timeTo') == undefined) time = 0;
	else time = Cookies.get('timeTo');
	time += "min";
	$('#'+time).click();
	
	if(Cookies.get("screenAttenuation") != undefined && Cookies.get("screenAttenuation") == 0){
		document.getElementById('checked4').checked = false;
		changeInput('inputPantallaAhorro', false);
	}
}


function init(){
	$('.alert-high').hide();
	$(".alert-open").hide();
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

function checkDoaFrigo(){
	if(frigo.refrigeradorPuerta && (Cookies.get('lightFridgeOpen') == undefined || Cookies.get('lightFridgeOpen') == 1)){
		frigo.refrigeradorLuz = true;
	}
	else
		frigo.refrigeradorLuz = false;
}

function checkDoaCon(){
	if(frigo.congeladorPuerta  && (Cookies.get('lightConOpen') == undefined || Cookies.get('lightConOpen') == 1)){
		frigo.congeladorLuz = true;
	}
	else
		frigo.congeladorLuz = false;
}

function changeLightApertureFr(set){
	Cookies.set("lightFridgeOpen", (set)? 1:0);
}

function changeLightApertureCon(set){
	Cookies.set("lightConOpen", (set)? 1:0);
}

function changeLightProxFr(set){
	Cookies.set("lightFridgeProx", (set)? 1:0);
}

function changeLightProxCon(set){
	Cookies.set("lightConProx", (set)? 1:0);
}

function setButtonsLightSettings(){
	var lightFridgeOpen = 0,
		lightConOpen = 0.
		lightFridgeProx = 0,
		lightConProx = 0;
	
	lightFridgeOpen = (Cookies.get('lightFridgeOpen')  != undefined)? parseInt(Cookies.get('lightFridgeOpen')) : 1;
	lightConOpen = (Cookies.get('lightConOpen')  != undefined)? parseInt(Cookies.get('lightConOpen')) : 1;
	lightFridgeProx = (Cookies.get('lightFridgeProx')  != undefined)? parseInt(Cookies.get('lightFridgeProx')) : 1;
	lightConProx = (Cookies.get('lightConProx')  != undefined)? parseInt(Cookies.get('lightConProx')) : 1;

	if(lightFridgeOpen == 0){
		document.getElementById('checked').checked = false;
		changeInput('inputDetect', false);
	}

	if(lightConOpen == 0){
		document.getElementById('checked3').checked = false;
		changeInput('inputDetect2', false);
	}

	if(lightFridgeProx == 0){
		document.getElementById('checked2').checked = false;
		changeInput('inputLight', false);
	}

	if(lightConProx == 0){
		document.getElementById('checked4').checked = false;
		changeInput('inputLight2', false);
	}
}

function checkProximity(){
	// Luces

	if(Cookies.get('powerMode') == undefined) Cookies.set('powerMode', 2);

	if(Cookies.get('powerMode') == 3){
		if(frigo.frigorificoPresencia && Cookies.get('automaticLightBoost') != undefined && Cookies.get('automaticLightBoost') == 1){
			if(Cookies.get('lightFridgeProx') == undefined || Cookies.get('lightFridgeProx') == 1) frigo.refrigeradorLuz = true;
			else checkDoaFrigo();
			
			if(Cookies.get('lightConProx') == undefined || Cookies.get('lightConProx') == 1) frigo.congeladorLuz = true;
			else checkDoaCon();
		}
		else{
			checkDoaFrigo();
			checkDoaCon();
		}
	}
	else{
		if(frigo.frigorificoPresencia && Cookies.get('inputLuz') != undefined && Cookies.get('inputLuz') == 1){
			if(Cookies.get('lightFridgeProx') == undefined || Cookies.get('lightFridgeProx') == 1) frigo.refrigeradorLuz = true;
			else checkDoaFrigo();			
			if(Cookies.get('lightConProx') == undefined || Cookies.get('lightConProx') == 1) frigo.congeladorLuz = true;
			else checkDoaCon();
		}
		else{
			checkDoaFrigo();
			checkDoaCon();
		}
	}
}
	
				
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
		Cookies.set('fridgelight', 1);
		Cookies.set('freezerlight', 1);
		turnOnOffButton(true, 1, "orange");
		turnOnOffButton(true, 2, "orange");
		turnOnOffButton(true, 3, "orange");
	}
	else if(frigo.congeladorLuz == true && frigo.refrigeradorLuz == false){
		frigo.refrigeradorLuz = false;
		frigo.congeladorLuz = false;
		Cookies.set('fridgelight', 0);
		Cookies.set('freezerlight', 0);
		turnOnOffButton(false, 1, "orange");
		turnOnOffButton(false, 2, "orange");
		turnOnOffButton(false, 3, "orange");
	} else if(frigo.congeladorLuz == true && frigo.refrigeradorLuz == true){
		frigo.refrigeradorLuz = false;
		frigo.congeladorLuz = false;
		Cookies.set('fridgelight', 0);
		Cookies.set('freezerlight', 0);
		turnOnOffButton(false, 1, "orange");
		turnOnOffButton(false, 2, "orange");
		turnOnOffButton(false, 3, "orange");
	} else if(frigo.congeladorLuz == false && frigo.refrigeradorLuz == false){
		frigo.refrigeradorLuz = true;
		frigo.congeladorLuz = true;
		Cookies.set('fridgelight', 1);
		Cookies.set('freezerlight', 1);
		turnOnOffButton(true, 1, "orange");
		turnOnOffButton(true, 2, "orange");
		turnOnOffButton(true, 3, "orange");
	}
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
	
	if(Cookies.get('freezermotor') == 0){
		turnOnOffButton(true, 2, "blue");
		if(Cookies.get('fridgemotor') == 1 || Cookies.get('fridgemotor') == 2){
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

function guardarCambiosTemp(){
    Cookies.set('normal-nevera', parseInt($("#temperatureOutputId").text()));
    Cookies.set('normal-conge', parseInt($("#temperatureConOutputId").text()));
}

function guardarCambiosTempECOSPEED(){
	Cookies.set('eco-nevera', parseInt($("#temperatureOutputId").text()));
	Cookies.set('eco-conge', parseInt($("#temperatureConOutputId").text()));
	
	Cookies.set('speed-nevera', parseInt($("#temperatureOutputIdS").text()));
	Cookies.set('speed-conge', parseInt($("#temperatureConOutputIdS").text()));
	
}

var modesAndTarget = [
	{"mode":"eco", "targetFridge":4, "targetFreezer":-22}, 
	{"mode":"normal", "targetFridge":6, "targetFreezer":-20}, 
	{"mode":"boost", "targetFridge":2, "targetFreezer":-24}, 
	{"mode":"off", "targetFridge":0, "targetFreezer":0}, 
];

function temperatureManager(){

	var mode = Cookies.get('powerMode');
	var freezer = (Cookies.get('freezermotor') == 0)? false:true;
	var fridge = (Cookies.get('fridgemotor') == 0)? false:true;
	
	if(Cookies.get('eco-nevera') != undefined) modesAndTarget[0].targetFridge = Cookies.get('eco-nevera');
	if(Cookies.get('eco-conge') != undefined) modesAndTarget[0].targetFreezer = Cookies.get('eco-conge');
	
	if(Cookies.get('normal-nevera') != undefined) modesAndTarget[1].targetFridge = Cookies.get('normal-nevera');
	if(Cookies.get('normal-conge') != undefined) modesAndTarget[1].targetFreezer = Cookies.get('normal-conge');

	if(Cookies.get('speed-nevera') != undefined) modesAndTarget[2].targetFridge = Cookies.get('speed-nevera');
	if(Cookies.get('speed-conge') != undefined) modesAndTarget[2].targetFreezer = Cookies.get('speed-conge');
	
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

var eco = false;

function normalMode(){
	eco = false;
	Cookies.set('powerMode', 2);
	document.getElementById("button1").className = 	"flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
	document.getElementById("button2").className = 	"bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6";
}

function ecoMode(direct){
	eco = true;
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

var tagsHTML = "";
var tagitems = [];

function addElement(){
	let rand = Math.floor((Math.random() * 6));
	
	tagsHTML += "<div onclick='deleteElement(this);' class='taggie m-1 text-xs flex inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-purple-300 text-gray-700 rounded-full'>" +
					"<p>" + items[rand].title + "</p>" +
					"<span title='Eliminar' class='fas fa-times cursor-pointer px-1 py-2 fill-current text-grey'></span>" +
				"</div>";

	tagitems.push(items[rand]);

	$(".tags").html(tagsHTML);
}

function addToShoppingList(){		
	for(let i = 0; i < tagitems.length; i++){
		addToItems(tagitems, i);
		showShoppingList();
	}
}

/*** JQUERY ***/

// Menu de hamburguesa
$(document).ready(function(){
	$(".fa-bars").click(function(){
		$(".burger").toggle();
	});
});

$(".burger").hide();

function smallBg(){
	if(window.innerWidth <= widthChange){
		
		$("li").click(function(){
			$(".burger").hide();
			small = true;
		});
	}
}

/* SETTINGS & SHOPPING LIST */
$(document).ready(function(){
	var current_title = $(document).attr('title');
	if (current_title == "Compra" || current_title == "Ajustes - Interfaz de Frigorífico") {
		
		var openmodal = document.querySelectorAll('.modal-open')
		for (var i = 0; i < openmodal.length; i++) {
			openmodal[i].addEventListener('click', function(event){
			event.preventDefault()
			toggleModal()
			})
		}
			
		const overlay = document.querySelector('.modal-overlay');
		if(overlay != undefined) overlay.addEventListener('click', toggleModal);


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
	$("h2").html(text);
	
	switch(text){
		case "Idioma":
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(language);
			break;

		case "Modo energético":
			$("#contenido2").html(consumption);
			setButtonsDetectProximityBoost();
			setTemperaturesModoEnergetico();
			break;

		case "Temperatura":
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(temperature);
			setButtonTemperature();
			break;

		case "Fecha y hora":
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(timeDate);
			break;
		
		case "Apariencia":
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(themeHTML);
			setButtonAutomaticTheme();
			break;

		case "Detección de proximidad":
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(ajustesGenerales);
			setButtonsDetectProximity();
			break;

		case "Luces":
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(lights);
			setButtonsLightSettings();
			break;

		case "Pantalla":
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(pantalla);
			changeScreenTimeButtons();
			break;

		case "Estadísticas":
			$("#contenido2").html(stats);
			setChart();
			break;

		default:
			$("#contenido2").html("<div id='contenido' class='flex items-center justify-center'></div>")
			$("#contenido").html(ajustesGenerales);
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

function automaticTheme(set){
	Cookies.set("automaticTheme", (set)? 1:0);
}

function setButtonAutomaticTheme(){
	var automaticThemeVar = 0;
	if(Cookies.get('automaticTheme') != undefined){
		automaticThemeVar = Cookies.get('automaticTheme');
	}

	if(Cookies.get('toTheme') != undefined){
		$('#toTheme').val(Cookies.get('toTheme'));
	}
	if(Cookies.get('fromTheme') != undefined){
		$('#fromTheme').val(Cookies.get('fromTheme')); 
	}

	if(automaticThemeVar == 0){
		document.getElementById('checkedThemeHTML').checked = false;
		changeInput('inputDetectTheme', false);
	}
	else{
		document.getElementById('checkedThemeHTML').checked = true;
		changeInput('inputDetectTheme', true);
	}
}

function changeTimeCookieTheme(fromto){
	if(fromto){
		Cookies.set('toTheme', $('#toTheme').val())
	}
	else{
		Cookies.set('fromTheme', $('#fromTheme').val())
	}
}

function setButtonsDetectProximity(){
	var automaticProxVar = 0,
		automaticLightVar = 0,
		automaticScreenVar = 0;
	if(Cookies.get('automaticDetection') != undefined){
		automaticProxVar = parseInt(Cookies.get('automaticDetection'));
	}

	if(automaticProxVar == 1){
		automaticLightVar = (Cookies.get('inputLuz')  != undefined)? parseInt(Cookies.get('inputLuz')) : 0;
		automaticScreenVar = (Cookies.get('inputPantalla')  != undefined)? parseInt(Cookies.get('inputPantalla')) : 0;
	}

	if(automaticProxVar == 0){
		document.getElementById('checked').checked = false;
		changeInput('inputDetect', false);

		document.getElementById('checked2').checked = false;
		$('#checked2').prop('disabled', true);
		changeInput('inputLuz', false);

		document.getElementById('checked3').checked = false;
		$('#checked3').prop('disabled', true);
		changeInput('inputPantalla', false);
	}else{
		$('#checked2').prop('disabled', false);
		document.getElementById('checked2').checked = true;
		$('#checked3').prop('disabled', false);
		document.getElementById('checked3').checked = true;
	}

	if(automaticLightVar == 0){
		document.getElementById('checked2').checked = false;
		changeInput('inputLuz', false);
	}

	if(automaticScreenVar == 0){
		document.getElementById('checked3').checked = false;
		changeInput('inputPantalla', false);
	}
}

function setButtonTemperature(){
	var temFrig = 4,
		temCong = -22;

	if(Cookies.get('normal-nevera') != undefined) temFrig = parseInt(Cookies.get('normal-nevera'));
	if(Cookies.get('normal-conge') != undefined) temCong = parseInt(Cookies.get('normal-conge'));
	
	$("#temperatureOutputId").text(temFrig);
	$("#temperatureConOutputId").text(temCong);
	
	$("#temperatureRangeId").val(temFrig);
	$("#temperaturaConRangeId").val(temCong);

	var alerTemp = 0;
	if(Cookies.get('alertTemperature') != undefined){
		alerTemp = parseInt(Cookies.get('alertTemperature'));
	}

	if(alerTemp == 0){
		document.getElementById('checked').checked = false;
		changeInput('inputDetect', false);
	}
}

function setButtonSetupTemp(){
	var temFrig = 4,
		temCong = -22;

	if(Cookies.get('normal-nevera') != undefined) temFrig = parseInt(Cookies.get('normal-nevera'));
	if(Cookies.get('normal-conge') != undefined) temCong = parseInt(Cookies.get('normal-conge'));
	
	$("#temperatureOutputId").text(temFrig);
	$("#temperatureConOutputId").text(temCong);
	
	$("#temperatureRangeId").val(temFrig);
	$("#temperaturaConRangeId").val(temCong);

	setButtonsDetectProximity();

	if(Cookies.get("screenAttenuation") != undefined && Cookies.get("screenAttenuation") == 0){
		document.getElementById('checked4').checked = false;
		changeInput('inputPantallaAhorro', false);
	}

	

}

function alertTemperature(set){
	Cookies.set("alertTemperature", (set)? 1:0);
}

function setTemperaturesModoEnergetico(){
	var temEcoFrig = 4,
		temEcoCong = -22,
		temBoostFrig = 2,
		temBoostCong = -24;

	if(Cookies.get('eco-nevera') != undefined) temEcoFrig = parseInt(Cookies.get('eco-nevera'));
	if(Cookies.get('eco-conge') != undefined) temEcoCong = parseInt(Cookies.get('eco-conge'));
	if(Cookies.get('speed-nevera') != undefined) temBoostFrig = parseInt(Cookies.get('speed-nevera'));
	if(Cookies.get('speed-conge') != undefined) temBoostCong = parseInt(Cookies.get('speed-conge'));

	$("#temperatureOutputId").text(temEcoFrig);
	$("#temperatureConOutputId").text(temEcoCong);
	$("#temperatureOutputIdS").text(temBoostFrig);
	$("#temperatureConOutputIdS").text(temBoostCong);

	$("#temperatureRangeId").val(temEcoFrig);
	$("#temperaturaConRangeId").val(temEcoCong);
	$("#temperatureRangeIdS").val(temBoostFrig);
	$("#temperaturaConRangeIdS").val(temBoostCong);
}

function setButtonsDetectProximityBoost(){
	var automaticProxVar = 0,
		automaticLightVar = 0,
		automaticScreenVar = 0;
	if(Cookies.get('automaticDetectionBoost') != undefined){
		automaticProxVar = parseInt(Cookies.get('automaticDetectionBoost'));
	}

	if(automaticProxVar == 1){
		automaticLightVar = (Cookies.get('automaticLightBoost')  != undefined)? parseInt(Cookies.get('automaticLightBoost')) : 0;
		automaticScreenVar = (Cookies.get('inputPantallaBoost')  != undefined)? parseInt(Cookies.get('inputPantallaBoost')) : 0;
	}

	if(automaticProxVar == 0){
		document.getElementById('checked5').checked = false;
		changeInput('inputDetect2', false);

		document.getElementById('checked6').checked = false;
		changeInput('inputLuz2', false);

		document.getElementById('checked7').checked = false;
		changeInput('inputPantalla2', false);
	}

	if(automaticLightVar == 0){
		document.getElementById('checked6').checked = false;
		changeInput('inputLuz2', false);
	}

	if(automaticScreenVar == 0){
		document.getElementById('checked7').checked = false;
		changeInput('inputPantalla2', false);
	}

	if(Cookies.get("screenAttenuationBoost") != undefined && Cookies.get("screenAttenuationBoost") == 0){
		document.getElementById('checked8').checked = false;
		changeInput('inputPantallaAhorro2', false);
	}
	else if(Cookies.get("screenAttenuationBoost") == 1){
		document.getElementById('checked8').checked = true;
		changeInput('inputPantallaAhorro2', true);
	}
}

function changeDetection(set){
	Cookies.set("automaticDetection", (set)? 1:0);
	if(!set){
		changeInput('inputLuz', false);
		Cookies.set('inputLuz', 0);
		document.getElementById('checked2').checked = false;
		$('#checked2').prop('disabled', true);

		changeInput('inputPantalla', false);
		Cookies.set('inputPantalla', 0);
		document.getElementById('checked2').checked = false;
		$('#checked3').prop('disabled', true);
	}
	else{
		changeInput('inputLuz', true);
		Cookies.set('inputLuz', 1);
		document.getElementById('checked2').checked = true;
		$('#checked2').prop('disabled', false);

		changeInput('inputPantalla', true);
		Cookies.set('inputPantalla', 1);
		document.getElementById('checked3').checked = true;
		$('#checked3').prop('disabled', false);
	}
}

function changeDetectionBoost(set){
	console.log(set);
	Cookies.set("automaticDetectionBoost", (set)? 1:0);
	if(!set){
		changeInput('inputLuz2', false);
		Cookies.set('automaticLightBoost', 0);
		$('#checked6').prop('disabled', true);

		changeInput('inputPantalla2', false);
		Cookies.set('inputPantallaBoost', 0);
		$('#checked7').prop('disabled', true);
	}
	else{
		changeInput('inputLuz2', true);		
		Cookies.set('automaticLightBoost', 1);
		$('#checked6').prop('disabled', false);
		
		changeInput('inputPantalla2', true);
		Cookies.set('inputPantallaBoost', 1);
		$('#checked7').prop('disabled', false);
	}
}

function changeLight(set){
	Cookies.set("inputLuz", (set)? 1:0);
}

function changeScreen(set){
	Cookies.set("inputPantalla", (set)? 1:0);
}

function changeLightBoost(set){
	Cookies.set("automaticLightBoost", (set)? 1:0);
}

function changeScreenBoost(set){
	Cookies.set("inputPantallaBoost", (set)? 1:0);
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
	let innerHTML = "<h2 class='text-4xl w-full mb-2 z-40 fontColor fontDefault'>Lista de la compra</h2>";
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
						"<span onclick='removeItem(" + i + ");' title='Eliminar' class='fontColor fontDefault buttonsSS buttonsSSDefault fas fa-times absolute p-2 hover:text-gray-600 rounded-tl-lg rounded-br-lg cursor-pointer'></span>" +
						"<img src='resources/" + items[i].file + "' alt='" + items[i].alt + "' class='static w-full h-full rounded-l-lg object-cover'>" +
					"</div>" +
					"<div class='data flex-col w-full bgDarkerColor bgDarkerDefault fontColor fontDefault'>" + 
						"<h3 class='px-4 py-2 text-2xl'>" + items[i].title + "</h3>" +
						"<h4 class='price font-bold px-4'>Precio: " + price + "€</h4>" +
					"</div>" +
					"<div class='selector flex flex-col justify-center rounded-r-lg w-12 bgDarkerColor bgDarkerDefault'>" +
						"<button onclick='increment(this, " + i +")' title='Aumentar cantidad' class='fontColor fontDefault buttonsSS buttonsSSDefault my-auto w-full h-full mb-2 rounded-tr-lg'><span class='fas fa-plus hover:text-gray-600'></span></button>" +
						"<input onchange = 'recalc(this, " + i +");' type='number' name='Cantidad' value='" + items[i].quantity + "' class='text-center font-bold bgDarkerColor bgDarkerDefault  fontColor fontDefault'>" +
						"<button onclick='decrement(this, " + i +")' title='Disminuir cantidad' class='fontColor fontDefault buttonsSS buttonsSSDefault my-auto w-full h-full mt-2 rounded-br-lg'><span class='fas fa-minus hover:text-gray-600'></span></button>" +
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
	theme();
	return false;
}

// Función para mostrar los elementos de cada apartado de la "tienda"
function showFoodItems(a){
	if(window.innerWidth <= widthChange){
		small = true;
		$(".burger").hide();
	}
	let total = "<h2 class='fontColor fontDefault text-4xl w-full mb-2 z-40'>" + $(this).text() + "</h2>";
	array = a;

	for(let i = 0; i < array.length; i++){
		let divItems = "<div class='shopping-list flex flex-col w-auto'>" +
			"<div class='rounded-lg flex bg-gray-200 my-2 shadow-sm fontColor fontDefault'>" +
				"<div class='relative h-32 w-40'>" + 
					"<img src='resources/" + array[i].file + "' alt='" + array[i].alt + "' class='static w-full h-full rounded-l-lg object-cover'>" +
				"</div>" +
				"<div class='data flex-col w-full bgDarkerColor bgDarkerDefault'>" + 
					"<h3 class='px-4 py-2 text-2xl'>" + array[i].title + "</h3>" +
					"<h4 class='price font-bold px-4'>Precio: " + array[i].price + "€</h4>" +
				"</div>" +
				"<button onclick='addToItems(array, " + i + ");' title='Añadir' class='buttonsSS buttonsSSDefault selector flex flex-col justify-center items-center rounded-r-lg w-16 cursor-pointer'>" +
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
	if(exists){ // Si existe, aumentamos la cantidad
		items[element].quantity++;
	} else // Si no existe, lo añadimos al array de items
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
		$('.fa-th-large').removeClass('text-gray-900').addClass('text-gray-600');
		$('.fa-th-list').removeClass('text-gray-600').addClass('text-gray-900');
		$('.shopping-list').removeClass('flex-col w-auto').addClass('flex-col lg:inline-flex p-0 lg:p-2 lg:w-1/2');
	}
	else{
		$('.fa-th-large').removeClass('text-gray-600').addClass('text-gray-900');
		$('.fa-th-list').removeClass('text-gray-900').addClass('text-gray-600');
		$('.shopping-list').removeClass('lg:inline-flex lg:w-1/2').addClass('flex-col p-0 w-auto');
	}
	return false;
}

// Función para cambiar el modo de visualización de grid a lista y viceversa
function switchGridList(){
	$('button').click(function(e) {
		if ($(this).hasClass('grid')) {
			Cookies.set('grid', 1);
			$('.fa-th-large').removeClass('text-gray-900').addClass('text-gray-600');
			$('.fa-th-list').removeClass('text-gray-600').addClass('text-gray-900');
			$('.shopping-list').removeClass('flex-col w-auto').addClass('flex-col lg:inline-flex p-0 lg:p-2 lg:w-1/2');
		}
		else if($(this).hasClass('list')) {
			Cookies.set('grid', 2);
			$('.fa-th-large').removeClass('text-gray-600').addClass('text-gray-900');
			$('.fa-th-list').removeClass('text-gray-900').addClass('text-gray-600');
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
		"<input id='code' type='number' placeholder='ej.: 11111111' class='border-2 border-gray-300 rounded-lg p-2 w-full my-2' disabled>" +
		"<span title='Añadir' onclick='addElement();' class='p-6 cursor-pointer fas fa-plus fill-current text-grey hover:text-purple-300'></span>" +
	"</div>" +

	"<div class='tags flex flex-wrap'>";
	for(let i = 0; i < tagitems.length; i++){
		innerHTML += "<div onclick='deleteElement(this);' class='taggie m-1 text-xs flex inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-purple-300 text-gray-700 rounded-full'>" +
					"<p>" + tagitems[i].title + "</p>" +
					"<span title='Eliminar' class='fas fa-times cursor-pointer px-1 py-2 fill-current text-grey'></span>" +
				"</div>";
	}
	innerHTML += "</div>" +

	"<div class='flex justify-end pt-2'>" +
		"<button title='Añadir' onclick='addToShoppingList();' class='modal-close px-4 p-3 rounded-lg text-white buttonFat buttonFatCodeDefault '><span class = 'fontColor fontDefault'>Añadir</span></button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
	});
});

$(document).ready(function(){
	$(".order").click(function(){
		let innerHTML = "<div class='flex justify-between items-center pb-3'>" +
		"<p class='text-2xl font-bold'>Resumen del pedido</p>" +
		"<div class='modal-close cursor-pointer z-50'>" +
			"<span title='Cerrar' class='fas fa-times fill-current fontColor fontDefault hover:text-purple-300'></span>" +
		"</div>" +
	"</div>" +	

	"<p class='p-modal'>Pulsa 'Continuar' para confirmar el envío a tu domicilio de la siguiente compra.</p>" +
	
	"<ul class='order-list mt-3'>";
	
	for(let i = 0; i < items.length; i++){
		innerHTML += "<li class='p-1 rounded-sm m-2 ml-0'><span title='Eliminar' onclick='removeFinalItem(" + i + ");' class='fas fa-times fill-current text-grey hover:text-purple-300 px-4 cursor-pointer'></span>" + items[i].title + " <b>x" + items[i].quantity + "</b></li>";
	}

	innerHTML += "</ul>" + 

	"<p class='order-price mt-3 font-bold mr-2 px-3 py-1 rounded-sm bgColor bgColorDefault fontColor fontDefault'>Total: " + $('.total-price').text() + "</p>" +

	"<div class='flex justify-end pt-2'>" + 
		"<button onclick='showFinalModal();' title='Continuar' class='px-4 p-3 rounded-lg text-white buttonFat buttonFatCodeDefault'><span class='fontColor fontDefault'>Continuar</span></button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
	});
});

function openModal(){
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

function showDateModal(){		
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
		"<button title='Guardar' class='focus:outline-none focus:shadow-outline px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Guardar</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
}

function showTimeModal(){

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
		"<button title='Guardar' class='focus:outline-none focus:shadow-outline px-4 bg-purple-400 p-3 rounded-lg text-white hover:bg-purple-300'>Guardar</button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
}

function showFinalModal(){
	let innerHTML = "<div class='flex justify-between items-center pb-3'>" +
		"<p class='text-2xl font-bold'>¡Todo listo para realizar su pedido!</p>" +
		"<div class='modal-close cursor-pointer z-50 -mt-8'>" +
			"<span title='Cerrar' class='fas fa-times fill-current text-grey hover:text-purple-300'></span>" +
		"</div>" +
	"</div>" +

	"<p class='p-modal'>¿Está seguro de querer realizar este pedido? Pulse 'Hecho' para confirmar.</p>" + 

	"<div class='flex justify-end pt-2'>" +
		"<button onclick='items.splice(0, items.length); showShoppingList();' title='Hecho' class='modal-close px-4 p-3 rounded-lg text-white buttonFat buttonFatCodeDefault '><span class='fontColor fontDefault'>Hecho</span></button>" +
	"</div>";

	$(".modal-content").html(innerHTML);
}

function removeFinalItem(id){
	removeItem(id);
	
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
		"<button onclick='selectPage(0);' type='button' class='buttonsColor buttonsColorDefault focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 transition ease-in-out duration-500'>" +
			"<span class='fas fa-power-off text-white'></span>" +
		"</button>";

	if(Cookies.get('inputLuz') == undefined || Cookies.get('inputLuz') == 0){
		innerHTML +="<button onclick='selectPage(1);' type='button' class='buttonsColor buttonsColorDefault focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 transition ease-in-out duration-500'>" +
			"<span class='far fa-lightbulb text-white'></span>" +
		"</button>";
	}
	

		
	innerHTML += "</div>" +

	"<div class='flex flex-wrap md:flex-no-wrap justify-center'>" +
		"<button onclick='location.href=\"shopping.html\"; Cookies.set(\"prevPlace\", \"index.html\");' type='button' class='shop buttonsColor buttonsColorDefault focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 transition ease-in-out duration-500'>" +
			"<span class='fas fa-shopping-basket text-white'></span>" +
		"</button>" +

		"<button onclick='selectPage(2);' type='button' class='buttonsColor buttonsColorDefault focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 transition ease-in-out duration-500'>" +
			"<span class='fas fa-charging-station text-white pl-3'></span>" +
		"</button>" +
	"</div>";

	$('.index-content').html(innerHTML);
	theme();
	return false;
}

var page = [{"title":"On/Off", "bigbtn":"power-off", "function1":"alternarMotorRefrigerador()", "function2":"alternarMotorCongelador()", "function3":"alternarAmbosMotores()"}, 
{"title":"Luces", "bigbtn":"lightbulb", "function1":"alternarLuzRefrigerador()", "function2":"alternarLuzCongelador()", "function3":"alternarAmbasLuces()"},
{"title":"Consumo energético", "bigbtn":"charging-station", "function1":"ecoMode();", "function2":"ultraCoolHyperExtraFreezingMode()", "function3":""}];

function selectPage(id){
	$('.back').show();
	$('.shopping').show();

	let innerHTML = "<h1 id='titlePage' class='text-4xl fontColor fontDefault'>" + page[id].title + "</h1>" +
	"<div class='flex flex-wrap justify-center lg:flex-no-wrap lg:items-center'>" +
		"<button type='button' onclick='initialIndex()' class='focus:outline-none focus:shadow-outline hidden lg:block buttonsColor buttonsColorDefault cursor-default text-6xl big-btn rounded-full ml-10'>" +
			"<span class='xxl-font fas fa-" + page[id].bigbtn + " text-white'></span>" +
		"</button>" +
	"<div class='flex flex-wrap md:flex-no-wrap md:flex-col justify-center'>";

	if(id != 2){
		innerHTML += "<button id='button1' type='button' onclick='return " + page[id].function1 + ";' class='flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6'>" +
				"<span class='text-gray-200 text-xl'>Refrigerador <span id='span1'>Off</span></span>" +
			"</button>" +
			"<button id='button2' type='button' onclick='return " + page[id].function2 + ";' class='bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6 lg:ml-24'>" +
				"<span class='text-gray-200 text-xl'>Congelador <span id='span2'>On</span></span>" +
			"</button>" +
			"<button id='button3' type='button' onclick='return " + page[id].function3 + ";' class='bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6'>" +
				"<span class='text-gray-200 text-xl'>Ambos <span id='span3'>On</span></span>" +
			"</button>";
	} else{
		innerHTML += "<button id='button1' type='button' onclick='selectMode(1); return " + page[id].function1 + ";' class='alert-eco flex flex-wrap justify-center items-center bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6'>" +
				"<span class='fas fa-leaf text-gray-200'></span>" +
			"</button>" +
			"<button id='button2' type='button' onclick='selectMode(2); return " + page[id].function2 + ";' class='alert-speed bg-gray-500 hover:bg-gray-400 focus:outline-none focus:shadow-outline text-6xl w-40 h-40 rounded-full m-6' >" +
				"<span class='fas fa-snowflake text-gray-200'></span>" +
			"</button>";
	}
	innerHTML += "</div></div>";

	$('.index-content').html(innerHTML);
	if(page[id].title == "Luces") checkLightButtons("orange");
	if(page[id].title == "Consumo energético") checkFrideMode();
	if(page[id].title == "On/Off") checkMotorButtons("blue");
	theme();
 	return false;
}

function selectMode(id){
	if(id == 1){
		if($('#button1').hasClass("bg-gray-500"))
			$('.alert-eco').removeClass("hidden").addClass("block");
        if($('.alert-speed').hasClass("block"))
            $('.alert-speed').removeClass("block").addClass("hidden");
	} else if(id == 2){
		if($('#button2').hasClass("bg-gray-500"))
			$('.alert-speed').removeClass("hidden").addClass("block");
        if($('.alert-eco').hasClass("block"))
            $('.alert-eco').removeClass("block").addClass("hidden");
	}
}

$(document).ready(function(){
	$("#temperatureRangeId").mousemove(function(){
        $("#temperatureOutputId").html($("#temperatureRangeId").val() + "ºC");
    });
    $("#temperaturaConRangeId").mousemove(function(){
        $("#temperatureConOutputId").html($("#temperaturaConRangeId").val() + "ºC");        
	});

	$("#temperatureRangeIdS").mousemove(function(){
        $("#temperatureOutputIdS").html($("#temperatureRangeIdS").val() + "ºC");
    });
    $("#temperaturaConRangeIdS").mousemove(function(){
        $("#temperatureConOutputIdS").html($("#temperaturaConRangeIdS").val() + "ºC");        
	});
});

function resetModo(id){
	if(id == 1){ // Reestablecer Modo ECO
		$("#temperatureOutputId").html(4);
		$("#temperatureRangeId").val(4);
		$("#temperatureConOutputId").html(-22);
		$("#temperaturaConRangeId").val(-22);
		changeInput('inputDetect', false);
		changeInput('inputLuz', false);
		changeInput('inputPantalla', false);
		changeInput('inputPantallaAhorro', true);
	} else if(id == 2){ // Reestablecer Modo SPEED
		$("#temperatureOutputIdS").html(2);
		$("#temperatureRangeIdS").val(2);
		$("#temperatureConOutputIdS").html(-24);
		$("#temperaturaConRangeIdS").val(-24);
		document.getElementById('checked5').checked = true;
		changeInput('inputDetect2', true);
		document.getElementById('checked6').checked = true;
		changeInput('inputLuz2', true);
		document.getElementById('checked7').checked = true;
		changeInput('inputPantalla2', true);
		document.getElementById('checked8').checked = false;
		changeInput('inputPantallaAhorro2', false);
	}
}

// true first hight
// false second high
function compareTimes(h1, m1, h2, m2){
	return (h1 > h2 || (h1 == h2 && m1 > m2));
}


// Theme notations:
// bgColor - fondo
// 		- bgColorLight
//      - bgColorDefault
//
// bgDarkerColor - Fondo izq
// 		- bgDarkerLight
//		- bgDarkerDefault
//
// fontColor - Fuente
//		- fontLight
//		- fontDefault

function theme(){
	
	if(Cookies.get('automaticTheme') != undefined && Cookies.get('automaticTheme') == 1 && Cookies.get('toTheme') != undefined && Cookies.get('fromTheme') != undefined){
		// manage time for theme
		var color = Cookies.get("color");
		if(color == undefined) color = 0;

		var to =  Cookies.get('toTheme');
		var from =  Cookies.get('fromTheme');

		if(!(frigo.frigorificoHora != undefined && typeof frigo.frigorificoHora.getMinutes === 'function')) return;

		var currentDH = frigo.frigorificoHora.getHours();
		var currentDM = frigo.frigorificoHora.getMinutes();
		
		var fromDateH = from.split(':')[0];
		var fromDateM = from.split(':')[1];
		
		var toDateH = to.split(':')[0];
		var toDateM = to.split(':')[1];
		
		

		if(compareTimes(toDateH, toDateM, fromDateH, fromDateM)){ // fromDate < toDate
			if(compareTimes(currentDH, currentDM, fromDateH, fromDateM) && compareTimes(toDateH, toDateM, currentDH, currentDM)){ // fromDate < currentD && currentD < toDate
				darkTheme();
			}
			else{
				lightTheme(color);
			}
		}
		else{
			if(!(compareTimes(currentDH, currentDM, toDateH, toDateM) && compareTimes(fromDateH, fromDateM, currentDH, currentDM))){ // toDateH < currentDH && currentDH < fromDateH
				darkTheme();
			}
			else{
				lightTheme(color);
			}
		}

		return;
	}

	var themeVar = Cookies.get("theme");
	
	if(themeVar == undefined || themeVar == 1){
		var color = Cookies.get("color");
		if(color == undefined) color = 0;
		lightTheme(color);
		return;
	}
	else{
		darkTheme();
	}

}

function darkTheme(){
	$(".bgColor").removeClass("bgColorLight");
	$(".bgColor").addClass("bgColorDefault");

	$(".bgDarkerMMColor").removeClass("bgDarkerMMLight");
	$(".bgDarkerMMColor").addClass("bgDarkerMMDefaul");
	
	$(".bgDarkerColor").removeClass("bgDarkerLight");
	$(".bgDarkerColor").addClass("bgDarkerDefault");

	$(".fontColor").removeClass("fontLight");
	$(".fontColor").addClass("fontDefault");
	
	$(".buttonsHamburger").removeClass("buttonsHamburguerLight");
	$(".buttonsHamburger").addClass("buttonsHamburguerDark");
			
	$(".buttonsColor").removeClass("buttonsColorPurple");
	$(".buttonsColor").removeClass("buttonsColorOrange");
	$(".buttonsColor").removeClass("buttonsColorPink");
	$(".buttonsColor").removeClass("buttonsColorBlue");
	$(".buttonsColor").addClass("buttonsColorDefault");
	
	$(".buttonsSS").removeClass("buttonsSSPurple");
	$(".buttonsSS").removeClass("buttonsSSPink");
	$(".buttonsSS").removeClass("buttonsSSOrange");
	$(".buttonsSS").removeClass("buttonsSSBlue");
	$(".buttonsSS").addClass("buttonsSSDefault");

	$(".buttonFat").removeClass("buttonsColorPurple");
	$(".buttonFat").removeClass("buttonsColorOrange");
	$(".buttonFat").removeClass("buttonsColorPink");
	$(".buttonFat").removeClass("buttonsColorBlue");
	$(".buttonFat").addClass("buttonFatCodeDefault");
}

function lightTheme(color){
	$(".bgColor").removeClass("bgColorDefault");
	$(".bgColor").addClass("bgColorLight");

	$(".bgDarkerMMColor").removeClass("bgDarkerMMDefaul");
	$(".bgDarkerMMColor").addClass("bgDarkerMMLight");
	
	$(".bgDarkerColor").removeClass("bgDarkerDefault");
	$(".bgDarkerColor").addClass("bgDarkerLight");

	$(".fontColor").removeClass("fontDefault");
	$(".fontColor").addClass("fontLight");
	
	$(".buttonsHamburger").removeClass("buttonsHamburguerDark");
	$(".buttonsHamburger").addClass("buttonsHamburguerLight");

	switch (color) {
		case '1':
			
			$(".buttonsColor").removeClass("buttonsColorDefault");
			$(".buttonsColor").removeClass("buttonsColorPurple");
			$(".buttonsColor").removeClass("buttonsColorOrange");
			$(".buttonsColor").removeClass("buttonsColorPink");
			$(".buttonsColor").addClass("buttonsColorBlue");
		
			$(".buttonsSS").removeClass("buttonsSSDefault");
			$(".buttonsSS").removeClass("buttonsSSPurple");
			$(".buttonsSS").removeClass("buttonsSSPink");
			$(".buttonsSS").removeClass("buttonsSSOrange");
			$(".buttonsSS").addClass("buttonsSSBlue");

			$(".buttonFat").removeClass("buttonFatCodeDefault");
			$(".buttonFat").removeClass("buttonsColorPurple");
			$(".buttonFat").removeClass("buttonsColorOrange");
			$(".buttonFat").removeClass("buttonsColorPink");
			$(".buttonFat").addClass("buttonsColorBlue");
			break;

		case '2':
			
			$(".buttonsColor").removeClass("buttonsColorDefault");
			$(".buttonsColor").removeClass("buttonsColorPurple");
			$(".buttonsColor").removeClass("buttonsColorOrange");
			$(".buttonsColor").removeClass("buttonsColorBlue");
			$(".buttonsColor").addClass("buttonsColorPink");
		
			$(".buttonsSS").removeClass("buttonsSSDefault");
			$(".buttonsSS").removeClass("buttonsSSPurple");
			$(".buttonsSS").removeClass("buttonsSSOrange");
			$(".buttonsSS").removeClass("buttonsSSBlue");
			$(".buttonsSS").addClass("buttonsSSPink");
		
			$(".buttonFat").removeClass("buttonFatCodeDefault");
			$(".buttonFat").removeClass("buttonsColorPurple");
			$(".buttonFat").removeClass("buttonsColorOrange");
			$(".buttonFat").removeClass("buttonsColorBlue");
			$(".buttonFat").addClass("buttonsColorPink");
			break;

		case '3':
			
			$(".buttonsColor").removeClass("buttonsColorDefault");
			$(".buttonsColor").removeClass("buttonsColorPurple");
			$(".buttonsColor").removeClass("buttonsColorBlue");
			$(".buttonsColor").removeClass("buttonsColorPink");
			$(".buttonsColor").addClass("buttonsColorOrange");
		
			$(".buttonsSS").removeClass("buttonsSSDefault");
			$(".buttonsSS").removeClass("buttonsSSPurple");
			$(".buttonsSS").removeClass("buttonsSSBlue");
			$(".buttonsSS").removeClass("buttonsSSPink");
			$(".buttonsSS").addClass("buttonsSSOrange");
		
			$(".buttonFat").removeClass("buttonFatCodeDefault");
			$(".buttonFat").removeClass("buttonsColorPurple");
			$(".buttonFat").removeClass("buttonsColorBlue");
			$(".buttonFat").removeClass("buttonsColorPink");
			$(".buttonFat").addClass("buttonsColorOrange");
			break;
	
		default:
			$(".buttonsColor").removeClass("buttonsColorDefault");
			$(".buttonsColor").removeClass("buttonsColorBlue");
			$(".buttonsColor").removeClass("buttonsColorOrange");
			$(".buttonsColor").removeClass("buttonsColorPink");
			$(".buttonsColor").addClass("buttonsColorPurple");
		
			$(".buttonsSS").removeClass("buttonsSSDefault");
			$(".buttonsSS").removeClass("buttonsSSBlue");
			$(".buttonsSS").removeClass("buttonsSSPink");
			$(".buttonsSS").removeClass("buttonsSSOrange");
			$(".buttonsSS").addClass("buttonsSSPurple");

			$(".buttonFat").removeClass("buttonFatCodeDefault");
			$(".buttonFat").removeClass("buttonsColorBlue");
			$(".buttonFat").removeClass("buttonsColorOrange");
			$(".buttonFat").removeClass("buttonsColorPink");
			$(".buttonFat").addClass("buttonsColorPurple");
			break;
	}


}

/* Fecha y hora */
function checkTime(){
    if($("#fetchOnline").is(":checked")) initDate();
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