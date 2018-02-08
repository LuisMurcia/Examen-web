window.onload = function () {
    var url = "https://rawgit.com/LuisMurcia/Examen-web/master/json/json.json";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionJson(this.responseText);
        }
    };
    xhttp.open("GET", url, true); //cambiar en github
    xhttp.send();
}

function gestionJson(Json){
    var textoJson = JSON.parse(Json);
    
    //Bucle para poner los títulos que tenemos en Json
    for (i=0; i<10; i++){
        document.getElementsByTagName("h3")[i].innerHTML = textoJson.question[i].title;  
    }
    
    //Select
    
}