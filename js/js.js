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

function gestionJson(Json) {
    var preguntas = JSON.parse(Json);

    //Bucle para poner los títulos que tenemos en Json
    for (i = 0; i < 10; i++) {
        document.getElementsByTagName("h3")[i].innerHTML = textoJson.question[i].title;
    }

    //Select
    for (i = 2; i < 4; i++) {
        var respuestas = preguntas.question[i].option.length;
        var select = document.getElementsByTagName("select")[i - 2];
        for (j = 0; j < respuestas; j++) {
            var respuesta = document.createElement("option");
            respuesta.text = preguntas.question[i].option[j];
            respuesta.value = j + 1;
            select.option.add(respuesta);
        }
    }

    //Multiple
    for (i = 4; i < 6; i++) {
        var respuestas = preguntas.question[i].option.length;
        var multiple = document.getElementsByTagName("multiple")[i - 2];
        for (j = 0; j < respuestas; j++) {
            var respuesta = document.createElement("option");
            respuesta.text = preguntas.question[i].option[j];
            respuesta.value = j + 1;
            multiple.option.add(respuesta);
        }
    }
}