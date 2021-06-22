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
    const numberofpages = GetURLParameter('numberofpages');
    var urljson = "https://spreadsheets.google.com/feeds/list/" + sheet + "/" + page + "/public/values?alt=json";
    var datos = [];
    var idspreguntas = [];

        $.getJSON(urljson, function(data) {
                var entries = data.feed.entry;
                for (i = 0; i < entries.length; i++) {
                    if ((entries[i].gsx$editar.$t) == "TRUE") {
                        var idtarea = entries[i].gsx$idtarea.$t;
                        var courseid = entries[i].gsx$courseid.$t;
                        var nombre = entries[i].gsx$nombre.$t;
                        var descripcion = "{mlang " + "es}" + entries[i].gsx$descripcion.$t + "{mlang" + "}{mlang " + "ca}" +
                            entries[i + 1].gsx$descripcion.$t + "{mlang" + "}{mlang " + "ca_valencia}" +
                            entries[i + 2].gsx$descripcion.$t + "{mlang" + "}{mlang " + "en}" +
                            entries[i + 3].gsx$descripcion.$t + "{mlang" + "}{mlang " + "eu}" +
                            entries[i + 4].gsx$descripcion.$t + "{mlang" + "}{mlang " + "gl}" +
                            entries[i + 5].gsx$descripcion.$t + "{mlang" + "}";
                        var muestradescripcion = convertyesno(entries[i].gsx$muestradescripcion.$t);
                        var permitirentregasdesde = convertyesno(entries[i].gsx$permitirentregasdesde.$t);
                        var fechadeentrega = convertyesno(entries[i].gsx$fechadeentrega.$t);
                        var fechalimite = convertyesno(entries[i].gsx$fechalimite.$t);
                        var recordarmecalificaren = convertyesno(entries[i].gsx$recordarmecalificaren.$t);
                        var archivosenviados = convertyesno(entries[i].gsx$archivosenviados.$t);
                        var tipoarchivo;
                        var iconoarchivo;
                        var htmlarchivo1 = "";
                        var htmlarchivo2 = "";
                        var htmlarchivo3 = "";
                        var htmlarchivo4 = "";
                        var archivo1_es = entries[i].gsx$nombrearchivo1.$t;
                        var archivo1_ca = entries[i + 1].gsx$nombrearchivo1.$t;
                        var archivo1_ca_valencia = entries[i + 2].gsx$nombrearchivo1.$t;
                        var archivo1_en = entries[i + 3].gsx$nombrearchivo1.$t;
                        var archivo1_eu = entries[i + 4].gsx$nombrearchivo1.$t;
                        var archivo1_gl = entries[i + 5].gsx$nombrearchivo1.$t;
                        var enlace1_es = entries[i].gsx$enlacearchivo1.$t;
                        var enlace1_ca = entries[i + 1].gsx$enlacearchivo1.$t;
                        var enlace1_ca_valencia = entries[i + 2].gsx$enlacearchivo1.$t;
                        var enlace1_en = entries[i + 3].gsx$enlacearchivo1.$t;
                        var enlace1_eu = entries[i + 4].gsx$enlacearchivo1.$t;
                        var enlace1_gl = entries[i + 5].gsx$enlacearchivo1.$t;
                        var archivo2_es = entries[i].gsx$nombrearchivo2.$t;
                        var archivo2_ca = entries[i + 1].gsx$nombrearchivo2.$t;
                        var archivo2_ca_valencia = entries[i + 2].gsx$nombrearchivo2.$t;
                        var archivo2_en = entries[i + 3].gsx$nombrearchivo2.$t;
                        var archivo2_eu = entries[i + 4].gsx$nombrearchivo2.$t;
                        var archivo2_gl = entries[i + 5].gsx$nombrearchivo2.$t;
                        var enlace2_es = entries[i].gsx$enlacearchivo2.$t;
                        var enlace2_ca = entries[i + 1].gsx$enlacearchivo2.$t;
                        var enlace2_ca_valencia = entries[i + 2].gsx$enlacearchivo2.$t;
                        var enlace2_en = entries[i + 3].gsx$enlacearchivo2.$t;
                        var enlace2_eu = entries[i + 4].gsx$enlacearchivo2.$t;
                        var enlace2_gl = entries[i + 5].gsx$enlacearchivo2.$t;
                        var archivo3_es = entries[i].gsx$nombrearchivo3.$t;
                        var archivo3_ca = entries[i + 1].gsx$nombrearchivo3.$t;
                        var archivo3_ca_valencia = entries[i + 2].gsx$nombrearchivo3.$t;
                        var archivo3_en = entries[i + 3].gsx$nombrearchivo3.$t;
                        var archivo3_eu = entries[i + 4].gsx$nombrearchivo3.$t;
                        var archivo3_gl = entries[i + 5].gsx$nombrearchivo3.$t;
                        var enlace3_es = entries[i].gsx$enlacearchivo3.$t;
                        var enlace3_ca = entries[i + 1].gsx$enlacearchivo3.$t;
                        var enlace3_ca_valencia = entries[i + 2].gsx$enlacearchivo3.$t;
                        var enlace3_en = entries[i + 3].gsx$enlacearchivo3.$t;
                        var enlace3_eu = entries[i + 4].gsx$enlacearchivo3.$t;
                        var enlace3_gl = entries[i + 5].gsx$enlacearchivo3.$t;
                        var archivo4_es = entries[i].gsx$nombrearchivo4.$t;
                        var archivo4_ca = entries[i + 1].gsx$nombrearchivo4.$t;
                        var archivo4_ca_valencia = entries[i + 2].gsx$nombrearchivo4.$t;
                        var archivo4_en = entries[i + 3].gsx$nombrearchivo4.$t;
                        var archivo4_eu = entries[i + 4].gsx$nombrearchivo4.$t;
                        var archivo4_gl = entries[i + 5].gsx$nombrearchivo4.$t;
                        var enlace4_es = entries[i].gsx$enlacearchivo4.$t;
                        var enlace4_ca = entries[i + 1].gsx$enlacearchivo4.$t;
                        var enlace4_ca_valencia = entries[i + 2].gsx$enlacearchivo4.$t;
                        var enlace4_en = entries[i + 3].gsx$enlacearchivo4.$t;
                        var enlace4_eu = entries[i + 4].gsx$enlacearchivo4.$t;
                        var enlace4_gl = entries[i + 5].gsx$enlacearchivo4.$t;
                        tipoarchivo = archivo1_es.substr(archivo1_es.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo1_es != "") {
                            htmlarchivo1 += "{mlang " + "es}" + "<img src=" + iconoarchivo + " alt=" + archivo1_es + "width='20' height='28'><a href=" + enlace1_es + " target='_blank'> " + archivo1_es + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo1_ca.substr(archivo1_ca.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo1_ca != "") {
                            htmlarchivo1 += "{mlang " + "ca}" + "<img src=" + iconoarchivo + " alt=" + archivo1_ca + "width='20' height='28'><a href=" + enlace1_ca + " target='_blank'> " + archivo1_ca + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo1_ca_valencia.substr(archivo1_ca_valencia.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo1_ca_valencia != "") {
                            htmlarchivo1 += "{mlang " + "ca_valencia}" + "<img src=" + iconoarchivo + " alt=" + archivo1_ca_valencia + "width='20' height='28'><a href=" + enlace1_ca_valencia + " target='_blank'> " + archivo1_ca_valencia + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo1_en.substr(archivo1_en.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo1_en != "") {
                            htmlarchivo1 += "{mlang " + "en}" + "<img src=" + iconoarchivo + " alt=" + archivo1_en + "width='20' height='28'><a href=" + enlace1_en + " target='_blank'> " + archivo1_en + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo1_eu.substr(archivo1_eu.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo1_eu != "") {
                            htmlarchivo1 += "{mlang " + "eu}" + "<img src=" + iconoarchivo + " alt=" + archivo1_eu + "width='20' height='28'><a href=" + enlace1_eu + " target='_blank'> " + archivo1_eu + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo1_gl.substr(archivo1_gl.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo1_gl != "") {
                            htmlarchivo1 += "{mlang " + "gl}" + "<img src=" + iconoarchivo + " alt=" + archivo1_gl + "width='20' height='28'><a href=" + enlace1_gl + " target='_blank'> " + archivo1_gl + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo2_es.substr(archivo2_es.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo2_es != "") {
                            htmlarchivo2 += "{mlang " + "es}" + "<img src=" + iconoarchivo + " alt=" + archivo2_es + "width='20' height='28'><a href=" + enlace2_es + " target='_blank'> " + archivo2_es + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo2_ca.substr(archivo2_ca.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo2_ca != "") {
                            htmlarchivo2 += "{mlang " + "ca}" + "<img src=" + iconoarchivo + " alt=" + archivo2_ca + "width='20' height='28'><a href=" + enlace2_ca + " target='_blank'> " + archivo2_ca + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo2_ca_valencia.substr(archivo2_ca_valencia.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo2_ca_valencia != "") {
                            htmlarchivo2 += "{mlang " + "ca_valencia}" + "<img src=" + iconoarchivo + " alt=" + archivo2_ca_valencia + "width='20' height='28'><a href=" + enlace2_ca_valencia + " target='_blank'> " + archivo2_ca_valencia + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo2_en.substr(archivo2_en.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo2_en != "") {
                            htmlarchivo2 += "{mlang " + "en}" + "<img src=" + iconoarchivo + " alt=" + archivo2_en + "width='20' height='28'><a href=" + enlace2_en + " target='_blank'> " + archivo2_en + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo2_eu.substr(archivo2_eu.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo2_eu != "") {
                            htmlarchivo2 += "{mlang " + "eu}" + "<img src=" + iconoarchivo + " alt=" + archivo2_eu + "width='20' height='28'><a href=" + enlace2_eu + " target='_blank'> " + archivo2_eu + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo2_gl.substr(archivo2_gl.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo2_gl != "") {
                            htmlarchivo2 += "{mlang " + "gl}" + "<img src=" + iconoarchivo + " alt=" + archivo2_gl + "width='20' height='28'><a href=" + enlace2_gl + " target='_blank'> " + archivo2_gl + "</a><p></p>{mlang}";
                        }

                        tipoarchivo = archivo3_es.substr(archivo3_es.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo3_es != "") {
                            htmlarchivo3 += "{mlang " + "es}" + "<img src=" + iconoarchivo + " alt=" + archivo3_es + "width='20' height='28'><a href=" + enlace3_es + " target='_blank'> " + archivo3_es + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo3_ca.substr(archivo3_ca.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo3_ca != "") {
                            htmlarchivo3 += "{mlang " + "ca}" + "<img src=" + iconoarchivo + " alt=" + archivo3_ca + "width='20' height='28'><a href=" + enlace3_ca + " target='_blank'> " + archivo3_ca + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo3_ca_valencia.substr(archivo3_ca_valencia.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo3_ca_valencia != "") {
                            htmlarchivo3 += "{mlang " + "ca_valencia}" + "<img src=" + iconoarchivo + " alt=" + archivo3_ca_valencia + "width='20' height='28'><a href=" + enlace3_ca_valencia + " target='_blank'> " + archivo3_ca_valencia + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo3_en.substr(archivo3_en.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo3_en != "") {
                            htmlarchivo3 += "{mlang " + "en}" + "<img src=" + iconoarchivo + " alt=" + archivo3_en + "width='20' height='28'><a href=" + enlace3_en + " target='_blank'> " + archivo3_en + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo3_eu.substr(archivo3_eu.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo3_eu != "") {
                            htmlarchivo3 += "{mlang " + "eu}" + "<img src=" + iconoarchivo + " alt=" + archivo3_eu + "width='20' height='28'><a href=" + enlace3_eu + " target='_blank'> " + archivo3_eu + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo3_gl.substr(archivo3_gl.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo3_gl != "") {
                            htmlarchivo3 += "{mlang " + "gl}" + "<img src=" + iconoarchivo + " alt=" + archivo3_gl + "width='20' height='28'><a href=" + enlace3_gl + " target='_blank'> " + archivo3_gl + "</a><p></p>{mlang}";
                        }

                        tipoarchivo = archivo4_es.substr(archivo4_es.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo4_es != "") {
                            htmlarchivo4 += "{mlang " + "es}" + "<img src=" + iconoarchivo + " alt=" + archivo4_es + "width='20' height='28'><a href=" + enlace4_es + " target='_blank'> " + archivo4_es + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo4_ca.substr(archivo4_ca.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo4_ca != "") {
                            htmlarchivo4 += "{mlang " + "ca}" + "<img src=" + iconoarchivo + " alt=" + archivo4_ca + "width='20' height='28'><a href=" + enlace4_ca + " target='_blank'> " + archivo4_ca + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo4_ca_valencia.substr(archivo4_ca_valencia.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo4_ca_valencia != "") {
                            htmlarchivo4 += "{mlang " + "ca_valencia}" + "<img src=" + iconoarchivo + " alt=" + archivo4_ca_valencia + "width='20' height='28'><a href=" + enlace4_ca_valencia + " target='_blank'> " + archivo4_ca_valencia + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo4_en.substr(archivo4_en.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo4_en != "") {
                            htmlarchivo4 += "{mlang " + "en}" + "<img src=" + iconoarchivo + " alt=" + archivo4_en + "width='20' height='28'><a href=" + enlace4_en + " target='_blank'> " + archivo4_en + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo4_eu.substr(archivo4_eu.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo4_eu != "") {
                            htmlarchivo4 += "{mlang " + "eu}" + "<img src=" + iconoarchivo + " alt=" + archivo4_eu + "width='20' height='28'><a href=" + enlace4_eu + " target='_blank'> " + archivo4_eu + "</a><p></p>{mlang}";
                        }
                        tipoarchivo = archivo4_gl.substr(archivo4_gl.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo4_gl != "") {
                            htmlarchivo4 += "{mlang " + "gl}" + "<img src=" + iconoarchivo + " alt=" + archivo4_gl + "width='20' height='28'><a href=" + enlace4_gl + " target='_blank'> " + archivo4_gl + "</a><p></p>{mlang}";
                        }
                        descripcion = descripcion + htmlarchivo1 + htmlarchivo2 + htmlarchivo3 + htmlarchivo4;
                        var gradetype = convertgradetype(entries[i].gsx$tipocalificacion.$t);
                        var maxgrade = entries[i].gsx$calificacionmaxima.$t;
                        var advancedgradingmethod_submissions = convertadvancedgradingmethod(entries[i].gsx$metodocalificacion.$t);
                        var gradepass = entries[i].gsx$calificacionaprobar.$t;
                        var visible = convertdisponibilidad(entries[i].gsx$disponibilidad.$t);
                        var completion = convertcompletion(entries[i].gsx$finalizacionactividad.$t);
                        var completionview = convertyesno(entries[i].gsx$requerirver.$t);
                        var completionusegrade = convertyesno(entries[i].gsx$requerircalificacion.$t);
                        var completionsubmit = convertyesno(entries[i].gsx$requerirentrega.$t);
                        var obj = {
                            mform_isexpanded_id_availability: 1,
                            ggbparameters: "",
                            ggbviews: "",
                            ggbcodebaseversion: "",
                            mform_isexpanded_id_submissiontypes: 1,
                            completionunlocked: 1,
                            course: courseid,
                            coursemodule: idtarea,
                            module: 1,
                            modulename: "assign",
                            instance: "",
                            add: 0,
                            update: idtarea,
                            return: 0,
                            sr: 0,
                            sesskey: sesskey,
                            _qf__mod_assign_mod_form: 1,
                            mform_isexpanded_id_general: 1,
                            mform_isexpanded_id_feedbacktypes: 0,
                            mform_isexpanded_id_submissionsettings: 0,
                            mform_isexpanded_id_groupsubmissionsettings: 0,
                            mform_isexpanded_id_notifications: 0,
                            mform_isexpanded_id_modstandardgrade: 0,
                            mform_isexpanded_id_modstandardelshdr: 0,
                            mform_isexpanded_id_availabilityconditionsheader: 0,
                            mform_isexpanded_id_activitycompletionheader: 0,
                            mform_isexpanded_id_tagshdr: 0,
                            mform_isexpanded_id_competenciessection: 0,
                            name: nombre,
                            "introeditor[format]": 1,
                            "introeditor[text]": descripcion,
                            showdescription: 0,
                            "grade[modgrade_type]": gradetype,
                            "grade[modgrade_point]": maxgrade,
                            advancedgradingmethod_submissions: advancedgradingmethod_submissions,
                            gradepass: gradepass,
                            cmidnumber: nombre,
                            "allowsubmissionsfromdate[enabled]": permitirentregasdesde,
                            "duedate[enabled]": fechadeentrega,
                            "cutoffdate[enabled]": fechalimite,
                            "gradingduedate[enabled]": recordarmecalificaren,
                            assignsubmission_file_enabled: archivosenviados,
                            visible: visible,
                            availabilityconditionsjson: "",
                            completion: completion,
                            completionview: completionview,
                            completionusegrade: completionusegrade,
                            completionsubmit: completionsubmit
                        };
                        datos.push(obj);
                        idspreguntas.push(nombre);
                    }

                }
            })
            .done(function() {
                enviar(datos, 0);
            })
    }

    function enviar(dato, indice) {
        var googledata = [];
        if (indice < dato.length) {
            var idpagina = dato[indice].coursemodule;
            const hostname = window.location.hostname;
            const urlhost = "https://" + hostname + "/course/modedit.php";
            $.ajax({
                url: urlhost,
                method: "POST",
                data: dato[indice]
            }).done(function(data) {
                indice++;
                $(".no-overflow").append(`<p>Tarea${indice} editada</p>`);
                enviar(dato, indice);
            });
        }
    }

    function sendGoogle(datos) {
        window.location.replace("https://script.google.com/macros/s/AKfycbxt4vgLE_GawyA0aRO3gEyW2ghGQANB1P5i66PbUQCaVL9xCiPfFnnWT3Mo-d7o7rAjIA/dev?" + datos);
    }

    function convertgradetype(data) {
        var gradetype;
        if (data == "Ninguna") {
            gradetype = "none"
        }
        if (data == "Escala") {
            gradetype = "scale"
        }
        if (data == "Puntuación") {
            gradetype = "point"
        }
        return gradetype;
    }

    function convertadvancedgradingmethod(data) {
        var method;
        if (data == "Calificación simple directa") {
            method = ""
        }
        if (data == "Guía de evaluación") {
            method = "guide"
        }
        if (data == "Rúbrica") {
            method = "rubric"
        }
        return method;
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

    function convertcompletion(data) {
        var completion;
        if (data == "No indicar finalización de la actividad") {
            completion = 0
        }
        if (data == "Los estudiantes pueden marcar manualmente la actividad como completada") {
            completion = 1
        }
        if (data == "Mostrar la actividad como completada cuando se cumplan las condiciones") {
            completion = 2
        }
        return completion;
    }

    function convertdisponibilidad(data) {
        var visible;
        if (data == "Mostrar en la página del curso") {
            visible = 1
        }
        if (data == "Ocultar a estudiantes") {
            visible = 0
        }
        if (data == "Hacerlo disponible pero no mostrarlo en la página del curso") {
            visible = "-1"
        }
        return visible;
    }

    function fileicon(tipoarchivo) {
        var iconoarchivo;
        if (tipoarchivo == 'pdf') {
            iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg';
        }
        if (tipoarchivo == 'pptx' || tipoarchivo == 'ppt') {
            iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/.pptx_icon_%282019%29.svg';
        }
        if (tipoarchivo == 'docx' || tipoarchivo == 'doc') {
            iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg';
        }
        if (tipoarchivo == 'jpg' || tipoarchivo == 'jpeg' || tipoarchivo == 'png') {
            iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/0/08/Image_tagging_icon_01.svg';
        }
        if (tipoarchivo == 'xlsx' || tipoarchivo == 'xls') {
            iconoarchivo = 'https://upload.wikimedia.org/wikipedia/commons/f/f3/.xlsx_icon.svg';
        }
        return iconoarchivo;
    }

$(document).ready(function() {
    const numberofpages = GetURLParameter('numberofpages');
    if (numberofpages == undefined) {
        alert("No tengo datos");
    } else {
        if (confirm('Vas a editar ' + numberofpages + ' páginas')) {
            leeJSON();
        }
    }
});
