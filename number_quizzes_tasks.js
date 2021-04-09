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
});
