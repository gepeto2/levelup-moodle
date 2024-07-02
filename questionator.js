
<div class="activity-item my-3">
    <div class="d-flex flex-column flex-md-row w-100 justify-content-center">
        <div class="activityname">1º Es imprescindible que inices sesión en tu cuenta de Google que tiene acceso a las hojas de cálculo de las preguntas</div>
        <div class="activity-info">
            <button id="authorize_button" class="btn btn-secondary btn-sm text-nowrap mr-md-2" onclick="handleAuthClick()">Iniciar sesión Google</button>
        </div>
        <div class="activity-info">
            <button id="signout_button" class="btn btn-secondary btn-sm text-nowrap" onclick="handleSignoutClick()">Cerrar sesión Google</button>
        </div>
    </div>
</div>
<div id="task2" class="activity-item my-3" style="visibility: hidden;">
    <div class="d-flex flex-column flex-md-row w-100 justify-content-center">
        <div id="total" class="activityname"><p>2º Pulsa el botón comenzar para actualizar las preguntas en la plataforma de contenidos</p></div>
        <div class="activity-info">
            <button type="button" class="btn btn-primary btn-sm text-nowrap" id="start-button" value="Comenzar">Comenzar</button>
        </div>
    </div>
</div>
<div id="task3" class="activity-item my-3" style="visibility: hidden;">
    <div class="d-flex flex-column flex-md-row w-100 justify-content-center">
        <div id="progreso" class="activityname"><p>Preguntas editadas:</p></div>
        <div class="activity-info">
            <button type="button" class="btn btn-danger btn-sm text-nowrap" id="cancel-button" value="Cancelar">Cancelar</button>
        </div>
    </div>
</div>
<div id="task4" class="activity-item my-3" style="visibility: hidden;">
    <div class="d-flex flex-column flex-md-row w-100 justify-content-center">
        <div id="fin" class="activityname"><p style="text-align: center;">Fin del proceso</p></div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" type="text/javascript"></script>

<script type="text/javascript">
    //<![CDATA[
    var filas = 6;
    var idspreadsheet;
    var idcurso;
    var coursename;
    var category;
    var sheetname;
    var host = $(location).attr('hostname');
