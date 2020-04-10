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