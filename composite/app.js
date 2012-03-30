$(function() {
  $("#comp").mousemove(function(e) {
    var x = (e.pageX - this.offsetLeft) / 5.6;
    var y = (e.pageY - this.offsetTop) / 4.35;
    $("#zoom").css("background-position", "" + x + "% " + y + "%");
  });
});
