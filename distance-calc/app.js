// Removes destination
var removeDestination = function() {
  $(this).parents('.destination').remove();
};

// Adds an address to the data table
var addDestination = function() {
  var addr = $('#address').val();
  if (addr !== '') {
    $('#data').append('<tr class="destination"><td class="address"><a href="#" class="close">&times;</a>' + addr + '</td><td class="distance"></td><td class="map"></td></tr>');
    $('.close').click(removeDestination);
  }
}; 
// Sets up jQuery
$(function() {
  // Set up add-address binding
  $('#add-destination').click(addDestination);
});
