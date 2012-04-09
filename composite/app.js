$(function() {
  $("#comp").mousemove(function(e) {
    var x = (100 * (e.pageX - this.offsetLeft)) / $("#comp").width();
    var y = (100 * (e.pageY - this.offsetTop)) / $("#comp").height();
    $("#zoom").css("background-position", "" + x + "% " + y + "%");
  });
});
