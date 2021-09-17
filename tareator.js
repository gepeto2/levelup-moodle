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

        $.getJSON(urljson, function(data) {
                // var entries = data.feed.entry;
                  var entries = data.values;
                for (i = 0; i < entries.length; i++) {
                   if ((entries[i][1]) == "TRUE") {
                     var idtarea = entries[i][6];
                        var courseid = entries[i][5];
                        var nombre = entries[i][9];
                        var descripcion = "{mlang " + "es}" + entries[i][10] + "{mlang" + "}{mlang " + "ca}" +
                            entries[i+1][10] + "{mlang" + "}{mlang " + "ca_valencia}" +
                            entries[i+2][10] + "{mlang" + "}{mlang " + "en}" +
                            entries[i+3][10]+ "{mlang" + "}{mlang " + "eu}" +
                            entries[i+4][10] + "{mlang" + "}{mlang " + "gl}" +
                            entries[i+5][10] + "{mlang" + "}{mlang " + "fr}" +
                            entries[i+6][10] + "{mlang" + "}";
                        var muestradescripcion = convertyesno(entries[i][19]);
                        var permitirentregasdesde = convertyesno(entries[i][27]);
                        var fechadeentrega = convertyesno(entries[i][28]);
                        var fechalimite = convertyesno(entries[i][29]);
                        var recordarmecalificaren = convertyesno(entries[i][30]);
                        var assignsubmission_file_maxfiles = entries[i][31];
                        var archivosenviados = convertyesno(entries[i][32]);
                        var tipoarchivo;
                        var iconoarchivo;
                        var htmlarchivo1 = "";
                        var htmlarchivo2 = "";
                        var htmlarchivo3 = "";
                        var htmlarchivo4 = "";
                        var archivo1_es = entries[i][11];
                          if (entries[i+1][11] === undefined) {
                            var archivo1_ca = "";   } else {
                            var archivo1_ca = entries[i+1][11];}
                          if (entries[i+2][11] === undefined) {
                            var archivo1_ca_valencia = "";   } else {
                            var archivo1_ca_valencia = entries[i+2][11];}
                          if (entries[i+3][11] === undefined) {
                            var archivo1_en = "";   } else {
                            var archivo1_en = entries[i+3][11];}
                          if (entries[i+4][11] === undefined) {
                            var archivo1_eu = "";   } else {
                            var archivo1_eu = entries[i+4][11];}
                          if (entries[i+5][11] === undefined) {
                            var archivo1_gl = "";   } else {
                            var archivo1_gl = entries[i+5][11];}
                          if (entries[i+6][11] === undefined) {
                            var archivo1_fr = "";   } else {
                            var archivo1_fr = entries[i+6][11];}                     
                        var enlace1_es = entries[i][12];
                        var enlace1_ca = entries[i+1][12];
                        var enlace1_ca_valencia = entries[i + 2][12];
                        var enlace1_en = entries[i+3][12];
                        var enlace1_eu = entries[i+4][12];
                        var enlace1_gl = entries[i+5][12];
                        var enlace1_fr = entries[i+6][12];
                        var archivo2_es = entries[i][13];
                          if (entries[i+1][13] === undefined) {
                            var archivo2_ca = "";   } else {
                            var archivo2_ca = entries[i+1][13];}
                          if (entries[i+2][13] === undefined) {
                            var archivo2_ca_valencia = "";   } else {
                            var archivo2_ca_valencia = entries[i+2][13];}
                          if (entries[i+3][13] === undefined) {
                            var archivo2_en = "";   } else {
                            var archivo2_en = entries[i+3][13];}
                          if (entries[i+4][13] === undefined) {
                            var archivo2_eu = "";   } else {
                            var archivo2_eu = entries[i+4][13];}
                          if (entries[i+5][13] === undefined) {
                            var archivo2_gl = "";   } else {
                            var archivo2_gl = entries[i+5][13];}
                          if (entries[i+6][13] === undefined) {
                            var archivo2_fr = "";   } else {
                            var archivo2_fr = entries[i+6][13];}    
                        var enlace2_es = entries[i][14];
                        var enlace2_ca = entries[i+1][14];
                        var enlace2_ca_valencia = entries[i+2][14];
                        var enlace2_en = entries[i+3][14];
                        var enlace2_eu = entries[i+4][14];
                        var enlace2_gl = entries[i+5][14];
                        var enlace2_fr = entries[i+6][14];
                        var archivo3_es = entries[i][15];
                          if (entries[i+1][15] === undefined) {
                            var archivo3_ca = "";   } else {
                            var archivo3_ca = entries[i+1][15];}
                          if (entries[i+2][15] === undefined) {
                            var archivo3_ca_valencia = "";   } else {
                            var archivo3_ca_valencia = entries[i+2][15];}
                          if (entries[i+3][15] === undefined) {
                            var archivo3_en = "";   } else {
                            var archivo3_en = entries[i+3][15];}
                          if (entries[i+4][15] === undefined) {
                            var archivo3_eu = "";   } else {
                            var archivo3_eu = entries[i+4][15];}
                          if (entries[i+5][15] === undefined) {
                            var archivo3_gl = "";   } else {
                            var archivo3_gl = entries[i+5][15];}
                          if (entries[i+6][15] === undefined) {
                            var archivo3_fr = "";   } else {
                            var archivo3_fr = entries[i+6][15];}
                        var enlace3_es = entries[i][16];
                        var enlace3_ca = entries[i+1][16];
                        var enlace3_ca_valencia = entries[i+2][16];
                        var enlace3_en = entries[i+3][16];
                        var enlace3_eu = entries[i+4][16];
                        var enlace3_gl = entries[i+5][16];
                        var enlace3_fr = entries[i+6][16];
                        var archivo4_es = entries[i][17];
                          if (entries[i+1][17] === undefined) {
                            var archivo4_ca = "";   } else {
                            var archivo4_ca = entries[i+1][17];}
                          if (entries[i+2][17] === undefined) {
                            var archivo4_ca_valencia = "";   } else {
                            var archivo4_ca_valencia = entries[i+2][17];}
                          if (entries[i+3][17] === undefined) {
                            var archivo4_en = "";   } else {
                            var archivo4_en = entries[i+3][17];}
                          if (entries[i+4][17] === undefined) {
                            var archivo4_eu = "";   } else {
                            var archivo4_eu = entries[i+4][17];}
                          if (entries[i+5][17] === undefined) {
                            var archivo4_gl = "";   } else {
                            var archivo4_gl = entries[i+5][17];}
                          if (entries[i+6][17] === undefined) {
                            var archivo4_fr = "";   } else {
                            var archivo4_fr = entries[i+6][17];}
                        var enlace4_es = entries[i][18];
                        var enlace4_ca = entries[i+1][18];
                        var enlace4_ca_valencia = entries[i+2][18];
                        var enlace4_en = entries[i+3][18];
                        var enlace4_eu = entries[i+4][18];
                        var enlace4_gl = entries[i+5][18];
                        var enlace4_fr = entries[i+6][18];
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
                        tipoarchivo = archivo1_fr.substr(archivo1_fr.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo1_fr != "") {
                            htmlarchivo1 += "{mlang " + "fr}" + "<img src=" + iconoarchivo + " alt=" + archivo1_fr + "width='20' height='28'><a href=" + enlace1_fr + " target='_blank'> " + archivo1_fr + "</a><p></p>{mlang}";
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
                        tipoarchivo = archivo2_fr.substr(archivo1_fr.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo2_fr != "") {
                            htmlarchivo2 += "{mlang " + "fr}" + "<img src=" + iconoarchivo + " alt=" + archivo2_fr + "width='20' height='28'><a href=" + enlace2_fr + " target='_blank'> " + archivo2_fr + "</a><p></p>{mlang}";
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
                        tipoarchivo = archivo3_fr.substr(archivo3_fr.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo3_fr != "") {
                            htmlarchivo3 += "{mlang " + "fr}" + "<img src=" + iconoarchivo + " alt=" + archivo3_fr + "width='20' height='28'><a href=" + enlace3_fr + " target='_blank'> " + archivo3_fr + "</a><p></p>{mlang}";
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
                        tipoarchivo = archivo4_fr.substr(archivo4_fr.lastIndexOf('.') + 1);
                        iconoarchivo = fileicon(tipoarchivo);
                        if (archivo4_fr != "") {
                            htmlarchivo4 += "{mlang " + "fr}" + "<img src=" + iconoarchivo + " alt=" + archivo4_fr + "width='20' height='28'><a href=" + enlace4_fr + " target='_blank'> " + archivo4_fr + "</a><p></p>{mlang}";
                        }
                        descripcion = descripcion + htmlarchivo1 + htmlarchivo2 + htmlarchivo3 + htmlarchivo4;
                        var feedback_comments = convertyesno(entries[i][20]);
                        var gradetype = convertgradetype(entries[i][21]);
                        var maxgrade = entries[i][22];
                        var advancedgradingmethod_submissions = convertadvancedgradingmethod(entries[i][23]);
                        var gradepass = entries[i][26];
                        var visible = convertdisponibilidad(entries[i][33]);
                        var completion = convertcompletion(entries[i][34]);
                        var completionview = convertyesno(entries[i][35]);
                        var completionusegrade = convertyesno(entries[i][36]);
                        var completionsubmit = convertyesno(entries[i][37]);
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
                            assignfeedback_comments_enabled: feedback_comments,
                            "grade[modgrade_type]": gradetype,
                            "grade[modgrade_point]": maxgrade,
                            advancedgradingmethod_submissions: advancedgradingmethod_submissions,
                            gradepass: gradepass,
                            "allowsubmissionsfromdate[enabled]": permitirentregasdesde,
                            assignsubmission_file_maxfiles: assignsubmission_file_maxfiles,
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
    //                    idspreguntas.push(nombre);
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
        if (confirm('Vas a editar ' + numberofpages + ' tareas')) {
            leeJSON();
        }
    }
});
