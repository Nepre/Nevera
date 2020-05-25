var cont = 0;
function init(){
    $('body').click(function(){
        window.location.href = "setup-welcome.html";
    });
}

var welcomeArray = 
[
    ["Hola!", "Pulse para continuar"],
    ["Bonjour!", "Veuillez cliquer pour continuer"],
    ["Welcome!", "Press to continue"],
    ["おはよう！", "続行するには押してください"]

]

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