
// Load New York Times API
var nyTimes = function() {

	// Prepares the NYTimes API request URL
	var nyTimesArticleSearchBaseUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
	var nyTimesArticleSearchApiKey = "d17eb5d0f262223e641a19e1ed48125f:0:74621992";
	var nyTimesUrl = nyTimesArticleSearchBaseUrl + '?fq=glocations:("' + encodeURIComponent( self.neighborhood() ) + '")&api-key=' + nyTimesArticleSearchApiKey;

	// Set the header of the list
	self.placeHeader("NY Times articles about " + self.neighborhood());

	// Removing previous records in the list
	self.recommendedPlaces([]);

	// Hides the filter box
	self.isFilterVisible(false);

	// Hides the image
	self.hasImage(false);

	// Hides the venue address
	self.hasAddress(false);

	// API Request
	$.getJSON(nyTimesUrl, function(article) {

		if ( article.response.docs.length > 0 ) {
			article.response.docs.forEach(function(item) {
				self.recommendedPlaces.push(new PlaceItem({
					"web_url"	: item.web_url,
					"snippet"	: item.snippet,
					"name"		: item.headline.main
				}));
			});
		} else {
			self.recommendedPlaces.push(new PlaceItem({
					"web_url"	: "",
					"snippet"	: "No articles found",
					"name"		: ""
				}));
		}
	});
};

$(".nytimes").on('click', function() {

	// Update background color
	updateBackgroundColor($(this), "purple");

	// Load the NYTimes API
	nyTimes();

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