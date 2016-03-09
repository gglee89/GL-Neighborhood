
// Load YELP API
var yelp = function() {

	// Prepare Yelp API request URL
	var auth = {
		yelpConsumerKey: "1-y7yJRO8NlqAwvFlxAOHw",
		yelpConsumerSecret: "ucFZ3JFqPoHd3FMKf8F8lu5G1Tw",
		yelpAccessToken: "2xpC26fDigGeMZdgAfOwEP3NFSq9WT4I",
		yelpAccessTokenSecret: "gvFAFw0Zq7YydpGjOcAoAjQbmAc",
		serviceProvider: {
			signatureMethod: "HMAC-SHA1"
		}
	};

	var yelpSearchTerm = "restaurants";
	var yelpSearchLocation = encodeURIComponent( self.neighborhood() );

	// Building up Yelp's acessor
	// This solution was proposed to run OAuth on the client-side
	// https://forum.jquery.com/topic/hiding-oauth-secrets-in-jquery
	var accessor = {
		consumerSecret: auth.yelpConsumerSecret,
		tokenSecret: auth.yelpAccessTokenSecret
	};

	var parameters = [];
	parameters.push(['term', yelpSearchTerm]);
	parameters.push(['location', yelpSearchTerm]);
	parameters.push(['callback', 'cb']);
	parameters.push(['oauth_consumer_key', auth.consumerKey]);
	parameters.push(['oauth_consumer_key', auth.consumerSecret]);
	parameters.push(['oauth_token', 'auth.accessToken']);
	parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

	var message = {
		'action': 'http://api.yelp.com/v2/search',
		'method': 'GET',
		'parameters': parameters
	};

	OAuth.setTimestampAndNonce(message);
	OAuth.signatureMethod(message, accessor);

	var parameterMap = OAuth.getParameterMap(message.parameters);
	parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);


    $.ajax({
    	'url': message.action,
    	'data': parameterMap,
    	'cache': true,
    	'dataType': 'jsonp',
    	'jsonpCallback': 'cb',
    	'success': function(data, textStatus, XMLHttpsRequest) {
    		console.log(data);
    	}
    });

};

$('.yelp').on('click', function() {

	// Update background color
	updateBackgroundColor($(this), "#853330");

	// Load Wikipedia API
	yelp();

});