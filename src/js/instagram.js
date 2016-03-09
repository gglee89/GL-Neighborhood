
// Loads Instagram API
var instagram = function() {

	var instagramSearchApiBaseUrl = "https://api.instagram.com/v1/media/search?";
	var instagramAccessToken = "2518313127.1677ed0.06aefd45eec3445a8f38a5927209d71b";

	var instagramUrl = instagramSearchApiBaseUrl +
				"lat=" + self.locationLat() +
				"&lng=" + self.locationLng() +
				"&access_token=" + instagramAccessToken;

	// Set the header of the list
	self.placeHeader("Instagram pictures for " + self.neighborhood());

	// Removing previous records in the list
	self.placeList([]);

	$.ajax({
		url: instagramUrl,
		dataType: "jsonp",
		success: function(response) {

			if (response.data.length > 0) {
				response.data.forEach(function(item) {
					self.placeList.push(new PlaceItem({
						"web_url"	: item.link,
						"snippet"	: item.caption !== null ? item.caption.text : "<no content>",
						"name"		: item.caption !== null  ? item.caption.from.username : "<no username>",
						"image"		: item.images.low_resolution.url
					}));
				});
			} else {
				self.placeList.push(new PlaceItem({
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

});