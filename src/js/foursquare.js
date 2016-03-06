
// Load FourSquare Places
var fourSquare = function() {

	// Prepare the FourSquare API request URL
	var fourSquareVenuesExploreBaseUrl = "https://api.foursquare.com/v2/venues/explore";
	var fourSquareClientId = "EJNKFX112VJQ12JJIMYOBXVCHX2C2N42ZM0A0UOZZFGVJHPW";
	var fourSquareSecretKey = "QQF2LN5P5W1NEKKQ20FESZ134TYDQPBNBAG15THQOTKTBVJU";
	var fourSquareUrl = fourSquareVenuesExploreBaseUrl +
			"?client_id=" + fourSquareClientId +
			"&client_secret=" + fourSquareSecretKey +
			"&near=" + encodeURIComponent( self.neighborhood() ) +
			"&v=20160306&m=foursquare"

	// Set the header of the list
	self.placeHeader("Foursquare recommended places in " + self.neighborhood());

	// Removing previous records in the list
	self.placeList([]);

	// API Request
	$.getJSON(fourSquareUrl, function(data) {

		var venueItems = data.response.groups[0].items;
		if ( venueItems.length > 0 ) {
			venueItems.forEach(function(item) {
				self.placeList.push(new PlaceItem({
					"web_url"	: item.tips[0].canonicalUrl,
					"snippet"	: '"' + item.tips[0].text + '"',
					"name"		: item.venue.name,
					"optional"	: 'Rating: ' + item.venue.rating
				}));

				var location = {
					"lat": item.venue.location.lat,
					"lng": item.venue.location.lng
				}

				var contentString = '<div id="content">' +
					'<p><b>' + item.venue.name + '</b><br>' +
						item.venue.categories[0].name + '</p>' +
					'<div id="bodyContent">' +
					'	<p><b>Review:</b> ' + item.tips[0].text + '</p>' +
					'	<p><b>Location:</b> ' + item.venue.location.formattedAddress + '</p>' +
					'	<p><b>URL: <b/><a href="' + item.tips[0].canonicalUrl + '">' + item.tips[0].canonicalUrl + '</a></p>' +
					'	<p><b>Rating:</b> ' + item.venue.rating + '</p>' +
					'</div>';

				createMarker(location, item.venue.name, contentString);

				// Set map zoom level using the suggested map bound from the four square API
				var fourSquareMapBound = data.response.suggestedBounds;
				if (map != undefined) {
					mapBounds = new google.maps.LatLngBounds(
						new google.maps.LatLng(fourSquareMapBound.sw.lat, fourSquareMapBound.sw.lng),
						new google.maps.LatLng(fourSquareMapBound.ne.lat, fourSquareMapBound.ne.lng));
					map.fitBounds(mapBounds);
				};
			});
		} else {
			self.placeList.push(new PlaceItem({
				"web_url"	: "",
				"snippet"	: "No place found",
				"name"		: ""
			}));
		}

	}).error(function(e) {
		self.placeList.push(new PlaceItem({
			"web_url"	: "",
			"snippet"	: "Error in the Foursquare API",
			"name"		: ""
		}));
	});
};

$(".foursquare").on('click', function() {

	// Update background color
	updateBackgroundColor($(this), "#2d5be3");

	// Load Four Square API
	fourSquare();

});