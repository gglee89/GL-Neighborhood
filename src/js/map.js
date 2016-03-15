// Loading Google Maps global variables
var map,				    // Loads the map
	  infowindow, 		// Loads the marker description box
    mapBounds,      // Best visual fit
	  service,			  // Services a defined place
    marker,
    markers = [],
    foursquareIcon1 = "image/foursquareIcon1.png",
    foursquareIcon2 = "image/foursquareIcon2.png",
    starIcon = "image/star.png";


var mapElem = document.getElementById('map');

function initMap() {

  var latitude = 37.3860517;
  var longitude = -122.0838511;
	var mountainView = new google.maps.LatLng(latitude, longitude);

	var options = {
		center: mountainView,
		zoom: 13
	};

	// Fetch the input data
	var input = document.getElementById('search-input');
  self.neighborhood("Mountain View");
  self.locationLat(latitude);
  self.locationLng(longitude);

	// Loading the map
	map = new google.maps.Map(mapElem, options);

  // Loading InfoWindow
  infowindow = new google.maps.InfoWindow();

	// Set AutoComplete
	var autocomplete = new google.maps.places.Autocomplete(input);

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
    self.locationLat(place.geometry.location.lat());
    self.locationLng(place.geometry.location.lng());

    // Reset filter
    self.filter("");

    /*// Append cookie
    var old_cookie;
    var date = new Date();
    var cookie_value = {
      "neighborhood": self.neighborhood(),
      "time": date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    };

    console.log(getCookie("neighborhood_search"));

    if (!getCookie("neighborhood_search")) {
      old_cookie = setCookie("neighborhood_search", cookie_value, 1 );
    } else {
      old_cookie = getCookie("neighborhood_search");
      console.log(old_cookie);
    }*/

    // Best fit the map to the viewport
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Load all relevant markers to Foursquare on the map
    loadMarkers();

  });
}

var loadMarkers = function() {
  // Set the position of the marker using the place ID and location.
  marker = new google.maps.Marker({
      map: map,
      position: new google.maps.LatLng(self.locationLat(), self.locationLng()),
      icon: starIcon
  });

  // Empty the markers array
  markers = [];

  // Load Four Square
  fourSquare();

  // Update background color
  updateBackgroundColor($(".foursquare"), "#2d5be3");
};

var createMarker = function(location, name, category, contentString) {
  var placeLoc = new google.maps.LatLng(location.lat, location.lng);

  // Set the position of the marker using the place ID and location.
  var mapMarker = new google.maps.Marker({
      map: map,
      position: placeLoc,
      icon: foursquareIcon1
  });

  google.maps.event.addListener(mapMarker, 'click', function() {
    infowindow.setContent( contentString );
    infowindow.open(map, mapMarker);

    // Toggle bounce animation in the marker
    if (mapMarker.getAnimation() !== null) {
      mapMarker.setAnimation(google.maps.Animation.BOUNCE);
    } else {
      mapMarker.setAnimation(null);
    }
  });

  // Switch icon on marker mouseover and mouseout
  google.maps.event.addListener(mapMarker, "mouseover", function() {
    mapMarker.setIcon(foursquareIcon2);
  });

  google.maps.event.addListener(mapMarker, "mouseout", function() {
    mapMarker.setIcon(foursquareIcon1);
  });

  markers.push(new MapMarker(mapMarker, name, category, placeLoc, false));
};
