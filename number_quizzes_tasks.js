function geturl(type){
    var course;
    var classList = $('#page-course-view-topics').attr('class').split(/\s+/);
    $.each(classList, function(index, item) {
        if (item.indexOf('course-') === 0) {
            course = item;
            course = course.split('-')[1];
        }
    });
    var urlsite = window.location.origin;
    var urlroot = urlsite+"/mod/"+type+"/index.php?id="+course;
    return urlroot;
}
$( document ).ready(function() {
    var urlassign = geturl('assign');
    var urlquiz = geturl('quiz');
    var urladaptivequiz = geturl('adaptivequiz');
    var urlhvp = geturl('hvp');
    var urllti = geturl("lti");
    var urlpage = geturl("page");
    var url = geturl("url");
  $.get(urlassign, function(result){
    var obj = $(result).find('.generaltable tr td.c1');
    var tasks = obj.length;
    $('#contenido').append('<div id="numtareas"><a href="'+urlassign+'" target="_blank">Tareas: </a></div>');
    $('#numtareas').append(tasks);
   });
  $.get(urlquiz, function(result){
    var obj = $(result).find('.generaltable tr td.c1');
    var quizes = obj.length;
    $('#contenido').append('<div id="numcuestionarios"><a href="'+urlquiz+'" target="_blank">Cuestionarios: </a></div>');
    $('#numcuestionarios').append(quizes);
   });
  $.get(urladaptivequiz, function(result){
    var obj = $(result).find('.generaltable tr td.c1');
    var adaquizes = obj.length;
    $('#contenido').append('<div id="numcuestionariosada"><a href="'+urladaptivequiz+'" target="_blank">Cuestionarios adaptativos: </a></div>');
    $('#numcuestionariosada').append(adaquizes);
   });
  $.get(urlhvp, function(result){
    var obj = $(result).find('.generaltable tr td.c1');
    var hvps = obj.length;
    $('#contenido').append('<div id="numhvps"><a href="'+urlhvp+'" target="_blank">H5Ps: </a></div>');
    $('#numhvps').append(hvps);
   });
   $.get(urllti, function(result){
    var obj = $(result).find('.generaltable tr td.c1');
    var ltis = obj.length;
    $('#contenido').append('<div id="numltis"><a href="'+urllti+'" target="_blank">LTIs: </a></div>');
    $('#numltis').append(ltis);
   });
   $.get(urlpage, function(result){
    var obj = $(result).find('.generaltable tr td.c1');
    var pages = obj.length;
    $('#contenido').append('<div id="numpages"><a href="'+urlpage+'" target="_blank">Páginas: </a></div>');
    $('#numpages').append(pages);
   });
   $.get(url, function(result){
    var obj = $(result).find('.generaltable tr td.c1');
    var urls = obj.length;
    $('#contenido').append('<div id="numurls"><a href="'+url+'" target="_blank">Enlaces: </a></div>');
    $('#numurls').append(urls);
  });
});
