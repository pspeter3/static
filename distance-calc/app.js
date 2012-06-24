// Removes destination
var removeDestination = function() {
    var addr = $(this).siblings('.addr').text();
    $(this).parents('.destination').remove();
    if (typeof(Storage) !== "undefined") {
      var destinations = localStorage.destinations;
      localStorage.destinations = destinations.replace(addr + "|", "");
    }
  };

// Adds an address to the data table
var addDestination = function(addr) {
    if (addr !== '') {
      $('#data').append('<tr class="destination"><td class="address"><a href="#" class="close">&times;</a><span class="addr">' + addr + '</span></td><td class="distance"></td><td class="duration"></td><td class="map"></td></tr>');
      $('.close').click(removeDestination);
    }
    if (typeof(Storage) !== "undefined") {
      var destinations = localStorage.destinations;
      if (destinations.match(addr) === null) {
        localStorage.destinations = destinations + addr + "|";
      }
    }
  };

// Update Destination
var updateDestination = function(element, origin, obj) {
    element.children('.distance').text(obj.distance.text);
    element.children('.duration').text(obj.duration.text);
    element.children('.map').html('<a target="_blank" href="http://maps.google.com/maps?saddr= ' + origin + '&daddr=' + element.find('.addr').text() + '">map</a>');
  };

var makeServiceRequest = function(origin, destinations) {
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: destinations,
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, function(response, status) {
      var destinationRows = $('.destination');
      console.log(destinationRows);
      for (var i = response.rows[0].elements.length - 1; i >= 0; i--) {
        updateDestination($(destinationRows[i]), origin, response.rows[0].elements[i]);
      };
    });
  };
// Calculate Distances
var calculateDistances = function() {
    var len = $('.destination').length;
    var destinations = [];
    var origin = $('#address').val();
    $('.destination').each(function() {
      destinations.push($(this).find('.addr').html());
      len--;
      if (len == 0) {
        makeServiceRequest(origin, destinations);
      }
    });
  };

// Sets up jQuery
$(function() {
  if (typeof(Storage) !== "undefined") {
    if (typeof(localStorage.destinations) === "undefined") {
      localStorage.destinations = '';
    }
    var destinations = localStorage.destinations.split('|');
    for (var i = destinations.length - 1; i >= 0; i--) {
      addDestination(destinations[i]);
    };
  }
  // Set up add-destination binding
  $('#add-destination').click(function() {
    addDestination($('#address').val());
  });
  // Set up calculate-distances-binding
  $('#calculate-distances').click(calculateDistances);
});