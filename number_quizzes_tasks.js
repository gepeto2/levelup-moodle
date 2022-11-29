    function geturl(type) {
        var course;
        var classList = $('#page-course-view-topics').attr('class').split(/\s+/);
        $.each(classList, function(index, item) {
            if (item.indexOf('course-') === 0) {
                course = item;
                course = course.split('-')[1];
            }
        });
        var urlsite = window.location.origin;
        var urlroot = urlsite + "/mod/" + type + "/index.php?id=" + course;
        return urlroot;
    }
    var urlassign = geturl('assign');
    var urlquiz = geturl('quiz');
    var urladaptivequiz = geturl('adaptivequiz');
    var urlhvp = geturl('hvp');
    var urllti = geturl("lti");
    var urlpage = geturl("page");
    var url = geturl("url");
    $(document).ready(function() {
        $('#contenido').append('<div id="numtareas"><a href="' + urlassign + '" target="_blank">Tareas: </a></div>');
        $('#contenido').append('<div id="numcuestionarios"><a href="' + urlquiz + '" target="_blank">Cuestionarios: </a></div>');
        $('#contenido').append('<div id="numcuestionariosada"><a href="' + urladaptivequiz + '" target="_blank">Cuestionarios adaptativos: </a></div>');
        $('#contenido').append('<div id="numhvps"><a href="' + urlhvp + '" target="_blank">H5Ps: </a></div>');
        $('#contenido').append('<div id="numpages"><a href="' + urlpage + '" target="_blank">Páginas: </a></div>');
        $('#contenido').append('<div id="numltis"><a href="' + urllti + '" target="_blank">LTIs: </a></div>');
        $('#contenido').append('<div id="numurls"><a href="' + url + '" target="_blank">Enlaces: </a></div>');
        $('#contenido').append('<button class="btn btn-secondary" id="totales" onclick="totales()">Mostrar totales</button>');
    });

    function totales() {
        $.get(urlassign, function(result) {
            var obj = $(result).find('.generaltable tr td.c1');
            var tasks = obj.length;
            $('#numtareas').append(tasks);
        });
        $.get(urlquiz, function(result) {
            var obj = $(result).find('.generaltable tr td.c1');
            var quizes = obj.length;
            $('#numcuestionarios').append(quizes);
        });
        $.get(urladaptivequiz, function(result) {
            var obj = $(result).find('.generaltable tr td.c1');
            var adaquizes = obj.length;
            $('#numcuestionariosada').append(adaquizes);
        });
        $.get(urlhvp, function(result) {
            var obj = $(result).find('.generaltable tr td.c1');
            var hvps = obj.length;
            $('#numhvps').append(hvps);
        });
        $.get(urllti, function(result) {
            var obj = $(result).find('.generaltable tr td.c1');
            var ltis = obj.length;
            $('#numltis').append(ltis);
        });
        $.get(urlpage, function(result) {
            var obj = $(result).find('.generaltable tr td.c1');
            var pages = obj.length;
            $('#numpages').append(pages);
        });
        $.get(url, function(result) {
            var obj = $(result).find('.generaltable tr td.c1');
            var urls = obj.length;
            $('#numurls').append(urls);
        });
        $("#totales").hide();
    };
