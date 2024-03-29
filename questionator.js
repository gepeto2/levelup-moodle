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
        var urljson = "https://sheets.googleapis.com/v4/spreadsheets/" + sheet + "/values/" + page + "?key=" + key;
        var datos = [];
        var idspreguntas = [];

        $.getJSON(urljson, function(data) {
                var entries = data.values;
                for (i = 0; i < entries.length; i++) {
                    if ((entries[i][1]) == "TRUE") {
                        var idpregunta = entries[i][6];
                        var nombre = entries[i][14];
                        var tipo = entries[i][8];
                        var idcategoria = entries[i][10];
                        var courseid = entries[i][5];
                        if ((entries[i][2]) == "TRUE") {
                            var enunciado = "{mlang es" + "}" + entries[i][15] + "{mlang}{mlang ca" + "}" +
                                entries[i + 1][15] + "{mlang}{mlang ca_valencia" + "}" +
                                entries[i + 2][15] + "{mlang}{mlang en" + "}" +
                                entries[i + 3][15] + "{mlang}{mlang eu" + "}" +
                                entries[i + 4][15] + "{mlang}{mlang gl" + "}" +
                                entries[i + 5][15] + "{mlang}";
                            var generalfeedback = "{mlang es" + "}" + entries[i][17] + "{mlang}{mlang ca" + "}" +
                                entries[i + 1][17] + "{mlang}{mlang ca_valencia" + "}" +
                                entries[i + 2][17] + "{mlang}{mlang en" + "}" +
                                entries[i + 3][17] + "{mlang}{mlang eu" + "}" +
                                entries[i + 4][17] + "{mlang}{mlang gl" + "}" +
                                entries[i + 5][17] + "{mlang}";
                        } else {
                            var idioma = entries[i][3];
                            var enunciado = "{mlang " + idioma + "}" + entries[i][15] + "{mlang}";
                        }
                        var defaultmark = entries[i][16];
                        //    var tags = entries[i].gsx$tags.$t;
                        if (questiontype == "multichoice") {
                            if ((entries[i][2]) == "TRUE") {
                                var eleccion1 = "{mlang es" + "}" + entries[i][22] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][22] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][22] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][22] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][22] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][22] + "{mlang}";
                                var eleccion2 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][25] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][25] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][25] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][25] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][25] + "{mlang}";
                                var eleccion3 = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][28] + "{mlang}";
                                var eleccion4 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][31] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][31] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][31] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][31] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][31] + "{mlang}";
                                var eleccion5 = "{mlang es" + "}" + entries[i][34] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][34] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][34] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][34] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][34] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][34] + "{mlang}";
                                var eleccion6 = "{mlang es" + "}" + entries[i][37] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][37] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][37] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][37] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][37] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][37] + "{mlang}";
                                var eleccion7 = "{mlang es" + "}" + entries[i][40] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][40] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][40] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][40] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][40] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][40] + "{mlang}";
                                var eleccion8 = "{mlang es" + "}" + entries[i][43] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][43] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][43] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][43] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][43] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][43] + "{mlang}";
                                var eleccion9 = "{mlang es" + "}" + entries[i][46] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][46] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][46] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][46] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][46] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][46] + "{mlang}";
                                var eleccion10 = "{mlang es" + "}" + entries[i][49] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][49] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][49] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][49] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][49] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][49] + "{mlang}";
                                var eleccion11 = "{mlang es" + "}" + entries[i][52] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][52] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][52] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][52] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][52] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][52] + "{mlang}";
                                var eleccion12 = "{mlang es" + "}" + entries[i][55] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][55] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][55] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][55] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][55] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][55] + "{mlang}";
                                var eleccion13 = "{mlang es" + "}" + entries[i][58] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][58] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][58] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][58] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][58] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][58] + "{mlang}";
                                var eleccion14 = "{mlang es" + "}" + entries[i][61] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][61] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][61] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][61] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][61] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][61] + "{mlang}";
                                var eleccion15 = "{mlang es" + "}" + entries[i][64] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][64] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][64] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][64] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][64] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][64] + "{mlang}";
                                var retroalimentacion1 = "{mlang es" + "}" + entries[i][24] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][24] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][24] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][24] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][24] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][24] + "{mlang}";
                                var retroalimentacion2 = "{mlang es" + "}" + entries[i][27] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][27] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][27] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][27] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][27] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][27] + "{mlang}";
                                var retroalimentacion3 = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][30] + "{mlang}";
                                var retroalimentacion4 = "{mlang es" + "}" + entries[i][33] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][33] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][33] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][33] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][33] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][33] + "{mlang}";
                                var retroalimentacion5 = "{mlang es" + "}" + entries[i][36] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][36] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][36] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][36] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][36] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][36] + "{mlang}";
                                var retroalimentacion6 = "{mlang es" + "}" + entries[i][39] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][39] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][39] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][39] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][39] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][39] + "{mlang}";
                                var retroalimentacion7 = "{mlang es" + "}" + entries[i][42] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][42] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][42] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][42] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][42] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][42] + "{mlang}";
                                var retroalimentacion8 = "{mlang es" + "}" + entries[i][45] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][45] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][45] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][45] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][45] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][45] + "{mlang}";
                                var retroalimentacion9 = "{mlang es" + "}" + entries[i][48] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][48] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][48] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][48] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][48] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][48] + "{mlang}";
                                var retroalimentacion10 = "{mlang es" + "}" + entries[i][51] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][51] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][51] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][51] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][51] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][51] + "{mlang}";
                                var retroalimentacion11 = "{mlang es" + "}" + entries[i][54] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][54] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][54] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][54] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][54] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][54] + "{mlang}";
                                var retroalimentacion12 = "{mlang es" + "}" + entries[i][57] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][57] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][57] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][57] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][57] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][57] + "{mlang}";
                                var retroalimentacion13 = "{mlang es" + "}" + entries[i][60] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][60] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][60] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][60] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][60] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][60] + "{mlang}";
                                var retroalimentacion14 = "{mlang es" + "}" + entries[i][63] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][63] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][63] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][63] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][63] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][63] + "{mlang}";
                                var retroalimentacion15 = "{mlang es" + "}" + entries[i][66] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][66] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][66] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][66] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][66] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][66] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][68] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][68] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][68] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][68] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][68] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][68] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][69] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][69] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][69] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][69] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][69] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][69] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][70] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][70] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][70] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][70] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][70] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][70] + "{mlang}";
                            } else {
                                var eleccion1 = "{mlang " + idioma + "}" + entries[i][22] + "{mlang}";
                                var eleccion2 = "{mlang " + idioma + "}" + entries[i][25] + "{mlang}";
                                var eleccion3 = "{mlang " + idioma + "}" + entries[i][28] + "{mlang}";
                                var eleccion4 = "{mlang " + idioma + "}" + entries[i][31] + "{mlang}";
                                var eleccion5 = "{mlang " + idioma + "}" + entries[i][34] + "{mlang}";
                                var eleccion6 = "{mlang " + idioma + "}" + entries[i][37] + "{mlang}";
                                var eleccion7 = "{mlang " + idioma + "}" + entries[i][40] + "{mlang}";
                                var eleccion8 = "{mlang " + idioma + "}" + entries[i][43] + "{mlang}";
                                var eleccion9 = "{mlang " + idioma + "}" + entries[i][46] + "{mlang}";
                                var eleccion10 = "{mlang " + idioma + "}" + entries[i][49] + "{mlang}";
                                var eleccion11 = "{mlang " + idioma + "}" + entries[i][52] + "{mlang}";
                                var eleccion12 = "{mlang " + idioma + "}" + entries[i][55] + "{mlang}";
                                var eleccion13 = "{mlang " + idioma + "}" + entries[i][58] + "{mlang}";
                                var eleccion14 = "{mlang " + idioma + "}" + entries[i][61] + "{mlang}";
                                var eleccion15 = "{mlang " + idioma + "}" + entries[i][64] + "{mlang}";
                                var retroalimentacion1 = "{mlang " + idioma + "}" + entries[i][24] + "{mlang}";
                                var retroalimentacion2 = "{mlang " + idioma + "}" + entries[i][27] + "{mlang}";
                                var retroalimentacion3 = "{mlang " + idioma + "}" + entries[i][30] + "{mlang}";
                                var retroalimentacion4 = "{mlang " + idioma + "}" + entries[i][33] + "{mlang}";
                                var retroalimentacion5 = "{mlang " + idioma + "}" + entries[i][36] + "{mlang}";
                                var retroalimentacion6 = "{mlang " + idioma + "}" + entries[i][39] + "{mlang}";
                                var retroalimentacion7 = "{mlang " + idioma + "}" + entries[i][42] + "{mlang}";
                                var retroalimentacion8 = "{mlang " + idioma + "}" + entries[i][45] + "{mlang}";
                                var retroalimentacion9 = "{mlang " + idioma + "}" + entries[i][48] + "{mlang}";
                                var retroalimentacion10 = "{mlang " + idioma + "}" + entries[i][51] + "{mlang}";
                                var retroalimentacion11 = "{mlang " + idioma + "}" + entries[i][54] + "{mlang}";
                                var retroalimentacion12 = "{mlang " + idioma + "}" + entries[i][57] + "{mlang}";
                                var retroalimentacion13 = "{mlang " + idioma + "}" + entries[i][60] + "{mlang}";
                                var retroalimentacion14 = "{mlang " + idioma + "}" + entries[i][63] + "{mlang}";
                                var retroalimentacion15 = "{mlang " + idioma + "}" + entries[i][66] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][68] + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][69] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][70] + "{mlang}";
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
                            var tags = entries[i][71];
                            var obj = {
                                mform_isexpanded_id_answerhdr: 1,
                                noanswers: noanswers,
                                numhints: 2,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_multichoice_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_combinedfeedbackhdr: 0,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                categorymoveto: idcategoria,
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
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(nombre);
                        }
                        if (questiontype == "ordering") {
                            if ((entries[i][2]) == "TRUE") {
                                var item1 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][25] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][25] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][25] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][25] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][25] + "{mlang}";
                                var item2 = "{mlang es" + "}" + entries[i][26] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][26] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][26] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][26] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][26] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][26] + "{mlang}";
                                var item3 = "{mlang es" + "}" + entries[i][27] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][27] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][27] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][27] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][27] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][27] + "{mlang}";
                                var item4 = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][28] + "{mlang}";
                                var item5 = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][29] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][29] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][29] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][29] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][29] + "{mlang}";
                                var item6 = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][30] + "{mlang}";
                                var item7 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][31] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][31] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][31] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][31] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][31] + "{mlang}";
                                var item8 = "{mlang es" + "}" + entries[i][32] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][32] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][32] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][32] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][32] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][32] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][34] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][34] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][34] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][34] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][34] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][34] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][35] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][35] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][35] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][35] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][35] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][35] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][36] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][36] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][36] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][36] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][36] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][36] + "{mlang}";
                            } else {
                                var item1 = "{mlang " + idioma + "}" + entries[i][25] + "{mlang}";
                                var item2 = "{mlang " + idioma + "}" + entries[i][26] + "{mlang}";
                                var item3 = "{mlang " + idioma + "}" + entries[i][27] + "{mlang}";
                                var item4 = "{mlang " + idioma + "}" + entries[i][28] + "{mlang}";
                                var item5 = "{mlang " + idioma + "}" + entries[i][29] + "{mlang}";
                                var item6 = "{mlang " + idioma + "}" + entries[i][30] + "{mlang}";
                                var item7 = "{mlang " + idioma + "}" + entries[i][31] + "{mlang}";
                                var item8 = "{mlang " + idioma + "}" + entries[i][32] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][34] + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][35] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][36] + "{mlang}";
                            }
                            var idnumber = entries[i][18];
                            var layouttype = convertlayouttype(entries[i][19]);
                            var itemselectiontype = convertitemselectiontype(entries[i][20]);
                            var sizeofsubset = entries[i][21];
                            var gradingtype = convertgradingtype(entries[i][22]);
                            var gradingdetails = convertgradingdetails(entries[i][23]);
                            var numberthechoices = convertanswernumbering(entries[i][24]);
                            var countanswers = entries[i][33].$t;
                            var tags = entries[i][37];
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
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_ordering_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_combinedfeedbackhdr: 0,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                categorymoveto: idcategoria,
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
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(nombre);
                        }
                        if (questiontype == "shortanswer") {
                            var usecase = convertUsecase(entries[i][18]);
                            var noanswers = entries[i][43];
                            var tags = entries[i][44];
                            if ((entries[i][2]) == "TRUE") {
                                var respuestas = [];
                                var retros = [];
                                var califs = [];
                                if (entries[i][19] == "") {
                                    var answer0 = " ";
                                } else {
                                    var answer0 = entries[i][19];
                                }
                                var answer1 = entries[i + 1][19];
                                var answer2 = entries[i + 2][19];
                                var answer3 = entries[i + 3][19];
                                var answer4 = entries[i + 4][19];
                                var answer5 = entries[i + 5][19];
                                var answer6 = entries[i][22];
                                var answer7 = entries[i + 1][22];
                                //                   if (entries[i+2][22] == undefined) { var answer8 = " "} else { var answer8 = entries[i+2][22];}
                                var answer8 = entries[i + 2][22];
                                var answer9 = entries[i + 3][22];
                                var answer10 = entries[i + 4][22];
                                var answer11 = entries[i + 5][22];
                                var answer12 = entries[i][25];
                                var answer13 = entries[i + 1][25];
                                var answer14 = entries[i + 2][25];
                                var answer15 = entries[i + 3][25];
                                var answer16 = entries[i + 4][25];
                                var answer17 = entries[i + 5][25];
                                var answer18 = entries[i][28];
                                var answer19 = entries[i + 1][28];
                                var answer20 = entries[i + 2][28];
                                var answer21 = entries[i + 3][28];
                                var answer22 = entries[i + 4][28];
                                var answer23 = entries[i + 5][28];
                                var answer24 = entries[i][31];
                                var answer25 = entries[i + 1][31];
                                var answer26 = entries[i + 2][31];
                                var answer27 = entries[i + 3][31];
                                var answer28 = entries[i + 4][31];
                                var answer29 = entries[i + 5][31];
                                var answer30 = entries[i][34];
                                var answer31 = entries[i + 1][34];
                                var answer32 = entries[i + 2][34];
                                var answer33 = entries[i + 3][34];
                                var answer34 = entries[i + 4][34];
                                var answer35 = entries[i + 5][34];
                                var answer36 = entries[i][37];
                                var answer37 = entries[i + 1][37];
                                var answer38 = entries[i + 2][37];
                                var answer39 = entries[i + 3][37];
                                var answer40 = entries[i + 4][37];
                                var answer41 = entries[i + 5][37];
                                var answer42 = entries[i][40];
                                var answer43 = entries[i + 1][40];
                                var answer44 = entries[i + 2][40];
                                var answer45 = entries[i + 3][40];
                                var answer46 = entries[i + 4][40];
                                var answer47 = entries[i + 5][40];
                                var feedback0 = entries[i][21];
                                var feedback1 = entries[i + 1][21];
                                var feedback2 = entries[i + 2][21];
                                var feedback3 = entries[i + 3][21];
                                var feedback4 = entries[i + 4][21];
                                var feedback5 = entries[i + 5][21];
                                var feedback6 = entries[i][24];
                                var feedback7 = entries[i + 1][24];
                                var feedback8 = entries[i + 2][24];
                                var feedback9 = entries[i + 3][24];
                                var feedback10 = entries[i + 4][24];
                                var feedback11 = entries[i + 5][24];
                                var feedback12 = entries[i][27];
                                var feedback13 = entries[i + 1][27];
                                var feedback14 = entries[i + 2][27];
                                var feedback15 = entries[i + 3][27];
                                var feedback16 = entries[i + 4][27];
                                var feedback17 = entries[i + 5][27];
                                var feedback18 = entries[i][30];
                                var feedback19 = entries[i + 1][30];
                                var feedback20 = entries[i + 2][30];
                                var feedback21 = entries[i + 3][30];
                                var feedback22 = entries[i + 4][30];
                                var feedback23 = entries[i + 5][30];
                                var feedback24 = entries[i][33];
                                var feedback25 = entries[i + 1][33];
                                var feedback26 = entries[i + 2][33];
                                var feedback27 = entries[i + 3][33];
                                var feedback28 = entries[i + 4][33];
                                var feedback29 = entries[i + 5][33];
                                var feedback30 = entries[i][36];
                                var feedback31 = entries[i + 1][36];
                                var feedback32 = entries[i + 2][36];
                                var feedback33 = entries[i + 3][36];
                                var feedback34 = entries[i + 4][36];
                                var feedback35 = entries[i + 5][36];
                                var feedback36 = entries[i][39];
                                var feedback37 = entries[i + 1][39];
                                var feedback38 = entries[i + 2][39];
                                var feedback39 = entries[i + 3][39];
                                var feedback40 = entries[i + 4][39];
                                var feedback41 = entries[i + 5][39];
                                var feedback42 = entries[i][42];
                                var feedback43 = entries[i + 1][42];
                                var feedback44 = entries[i + 2][42];
                                var feedback45 = entries[i + 3][42];
                                var feedback46 = entries[i + 4][42];
                                var feedback47 = entries[i + 5][42];
                                var fraction0 = convertCalif(entries[i][20]);
                                var fraction1 = convertCalif(entries[i + 1][20]);
                                var fraction2 = convertCalif(entries[i + 2][20]);
                                var fraction3 = convertCalif(entries[i + 3][20]);
                                var fraction4 = convertCalif(entries[i + 4][20]);
                                var fraction5 = convertCalif(entries[i + 5][20]);
                                var fraction6 = convertCalif(entries[i][23]);
                                var fraction7 = convertCalif(entries[i + 1][23]);
                                var fraction8 = convertCalif(entries[i + 2][23]);
                                var fraction9 = convertCalif(entries[i + 3][23]);
                                var fraction10 = convertCalif(entries[i + 4][23]);
                                var fraction11 = convertCalif(entries[i + 5][23]);
                                var fraction12 = convertCalif(entries[i][26]);
                                var fraction13 = convertCalif(entries[i + 1][26]);
                                var fraction14 = convertCalif(entries[i + 2][26]);
                                var fraction15 = convertCalif(entries[i + 3][26]);
                                var fraction16 = convertCalif(entries[i + 4][26]);
                                var fraction17 = convertCalif(entries[i + 5][26]);
                                var fraction18 = convertCalif(entries[i][29]);
                                var fraction19 = convertCalif(entries[i + 1][29]);
                                var fraction20 = convertCalif(entries[i + 2][29]);
                                var fraction21 = convertCalif(entries[i + 3][29]);
                                var fraction22 = convertCalif(entries[i + 4][29]);
                                var fraction23 = convertCalif(entries[i + 5][29]);
                                var fraction24 = convertCalif(entries[i][32]);
                                var fraction25 = convertCalif(entries[i + 1][32]);
                                var fraction26 = convertCalif(entries[i + 2][32]);
                                var fraction27 = convertCalif(entries[i + 3][32]);
                                var fraction28 = convertCalif(entries[i + 4][32]);
                                var fraction29 = convertCalif(entries[i + 5][32]);
                                var fraction30 = convertCalif(entries[i][35]);
                                var fraction31 = convertCalif(entries[i + 1][35]);
                                var fraction32 = convertCalif(entries[i + 2][35]);
                                var fraction33 = convertCalif(entries[i + 3][35]);
                                var fraction34 = convertCalif(entries[i + 4][35]);
                                var fraction35 = convertCalif(entries[i + 5][35]);
                                var fraction36 = convertCalif(entries[i][38]);
                                var fraction37 = convertCalif(entries[i + 1][38]);
                                var fraction38 = convertCalif(entries[i + 2][38]);
                                var fraction39 = convertCalif(entries[i + 3][38]);
                                var fraction40 = convertCalif(entries[i + 4][38]);
                                var fraction41 = convertCalif(entries[i + 5][38]);
                                var fraction42 = convertCalif(entries[i][41]);
                                var fraction43 = convertCalif(entries[i + 1][41]);
                                var fraction44 = convertCalif(entries[i + 2][41]);
                                var fraction45 = convertCalif(entries[i + 3][41]);
                                var fraction46 = convertCalif(entries[i + 4][41]);
                                var fraction47 = convertCalif(entries[i + 5][41]);

                            } else {
                                var answer0 = entries[i][19];
                                var answer1 = entries[i][22];
                                var answer2 = entries[i][25];
                                var answer3 = entries[i][28];
                                var answer4 = entries[i][31];
                                var answer5 = entries[i][34];
                                var answer6 = entries[i][37];
                                var answer7 = entries[i][40];

                                var feedback0 = entries[i][21];
                                var feedback1 = entries[i][24];
                                var feedback2 = entries[i][27];
                                var feedback3 = entries[i][30];
                                var feedback4 = entries[i][33];
                                var feedback5 = entries[i][36];
                                var feedback6 = entries[i][39];
                                var feedback7 = entries[i][42];
                                var feedback8 = "";
                                var feedback9 = "";
                                var feedback10 = "";
                                var feedback11 = "";
                                var feedback12 = "";
                                var feedback13 = "";
                                var feedback14 = "";
                                var feedback15 = "";
                                var feedback16 = "";
                                var feedback17 = "";
                                var feedback18 = "";
                                var feedback19 = "";
                                var feedback20 = "";
                                var feedback21 = "";
                                var feedback22 = "";
                                var feedback23 = "";
                                var feedback24 = "";
                                var feedback25 = "";
                                var feedback26 = "";
                                var feedback27 = "";
                                var feedback28 = "";
                                var feedback29 = "";
                                var feedback30 = "";
                                var feedback31 = "";
                                var feedback32 = "";
                                var feedback33 = "";
                                var feedback34 = "";
                                var feedback35 = "";
                                var feedback36 = "";
                                var feedback37 = "";
                                var feedback38 = "";
                                var feedback39 = "";
                                var feedback40 = "";
                                var feedback41 = "";
                                var feedback42 = "";
                                var feedback43 = "";
                                var feedback44 = "";
                                var feedback45 = "";
                                var feedback46 = "";
                                var feedback47 = "";
                                var fraction0 = convertCalif(entries[i][20]);
                                var fraction1 = convertCalif(entries[i][23]);
                                var fraction2 = convertCalif(entries[i][26]);
                                var fraction3 = convertCalif(entries[i][29]);
                                var fraction4 = convertCalif(entries[i][32]);
                                var fraction5 = convertCalif(entries[i][35]);
                                var fraction6 = convertCalif(entries[i][38]);
                                var fraction7 = convertCalif(entries[i][41]);
                            }

                            var obj = {
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                mform_isexpanded_id_answerhdr: 1,
                                noanswers: noanswers,
                                numhints: 2,
                                _qf__qtype_shortanswer_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciado,
                                "questiontext[format]": 1,
                                defaultmark: defaultmark,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                usecase: usecase,
                                "answer[0]": answer0,
                                "answer[1]": answer1,
                                "answer[2]": answer2,
                                "answer[3]": answer3,
                                "answer[4]": answer4,
                                "answer[5]": answer5,
                                "answer[6]": answer6,
                                "answer[7]": answer7,
                                "answer[8]": answer8,
                                "answer[9]": answer9,
                                "answer[10]": answer10,
                                "answer[11]": answer11,
                                "answer[12]": answer12,
                                "answer[13]": answer13,
                                "answer[14]": answer14,
                                "answer[15]": answer15,
                                "answer[16]": answer16,
                                "answer[17]": answer17,
                                "answer[18]": answer18,
                                "answer[19]": answer19,
                                "answer[20]": answer20,
                                "answer[21]": answer21,
                                "answer[22]": answer22,
                                "answer[23]": answer23,
                                "answer[24]": answer24,
                                "answer[25]": answer25,
                                "answer[26]": answer26,
                                "answer[27]": answer27,
                                "answer[28]": answer28,
                                "answer[29]": answer29,
                                "answer[30]": answer30,
                                "answer[31]": answer31,
                                "answer[32]": answer32,
                                "answer[33]": answer33,
                                "answer[34]": answer34,
                                "answer[35]": answer35,
                                "answer[36]": answer36,
                                "answer[37]": answer37,
                                "answer[38]": answer38,
                                "answer[39]": answer39,
                                "answer[40]": answer40,
                                "answer[41]": answer41,
                                "answer[42]": answer42,
                                "answer[43]": answer43,
                                "answer[44]": answer44,
                                "answer[45]": answer45,
                                "answer[46]": answer46,
                                "answer[47]": answer47,
                                "fraction[0]": fraction0,
                                "fraction[1]": fraction1,
                                "fraction[2]": fraction2,
                                "fraction[3]": fraction3,
                                "fraction[4]": fraction4,
                                "fraction[5]": fraction5,
                                "fraction[6]": fraction6,
                                "fraction[7]": fraction7,
                                "fraction[8]": fraction8,
                                "fraction[9]": fraction9,
                                "fraction[10]": fraction10,
                                "fraction[11]": fraction11,
                                "fraction[12]": fraction12,
                                "fraction[13]": fraction13,
                                "fraction[14]": fraction14,
                                "fraction[15]": fraction15,
                                "fraction[16]": fraction16,
                                "fraction[17]": fraction17,
                                "fraction[18]": fraction18,
                                "fraction[19]": fraction19,
                                "fraction[20]": fraction20,
                                "fraction[21]": fraction21,
                                "fraction[22]": fraction22,
                                "fraction[23]": fraction23,
                                "fraction[24]": fraction24,
                                "fraction[25]": fraction25,
                                "fraction[26]": fraction26,
                                "fraction[27]": fraction27,
                                "fraction[28]": fraction28,
                                "fraction[29]": fraction29,
                                "fraction[30]": fraction30,
                                "fraction[31]": fraction31,
                                "fraction[32]": fraction32,
                                "fraction[33]": fraction33,
                                "fraction[34]": fraction34,
                                "fraction[35]": fraction35,
                                "fraction[36]": fraction36,
                                "fraction[37]": fraction37,
                                "fraction[38]": fraction38,
                                "fraction[39]": fraction39,
                                "fraction[40]": fraction40,
                                "fraction[41]": fraction41,
                                "fraction[42]": fraction42,
                                "fraction[43]": fraction43,
                                "fraction[44]": fraction44,
                                "fraction[45]": fraction45,
                                "fraction[46]": fraction46,
                                "fraction[47]": fraction47,
                                "feedback[0][text]": feedback0,
                                "feedback[1][text]": feedback1,
                                "feedback[2][text]": feedback2,
                                "feedback[3][text]": feedback3,
                                "feedback[4][text]": feedback4,
                                "feedback[5][text]": feedback5,
                                "feedback[6][text]": feedback6,
                                "feedback[7][text]": feedback7,
                                "feedback[8][text]": feedback8,
                                "feedback[9][text]": feedback9,
                                "feedback[10][text]": feedback10,
                                "feedback[11][text]": feedback11,
                                "feedback[12][text]": feedback12,
                                "feedback[13][text]": feedback13,
                                "feedback[14][text]": feedback14,
                                "feedback[15][text]": feedback15,
                                "feedback[16][text]": feedback16,
                                "feedback[17][text]": feedback17,
                                "feedback[18][text]": feedback18,
                                "feedback[19][text]": feedback19,
                                "feedback[20][text]": feedback20,
                                "feedback[21][text]": feedback21,
                                "feedback[22][text]": feedback22,
                                "feedback[23][text]": feedback23,
                                "feedback[24][text]": feedback24,
                                "feedback[25][text]": feedback25,
                                "feedback[26][text]": feedback26,
                                "feedback[27][text]": feedback27,
                                "feedback[28][text]": feedback28,
                                "feedback[29][text]": feedback29,
                                "feedback[30][text]": feedback30,
                                "feedback[31][text]": feedback31,
                                "feedback[32][text]": feedback32,
                                "feedback[33][text]": feedback33,
                                "feedback[34][text]": feedback34,
                                "feedback[35][text]": feedback35,
                                "feedback[36][text]": feedback36,
                                "feedback[37][text]": feedback37,
                                "feedback[38][text]": feedback38,
                                "feedback[39][text]": feedback39,
                                "feedback[40][text]": feedback40,
                                "feedback[41][text]": feedback41,
                                "feedback[42][text]": feedback42,
                                "feedback[43][text]": feedback43,
                                "feedback[44][text]": feedback44,
                                "feedback[45][text]": feedback45,
                                "feedback[46][text]": feedback46,
                                "feedback[47][text]": feedback47,
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
                                "feedback[35][format]": 1,
                                "feedback[36][format]": 1,
                                "feedback[37][format]": 1,
                                "feedback[38][format]": 1,
                                "feedback[39][format]": 1,
                                "feedback[40][format]": 1,
                                "feedback[41][format]": 1,
                                "feedback[42][format]": 1,
                                "feedback[43][format]": 1,
                                "feedback[44][format]": 1,
                                "feedback[45][format]": 1,
                                "feedback[46][format]": 1,
                                "feedback[47][format]": 1
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "truefalse") {
                            var respuestacorrecta = convertTruefalse(entries[i][18]);
                            if ((entries[i][2]) == "TRUE") {
                                var retroalimentacionverdadero = "{mlang es" + "}" + entries[i][19] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][19] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][19] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][19] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][19] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][19] + "{mlang}";
                                var retroalimentacionfalso = "{mlang es" + "}" + entries[i][20] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][20] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][20] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][20] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][20] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][20] + "{mlang}";
                            } else {
                                var retroalimentacionverdadero = entries[i][19];
                                var retroalimentacionfalso = entries[i][20];
                            }
                            var tags = entries[i][21];
                            var obj = {
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_truefalse_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_multitriesheader: 1,
                                mform_isexpanded_id_tagsheader: 0,
                                categorymoveto: idcategoria,
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
                                penalty: 1
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "matching") {
                            var shuffleanswers = convertshuffleanswers(entries[i][18]);
                            //var answernumbering = convertanswernumbering(entries[i].gsx$numerar.$t);
                            var noanswers = entries[i][49];
                            if ((entries[i][2]) == "TRUE") {
                                var pregunta1;
                                if ((entries[i][19]) == "") {
                                    pregunta1 = "";
                                } else {
                                    pregunta1 = "{mlang es" + "}" + entries[i][19] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][19] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][19] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][19] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][19] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][19] + "{mlang}";
                                }
                                var respuesta1 = "{mlang es" + "}" + entries[i][20] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][20] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][20] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][20] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][20] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][20] + "{mlang}";
                                var pregunta2;
                                if ((entries[i][21]) == "") {
                                    pregunta2 = "";
                                } else {
                                    pregunta2 = "{mlang es" + "}" + entries[i][21] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][21] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][21] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][21] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][21] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][21] + "{mlang}";
                                }
                                var respuesta2 = "{mlang es" + "}" + entries[i][22] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][22] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][22] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][22] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][22] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][22] + "{mlang}";
                                var pregunta3;
                                if ((entries[i][23]) == "") {
                                    pregunta3 = "";
                                } else {
                                    pregunta3 = "{mlang es" + "}" + entries[i][23] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][23] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][23] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][23] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][23] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][23] + "{mlang}";
                                }
                                var respuesta3 = "{mlang es" + "}" + entries[i][24] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][24] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][24] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][24] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][24] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][24] + "{mlang}";
                                var pregunta4;
                                if ((entries[i][25]) == "") {
                                    pregunta4 = "";
                                } else {
                                    pregunta4 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][25] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][25] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][25] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][25] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][25] + "{mlang}";
                                }
                                var respuesta4 = "{mlang es" + "}" + entries[i][26] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][26] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][26] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][26] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][26] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][26] + "{mlang}";
                                var pregunta5;
                                if ((entries[i][27]) == "") {
                                    pregunta5 = "";
                                } else {
                                    pregunta5 = "{mlang es" + "}" + entries[i][27] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][27] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][27] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][27] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][27] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][27] + "{mlang}";
                                }
                                var respuesta5 = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][28] + "{mlang}";
                                var pregunta6;
                                if ((entries[i][29]) == "") {
                                    pregunta6 = "";
                                } else {
                                    pregunta6 = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][29] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][29] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][29] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][29] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][29] + "{mlang}";
                                }
                                var respuesta6 = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][30] + "{mlang}";
                                var pregunta7;
                                if ((entries[i][31]) == "") {
                                    pregunta7 = "";
                                } else {
                                    pregunta7 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][31] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][31] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][31] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][31] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][31] + "{mlang}";
                                }
                                var respuesta7 = "{mlang es" + "}" + entries[i][32] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][32] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][32] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][32] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][32] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][32] + "{mlang}";
                                var pregunta8;
                                if ((entries[i][33]) == "") {
                                    pregunta8 = "";
                                } else {
                                    pregunta8 = "{mlang es" + "}" + entries[i][33] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][33] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][33] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][33] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][33] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][33] + "{mlang}";
                                }
                                var respuesta8 = "{mlang es" + "}" + entries[i][34] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][34] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][34] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][34] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][34] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][34] + "{mlang}";
                                var pregunta9;
                                if ((entries[i][35]) == "") {
                                    pregunta9 = "";
                                } else {
                                    pregunta9 = "{mlang es" + "}" + entries[i][35] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][35] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][35] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][35] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][35] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][35] + "{mlang}";
                                }
                                var respuesta9 = "{mlang es" + "}" + entries[i][36] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][36] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][36] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][36] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][36] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][36] + "{mlang}";
                                var pregunta10;
                                if ((entries[i][37]) == "") {
                                    pregunta10 = "";
                                } else {
                                    pregunta10 = "{mlang es" + "}" + entries[i][37] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][37] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][37] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][37] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][37] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][37] + "{mlang}";
                                }
                                var respuesta10 = "{mlang es" + "}" + entries[i][38] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][38] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][38] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][38] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][38] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][38] + "{mlang}";
                                var pregunta11;
                                if ((entries[i][39]) == "") {
                                    pregunta11 = "";
                                } else {
                                    pregunta11 = "{mlang es" + "}" + entries[i][39] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][39] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][39] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][39] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][39] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][39] + "{mlang}";
                                }
                                var respuesta11 = "{mlang es" + "}" + entries[i][40] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][40] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][40] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][40] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][40] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][40] + "{mlang}";
                                var pregunta12;
                                if ((entries[i][41]) == "") {
                                    pregunta12 = "";
                                } else {
                                    pregunta12 = "{mlang es" + "}" + entries[i][41] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][41] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][41] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][41] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][41] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][41] + "{mlang}";
                                }
                                var respuesta12 = "{mlang es" + "}" + entries[i][42] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][42] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][42] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][42] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][42] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][42] + "{mlang}";
                                var pregunta13;
                                if ((entries[i][43]) == "") {
                                    pregunta13 = "";
                                } else {
                                    pregunta13 = "{mlang es" + "}" + entries[i][43] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][43] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][43] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][43] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][43] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][43] + "{mlang}";
                                }
                                var respuesta13 = "{mlang es" + "}" + entries[i][44] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][44] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][44] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][44] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][44] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][44] + "{mlang}";
                                var pregunta14;
                                if ((entries[i][45]) == "") {
                                    pregunta14 = "";
                                } else {
                                    pregunta14 = "{mlang es" + "}" + entries[i][45] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][45] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][45] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][45] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][45] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][45] + "{mlang}";
                                }
                                var respuesta14 = "{mlang es" + "}" + entries[i][46] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][46] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][46] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][46] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][46] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][46] + "{mlang}";
                                var pregunta15;
                                if ((entries[i][47]) == "") {
                                    pregunta15 = "";
                                } else {
                                    pregunta15 = "{mlang es" + "}" + entries[i][47] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][47] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][47] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][47] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][47] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][47] + "{mlang}";
                                }
                                var respuesta15 = "{mlang es" + "}" + entries[i][48] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][48] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][48] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][48] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][48] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][48] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][50] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][50] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][50] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][50] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][50] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][50] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][51] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][51] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][51] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][51] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][51] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][51] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][52] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][52] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][52] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][52] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][52] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][52] + "{mlang}";
                            } else {
                                var pregunta1 = entries[i][19];
                                var pregunta2 = entries[i][21];
                                var pregunta3 = entries[i][23];
                                var pregunta4 = entries[i][25];
                                var pregunta5 = entries[i][27];
                                var pregunta6 = entries[i][29];
                                var pregunta7 = entries[i][31];
                                var pregunta8 = entries[i][33];
                                var pregunta9 = entries[i][35];
                                var pregunta10 = entries[i][37];
                                var pregunta11 = entries[i][39];
                                var pregunta12 = entries[i][41];
                                var pregunta13 = entries[i][43];
                                var pregunta14 = entries[i][45];
                                var pregunta15 = entries[i][47];
                                var respuesta1 = entries[i][20];
                                var respuesta2 = entries[i][22];
                                var respuesta3 = entries[i][24];
                                var respuesta4 = entries[i][26];
                                var respuesta5 = entries[i][28];
                                var respuesta6 = entries[i][30];
                                var respuesta7 = entries[i][32];
                                var respuesta8 = entries[i][34];
                                var respuesta9 = entries[i][36];
                                var respuesta10 = entries[i][38];
                                var respuesta11 = entries[i][40];
                                var respuesta12 = entries[i][42];
                                var respuesta13 = entries[i][44];
                                var respuesta14 = entries[i][46];
                                var respuesta15 = entries[i][48];
                            }
                            var tags = entries[i][53];
                            var obj = {
                                mform_isexpanded_id_answerhdr: 1,
                                noanswers: noanswers,
                                numhints: 2,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_match_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_combinedfeedbackhdr: 0,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                categorymoveto: idcategoria,
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
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "gapselect" || questiontype == "ddwtos") {
                            if ((entries[i][2]) == "TRUE") {
                                var reg = /\[\[([\d]+)\]\]/g;
                                var textoes = entries[i][15];
                                var textoca = entries[i+1][15];
                                var textova = entries[i+2][15];
                                var textoen = entries[i+3][15];
                                var textoeu = entries[i+4][15];
                                var textogl = entries[i+5][15];
                                var inputs = textoes.match(reg);
                                var trozoses = trozos(textoes,inputs,"es");
                                var trozosca = trozos(textoca,inputs,"ca");
                                var trozosva = trozos(textova,inputs,"ca_valencia");
                                var trozosen = trozos(textoen,inputs,"en");
                                var trozoseu = trozos(textoeu,inputs,"eu");
                                var trozosgl = trozos(textogl,inputs,"gl");
                                enunciado = creaenunciado(trozoses,trozosca,trozosva,trozosen,trozoseu,trozosgl,inputs);                                var opcion1;
                                if ((entries[i][19]) == "") {
                                    opcion1 = "";
                                } else {
                                    opcion1 = "{mlang es" + "}" + entries[i][19] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][19] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][19] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][19] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][19] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][19] + "{mlang}";
                                }
                                var grupo1 = convertgapselectgroup(entries[i][20]);
                                var opcion2;
                                if ((entries[i][21]) == "") {
                                    opcion2 = "";
                                } else {
                                    opcion2 = "{mlang es" + "}" + entries[i][21] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][21] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][21] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][21] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][21] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][21] + "{mlang}";
                                }
                                var grupo2 = convertgapselectgroup(entries[i][22]);
                                var opcion3;
                                if ((entries[i][23]) == "") {
                                    opcion3 = "";
                                } else {
                                    opcion3 = "{mlang es" + "}" + entries[i][23] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][23] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][23] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][23] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][23] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][23] + "{mlang}";
                                }
                                var grupo3 = convertgapselectgroup(entries[i][24]);
                                var opcion4;
                                if ((entries[i][25]) == "") {
                                    opcion4 = "";
                                } else {
                                    opcion4 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][25] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][25] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][25] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][25] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][25] + "{mlang}";
                                }
                                var grupo4 = convertgapselectgroup(entries[i][26]);
                                var opcion5;
                                if ((entries[i][27]) == "") {
                                    opcion5 = "";
                                } else {
                                    opcion5 = "{mlang es" + "}" + entries[i][27] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][27] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][27] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][27] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][27] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][27] + "{mlang}";
                                }
                                var grupo5 = convertgapselectgroup(entries[i][28]);
                                var opcion6;
                                if ((entries[i][29]) == "") {
                                    opcion6 = "";
                                } else {
                                    opcion6 = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][29] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][29] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][29] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][29] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][29] + "{mlang}";
                                }
                                var grupo6 = convertgapselectgroup(entries[i][30]);
                                var opcion7;
                                if ((entries[i][31]) == "") {
                                    opcion7 = "";
                                } else {
                                    opcion7 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][31] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][31] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][31] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][31] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][31] + "{mlang}";
                                }
                                var grupo7 = convertgapselectgroup(entries[i][32]);
                                var opcion8;
                                if ((entries[i][33]) == "") {
                                    opcion8 = "";
                                } else {
                                    opcion8 = "{mlang es" + "}" + entries[i][33] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][33] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][33] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][33] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][33] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][33] + "{mlang}";
                                }
                                var grupo8 = convertgapselectgroup(entries[i][34]);
                                var opcion9;
                                if ((entries[i][35]) == "") {
                                    opcion9 = "";
                                } else {
                                    opcion9 = "{mlang es" + "}" + entries[i][35] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][35] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][35] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][35] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][35] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][35] + "{mlang}";
                                }
                                var grupo9 = convertgapselectgroup(entries[i][36]);
                                var opcion10;
                                if ((entries[i][37]) == "") {
                                    opcion10 = "";
                                } else {
                                    opcion10 = "{mlang es" + "}" + entries[i][37] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][37] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][37] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][37] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][37] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][37] + "{mlang}";
                                }
                                var grupo10 = convertgapselectgroup(entries[i][38]);
                                var opcion11;
                                if ((entries[i][39]) == "") {
                                    opcion11 = "";
                                } else {
                                    opcion11 = "{mlang es" + "}" + entries[i][39] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][39] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][39] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][39] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][39] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][39] + "{mlang}";
                                }
                                var grupo11 = convertgapselectgroup(entries[i][40]);
                                var opcion12;
                                if ((entries[i][41]) == "") {
                                    opcion12 = "";
                                } else {
                                    opcion12 = "{mlang es" + "}" + entries[i][41] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][41] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][41] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][41] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][41] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][41] + "{mlang}";
                                }
                                var grupo12 = convertgapselectgroup(entries[i][42]);
                                var opcion13;
                                if ((entries[i][43]) == "") {
                                    opcion13 = "";
                                } else {
                                    opcion13 = "{mlang es" + "}" + entries[i][43] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][43] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][43] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][43] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][43] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][43] + "{mlang}";
                                }
                                var grupo13 = convertgapselectgroup(entries[i][44]);
                                var opcion14;
                                if ((entries[i][45]) == "") {
                                    opcion14 = "";
                                } else {
                                    opcion14 = "{mlang es" + "}" + entries[i][45] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][45] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][45] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][45] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][45] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][45] + "{mlang}";
                                }
                                var grupo14 = convertgapselectgroup(entries[i][46]);
                                var opcion15;
                                if ((entries[i][47]) == "") {
                                    opcion15 = "";
                                } else {
                                    opcion15 = "{mlang es" + "}" + entries[i][47] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][47] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][47] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][47] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][47] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][47] + "{mlang}";
                                }
                                var grupo15 = convertgapselectgroup(entries[i][48]);
                                var opcion16;
                                if ((entries[i][49]) == "") {
                                    opcion16 = "";
                                } else {
                                    opcion16 = "{mlang es" + "}" + entries[i][49] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][49] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][49] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][49] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][49] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][49] + "{mlang}";
                                }
                                var grupo16 = convertgapselectgroup(entries[i][50]);
                                var opcion17;
                                if ((entries[i][51]) == "") {
                                    opcion17 = "";
                                } else {
                                    opcion17 = "{mlang es" + "}" + entries[i][51] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][51] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][51] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][51] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][51] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][51] + "{mlang}";
                                }
                                var grupo17 = convertgapselectgroup(entries[i][52]);
                                var opcion18;
                                if ((entries[i][53]) == "") {
                                    opcion18 = "";
                                } else {
                                    opcion18 = "{mlang es" + "}" + entries[i][53] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][53] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 2][53] + "{mlang}{mlang en" + "}" +
                                        entries[i + 3][53] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 4][53] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 5][53] + "{mlang}";
                                }
                                var grupo18 = convertgapselectgroup(entries[i][54]);
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][56] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][56] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][56] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][56] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][56] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][56] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][57] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][57] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][57] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][57] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][57] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][57] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][58] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][58] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][58] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][58] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][58] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][58] + "{mlang}";
                            } else {
                                var opcion1 = entries[i][19];
                                var opcion2 = entries[i][21];
                                var opcion3 = entries[i][23];
                                var opcion4 = entries[i][25];
                                var opcion5 = entries[i][27];
                                var opcion6 = entries[i][29];
                                var opcion7 = entries[i][31];
                                var opcion8 = entries[i][33];
                                var opcion9 = entries[i][35];
                                var opcion10 = entries[i][37];
                                var opcion11 = entries[i][39];
                                var opcion12 = entries[i][41];
                                var opcion13 = entries[i][43];
                                var opcion14 = entries[i][45];
                                var opcion15 = entries[i][47];
                                var opcion16 = entries[i][49];
                                var opcion17 = entries[i][51];
                                var opcion18 = entries[i][53];
                                var grupo1 = entries[i][20];
                                var grupo2 = entries[i][22];
                                var grupo3 = entries[i][24];
                                var grupo4 = entries[i][26];
                                var grupo5 = entries[i][28];
                                var grupo6 = entries[i][30];
                                var grupo7 = entries[i][32];
                                var grupo8 = entries[i][34];
                                var grupo9 = entries[i][36];
                                var grupo10 = entries[i][38];
                                var grupo11 = entries[i][40];
                                var grupo12 = entries[i][42];
                                var grupo13 = entries[i][44];
                                var grupo14 = entries[i][46];
                                var grupo15 = entries[i][48];
                                var grupo16 = entries[i][50];
                                var grupo17 = entries[i][52];
                                var grupo18 = entries[i][54];
                            }
                            var shuffleanswers = convertshuffleanswers(entries[i][18]);
                            var noanswers = entries[i][55];
                            var tags = entries[i][59];
                            var obj = {
                                mform_isexpanded_id_answerhdr: 1,
                                noanswers: noanswers,
                                numhints: 2,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_combinedfeedbackhdr: 0,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_coursetagsheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciado,
                                "questiontext[format]": 1,
                                defaultmark: defaultmark,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                shuffleanswers: shuffleanswers,
                                "choices[0][answer]": opcion1,
                                "choices[0][choicegroup]": grupo1,
                                "choices[1][answer]": opcion2,
                                "choices[1][choicegroup]": grupo2,
                                "choices[2][answer]": opcion3,
                                "choices[2][choicegroup]": grupo3,
                                "choices[3][answer]": opcion4,
                                "choices[3][choicegroup]": grupo4,
                                "choices[4][answer]": opcion5,
                                "choices[4][choicegroup]": grupo5,
                                "choices[5][answer]": opcion6,
                                "choices[5][choicegroup]": grupo6,
                                "choices[6][answer]": opcion7,
                                "choices[6][choicegroup]": grupo7,
                                "choices[7][answer]": opcion8,
                                "choices[7][choicegroup]": grupo8,
                                "choices[8][answer]": opcion9,
                                "choices[8][choicegroup]": grupo9,
                                "choices[9][answer]": opcion10,
                                "choices[9][choicegroup]": grupo10,
                                "choices[10][answer]": opcion11,
                                "choices[10][choicegroup]": grupo11,
                                "choices[11][answer]": opcion12,
                                "choices[11][choicegroup]": grupo12,
                                "choices[12][answer]": opcion13,
                                "choices[12][choicegroup]": grupo13,
                                "choices[13][answer]": opcion14,
                                "choices[13][choicegroup]": grupo14,
                                "choices[14][answer]": opcion15,
                                "choices[14][choicegroup]": grupo15,
                                "choices[15][answer]": opcion16,
                                "choices[15][choicegroup]": grupo16,
                                "choices[16][answer]": opcion17,
                                "choices[16][choicegroup]": grupo17,
                                "choices[17][answer]": opcion18,
                                "choices[17][choicegroup]": grupo18,
                                "correctfeedback[text]": retroalimentacioncorrecta,
                                "correctfeedback[format]": 1,
                                "partiallycorrectfeedback[text]": retroalimentacionparcial,
                                "partiallycorrectfeedback[format]": 1,
                                "incorrectfeedback[text]": retroalimentacionincorrecta,
                                "incorrectfeedback[format]": 1
                            };
                            if (tipo == "gapselect") {
                                obj["_qf__qtype_gapselect_edit_form"] = "1";
                            }
                            if (tipo == "ddwtos") {
                                obj["_qf__qtype_ddwtos_edit_form"] = "1";
                            }
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                            idspreguntas.push(nombre);
                        }
                        if (questiontype == "numerical") {
                            if ((entries[i][2]) == "TRUE") {
                                var retroalimentacion1 = "{mlang es" + "}" + entries[i][22] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][22] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][22] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][22] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][22] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][22] + "{mlang}";
                                var retroalimentacion2 = "{mlang es" + "}" + entries[i][26] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][26] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][26] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][26] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][26] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][26] + "{mlang}";
                                var retroalimentacion3 = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][30] + "{mlang}";
                                var retroalimentacion4 = "{mlang es" + "}" + entries[i][34] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][34] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][34] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][34] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][34] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][34] + "{mlang}";
                                var retroalimentacion5 = "{mlang es" + "}" + entries[i][38] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][38] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][38] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][38] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][38] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][38] + "{mlang}";
                                var retroalimentacion6 = "{mlang es" + "}" + entries[i][42] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][42] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][42] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][42] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][42] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][42] + "{mlang}";
                                var retroalimentacion7 = "{mlang es" + "}" + entries[i][46] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][46] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][46] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][46] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][46] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][46] + "{mlang}";
                                var retroalimentacion8 = "{mlang es" + "}" + entries[i][50] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][50] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][50] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][50] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][50] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][50] + "{mlang}";
                            } else {
                                var retroalimentacion1 = "{mlang " + idioma + "}" + entries[i][22] + "{mlang}";
                                var retroalimentacion2 = "{mlang " + idioma + "}" + entries[i][26] + "{mlang}";
                                var retroalimentacion3 = "{mlang " + idioma + "}" + entries[i][30] + "{mlang}";
                                var retroalimentacion4 = "{mlang " + idioma + "}" + entries[i][34] + "{mlang}";
                                var retroalimentacion5 = "{mlang " + idioma + "}" + entries[i][38] + "{mlang}";
                                var retroalimentacion6 = "{mlang " + idioma + "}" + entries[i][42] + "{mlang}";
                                var retroalimentacion7 = "{mlang " + idioma + "}" + entries[i][46] + "{mlang}";
                                var retroalimentacion8 = "{mlang " + idioma + "}" + entries[i][50] + "{mlang}";
                            }
                            var fraction1 = convertCalif(entries[i][21]);
                            var fraction2 = convertCalif(entries[i][25]);
                            var fraction3 = convertCalif(entries[i][29]);
                            var fraction4 = convertCalif(entries[i][33]);
                            var fraction5 = convertCalif(entries[i][37]);
                            var fraction6 = convertCalif(entries[i][41]);
                            var fraction7 = convertCalif(entries[i][45]);
                            var fraction8 = convertCalif(entries[i][49]);
                            var respuesta1 = entries[i][19];
                            var respuesta2 = entries[i][23];
                            var respuesta3 = entries[i][27];
                            var respuesta4 = entries[i][31];
                            var respuesta5 = entries[i][35];
                            var respuesta6 = entries[i][39];
                            var respuesta7 = entries[i][43];
                            var respuesta8 = entries[i][47];
                            var error1 = entries[i][20];
                            var error2 = entries[i][24];
                            var error3 = entries[i][28];
                            var error4 = entries[i][32];
                            var error5 = entries[i][36];
                            var error6 = entries[i][40];
                            var error7 = entries[i][44];
                            var error8 = entries[i][48];
                            var noanswers = entries[i][51];
                            var tags = entries[i][52];
                            var obj = {
                                mform_isexpanded_id_answerhdr: 1,
                                noanswers: noanswers,
                                nounits: 1,
                                numhints: 2,
                                id: idpregunta,
                                inpopup: 0,
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_numerical_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_unithandling: 1,
                                mform_isexpanded_id_unithdr: 1,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                categorymoveto: idcategoria,
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
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(nombre);
                        }
                        if (questiontype == "gapfill") {
                            if ((entries[i][2]) == "TRUE") {
                                var enunciadogapfill = "{mlang es" + "}" + entries[i][15] + "{mlang}";
                                enunciadogapfill = enunciadogapfill.replace("[", "{mlang}[");
                                enunciadogapfill = enunciadogapfill.replace("]", "]{mlang es" + "}");
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][28] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][29] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][29] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][29] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][29] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][29] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 5][30] + "{mlang}";
                            } else {
                                var enunciadogapfill = entries[i][15];
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][28] + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][29] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][30] + "{mlang}";
                            }
                            var idnumber = entries[i][16];
                            var wronganswers = entries[i][18];
                            var delimitchars = entries[i][19];
                            var answerdisplay = convertanswerdisplay(entries[i][20]);
                            var fixedgapsize = converttruefalse(entries[i][21]);
                            var singleuse = converttruefalse(entries[i][22]);
                            var optionsaftertext = converttruefalse(entries[i][23]);
                            var disableregex = converttruefalse(entries[i][24]);
                            var letterhints = converttruefalse(entries[i][25]);
                            var noduplicates = converttruefalse(entries[i][26]);
                            var casesensitive = converttruefalse(entries[i][27]);
                            var tags = entries[i][31];
                            var obj = {
                                reaload: 1,
                                itemsettings: "[]",
                                numhints: 2,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_gapfill_edit_form: 1,
                                mform_showmore_id_feedbackheader: 0,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_feedbackheader: 1,
                                mform_isexpanded_id_combinedfeedbackhdr: 0,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_coursetagsheader: 0,
                                mform_isexpanded_id_createdmodifiedheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciadogapfill,
                                "questiontext[format]": 1,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                idnumber: idnumber,
                                "wronganswers[text]": wronganswers,
                                "wronganswers[format]": 1,
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
                                obj["tags[]"] = tags;
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
            .done(function() {
                enviar(datos, 0);
            })
    }

    function enviar(dato, indice) {
        var googledata = [];
        if (indice < dato.length) {
            var newquestion = dato[indice].id;
            const hostname = window.location.hostname;
            const urlhost = "https://" + hostname + "/question/question.php";
            $.ajax({
                url: urlhost,
                method: "POST",
                data: dato[indice]
            }).done(function(data) {
                $(".no-overflow").append(`<p>Pregunta ${indice} editada</p>`);
                if (newquestion == "") {
                    var questionname = dato[indice].name;
                    var courseid = dato[indice].courseid;
                    var category = dato[indice].category;
                    $.get('https://' + hostname + '/question/edit.php?courseid=${courseid}&cat=${category}', function(datas) {
                        var idpreg = $("label:contains(" + questionname + ")", datas).attr('for');
                        idpreg = idpreg.replace("checkq", "");
                        googledata.push(idpreg);
                        googledata.push(questionname);
                    });
                }
                enviar(dato, indice + 1);
            });
        }
    }

    function sendGoogle(datos) {
        window.location.replace("https://script.google.com/macros/s/AKfycbxt4vgLE_GawyA0aRO3gEyW2ghGQANB1P5i66PbUQCaVL9xCiPfFnnWT3Mo-d7o7rAjIA/dev?" + datos);
    }

    function convertTruefalse(data) {
        var truefalse;
        if (data == "Falso") {
            truefalse = 0
        }
        if (data == "Verdadero") {
            truefalse = 1
        }
        return truefalse;
    }

    function convertUsecase(data) {
        var usecase;
        if (data == "Igual mayúsculas que minúsculas") {
            usecase = 0
        }
        if (data == "Mayúsculas y minúsculas deben coincidir") {
            usecase = 1
        }
        return usecase;
    }

    function convertsingle(data) {
        var single;
        if (data == "Sólo una respuesta") {
            single = 1
        }
        if (data == "Se permiten varias respuestas") {
            single = 0
        }
        return single;
    }

    function convertCalif(data) {
        var califdef;
        if (data == "undefined") {
            alert("undefined");
            califdef = " "
        }
        if (data == "Ninguno") {
            califdef = "0.0"
        }
        if (data == "100%") {
            califdef = "1.0"
        }
        if (data == "90%") {
            califdef = "0.9"
        }
        if (data == "83%") {
            califdef = "0.8333333"
        }
        if (data == "80%") {
            califdef = "0.8"
        }
        if (data == "75%") {
            califdef = "0.75"
        }
        if (data == "70%") {
            califdef = "0.7"
        }
        if (data == "66%") {
            califdef = "0.6666667"
        }
        if (data == "60%") {
            califdef = "0.6"
        }
        if (data == "50%") {
            califdef = "0.5"
        }
        if (data == "40%") {
            califdef = "0.4"
        }
        if (data == "33%") {
            califdef = "0.3333333"
        }
        if (data == "30%") {
            califdef = "0.3"
        }
        if (data == "25%") {
            califdef = "0.25"
        }
        if (data == "20%") {
            califdef = "0.2"
        }
        if (data == "16%") {
            califdef = "0.1666667"
        }
        if (data == "14%") {
            califdef = "0.1428571"
        }
        if (data == "12%") {
            califdef = "0.125"
        }
        if (data == "11%") {
            califdef = "0.1111111"
        }
        if (data == "10%") {
            califdef = "0.1"
        }
        return califdef;
    }

    function convertshuffleanswers(data) {
        var shuffleanswers;
        if (data == "Sí") {
            shuffleanswers = 1
        }
        if (data == "No") {
            shuffleanswers = 0
        }
        return shuffleanswers;
    }

    function convertanswernumbering(data) {
        var answernumbering;
        if (data == "a. b. c...") {
            answernumbering = "abc"
        }
        if (data == "A. B. C...") {
            answernumbering = "ABCD"
        }
        if (data == "1. 2. 3...") {
            answernumbering = "123"
        }
        if (data == "i. ii. iii...") {
            answernumbering = "iii"
        }
        if (data == "I. II. III...") {
            answernumbering = "IIII"
        }
        if (data == "Sin numeración") {
            answernumbering = "none"
        }
        return answernumbering;
    }

    function convertgradingtype(data) {
        var gradingtype;
        if (data == "All or nothing") {
            gradingtype = "-1"
        }
        if (data == "Absolute position") {
            gradingtype = 0
        }
        if (data == "Relative to correct position") {
            gradingtype = 7
        }
        if (data == "Relative to the next item (excluding last)") {
            gradingtype = 1
        }
        if (data == "Relative to the next item (including last)") {
            gradingtype = 2
        }
        if (data == "Relative to both the previous and next items") {
            gradingtype = 3
        }
        if (data == "Relative to ALL the previous and next items") {
            gradingtype = 4
        }
        if (data == "Longest ordered subset") {
            gradingtype = 5
        }
        if (data == "Longest contiguous subset") {
            gradingtype = 6
        }
        return gradingtype;
    }

    function convertlayouttype(data) {
        var layouttype;
        if (data == "Vertical") {
            layouttype = 0
        }
        if (data == "Horizontal") {
            layouttype = 1
        }
        return layouttype;
    }

    function convertitemselectiontype(data) {
        var itemselectiontype;
        if (data == "Select all items") {
            itemselectiontype = 0
        }
        if (data == "Select a random subset of items") {
            itemselectiontype = 1
        }
        if (data == "Select a contiguous subset of items") {
            itemselectiontype = 2
        }
        return itemselectiontype;
    }

    function convertsizeofsubset(data) {
        var sizeofsubset;
        if (data == "Todos") {
            sizeofsubset = 0
        } else {
            sizeofsubset = data
        }
        return sizeofsubset;
    }

    function convertgradingdetails(data) {
        var gradingdetails;
        if (data == "Ocultar") {
            gradingdetails = 0
        }
        if (data == "Mostrar") {
            gradingdetails = 1
        }
        return gradingdetails;
    }

    function convertshowstandardinstruction(data) {
        var showstandardinstruction;
        if (data == "Sí") {
            showstandardinstruction = 1
        }
        if (data == "No") {
            showstandardinstruction = 0
        }
        return showstandardinstruction;
    }

    function convertanswerdisplay(data) {
        var answerdisplay;
        if (data == "Arrastrar/ soltar") {
            answerdisplay = "dragdrop"
        }
        if (data == "rellenar espacio") {
            answerdisplay = "gapfill"
        }
        if (data == "desplegable") {
            answerdisplay = "dropdown"
        }
        return answerdisplay;
    }

    function converttruefalse(data) {
        var truefalse;
        if (data == "TRUE") {
            truefalse = 1
        }
        if (data == "FALSE") {
            truefalse = 0
        }
        return truefalse;
    }
    function convertgapselectgroup(data) {
        var group;
        if (data == "A") { group = 1 }
        if (data == "B") { group = 2 }
        if (data == "C") { group = 3 }
        if (data == "D") { group = 4 }
        if (data == "E") { group = 5 }
        if (data == "F") { group = 6 }
        if (data == "G") { group = 7 }
        if (data == "H") { group = 8 }
        if (data == "I") { group = 9 }
        if (data == "J") { group = 10 }
        if (data == "K") { group = 11 }
        if (data == "L") { group = 12 }
        if (data == "M") { group = 13 }
        if (data == "N") { group = 14 }
        if (data == "O") { group = 15 }
        if (data == "P") { group = 16 }
        if (data == "Q") { group = 17 }
        if (data == "R") { group = 18 }
        if (data == "S") { group = 19 }
        if (data == "T") { group = 20 }
        return group;
    }
    function trozos(texto,inputs,lang){
        var out = [];
        for (i=0;i<inputs.length;i++){
            var out1 = texto.split(inputs[i]);
            out.push("{mlang "+lang+"}"+out1[0]+"{mlang}");
            texto = out1[1];
            if( i === inputs.length-1) {
                out.push("{mlang "+lang+"}"+texto+"{mlang}");
            }
        }
        return out;
    }
    function creaenunciado(trozoses,trozosca,trozosva,trozosen,trozoseu,trozosgl,inputs){
        var enunciado = "";
        for (i in trozoses){
            if (inputs[i] == undefined){ inputs[i] = ""};
            enunciado += trozoses[i]+trozosca[i]+trozosva[i]+trozosen[i]+trozoseu[i]+trozosgl[i]+inputs[i];
        }
        return enunciado;
    }
    $(document).ready(function() {
        const numberofquestions = GetURLParameter('numberofquestions');
        if (numberofquestions == undefined) {
            alert("No tengo datos");
        } else {
            if (confirm('Vas a editar ' + numberofquestions + ' preguntas')) {
                leeJSON();
            }
        }
    });
