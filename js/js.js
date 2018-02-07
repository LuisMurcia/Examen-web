window.onload = function () {
    //Leer XML >> xml/formulario.xml
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            gestionarXml(this);
        }
    };
    xhttp.open("GET", "https://rawgit.com/LuisMurcia/Examen-web/master/xml/xml.xml", true); //cambiar en github
    xhttp.send();
}

function gestionXml(ficheroXml){
    var documentoXml = ficheroXml.responseXML;
    
    //Bucle para poner los títulos
    for (i=0; i<10; i++){
        var title = documentoXml.getElementsByTagName("title")[i].innerHTML;
        
    }
}