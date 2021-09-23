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
    const questiontype = GetURLParameter('questiontype');
    const sesskey = $("input[name=sesskey]").val();
    const key = GetURLParameter('key');
    const numberofpages = GetURLParameter('numberofpages');
    var urljson = "https://sheets.googleapis.com/v4/spreadsheets/"+sheet+"/values/"+page+"?key="+key;
    var datos = [];
    var idspreguntas = [];

    $.getJSON(urljson, function (data) {
        var entries = data.values;
        for(i = 0; i < entries.length; i++){
            if((entries[i][1]) == "TRUE"){
                var idpregunta = entries[i][6];
                var nombre = entries[i][14];
                var tipo = entries[i][8];
                var idcategoria = entries[i][10];
                var courseid = entries[i][5];
                if((entries[i][2]) == "TRUE"){
                    var enunciado = "{mlang es}"+entries[i][15]+"{mlang}{mlang ca}"
                    +entries[i+1][15]+"{mlang}{mlang ca_valencia}"
                    +entries[i+2][15]+"{mlang}{mlang en}"
                    +entries[i+3][15]+"{mlang}{mlang eu}"
                    +entries[i+4][15]+"{mlang}{mlang gl}"
                    +entries[i+5][15]+"{mlang}";
                    var generalfeedback = "{mlang es}"+entries[i][17]+"{mlang}{mlang ca}"
                    +entries[i+1][17]+"{mlang}{mlang ca_valencia}"
                    +entries[i+2][17]+"{mlang}{mlang en}"
                    +entries[i+3][17]+"{mlang}{mlang eu}"
                    +entries[i+4][17]+"{mlang}{mlang gl}"
                    +entries[i+5][17]+"{mlang}";
                } else {
                    var idioma = entries[i][3].$t;
                    var enunciado = "{mlang "+idioma+"}"+entries[i][15]+"{mlang}";
                }
                    var defaultmark = entries[i][16];
                //    var tags = entries[i].gsx$tags.$t;
                    if (questiontype == "multichoice") {
                        if((entries[i][2]) == "TRUE"){
                            var eleccion1 = "{mlang es}"+entries[i][22]+"{mlang}{mlang ca}"
                            +entries[i+1][22]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][22]+"{mlang}{mlang en}"
                            +entries[i+3][22]+"{mlang}{mlang eu}"
                            +entries[i+4][22]+"{mlang}{mlang gl}"
                            +entries[i+5][22]+"{mlang}";
                            var eleccion2 = "{mlang es}"+entries[i][25]+"{mlang}{mlang ca}"
                            +entries[i+1][25]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][25]+"{mlang}{mlang en}"
                            +entries[i+3][25]+"{mlang}{mlang eu}"
                            +entries[i+4][25]+"{mlang}{mlang gl}"
                            +entries[i+5][25]+"{mlang}";
                            var eleccion3 = "{mlang es}"+entries[i][28]+"{mlang}{mlang ca}"
                            +entries[i+1][28]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][28]+"{mlang}{mlang en}"
                            +entries[i+3][28]+"{mlang}{mlang eu}"
                            +entries[i+4][28]+"{mlang}{mlang gl}"
                            +entries[i+5][28]+"{mlang}";
                            var eleccion4 = "{mlang es}"+entries[i][31]+"{mlang}{mlang ca}"
                            +entries[i+1][31]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][31]+"{mlang}{mlang en}"
                            +entries[i+3][31]+"{mlang}{mlang eu}"
                            +entries[i+4][31]+"{mlang}{mlang gl}"
                            +entries[i+5][31]"{mlang}";
                            var eleccion5 = "{mlang es}"+entries[i][34]+"{mlang}{mlang ca}"
                            +entries[i+1][34]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][34]+"{mlang}{mlang en}"
                            +entries[i+3][34]+"{mlang}{mlang eu}"
                            +entries[i+4][34]+"{mlang}{mlang gl}"
                            +entries[i+5][34]+"{mlang}";
                            var eleccion6 = "{mlang es}"+entries[i][37]+"{mlang}{mlang ca}"
                            +entries[i+1][37]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][37]+"{mlang}{mlang en}"
                            +entries[i+3][37]+"{mlang}{mlang eu}"
                            +entries[i+4][37]+"{mlang}{mlang gl}"
                            +entries[i+5][37]+"{mlang}";
                            var eleccion7 = "{mlang es}"+entries[i][40]+"{mlang}{mlang ca}"
                            +entries[i+1][40]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][40]+"{mlang}{mlang en}"
                            +entries[i+3][40]+"{mlang}{mlang eu}"
                            +entries[i+4][40]+"{mlang}{mlang gl}"
                            +entries[i+5][40]+"{mlang}";
                            var eleccion8 = "{mlang es}"+entries[i][43]+"{mlang}{mlang ca}"
                            +entries[i+1][43]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][43]+"{mlang}{mlang en}"
                            +entries[i+3][43]+"{mlang}{mlang eu}"
                            +entries[i+4][43]+"{mlang}{mlang gl}"
                            +entries[i+5][43]+"{mlang}";
                            var eleccion9 = "{mlang es}"+entries[i][46]+"{mlang}{mlang ca}"
                            +entries[i+1][46]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][46]+"{mlang}{mlang en}"
                            +entries[i+3][46]+"{mlang}{mlang eu}"
                            +entries[i+4][46]+"{mlang}{mlang gl}"
                            +entries[i+5][46]+"{mlang}";
                            var eleccion10 = "{mlang es}"+entries[i][49]+"{mlang}{mlang ca}"
                            +entries[i+1][49]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][49]+"{mlang}{mlang en}"
                            +entries[i+3][49]+"{mlang}{mlang eu}"
                            +entries[i+4][49]+"{mlang}{mlang gl}"
                            +entries[i+5][49]+"{mlang}";
                            var eleccion11 = "{mlang es}"+entries[i][52]+"{mlang}{mlang ca}"
                            +entries[i+1][52]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][52]+"{mlang}{mlang en}"
                            +entries[i+3][52]+"{mlang}{mlang eu}"
                            +entries[i+4][52]+"{mlang}{mlang gl}"
                            +entries[i+5][52]+"{mlang}";
                            var eleccion12 = "{mlang es}"+entries[i][55]+"{mlang}{mlang ca}"
                            +entries[i+1][55]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][55]+"{mlang}{mlang en}"
                            +entries[i+3][55]+"{mlang}{mlang eu}"
                            +entries[i+4][55]+"{mlang}{mlang gl}"
                            +entries[i+5][55]+"{mlang}";
                            var eleccion13 = "{mlang es}"+entries[i][58]+"{mlang}{mlang ca}"
                            +entries[i+1][58]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][58]+"{mlang}{mlang en}"
                            +entries[i+3][58]+"{mlang}{mlang eu}"
                            +entries[i+4][58]+"{mlang}{mlang gl}"
                            +entries[i+5][58]+"{mlang}";
                            var eleccion14 = "{mlang es}"+entries[i][61]+"{mlang}{mlang ca}"
                            +entries[i+1][61]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][61]+"{mlang}{mlang en}"
                            +entries[i+3][61]+"{mlang}{mlang eu}"
                            +entries[i+4][61]+"{mlang}{mlang gl}"
                            +entries[i+5][61]+"{mlang}";
                            var eleccion15 = "{mlang es}"+entries[i][64]+"{mlang}{mlang ca}"
                            +entries[i+1][64]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][64]+"{mlang}{mlang en}"
                            +entries[i+3][64]+"{mlang}{mlang eu}"
                            +entries[i+4][64]+"{mlang}{mlang gl}"
                            +entries[i+5][64]+"{mlang}";
                            var retroalimentacion1 = "{mlang es}"+entries[i][24]+"{mlang}{mlang ca}"
                            +entries[i+1][24]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][24]+"{mlang}{mlang en}"
                            +entries[i+3][24]+"{mlang}{mlang eu}"
                            +entries[i+4][24]+"{mlang}{mlang gl}"
                            +entries[i+5][24]+"{mlang}";
                            var retroalimentacion2 = "{mlang es}"+entries[i][27]+"{mlang}{mlang ca}"
                            +entries[i+1][27]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][27]+"{mlang}{mlang en}"
                            +entries[i+3][27]+"{mlang}{mlang eu}"
                            +entries[i+4][27]+"{mlang}{mlang gl}"
                            +entries[i+5][27]+"{mlang}";
                            var retroalimentacion3 = "{mlang es}"+entries[i][30]+"{mlang}{mlang ca}"
                            +entries[i+1][30]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][30]+"{mlang}{mlang en}"
                            +entries[i+3][30]+"{mlang}{mlang eu}"
                            +entries[i+4][30]+"{mlang}{mlang gl}"
                            +entries[i+5][30]+"{mlang}";
                            var retroalimentacion4 = "{mlang es}"+entries[i][33]+"{mlang}{mlang ca}"
                            +entries[i+1][33]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][33]+"{mlang}{mlang en}"
                            +entries[i+3][33]+"{mlang}{mlang eu}"
                            +entries[i+4][33]+"{mlang}{mlang gl}"
                            +entries[i+5][33]+"{mlang}";
                            var retroalimentacion5 = "{mlang es}"+entries[i][36]+"{mlang}{mlang ca}"
                            +entries[i+1][36]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][36]+"{mlang}{mlang en}"
                            +entries[i+3][36]+"{mlang}{mlang eu}"
                            +entries[i+4][36]+"{mlang}{mlang gl}"
                            +entries[i+5][36]+"{mlang}";
                            var retroalimentacion6 = "{mlang es}"+entries[i][39]+"{mlang}{mlang ca}"
                            +entries[i+1][39]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][39]t+"{mlang}{mlang en}"
                            +entries[i+3][39]+"{mlang}{mlang eu}"
                            +entries[i+4][39]+"{mlang}{mlang gl}"
                            +entries[i+5][39]+"{mlang}";
                            var retroalimentacion7 = "{mlang es}"+entries[i][42]+"{mlang}{mlang ca}"
                            +entries[i+1][42]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][42]+"{mlang}{mlang en}"
                            +entries[i+3][42]+"{mlang}{mlang eu}"
                            +entries[i+4][42]+"{mlang}{mlang gl}"
                            +entries[i+5][42]+"{mlang}";
                            var retroalimentacion8 = "{mlang es}"+entries[i][45]+"{mlang}{mlang ca}"
                            +entries[i+1][45]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][45]+"{mlang}{mlang en}"
                            +entries[i+3][45]+"{mlang}{mlang eu}"
                            +entries[i+4][45]+"{mlang}{mlang gl}"
                            +entries[i+5][45]+"{mlang}";
                            var retroalimentacion9 = "{mlang es}"+entries[i][48]+"{mlang}{mlang ca}"
                            +entries[i+1][48]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][48]+"{mlang}{mlang en}"
                            +entries[i+3][48]+"{mlang}{mlang eu}"
                            +entries[i+4][48]+"{mlang}{mlang gl}"
                            +entries[i+5][48]+"{mlang}";
                            var retroalimentacion10 = "{mlang es}"+entries[i][51]+"{mlang}{mlang ca}"
                            +entries[i+1][51]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][51]+"{mlang}{mlang en}"
                            +entries[i+3][51]+"{mlang}{mlang eu}"
                            +entries[i+4][51]+"{mlang}{mlang gl}"
                            +entries[i+5][51]+"{mlang}";
                            var retroalimentacion11 = "{mlang es}"+entries[i][54]+"{mlang}{mlang ca}"
                            +entries[i+1][54]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][54]+"{mlang}{mlang en}"
                            +entries[i+3][54]+"{mlang}{mlang eu}"
                            +entries[i+4][54]+"{mlang}{mlang gl}"
                            +entries[i+5][54]+"{mlang}";
                            var retroalimentacion12 = "{mlang es}"+entries[i][57]+"{mlang}{mlang ca}"
                            +entries[i+1][57]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][57]+"{mlang}{mlang en}"
                            +entries[i+3][57]+"{mlang}{mlang eu}"
                            +entries[i+4][57]+"{mlang}{mlang gl}"
                            +entries[i+5][57]+"{mlang}";
                            var retroalimentacion13 = "{mlang es}"+entries[i][60]+"{mlang}{mlang ca}"
                            +entries[i+1][60]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][60]+"{mlang}{mlang en}"
                            +entries[i+3][60]+"{mlang}{mlang eu}"
                            +entries[i+4][60]+"{mlang}{mlang gl}"
                            +entries[i+5][60]+"{mlang}";
                            var retroalimentacion14 = "{mlang es}"+entries[i][63]+"{mlang}{mlang ca}"
                            +entries[i+1][63]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][63]+"{mlang}{mlang en}"
                            +entries[i+3][63]+"{mlang}{mlang eu}"
                            +entries[i+4][63]+"{mlang}{mlang gl}"
                            +entries[i+5][63]+"{mlang}";
                            var retroalimentacion15 = "{mlang es}"+entries[i][66]+"{mlang}{mlang ca}"
                            +entries[i+1][66]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][66]+"{mlang}{mlang en}"
                            +entries[i+3][66]+"{mlang}{mlang eu}"
                            +entries[i+4][66]+"{mlang}{mlang gl}"
                            +entries[i+5][66]+"{mlang}";
                            var retroalimentacioncorrecta = "{mlang es}"+entries[i][47]+"{mlang}{mlang ca}"
                            +entries[i+1][47]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][47]+"{mlang}{mlang en}"
                            +entries[i+3][47]+"{mlang}{mlang eu}"
                            +entries[i+4][47]+"{mlang}{mlang gl}"
                            +entries[i+5][47]+"{mlang}";
                            var retroalimentacionparcial = "{mlang es}"+entries[i][48]+"{mlang}{mlang ca}"
                            +entries[i+1][48]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][48]+"{mlang}{mlang en}"
                            +entries[i+3][48]+"{mlang}{mlang eu}"
                            +entries[i+4][48]+"{mlang}{mlang gl}"
                            +entries[i+5][48]+"{mlang}";
                            var retroalimentacionincorrecta = "{mlang es}"+entries[i][49]+"{mlang}{mlang ca}"
                            +entries[i+1][49]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][49]+"{mlang}{mlang en}"
                            +entries[i+3][49]+"{mlang}{mlang eu}"
                            +entries[i+4][49]+"{mlang}{mlang gl}"
                            +entries[i+5][49]+"{mlang}";
                        } else {
                            var eleccion1 = "{mlang "+idioma+"}"+entries[i][22]+"{mlang}";
                            var eleccion2 = "{mlang "+idioma+"}"+entries[i][25]+"{mlang}";
                            var eleccion3 = "{mlang "+idioma+"}"+entries[i][28]+"{mlang}";
                            var eleccion4 = "{mlang "+idioma+"}"+entries[i][31]+"{mlang}";
                            var eleccion5 = "{mlang "+idioma+"}"+entries[i][34]+"{mlang}";
                            var eleccion6 = "{mlang "+idioma+"}"+entries[i][37]+"{mlang}";
                            var eleccion7 = "{mlang "+idioma+"}"+entries[i][40]+"{mlang}";
                            var eleccion8 = "{mlang "+idioma+"}"+entries[i][43]+"{mlang}";
                            var eleccion9 = "{mlang "+idioma+"}"+entries[i][46]+"{mlang}";
                            var eleccion10 = "{mlang "+idioma+"}"+entries[i][49]+"{mlang}";
                            var eleccion11 = "{mlang "+idioma+"}"+entries[i][52]+"{mlang}";
                            var eleccion12 = "{mlang "+idioma+"}"+entries[i][55]+"{mlang}";
                            var eleccion13 = "{mlang "+idioma+"}"+entries[i][58]+"{mlang}";
                            var eleccion14 = "{mlang "+idioma+"}"+entries[i][61]+"{mlang}";
                            var eleccion15 = "{mlang "+idioma+"}"+entries[i][64]+"{mlang}";
                            var retroalimentacion1 = "{mlang "+idioma+"}"+entries[i][24]+"{mlang}";
                            var retroalimentacion2 = "{mlang "+idioma+"}"+entries[i][27]+"{mlang}";
                            var retroalimentacion3 = "{mlang "+idioma+"}"+entries[i][30]+"{mlang}";
                            var retroalimentacion4 = "{mlang "+idioma+"}"+entries[i][33]+"{mlang}";
                            var retroalimentacion5 = "{mlang "+idioma+"}"+entries[i][36]+"{mlang}";    
                            var retroalimentacion6 = "{mlang "+idioma+"}"+entries[i][39]+"{mlang}";
                            var retroalimentacion7 = "{mlang "+idioma+"}"+entries[i][42]+"{mlang}";
                            var retroalimentacion8 = "{mlang "+idioma+"}"+entries[i][45]+"{mlang}";
                            var retroalimentacion9 = "{mlang "+idioma+"}"+entries[i][48]+"{mlang}";
                            var retroalimentacion10 = "{mlang "+idioma+"}"+entries[i][51]+"{mlang}";  
                            var retroalimentacion11 = "{mlang "+idioma+"}"+entries[i][54]+"{mlang}";
                            var retroalimentacion12 = "{mlang "+idioma+"}"+entries[i][57]+"{mlang}";
                            var retroalimentacion13 = "{mlang "+idioma+"}"+entries[i][60]+"{mlang}";
                            var retroalimentacion14 = "{mlang "+idioma+"}"+entries[i][63]+"{mlang}";
                            var retroalimentacion15 = "{mlang "+idioma+"}"+entries[i][66]+"{mlang}";                              
                            var retroalimentacioncorrecta = "{mlang "+idioma+"}"+entries[i][68]+"{mlang}";
                            var retroalimentacionparcial = "{mlang "+idioma+"}"+entries[i][69]+"{mlang}";
                            var retroalimentacionincorrecta = "{mlang "+idioma+"}"+entries[i][70]+"{mlang}";
                        }
                        var single = convertsingle(entries[i][18]);
                        var shuffleanswers = convertshuffleanswers(entries[i][19]);
                        var answernumbering = convertanswernumbering(entries[i][20]);
                        var showstandardinstruction = convertshowstandardinstruction(entries[i][21]);
                        var fraction0 = convertCalif(entries[i][23]);
                        var fraction1 = convertCalif(entries[i][26]);
                        var fraction2 = convertCalif(entries[i][29]);
                        var fraction3 = convertCalif(entries[i][32]);
                        var fraction4 = convertCalif(entries[i][35]); 
                        var fraction5 = convertCalif(entries[i][38]);
                        var fraction6 = convertCalif(entries[i][41]);
                        var fraction7 = convertCalif(entries[i][44]); 
                        var fraction8 = convertCalif(entries[i][47]);
                        var fraction9 = convertCalif(entries[i][50]); 
                        var fraction10 = convertCalif(entries[i][53]);
                        var fraction11 = convertCalif(entries[i][56]);
                        var fraction12 = convertCalif(entries[i][59]);
                        var fraction13 = convertCalif(entries[i][62]);
                        var fraction14 = convertCalif(entries[i][65]); 
                        var noanswers = entries[i][67];
                        var tags =  entries[i][71];
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
                            showstandardinstruction: showstandardinstruction,
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
                            "feedback[8][text]": retroalimentacion9,
                            "feedback[8][format]": 1,
                            "feedback[9][text]": retroalimentacion10,
                            "feedback[9][format]": 1,
                            "feedback[10][text]": retroalimentacion11,
                            "feedback[10][format]": 1,
                            "feedback[11][text]": retroalimentacion12,
                            "feedback[11][format]": 1,
                            "feedback[12][text]": retroalimentacion13,
                            "feedback[12][format]": 1,
                            "feedback[13][text]": retroalimentacion14,
                            "feedback[13][format]": 1,
                            "feedback[14][text]": retroalimentacion15,
                            "feedback[14][format]": 1,
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
                            "answer[8][text]": eleccion9,
                            "answer[8][format]": 1,
                            "fraction[8]": fraction8,
                            "answer[9][text]": eleccion10,
                            "answer[9][format]": 1,
                            "fraction[9]": fraction9,
                            "answer[10][text]": eleccion11,
                            "answer[10][format]": 1,
                            "fraction[10]": fraction10,     
                            "answer[11][text]": eleccion12,
                            "answer[11][format]": 1,
                            "fraction[11]": fraction11,    
                             "answer[12][text]": eleccion13,
                            "answer[12][format]": 1,
                            "fraction[12]": fraction12,    
                             "answer[13][text]": eleccion14,
                            "answer[13][format]": 1,
                            "fraction[13]": fraction13,    
                             "answer[14][text]": eleccion15,
                            "answer[14][format]": 1,
                            "fraction[14]": fraction14,    
                            "correctfeedback[text]": retroalimentacioncorrecta,
                            "correctfeedback[format]": 1,
                            "partiallycorrectfeedback[text]": retroalimentacionparcial,
                            "partiallycorrectfeedback[format]": 1,
                            "incorrectfeedback[text]": retroalimentacionincorrecta,
                            "incorrectfeedback[format]": 1
                        };
                        if (tags !== "") {
                            obj["tags[]"]  = tags;
                        }
                        datos.push(obj);
                        idspreguntas.push(nombre);
                    }
                    if (questiontype == "ordering") {
                        if((entries[i][2]) == "TRUE"){
                            var item1 = "{mlang es}"+entries[i][25]+"{mlang}{mlang ca}"
                            +entries[i+1][25]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][25]+"{mlang}{mlang en}"
                            +entries[i+3][25]+"{mlang}{mlang eu}"
                            +entries[i+4][25]+"{mlang}{mlang gl}"
                            +entries[i+5][25]+"{mlang}";
                            var item2 = "{mlang es}"+entries[i][26]+"{mlang}{mlang ca}"
                            +entries[i+1][26]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][26]+"{mlang}{mlang en}"
                            +entries[i+3][26]+"{mlang}{mlang eu}"
                            +entries[i+4][26]+"{mlang}{mlang gl}"
                            +entries[i+5][26]+"{mlang}";
                            var item3 = "{mlang es}"+entries[i][27]+"{mlang}{mlang ca}"
                            +entries[i+1][27]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][27]+"{mlang}{mlang en}"
                            +entries[i+3][27]+"{mlang}{mlang eu}"
                            +entries[i+4][27]+"{mlang}{mlang gl}"
                            +entries[i+5][27]+"{mlang}";
                            var item4 = "{mlang es}"+entries[i][28]+"{mlang}{mlang ca}"
                            +entries[i+1][28]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][28]+"{mlang}{mlang en}"
                            +entries[i+3][28]+"{mlang}{mlang eu}"
                            +entries[i+4][28]+"{mlang}{mlang gl}"
                            +entries[i+5][28]+"{mlang}";
                            var item5 = "{mlang es}"+entries[i][29]+"{mlang}{mlang ca}"
                            +entries[i+1][29]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][29]+"{mlang}{mlang en}"
                            +entries[i+3][29]+"{mlang}{mlang eu}"
                            +entries[i+4][29]+"{mlang}{mlang gl}"
                            +entries[i+5][29]+"{mlang}";
                            var item6 = "{mlang es}"+entries[i][30]+"{mlang}{mlang ca}"
                            +entries[i+1][30]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][30]+"{mlang}{mlang en}"
                            +entries[i+3][30]+"{mlang}{mlang eu}"
                            +entries[i+4][30]+"{mlang}{mlang gl}"
                            +entries[i+5][30]+"{mlang}";
                            var item7 = "{mlang es}"+entries[i][31]+"{mlang}{mlang ca}"
                            +entries[i+1][31]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][31]+"{mlang}{mlang en}"
                            +entries[i+3][31]+"{mlang}{mlang eu}"
                            +entries[i+4][31]+"{mlang}{mlang gl}"
                            +entries[i+5][31]+"{mlang}";
                            var item8 = "{mlang es}"+entries[i][32]+"{mlang}{mlang ca}"
                            +entries[i+1][32]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][32]+"{mlang}{mlang en}"
                            +entries[i+3][32]+"{mlang}{mlang eu}"
                            +entries[i+4][32]+"{mlang}{mlang gl}"
                            +entries[i+5][32]+"{mlang}";
                            var retroalimentacioncorrecta = "{mlang es}"+entries[i][34]+"{mlang}{mlang ca}"
                            +entries[i+1][34]"{mlang}{mlang ca_valencia}"
                            +entries[i+2][34]+"{mlang}{mlang en}"
                            +entries[i+3][34]+"{mlang}{mlang eu}"
                            +entries[i+4][34]+"{mlang}{mlang gl}"
                            +entries[i+5][34]+"{mlang}";
                            var retroalimentacionparcial = "{mlang es}"+entries[i][35]+"{mlang}{mlang ca}"
                            +entries[i+1][35]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][35]+"{mlang}{mlang en}"
                            +entries[i+3][35]+"{mlang}{mlang eu}"
                            +entries[i+4][35]+"{mlang}{mlang gl}"
                            +entries[i+5][35]+"{mlang}";
                            var retroalimentacionincorrecta = "{mlang es}"+entries[i][36]+"{mlang}{mlang ca}"
                            +entries[i+1][36]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][36]+"{mlang}{mlang en}"
                            +entries[i+3][36]+"{mlang}{mlang eu}"
                            +entries[i+4][36]+"{mlang}{mlang gl}"
                            +entries[i+5][36]+"{mlang}";
                        } else {
                            var item1 = "{mlang "+idioma+"}"+entries[i][25]+"{mlang}";
                            var item2 = "{mlang "+idioma+"}"+entries[i][26]+"{mlang}";
                            var item3 = "{mlang "+idioma+"}"+entries[i][27]+"{mlang}";
                            var item4 = "{mlang "+idioma+"}"+entries[i][28]+"{mlang}";
                            var item5 = "{mlang "+idioma+"}"+entries[i][29]+"{mlang}";
                            var item6 = "{mlang "+idioma+"}"+entries[i][30]+"{mlang}";
                            var item7 = "{mlang "+idioma+"}"+entries[i][31]+"{mlang}";
                            var item8 = "{mlang "+idioma+"}"+entries[i][32]+"{mlang}";
                            var retroalimentacioncorrecta = "{mlang "+idioma+"}"+entries[i][34]+"{mlang}";
                            var retroalimentacionparcial = "{mlang "+idioma+"}"+entries[i][35]+"{mlang}";
                            var retroalimentacionincorrecta = "{mlang "+idioma+"}"+entries[i][36]+"{mlang}";
                        }
                        var idnumber = entries[i][18];
                        var layouttype = convertlayouttype(entries[i][19]);
                        var itemselectiontype = convertitemselectiontype(entries[i][20]);
                        var sizeofsubset = entries[i][21];
                        var gradingtype = convertgradingtype(entries[i][22]);
                        var gradingdetails = convertgradingdetails(entries[i][23]);
                        var numberthechoices = convertanswernumbering(entries[i][24]);
                        var countanswers = entries[i][33].$t;
                        var tags =  entries[i][37];
                        var obj = {
                            countanswers: countanswers,
                            mform_isexpanded_id_answerheader_0: 1,
                            mform_isexpanded_id_answerheader_1: 1,
                            mform_isexpanded_id_answerheader_2: 1,
                            mform_isexpanded_id_answerheader_3: 1,
                            mform_isexpanded_id_answerheader_4: 1,
                            mform_isexpanded_id_answerheader_5: 1,
                            mform_isexpanded_id_answerheader_6: 1,
                            mform_isexpanded_id_answerheader_7: 1,
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
                            _qf__qtype_ordering_edit_form:1,
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
                            idnumber: idnumber,
                            layouttype: layouttype,
                            selecttype: itemselectiontype,
                            selectcount: sizeofsubset,
                            gradingtype: gradingtype,
                            showgrading: gradingdetails,
                            numberingstyle: numberthechoices,
                            "answer[0][text]": item1,
                            "answer[0][format]": 1,
                            "answer[1][text]": item2,
                            "answer[1][format]": 1,
                            "answer[2][text]": item3,
                            "answer[2][format]": 1,
                            "answer[3][text]": item4,
                            "answer[3][format]": 1,
                            "answer[4][text]": item5,
                            "answer[4][format]": 1,
                            "answer[5][text]": item6,
                            "answer[5][format]": 1,
                            "answer[6][text]": item7,
                            "answer[6][format]": 1,
                            "answer[7][text]": item8,
                            "answer[7][format]": 1,
                            "correctfeedback[text]": retroalimentacioncorrecta,
                            "correctfeedback[format]": 1,
                            "partiallycorrectfeedback[text]": retroalimentacionparcial,
                            "partiallycorrectfeedback[format]": 1,
                            "incorrectfeedback[text]": retroalimentacionincorrecta,
                            "incorrectfeedback[format]": 1
                        };
                        if (tags !== "") {
                            obj["tags[]"]  = tags;
                        }
                        datos.push(obj);
                        idspreguntas.push(nombre);
                    }
                    if (questiontype == "shortanswer") {
                        var usecase = convertUsecase(entries[i].gsx$mayuscminusc.$t);
                        var noanswers = entries[i].gsx$numrespuestas.$t;   
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
                            _qf__qtype_shortanswer_edit_form:1,
                            mform_isexpanded_id_generalheader:1,
                            mform_isexpanded_id_multitriesheader:0,
                            mform_isexpanded_id_tagsheader:0,
                            category: idcategoria,
                            name: nombre,
                            "questiontext[text]": enunciado,
                            "questiontext[format]": 1,
                            defaultmark: defaultmark,
                            "generalfeedback[text]": generalfeedback,
                            "generalfeedback[format]": 1,
                            usecase: usecase,
                            "feedback[0][format]": 1,
                            "feedback[1][format]": 1,                            
                            "feedback[2][format]": 1,            
                            "feedback[3][format]": 1,
                            "feedback[4][format]": 1,                            
                            "feedback[5][format]": 1,
                            "feedback[6][format]": 1,
                            "feedback[7][format]": 1,                            
                            "feedback[8][format]": 1,            
                            "feedback[9][format]": 1,
                            "feedback[10][format]": 1,                            
                            "feedback[11][format]": 1,
                            "feedback[12][format]": 1,
                            "feedback[13][format]": 1,
                            "feedback[14][format]": 1,
                            "feedback[15][format]": 1,
                            "feedback[16][format]": 1,
                            "feedback[17][format]": 1,
                            "feedback[18][format]": 1,                            
                            "feedback[19][format]": 1,            
                            "feedback[20][format]": 1,
                            "feedback[21][format]": 1,                            
                            "feedback[22][format]": 1,
                            "feedback[23][format]": 1,
                            "feedback[24][format]": 1,
                            "feedback[25][format]": 1,
                            "feedback[26][format]": 1,
                            "feedback[27][format]": 1,
                            "feedback[28][format]": 1,
                            "feedback[29][format]": 1,
                            "feedback[30][format]": 1,
                            "feedback[31][format]": 1,
                            "feedback[32][format]": 1,
                            "feedback[33][format]": 1,
                            "feedback[34][format]": 1,
                            "feedback[35][format]": 1
                        };
                        if((entries[i].gsx$multi.$t) == "TRUE"){
                            var respuestas = []; 
                            var retros = [];
                            var califs = [];  
                            obj["answer[0]"] = entries[i].gsx$respuesta1.$t;
                            obj["answer[1]"] = entries[i+1].gsx$respuesta1.$t;
                            obj["answer[2]"] = entries[i+2].gsx$respuesta1.$t;
                            obj["answer[3]"] = entries[i+3].gsx$respuesta1.$t;
                            obj["answer[4]"] = entries[i+4].gsx$respuesta1.$t;
                            obj["answer[5]"] = entries[i+5].gsx$respuesta1.$t;
                            obj["answer[6]"] = entries[i].gsx$respuesta2.$t;
                            obj["answer[7]"] = entries[i+1].gsx$respuesta2.$t;
                            obj["answer[8]"] = entries[i+2].gsx$respuesta2.$t;
                            obj["answer[9]"] = entries[i+3].gsx$respuesta2.$t;
                            obj["answer[10]"] = entries[i+4].gsx$respuesta2.$t;
                            obj["answer[11]"] = entries[i+5].gsx$respuesta2.$t;
                            obj["answer[12]"] = entries[i].gsx$respuesta3.$t;
                            obj["answer[13]"] = entries[i+1].gsx$respuesta3.$t;
                            obj["answer[15]"] = entries[i+2].gsx$respuesta3.$t;
                            obj["answer[15]"] = entries[i+3].gsx$respuesta3.$t;
                            obj["answer[16]"] = entries[i+4].gsx$respuesta3.$t;
                            obj["answer[17]"] = entries[i+5].gsx$respuesta3.$t;
                            obj["answer[18]"] = entries[i].gsx$respuesta4.$t;
                            obj["answer[19]"] = entries[i+1].gsx$respuesta4.$t;
                            obj["answer[20]"] = entries[i+2].gsx$respuesta4.$t;
                            obj["answer[21]"] = entries[i+3].gsx$respuesta4.$t;
                            obj["answer[22]"] = entries[i+4].gsx$respuesta4.$t;
                            obj["answer[23]"] = entries[i+5].gsx$respuesta4.$t;
                            obj["answer[24]"] = entries[i].gsx$respuesta5.$t;
                            obj["answer[25]"] = entries[i+1].gsx$respuesta5.$t;
                            obj["answer[26]"] = entries[i+2].gsx$respuesta5.$t;
                            obj["answer[27]"] = entries[i+3].gsx$respuesta5.$t;
                            obj["answer[28]"] = entries[i+4].gsx$respuesta5.$t;
                            obj["answer[29]"] = entries[i+5].gsx$respuesta5.$t;
                            obj["answer[30]"] = entries[i].gsx$respuesta6.$t;
                            obj["answer[31]"] = entries[i+1].gsx$respuesta6.$t;
                            obj["answer[32]"] = entries[i+2].gsx$respuesta6.$t;
                            obj["answer[33]"] = entries[i+3].gsx$respuesta6.$t;
                            obj["answer[34]"] = entries[i+4].gsx$respuesta6.$t;
                            obj["answer[35]"] = entries[i+5].gsx$respuesta6.$t;
                            obj["feedback[0][text]"] = entries[i].gsx$retroalimentacion1.$t;
                            obj["feedback[1][text]"] = entries[i+1].gsx$retroalimentacion1.$t;
                            obj["feedback[2][text]"] = entries[i+2].gsx$retroalimentacion1.$t;
                            obj["feedback[3][text]"] = entries[i+3].gsx$retroalimentacion1.$t;
                            obj["feedback[4][text]"] = entries[i+4].gsx$retroalimentacion1.$t;
                            obj["feedback[5][text]"] = entries[i+5].gsx$retroalimentacion1.$t;
                            obj["feedback[6][text]"] = entries[i].gsx$retroalimentacion2.$t;
                            obj["feedback[7][text]"] = entries[i+1].gsx$retroalimentacion2.$t;
                            obj["feedback[8][text]"] = entries[i+2].gsx$retroalimentacion2.$t;
                            obj["feedback[9][text]"] = entries[i+3].gsx$retroalimentacion2.$t;
                            obj["feedback[10][text]"] = entries[i+4].gsx$retroalimentacion2.$t;
                            obj["feedback[11][text]"] = entries[i+5].gsx$retroalimentacion2.$t;
                            obj["feedback[12][text]"] = entries[i].gsx$retroalimentacion3.$t;
                            obj["feedback[13][text]"] = entries[i+1].gsx$retroalimentacion3.$t;
                            obj["feedback[14][text]"] = entries[i+2].gsx$retroalimentacion3.$t;
                            obj["feedback[15][text]"] = entries[i+3].gsx$retroalimentacion3.$t;
                            obj["feedback[16][text]"] = entries[i+4].gsx$retroalimentacion3.$t;
                            obj["feedback[17][text]"] = entries[i+5].gsx$retroalimentacion3.$t;
                            obj["feedback[18][text]"] = entries[i].gsx$retroalimentacion4.$t;
                            obj["feedback[19][text]"] = entries[i+1].gsx$retroalimentacion4.$t;
                            obj["feedback[20][text]"] = entries[i+2].gsx$retroalimentacion4.$t;
                            obj["feedback[21][text]"] = entries[i+3].gsx$retroalimentacion4.$t;
                            obj["feedback[22][text]"] = entries[i+4].gsx$retroalimentacion4.$t;
                            obj["feedback[23][text]"] = entries[i+5].gsx$retroalimentacion4.$t;
                            obj["feedback[24][text]"] = entries[i].gsx$retroalimentacion5.$t;
                            obj["feedback[25][text]"] = entries[i+1].gsx$retroalimentacion5.$t;
                            obj["feedback[26][text]"] = entries[i+2].gsx$retroalimentacion5.$t;
                            obj["feedback[27][text]"] = entries[i+3].gsx$retroalimentacion5.$t;
                            obj["feedback[28][text]"] = entries[i+4].gsx$retroalimentacion5.$t;
                            obj["feedback[29][text]"] = entries[i+5].gsx$retroalimentacion5.$t;
                            obj["feedback[30][text]"] = entries[i].gsx$retroalimentacion6.$t;
                            obj["feedback[31][text]"] = entries[i+1].gsx$retroalimentacion6.$t;
                            obj["feedback[32][text]"] = entries[i+2].gsx$retroalimentacion6.$t;
                            obj["feedback[33][text]"] = entries[i+3].gsx$retroalimentacion6.$t;
                            obj["feedback[34][text]"] = entries[i+4].gsx$retroalimentacion6.$t;
                            obj["feedback[35][text]"] = entries[i+5].gsx$retroalimentacion6.$t;
                            obj["fraction[0]"] = convertCalif(entries[i].gsx$calif1.$t);
                            obj["fraction[1]"] = convertCalif(entries[i+1].gsx$calif1.$t);
                            obj["fraction[2]"] = convertCalif(entries[i+2].gsx$calif1.$t);
                            obj["fraction[3]"] = convertCalif(entries[i+3].gsx$calif1.$t);
                            obj["fraction[4]"] = convertCalif(entries[i+4].gsx$calif1.$t);
                            obj["fraction[5]"] = convertCalif(entries[i+5].gsx$calif1.$t);
                            obj["fraction[6]"] = convertCalif(entries[i].gsx$calif2.$t);
                            obj["fraction[7]"] = convertCalif(entries[i+1].gsx$calif2.$t);
                            obj["fraction[8]"] = convertCalif(entries[i+2].gsx$calif2.$t);
                            obj["fraction[9]"] = convertCalif(entries[i+3].gsx$calif2.$t);
                            obj["fraction[10]"] = convertCalif(entries[i+4].gsx$calif2.$t);
                            obj["fraction[11]"] = convertCalif(entries[i+5].gsx$calif2.$t);
                            obj["fraction[12]"] = convertCalif(entries[i].gsx$calif3.$t);
                            obj["fraction[13]"] = convertCalif(entries[i+1].gsx$calif3.$t);
                            obj["fraction[14]"] = convertCalif(entries[i+2].gsx$calif3.$t);
                            obj["fraction[15]"] = convertCalif(entries[i+3].gsx$calif3.$t);
                            obj["fraction[16]"] = convertCalif(entries[i+4].gsx$calif3.$t);
                            obj["fraction[17]"] = convertCalif(entries[i+5].gsx$calif3.$t);
                            obj["fraction[18]"] = convertCalif(entries[i].gsx$calif4.$t);
                            obj["fraction[19]"] = convertCalif(entries[i+1].gsx$calif4.$t);
                            obj["fraction[20]"] = convertCalif(entries[i+2].gsx$calif4.$t);
                            obj["fraction[21]"] = convertCalif(entries[i+3].gsx$calif4.$t);
                            obj["fraction[22]"] = convertCalif(entries[i+4].gsx$calif4.$t);
                            obj["fraction[23]"] = convertCalif(entries[i+5].gsx$calif4.$t);
                            obj["fraction[24]"] = convertCalif(entries[i].gsx$calif5.$t);
                            obj["fraction[25]"] = convertCalif(entries[i+1].gsx$calif5.$t);
                            obj["fraction[26]"] = convertCalif(entries[i+2].gsx$calif5.$t);
                            obj["fraction[27]"] = convertCalif(entries[i+3].gsx$calif5.$t);
                            obj["fraction[28]"] = convertCalif(entries[i+4].gsx$calif5.$t);
                            obj["fraction[29]"] = convertCalif(entries[i+5].gsx$calif5.$t);
                            obj["fraction[30]"] = convertCalif(entries[i].gsx$calif6.$t);
                            obj["fraction[31]"] = convertCalif(entries[i+1].gsx$calif6.$t);
                            obj["fraction[32]"] = convertCalif(entries[i+2].gsx$calif6.$t);
                            obj["fraction[33]"] = convertCalif(entries[i+3].gsx$calif6.$t);
                            obj["fraction[34]"] = convertCalif(entries[i+4].gsx$calif6.$t);
                            obj["fraction[35]"] = convertCalif(entries[i+5].gsx$calif6.$t);
                        } else {
                            var answer1 = entries[i].gsx$respuesta1.$t;
                            var answer2 = entries[i].gsx$respuesta2.$t;
                            var answer3 = entries[i].gsx$respuesta3.$t;
                            var answer4 = entries[i].gsx$respuesta4.$t;
                            var answer5 = entries[i].gsx$respuesta5.$t;
                            var answer6 = entries[i].gsx$respuesta6.$t;
                            var feedback1 = entries[i].gsx$retroalimentacion1.$t;
                            var feedback2 = entries[i].gsx$retroalimentacion2.$t;
                            var feedback3 = entries[i].gsx$retroalimentacion3.$t;
                            var feedback4 = entries[i].gsx$retroalimentacion4.$t;
                            var feedback5 = entries[i].gsx$retroalimentacion5.$t;
                            var feedback6 = entries[i].gsx$retroalimentacion6.$t;
                            var fraction0 = convertCalif(entries[i].gsx$calif1.$t);
                            var fraction1 = convertCalif(entries[i].gsx$calif2.$t);
                            var fraction2 = convertCalif(entries[i].gsx$calif3.$t);
                            var fraction3 = convertCalif(entries[i].gsx$calif4.$t);
                            var fraction4 = convertCalif(entries[i].gsx$calif5.$t); 
                            var fraction5 = convertCalif(entries[i].gsx$calif6.$t);
                        }

                        if (tags !== "") {
                            obj["tags[]"]  = tags;
                        }
                        datos.push(obj);
                        idspreguntas.push(idpregunta);
                    }
                        if (questiontype == "truefalse") {
                            var respuestacorrecta = convertTruefalse(entries[i].gsx$respuestacorrecta.$t);
                            if((entries[i].gsx$multi.$t) == "TRUE"){
                                var retroalimentacionverdadero = "{mlang es}"+entries[i].gsx$retroalimentacionverdadero.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacionverdadero.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacionverdadero.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacionverdadero.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacionverdadero.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacionverdadero.$t+"{mlang}";
                                var retroalimentacionfalso = "{mlang es}"+entries[i].gsx$retroalimentacionfalso.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacionfalso.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacionfalso.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacionfalso.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacionfalso.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacionfalso.$t+"{mlang}";
                            } else {
                                var retroalimentacionverdadero = entries[i].gsx$retroalimentacionverdadero.$t;
                                var retroalimentacionfalso = entries[i].gsx$retroalimentacionfalso.$t;                                 
                            }
                            var obj = {
                                id: idpregunta,
                                inpopup: "",
                                cmid:"",
                                courseid: courseid,
                                scrollpos:0,
                                appendqnumstring:"",
                                qtype: tipo,
                                makecopy:0,
                                sesskey: sesskey,
                                _qf__qtype_truefalse_edit_form:1,
                                mform_isexpanded_id_generalheader:1,
                                mform_isexpanded_id_multitriesheader:1,
                                mform_isexpanded_id_tagsheader:0,
                                category: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciado,
                                "questiontext[format]": 1,
                                defaultmark: defaultmark,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                correctanswer: respuestacorrecta,
                                "feedbacktrue[text]": retroalimentacionverdadero,
                                "feedbacktrue[format]": 1,
                                "feedbackfalse[text]": retroalimentacionfalso,
                                "feedbackfalse[format]": 1,
                                penalty:1
                            };
                            if (tags !== "") {
                                obj["tags[]"]  = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "matching") {
                            var shuffleanswers = convertshuffleanswers(entries[i].gsx$barajarrespuestas.$t);
                            //var answernumbering = convertanswernumbering(entries[i].gsx$numerar.$t);
                            var noanswers = entries[i].gsx$numelecciones.$t;
                            if((entries[i].gsx$multi.$t) == "TRUE"){
                                var pregunta1;
                                if((entries[i].gsx$pregunta1.$t) == ""){
                                    pregunta1 = "";
                                } else {
                                    pregunta1 = "{mlang es}"+entries[i].gsx$pregunta1.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta1.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta1.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta1.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta1.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta1.$t+"{mlang}";
                                }
                                var respuesta1 = "{mlang es}"+entries[i].gsx$respuesta1.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta1.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta1.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta1.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta1.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta1.$t+"{mlang}";
                                var pregunta2;
                                if((entries[i].gsx$pregunta2.$t) == ""){
                                    pregunta2 = "";
                                } else {
                                    pregunta2 = "{mlang es}"+entries[i].gsx$pregunta2.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta2.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta2.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta2.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta2.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta2.$t+"{mlang}";
                                }
                                var respuesta2 = "{mlang es}"+entries[i].gsx$respuesta2.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta2.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta2.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta2.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta2.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta2.$t+"{mlang}";
                                var pregunta3;
                                if((entries[i].gsx$pregunta3.$t) == ""){
                                    pregunta3 = "";
                                } else {
                                    pregunta3 = "{mlang es}"+entries[i].gsx$pregunta3.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta3.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta3.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta3.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta3.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta3.$t+"{mlang}";
                                }
                                var respuesta3 = "{mlang es}"+entries[i].gsx$respuesta3.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta3.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta3.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta3.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta3.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta3.$t+"{mlang}";
                                var pregunta4;
                                if((entries[i].gsx$pregunta4.$t) == ""){
                                    pregunta4 = "";
                                } else {
                                    pregunta4 = "{mlang es}"+entries[i].gsx$pregunta4.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta4.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta4.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta4.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta4.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta4.$t+"{mlang}";
                                }
                                var respuesta4 = "{mlang es}"+entries[i].gsx$respuesta4.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta4.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta4.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta4.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta4.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta4.$t+"{mlang}";
                                var pregunta5;
                                if((entries[i].gsx$pregunta5.$t) == ""){
                                    pregunta5 = "";
                                } else {
                                    pregunta5 = "{mlang es}"+entries[i].gsx$pregunta5.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta5.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta5.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta5.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta5.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta5.$t+"{mlang}";
                                }
                                var respuesta5 = "{mlang es}"+entries[i].gsx$respuesta5.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta5.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta5.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta5.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta5.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta5.$t+"{mlang}";
                                var pregunta6;
                                if((entries[i].gsx$pregunta6.$t) == ""){
                                    pregunta6 = "";
                                } else {
                                    pregunta6 = "{mlang es}"+entries[i].gsx$pregunta6.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta6.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta6.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta6.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta6.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta6.$t+"{mlang}";
                                }
                                var respuesta6 = "{mlang es}"+entries[i].gsx$respuesta6.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta6.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta6.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta6.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta6.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta6.$t+"{mlang}";
                                var pregunta7;
                                if((entries[i].gsx$pregunta7.$t) == ""){
                                    pregunta7 = "";
                                } else {
                                    pregunta7 = "{mlang es}"+entries[i].gsx$pregunta7.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta7.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta7.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta7.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta7.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta7.$t+"{mlang}";
                                }
                                var respuesta7 = "{mlang es}"+entries[i].gsx$respuesta7.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta7.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta7.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta7.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta7.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta7.$t+"{mlang}";
                                var pregunta8;
                                if((entries[i].gsx$pregunta8.$t) == ""){
                                    pregunta8 = "";
                                } else {
                                    pregunta8 = "{mlang es}"+entries[i].gsx$pregunta8.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta8.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta8.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta8.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta8.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta8.$t+"{mlang}";
                                }
                                var respuesta8 = "{mlang es}"+entries[i].gsx$respuesta8.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta8.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta8.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta8.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta8.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta8.$t+"{mlang}";
                                var pregunta9;
                                if((entries[i].gsx$pregunta9.$t) == ""){
                                    pregunta9 = "";
                                } else {
                                    pregunta9 = "{mlang es}"+entries[i].gsx$pregunta9.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta9.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta9.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta9.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta9.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta9.$t+"{mlang}";
                                }
                                var respuesta9 = "{mlang es}"+entries[i].gsx$respuesta9.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta9.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta9.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta9.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta9.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta9.$t+"{mlang}";
                                var pregunta10;
                                if((entries[i].gsx$pregunta10.$t) == ""){
                                    pregunta10 = "";
                                } else {
                                    pregunta10 = "{mlang es}"+entries[i].gsx$pregunta10.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta10.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta10.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta10.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta10.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta10.$t+"{mlang}";
                                }
                                var respuesta10 = "{mlang es}"+entries[i].gsx$respuesta10.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta10.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta10.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta10.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta10.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta10.$t+"{mlang}";
                                var pregunta11;
                                if((entries[i].gsx$pregunta11.$t) == ""){
                                    pregunta11 = "";
                                } else {
                                    pregunta11 = "{mlang es}"+entries[i].gsx$pregunta11.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta11.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta11.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta11.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta11.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta11.$t+"{mlang}";
                                }
                                var respuesta11 = "{mlang es}"+entries[i].gsx$respuesta11.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta11.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta11.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta11.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta11.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta11.$t+"{mlang}";
                                var pregunta12;
                                if((entries[i].gsx$pregunta12.$t) == ""){
                                    pregunta12 = "";
                                } else {
                                    pregunta12 = "{mlang es}"+entries[i].gsx$pregunta12.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta12.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta12.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta12.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta12.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta12.$t+"{mlang}";
                                }
                                var respuesta12 = "{mlang es}"+entries[i].gsx$respuesta12.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta12.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta12.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta12.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta12.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta12.$t+"{mlang}";
                                var pregunta13;
                                if((entries[i].gsx$pregunta13.$t) == ""){
                                    pregunta13 = "";
                                } else {
                                    pregunta13 = "{mlang es}"+entries[i].gsx$pregunta13.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta13.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta13.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta13.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta13.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta13.$t+"{mlang}";
                                }
                                var respuesta13 = "{mlang es}"+entries[i].gsx$respuesta13.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta13.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta13.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta13.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta13.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta13.$t+"{mlang}";
                                var pregunta14;
                                if((entries[i].gsx$pregunta14.$t) == ""){
                                    pregunta14 = "";
                                } else {
                                    pregunta14 = "{mlang es}"+entries[i].gsx$pregunta14.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta14.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta14.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta14.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta14.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta14.$t+"{mlang}";
                                }
                                var respuesta14 = "{mlang es}"+entries[i].gsx$respuesta14.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta14.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta14.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta14.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta14.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta14.$t+"{mlang}";
                                var pregunta15;
                                if((entries[i].gsx$pregunta15.$t) == ""){
                                    pregunta15 = "";
                                } else {
                                    pregunta15 = "{mlang es}"+entries[i].gsx$pregunta15.$t+"{mlang}{mlang ca}"
                                    +entries[i+1].gsx$pregunta15.$t+"{mlang}{mlang ca_valencia}"
                                    +entries[i+2].gsx$pregunta15.$t+"{mlang}{mlang en}"
                                    +entries[i+3].gsx$pregunta15.$t+"{mlang}{mlang eu}"
                                    +entries[i+4].gsx$pregunta15.$t+"{mlang}{mlang gl}"
                                    +entries[i+5].gsx$pregunta15.$t+"{mlang}";
                                }
                                var respuesta15 = "{mlang es}"+entries[i].gsx$respuesta15.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$respuesta15.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$respuesta15.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$respuesta15.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$respuesta15.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$respuesta15.$t+"{mlang}";
                                var retroalimentacioncorrecta = "{mlang es}"+entries[i].gsx$retroalimentacioncorrecta.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacioncorrecta.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacioncorrecta.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacioncorrecta.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacioncorrecta.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacioncorrecta.$t+"{mlang}";
                                var retroalimentacionparcial = "{mlang es}"+entries[i].gsx$retroalimentacionparcial.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacionparcial.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacionparcial.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacionparcial.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacionparcial.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacionparcial.$t+"{mlang}";
                                var retroalimentacionincorrecta = "{mlang es}"+entries[i].gsx$retroalimentacionincorrecta.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacionincorrecta.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacionincorrecta.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacionincorrecta.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacionincorrecta.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacionincorrecta.$t+"{mlang}";
                            } else {
                                var pregunta1 = entries[i].gsx$pregunta1.$t;               
                                var pregunta2 = entries[i].gsx$pregunta2.$t; 
                                var pregunta3 = entries[i].gsx$pregunta3.$t;   
                                var pregunta4 = entries[i].gsx$pregunta4.$t;   
                                var pregunta5 = entries[i].gsx$pregunta5.$t;               
                                var pregunta6 = entries[i].gsx$pregunta6.$t; 
                                var pregunta7 = entries[i].gsx$pregunta7.$t;   
                                var pregunta8 = entries[i].gsx$pregunta8.$t;  
                                var pregunta9 = entries[i].gsx$pregunta9.$t;  
                                var pregunta10 = entries[i].gsx$pregunta10.$t;  
                                var pregunta11 = entries[i].gsx$pregunta11.$t;  
                                var pregunta12 = entries[i].gsx$pregunta12.$t;  
                                var pregunta13 = entries[i].gsx$pregunta13.$t;  
                                var pregunta14 = entries[i].gsx$pregunta14.$t;  
                                var pregunta15 = entries[i].gsx$pregunta15.$t;  
                                var respuesta1 = entries[i].gsx$respuesta1.$t;
                                var respuesta2 = entries[i].gsx$respuesta2.$t;
                                var respuesta3 = entries[i].gsx$respuesta3.$t;
                                var respuesta4 = entries[i].gsx$respuesta4.$t;
                                var respuesta5 = entries[i].gsx$respuesta5.$t;
                                var respuesta6 = entries[i].gsx$respuesta6.$t;
                                var respuesta7 = entries[i].gsx$respuesta7.$t;
                                var respuesta8 = entries[i].gsx$respuesta8.$t;
                                var respuesta9 = entries[i].gsx$respuesta9.$t;
                                var respuesta10 = entries[i].gsx$respuesta10.$t;
                                var respuesta11 = entries[i].gsx$respuesta11.$t;
                                var respuesta12 = entries[i].gsx$respuesta12.$t;
                                var respuesta13 = entries[i].gsx$respuesta13.$t;
                                var respuesta14 = entries[i].gsx$respuesta14.$t;
                                var respuesta15 = entries[i].gsx$respuesta15.$t;
                            }
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
                            _qf__qtype_match_edit_form:1,
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
                            shuffleanswers: shuffleanswers,
                            "subquestions[0][text]:": pregunta1,
                            "subquestions[0][format]": 1,
                            "subanswers[0]": respuesta1,
                            "subquestions[1][text]:": pregunta2,
                            "subquestions[1][format]": 1,
                            "subanswers[1]": respuesta2,
                            "subquestions[2][text]:": pregunta3,
                            "subquestions[2][format]": 1,
                            "subanswers[2]": respuesta3,
                            "subquestions[3][text]:": pregunta4,
                            "subquestions[3][format]": 1,
                            "subanswers[3]": respuesta4,
                            "subquestions[4][text]:": pregunta5,
                            "subquestions[4][format]": 1,
                            "subanswers[4]": respuesta5,
                            "subquestions[5][text]:": pregunta6,
                            "subquestions[5][format]": 1,
                            "subanswers[5]": respuesta6,
                            "subquestions[6][text]:": pregunta7,
                            "subquestions[6][format]": 1,
                            "subanswers[6]": respuesta7,
                            "subquestions[7][text]:": pregunta8,
                            "subquestions[7][format]": 1,
                            "subanswers[7]": respuesta8,
                            "subquestions[8][text]:": pregunta9,
                            "subquestions[8][format]": 1,
                            "subanswers[8]": respuesta9,
                            "subquestions[9][text]:": pregunta10,
                            "subquestions[9][format]": 1,
                            "subanswers[9]": respuesta10,
                            "subquestions[10][text]:": pregunta11,
                            "subquestions[10][format]": 1,
                            "subanswers[10]": respuesta11,
                            "subquestions[11][text]:": pregunta12,
                            "subquestions[11][format]": 1,
                            "subanswers[11]": respuesta12,
                            "subquestions[12][text]:": pregunta13,
                            "subquestions[12][format]": 1,
                            "subanswers[12]": respuesta13,
                            "subquestions[13][text]:": pregunta14,
                            "subquestions[13][format]": 1,
                            "subanswers[13]": respuesta14,
                            "subquestions[14][text]:": pregunta15,
                            "subquestions[14][format]": 1,
                            "subanswers[14]": respuesta15,
                            "correctfeedback[text]": retroalimentacioncorrecta,
                            "correctfeedback[format]": 1,
                            "partiallycorrectfeedback[text]": retroalimentacionparcial,
                            "partiallycorrectfeedback[format]": 1,
                            "incorrectfeedback[text]": retroalimentacionincorrecta,
                            "incorrectfeedback[format]": 1
                        };
                        if (tags !== "") {
                            obj["tags[]"]  = tags;
                        }
                        datos.push(obj);
                        idspreguntas.push(idpregunta);
                    }
                        if (questiontype == "gapselect"|| questiontype == "ddwtos") {
                            var shuffleanswers = convertshuffleanswers(entries[i].gsx$barajarrespuestas.$t);
                            var noanswers = entries[i].gsx$numrespuestas.$t;
                            var opcion1 = entries[i].gsx$opcion1.$t;
                            var opcion2 = entries[i].gsx$opcion2.$t;
                            var opcion3 = entries[i].gsx$opcion3.$t;
                            var opcion4 = entries[i].gsx$opcion4.$t;
                            var opcion5 = entries[i].gsx$opcion5.$t;
                            var opcion6 = entries[i].gsx$opcion6.$t;  
                            var opcion7 = entries[i].gsx$opcion7.$t;
                            var opcion8 = entries[i].gsx$opcion8.$t;    
                            var opcion9 = entries[i].gsx$opcion9.$t;   
                            var opcion10 = entries[i].gsx$opcion10.$t;
                            var opcion11 = entries[i].gsx$opcion11.$t;    
                            var opcion12 = entries[i].gsx$opcion12.$t;   
                            var grupo1 = entries[i].gsx$grupo1.$t;
                            var grupo2 = entries[i].gsx$grupo2.$t;
                            var grupo3 = entries[i].gsx$grupo3.$t;
                            var grupo4 = entries[i].gsx$grupo4.$t;
                            var grupo5 = entries[i].gsx$grupo5.$t;
                            var grupo6 = entries[i].gsx$grupo6.$t;
                            var grupo7 = entries[i].gsx$grupo7.$t;
                            var grupo8 = entries[i].gsx$grupo8.$t;
                            var grupo9 = entries[i].gsx$grupo9.$t;
                            var grupo10 = entries[i].gsx$grupo10.$t;
                            var grupo11 = entries[i].gsx$grupo11.$t;
                            var grupo12 = entries[i].gsx$grupo12.$t;
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
                                mform_isexpanded_id_generalheader:1,
                                mform_isexpanded_id_combinedfeedbackhdr:0,
                                mform_isexpanded_id_multitriesheader:0,
                                mform_isexpanded_id_tagsheader:0,
                                mform_isexpanded_id_coursetagsheader:0,
                                category: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciado,
                                "questiontext[format]": 1,
                                defaultmark: defaultmark,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                shuffleanswers: shuffleanswers,
                                "choices[0]answer": opcion1,
                                "choices[0][choicegroup]": grupo1,
                                "choices[1]answer": opcion2,
                                "choices[1][choicegroup]": grupo2,
                                "choices[2]answer": opcion3,
                                "choices[2][choicegroup]": grupo3,
                                "choices[3]answer": opcion4,
                                "choices[3][choicegroup]": grupo4,
                                "choices[4]answer": opcion5,
                                "choices[4][choicegroup]": grupo5,
                                "choices[5]answer": opcion6,
                                "choices[5][choicegroup]": grupo6,
                                "choices[6]answer": opcion7,
                                "choices[6][choicegroup]": grupo7,
                                "choices[7]answer": opcion8,
                                "choices[7][choicegroup]": grupo8,
                                "choices[8]answer": opcion9,
                                "choices[8][choicegroup]": grupo9,
                                "choices[9]answer": opcion10,
                                "choices[9][choicegroup]": grupo10,
                                "choices[10]answer": opcion11,
                                "choices[10][choicegroup]": grupo11,
                                "choices[11]answer": opcion12,
                                "choices[11][choicegroup]": grupo12
                                };
                            if (tipo == "gapselect") {
                                obj["_qf__qtype_gapselect_edit_form"] = "1";
                            }
                            if (tipo == "ddwtos") {
                                obj["_qf__qtype_ddwtos_edit_form"] = "1";
                            }
                            if (tags !== "") {
                                obj["tags[]"]  = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                            idspreguntas.push(nombre);
                        }
                        if (questiontype == "gapfill") {
                            if((entries[i].gsx$multi.$t) == "TRUE"){
                             } else {
                            var enunciadosinmlang = entries[i].gsx$enunciadopregunta.$t;
                            var respuestasincorrectas = "{mlang "+idioma+"}"+entries[i].gsx$respuestasincorrectas.$t+"{mlang}";
                            var retroalimentacioncorrecta = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacioncorrecta.$t+"{mlang}";
                            var retroalimentacionparcial = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacionparcial.$t+"{mlang}";
                            var retroalimentacionincorrecta = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacionincorrecta.$t+"{mlang}";
                            }
                        var delimitchars = entries[i].gsx$caracteresdelimitadores.$t
                        var answerdisplay = convertanswerdisplay(entries[i].gsx$muestralasrespuestas.$t);
                        var fixedgapsize = converttruefalse(entries[i].gsx$tamanofijohuecos.$t);
                        var singleuse = converttruefalse(entries[i].gsx$arrastrablesusounico.$t);
                        var optionsaftertext = converttruefalse(entries[i].gsx$opcionesdespuestexto.$t);
                        var disableregex = converttruefalse(entries[i].gsx$deshabilitarregex.$t);
                        var letterhints = converttruefalse(entries[i].gsx$pistasdeletra.$t);
                        var noduplicates = converttruefalse(entries[i].gsx$sinduplicados.$t);
                        var casesensitive = converttruefalse(entries[i].gsx$mayuscminusc.$t);    
                        var obj = {
                            reload: 1,
                            itemsettings: "",
                            numhints: 2,                        
                            id: idpregunta,
                            inpopup: 0,
                            cmid:"",
                            courseid: courseid,
                            scrollpos:0,
                            appendqnumstring:"",
                            qtype: tipo,
                            makecopy:0,
                            sesskey: sesskey,
                            _qf__qtype_gapfill_edit_form:1,
                            mform_showmore_id_feedbackheader:0,
                            mform_isexpanded_id_generalheader:1,
                            mform_isexpanded_id_combinedfeedbackhdr:0,
                            mform_isexpanded_id_multitriesheader:0,
                            mform_isexpanded_id_tagsheader:0,
                            category: idcategoria,
                            name: nombre,
                            "questiontext[text]": enunciadosinmlang,
                            "questiontext[format]": 1,
                            "wronganswers[text]": respuestasincorrectas,
                            "wronganswers[format]": 1,
                            "generalfeedback[text]": generalfeedback,
                            "generalfeedback[format]": 1,
                            delimitchars: delimitchars,
                            answerdisplay: answerdisplay,
                            fixedgapsize: fixedgapsize,
                            singleuse: singleuse,
                            optionsaftertext: optionsaftertext,
                            disableregex: disableregex,
                            letterhints: letterhints,
                            noduplicates: noduplicates,
                            casesensitive: casesensitive,
                            "correctfeedback[text]": retroalimentacioncorrecta,
                            "correctfeedback[format]": 1,
                            "partiallycorrectfeedback[text]": retroalimentacionparcial,
                            "partiallycorrectfeedback[format]": 1,
                            "incorrectfeedback[text]": retroalimentacionincorrecta,
                            "incorrectfeedback[format]": 1
                        };
                        if (tags !== "") {
                            obj["tags[]"]  = tags;
                        }
                        datos.push(obj);
                        idspreguntas.push(nombre);
                    }
                    if (questiontype == "numerical") {
                        if((entries[i].gsx$multi.$t) == "TRUE"){
                              var retroalimentacion1 = "{mlang es}"+entries[i].gsx$retroalimentacion1.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion1.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion1.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion1.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion1.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion1.$t+"{mlang}";
                              var retroalimentacion2 = "{mlang es}"+entries[i].gsx$retroalimentacion2.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion2.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion2.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion2.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion2.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion2.$t+"{mlang}";
                              var retroalimentacion3 = "{mlang es}"+entries[i].gsx$retroalimentacion3.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion3.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion3.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion3.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion3.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion3.$t+"{mlang}";
                              var retroalimentacion4 = "{mlang es}"+entries[i].gsx$retroalimentacion4.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion4.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion4.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion4.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion4.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion4.$t+"{mlang}";
                              var retroalimentacion5 = "{mlang es}"+entries[i].gsx$retroalimentacion5.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion5.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion5.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion5.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion5.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion5.$t+"{mlang}";
                              var retroalimentacion6 = "{mlang es}"+entries[i].gsx$retroalimentacion6.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion6.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion6.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion6.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion6.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion6.$t+"{mlang}";
                              var retroalimentacion7 = "{mlang es}"+entries[i].gsx$retroalimentacion7.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion7.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion7.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion7.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion7.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion7.$t+"{mlang}";
                              var retroalimentacion8 = "{mlang es}"+entries[i].gsx$retroalimentacion8.$t+"{mlang}{mlang ca}"
                                +entries[i+1].gsx$retroalimentacion8.$t+"{mlang}{mlang ca_valencia}"
                                +entries[i+2].gsx$retroalimentacion8.$t+"{mlang}{mlang en}"
                                +entries[i+3].gsx$retroalimentacion8.$t+"{mlang}{mlang eu}"
                                +entries[i+4].gsx$retroalimentacion8.$t+"{mlang}{mlang gl}"
                                +entries[i+5].gsx$retroalimentacion8.$t+"{mlang}";
                        } else {
                            var retroalimentacion1 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion1.$t+"{mlang}";
                            var retroalimentacion2 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion2.$t+"{mlang}";
                            var retroalimentacion3 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion3.$t+"{mlang}";
                            var retroalimentacion4 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion4.$t+"{mlang}";
                            var retroalimentacion5 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion5.$t+"{mlang}";
                            var retroalimentacion6 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion6.$t+"{mlang}";
                            var retroalimentacion7 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion7.$t+"{mlang}";
                            var retroalimentacion8 = "{mlang "+idioma+"}"+entries[i].gsx$retroalimentacion8.$t+"{mlang}";
                        }
                        var fraction1 = convertCalif(entries[i].gsx$calif1.$t);
                        var fraction2 = convertCalif(entries[i].gsx$calif2.$t);
                        var fraction3 = convertCalif(entries[i].gsx$calif3.$t);
                        var fraction4 = convertCalif(entries[i].gsx$calif4.$t);
                        var fraction5 = convertCalif(entries[i].gsx$calif5.$t);
                        var fraction6 = convertCalif(entries[i].gsx$calif6.$t);
                        var fraction7 = convertCalif(entries[i].gsx$calif7.$t);
                        var fraction8 = convertCalif(entries[i].gsx$calif8.$t);
                        var respuesta1 = entries[i].gsx$respuesta1.$t;
                        var respuesta2 = entries[i].gsx$respuesta2.$t;                        
                        var respuesta3 = entries[i].gsx$respuesta3.$t;
                        var respuesta4 = entries[i].gsx$respuesta4.$t;
                        var respuesta5 = entries[i].gsx$respuesta5.$t;
                        var respuesta6 = entries[i].gsx$respuesta6.$t;
                        var respuesta7 = entries[i].gsx$respuesta7.$t;
                        var respuesta8 = entries[i].gsx$respuesta8.$t;
                        var error1 = entries[i].gsx$error1.$t;
                        var error2 = entries[i].gsx$error2.$t;
                        var error3 = entries[i].gsx$error3.$t;
                        var error4 = entries[i].gsx$error4.$t;
                        var error5 = entries[i].gsx$error5.$t;
                        var error6 = entries[i].gsx$error6.$t;
                        var error7 = entries[i].gsx$error7.$t;
                        var error8 = entries[i].gsx$error8.$t;
                        var noanswers = entries[i].gsx$numrespuestas.$t;   
                        var obj = {
                            mform_isexpanded_id_answerhdr: 1,
                            noanswers: noanswers, 
                            nounits: 1,
                            numhints: 2,
                            id: idpregunta,
                            inpopup: 0,
                            cmid:"",
                            courseid: courseid,
                            scrollpos:0,
                            appendqnumstring:"",
                            qtype: tipo,
                            makecopy:0,
                            sesskey: sesskey,
                            _qf__qtype_numerical_edit_form:1,
                            mform_isexpanded_id_generalheader:1,
                            mform_isexpanded_id_unithandling:1,                         
                            mform_isexpanded_id_unithdr:1,
                            mform_isexpanded_id_multitriesheader:0,
                            mform_isexpanded_id_tagsheader:0,
                            category: idcategoria,
                            name: nombre,
                            "questiontext[text]": enunciado,
                            "questiontext[format]": 1,
                            defaultmark: defaultmark,
                            "answer[0]": respuesta1,
                            "torelance[0]": error1,
                            "fraction[0]": fraction1,
                            "answer[1]": respuesta2,
                            "tolerance[1]": error2,
                            "fraction[1]": fraction2,
                            "answer[2]": respuesta3,
                            "tolerance[2]": error3,
                            "fraction[2]": fraction3,
                            "answer[3]": respuesta4,
                            "tolerance[3]": error4,
                            "fraction[3]": fraction4,
                            "answer[4]": eleccion5,
                            "tolerance[4]": error5,
                            "fraction[4]": fraction5,
                            "answer[5]": eleccion6,
                            "tolerance[5]": error6,
                            "fraction[5]": fraction6,
                            "answer[6]": eleccion7,
                            "tolerance[6]": error7,
                            "fraction[6]": fraction7,
                            "answer[7]": eleccion8,
                            "tolerance[7]": error8,
                            "fraction[7]": fraction8,                              
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
                            "generalfeedback[text]": generalfeedback,
                            "generalfeedback[format]": 1
                        };
                        if (tags !== "") {
                            obj["tags[]"]  = tags;
                        }
                        datos.push(obj);
                        idspreguntas.push(nombre);
                    }
                    if (questiontype == "gapfill") {
                        if((entries[i][2]) == "TRUE"){
                            var enunciadogapfill = "{mlang es}"+entries[i][15]+"{mlang};
                            enunciadogapfill = enunciadogapfill.replace("[", "{mlang}[");
                            enunciadogapfill = enunciadogapfill.replace("]", "]{mlang es}");
                            var retroalimentacioncorrecta = "{mlang es}"+entries[i][28]+"{mlang}{mlang ca}"
                            +entries[i+1][28]"{mlang}{mlang ca_valencia}"
                            +entries[i+2][28]+"{mlang}{mlang en}"
                            +entries[i+3][28]+"{mlang}{mlang eu}"
                            +entries[i+4][28]+"{mlang}{mlang gl}"
                            +entries[i+5][28]+"{mlang}";
                            var retroalimentacionparcial = "{mlang es}"+entries[i][29]+"{mlang}{mlang ca}"
                            +entries[i+1][29]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][29]+"{mlang}{mlang en}"
                            +entries[i+3][29]+"{mlang}{mlang eu}"
                            +entries[i+4][29]+"{mlang}{mlang gl}"
                            +entries[i+5][29]+"{mlang}";
                            var retroalimentacionincorrecta = "{mlang es}"+entries[i][30]+"{mlang}{mlang ca}"
                            +entries[i+1][30]+"{mlang}{mlang ca_valencia}"
                            +entries[i+2][30]+"{mlang}{mlang en}"
                            +entries[i+3][30]+"{mlang}{mlang eu}"
                            +entries[i+4][30]+"{mlang}{mlang gl}"
                            +entries[i+5][30]+"{mlang}";
                        } else {
                            var enunciadogapfill = "{mlang "+idioma+"}"+entries[i][25]+"{mlang}";
                            var retroalimentacioncorrecta = "{mlang "+idioma+"}"+entries[i][28]+"{mlang}";
                            var retroalimentacionparcial = "{mlang "+idioma+"}"+entries[i][29]+"{mlang}";
                            var retroalimentacionincorrecta = "{mlang "+idioma+"}"+entries[i][30]+"{mlang}";
                        }
                        var idnumber = entries[i][18];
                        var delimitchars = entries[i][19];
                        var answerdisplay = entries[i][20];
                        var fixedgapsize = converttruefalse(entries[i][21]);
                        var singleuse = converttruefalse(entries[i][22]);
                        var optionsaftertext = converttruefalse(entries[i][23]);
                        var disableregex = converttruefalse(entries[i][24]);
                        var letterhints = converttruefalse(entries[i][25]);
                        var noduplicates = converttruefalse(entries[i].[26]);
                        var casesensitive = converttruefalse(entries[i][27]);   
                        var tags =  entries[i][31];
                        var obj = {
                            reaload: 1,
                            itemsettings: "[]",
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
                            _qf__qtype_ordering_edit_form:1,
                            mform_showmore_id_feedbackheader:0,
                            mform_isexpanded_id_generalheader:1,
                            mform_isexpanded_id_feedbackheader:1,
                            mform_isexpanded_id_combinedfeedbackhdr:0,
                            mform_isexpanded_id_multitriesheader:0,
                            mform_isexpanded_id_tagsheader:0,
                            mform_isexpanded_id_coursetagsheader:0,
                            mform_isexpanded_id_createdmodifiedheader:0,
                            category: idcategoria,
                            name: nombre,
                            "questiontext[text]": enunciado,
                            "questiontext[format]": 1,
                            "generalfeedback[text]": generalfeedback,
                            "generalfeedback[format]": 1,
                            idnumber: idnumber,
                            delimitchars: delimitchars,
                            answerdisplay: answerdisplay,
                            fixedgapsize: fixedgapsize,
                            singleuse: singleuse,
                            optionsaftertext: optionsaftertext,
                            disableregex: disableregex,
                            letterhints: letterhints,
                            noduplicates: noduplicates,
                            casesensitive: casesensitive,
                            "correctfeedback[text]": retroalimentacioncorrecta,
                            "correctfeedback[format]": 1,
                            "partiallycorrectfeedback[text]": retroalimentacionparcial,
                            "partiallycorrectfeedback[format]": 1,
                            "incorrectfeedback[text]": retroalimentacionincorrecta,
                            "incorrectfeedback[format]": 1
                        };
                        if (tags !== "") {
                            obj["tags[]"]  = tags;
                        }
                        datos.push(obj);
                        idspreguntas.push(nombre);
                    }
                        
                        
            }
            
        }
