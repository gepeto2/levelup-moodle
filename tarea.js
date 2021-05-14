//Coge el id de la tarea
function getCmid(){
var cmid;
var classList = $('#page-mod-assign-view').attr('class').split(/\s+/);
$.each(classList, function(index, item) {
    if (item.indexOf('cmid-') === 0) {
        cmid = item;
        cmid = cmid.split('-')[1];
    }
 });
  return cmid;
}

//Coge la url para buscar el JSON
function geturl(){
    var course;
    var classList = $('#page-mod-assign-view').attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
        if (item.indexOf('course-') === 0) {
            course = item;
            course = course.split('-')[1];
        }
    });
    var urlsite = window.location.origin;
    var urlroot = urlsite+"/course/view.php?id="+course;
    return urlroot;
}

//Coge el idioma seleccionado
function getlang(){
   var lang = $('.yui3-js-enabled').attr('lang');
   return lang;
}

function fileicon(tipoarchivo){
    var iconoarchivo;
    if (tipoarchivo == 'pdf') {
        iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg';
    } 
    if (tipoarchivo == 'pptx'||tipoarchivo == 'ppt') {
        iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/.pptx_icon_%282019%29.svg';      
    }
    if (tipoarchivo == 'docx'||tipoarchivo == 'doc') {
        iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg';
    }
    if (tipoarchivo == 'jpg'||tipoarchivo == 'jpeg'||tipoarchivo =='png') {
        iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/0/08/Image_tagging_icon_01.svg';
    }
    if (tipoarchivo == 'xlsx'||tipoarchivo == 'xls') {
        iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/.xlsx_icon.svg';      
    }
    return iconoarchivo;
}

$( document ).ready(function() {
    $(".box").css("display", "block");
    var cmid = getCmid();
    var lang = getlang();
    var urlroot = geturl();
    var texto;
    var nombrearchivo1;
    var enlacearchivo1;

  //Coge en enlace del JSON
  $.get(urlroot, function(result){
        var obj = $(result).find('body');
        var urljson = $(result).find(".instancename:contains('Tareas')").parent().attr('href');

  //Lee el JSON, filtra por id de la tarea y por idioma y guarda datos en variables
    $.getJSON(urljson, function (data) {
        var entries = data.feed.entry;
            for(i = 0; i < entries.length; i++){
                if((entries[i].gsx$idtarea.$t) == cmid){
                    if((entries[i].gsx$idioma.$t) == lang){
                        var descripcion = entries[i].gsx$descripcion.$t;
                        texto = descripcion;
                        //texto = "{mlang "+lang+"}"+descripcion+"{mlang}";
                        nombrearchivo1 = entries[i].gsx$nombrearchivo1.$t;
                        enlacearchivo1 = entries[i].gsx$enlacearchivo1.$t;
                        nombrearchivo2 = entries[i].gsx$nombrearchivo2.$t;
                        enlacearchivo2 = entries[i].gsx$enlacearchivo2.$t;
                        nombrearchivo3 = entries[i].gsx$nombrearchivo3.$t;
                        enlacearchivo3 = entries[i].gsx$enlacearchivo3.$t;
                        nombrearchivo4 = entries[i].gsx$nombrearchivo4.$t;
                        enlacearchivo4 = entries[i].gsx$enlacearchivo4.$t;
                    }
                }
            }
  //Actualiza los elementos 
  if (texto === undefined|| texto == '') {
     if (lang == 'es') {
        $("#tarea").html("<p style='color:#FF0000';><b>No hay ninguna tarea con este identificador en el archivo de datos</b></p>");
     } else if (lang == 'ca') {
        $("#tarea").html("<p style='color:#FF0000';><b>No hi ha cap tasca amb aquest identificador a l'arxiu de dades</b></p>");
     } else if (lang == 'ca-valencia') {
        $("#tarea").html("<p style='color:#FF0000';><b>No hi ha cap tasca amb aquest identificador a l'arxiu de dades</b></p>");
     } else if (lang == 'en') {
        $("#tarea").html("<p style='color:#FF0000';><b>There is no task with this identifier in the data file</b></p>");
     } else if (lang == 'eu') {
        $("#tarea").html("<p style='color:#FF0000';><b>Datu fitxategian ez dago zereginik identifikatzaile honekin</b></p>");
     } else if (lang == 'gl') {
        $("#tarea").html("<p style='color:#FF0000';><b>Non hai ningunha tarefa con este identificador no ficheiro de datos</b></p>");
     }
  } else {
    $("#tarea").html(texto);
     if (nombrearchivo1 != ""){
        var tipoarchivo1 = nombrearchivo1.substr(nombrearchivo1.lastIndexOf('.') + 1);
        var iconoarchivo1 = fileicon(tipoarchivo1);
        $("#archivo1").html("<img src="+iconoarchivo1+" alt="+nombrearchivo1+"width='20' height='28'><a href="+enlacearchivo1+" target='_blank'> "+nombrearchivo1+"</a><p></p>");
     }
     if (nombrearchivo2 != ""){
        var tipoarchivo2 = nombrearchivo2.substr(nombrearchivo2.lastIndexOf('.') + 1);
        var iconoarchivo2 = fileicon(tipoarchivo2);
        $("#archivo2").html("<img src="+iconoarchivo2+" alt="+nombrearchivo2+"width='20' height='28'><a href="+enlacearchivo2+" target='_blank'> "+nombrearchivo2+"</a><p></p>");
     }
     if (nombrearchivo3 != ""){
        var tipoarchivo3 = nombrearchivo3.substr(nombrearchivo3.lastIndexOf('.') + 1);
        var iconoarchivo3 = fileicon(tipoarchivo3);
        $("#archivo3").append("<img src="+iconoarchivo3+" alt="+nombrearchivo3+"width='20' height='28'><a href="+enlacearchivo3+" target='_blank'> "+nombrearchivo3+"</a></div>");
     }
     if (nombrearchivo4 != ""){
        var tipoarchivo4 = nombrearchivo4.substr(nombrearchivo4.lastIndexOf('.') + 1);
        var iconoarchivo4 = fileicon(tipoarchivo4);
        $("#archivo4").append("<img src="+iconoarchivo4+" alt="+nombrearchivo4+"width='20' height='28'><a href="+enlacearchivo4+" target='_blank'> "+nombrearchivo4+"</a></div>");
     }
  }
    });
  });
});
