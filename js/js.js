var cuestElement = null;
var respuestaSelect = [];
var respuestasMultiple = [];
var respuestaText = [];
var respuestaRadio = [];
var respuestasCheckbox = [];
var nota = 0;

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

    cuestElement = document.getElementById("cuestionario");
    document.getElementById("corregirTecla").onclick = function () {
        if (comprobar()) {
            corregir();
            notaFinal();
        }
    };
}

function gestionJson(Json) {
    var preguntas = JSON.parse(Json);

    //Bucle para poner los titulos que tenemos en Json
    for (i = 0; i < 10; i++) {
        document.getElementsByTagName("h3")[i].innerHTML = preguntas.question[i].title;
    }
    //Text
    for (i = 0; i < 2; i++) {
        respuestaText[i] = preguntas.question[i].answer;
    }

    //Select
    for (i = 2; i < 4; i++) {
        var respuestas = preguntas.question[i].option.length;
        var select = document.getElementsByTagName("select")[i - 2];
        respuestaSelect[i] = preguntas.question[i].answer;
        for (j = 0; j < respuestas; j++) {
            var respuesta = document.createElement("option");
            respuesta.text = preguntas.question[i].option[j];
            respuesta.value = j + 1;
            select.options.add(respuesta);
        }
    }

    //Multiple
    for (i = 4; i < 6; i++) {
        var respuestas = preguntas.question[i].option.length;
        var multiple = document.getElementsByTagName("select")[i - 2];
        respuestasMultiple[i] = [];
        for (j = 0; j < respuestas; j++) {
            var respuesta = document.createElement("option");
            respuesta.text = preguntas.question[i].option[j];
            respuesta.value = j + 1;
            multiple.options.add(respuesta);
            respuestasMultiple[i][j] = preguntas.question[i].answer[j];
        }
    }

    //Checkbox
    for (i = 6; i < 8; i++) {
        var respuestas = preguntas.question[i].option.length;
        var checkbox = document.getElementsByTagName("div")[i + 4];
        var agregaName;
        if (i == 6) {
            agregaName = "opcion7";
        } else {
            agregaName = "opcion8";
        }
        for (j = 0; j < respuestas; j++) {
            var label = document.createElement("label");
            var input = document.createElement("input");
            var span = document.createElement("span");
            var br = document.createElement("br");
            checkbox.appendChild(label);
            label.innerText = preguntas.question[i].option[j];
            label.appendChild(input);
            label.appendChild(span);
            label.className = "containerCheck";
            input.type = "checkbox";
            input.name = agregaName;
            input.value = j + 1;
            span.className = "checkmarkCheck";
            checkbox.appendChild(br);
        }
    }

    //Radio
    for (i = 8; i < 10; i++) {
        var respuestas = preguntas.question[i].option.length;
        var radio = document.getElementsByTagName("div")[i + 4];
        respuestaRadio[i] = preguntas.question[i].answer;
        var oneOption;
        if (i == 8) {
            oneOption = "opcion9";
        } else {
            oneOption = "opcion10";
        }
        for (j = 0; j < respuestas; j++) {
            var label = document.createElement("label");
            var input = document.createElement("input");
            var span = document.createElement("span");
            var br = document.createElement("br");
            radio.appendChild(label);
            label.innerText = preguntas.question[i].option[j];
            label.appendChild(input);
            label.appendChild(span);
            label.className = "containerRad";
            input.type = "radio";
            input.name = oneOption;
            input.value = j + 1;
            span.className = "checkmarkRad";
            radio.appendChild(br);
        }
    }
}

