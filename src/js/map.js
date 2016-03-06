// Loading Google Maps global variables
var map,				    // Loads the map
	  infowindow, 		// Loads the marker description box
    mapBounds,      // Best visual fit
	  service,			  // Services a defined place
    marker,
    markers = [];

var mapElem = document.getElementById('map');

function initMap() {

	var mountainView = new google.maps.LatLng(37.3860517, -122.0838511);

	var options = {
		center: mountainView,
		zoom: 13
	};

	// Fetch the input data
	var input = document.getElementById('search-input');
  self.neighborhood("Mountain View");

	// Loading the map
	map = new google.maps.Map(mapElem, options);

  // Loading InfoWindow
  infowindow = new google.maps.InfoWindow();

	// Set AutoComplete
	var autocomplete = new google.maps.places.Autocomplete(input);

  // Set the position of the marker using the place ID and location.
  marker = new google.maps.Marker({
      map: map,
      position: mountainView
  });

  // Load inital markers on the map
  loadMarkers();

  // Loading places AutoCompleme
  autocomplete.addListener('place_changed', function() {

    infowindow.close();

    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    // Assign neighborhood name
    self.neighborhood(place.name);

    if (place.geometry.viewport) {

      map.fitBounds(place.geometry.viewport);

    } else {

      map.setCenter(place.geometry.location);
      map.setZoom(17);

    }

    // Empty the markers array
    markers = [];

    // Load Four Square
    fourSquare();

  });
};

var loadMarkers = function() {
  // Empty the markers array
  markers = [];

  // Load Four Square
  fourSquare();

  // Update background color
  updateBackgroundColor($(".foursquare"), "#2d5be3");
};

var createMarker = function(location, name, contentString) {
  var placeLoc = new google.maps.LatLng(location.lat, location.lng);

  // Set the position of the marker using the place ID and location.
  var mapMarker = new google.maps.Marker({
      map: map,
      position: placeLoc
  });

  markers.push(new MapMarker(mapMarker, name, placeLoc));

  mapMarker.addListener('click', function() {
    infowindow.setContent( contentString );
    infowindow.open(map, mapMarker);
  });
}
