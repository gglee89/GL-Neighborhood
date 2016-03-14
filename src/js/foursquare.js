
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
			"&v=20160306&m=foursquare";

	// Set the header of the list
	self.placeHeader("Foursquare recommended places in " + self.neighborhood());

	// Removing previous records in the list
	self.recommendedPlaces([]);

	// API Request
	$.getJSON(fourSquareUrl, function(data) {

		// Display the filter box
		self.isFilterVisible(true);

		// Hides the image
		self.hasImage(false);

		// Shows the venue address
		self.hasAddress(true);

		var venueItems = data.response.groups[0].items;

		if ( venueItems.length > 0 ) {
			venueItems.forEach(function(item) {

				var venueName = item.venue.name;
				var canonicalUrl = item.tips[0].canonicalUrl;
				var textSnippet = item.tips[0].text;
				var category = item.venue.categories[0].name;
				var rating = item.venue.rating;
				var formattedAddress = item.venue.location.formattedAddress;

				self.recommendedPlaces.push(new PlaceItem({
					"web_url"	: canonicalUrl,
					"snippet"	: '"' + textSnippet + '"',
					"category"	: category,
					"address"	: formattedAddress,
					"name"		: venueName,
					"optional"	: 'Rating: ' + rating
				}));

				var location = {
					"lat": item.venue.location.lat,
					"lng": item.venue.location.lng
				};

				var contentString = '<div id="content">' +
					'<p><b>' + venueName + '</b><br>' +
						category + '</p>' +
					'<div id="bodyContent">' +
					'	<p><b>Review:</b> ' + textSnippet + '</p>' +
					'	<p><b>Location:</b> ' + formattedAddress + '</p>' +
					'	<p><b>URL: <b/><a href="' + canonicalUrl + '">' + canonicalUrl + '</a></p>' +
					'	<p><b>Rating:</b> ' + rating + '</p>' +
					'</div>';

				createMarker(location, venueName, category, contentString);

				// Set map zoom level using the suggested map bound from the four square API
				var fourSquareMapBound = data.response.suggestedBounds;
				if (map !== undefined) {
					mapBounds = new google.maps.LatLngBounds(
						new google.maps.LatLng(fourSquareMapBound.sw.lat, fourSquareMapBound.sw.lng),
						new google.maps.LatLng(fourSquareMapBound.ne.lat, fourSquareMapBound.ne.lng));
					map.fitBounds(mapBounds);
				}
			});
		} else {
			self.recommendedPlaces.push(new PlaceItem({
				"web_url"	: "",
				"snippet"	: "No place found",
				"name"		: ""
			}));
		}

	}).error(function(e) {
		self.recommendedPlaces.push(new PlaceItem({
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

	var winHeight = $(window).height();

	if (winHeight < 875) {
		// Resize search bar height
		$('#search-bar').animate({
			height: "160px"
		}, "linear", function() {
			// Re-set place menu list max-height
			setMaxHeight();
		});

		$('#container').animate({
			paddingTop: "161px"
		}, "linear");
	}
});