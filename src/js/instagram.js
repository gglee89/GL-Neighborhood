
// Loads Instagram API
var instagram = function() {

	var instagramSearchApiBaseUrl = "https://api.instagram.com/v1/media/search?";
	var instagramAccessToken = "2518313127.1677ed0.06aefd45eec3445a8f38a5927209d71b";

	var instagramUrl = instagramSearchApiBaseUrl +
				"lat=" + self.locationLat() +
				"&lng=" + self.locationLng() +
				"&access_token=" + instagramAccessToken;

	// Set the header of the list
	self.placeHeader("Instagram new uploaded pictures for " + self.neighborhood());

	// Removing previous records in the list
	self.recommendedPlaces([]);

	// Hides the filter box
	self.isFilterVisible(false);

	// Hides the image
	self.hasImage(true);

	// Hides the venue address
	self.hasAddress(false);

	$.ajax({
		url: instagramUrl,
		dataType: "jsonp",
		success: function(response) {

			if (response.data.length > 0) {
				response.data.forEach(function(item) {
					self.recommendedPlaces.push(new PlaceItem({
						"web_url"	: item.link,
						"snippet"	: item.caption !== null ? item.caption.text : "<no content>",
						"name"		: item.caption !== null  ? item.caption.from.username : "<no username>",
						"image"		: item.images.low_resolution.url
					}));
				});
			} else {
				self.recommendedPlaces.push(new PlaceItem({
					"web_url"	: "",
					"snippet"	: "No related posts found",
					"name"		: "",
					"image"		: ""
				}));
			};
		}
	});

};

$('.instagram').on('click', function() {

	// Update background color
	updateBackgroundColor($(this), "#9b6954");

	// Load Instagram API
	instagram();

	var winHeight = $(window).height();

	if (winHeight < 875) {
		// Resize search bar height
		$('#search-bar').animate({
			height: "100px"
		}, "linear", function() {
			// Re-set place menu list max-height
			setMaxHeight();
		});

		$('#container').animate({
			paddingTop: "101px"
		}, "linear");
	}
});