function comprobar() {

    //Comprobar Text
    for (i = 0; i < 2; i++) {
        if (cuestElement.elements[i].value == "") {
            cuestElement.elements[i].focus();
            alert("Debe responder la pregunta " + (i + 1));
            return false;
        }
    }

    //Comprobar Select
    for (i = 2; i < 4; i++) {
        if (cuestElement.elements[i].selectedIndex == 0) {
            cuestElement.elements[i].focus();
            alert("Debe responder la pregunta " + (i + 1));
            return false;
        }
    }

    //Comprobar Multiple
    for (i = 4; i < 6; i++) {
        var comprobarMultiple = false;
        for (j = 1; j < cuestElement.elements[i].length; j++) {
            var optionMultiple = cuestElement.elements[i].options[j];
            if (optionMultiple.selected) {
                comprobarMultiple = true;
            }
        }
        if (!comprobarMultiple) {
            cuestElement.elements[i].focus();
            alert("Debe responder la pregunta " + (i + 1));
            return false;
        }
    }

    //Comprobar Check
    for (i = 6; i < 8; i++) {
        var comprobarCheckbox = false;
        var optionCheckbox;
        if (i == 6) {
            optionCheckbox = cuestElement.opcion7;
        } else {
            optionCheckbox = cuestElement.opcion8;
        }
        for (j = 0; j < optionCheckbox.length; j++) {
            if (optionCheckbox[j].checked) {
                comprobarCheckbox = true;
            }
        }
        if (!comprobarCheckbox) {
            cuestElement.elements[i + 1].focus();
            alert("Debe responder la pregunta " + (i + 1));
            return false;
        }
    }

    //Comprobar Radio
    for (i = 8; i < 10; i++) {
        var optionRadio = null;
        if (i == 8) {
            optionRadio = cuestElement.opcion9;

        } else {
            optionRadio = cuestElement.opcion10;
        }
        if (optionRadio.value == "") {
            cuestElement.elements[i + 4].focus();
            alert("Debe responder la pregunta " + (i + 1));
            return false;
        }
    }

    return true;
}

function corregir() {

    //Corregir Text
    for (i = 0; i < 2; i++) {
        var corregirText = cuestElement.elements[i].value;
        if (corregirText == respuestaText[i]) {

            nota++;
        }
    }

    //Corregir Select
    for (i = 2; i < 4; i++) {
        var corregirSelect = cuestElement.elements[i];
        if ((corregirSelect.selectedIndex - 1) == respuestaSelect[i]) {
            nota++;
        }
    }

    //Corregir Multiple
    for (i = 4; i < 6; i++) {
        var corregirMultiple = cuestElement.elements[i];
        var cierta = [];
        for (j = 1; j < (corregirMultiple.length); j++) {
            var opciones = corregirMultiple.options[j];
            if (opciones.selected == true) {
                cierta[j] = false;
                for (k = 0; k < respuestasMultiple[i].length; k++) {
                    if ((j) == respuestasMultiple[i][k])
                        cierta[j] = true;
                }
                if (cierta[j] == true) {
                    nota = nota + 0.5;
                }
            }
        }
    }

    //Corregir Checkbox
    for (i = 6; i < 8; i++) {
        var cierta = [];
        var corregirCheckbox;
        if (i == 6) {
            corregirCheckbox = cuestElement.opcion7;
        } else {
            corregirCheckbox = cuestElement.opcion8;
        }
        for (j = 0; j < corregirCheckbox.length; j++) {
            if (corregirCheckbox[j].checked) {
                cierta[j] = false;
                for (z = 0; z < respuestasCheckbox[i].length; z++) {
                    if ((j) == respuestasCheckbox[i][z])
                        cierta[j] = true;
                }
                if (cierta[j] == true) {
                    nota = nota + 0.5;
                }
            }
        }
    }

    //Corregir Radio
    for (i = 8; i < 10; i++) {
        var optionRadio;
        if (i == 8) {
            optionRadio = cuestElement.opcion9;
        } else {
            optionRadio = cuestElement.opcion10;
        }
        if ((optionRadio.value - 1) == respuestaRadio[i]) {
            nota++;
        }
    }

    //Corregir 
}

//Nota final
function notaFinal() {
    alert("Tu resultado final es " + nota.toFixed(2));
}