//        var contador = 1;
//        datos.forEach(function(dato, index) {
//            $.ajax({
//                type: "POST",
//                url: "https://contenidos.sallenet.org/question/question.php",
//                data: dato,
//                success: function(text) {
//                    $( ".no-overflow" ).append( "<p>Pregunta "+contador+" de "+numberofquestions+" editada</p>" );
//                    contador++;
//                    idcategoria = idcategoria.replace(",", "%2C");
//                    $.get(`https://contenidos.sallenet.org/question/edit.php?courseid=${courseid}&cat=${idcategoria}` , function(datas) {
//                        var idpreg = $("label:contains('HTTPS')", datas).attr('for');
//                        idpreg = idpreg.replace("checkq", "");
//                        idspreguntas.push(idpreg);
//                        alert(idpreg);
//                    });
//                }
//            });
//            alert(idspreguntas);
//        });

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
    if (data == "Sin numeración"){ answernumbering = "none"}
    return answernumbering;
}
function convertgradingtype(data){
    var gradingtype;    
    if (data == "All or nothing"){ gradingtype = "-1"}
    if (data == "Absolute position"){ gradingtype = 0}
    if (data == "Relative to correct position"){ gradingtype = 7}
    if (data == "Relative to the next item (excluding last)"){ gradingtype = 1}
    if (data == "Relative to the next item (including last)"){ gradingtype = 2}
    if (data == "Relative to both the previous and next items"){ gradingtype = 3}
    if (data == "Relative to ALL the previous and next items"){ gradingtype = 4}
    if (data == "Longest ordered subset"){ gradingtype = 5}
    if (data == "Longest contiguous subset"){ gradingtype = 6}
    return gradingtype;
}
function convertlayouttype(data){
    var layouttype;
    if (data == "Vertical"){ layouttype = 0}
    if (data == "Horizontal"){ layouttype = 1}
    return layouttype;
}
function convertitemselectiontype(data){
    var itemselectiontype;
    if (data == "Select all items"){ itemselectiontype = 0}
    if (data == "Select a random subset of items"){ itemselectiontype = 1}
    if (data == "Select a contiguous subset of items"){ itemselectiontype = 2}
    return itemselectiontype;
}
function convertsizeofsubset(data){
    var sizeofsubset;
    if (data == "Todos"){ sizeofsubset = 0} 
        else { sizeofsubset = data}
    return sizeofsubset;
}
function convertgradingdetails(data){
    var gradingdetails;
    if (data == "Ocultar"){ gradingdetails = 0}
    if (data == "Mostrar"){ gradingdetails = 1}
    return gradingdetails;
}
function convertshowstandardinstruction(data){
    var showstandardinstruction;
    if (data == "Sí"){ showstandardinstruction = 1}
    if (data == "No"){ showstandardinstruction = 0}
    return showstandardinstruction;
}
function convertanswerdisplay(data){
    var answerdisplay;
    if (data == "Arrastrar/ soltar"){ answerdisplay = "dragdrop"}
    if (data == "rellenar espacio"){ answerdisplay = "gapfill"}
    if (data == "desplegable"){ answerdisplay = "dropdown"}
    return answerdisplay;
}
function converttruefalse(data){
    var truefalse;
    if (data == "TRUE"){ truefalse = 1}
    if (data == "FALSE"){ truefalse = 0}
    return truefalse;
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
