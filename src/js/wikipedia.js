
// Load Wikipedia API
var wikipedia = function() {

	// Prepare Wikipedia's API request URL
	var wikipediaApiBaseUrl = "https://en.wikipeia.org/w/api.php";
    var wikipediaUrl = wikipediaApiBaseUrl + "?action=opensearch&search=" + self.neighborhood() + "&format=json&callback=wikiCallback";

    var $wikipediaSnippet = $(".menu-places-item-snippet");
    var wikiTimeout = setTimeout(function() {
        self.placeList.push(new PlaceItem({
			"web_url"	: "",
			"snippet"	: "Failed to get resources from Wikipedia",
			"name"		: ""
		}));
    }, 8000);

    // Set the header of the list
	self.placeHeader("Found pages in Wikipedia for " + self.neighborhood());

	// Removing previous records in the list
	self.placeList([]);

    // Load Wikipedia
    $.ajax({
        url: wikipediaUrl,
        // jsonp: "callback",
        dataType: "jsonp",
        success: function(response) {
            var articleList = response[1];

            if ( articleList.length > 0 ) {
            	articleList.forEach(function(article) {
            		self.placeList.push(new PlaceItem({
            			"web_url"	: "http://en.wikipedia.org/wiki/" + article,
            			"snippet"	: "",
            			"name"		: ""
            		}));
	            });
            } else {
            	self.placeList.push(new PlaceItem({
        			"web_url"	: "",
        			"snippet"	: "No articles found on Wikipedia",
        			"name"		: ""
        		}));
            };

            clearTimeout(wikiTimeout);
        }
    });
}

$(".wikipedia").on('click', function() {

	// Update background color
	updateBackgroundColor($(this), "green");

	// Load Wikipedia API
	wikipedia();

});