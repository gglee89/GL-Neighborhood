
// Load Twitter API
var twitter = function() {

	// Prepares the Twitter API Request URL
	var twitterSearchBaseBaseUrl = "http://search.twitter.com/search.json?";
	var searchTerm = { q: self.neighborhood() };
	var twitterSearchUrl = twitterSearchBaseBaseUrl + $.param(searchTerm);

	// Set the header of the list
	self.placeHeader("Current tweet(s) about " + self.neighborhood());

	// Removing previous records in the list
	self.placeList([]);

	// API Request
	$.ajax({
		type: "POST",
		url: './twitter_search.py',
		success: function(data) {
			console.dir(data);
		},
		error: function(e) {
			console.dir(e);
		}
	});
};

$('.twitter').on('click', function() {

	// Update background color
	updateBackgroundColor($(this), "#3b94d9");

	// Load the NYTimes API
	twitter();

});