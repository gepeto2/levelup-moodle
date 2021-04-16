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
    const activitytype = GetURLParameter('activitype');
    const sesskey = $("input[name=sesskey]").val();
    const numberofpages = GetURLParameter('numberofpages');
    urljson = "https://spreadsheets.google.com/feeds/list/"+sheet+"/"+page+"/public/values?alt=json";
    var datos = [];
    var idspreguntas = [];

    $.getJSON(urljson, function (data) {
        var entries = data.feed.entry;
        for(i = 0; i < entries.length; i++){
            if((entries[i].gsx$editar.$t) == "TRUE"){
                var idpagina = entries[i].gsx$idpagina.$t;
                var courseid = entries[i].gsx$courseid.$t;
                var seccion = entries[i].gsx$seccion.$t;
                var nombre = entries[i].gsx$nombre.$t;
                var descripcion = entries[i].gsx$descripcion.$t;
                var muestradescripcion = entries[i].gsx$muestradescripcion.$t;
                var contenido = entries[i].gsx$contenido.$t;
                var mostrarnombre = entries[i].gsx$mostrarnombre.$t;
                var mostrardescripcion = entries[i].gsx$mostrardescripcion.$t;
                var mostrarfecha = entries[i].gsx$mostrarfecha.$t;
                var disponibilidad = entries[i].gsx$disponibilidad.$t;
                var numeroid = entries[i].gsx$numeroid.$t;
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
                    printlastmodified: 1  
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
        var newquestion = dato[indice].id;
        var idpagina = dato[indice].idpagina;
        const hostname = window.location.hostname;
        const urlhost = "https://"+hostname+"/course/modedit.php?update=${idpagina}&return=0&sr=0";
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

$(document).ready(function() {
    const numberofquestions = GetURLParameter('numberofquestions');
    if (numberofquestions == undefined){
        alert("No tengo datos");
    } else {
        if (confirm('Vas a editar '+numberofquestions+' preguntas')) {
            leeJSON();
        }
    }
});
