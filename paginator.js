function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function leeJSON() {
    const sheet = GetURLParameter('sheetid');
    const page = GetURLParameter('sheetpage');
    const activitytype = GetURLParameter('activitytype');
    const sesskey = $("input[name=sesskey]").val();
    const key = GetURLParameter('key');
    const numberofpages = GetURLParameter('numberofpages');
    var urljson = "https://sheets.googleapis.com/v4/spreadsheets/"+sheet+"/values/"+page+"?key="+key;
    var datos = [];
    var idspreguntas = [];

    $.getJSON(urljson, function (data) {
        var entries = data.values;
        for(i = 0; i < entries.length; i++){
            if((entries[i][0]) == "TRUE"){
                var idpagina = entries[i][1];
                var courseid = entries[i][2];
                var seccion = entries[i][3];
                var nombre = entries[i][4];
                var descripcion = entries[i][5];
                var muestradescripcion = convertyesno(entries[i][6]);
                var contenido = entries[i][7];
                var mostrarnombre = convertyesno(entries[i][8]);
                var mostrardescripcion = convertyesno(entries[i][9]);
                var mostrarfecha = convertyesno(entries[i][10]);
                var disponibilidad = convertdisponibility(entries[i][11]);
                var numeroid = entries[i][12];
                var obj = {
                    display: 5,
                    completionunlocked: 1,
                    course: courseid,                        
                    coursemodule: idpagina,
                    section: seccion,
                    module: 15,
                    modulename: "page",
                    instance: "",
                    add: 0,
                    update: idpagina,
                    return: 0,
                    sr: 0,
                    revision: 2,
                    sesskey: sesskey,
                    _qf__mod_page_mod_form: 1,
                    mform_isexpanded_id_general: 1,
                    mform_isexpanded_id_contentsection: 1,
                    mform_isexpanded_id_appearancehdr: 0,
                    mform_isexpanded_id_modstandardelshdr: 0,
                    mform_isexpanded_id_availabilityconditionsheader: 0,
                    mform_isexpanded_id_activitycompletionheader: 0,
                    mform_isexpanded_id_tagshdr: 0,
                    mform_isexpanded_id_competenciessection: 0,
                    name: nombre,
                    "introeditor[format]": 1,
                    "introeditor[text]": descripcion,
                    showdescription: 0,
                    "page[text]": contenido,
                    "page[format]": 1,
                    printheading: 1,
                    printintro: 0,
                    printlastmodified: 1,
                    availabilityconditionsjson: ""
                        };
                 datos.push(obj);
                 idspreguntas.push(nombre);
             }

          }
    })
    .done(function(){
        enviar(datos, 0);
    })
}
function enviar(dato, indice){
    var googledata = [];
    if(indice < dato.length){
        var idpagina = dato[indice].coursemodule;
        const hostname = window.location.hostname;
        const urlhost = "https://"+hostname+"/course/modedit.php";
      $.ajax({
        url: urlhost,
        method: "POST",
        data: dato[indice]
        }).done(function(data) {
            $( ".no-overflow" ).append( `<p>Página${indice} editada</p>` );
            enviar(dato, indice + 1);
        });
    }
}

function sendGoogle(datos){
    window.location.replace("https://script.google.com/macros/s/AKfycbxt4vgLE_GawyA0aRO3gEyW2ghGQANB1P5i66PbUQCaVL9xCiPfFnnWT3Mo-d7o7rAjIA/dev?"+datos);
}

function convertTruefalse(data){
    var truefalse;
    if (data == "Falso"){ truefalse = 0}
    if (data == "Verdadero"){ truefalse = 1}
    return truefalse;
}
function convertUsecase(data){
    var usecase;
    if (data == "Igual mayúsculas que minúsculas"){ usecase = 0}
    if (data == "Mayúsculas y minúsculas deben coincidir"){ usecase = 1}
    return usecase;
}
function convertsingle(data){
    var single;
    if (data == "Sólo una respuesta"){ single = 1}
    if (data == "Se permiten varias respuestas"){ single = 0}
    return single;
}
function convertCalif(data){
    var califdef;
    if (data == "Ninguno"){ califdef = "0.0"}
    if (data == "100%"){ califdef = "1.0"}
    if (data == "90%"){ califdef = "0.9"}
    if (data == "83%"){ califdef = "0.8333333"}
    if (data == "80%"){ califdef = "0.8"}
    if (data == "75%"){ califdef = "0.75"}
    if (data == "70%"){ califdef = "0.7"}
    if (data == "66%"){ califdef = "0.6666667"}
    if (data == "60%"){ califdef = "0.6"}
    if (data == "50%"){ califdef = "0.5"}
    if (data == "40%"){ califdef = "0.4"}
    if (data == "33%"){ califdef = "0.3333333"}
    if (data == "30%"){ califdef = "0.3"}
    if (data == "25%"){ califdef = "0.25"}
    if (data == "20%"){ califdef = "0.2"}
    if (data == "16%"){ califdef = "0.1666667"}
    if (data == "14%"){ califdef = "0.1428571"}
    if (data == "12%"){ califdef = "0.125"}
    if (data == "11%"){ califdef = "0.1111111"}
    if (data == "10%"){ califdef = "0.1"}
    return califdef;
}

function convertshuffleanswers(data){
    var shuffleanswers;
    if (data == "Sí"){ shuffleanswers = 1}
    if (data == "No"){ shuffleanswers = 0}
    return shuffleanswers;
}

function convertanswernumbering(data){
    var answernumbering;
    if (data == "a. b. c..."){ answernumbering = "abc"}
    if (data == "A. B. C..."){ answernumbering = "ABCD"}
    if (data == "1. 2. 3..."){ answernumbering = "123"}
    if (data == "i. ii. iii..."){ answernumbering = "iii"}
    if (data == "I. II. III..."){ answernumbering = "IIII"}
    if (data == "Sin numeraciÃ³n"){ answernumbering = "none"}
    return answernumbering;
}

 function convertyesno(data) {
     var yesno;
        if (data == "TRUE") {
            yesno = 1
        }
        if (data == "FALSE") {
            yesno = 0
        }
        return yesno;
 }

function convertdisponibility(data) {
   var disponibility;
    if (data == "Mostrar en la página del curso") {
        disponibility = 1
    }
    if (data == "Ocultar a estudiantes") {
        disponibility = 0
    }
    if (data == "Hacerlo disponible pero no mostrarlo en la página del curso") {
        disponibility = "-1"
    }
    
}

$(document).ready(function() {
    const numberofpages= GetURLParameter('numberofpages');
    if (numberofpages == undefined){
        alert("No tengo datos");
    } else {
        if (confirm('Vas a editar '+numberofpages+' páginas')) {
            leeJSON();
        }
    }
});