/*    $(document).ready(function() {
        var cursos = [];
        var waitFor = $.ajax({
                url: 'https://' + host + '/?redirect=0',
                type: 'get'
            })
            .done(function(html) {
                $(html).find('.aalink').each(function() {
                    var nombrecurso = $(this).text();
                    var url = $(this).attr('href');
                    var idcursos = url.substring(url.indexOf('=') + 1);
                    cursos.push(nombrecurso);
                    if (nombrecurso.startsWith('Panel de control')) {
                        idcurso = idcursos;
                    }
                });
                rec();
                getcourses();
            });

        function rec() {
            $.get({
                url: 'https://' + host + '/question/category.php?courseid=' + idcurso,
            }).always(function() {
                if (waitFor.state() != 'resolved') rec();
            }).done(function(msg) {
                $(msg).find('a[title="Editar pregunta"]').each(function() {
                    var nombrecategoria = $(this).text();
                    var url = $(this).attr('href');
                    var idcat = url.substring(url.indexOf('=') + 1);
                    var idcategoria = idcat.substring(idcat.indexOf('=') + 1);
                    //cursos.push(nombrecurso);
                    $("#seleccionaCategoria").append('<option value="' + idcategoria + '">' + nombrecategoria + '</option>');
                });
            }).fail(function(msg) {
                // something when comes an error
            });
        };

        function getcourses() {
            $.get({
                url: 'https://' + host + '/course/index.php?categoryid=1&browse=courses&perpage=50',
            }).always(function() {
                if (waitFor.state() != 'resolved') rec();
            }).done(function(msg) {
                $(msg).find('.aalink').each(function() {
                    var nombrecurso = $(this).text();
                    $("#seleccionaCurso").append('<option value="' + nombrecurso + '">' + nombrecurso + '</option>');
                });
            }).fail(function(msg) {});
        };

    });*/

    String.prototype.extract = function(prefix, suffix) {
        s = this;
        var i = s.indexOf(prefix);
        if (i >= 0) {
            s = s.substring(i + prefix.length);
        } else {
            return '';
        }
        if (suffix) {
            i = s.indexOf(suffix);
            if (i >= 0) {
                s = s.substring(0, i);
            } else {
                return '';
            }
        }
        return s;
    };

    function GetURLParameter(sParam) {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (i = 0; i < sURLVariables.length; i++) {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) {
                return sParameterName[1];
            }
        }
    }

    const API_KEY = 'AIzaSyAGwGIRI2y4r7Oumhme6zYVqLzwQEx4klQ';
    const CLIENT_ID = '1037967216143-r7i59ftst44dm5pm3s5654o163q1f8gt.apps.googleusercontent.com';
    const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
    var sheet = '';
    var page = '';
    var nombrepregunta = '';
    var idpregunta = '';
    var nombresdepreguntas = [];
    var idspreguntas = [];

    let tokenClient;
    let gapiInited = false;
    let gisInited = false;


    document.getElementById('authorize_button').style.visibility = 'hidden';
    document.getElementById('signout_button').style.visibility = 'hidden';

    /**
     * Callback after api.js is loaded.
     */
    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    /**
     * Callback after the API client is loaded. Loads the
     * discovery doc to initialize the API.
     */
    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
        maybeEnableButtons();
    }

    /**
     * Callback after Google Identity Services are loaded.
     */
    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });
        gisInited = true;
        maybeEnableButtons();
    }

    /**
     * Enables user interaction after all libraries are loaded.
     */
    function maybeEnableButtons() {
        if (gapiInited && gisInited) {
            document.getElementById('authorize_button').style.visibility = 'visible';
        }
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick() {
        tokenClient.callback = async (resp) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            document.getElementById('signout_button').style.visibility = 'visible';
            document.getElementById('task2').style.visibility = 'visible';
            document.getElementById('authorize_button').innerText = 'Refresh';
        };

        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({
                prompt: 'consent'
            });
        } else {
            // Skip display of account chooser and consent dialog for an existing session.
            tokenClient.requestAccessToken({
                prompt: ''
            });
        }
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick() {
        const token = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
            document.getElementById('content').innerText = '';
            document.getElementById('authorize_button').innerText = 'Authorize';
            document.getElementById('signout_button').style.visibility = 'hidden';
        }
    }
    $('#multilang').change(function() {
        if (this.checked) {
            filas = 6;
        } else {
            filas = 1;
        }
    });
    $("#start-button").click(function() {
        sheet = GetURLParameter('sheetid');
        page = GetURLParameter('sheetpage');
        const questiontype = GetURLParameter('questiontype');
        const sesskey = $("input[name=sesskey]").val();
        const key = GetURLParameter('key');
        const numberofpages = GetURLParameter('numberofpages');
        var urljson = "https://sheets.googleapis.com/v4/spreadsheets/" + sheet + "/values/" + page + "?key=" + key;
        var datos = [];

        $.getJSON(urljson, function(data) {
                var entries = data.values;
                for (i = 0; i < entries.length; i++) {
                    if ((entries[i][1]) == "TRUE") {
                        idpregunta = entries[i][6];
                        var nombre = entries[i][14];
                        nombrepregunta = nombre;
                        var tipo = entries[i][8];
                        var idcategoria = entries[i][10];
                        var courseid = entries[i][5];
                        if ((entries[i][2]) == "TRUE") {
                            var ences = entries[i][15];
                            if (ences == undefined) { ences = ""};
                            var encca = entries[i + 1][15];
                            if (encca == undefined) { encca = ""};
                            var encct = entries[i + 2][15];
                            if (encct == undefined) { encct = ""};
                            var encva = entries[i + 3][15];
                            if (encva == undefined) { encva = ""};
                            var encen = entries[i + 4][15];
                            if (encen == undefined) { encen = ""};
                            var enceu = entries[i + 5][15];
                            if (enceu == undefined) { enceu = ""};
                            var encgl = entries[i + 6][15];
                            if (encgl == undefined) { encgl = ""};
                            var enunciado = "{mlang es" + "}" + ences + "{mlang}{mlang ca" + "}" +
                                encca + "{mlang}{mlang ca_ct" + "}" +
                                encct + "{mlang}{mlang ca_valencia" + "}" +
                                encva + "{mlang}{mlang en" + "}" +
                                encen + "{mlang}{mlang eu" + "}" +
                                enceu + "{mlang}{mlang gl" + "}" +
                                encgl + "{mlang}";
                            var feedes = entries[i][17];
                            if (feedes == undefined) { feedes = ""};
                            var feedca = entries[i + 1][17];
                            if (feedca == undefined) { feedca = ""};
                            var feedct = entries[i + 2][17];
                            if (feedct == undefined) { feedct = ""};
                            var feedva = entries[i + 3][17];
                            if (feedva == undefined) { feedva = ""};
                            var feeden = entries[i + 4][17];
                            if (feeden == undefined) { feeden = ""};
                            var feedeu = entries[i + 5][17];
                            if (feedeu == undefined) { feedeu = ""};
                            var feedgl = entries[i + 6][17];
                            if (feedgl == undefined) { feedgl = ""};
                            var generalfeedback = "{mlang es" + "}" + feedes + "{mlang}{mlang ca" + "}" +
                                feedca + "{mlang}{mlang ca_ct" + "}" +
                                feedct + "{mlang}{mlang ca_valencia" + "}" +
                                feedva + "{mlang}{mlang en" + "}" +
                                feeden + "{mlang}{mlang eu" + "}" +
                                feedeu + "{mlang}{mlang gl" + "}" +
                                feedgl + "{mlang}";
                        } else {
                            var idioma = entries[i][3];
                            var enunciado = "{mlang " + idioma + "}" + entries[i][15] + "{mlang}";
                        }
                        var defaultmark = entries[i][16];
                        //    var tags = entries[i].gsx$tags.$t;
                        if (questiontype == "multichoice") {
                            if ((entries[i][2]) == "TRUE") {
                                var eleccion1 = "{mlang es" + "}" + entries[i][22] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][22] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][22] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][22] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][22] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][22] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][22] + "{mlang}";
                                var eleccion2 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][25] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][25] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][25] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][25] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][25] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][25] + "{mlang}";
                                var eleccion3 = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][28] + "{mlang}";
                                var eleccion4 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][31] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][31] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][31] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][31] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][31] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][31] + "{mlang}";
                                var eleccion5 = "{mlang es" + "}" + entries[i][34] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][34] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][34] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][34] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][34] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][34] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][34] + "{mlang}";
                                var eleccion6 = "{mlang es" + "}" + entries[i][37] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][37] + "{mlang}{mlang ca_ct" + "}" +  
                                    entries[i + 2][37] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][37] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][37] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][37] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][37] + "{mlang}";
                                var eleccion7 = "{mlang es" + "}" + entries[i][40] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][40] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][40] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][40] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][40] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][40] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][40] + "{mlang}";
                                var eleccion8 = "{mlang es" + "}" + entries[i][43] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][43] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][43] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][43] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][43] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][43] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][43] + "{mlang}";
                                var eleccion9 = "{mlang es" + "}" + entries[i][46] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][46] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][46] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][46] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][46] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][46] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][46] + "{mlang}";
                                var eleccion10 = "{mlang es" + "}" + entries[i][49] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][49] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][49] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][49] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][49] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][49] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][49] + "{mlang}";
                                var eleccion11 = "{mlang es" + "}" + entries[i][52] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][52] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][52] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][52] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][52] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][52] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][52] + "{mlang}";
                                var eleccion12 = "{mlang es" + "}" + entries[i][55] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][55] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][55] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][55] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][55] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][55] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][55] + "{mlang}";
                                var eleccion13 = "{mlang es" + "}" + entries[i][58] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][58] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][58] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][58] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][58] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][58] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][58] + "{mlang}";
                                var eleccion14 = "{mlang es" + "}" + entries[i][61] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][61] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][61] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][61] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][61] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][61] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][61] + "{mlang}";
                                var eleccion15 = "{mlang es" + "}" + entries[i][64] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][64] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][64] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][64] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][64] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][64] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][64] + "{mlang}";
                                var retroalimentacion1 = "{mlang es" + "}" + eliminaundefined(entries[i][24]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][24]) + "{mlang}{mlang ca_ct" + "}" +    
                                    eliminaundefined(entries[i + 2][24]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][24]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][24]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][24]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][24]) + "{mlang}";
                                var retroalimentacion2 = "{mlang es" + "}" + eliminaundefined([i][27]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][27]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][27]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][27]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][27]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][27]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][27]) + "{mlang}";
                                var retroalimentacion3 = "{mlang es" + "}" + eliminaundefined(entries[i][30]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][30]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][30]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][30]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][30]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][30]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][30]) + "{mlang}";
                                var retroalimentacion4 = "{mlang es" + "}" + eliminaundefined(entries[i][33]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][33]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][33]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][33]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][33]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][33]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][33]) + "{mlang}";
                                var retroalimentacion5 = "{mlang es" + "}" + eliminaundefined(entries[i][36]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][36])+ "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][36]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][36]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][36]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][36]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][36]) + "{mlang}";
                                var retroalimentacion6 = "{mlang es" + "}" + eliminaundefined(entries[i][39]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][39]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][39]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][39]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][39]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][39]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][39]) + "{mlang}";
                                var retroalimentacion7 = "{mlang es" + "}" + eliminaundefined(entries[i][42]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][42]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][42]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][42]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][42]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][42]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][42]) + "{mlang}";
                                var retroalimentacion8 = "{mlang es" + "}" + eliminaundefined(entries[i][45]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][45]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][45]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][45]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][45]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][45]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][45]) + "{mlang}";
                                var retroalimentacion9 = "{mlang es" + "}" + eliminaundefined(entries[i][48]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][48]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][48]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][48]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][48]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][48]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][48]) + "{mlang}";
                                var retroalimentacion10 = "{mlang es" + "}" + eliminaundefined(entries[i][51]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][51]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][51]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][51]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][51]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][51]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][51]) + "{mlang}";
                                var retroalimentacion11 = "{mlang es" + "}" + eliminaundefined(entries[i][54]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][54]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][54]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][54]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][54]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][54]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][54]) + "{mlang}";
                                var retroalimentacion12 = "{mlang es" + "}" + eliminaundefined(entries[i][57]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][57]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][57]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][57]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][57]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][57]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][57]) + "{mlang}";
                                var retroalimentacion13 = "{mlang es" + "}" + eliminaundefined(entries[i][60]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][60]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][60]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][60]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][60]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][60]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][60]) + "{mlang}";
                                var retroalimentacion14 = "{mlang es" + "}" + eliminaundefined(entries[i][63]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][63]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][63]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][63]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][63]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][63]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][63]) + "{mlang}";
                                var retroalimentacion15 = "{mlang es" + "}" + eliminaundefined(entries[i][66]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][66]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][66]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][66]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][66]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][66]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][66]) + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang es" + "}" + eliminaundefined(entries[i][68]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][68]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][68]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][68]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][68]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][68]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][68]) + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + eliminaundefined(entries[i][69]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][69]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][69]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][69]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][69]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][69]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][69]) + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + eliminaundefined(entries[i][70]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][70]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][70]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][70]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][70]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][70]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][70]) + "{mlang}";
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
                                var retroalimentacion1 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][24]) + "{mlang}";
                                var retroalimentacion2 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][27]) + "{mlang}";
                                var retroalimentacion3 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][30]) + "{mlang}";
                                var retroalimentacion4 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][33]) + "{mlang}";
                                var retroalimentacion5 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][36]) + "{mlang}";
                                var retroalimentacion6 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][39]) + "{mlang}";
                                var retroalimentacion7 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][42]) + "{mlang}";
                                var retroalimentacion8 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][45]) + "{mlang}";
                                var retroalimentacion9 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][48]) + "{mlang}";
                                var retroalimentacion10 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][51]) + "{mlang}";
                                var retroalimentacion11 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][54]) + "{mlang}";
                                var retroalimentacion12 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][57]) + "{mlang}";
                                var retroalimentacion13 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][60]) + "{mlang}";
                                var retroalimentacion14 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][63]) + "{mlang}";
                                var retroalimentacion15 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][66]) + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + eliminaundefined(entries[i][68]) + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + eliminaundefined(entries[i][69]) + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + eliminaundefined(entries[i][70]) + "{mlang}";
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
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "ordering") {
                            if ((entries[i][2]) == "TRUE") {
                                var item1 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][25] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][25] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][25] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][25] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][25] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][25] + "{mlang}";
                                var item2 = "{mlang es" + "}" + entries[i][26] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][26] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][26] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][26] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][26] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][26] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][26] + "{mlang}";
                                var item3 = "{mlang es" + "}" + entries[i][27] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][27] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][27] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][27] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][27] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][27] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][27] + "{mlang}";
                                var item4 = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][28] + "{mlang}";
                                var item5 = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][29] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][29] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][29] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][29] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][29] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][29] + "{mlang}";
                                var item6 = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][30] + "{mlang}";
                                var item7 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][31] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][31] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][31] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][31] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][31] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][31] + "{mlang}";
                                var item8 = "{mlang es" + "}" + entries[i][32] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][32] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][32] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][32] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][32] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][32] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][32] + "{mlang}";
                                var item9 = "{mlang es" + "}" + entries[i][33] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][33] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][33] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][33] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][33] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][33] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][33] + "{mlang}";
                                var item10 = "{mlang es" + "}" + entries[i][34] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][34] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][34] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][34] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][34] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][34] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][34] + "{mlang}";
                                var item11 = "{mlang es" + "}" + entries[i][35] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][35] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][35] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][35] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][35] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][35] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][35] + "{mlang}";
                                var item12 = "{mlang es" + "}" + entries[i][36] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][36] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][36] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][36] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][36] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][36] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][36] + "{mlang}";
                                var item13 = "{mlang es" + "}" + entries[i][37] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][37] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][37] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][37] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][37] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][37] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][37] + "{mlang}";
                                var item14 = "{mlang es" + "}" + entries[i][38] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][38] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][38] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][38] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][38] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][38] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][38] + "{mlang}";
                                var item15 = "{mlang es" + "}" + entries[i][39] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][39] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][39] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][39] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][39] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][39] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][39] + "{mlang}";
                                var item16 = "{mlang es" + "}" + entries[i][40] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][40] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][40] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][40] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][40] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][40] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][40] + "{mlang}";
                                var item17 = "{mlang es" + "}" + entries[i][41] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][41] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][41] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][41] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][41] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][41] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][41] + "{mlang}";
                                var item18 = "{mlang es" + "}" + entries[i][42] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][42] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][42] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][42] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][42] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][42] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][42] + "{mlang}";
                                var item19 = "{mlang es" + "}" + entries[i][43] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][43] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][43] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][43] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][43] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][43] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][43] + "{mlang}";
                                var item20 = "{mlang es" + "}" + entries[i][44] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][44] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][44] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][44] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][44] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][44] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][44] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][46] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][46] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][46] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][46] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][46] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][46] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][46] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][47] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][47] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][47] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][47] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][47] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][47] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][47] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][48] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][48] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][48] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][48] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][48] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][48] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][48] + "{mlang}";
                            } else {
                                var item1 = "{mlang " + idioma + "}" + entries[i][25] + "{mlang}";
                                var item2 = "{mlang " + idioma + "}" + entries[i][26] + "{mlang}";
                                var item3 = "{mlang " + idioma + "}" + entries[i][27] + "{mlang}";
                                var item4 = "{mlang " + idioma + "}" + entries[i][28] + "{mlang}";
                                var item5 = "{mlang " + idioma + "}" + entries[i][29] + "{mlang}";
                                var item6 = "{mlang " + idioma + "}" + entries[i][30] + "{mlang}";
                                var item7 = "{mlang " + idioma + "}" + entries[i][31] + "{mlang}";
                                var item8 = "{mlang " + idioma + "}" + entries[i][32] + "{mlang}";
                                var item9 = "{mlang " + idioma + "}" + entries[i][33] + "{mlang}";
                                var item10 = "{mlang " + idioma + "}" + entries[i][34] + "{mlang}";
                                var item11 = "{mlang " + idioma + "}" + entries[i][35] + "{mlang}";
                                var item12 = "{mlang " + idioma + "}" + entries[i][36] + "{mlang}";
                                var item13 = "{mlang " + idioma + "}" + entries[i][37] + "{mlang}";
                                var item14 = "{mlang " + idioma + "}" + entries[i][38] + "{mlang}";
                                var item15 = "{mlang " + idioma + "}" + entries[i][39] + "{mlang}";
                                var item16 = "{mlang " + idioma + "}" + entries[i][40] + "{mlang}";
                                var item17 = "{mlang " + idioma + "}" + entries[i][41] + "{mlang}";
                                var item18 = "{mlang " + idioma + "}" + entries[i][42] + "{mlang}";
                                var item19 = "{mlang " + idioma + "}" + entries[i][43] + "{mlang}";
                                var item20 = "{mlang " + idioma + "}" + entries[i][44] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][46] + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][47] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][48] + "{mlang}";
                            }
                            var idnumber = entries[i][18];
                            var layouttype = convertlayouttype(entries[i][19]);
                            var itemselectiontype = convertitemselectiontype(entries[i][20]);
                            var sizeofsubset = entries[i][21];
                            var gradingtype = convertgradingtype(entries[i][22]);
                            var gradingdetails = convertgradingdetails(entries[i][23]);
                            var numberthechoices = convertanswernumbering(entries[i][24]);
                            var countanswers = entries[i][45];
                            var tags = entries[i][49];
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
                                "answer[8][text]": item9,
                                "answer[8][format]": 1,
                                "answer[9][text]": item10,
                                "answer[9][format]": 1,
                                "answer[10][text]": item11,
                                "answer[10][format]": 1,
                                "answer[11][text]": item12,
                                "answer[11][format]": 1,
                                "answer[12][text]": item13,
                                "answer[12][format]": 1,
                                "answer[13][text]": item14,
                                "answer[13][format]": 1,
                                "answer[14][text]": item15,
                                "answer[14][format]": 1,
                                "answer[15][text]": item16,
                                "answer[15][format]": 1,
                                "answer[16][text]": item17,
                                "answer[16][format]": 1,
                                "answer[17][text]": item18,
                                "answer[17][format]": 1,
                                "answer[18][text]": item19,
                                "answer[18][format]": 1,
                                "answer[19][text]": item20,
                                "answer[19][format]": 1,
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
                                var retroalimentacionverdadero = "{mlang es" + "}" + eliminaundefined([i][19]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined([i + 1][19]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined([i + 2][19]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined([i + 3][19]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined([i + 4][19]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined([i + 5][19]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined([i + 6][19]) + "{mlang}";
                                var retroalimentacionfalso = "{mlang es" + "}" + eliminaundefined([i][20]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined([i + 1][20]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined([i + 2][20]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined([i + 3][20]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined([i + 4][20]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined([i + 5][20]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined([i + 6][20]) + "{mlang}";
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
                        if (questiontype == "match") {
                            var shuffleanswers = convertshuffleanswers(entries[i][18]);
                            //var answernumbering = convertanswernumbering(entries[i].gsx$numerar.$t);
                            var noanswers = entries[i][55];
                            if ((entries[i][2]) == "TRUE") {
                                var pregunta1;
                                if ((entries[i][19]) == "") {
                                    pregunta1 = "";
                                } else {
                                    pregunta1 = "{mlang es" + "}" + entries[i][19] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][19] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][19] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][19] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][19] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][19] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][19] + "{mlang}";
                                }
                                var respuesta1 = "{mlang es" + "}" + entries[i][20] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][20] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][20] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][20] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][20] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][20] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][20] + "{mlang}";
                                var pregunta2;
                                if ((entries[i][21]) == "") {
                                    pregunta2 = "";
                                } else {
                                    pregunta2 = "{mlang es" + "}" + entries[i][21] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][21] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][21] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][21] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][21] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][21] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][21] + "{mlang}";
                                }
                                var respuesta2 = "{mlang es" + "}" + entries[i][22] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][22] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][22] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][22] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][22] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][22] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][22] + "{mlang}";
                                var pregunta3;
                                if ((entries[i][23]) == "") {
                                    pregunta3 = "";
                                } else {
                                    pregunta3 = "{mlang es" + "}" + entries[i][23] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][23] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][23] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][23] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][23] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][23] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][23] + "{mlang}";
                                }
                                var respuesta3 = "{mlang es" + "}" + entries[i][24] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][24] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][24] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][24] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][24] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][24] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][24] + "{mlang}";
                                var pregunta4;
                                if ((entries[i][25]) == "") {
                                    pregunta4 = "";
                                } else {
                                    pregunta4 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][25] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][25] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][25] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][25] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][25] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][25] + "{mlang}";
                                }
                                var respuesta4 = "{mlang es" + "}" + entries[i][26] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][26] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][26] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][26] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][26] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][26] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][26] + "{mlang}";
                                var pregunta5;
                                if ((entries[i][27]) == "") {
                                    pregunta5 = "";
                                } else {
                                    pregunta5 = "{mlang es" + "}" + entries[i][27] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][27] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][27] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][27] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][27] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][27] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][27] + "{mlang}";
                                }
                                var respuesta5 = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][28] + "{mlang}";
                                var pregunta6;
                                if ((entries[i][29]) == "") {
                                    pregunta6 = "";
                                } else {
                                    pregunta6 = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][29] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][29] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][29] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][29] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][29] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][29] + "{mlang}";
                                }
                                var respuesta6 = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][30] + "{mlang}";
                                var pregunta7;
                                if ((entries[i][31]) == "") {
                                    pregunta7 = "";
                                } else {
                                    pregunta7 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][31] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][31] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][31] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][31] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][31] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][31] + "{mlang}";
                                }
                                var respuesta7 = "{mlang es" + "}" + entries[i][32] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][32] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][32] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][32] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][32] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][32] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][32] + "{mlang}";
                                var pregunta8;
                                if ((entries[i][33]) == "") {
                                    pregunta8 = "";
                                } else {
                                    pregunta8 = "{mlang es" + "}" + entries[i][33] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][33] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][33] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][33] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][33] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][33] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][33] + "{mlang}";
                                }
                                var respuesta8 = "{mlang es" + "}" + entries[i][34] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][34] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][34] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][34] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][34] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][34] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][34] + "{mlang}";
                                var pregunta9;
                                if ((entries[i][35]) == "") {
                                    pregunta9 = "";
                                } else {
                                    pregunta9 = "{mlang es" + "}" + entries[i][35] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][35] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][35] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][35] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][35] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][35] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][35] + "{mlang}";
                                }
                                var respuesta9 = "{mlang es" + "}" + entries[i][36] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][36] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][36] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][36] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][36] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][36] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][36] + "{mlang}";
                                var pregunta10;
                                if ((entries[i][37]) == "") {
                                    pregunta10 = "";
                                } else {
                                    pregunta10 = "{mlang es" + "}" + entries[i][37] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][37] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][37] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][37] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][37] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][37] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][37] + "{mlang}";
                                }
                                var respuesta10 = "{mlang es" + "}" + entries[i][38] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][38] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][38] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][38] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][38] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][38] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][38] + "{mlang}";
                                var pregunta11;
                                if ((entries[i][39]) == "") {
                                    pregunta11 = "";
                                } else {
                                    pregunta11 = "{mlang es" + "}" + entries[i][39] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][39] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][39] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][39] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][39] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][39] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][39] + "{mlang}";
                                }
                                var respuesta11 = "{mlang es" + "}" + entries[i][40] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][40] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][40] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][40] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][40] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][40] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][40] + "{mlang}";
                                var pregunta12;
                                if ((entries[i][41]) == "") {
                                    pregunta12 = "";
                                } else {
                                    pregunta12 = "{mlang es" + "}" + entries[i][41] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][41] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][41] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][41] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][41] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][41] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][41] + "{mlang}";
                                }
                                var respuesta12 = "{mlang es" + "}" + entries[i][42] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][42] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][42] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][42] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][42] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][42] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][42] + "{mlang}";
                                var pregunta13;
                                if ((entries[i][43]) == "") {
                                    pregunta13 = "";
                                } else {
                                    pregunta13 = "{mlang es" + "}" + entries[i][43] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][43] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][43] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][43] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][43] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][43] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][43] + "{mlang}";
                                }
                                var respuesta13 = "{mlang es" + "}" + entries[i][44] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][44] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][44] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][44] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][44] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][44] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][44] + "{mlang}";
                                var pregunta14;
                                if ((entries[i][45]) == "") {
                                    pregunta14 = "";
                                } else {
                                    pregunta14 = "{mlang es" + "}" + entries[i][45] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][45] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][45] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][45] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][45] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][45] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][45] + "{mlang}";
                                }
                                var respuesta14 = "{mlang es" + "}" + entries[i][46] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][46] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][46] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][46] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][46] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][46] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][46] + "{mlang}";
                                var pregunta15;
                                if ((entries[i][47]) == "") {
                                    pregunta15 = "";
                                } else {
                                    pregunta15 = "{mlang es" + "}" + entries[i][47] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][47] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][47] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][47] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][47] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][47] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][47] + "{mlang}";
                                }
                                var respuesta15 = "{mlang es" + "}" + entries[i][48] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][48] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][48] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][48] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][48] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][48] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][48] + "{mlang}";
                                var pregunta16;
                                if ((entries[i][49]) == "") {
                                    pregunta16 = "";
                                } else {
                                    pregunta16 = "{mlang es" + "}" + entries[i][49] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][49] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][49] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][49] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][49] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][49] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][49] + "{mlang}";
                                }
                                var respuesta16 = "{mlang es" + "}" + entries[i][50] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][50] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][50] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][50] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][50] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][50] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][50] + "{mlang}";
                                var pregunta17;
                                if ((entries[i][51]) == "") {
                                    pregunta17 = "";
                                } else {
                                    pregunta17 = "{mlang es" + "}" + entries[i][51] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][51] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][51] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][51] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][51] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][51] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][51] + "{mlang}";
                                }
                                var respuesta17 = "{mlang es" + "}" + entries[i][52] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][52] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][52] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][52] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][52] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][52] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][52] + "{mlang}";
                                var pregunta18;
                                if ((entries[i][53]) == "") {
                                    pregunta18 = "";
                                } else {
                                    pregunta18 = "{mlang es" + "}" + entries[i][53] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][53] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][53] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][53] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][53] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][53] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][53] + "{mlang}";
                                }
                                var respuesta18 = "{mlang es" + "}" + entries[i][54] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][54] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][54] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][54] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][54] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][54] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][54] + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][56] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][56] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][56] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][56] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][56] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][56] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][56] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][57] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][57] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][57] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][57] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][57] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][57] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][57] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][58] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][58] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][58] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][58] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][58] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][58] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][58] + "{mlang}";
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
                                var pregunta16 = entries[i][49];
                                var pregunta17 = entries[i][51];
                                var pregunta18 = entries[i][53];
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
                                var respuesta16 = entries[i][50];
                                var respuesta17 = entries[i][52];
                                var respuesta18 = entries[i][54];
                            }
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
                                "subquestions[15][text]:": pregunta16,
                                "subquestions[15][format]": 1,
                                "subanswers[15]": respuesta16,
                                "subquestions[16][text]:": pregunta17,
                                "subquestions[16][format]": 1,
                                "subanswers[16]": respuesta17,
                                "subquestions[17][text]:": pregunta18,
                                "subquestions[17][format]": 1,
                                "subanswers[17]": respuesta18,
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
                        if (questiontype == "ddwtos") {
                            if ((entries[i][2]) == "TRUE") {
                                var reg1 = "\\[\\[([\\d]+)";
                                var reg2 = "\\"+"]"+"\\"+"]";
                                 var reg = new RegExp(reg1+reg2,"g");
                                var textoes = entries[i][15];
                                var textoca = eliminaundefined(entries[i+1][15]);
                                var textoct = eliminaundefined(entries[i+2][15]);
                                var textova = eliminaundefined(entries[i+3][15]);
                                var textoen = eliminaundefined(entries[i+4][15]);
                                var textoeu = eliminaundefined(entries[i+5][15]);
                                var textogl = eliminaundefined(entries[i+6][15]);
                                var inputs = textoes.match(reg);
                                var trozoses = [];
                                if (textoes != ""){
                                    trozoses = trozos(textoes,inputs,"es");
                                };
                                var trozosca = [];
                                if (textoca != ""){
                                    trozosca = trozos(textoca,inputs,"ca");
                                };
                                var trozosct = [];
                                if (textoct != ""){
                                    trozosct = trozos(textoct,inputs,"ca_ct");
                                };
                                var trozosva = [];
                                if (textova != ""){
                                    trozosva = trozos(textova,inputs,"ca_valencia");
                                };
                                var trozosen = [];
                                if (textoen != ""){
                                    trozosen = trozos(textoen,inputs,"en");
                                };
                                var trozoseu = [];
                                if (textoeu != ""){
                                    trozoseu = trozos(textoeu,inputs,"eu");
                                };
                                var trozosgl = [];
                                if (textogl != ""){
                                    trozosgl = trozos(textogl,inputs,"gl");
                                };
                                enunciado = creaenunciado(trozoses,trozosca,trozosct,trozosva,trozosen,trozoseu,trozosgl,inputs);                           
                                var opcion1;
                                if ((entries[i][19]) == "") {
                                    opcion1 = "";
                                } else {
                                    opcion1 = entries[i][19];
                                }
                                var grupo1 = convertgapselectgroup(entries[i][20]);
                                var opcion2;
                                if ((entries[i][21]) == "") {
                                    opcion2 = "";
                                } else {
                                    opcion2 = entries[i][21];
                                }
                                var grupo2 = convertgapselectgroup(entries[i][22]);
                                var opcion3;
                                if ((entries[i][23]) == "") {
                                    opcion3 = "";
                                } else {
                                    opcion3 = entries[i][23];
                                }
                                var grupo3 = convertgapselectgroup(entries[i][24]);
                                var opcion4;
                                if ((entries[i][25]) == "") {
                                    opcion4 = "";
                                } else {
                                    opcion4 = entries[i][25];
                                }
                                var grupo4 = convertgapselectgroup(entries[i][26]);
                                var opcion5;
                                if ((entries[i][27]) == "") {
                                    opcion5 = "";
                                } else {
                                    opcion5 = entries[i][27];
                                }
                                var grupo5 = convertgapselectgroup(entries[i][28]);
                                var opcion6;
                                if ((entries[i][29]) == "") {
                                    opcion6 = "";
                                } else {
                                    opcion6 = entries[i][29];
                                }
                                var grupo6 = convertgapselectgroup(entries[i][30]);
                                var opcion7;
                                if ((entries[i][31]) == "") {
                                    opcion7 = "";
                                } else {
                                    opcion7 = entries[i][31];
                                }
                                var grupo7 = convertgapselectgroup(entries[i][32]);
                                var opcion8;
                                if ((entries[i][33]) == "") {
                                    opcion8 = "";
                                } else {
                                    opcion8 = entries[i][33];
                                }
                                var grupo8 = convertgapselectgroup(entries[i][34]);
                                var opcion9;
                                if ((entries[i][35]) == "") {
                                    opcion9 = "";
                                } else {
                                    opcion9 = entries[i][35];
                                }
                                var grupo9 = convertgapselectgroup(entries[i][36]);
                                var opcion10;
                                if ((entries[i][37]) == "") {
                                    opcion10 = "";
                                } else {
                                    opcion10 = entries[i][37];
                                }
                                var grupo10 = convertgapselectgroup(entries[i][38]);
                                var opcion11;
                                if ((entries[i][39]) == "") {
                                    opcion11 = "";
                                } else {
                                    opcion11 = entries[i][39];
                                }
                                var grupo11 = convertgapselectgroup(entries[i][40]);
                                var opcion12;
                                if ((entries[i][41]) == "") {
                                    opcion12 = "";
                                } else {
                                    opcion12 = entries[i][41];
                                }
                                var grupo12 = convertgapselectgroup(entries[i][42]);
                                var opcion13;
                                if ((entries[i][43]) == "") {
                                    opcion13 = "";
                                } else {
                                    opcion13 = entries[i][43];
                                }
                                var grupo13 = convertgapselectgroup(entries[i][44]);
                                var opcion14;
                                if ((entries[i][45]) == "") {
                                    opcion14 = "";
                                } else {
                                    opcion14 = entries[i][45];
                                }
                                var grupo14 = convertgapselectgroup(entries[i][46]);
                                var opcion15;
                                if ((entries[i][47]) == "") {
                                    opcion15 = "";
                                } else {
                                    opcion15 = entries[i][47];
                                }
                                var grupo15 = convertgapselectgroup(entries[i][48]);
                                var opcion16;
                                if ((entries[i][49]) == "") {
                                    opcion16 = "";
                                } else {
                                    opcion16 = entries[i][49];
                                }
                                var grupo16 = convertgapselectgroup(entries[i][50]);
                                var opcion17;
                                if ((entries[i][51]) == "") {
                                    opcion17 = "";
                                } else {
                                    opcion17 = entries[i][51];
                                }
                                var grupo17 = convertgapselectgroup(entries[i][52]);
                                var opcion18;
                                if ((entries[i][53]) == "") {
                                    opcion18 = "";
                                } else {
                                    opcion18 = entries[i][53];
                                }
                                var grupo18 = convertgapselectgroup(entries[i][54]);
                                var opcion19;
                                if ((entries[i][55]) == "") {
                                    opcion19 = "";
                                } else {
                                    opcion19 = entries[i][55];
                                }
                                var grupo19 = convertgapselectgroup(entries[i][56]);
                                var opcion20;
                                if ((entries[i][57]) == "") {
                                    opcion20 = "";
                                } else {
                                    opcion20 = entries[i][57];
                                }
                                var grupo20 = convertgapselectgroup(entries[i][58]);
                                var opcion21;
                                if ((entries[i][59]) == "") {
                                    opcion21 = "";
                                } else {
                                    opcion21 = entries[i][59];
                                }
                                var grupo21 = convertgapselectgroup(entries[i][60]);  
                                var opcion22;
                                if ((entries[i][61]) == "") {
                                    opcion22 = "";
                                } else {
                                    opcion22 = entries[i][61];
                                }
                                var grupo22 = convertgapselectgroup(entries[i][62]);
                                var opcion23;
                                if ((entries[i][63]) == "") {
                                    opcion23 = "";
                                } else {
                                    opcion23 = entries[i][63];
                                }
                                var grupo23 = convertgapselectgroup(entries[i][64]);
                                var opcion24;
                                if ((entries[i][65]) == "") {
                                    opcion24 = "";
                                } else {
                                    opcion24 = entries[i][65];
                                }
                                var grupo24 = convertgapselectgroup(entries[i][66]);
                                var opcion25;
                                if ((entries[i][67]) == "") {
                                    opcion25 = "";
                                } else {
                                    opcion25 = entries[i][67];
                                }
                                var grupo25 = convertgapselectgroup(entries[i][68]);
                                var opcion26;
                                if ((entries[i][69]) == "") {
                                    opcion26 = "";
                                } else {
                                    opcion26 = entries[i][69];
                                }
                                var grupo26 = convertgapselectgroup(entries[i][70]);
                                var opcion27;
                                if ((entries[i][71]) == "") {
                                    opcion27 = "";
                                } else {
                                    opcion27 = entries[i][71];
                                }
                                var grupo27 = convertgapselectgroup(entries[i][72]);
                                var opcion28;
                                if ((entries[i][73]) == "") {
                                    opcion28 = "";
                                } else {
                                    opcion28 = entries[i][73];
                                }
                                var grupo28 = convertgapselectgroup(entries[i][74]);
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][76] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][76] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][76] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][76] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][76] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][76] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][76] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][77] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][77] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][77] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][77] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][77] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][77] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][77] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][78] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][78] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][78] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][78] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][78] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][78] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][78] + "{mlang}";
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
                                var opcion19 = entries[i][55];
                                var opcion20 = entries[i][57];
                                var opcion21 = entries[i][59];
                                var opcion22 = entries[i][61];
                                var opcion23 = entries[i][63];
                                var opcion24 = entries[i][65];
                                var opcion25 = entries[i][67];
                                var opcion26 = entries[i][69];
                                var opcion27 = entries[i][71];
                                var opcion28 = entries[i][73];
                                var grupo1 = convertgapselectgroup(entries[i][20]);
                                var grupo2 = convertgapselectgroup(entries[i][22]);
                                var grupo3 = convertgapselectgroup(entries[i][24]);
                                var grupo4 = convertgapselectgroup(entries[i][26]);
                                var grupo5 = convertgapselectgroup(entries[i][28]);
                                var grupo6 = convertgapselectgroup(entries[i][30]);
                                var grupo7 = convertgapselectgroup(entries[i][32]);
                                var grupo8 = convertgapselectgroup(entries[i][34]);
                                var grupo9 = convertgapselectgroup(entries[i][36]);
                                var grupo10 = convertgapselectgroup(entries[i][38]);
                                var grupo11 = convertgapselectgroup(entries[i][40]);
                                var grupo12 = convertgapselectgroup(entries[i][42]);
                                var grupo13 = convertgapselectgroup(entries[i][44]);
                                var grupo14 = convertgapselectgroup(entries[i][46]);
                                var grupo15 = convertgapselectgroup(entries[i][48]);
                                var grupo16 = convertgapselectgroup(entries[i][50]);
                                var grupo17 = convertgapselectgroup(entries[i][52]);
                                var grupo18 = convertgapselectgroup(entries[i][54]);
                                var grupo19 = convertgapselectgroup(entries[i][56]);
                                var grupo20 = convertgapselectgroup(entries[i][58]);
                                var grupo21 = convertgapselectgroup(entries[i][60]);
                                var grupo22 = convertgapselectgroup(entries[i][62]);
                                var grupo23 = convertgapselectgroup(entries[i][64]);
                                var grupo24 = convertgapselectgroup(entries[i][66]);
                                var grupo25 = convertgapselectgroup(entries[i][68]);
                                var grupo26 = convertgapselectgroup(entries[i][70]);
                                var grupo27 = convertgapselectgroup(entries[i][72]);
                                var grupo28 = convertgapselectgroup(entries[i][74]);
                            }
                            var shuffleanswers = convertshuffleanswers(entries[i][18]);
                            var noanswers = entries[i][75];
                            var tags = entries[i][79];
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
                                _qf__qtype_ddwtos_edit_form: 1,
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
                                "choices[18][answer]": opcion19,
                                "choices[18][choicegroup]": grupo19,
                                "choices[19][answer]": opcion20,
                                "choices[19][choicegroup]": grupo20,
                                "choices[20][answer]": opcion21,
                                "choices[20][choicegroup]": grupo21,
                                "choices[21][answer]": opcion22,
                                "choices[21][choicegroup]": grupo22,
                                "choices[22][answer]": opcion23,
                                "choices[22][choicegroup]": grupo23,
                                "choices[23][answer]": opcion24,
                                "choices[23][choicegroup]": grupo24,
                                "choices[24][answer]": opcion25,
                                "choices[24][choicegroup]": grupo25,
                                "choices[25][answer]": opcion26,
                                "choices[25][choicegroup]": grupo26,
                                "choices[26][answer]": opcion27,
                                "choices[26][choicegroup]": grupo27,
                                "choices[27][answer]": opcion28,
                                "choices[27][choicegroup]": grupo28,
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

                        if (questiontype == "ddimageortext") {
                            var idnumber = entries[i][18];
                            var imagen = entries[i][19];
                            var shuffleanswers = convertshuffleanswers(entries[i][20]);
                            var elemento1 = convertelemento(entries[i][21]);
                            var grupo1 = convertgapselectgroup(entries[i][22]);
                            var texto1 = entries[i][23];
                            var elemento2 = convertelemento(entries[i][24]);
                            var grupo2 = convertgapselectgroup(entries[i][25]);
                            var texto2 = entries[i][26];
                            var elemento3 = convertelemento(entries[i][27]);
                            var grupo3 = convertgapselectgroup(entries[i][28]);
                            var texto3 = entries[i][29];
                            var elemento4 = convertelemento(entries[i][30]);
                            var grupo4 = convertgapselectgroup(entries[i][31]);
                            var texto4 = entries[i][32];
                            var elemento5 = convertelemento(entries[i][33]);
                            var grupo5 = convertgapselectgroup(entries[i][34]);
                            var texto5 = entries[i][35];
                            var elemento6 = convertelemento(entries[i][36]);
                            var grupo6 = convertgapselectgroup(entries[i][37]);
                            var texto6 = entries[i][38];
                            var elemento7 = convertelemento(entries[i][39]);
                            var grupo7 = convertgapselectgroup(entries[i][40]);
                            var texto7 = entries[i][41];
                            var elemento8 = convertelemento(entries[i][42]);
                            var grupo8 = convertgapselectgroup(entries[i][43]);
                            var texto8 = entries[i][44];
                            var zona1izd = entries[i][45];
                            var zona1arr = entries[i][46];
                            var elem1 = entries[i][47];
                            var zona2izd = entries[i][48];
                            var zona2arr = entries[i][49];
                            var elem2 = entries[i][50];
                            var zona3izd = entries[i][51];
                            var zona3arr = entries[i][52];
                            var elem3 = entries[i][53];
                            var zona4izd = entries[i][54];
                            var zona4arr = entries[i][55];
                            var elem4 = entries[i][56];
                            var zona5izd = entries[i][57];
                            var zona5arr = entries[i][58];
                            var elem5 = entries[i][59];
                            var zona6izd = entries[i][60];
                            var zona6arr = entries[i][61];
                            var elem6 = entries[i][62];
                            var zona7izd = entries[i][63];
                            var zona7arr = entries[i][64];
                            var elem7 = entries[i][65];
                            var zona8izd = entries[i][66];
                            var zona8arr = entries[i][67];
                            var elem8 = entries[i][68];
                            var noitems = entries[i][69];
                            var nodropzone = entries[i][70];
                            if ((entries[i][2]) == "TRUE") {
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][71] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][71] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][71] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][71] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][71] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][71] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][71] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][72] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][72] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][72] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][72] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][72] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][72] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][72] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][73] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][73] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][73] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][73] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][73] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][73] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][73] + "{mlang}";
                            } else {
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][71] + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][72] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][73] + "{mlang}";
                            }
                            var tags = entries[i][74];
                            var obj = {
                                mform_isexpanded_id_previewareaheader: 1,
                                noitems: noitems,
                                nodropzone: nodropzone,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_ddimageortext_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_draggableitemheader: 0,
                                mform_isexpanded_id_dropzoneheader: 0,
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
                                idnumber: idnumber,
                                bgimage: imagen,
                                shuffleanswers: shuffleanswers,
                                "drags[0][dragitemtype]": elemento1,
                                "drags[0][draggroup]": grupo1,
                                "draglabel[0]": texto1,
                                "drags[1][dragitemtype]": elemento2,
                                "drags[1][draggroup]": grupo2,
                                "draglabel[1]": texto2,
                                "drags[2][dragitemtype]": elemento3,
                                "drags[2][draggroup]": grupo3,
                                "draglabel[2]": texto3,
                                "drags[3][dragitemtype]": elemento4,
                                "drags[3][draggroup]": grupo4,
                                "draglabel[3]": texto4,
                                "drags[4][dragitemtype]": elemento5,
                                "drags[4][draggroup]": grupo5,
                                "draglabel[4]": texto5,
                                "drags[5][dragitemtype]": elemento6,
                                "drags[5][draggroup]": grupo6,
                                "draglabel[5]": texto6,
                                "drags[6][dragitemtype]": elemento7,
                                "drags[6][draggroup]": grupo7,
                                "draglabel[6]": texto7,
                                "drags[7][dragitemtype]": elemento8,
                                "drags[7][draggroup]": grupo8,
                                "draglabel[7]": texto8,
                                "drops[0][xleft]": zona1izd,
                                "drops[0][ytop]": zona1arr,
                                "drops[0][choice]": elem1,
                                "drops[1][xleft]": zona2izd,
                                "drops[1][ytop]": zona2arr,
                                "drops[1][choice]": elem2,
                                "drops[2][xleft]": zona3izd,
                                "drops[2][ytop]": zona3arr,
                                "drops[2][choice]": elem3,
                                "drops[3][xleft]": zona4izd,
                                "drops[3][ytop]": zona4arr,
                                "drops[3][choice]": elem4,
                                "drops[4][xleft]": zona5izd,
                                "drops[4][ytop]": zona5arr,
                                "drops[4][choice]": elem5,
                                "drops[5][xleft]": zona6izd,
                                "drops[5][ytop]": zona6arr,
                                "drops[5][choice]": elem6,
                                "drops[6][xleft]": zona7izd,
                                "drops[6][ytop]": zona7arr,
                                "drops[6][choice]": elem7,
                                "drops[7][xleft]": zona8izd,
                                "drops[7][ytop]": zona8arr,
                                "drops[7][choice]": elem8,
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

                        if (questiontype == "gapselect") {
                            if ((entries[i][2]) == "TRUE") {
                                var reg1 = "\\[\\[([\\d]+)";
                                var reg2 = "\\"+"]"+"\\"+"]";
                                 var reg = new RegExp(reg1+reg2,"g");
                                var textoes = eliminaundefined(entries[i][15]);
                                var textoca = eliminaundefined(entries[i+1][15]);
                                var textoct = eliminaundefined(entries[i+2][15]);
                                var textova = eliminaundefined(entries[i+3][15]);
                                var textoen = eliminaundefined(entries[i+4][15]);
                                var textoeu = eliminaundefined(entries[i+5][15]);
                                var textogl = eliminaundefined(entries[i+6][15]);
                                var inputs = textoes.match(reg);
                                var trozoses = [];
                                if (textoes != ""){
                                    trozoses = trozos(textoes,inputs,"es");
                                };
                                var trozosca = [];
                                if (textoca != ""){
                                    trozosca = trozos(textoca,inputs,"ca");
                                };
                                var trozosct = [];
                                if (textoct != ""){
                                    trozosct = trozos(textoct,inputs,"ca_ct");
                                };
                                var trozosva = [];
                                if (textova != ""){
                                    trozosva = trozos(textova,inputs,"ca_valencia");
                                };
                                var trozosen = [];
                                if (textoen != ""){
                                    trozosen = trozos(textoen,inputs,"en");
                                };
                                var trozoseu = [];
                                if (textoeu != ""){
                                    trozoseu = trozos(textoeu,inputs,"eu");
                                };
                                var trozosgl = [];
                                if (textogl != ""){
                                    trozosgl = trozos(textogl,inputs,"gl");
                                };
                                enunciado = creaenunciado(trozoses,trozosca,trozosct,trozosva,trozosen,trozoseu,trozosgl,inputs);                           
                                var opcion1;
                                if ((entries[i][19]) == "") {
                                    opcion1 = "";
                                } else {
                                    opcion1 = "{mlang es" + "}" + entries[i][19] + "{mlang}{mlang ca" + "}" +
                                        entries[i+1][19] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i+2][19] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i+3][19] + "{mlang}{mlang en" + "}" +
                                        entries[i+4][19] + "{mlang}{mlang eu" + "}" +
                                        entries[i+5][19] + "{mlang}{mlang gl" + "}" +
                                        entries[i+6][19] + "{mlang}";
                                }
                                var grupo1 = convertgapselectgroup(entries[i][20]);
                                var opcion2;
                                if ((entries[i][21]) == "") {
                                    opcion2 = "";
                                } else {
                                    opcion2 = "{mlang es" + "}" + entries[i][21] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][21] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][21] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][21] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][21] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][21] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][21] + "{mlang}";
                                }
                                var grupo2 = convertgapselectgroup(entries[i][22]);
                                var opcion3;
                                if ((entries[i][23]) == "") {
                                    opcion3 = "";
                                } else {
                                    opcion3 = "{mlang es" + "}" + entries[i][23] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][23] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][23] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][23] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][23] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][23] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][23] + "{mlang}";
                                }
                                var grupo3 = convertgapselectgroup(entries[i][24]);
                                var opcion4;
                                if ((entries[i][25]) == "") {
                                    opcion4 = "";
                                } else {
                                    opcion4 = "{mlang es" + "}" + entries[i][25] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][25] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][25] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][25] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][25] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][25] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][25] + "{mlang}";
                                }
                                var grupo4 = convertgapselectgroup(entries[i][26]);
                                var opcion5;
                                if ((entries[i][27]) == "") {
                                    opcion5 = "";
                                } else {
                                    opcion5 = "{mlang es" + "}" + entries[i][27] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][27] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][27] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][27] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][27] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][27] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][27] + "{mlang}";
                                }
                                var grupo5 = convertgapselectgroup(entries[i][28]);
                                var opcion6;
                                if ((entries[i][29]) == "") {
                                    opcion6 = "";
                                } else {
                                    opcion6 = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][29] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][29] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][29] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][29] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][29] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][29] + "{mlang}";
                                }
                                var grupo6 = convertgapselectgroup(entries[i][30]);
                                var opcion7;
                                if ((entries[i][31]) == "") {
                                    opcion7 = "";
                                } else {
                                    opcion7 = "{mlang es" + "}" + entries[i][31] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][31] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][31] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][31] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][31] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][31] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][31] + "{mlang}";
                                }
                                var grupo7 = convertgapselectgroup(entries[i][32]);
                                var opcion8;
                                if ((entries[i][33]) == "") {
                                    opcion8 = "";
                                } else {
                                    opcion8 = "{mlang es" + "}" + entries[i][33] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][33] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][33] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][33] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][33] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][33] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][33] + "{mlang}";
                                }
                                var grupo8 = convertgapselectgroup(entries[i][34]);
                                var opcion9;
                                if ((entries[i][35]) == "") {
                                    opcion9 = "";
                                } else {
                                    opcion9 = "{mlang es" + "}" + entries[i][35] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][35] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][35] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][35] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][35] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][35] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][35] + "{mlang}";
                                }
                                var grupo9 = convertgapselectgroup(entries[i][36]);
                                var opcion10;
                                if ((entries[i][37]) == "") {
                                    opcion10 = "";
                                } else {
                                    opcion10 = "{mlang es" + "}" + entries[i][37] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][37] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][37] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][37] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][37] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][37] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][37] + "{mlang}";
                                }
                                var grupo10 = convertgapselectgroup(entries[i][38]);
                                var opcion11;
                                if ((entries[i][39]) == "") {
                                    opcion11 = "";
                                } else {
                                    opcion11 = "{mlang es" + "}" + entries[i][39] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][39] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][39] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][39] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][39] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][39] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][39] + "{mlang}";
                                }
                                var grupo11 = convertgapselectgroup(entries[i][40]);
                                var opcion12;
                                if ((entries[i][41]) == "") {
                                    opcion12 = "";
                                } else {
                                    opcion12 = "{mlang es" + "}" + entries[i][41] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][41] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][41] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][41] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][41] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][41] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][41] + "{mlang}";
                                }
                                var grupo12 = convertgapselectgroup(entries[i][42]);
                                var opcion13;
                                if ((entries[i][43]) == "") {
                                    opcion13 = "";
                                } else {
                                    opcion13 = "{mlang es" + "}" + entries[i][43] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][43] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][43] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][43] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][43] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][43] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][43] + "{mlang}";
                                }
                                var grupo13 = convertgapselectgroup(entries[i][44]);
                                var opcion14;
                                if ((entries[i][45]) == "") {
                                    opcion14 = "";
                                } else {
                                    opcion14 = "{mlang es" + "}" + entries[i][45] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][45] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][45] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][45] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][45] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][45] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][45] + "{mlang}";
                                }
                                var grupo14 = convertgapselectgroup(entries[i][46]);
                                var opcion15;
                                if ((entries[i][47]) == "") {
                                    opcion15 = "";
                                } else {
                                    opcion15 = "{mlang es" + "}" + entries[i][47] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][47] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][47] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][47] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][47] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][47] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][47] + "{mlang}";
                                }
                                var grupo15 = convertgapselectgroup(entries[i][48]);
                                var opcion16;
                                if ((entries[i][49]) == "") {
                                    opcion16 = "";
                                } else {
                                    opcion16 = "{mlang es" + "}" + entries[i][49] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][49] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][49] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][49] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][49] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][49] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][49] + "{mlang}";
                                }
                                var grupo16 = convertgapselectgroup(entries[i][50]);
                                var opcion17;
                                if ((entries[i][51]) == "") {
                                    opcion17 = "";
                                } else {
                                    opcion17 = "{mlang es" + "}" + entries[i][51] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][51] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][51] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][51] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][51] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][51] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][51] + "{mlang}";
                                }
                                var grupo17 = convertgapselectgroup(entries[i][52]);
                                var opcion18;
                                if ((entries[i][53]) == "") {
                                    opcion18 = "";
                                } else {
                                    opcion18 = "{mlang es" + "}" + entries[i][53] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][53] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][53] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][53] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][53] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][53] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][53] + "{mlang}";
                                }
                                var grupo18 = convertgapselectgroup(entries[i][54]);
                                if ((entries[i][55]) == "") {
                                    opcion19 = "";
                                } else {
                                    opcion19 = "{mlang es" + "}" + entries[i][55] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][55] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][55] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][55] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][55] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][55] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][55] + "{mlang}";
                                }
                                var grupo19 = convertgapselectgroup(entries[i][56]);
                                if ((entries[i][57]) == "") {
                                    opcion20 = "";
                                } else {
                                    opcion20 = "{mlang es" + "}" + entries[i][57] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][57] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][57] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][57] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][57] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][57] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][57] + "{mlang}";
                                }
                                var grupo20 = convertgapselectgroup(entries[i][58]);
                                if ((entries[i][59]) == "") {
                                    opcion21 = "";
                                } else {
                                    opcion21 = "{mlang es" + "}" + entries[i][59] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][59] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][59] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][59] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][59] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][59] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][59] + "{mlang}";
                                }
                                var grupo21 = convertgapselectgroup(entries[i][60]);
                                if ((entries[i][61]) == "") {
                                    opcion22 = "";
                                } else {
                                    opcion22 = "{mlang es" + "}" + entries[i][61] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][61] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][61] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][61] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][61] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][61] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][61] + "{mlang}";
                                }
                                var grupo22 = convertgapselectgroup(entries[i][62]);
                                if ((entries[i][63]) == "") {
                                    opcion23 = "";
                                } else {
                                    opcion23 = "{mlang es" + "}" + entries[i][63] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][63] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][63] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][63] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][63] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][63] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][63] + "{mlang}";
                                }
                                var grupo23 = convertgapselectgroup(entries[i][64]);
                                if ((entries[i][65]) == "") {
                                    opcion24 = "";
                                } else {
                                    opcion24 = "{mlang es" + "}" + entries[i][65] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][65] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][65] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][65] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][65] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][65] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][65] + "{mlang}";
                                }
                                var grupo24 = convertgapselectgroup(entries[i][66]);
                                if ((entries[i][67]) == "") {
                                    opcion25 = "";
                                } else {
                                    opcion25 = "{mlang es" + "}" + entries[i][67] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][67] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][67] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][67] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][67] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][67] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][67] + "{mlang}";
                                }
                                var grupo25 = convertgapselectgroup(entries[i][68]);
                                if ((entries[i][69]) == "") {
                                    opcion26 = "";
                                } else {
                                    opcion26 = "{mlang es" + "}" + entries[i][69] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][69] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][69] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][69] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][69] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][69] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][69] + "{mlang}";
                                }
                                var grupo26 = convertgapselectgroup(entries[i][70]);
                                if ((entries[i][71]) == "") {
                                    opcion27 = "";
                                } else {
                                    opcion27 = "{mlang es" + "}" + entries[i][71] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][71] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][71] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][71] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][71] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][71] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][71] + "{mlang}";
                                }
                                var grupo27 = convertgapselectgroup(entries[i][72]);
                                if ((entries[i][73]) == "") {
                                    opcion28 = "";
                                } else {
                                    opcion28 = "{mlang es" + "}" + entries[i][73] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][73] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][73] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][73] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][73] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][73] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][73] + "{mlang}";
                                }
                                var grupo28 = convertgapselectgroup(entries[i][74]); 
                                if ((entries[i][75]) == "") {
                                    opcion29 = "";
                                } else {
                                    opcion29 = "{mlang es" + "}" + entries[i][75] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][75] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][75] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][75] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][75] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][75] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][75] + "{mlang}";
                                }
                                var grupo29 = convertgapselectgroup(entries[i][76]); 
                                if ((entries[i][77]) == "") {
                                    opcion30 = "";
                                } else {
                                    opcion30 = "{mlang es" + "}" + entries[i][77] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][77] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][77] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][77] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][77] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][77] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][77] + "{mlang}";
                                }
                                var grupo30 = convertgapselectgroup(entries[i][78]); 
                                if ((entries[i][79]) == "") {
                                    opcion31 = "";
                                } else {
                                    opcion31 = "{mlang es" + "}" + entries[i][79] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][79] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][79] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][79] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][79] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][79] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][79] + "{mlang}";
                                }
                                var grupo31 = convertgapselectgroup(entries[i][80]); 
                                if ((entries[i][81]) == "") {
                                    opcion32 = "";
                                } else {
                                    opcion32 = "{mlang es" + "}" + entries[i][81] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][81] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][81] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][81] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][81] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][81] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][81] + "{mlang}";
                                }
                                var grupo32 = convertgapselectgroup(entries[i][82]); 
                                if ((entries[i][83]) == "") {
                                    opcion33 = "";
                                } else {
                                    opcion33 = "{mlang es" + "}" + entries[i][83] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][83] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][83] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][83] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][83] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][83] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][83] + "{mlang}";
                                }
                                var grupo33 = convertgapselectgroup(entries[i][84]); 
                                if ((entries[i][85]) == "") {
                                    opcion34 = "";
                                } else {
                                    opcion34 = "{mlang es" + "}" + entries[i][85] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][85] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][85] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][85] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][85] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][85] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][85] + "{mlang}";
                                }
                                var grupo34 = convertgapselectgroup(entries[i][86]); 
                                if ((entries[i][87]) == "") {
                                    opcion35 = "";
                                } else {
                                    opcion35 = "{mlang es" + "}" + entries[i][87] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][87] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][87] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][87] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][87] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][87] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][87] + "{mlang}";
                                }
                                var grupo35 = convertgapselectgroup(entries[i][88]); 
                                if ((entries[i][89]) == "") {
                                    opcion36 = "";
                                } else {
                                    opcion36 = "{mlang es" + "}" + entries[i][89] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][89] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][89] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][89] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][89] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][89] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][89] + "{mlang}";
                                }
                                var grupo36 = convertgapselectgroup(entries[i][90]); 
                                if ((entries[i][91]) == "") {
                                    opcion37 = "";
                                } else {
                                    opcion37 = "{mlang es" + "}" + entries[i][91] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][91] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][91] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][91] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][91] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][91] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][91] + "{mlang}";
                                }
                                var grupo37 = convertgapselectgroup(entries[i][92]); 
                                if ((entries[i][93]) == "") {
                                    opcion38 = "";
                                } else {
                                    opcion38 = "{mlang es" + "}" + entries[i][93] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][93] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][93] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][93] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][93] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][93] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][93] + "{mlang}";
                                }
                                var grupo38 = convertgapselectgroup(entries[i][94]); 
                                if ((entries[i][95]) == "") {
                                    opcion39 = "";
                                } else {
                                    opcion39 = "{mlang es" + "}" + entries[i][95] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][95] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][95] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][95] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][95] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][95] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][95] + "{mlang}";
                                }
                                var grupo39 = convertgapselectgroup(entries[i][96]); 
                                if ((entries[i][97]) == "") {
                                    opcion40 = "";
                                } else {
                                    opcion40 = "{mlang es" + "}" + entries[i][97] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][97] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][97] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][97] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][97] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][97] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][97] + "{mlang}";
                                }
                                var grupo40 = convertgapselectgroup(entries[i][98]); 
                                if ((entries[i][99]) == "") {
                                    opcion41 = "";
                                } else {
                                    opcion41 = "{mlang es" + "}" + entries[i][99] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][99] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][99] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][99] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][99] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][99] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][99] + "{mlang}";
                                }
                                var grupo41 = convertgapselectgroup(entries[i][100]); 
                                if ((entries[i][101]) == "") {
                                    opcion42 = "";
                                } else {
                                    opcion42 = "{mlang es" + "}" + entries[i][101] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][101] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][101] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][101] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][101] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][101] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][101] + "{mlang}";
                                }
                                var grupo42 = convertgapselectgroup(entries[i][102]); 
                                if ((entries[i][103]) == "") {
                                    opcion43 = "";
                                } else {
                                    opcion43 = "{mlang es" + "}" + entries[i][103] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][103] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][103] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][103] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][103] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][103] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][103] + "{mlang}";
                                }
                                var grupo43 = convertgapselectgroup(entries[i][104]); 
                                if ((entries[i][105]) == "") {
                                    opcion44 = "";
                                } else {
                                    opcion44 = "{mlang es" + "}" + entries[i][105] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][105] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][105] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][105] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][105] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][105] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][105] + "{mlang}";
                                }
                                var grupo44 = convertgapselectgroup(entries[i][106]); 
                                if ((entries[i][107]) == "") {
                                    opcion45 = "";
                                } else {
                                    opcion45 = "{mlang es" + "}" + entries[i][107] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][107] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][107] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][107] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][107] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][107] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][107] + "{mlang}";
                                }
                                var grupo45 = convertgapselectgroup(entries[i][108]); 
                                if ((entries[i][109]) == "") {
                                    opcion46 = "";
                                } else {
                                    opcion46 = "{mlang es" + "}" + entries[i][109] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][109] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][109] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][109] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][109] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][109] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][109] + "{mlang}";
                                }
                                var grupo46 = convertgapselectgroup(entries[i][110]); 
                                if ((entries[i][111]) == "") {
                                    opcion47 = "";
                                } else {
                                    opcion47 = "{mlang es" + "}" + entries[i][111] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][111] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][111] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][111] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][111] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][111] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][111] + "{mlang}";
                                }
                                var grupo47 = convertgapselectgroup(entries[i][112]); 
                                if ((entries[i][113]) == "") {
                                    opcion48 = "";
                                } else {
                                    opcion48 = "{mlang es" + "}" + entries[i][113] + "{mlang}{mlang ca" + "}" +
                                        entries[i + 1][113] + "{mlang}{mlang ca_ct" + "}" +
                                        entries[i + 2][113] + "{mlang}{mlang ca_valencia" + "}" +
                                        entries[i + 3][113] + "{mlang}{mlang en" + "}" +
                                        entries[i + 4][113] + "{mlang}{mlang eu" + "}" +
                                        entries[i + 5][113] + "{mlang}{mlang gl" + "}" +
                                        entries[i + 6][113] + "{mlang}";
                                }
                                var grupo48 = convertgapselectgroup(entries[i][114]); 
                                
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][116] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][116] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][116] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][116] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][116] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][116] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][116] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][117] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][117] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][117] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][117] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][117] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][117] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][117] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][118] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][118] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][118] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][118] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][118] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][118] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][118] + "{mlang}";
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
                                var opcion19 = entries[i][55];
                                var opcion20 = entries[i][57];
                                var opcion21 = entries[i][59];
                                var opcion22 = entries[i][61];
                                var opcion23 = entries[i][63];
                                var opcion24 = entries[i][65];
                                var opcion25 = entries[i][67];
                                var opcion26 = entries[i][69];
                                var opcion27 = entries[i][71];
                                var opcion28 = entries[i][73];
                                var opcion29 = entries[i][75];
                                var opcion30 = entries[i][77];
                                var opcion31 = entries[i][79];
                                var opcion32 = entries[i][81];
                                var opcion33 = entries[i][83];
                                var opcion34 = entries[i][85];
                                var opcion35 = entries[i][87];
                                var opcion36 = entries[i][89];
                                var opcion37 = entries[i][91];
                                var opcion38 = entries[i][93];
                                var opcion39 = entries[i][95];
                                var opcion40 = entries[i][97];
                                var opcion41 = entries[i][99];
                                var opcion42 = entries[i][101];
                                var opcion43 = entries[i][103];
                                var opcion44 = entries[i][105];
                                var opcion45 = entries[i][107];
                                var opcion46 = entries[i][109];
                                var opcion47 = entries[i][111];
                                var opcion48 = entries[i][113];
                                var grupo1 = convertgapselectgroup(entries[i][20]);
                                var grupo2 = convertgapselectgroup(entries[i][22]);
                                var grupo3 = convertgapselectgroup(entries[i][24]);
                                var grupo4 = convertgapselectgroup(entries[i][26]);
                                var grupo5 = convertgapselectgroup(entries[i][28]);
                                var grupo6 = convertgapselectgroup(entries[i][30]);
                                var grupo7 = convertgapselectgroup(entries[i][32]);
                                var grupo8 = convertgapselectgroup(entries[i][34]);
                                var grupo9 = convertgapselectgroup(entries[i][36]);
                                var grupo10 = convertgapselectgroup(entries[i][38]);
                                var grupo11 = convertgapselectgroup(entries[i][40]);
                                var grupo12 = convertgapselectgroup(entries[i][42]);
                                var grupo13 = convertgapselectgroup(entries[i][44]);
                                var grupo14 = convertgapselectgroup(entries[i][46]);
                                var grupo15 = convertgapselectgroup(entries[i][48]);
                                var grupo16 = convertgapselectgroup(entries[i][50]);
                                var grupo17 = convertgapselectgroup(entries[i][52]);
                                var grupo18 = convertgapselectgroup(entries[i][54]);
                                var grupo19 = convertgapselectgroup(entries[i][56]);
                                var grupo20 = convertgapselectgroup(entries[i][58]);
                                var grupo21 = convertgapselectgroup(entries[i][60]);
                                var grupo22 = convertgapselectgroup(entries[i][62]);
                                var grupo23 = convertgapselectgroup(entries[i][64]);
                                var grupo24 = convertgapselectgroup(entries[i][66]);
                                var grupo25 = convertgapselectgroup(entries[i][68]);
                                var grupo26 = convertgapselectgroup(entries[i][70]);
                                var grupo27 = convertgapselectgroup(entries[i][72]);
                                var grupo28 = convertgapselectgroup(entries[i][74]);
                                var grupo29 = convertgapselectgroup(entries[i][76]);
                                var grupo30 = convertgapselectgroup(entries[i][78]);
                                var grupo31 = convertgapselectgroup(entries[i][80]);
                                var grupo32 = convertgapselectgroup(entries[i][82]);
                                var grupo33 = convertgapselectgroup(entries[i][84]);
                                var grupo34 = convertgapselectgroup(entries[i][86]);
                                var grupo35 = convertgapselectgroup(entries[i][88]);
                                var grupo36 = convertgapselectgroup(entries[i][90]);
                                var grupo37 = convertgapselectgroup(entries[i][92]);
                                var grupo38 = convertgapselectgroup(entries[i][94]);
                                var grupo39 = convertgapselectgroup(entries[i][96]);
                                var grupo40 = convertgapselectgroup(entries[i][98]);
                                var grupo41 = convertgapselectgroup(entries[i][100]);
                                var grupo42 = convertgapselectgroup(entries[i][102]);
                                var grupo43 = convertgapselectgroup(entries[i][104]);
                                var grupo44 = convertgapselectgroup(entries[i][106]);
                                var grupo45 = convertgapselectgroup(entries[i][108]);
                                var grupo46 = convertgapselectgroup(entries[i][110]);
                                var grupo47 = convertgapselectgroup(entries[i][112]);
                                var grupo48 = convertgapselectgroup(entries[i][114]);
                            }
                            var shuffleanswers = convertshuffleanswers(entries[i][18]);
                            var noanswers = entries[i][115];
                            var tags = entries[i][119];
                            var obj = {
                                mform_isexpanded_id_choicehdr: 1,
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
                                _qf__qtype_gapselect_edit_form: 1,
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
                                "choices[18][answer]": opcion19,
                                "choices[18][choicegroup]": grupo19,
                                "choices[19][answer]": opcion20,
                                "choices[19][choicegroup]": grupo20,
                                "choices[20][answer]": opcion21,
                                "choices[20][choicegroup]": grupo21,
                                "choices[21][answer]": opcion22,
                                "choices[21][choicegroup]": grupo22,
                                "choices[22][answer]": opcion23,
                                "choices[22][choicegroup]": grupo23,
                                "choices[23][answer]": opcion24,
                                "choices[23][choicegroup]": grupo24,
                                "choices[24][answer]": opcion25,
                                "choices[24][choicegroup]": grupo25,
                                "choices[25][answer]": opcion26,
                                "choices[25][choicegroup]": grupo26,
                                "choices[26][answer]": opcion27,
                                "choices[26][choicegroup]": grupo27,
                                "choices[27][answer]": opcion28,
                                "choices[27][choicegroup]": grupo28,
                                "choices[28][answer]": opcion29,
                                "choices[28][choicegroup]": grupo29,
                                "choices[29][answer]": opcion30,
                                "choices[29][choicegroup]": grupo30,
                                "choices[30][answer]": opcion31,
                                "choices[30][choicegroup]": grupo31,
                                "choices[31][answer]": opcion32,
                                "choices[31][choicegroup]": grupo32,
                                "choices[32][answer]": opcion33,
                                "choices[32][choicegroup]": grupo33,
                                "choices[33][answer]": opcion34,
                                "choices[33][choicegroup]": grupo34,
                                "choices[34][answer]": opcion35,
                                "choices[34][choicegroup]": grupo35,
                                "choices[35][answer]": opcion36,
                                "choices[35][choicegroup]": grupo36,
                                "choices[36][answer]": opcion37,
                                "choices[36][choicegroup]": grupo37,
                                "choices[37][answer]": opcion38,
                                "choices[37][choicegroup]": grupo38,
                                "choices[38][answer]": opcion39,
                                "choices[38][choicegroup]": grupo39,
                                "choices[39][answer]": opcion40,
                                "choices[39][choicegroup]": grupo40,
                                "choices[40][answer]": opcion41,
                                "choices[40][choicegroup]": grupo41,
                                "choices[41][answer]": opcion42,
                                "choices[41][choicegroup]": grupo42,
                                "choices[42][answer]": opcion43,
                                "choices[42][choicegroup]": grupo43,
                                "choices[43][answer]": opcion44,
                                "choices[43][choicegroup]": grupo44,
                                "choices[44][answer]": opcion45,
                                "choices[44][choicegroup]": grupo45,
                                "choices[45][answer]": opcion46,
                                "choices[45][choicegroup]": grupo46,
                                "choices[46][answer]": opcion47,
                                "choices[46][choicegroup]": grupo47,
                                "choices[47][answer]": opcion48,
                                "choices[47][choicegroup]": grupo48,
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
                        if (questiontype == "ddmarker") {
                            var idnumber = entries[i][18];
                            var imagen = entries[i][19];
                            var shuffleanswers = convertshuffleanswers(entries[i][20]);
                            var marcador1 = entries[i][21];
                            var numero1 = entries[i][22];
                            var marcador2 = entries[i][23];
                            var numero2 = entries[i][24];
                            var marcador3 = entries[i][25];
                            var numero3 = entries[i][26];
                            var marcador4 = entries[i][27];
                            var numero4 = entries[i][28];
                            var marcador5 = entries[i][29];
                            var numero5 = entries[i][30];
                            var marcador6 = entries[i][31];
                            var numero6 = entries[i][32];
                            var marcador7 = entries[i][33];
                            var numero7 = entries[i][34];
                            var marcador8 = entries[i][35];
                            var numero8 = entries[i][36];
                            var forma1 = convertdropshape(entries[i][37]);
                            var marcadorzona1 = entries[i][38];
                            var coordenadaszona1 = entries[i][39];
                            var forma2 = convertdropshape(entries[i][40]);
                            var marcadorzona2 = entries[i][41];
                            var coordenadaszona2 = entries[i][42];
                            var forma3 = convertdropshape(entries[i][43]);
                            var marcadorzona3 = entries[i][44];
                            var coordenadaszona3 = entries[i][45];
                            var forma4 = convertdropshape(entries[i][46]);
                            var marcadorzona4 = entries[i][47];
                            var coordenadaszona4 = entries[i][48];
                            var forma5 = convertdropshape(entries[i][49]);
                            var marcadorzona5 = entries[i][50];
                            var coordenadaszona5 = entries[i][51];
                            var forma6 = convertdropshape(entries[i][52]);
                            var marcadorzona6 = entries[i][53];
                            var coordenadaszona6 = entries[i][54];
                            var forma7 = convertdropshape(entries[i][55]);
                            var marcadorzona7 = entries[i][56];
                            var coordenadaszona7 = entries[i][57];
                            var forma8 = convertdropshape(entries[i][58]);
                            var marcadorzona8 = entries[i][59];
                            var coordenadaszona8 = entries[i][60];
                            var noitems = entries[i][61];
                            var nodropzone = entries[i][62];
                            if ((entries[i][2]) == "TRUE") {
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][63] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][63] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][63] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][63] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][63] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][63] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][63] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][64] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][64] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][64] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][64] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][64] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][64] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][64] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][65] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][65] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][65] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][65] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][65] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][65] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][65] + "{mlang}";
                            } else {
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][63] + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][64] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][65] + "{mlang}";
                            }
                            var tags = entries[i][66];
                            var obj = {
                                mform_isexpanded_id_previewareaheader: 1,
                                noitems: noitems,
                                nodropzone: nodropzone,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_ddmarker_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_draggableitemheader: 0,
                                mform_isexpanded_id_dropzoneheader: 0,
                                mform_isexpanded_id_combinedfeedbackhdr: 0,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_coursetagsheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciado,
                                "questiontext[format]": 1,
                                defaultmark: defaultmark,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                idnumber: idnumber,
                                bgimage: imagen,
                                shuffleanswers: shuffleanswers,
                                "drags[0][label]": marcador1,
                                "drags[0][noofdrags]": numero1,
                                "drags[1][label]": marcador2,
                                "drags[1][noofdrags]": numero2,
                                "drags[2][label]": marcador3,
                                "drags[2][noofdrags]": numero3,
                                "drags[3][label]": marcador4,
                                "drags[3][noofdrags]": numero4,
                                "drags[4][label]": marcador5,
                                "drags[4][noofdrags]": numero5,
                                "drags[5][label]": marcador6,
                                "drags[5][noofdrags]": numero6,
                                "drags[6][label]": marcador7,
                                "drags[6][noofdrags]": numero7,                                
                                "drags[7][label]": marcador8,
                                "drags[7][noofdrags]": numero8,
                                "drops[0][shape]": forma1,
                                "drops[0][choice]": marcadorzona1,
                                "drops[0][coords]": coordenadaszona1,
                                "drops[1][shape]": forma2,
                                "drops[1][choice]": marcadorzona2,
                                "drops[1][coords]": coordenadaszona2,
                                "drops[2][shape]": forma3,
                                "drops[2][choice]": marcadorzona3,
                                "drops[2][coords]": coordenadaszona3,
                                "drops[3][shape]": forma4,
                                "drops[3][choice]": marcadorzona4,
                                "drops[3][coords]": coordenadaszona4,
                                "drops[4][shape]": forma5,
                                "drops[4][choice]": marcadorzona5,
                                "drops[4][coords]": coordenadaszona5,
                                "drops[5][shape]": forma6,
                                "drops[5][choice]": marcadorzona6,
                                "drops[5][coords]": coordenadaszona6,
                                "drops[6][shape]": forma7,
                                "drops[6][choice]": marcadorzona7,
                                "drops[6][coords]": coordenadaszona7,
                                "drops[7][shape]": forma8,
                                "drops[7][choice]": marcadorzona8,
                                "drops[7][coords]": coordenadaszona8,
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
                        if (questiontype == "numerical") {
                            if ((entries[i][2]) == "TRUE") {
                                var retroalimentacion1 = "{mlang es" + "}" + eliminaundefined([i][22]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][22]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][22]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][22]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][22]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][22]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][22]) + "{mlang}";
                                var retroalimentacion2 = "{mlang es" + "}" + eliminaundefined(entries[i][26]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][26]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][26]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][26]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][26]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][26]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][26]) + "{mlang}";
                                var retroalimentacion3 = "{mlang es" + "}" + eliminaundefined(entries[i][30]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][30]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][30]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][30]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][30]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][30]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][30]) + "{mlang}";
                                var retroalimentacion4 = "{mlang es" + "}" + eliminaundefined(entries[i][34]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][34]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][34]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][34]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][34]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][34]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][34]) + "{mlang}";
                                var retroalimentacion5 = "{mlang es" + "}" + eliminaundefined(entries[i][38]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][38]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][38]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][38]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][38]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][38]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][38]) + "{mlang}";
                                var retroalimentacion6 = "{mlang es" + "}" + eliminaundefined(entries[i][42]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][42]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][42]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][42]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][42]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][42]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][42]) + "{mlang}";
                                var retroalimentacion7 = "{mlang es" + "}" + eliminaundefined(entries[i][46]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][46]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][46]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][46]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][46]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][46]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][46]) + "{mlang}";
                                var retroalimentacion8 = "{mlang es" + "}" + eliminaundefined(entries[i][50]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][50]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][50]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][50]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][50]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][50]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][50]) + "{mlang}";
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
                                "tolerance[0]": error1,
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
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "gapfill") {
                            if ((entries[i][2]) == "TRUE") {
                                var delimitchars = entries[i][19];
                                if (delimitchars == "##") {
                                    var reg1 = "\\#(.*?)";
                                    var reg2 = "\\"+"#";
                                } else {
                                    var reg1 = "\\[(.*?)";
                                     var reg2 = "\\"+"]";
                                };
                                //var reg1 = "\\[\\[([\\d]+)";
                                //var reg2 = "\\"+"]"+"\\"+"]";
                                var reg = new RegExp(reg1+reg2,"gm");
                                var textoes = entries[i][15];
                                var textoca = eliminaundefined(entries[i+1][15]);
                                var textoct = eliminaundefined(entries[i+2][15]);
                                var textova = eliminaundefined(entries[i+3][15]);
                                var textoen = eliminaundefined(entries[i+4][15]);
                                var textoeu = eliminaundefined(entries[i+5][15]);
                                var textogl = eliminaundefined(entries[i+6][15]);
                                var inputs = textoes.match(reg);
                                var trozoses = [];
                                if (textoes != ""){
                                    trozoses = trozos(textoes,inputs,"es");
                                };
                                var trozosca = [];
                                if (textoca != ""){
                                    trozosca = trozos(textoca,inputs,"ca");
                                };
                                var trozosct = [];
                                if (textoct != ""){
                                    trozosct = trozos(textoct,inputs,"ca_ct");
                                };
                                var trozosva = [];
                                if (textova != ""){
                                    trozosva = trozos(textova,inputs,"ca_valencia");
                                };
                                var trozosen = [];
                                if (textoen != ""){
                                    trozosen = trozos(textoen,inputs,"en");
                                };
                                var trozoseu = [];
                                if (textoeu != ""){
                                    trozoseu = trozos(textoeu,inputs,"eu");
                                };
                                var trozosgl = [];
                                if (textogl != ""){
                                    trozosgl = trozos(textogl,inputs,"gl");
                                };
                                var enunciadogapfill = creaenunciado(trozoses,trozosca,trozosct,trozosva,trozosen,trozoseu,trozosgl,inputs);   
                                var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][28] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][29] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][29] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][29] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][29] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][29] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][29] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][30] + "{mlang}";
                            } else {
                                var enunciadogapfill = entries[i][15];
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][28] + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][29] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][30] + "{mlang}";
                            }
                            var idnumber = entries[i][16];
                            var wronganswers = entries[i][18];
                            //var delimitchars = entries[i][19];
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
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "shortmath") {
                            var idnumber = entries[i][18];
                            var usecase = convertUsecase(entries[i][19]);
                            var toolbartemplate = converttemplate(entries[i][20]);
                            var confirmchange = convertTruefalse(entries[i][21]);
                            var noanswers = entries[i][46];
                            var tags = entries[i][47];
                            if ((entries[i][2]) == "TRUE") {
                                var respuestas = [];
                                var retros = [];
                                var califs = [];
                                if (entries[i][22] == "") {
                                    var answer0 = " ";
                                } else {
                                    var answer0 = entries[i][22];
                                }
                                var answer1 = entries[i + 1][22];
                                var answer2 = entries[i + 2][22];
                                var answer3 = entries[i + 3][22];
                                var answer4 = entries[i + 4][22];
                                var answer5 = entries[i + 5][22];
                                var answer6 = entries[i][25];
                                var answer7 = entries[i + 1][25];
                                var answer8 = entries[i + 2][25];
                                var answer9 = entries[i + 3][25];
                                var answer10 = entries[i + 4][25];
                                var answer11 = entries[i + 5][25];
                                var answer12 = entries[i][28];
                                var answer13 = entries[i + 1][28];
                                var answer14 = entries[i + 2][28];
                                var answer15 = entries[i + 3][28];
                                var answer16 = entries[i + 4][28];
                                var answer17 = entries[i + 5][28];
                                var answer18 = entries[i][31];
                                var answer19 = entries[i + 1][31];
                                var answer20 = entries[i + 2][31];
                                var answer21 = entries[i + 3][31];
                                var answer22 = entries[i + 4][31];
                                var answer23 = entries[i + 5][31];
                                var answer24 = entries[i][34];
                                var answer25 = entries[i + 1][34];
                                var answer26 = entries[i + 2][34];
                                var answer27 = entries[i + 3][34];
                                var answer28 = entries[i + 4][34];
                                var answer29 = entries[i + 5][34];
                                var answer30 = entries[i][37];
                                var answer31 = entries[i + 1][37];
                                var answer32 = entries[i + 2][37];
                                var answer33 = entries[i + 3][37];
                                var answer34 = entries[i + 4][37];
                                var answer35 = entries[i + 5][37];
                                var answer36 = entries[i][40];
                                var answer37 = entries[i + 1][40];
                                var answer38 = entries[i + 2][40];
                                var answer39 = entries[i + 3][40];
                                var answer40 = entries[i + 4][40];
                                var answer41 = entries[i + 5][40];
                                var answer42 = entries[i][43];
                                var answer43 = entries[i + 1][43];
                                var answer44 = entries[i + 2][43];
                                var answer45 = entries[i + 3][43];
                                var answer46 = entries[i + 4][43];
                                var answer47 = entries[i + 5][43];
                                var feedback0 = entries[i][24];
                                var feedback1 = entries[i + 1][24];
                                var feedback2 = entries[i + 2][24];
                                var feedback3 = entries[i + 3][24];
                                var feedback4 = entries[i + 4][24];
                                var feedback5 = entries[i + 5][24];
                                var feedback6 = entries[i][27];
                                var feedback7 = entries[i + 1][27];
                                var feedback8 = entries[i + 2][27];
                                var feedback9 = entries[i + 3][27];
                                var feedback10 = entries[i + 4][27];
                                var feedback11 = entries[i + 5][27];
                                var feedback12 = entries[i][30];
                                var feedback13 = entries[i + 1][30];
                                var feedback14 = entries[i + 2][30];
                                var feedback15 = entries[i + 3][30];
                                var feedback16 = entries[i + 4][30];
                                var feedback17 = entries[i + 5][30];
                                var feedback18 = entries[i][33];
                                var feedback19 = entries[i + 1][33];
                                var feedback20 = entries[i + 2][33];
                                var feedback21 = entries[i + 3][33];
                                var feedback22 = entries[i + 4][33];
                                var feedback23 = entries[i + 5][33];
                                var feedback24 = entries[i][36];
                                var feedback25 = entries[i + 1][36];
                                var feedback26 = entries[i + 2][36];
                                var feedback27 = entries[i + 3][36];
                                var feedback28 = entries[i + 4][36];
                                var feedback29 = entries[i + 5][36];
                                var feedback30 = entries[i][39];
                                var feedback31 = entries[i + 1][39];
                                var feedback32 = entries[i + 2][39];
                                var feedback33 = entries[i + 3][39];
                                var feedback34 = entries[i + 4][39];
                                var feedback35 = entries[i + 5][39];
                                var feedback36 = entries[i][42];
                                var feedback37 = entries[i + 1][42];
                                var feedback38 = entries[i + 2][42];
                                var feedback39 = entries[i + 3][42];
                                var feedback40 = entries[i + 4][42];
                                var feedback41 = entries[i + 5][42];
                                var feedback42 = entries[i][45];
                                var feedback43 = entries[i + 1][45];
                                var feedback44 = entries[i + 2][45];
                                var feedback45 = entries[i + 3][45];
                                var feedback46 = entries[i + 4][45];
                                var feedback47 = entries[i + 5][45];
                                var fraction0 = convertCalif(entries[i][23]);
                                var fraction1 = convertCalif(entries[i + 1][23]);
                                var fraction2 = convertCalif(entries[i + 2][23]);
                                var fraction3 = convertCalif(entries[i + 3][23]);
                                var fraction4 = convertCalif(entries[i + 4][23]);
                                var fraction5 = convertCalif(entries[i + 5][23]);
                                var fraction6 = convertCalif(entries[i][26]);
                                var fraction7 = convertCalif(entries[i + 1][26]);
                                var fraction8 = convertCalif(entries[i + 2][26]);
                                var fraction9 = convertCalif(entries[i + 3][26]);
                                var fraction10 = convertCalif(entries[i + 4][26]);
                                var fraction11 = convertCalif(entries[i + 5][26]);
                                var fraction12 = convertCalif(entries[i][29]);
                                var fraction13 = convertCalif(entries[i + 1][29]);
                                var fraction14 = convertCalif(entries[i + 2][29]);
                                var fraction15 = convertCalif(entries[i + 3][29]);
                                var fraction16 = convertCalif(entries[i + 4][29]);
                                var fraction17 = convertCalif(entries[i + 5][29]);
                                var fraction18 = convertCalif(entries[i][32]);
                                var fraction19 = convertCalif(entries[i + 1][32]);
                                var fraction20 = convertCalif(entries[i + 2][32]);
                                var fraction21 = convertCalif(entries[i + 3][32]);
                                var fraction22 = convertCalif(entries[i + 4][32]);
                                var fraction23 = convertCalif(entries[i + 5][32]);
                                var fraction24 = convertCalif(entries[i][35]);
                                var fraction25 = convertCalif(entries[i + 1][35]);
                                var fraction26 = convertCalif(entries[i + 2][35]);
                                var fraction27 = convertCalif(entries[i + 3][35]);
                                var fraction28 = convertCalif(entries[i + 4][35]);
                                var fraction29 = convertCalif(entries[i + 5][35]);
                                var fraction30 = convertCalif(entries[i][38]);
                                var fraction31 = convertCalif(entries[i + 1][38]);
                                var fraction32 = convertCalif(entries[i + 2][38]);
                                var fraction33 = convertCalif(entries[i + 3][38]);
                                var fraction34 = convertCalif(entries[i + 4][38]);
                                var fraction35 = convertCalif(entries[i + 5][38]);
                                var fraction36 = convertCalif(entries[i][41]);
                                var fraction37 = convertCalif(entries[i + 1][41]);
                                var fraction38 = convertCalif(entries[i + 2][41]);
                                var fraction39 = convertCalif(entries[i + 3][41]);
                                var fraction40 = convertCalif(entries[i + 4][41]);
                                var fraction41 = convertCalif(entries[i + 5][41]);
                                var fraction42 = convertCalif(entries[i][44]);
                                var fraction43 = convertCalif(entries[i + 1][44]);
                                var fraction44 = convertCalif(entries[i + 2][44]);
                                var fraction45 = convertCalif(entries[i + 3][44]);
                                var fraction46 = convertCalif(entries[i + 4][44]);
                                var fraction47 = convertCalif(entries[i + 5][44]);

                            } else {
                                var answer0 = entries[i][22];
                                var answer1 = entries[i][25];
                                var answer2 = entries[i][28];
                                var answer3 = entries[i][31];
                                var answer4 = entries[i][34];
                                var answer5 = entries[i][37];
                                var answer6 = entries[i][40];
                                var answer7 = entries[i][43];

                                var feedback0 = entries[i][24];
                                var feedback1 = entries[i][27];
                                var feedback2 = entries[i][30];
                                var feedback3 = entries[i][33];
                                var feedback4 = entries[i][36];
                                var feedback5 = entries[i][39];
                                var feedback6 = entries[i][42];
                                var feedback7 = entries[i][45];
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
                                var fraction0 = convertCalif(entries[i][23]);
                                var fraction1 = convertCalif(entries[i][26]);
                                var fraction2 = convertCalif(entries[i][29]);
                                var fraction3 = convertCalif(entries[i][32]);
                                var fraction4 = convertCalif(entries[i][35]);
                                var fraction5 = convertCalif(entries[i][38]);
                                var fraction6 = convertCalif(entries[i][41]);
                                var fraction7 = convertCalif(entries[i][44]);
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
                                _qf__qtype_shortmath_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
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
                                idnumber: idnumber,
                                usecase: usecase,
                                editorconfig: toolbartemplate,
                                configchangeconfirm: confirmchange,
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

                        if (questiontype == "description") {
                            if ((entries[i][2]) == "TRUE") {
                                generalfeedback = "{mlang es" + "}" + entries[i][16] + "{mlang}{mlang ca" + "}" +
                                entries[i + 1][16] + "{mlang}{mlang ca_ct" + "}" +
                                entries[i + 2][16] + "{mlang}{mlang ca_valencia" + "}" +
                                entries[i + 3][16] + "{mlang}{mlang en" + "}" +
                                entries[i + 4][16] + "{mlang}{mlang eu" + "}" +
                                entries[i + 5][16] + "{mlang}{mlang gl" + "}" +
                                entries[i + 6][16] + "{mlang}";
                        } else {
                                generalfeedback = entries[i][16];
                        }
                            var idnumber = entries[i][17];
                            var tags = entries[i][18];
                            var obj = {
                                defaultmark: 0,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_description_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_coursetagsheader: 0,
                                mform_isexpanded_id_createdmodifiedheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciado,
                                "questiontext[format]": 1,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                idnumber: idnumber
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "essay") {
                            if ((entries[i][2]) == "TRUE") {

                        } else {
                                
                        }
                            var defaultmark = entries[i][16];
                            var idnumber = entries[i][18];
                            var responseformat = convertresponseformat(entries[i][19]);
                            var responserequired = convertresponserequired(entries[i][20]);
                            var responsefieldlines = convertresponsefieldlines(entries[i][21]);
                            var attachments = convertattachments(entries[i][22]);
                            var attachmentsrequired = convertattachmentsrequired(entries[i][23]);
                            var filetypeslist = entries[i][24];
                            var responsetemplate = entries[i][25];
                            var graderinfo = entries[i][26];
                            var tags = entries[i][27];
                            var obj = {
                                mform_isexpanded_id_responseoptions: 1,
                                mform_isexpanded_id_graderinfoheader: 1,
                                id: idpregunta,
                                inpopup: "",
                                cmid: "",
                                courseid: courseid,
                                scrollpos: 0,
                                appendqnumstring: "",
                                qtype: tipo,
                                makecopy: 0,
                                sesskey: sesskey,
                                _qf__qtype_essay_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_responsetemplateheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_coursetagsheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciado,
                                "questiontext[format]": 1,
                                defaultmark: defaultmark,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                idnumber: idnumber,
                                responseformat: responseformat,
                                responserequired: responserequired,
                                responsefieldlines: responsefieldlines,
                                attachments: attachments,
                                attachmentsrequired: attachmentsrequired,
                                "responsetemplate[text]": responsetemplate,
                                "responsetemplate[format]":	1,
                                "graderinfo[text]": graderinfo,
                                "graderinfo[format]": 1
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "multianswer") {
                            if ((entries[i][2]) == "TRUE") {
                                var reg1 = "\\{(.*?)";
                                var reg2 = "\\"+"}";
                                //var reg1 = "\\[\\[([\\d]+)";
                                //var reg2 = "\\"+"]"+"\\"+"]";
                                var reg = new RegExp(reg1+reg2,"gm");
                                var wirisquestion = entries[i][18];
                                var textoes = entries[i][15];
                                var textoca = eliminaundefined(entries[i+1][15]);
                                var textoct = eliminaundefined(entries[i+2][15]);
                                var textova = eliminaundefined(entries[i+3][15]);
                                var textoen = eliminaundefined(entries[i+4][15]);
                                var textoeu = eliminaundefined(entries[i+5][15]);
                                var textogl = eliminaundefined(entries[i+6][15]);
                                var inputs = textoes.match(reg);
                                var trozoses = [];
                                if (textoes !== ""){
                                    trozoses = trozos(textoes,inputs,"es");
                                };
                                var trozosca = [];
                                if (textoca !== ""){
                                    trozosca = trozos(textoca,inputs,"ca");
                                };
                                var trozosct = [];
                                if (textoct !== ""){
                                    trozosct = trozos(textoct,inputs,"ca_ct");
                                };
                                var trozosva = [];
                                if (textova !== ""){
                                    trozosva = trozos(textova,inputs,"ca_valencia");
                                };
                                var trozosen = [];
                                if (textoen !== ""){
                                    trozosen = trozos(textoen,inputs,"en");
                                };
                                var trozoseu = [];
                                if (textoeu !== ""){
                                    trozoseu = trozos(textoeu,inputs,"eu");
                                };
                                var trozosgl = [];
                                if (textogl !== ""){
                                    trozosgl = trozos(textogl,inputs,"gl");
                                };
                                var enunciadogapfill = creaenunciado(trozoses,trozosca,trozosct,trozosva,trozosen,trozoseu,trozosgl,inputs);  
                            } else {
                                var enunciadogapfill = entries[i][15];
                            }
                            var idnumber = entries[i][16];
                            var tags = entries[i][18];
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
                                _qf__qtype_multianswer_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_coursetagsheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciadogapfill,
                                "questiontext[format]": 1,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                idnumber: idnumber
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "shortanswerwiris") {
                                var wirisquestion = entries[i][18];
                                var noanswers = entries[i][43];
                                var tags = entries[i][44];
                                var respuestas = [];
                                var retros = [];
                                var califs = [];
                                var answer0 = entries[i][19];
                                var answer1 = entries[i][22];
                                var answer2 = entries[i][25];
                                var answer3 = entries[i][28];
                                var answer4 = entries[i][31];
                                var answer5 = entries[i][34];
                                var answer6 = entries[i][37];
                                var answer7 = entries[i][40];
                            if ((entries[i][2]) == "TRUE") {
                                var feedback0 = "{mlang es" + "}" + eliminaundefined([i][21]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][21]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][21]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][21]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][21]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][21]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][21]) + "{mlang}";
                                var feedback1 = "{mlang es" + "}" + eliminaundefined(entries[i][24]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][24]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][24]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][24]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][24]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][24]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][24]) + "{mlang}";
                                var feedback2 = "{mlang es" + "}" + eliminaundefined(entries[i][27]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][27]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][27]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][27]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][27]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][27]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][27]) + "{mlang}";
                                var feedback3 = "{mlang es" + "}" + eliminaundefined(entries[i][30]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][30]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][30]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][30]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][30]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][30]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][30]) + "{mlang}";
                                var feedback4 = "{mlang es" + "}" + eliminaundefined(entries[i][33]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][33]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][33]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][33]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][33]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][33]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][33]) + "{mlang}";
                                var feedback5 = "{mlang es" + "}" + eliminaundefined(entries[i][36]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][36]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][36]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][36]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][36]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][36]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][36]) + "{mlang}";
                                var feedback6 = "{mlang es" + "}" + eliminaundefined(entries[i][39]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][39]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][39]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][39]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][39]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][39]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][39]) + "{mlang}";
                                var feedback7 = "{mlang es" + "}" + eliminaundefined(entries[i][42]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][42]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][42]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][42]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][42]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][42]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][42]) + "{mlang}";
                            } else {
                                var feedback0 = eliminaundefined([i][21]);
                                var feedback1 = eliminaundefined([i][24]);
                                var feedback2 = eliminaundefined([i][27]);
                                var feedback3 = eliminaundefined([i][30]);
                                var feedback4 = eliminaundefined([i][33]);
                                var feedback5 = eliminaundefined([i][36]);
                                var feedback6 = eliminaundefined([i][39]);
                                var feedback7 = eliminaundefined([i][42]);

                            };
                                var fraction0 = convertCalif(entries[i][20]);
                                var fraction1 = convertCalif(entries[i][23]);
                                var fraction2 = convertCalif(entries[i][26]);
                                var fraction3 = convertCalif(entries[i][29]);
                                var fraction4 = convertCalif(entries[i][32]);
                                var fraction5 = convertCalif(entries[i][35]);
                                var fraction6 = convertCalif(entries[i][38]);
                                var fraction7 = convertCalif(entries[i][41]);
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
                                _qf__qtype_shortanswerwiris_helper_edit_form: 1,
                                wirisquestion: wirisquestion,
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
                                "fraction[0]": fraction0,
                                "fraction[1]": fraction1,
                                "fraction[2]": fraction2,
                                "fraction[3]": fraction3,
                                "fraction[4]": fraction4,
                                "fraction[5]": fraction5,
                                "fraction[6]": fraction6,
                                "fraction[7]": fraction7,
                                "feedback[0][text]": feedback0,
                                "feedback[1][text]": feedback1,
                                "feedback[2][text]": feedback2,
                                "feedback[3][text]": feedback3,
                                "feedback[4][text]": feedback4,
                                "feedback[5][text]": feedback5,
                                "feedback[6][text]": feedback6,
                                "feedback[7][text]": feedback7,
                                "feedback[0][format]": 1,
                                "feedback[1][format]": 1,
                                "feedback[2][format]": 1,
                                "feedback[3][format]": 1,
                                "feedback[4][format]": 1,
                                "feedback[5][format]": 1,
                                "feedback[6][format]": 1,
                                "feedback[7][format]": 1,
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "multianswerwiris") {
                            if ((entries[i][2]) == "TRUE") {
                                var reg1 = "\\{(.*?)";
                                var reg2 = "\\"+"}";
                                //var reg1 = "\\[\\[([\\d]+)";
                                //var reg2 = "\\"+"]"+"\\"+"]";
                                var reg = new RegExp(reg1+reg2,"gm");
                                var wirisquestion = entries[i][18];
                                var textoes = entries[i][15];
                                var textoca = eliminaundefined(entries[i+1][15]);
                                var textoct = eliminaundefined(entries[i+2][15]);
                                var textova = eliminaundefined(entries[i+3][15]);
                                var textoen = eliminaundefined(entries[i+4][15]);
                                var textoeu = eliminaundefined(entries[i+5][15]);
                                var textogl = eliminaundefined(entries[i+6][15]);
                                var inputs = textoes.match(reg);
                                var trozoses = [];
                                if (textoes !== ""){
                                    trozoses = trozos(textoes,inputs,"es");
                                };
                                var trozosca = [];
                                if (textoca !== ""){
                                    trozosca = trozos(textoca,inputs,"ca");
                                };
                                var trozosct = [];
                                if (textoct !== ""){
                                    trozosct = trozos(textoct,inputs,"ca_ct");
                                };
                                var trozosva = [];
                                if (textova !== ""){
                                    trozosva = trozos(textova,inputs,"ca_valencia");
                                };
                                var trozosen = [];
                                if (textoen !== ""){
                                    trozosen = trozos(textoen,inputs,"en");
                                };
                                var trozoseu = [];
                                if (textoeu !== ""){
                                    trozoseu = trozos(textoeu,inputs,"eu");
                                };
                                var trozosgl = [];
                                if (textogl !== ""){
                                    trozosgl = trozos(textogl,inputs,"gl");
                                };
                                var enunciadogapfill = creaenunciado(trozoses,trozosca,trozosct,trozosva,trozosen,trozoseu,trozosgl,inputs);  
                               /* var retroalimentacioncorrecta = "{mlang es" + "}" + entries[i][28] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][28] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][28] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][28] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][28] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][28] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][28] + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][29] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][29] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][29] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][29] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][29] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][29] + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + entries[i][30] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][30] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][30] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][30] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][30] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][30] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][30] + "{mlang}";*/
                            } else {
                                var enunciadogapfill = entries[i][15];
                                //var retroalimentacioncorrecta = "{mlang " + idioma + "}" + entries[i][28] + "{mlang}";
                                //var retroalimentacionparcial = "{mlang " + idioma + "}" + entries[i][29] + "{mlang}";
                                //var retroalimentacionincorrecta = "{mlang " + idioma + "}" + entries[i][30] + "{mlang}";
                            }
                            var idnumber = entries[i][16];
                            var tags = entries[i][19];
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
                                _qf__qtype_multianswer_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_multitriesheader: 0,
                                mform_isexpanded_id_tagsheader: 0,
                                mform_isexpanded_id_coursetagsheader: 0,
                                categorymoveto: idcategoria,
                                name: nombre,
                                "questiontext[text]": enunciadogapfill,
                                "questiontext[format]": 1,
                                "generalfeedback[text]": generalfeedback,
                                "generalfeedback[format]": 1,
                                idnumber: idnumber,
                                wirisquestion: wirisquestion
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "multichoicewiris") {
                            var wirisquestion = entries[i][22];
                            if ((entries[i][2]) == "TRUE") {
                                var eleccion1 = "{mlang es" + "}" + entries[i][23] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][23] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][23] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][23] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][23] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][23] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][23] + "{mlang}";
                                var eleccion2 = "{mlang es" + "}" + entries[i][26] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][26] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][26] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][26] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][26] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][26] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][26] + "{mlang}";
                                var eleccion3 = "{mlang es" + "}" + entries[i][29] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][29] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][29] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][29] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][29] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][29] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][29] + "{mlang}";
                                var eleccion4 = "{mlang es" + "}" + entries[i][32] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][32] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][32] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][32] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][32] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][32] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][32] + "{mlang}";
                                var eleccion5 = "{mlang es" + "}" + entries[i][35] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][35] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][35] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][35] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][35] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][35] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][35] + "{mlang}";
                                var eleccion6 = "{mlang es" + "}" + entries[i][38] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][38] + "{mlang}{mlang ca_ct" + "}" +  
                                    entries[i + 2][38] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][38] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][38] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][38] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][38] + "{mlang}";
                                var eleccion7 = "{mlang es" + "}" + entries[i][41] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][41] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][41] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][41] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][41] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][41] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][41] + "{mlang}";
                                var eleccion8 = "{mlang es" + "}" + entries[i][44] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][44] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][44] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][44] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][44] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][44] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][44] + "{mlang}";
                                var eleccion9 = "{mlang es" + "}" + entries[i][47] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][47] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][47] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][47] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][47] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][47] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][47] + "{mlang}";
                                var eleccion10 = "{mlang es" + "}" + entries[i][50] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][50] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][50] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][50] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][50] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][50] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][50] + "{mlang}";
                                var eleccion11 = "{mlang es" + "}" + entries[i][53] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][53] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][53] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][53] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][53] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][53] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][53] + "{mlang}";
                                var eleccion12 = "{mlang es" + "}" + entries[i][56] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][56] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][56] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][56] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][56] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][56] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][56] + "{mlang}";
                                var eleccion13 = "{mlang es" + "}" + entries[i][59] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][59] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][59] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][59] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][59] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][59] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][59] + "{mlang}";
                                var eleccion14 = "{mlang es" + "}" + entries[i][62] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][62] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][62] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][62] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][62] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][62] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][62] + "{mlang}";
                                var eleccion15 = "{mlang es" + "}" + entries[i][65] + "{mlang}{mlang ca" + "}" +
                                    entries[i + 1][65] + "{mlang}{mlang ca_ct" + "}" +
                                    entries[i + 2][65] + "{mlang}{mlang ca_valencia" + "}" +
                                    entries[i + 3][65] + "{mlang}{mlang en" + "}" +
                                    entries[i + 4][65] + "{mlang}{mlang eu" + "}" +
                                    entries[i + 5][65] + "{mlang}{mlang gl" + "}" +
                                    entries[i + 6][65] + "{mlang}";
                                var retroalimentacion1 = "{mlang es" + "}" + eliminaundefined(entries[i][25]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][25]) + "{mlang}{mlang ca_ct" + "}" +    
                                    eliminaundefined(entries[i + 2][25]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][25]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][25]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][25]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][25]) + "{mlang}";
                                var retroalimentacion2 = "{mlang es" + "}" + eliminaundefined([i][28]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][28]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][28]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][28]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][28]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][28]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][28]) + "{mlang}";
                                var retroalimentacion3 = "{mlang es" + "}" + eliminaundefined(entries[i][31]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][31]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][31]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][31]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][31]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][31]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][31]) + "{mlang}";
                                var retroalimentacion4 = "{mlang es" + "}" + eliminaundefined(entries[i][34]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][34]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][34]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][34]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][34]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][34]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][34]) + "{mlang}";
                                var retroalimentacion5 = "{mlang es" + "}" + eliminaundefined(entries[i][37]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][37])+ "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][37]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][37]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][37]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][37]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][37]) + "{mlang}";
                                var retroalimentacion6 = "{mlang es" + "}" + eliminaundefined(entries[i][40]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][40]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][40]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][40]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][40]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][40]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][40]) + "{mlang}";
                                var retroalimentacion7 = "{mlang es" + "}" + eliminaundefined(entries[i][43]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][43]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][43]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][43]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][43]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][43]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][43]) + "{mlang}";
                                var retroalimentacion8 = "{mlang es" + "}" + eliminaundefined(entries[i][46]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][46]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][46]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][46]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][46]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][46]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][46]) + "{mlang}";
                                var retroalimentacion9 = "{mlang es" + "}" + eliminaundefined(entries[i][49]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][49]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][49]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][49]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][49]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][49]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][49]) + "{mlang}";
                                var retroalimentacion10 = "{mlang es" + "}" + eliminaundefined(entries[i][52]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][52]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][52]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][52]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][52]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][52]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][52]) + "{mlang}";
                                var retroalimentacion11 = "{mlang es" + "}" + eliminaundefined(entries[i][55]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][55]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][55]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][55]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][55]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][55]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][55]) + "{mlang}";
                                var retroalimentacion12 = "{mlang es" + "}" + eliminaundefined(entries[i][58]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][58]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][58]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][58]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][58]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][58]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][58]) + "{mlang}";
                                var retroalimentacion13 = "{mlang es" + "}" + eliminaundefined(entries[i][61]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][61]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][61]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][61]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][61]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][61]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][61]) + "{mlang}";
                                var retroalimentacion14 = "{mlang es"+ "}" + eliminaundefined(entries[i][64]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][64]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][64]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][64]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][64]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][64]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][64]) + "{mlang}";
                                var retroalimentacion15 = "{mlang es" + "}" + eliminaundefined(entries[i][67]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][67]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][67]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][67]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][67]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][67]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][67]) + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang es" + "}" + eliminaundefined(entries[i][69]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][69]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][69]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][69]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][69]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][69]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][69]) + "{mlang}";
                                var retroalimentacionparcial = "{mlang es" + "}" + eliminaundefined(entries[i][70]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][70]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][70]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][70]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][70]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][70]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][70]) + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang es" + "}" + eliminaundefined(entries[i][71]) + "{mlang}{mlang ca" + "}" +
                                    eliminaundefined(entries[i + 1][71]) + "{mlang}{mlang ca_ct" + "}" +
                                    eliminaundefined(entries[i + 2][71]) + "{mlang}{mlang ca_valencia" + "}" +
                                    eliminaundefined(entries[i + 3][71]) + "{mlang}{mlang en" + "}" +
                                    eliminaundefined(entries[i + 4][71]) + "{mlang}{mlang eu" + "}" +
                                    eliminaundefined(entries[i + 5][71]) + "{mlang}{mlang gl" + "}" +
                                    eliminaundefined(entries[i + 6][71]) + "{mlang}";
                            } else {
                                var eleccion1 = "{mlang " + idioma + "}" + entries[i][23] + "{mlang}";
                                var eleccion2 = "{mlang " + idioma + "}" + entries[i][26] + "{mlang}";
                                var eleccion3 = "{mlang " + idioma + "}" + entries[i][29] + "{mlang}";
                                var eleccion4 = "{mlang " + idioma + "}" + entries[i][32] + "{mlang}";
                                var eleccion5 = "{mlang " + idioma + "}" + entries[i][35] + "{mlang}";
                                var eleccion6 = "{mlang " + idioma + "}" + entries[i][38] + "{mlang}";
                                var eleccion7 = "{mlang " + idioma + "}" + entries[i][41] + "{mlang}";
                                var eleccion8 = "{mlang " + idioma + "}" + entries[i][44] + "{mlang}";
                                var eleccion9 = "{mlang " + idioma + "}" + entries[i][47] + "{mlang}";
                                var eleccion10 = "{mlang " + idioma + "}" + entries[i][50] + "{mlang}";
                                var eleccion11 = "{mlang " + idioma + "}" + entries[i][53] + "{mlang}";
                                var eleccion12 = "{mlang " + idioma + "}" + entries[i][56] + "{mlang}";
                                var eleccion13 = "{mlang " + idioma + "}" + entries[i][59] + "{mlang}";
                                var eleccion14 = "{mlang " + idioma + "}" + entries[i][62] + "{mlang}";
                                var eleccion15 = "{mlang " + idioma + "}" + entries[i][65] + "{mlang}";
                                var retroalimentacion1 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][25]) + "{mlang}";
                                var retroalimentacion2 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][28]) + "{mlang}";
                                var retroalimentacion3 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][31]) + "{mlang}";
                                var retroalimentacion4 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][34]) + "{mlang}";
                                var retroalimentacion5 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][37]) + "{mlang}";
                                var retroalimentacion6 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][40]) + "{mlang}";
                                var retroalimentacion7 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][43]) + "{mlang}";
                                var retroalimentacion8 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][46]) + "{mlang}";
                                var retroalimentacion9 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][49]) + "{mlang}";
                                var retroalimentacion10 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][52]) + "{mlang}";
                                var retroalimentacion11 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][55]) + "{mlang}";
                                var retroalimentacion12 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][58]) + "{mlang}";
                                var retroalimentacion13 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][61]) + "{mlang}";
                                var retroalimentacion14 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][64]) + "{mlang}";
                                var retroalimentacion15 = "{mlang " + idioma + "}" + eliminaundefined(entries[i][67]) + "{mlang}";
                                var retroalimentacioncorrecta = "{mlang " + idioma + "}" + eliminaundefined(entries[i][69]) + "{mlang}";
                                var retroalimentacionparcial = "{mlang " + idioma + "}" + eliminaundefined(entries[i][70]) + "{mlang}";
                                var retroalimentacionincorrecta = "{mlang " + idioma + "}" + eliminaundefined(entries[i][71]) + "{mlang}";
                            }
                            var single = convertsingle(entries[i][18]);
                            var shuffleanswers = convertshuffleanswers(entries[i][19]);
                            var answernumbering = convertanswernumbering(entries[i][20]);
                            var showstandardinstruction = convertshowstandardinstruction(entries[i][21]);
                            var fraction0 = convertCalif(entries[i][24]);
                            var fraction1 = convertCalif(entries[i][27]);
                            var fraction2 = convertCalif(entries[i][30]);
                            var fraction3 = convertCalif(entries[i][33]);
                            var fraction4 = convertCalif(entries[i][36]);
                            var fraction5 = convertCalif(entries[i][39]);
                            var fraction6 = convertCalif(entries[i][42]);
                            var fraction7 = convertCalif(entries[i][45]);
                            var fraction8 = convertCalif(entries[i][48]);
                            var fraction9 = convertCalif(entries[i][51]);
                            var fraction10 = convertCalif(entries[i][54]);
                            var fraction11 = convertCalif(entries[i][57]);
                            var fraction12 = convertCalif(entries[i][60]);
                            var fraction13 = convertCalif(entries[i][63]);
                            var fraction14 = convertCalif(entries[i][66]);
                            var noanswers = entries[i][68];
                            var tags = entries[i][72];
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
                                mform_isexpanded_id_coursetagsheader: 0,
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
                                wirisquestion: wirisquestion,
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
                            idspreguntas.push(idpregunta);
                        }
                        if (questiontype == "calculated") {
                            var noanswers = entries[i][51];
                            var tags = entries[i][52];
                                var idnumber = entries[i][18];
                                var formula1 = entries[i][19];
                                var calif1 = convertCalif(entries[i][20]);
                                var tolerancia1 = entries[i][21];
                                var tipotolerancia1 = convertTipoTolerancia(entries[i][22]);
                                var mostrar1 = entries[i][23];
                                var formato1 = convertFormatoCalculada(entries[i][24]);
                                var feedback1 = "{mlang es" + "}" + eliminaundefined([i][25]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][25]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][25]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][25]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][25]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][25]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][25]) + "{mlang}";
                                var formula2 = entries[i][26];
                                var calif2 = convertCalif(entries[i][27]);
                                var tolerancia2 = entries[i][28];
                                var tipotolerancia2 = convertTipoTolerancia(entries[i][29]);
                                var mostrar2 = entries[i][30];
                                var formato2 = convertFormatoCalculada(entries[i][31]);
                                var feedback2 = "{mlang es" + "}" + eliminaundefined(entries[i][32]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][32]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][32]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][32]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][32]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][32]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][32]) + "{mlang}";
                                var formula3 = entries[i][33];
                                var calif3 = convertCalif(entries[i][34]);
                                var tolerancia3 = entries[i][35];
                                var tipotolerancia3 = convertTipoTolerancia(entries[i][36]);
                                var mostrar3 = entries[i][37];
                                var formato3 = convertFormatoCalculada(entries[i][38]);
                                var feedback3 = "{mlang es" + "}" + eliminaundefined(entries[i][39]) + "{mlang}{mlang ca" + "}" +
                                eliminaundefined(entries[i + 1][39]) + "{mlang}{mlang ca_ct" + "}" +
                                eliminaundefined(entries[i + 2][39]) + "{mlang}{mlang ca_valencia" + "}" +
                                eliminaundefined(entries[i + 3][39]) + "{mlang}{mlang en" + "}" +
                                eliminaundefined(entries[i + 4][39]) + "{mlang}{mlang eu" + "}" +
                                eliminaundefined(entries[i + 5][39]) + "{mlang}{mlang gl" + "}" +
                                eliminaundefined(entries[i + 6][39]) + "{mlang}";   
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
                                _qf__qtype_calculated_edit_form: 1,
                                mform_isexpanded_id_generalheader: 1,
                                mform_isexpanded_id_unithandling: 0,
                                mform_isexpanded_id_unithdr: 0,
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
                                idnumber: idnumber,
                                "answer[0]": formula1,
                                "fraction[0]": calif1,
                                "tolerance[0]": tolerancia1,
                                "tolerancetype[0]": tipotolerancia1,
                                "correctanswerlength[0]": mostrar1,
                                "correctanswerformat[0]": formato1,
                                "feedback[0][text]": feedback1,
                                "feedback[0][format]": 1,
                                "answer[1]": formula2,
                                "fraction[1]": calif2,
                                "tolerance[1]": tolerancia2,
                                "tolerancetype[1]": tipotolerancia2,
                                "correctanswerlength[1]": mostrar2,
                                "correctanswerformat[1]": formato2,
                                "feedback[1][text]": feedback2,
                                "feedback[1][format]": 1,
                                "answer[2]": formula3,
                                "fraction[2]": calif3,
                                "tolerance[2]": tolerancia3,
                                "tolerancetype[2]": tipotolerancia3,
                                "correctanswerlength[2]": mostrar3,
                                "correctanswerformat[2]": formato3,
                                "feedback[2][text]": feedback3,
                                "feedback[2][format]": 1
                            };
                            if (tags !== "") {
                                obj["tags[]"] = tags;
                            }
                            datos.push(obj);
                            idspreguntas.push(idpregunta);
                        }

                    }

                }
                nombresdepreguntas.push(nombrepregunta);
            })
            .done(function() {
                $("#total").append("<p style='text-align: center;'>Se van a actualizar "+datos.length+" preguntas</p>");
                enviar(datos, 0);
            })
    });

    $("#cancel-button").click(function() {
        location.reload(true);
    });

    function enviar(dato, indice) {
        var googledata = [];

        if (indice < dato.length) {
            var newquestion = dato[indice].id;
            var tipo = dato[indice].qtype;
            var curso = dato[indice].courseid;
            var categoria = dato[indice].categorymoveto;

            const hostname = window.location.hostname;
            var urlhost = "https://" + hostname + "/question/bank/editquestion/question.php";
            if (newquestion == ""){
                urlhost = "https://" + hostname + "/question/bank/editquestion/question.php?qtype="+tipo+"&returnurl=/question/edit.php?courseid="+curso+"&cat="+categoria+"&lastchanged=420850&courseid="+curso+"&category="+categoria;
            }
            $.ajax({
                url: urlhost,
                method: "POST",
                data: dato[indice]
            }).done(function(data) {
                    var questionname = dato[indice].name;
                    var courseid = dato[indice].courseid;
                    var category = dato[indice].categorymoveto;
                    $.get({
                        url: 'https://' + hostname + '/question/edit.php?courseid='+courseid+'&cat='+category,
                    }).done(function(msg) {
                        var idpreg = $(msg).find(".inplaceeditable-text[data-value='"+questionname+"']").attr("data-itemid");
                        cogefilagoogle(page, questionname, idpreg);
                        $("#progreso").append("<p> · "+questionname+"</p>");
                    });    
                document.getElementById('task3').style.visibility = 'visible';
                indice++;
                enviar(dato, indice);  
            });
        } else {
            $("#cancel-button").hide();
            $("#start-button").delay(10000).hide();
            $("#task4").delay(10000).css("visibility", "visible");
        } 
    }


    async function cogefilagoogle(sheetname, name, id) {
            var itemsgoogle;
            itemsgoogle = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: sheet,
                range: sheetname + '!O2:O'
            });
            const resultados = itemsgoogle.result.values;
            var titulosgoogle = [];
            for (j = 0; j < resultados.length; j++) {
                titulosgoogle.push(resultados[j][0]);
            }
            var posicion = titulosgoogle.indexOf(name) + 2;
            actualizagoogle(posicion, sheetname, id);
    }


    function actualizagoogle(posicion, sheetname, datos) {
            var valores = [
                [datos]
            ];
            //valores[0][0] = datos[0];
            //valores[0][1] = datos[1];
            var params = {
                //spreadsheetId: '1gfua22Ew0o6qwya4HVHn_5OhDs9V0BJLXIzxbdiNF1g',
                spreadsheetId: sheet,
                range: sheetname + '!G' + posicion + ':AG',
                //range: 'Hola!J' + posicion + ':K',
                valueInputOption: 'USER_ENTERED',
            };
            var valueRangeBody = {};
            valueRangeBody.values = valores;
            var request = gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
            request.then(function(response) {
                console.log(response.result);
            }, function(reason) {
                console.error('error: ' + reason.result.error.message);
            });

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
        if (data == "-100%") {
            califdef = "-1.0"
        }
        if (data == "-90%") {
            califdef = "-0.9"
        }
        if (data == "-83%") {
            califdef = "-0.8333333"
        }
        if (data == "-80%") {
            califdef = "-0.8"
        }
        if (data == "-75%") {
            califdef = "-0.75"
        }
        if (data == "-70%") {
            califdef = "-0.7"
        }
        if (data == "-66%") {
            califdef = "-0.6666667"
        }
        if (data == "-60%") {
            califdef = "-0.6"
        }
        if (data == "-50%") {
            califdef = "-0.5"
        }
        if (data == "-40%") {
            califdef = "-0.4"
        }
        if (data == "-33%") {
            califdef = "-0.3333333"
        }
        if (data == "-30%") {
            califdef = "-0.3"
        }
        if (data == "-25%") {
            califdef = "-0.25"
        }
        if (data == "-20%") {
            califdef = "-0.2"
        }
        if (data == "-16%") {
            califdef = "-0.1666667"
        }
        if (data == "-14%") {
            califdef = "-0.1428571"
        }
        if (data == "-12%") {
            califdef = "-0.125"
        }
        if (data == "-11%") {
            califdef = "-0.1111111"
        }
        if (data == "-10%") {
            califdef = "-0.1"
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
    function convertdropshape(data) {
        var dropshape;
        if (data == "Círculo") {
            dropshape = "circle"
        }
        if (data == "Polígono") {
            dropshape = "polygon"
        }
        if (data == "Rectángulo") {
            dropshape = "rectangle"
        }
        return dropshape;
    }
    function converttemplate(data) {
        var template;
        if (data == "Default") {
            template = 1
        }
        if (data == "None") {
            template = 2
        }
        return template;
    }
    function convertresponseformat(data){
        var responseformat;
        if (data == "Editor HTML") {
            responseformat = "editor"
        }
        if (data == "Editor HTML con selector de archivos") {
            responseformat = "editorfilepicker"
        }
        if (data == "Texto sin formato") {
            responseformat = "plain"
        }
        if (data == "Texto sin formato, tipografía monoespaciada") {
            responseformat = "monospaced"
        }
        if (data == "Sin texto en línea") {
            responseformat = "noinline"
        }
        return responseformat;    
    }
    function convertresponserequired(data){
        var responserequired;
        if (data == "Requerir al estudiante que introduzca texto") {
            responserequired = 1
        }
        if (data == "El texto es opcional") {
            responserequired = 0
        }
        return responserequired;
    }
    function convertresponsefieldlines(data){
        var responsefieldlines;
        if (data == "2 líneas") {
            responsefieldlines = 2
        }
        if (data == "3 líneas") {
            responsefieldlines = 3
        }
        if (data == "5 líneas") {
            responsefieldlines = 5
        }
        if (data == "10 líneas") {
            responsefieldlines = 10
        }
        if (data == "15 líneas") {
            responsefieldlines = 15
        }
        if (data == "20 líneas") {
            responsefieldlines = 20
        }
        if (data == "25 líneas") {
            responsefieldlines = 25
        }
        if (data == "30 líneas") {
            responsefieldlines = 30
        }
        if (data == "35 líneas") {
            responsefieldlines = 35
        }
        if (data == "40 líneas") {
            responsefieldlines = 40
        }
        return responsefieldlines;
    }
    function convertattachments(data){
        var attachments;
        if (data == "No") {
            attachments = 0
        }
        if (data == "1") {
            attachments = 1
        }
        if (data == "2") {
            attachments = 2
        }
        if (data == "3") {
            attachments = 3
        }
        if (data == "Sin límite") {
            attachments = "-1"
        }
        return attachments;
    }
    function convertattachmentsrequired(data){
        var attachmentsrequired;
        if (data == "Los archivos adjuntos son opcionales") {
            attachmentsrequired = 0
        }
        if (data == "1") {
            attachmentsrequired = 1
        }
        if (data == "2") {
            attachmentsrequired = 2
        }
        if (data == "3") {
            attachmentsrequired = 3
        }
        return attachmentsrequired;
    }
    function convertelemento(data){
        var elemento;
        if (data == "Texto arrastrable") {
            elemento = "word"
        }
        if (data == "Imagen arrastrable") {
            elemento = "image"
        }
        return elemento;
    }
    function convertTipoTolerancia(data){
        var elemento;
        if (data == "Relativa") {
            elemento = "1"
        }
        if (data == "Nominal") {
            elemento = "2"
        }
        if (data == "Geométrica") {
            elemento = "3"
        }
        return elemento;
    }
    function convertFormatoCalculada(data){
        var elemento;
        if (data == "decimales") {
            elemento = "1"
        }
        if (data == "Cifras significativas") {
            elemento = "2"
        }
        return elemento;
    }
    function trozos(texto,inputs,lang){
        var out = [];
        if (texto == "" || texto == undefined){
            out = ""
        } 
        for (k=0;k<inputs.length;k++){
            var sus = inputs[k];
            var sus1 = sus+"*";
            var piece = texto.replace(sus, sus1);
            var out1 = piece.split(inputs[k]+"*");
            out.push("{mlang "+lang+"}"+out1[0]+"{mlang}");
            texto = out1[1];
            if( k === inputs.length-1) {
                out.push("{mlang "+lang+"}"+texto+"{mlang}");
            }
        }
        return out;
    }
    function creaenunciado(trozoses,trozosca,trozosct,trozosva,trozosen,trozoseu,trozosgl,inputs){
        var enunciado = "";
        for (j in trozoses){
            if (inputs[j] == undefined){ inputs[j] = ""};
            if (trozoses[j] == undefined) {trozoses[j]=""};
            if (trozosca[j] == undefined) {trozosca[j]=""};
            if (trozosct[j] == undefined) {trozosct[j]=""};
            if (trozosva[j] == undefined) {trozosva[j]=""};
            if (trozosen[j] == undefined) {trozosen[j]=""};
            if (trozoseu[j] == undefined) {trozoseu[j]=""};
            if (trozosgl[j] == undefined) {trozosgl[j]=""};
            enunciado += trozoses[j]+trozosca[j]+trozosct[j]+trozosva[j]+trozosen[j]+trozoseu[j]+trozosgl[j]+inputs[j];
        }
        return enunciado;
    }
    function eliminaundefined(data){
        if (data == undefined) { data = ""}
        return data;
    }
    //]]>
</script>
<script async="" defer="" src="https://apis.google.com/js/api.js" onload="gapiLoaded()"></script>
<script async="" defer="" src="https://accounts.google.com/gsi/client" onload="gisLoaded()"></script>
