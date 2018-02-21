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
        document.getElementsByTagName("h3")[i].innerHTML = preguntas.question[i].title;
    }

    //Select
    for (i = 2; i < 4; i++) {
        var respuestas = preguntas.question[i].option.length;
        var select = document.getElementsByTagName("select")[i - 2];
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
        for (j = 0; j < respuestas; j++) {
            var respuesta = document.createElement("option");
            respuesta.text = preguntas.question[i].option[j];
            respuesta.value = j + 1;
            multiple.options.add(respuesta);
        }
    }

    //Checkbox
    for (i = 6; i < 8; i++) {
        var respuestas = preguntas.question[i].option.length;
        var checkbox = document.getElementsByTagName("div")[i - 3];
        for (j = 0; j < respuestas; j++) {
            var label = document.createElement("label");
            var input = document.createElement("input");
            var span = document.createElement("span");
            var br = document.createElement("br");
            checkbox.appendChild(label);
            span.innerText = preguntas.question[i].option[j];
            label.appendChild(input);
            label.appendChild(span);
            label.className = "containerCheck";
            input.type = "checkbox";
            input.value = j + 1;
            span.className = "checkmarkCheck";
            checkbox.appendChild(br);
        }
    }

    //Radio
    for (i = 8; i < 10; i++) {
        var respuestas = preguntas.question[i].option.length;
        var radio = document.getElementsByTagName("div")[i - 3];
        var oneOption;
        if (i == 8) {
            oneOption = "9";
        } else {
            oneOption = "10";
        }
        for (j = 0; j < respuestas; j++) {
            var label = document.createElement("label");
            var input = document.createElement("input");
            var span = document.createElement("span");
            var br = document.createElement("br");
            radio.appendChild(label);
            span.innerText = preguntas.question[i].option[j];
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