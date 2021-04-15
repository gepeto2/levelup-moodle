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
                var idpágina = entries[i].gsx$idpagina.$t;
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
                    mform_isexpanded_id_answerhdr: 1,
                    noanswers: noanswers,
                    numhints: 2,                        
                    id: idpregunta,
                    inpopup: "",
                            cmid:"",
                            courseid: courseid,
                            scrollpos:0,
                            appendqnumstring:"",
                            qtype: tipo,
                            makecopy:0,
                            sesskey: sesskey,
                            _qf__qtype_multichoice_edit_form:1,
                            mform_isexpanded_id_generalheader:1,
                            mform_isexpanded_id_combinedfeedbackhdr:0,
                            mform_isexpanded_id_multitriesheader:0,
                            mform_isexpanded_id_tagsheader:0,
                            category: idcategoria,
                            name: nombre,
                            "questiontext[text]": enunciado,
                            "questiontext[format]": 1,
                            defaultmark: defaultmark,
                            "generalfeedback[text]": generalfeedback,
                            "generalfeedback[format]": 1,
                            single: single,
                            shuffleanswers: shuffleanswers,
                            answernumbering: answernumbering,
                            "answer[0][text]": eleccion1,
                            "answer[0][format]": 1,
                            "fraction[0]": fraction0,
                            "feedback[0][text]": retroalimentacion1,
                            "feedback[0][format]": 1,
                            "feedback[1][text]": retroalimentacion2,
                            "feedback[1][format]": 1,
                            "feedback[2][text]": retroalimentacion3,
                            "feedback[2][format]": 1,
                            "feedback[3][text]": retroalimentacion4,
                            "feedback[3][format]": 1,
                            "feedback[4][text]": retroalimentacion5,
                            "feedback[4][format]": 1,
                            "feedback[5][text]": retroalimentacion6,
                            "feedback[5][format]": 1,
                            "feedback[6][text]": retroalimentacion7,
                            "feedback[6][format]": 1,
                            "feedback[7][text]": retroalimentacion8,
                            "feedback[7][format]": 1,
                            "answer[1][text]": eleccion2,
                            "answer[1][format]": 1,
                            "fraction[1]": fraction1,
                            "answer[2][text]": eleccion3,
                            "answer[2][format]": 1,
                            "fraction[2]": fraction2,
                            "answer[3][text]": eleccion4,
                            "answer[3][format]": 1,
                            "fraction[3]": fraction3,
                            "answer[4][text]": eleccion5,
                            "answer[4][format]": 1,
                            "fraction[4]": fraction4,
                            "answer[5][text]": eleccion6,
                            "answer[5][format]": 1,
                            "fraction[5]": fraction5,
                            "answer[6][text]": eleccion7,
                            "answer[6][format]": 1,
                            "fraction[6]": fraction6,
                            "answer[7][text]": eleccion8,
                            "answer[7][format]": 1,
                            "fraction[7]": fraction7,
                            "correctfeedback[text]": retroalimentacioncorrecta,
                            "correctfeedback[format]": 1,
                            "partiallycorrectfeedback[text]": retroalimentacionparcial,
                            "partiallycorrectfeedback[format]": 1,
                            "incorrectfeedback[text]": retroalimentacionincorrecta,
                            "incorrectfeedback[format]": 1
                        };
                        datos.push(obj);
                        idspreguntas.push(nombre);
                    }

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
        const hostname = window.location.hostname;
        const urlhost = "https://"+hostname+"/question/question.php";
      $.ajax({
        url: urlhost,
        method: "POST",
        data: dato[indice]
        }).done(function(data) {
            $( ".no-overflow" ).append( `<p>Pregunta ${indice} editada</p>` );
            if (newquestion == ""){
                var questionname = dato[indice].name;
                var courseid = dato[indice].courseid;
                var category = dato[indice].category;
                $.get('https://'+hostname+'/question/edit.php?courseid=${courseid}&cat=${category}' , function(datas) {
                    var idpreg = $("label:contains("+questionname+")", datas).attr('for');
                    idpreg = idpreg.replace("checkq", "");
                    googledata.push(idpreg);
                    googledata.push(questionname);
                });
            }
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
