/*
// History
// Functionality developed with cookies
var history = function() {

    var cookies = getCookie("neighborhood_search");

    cookies.forEach(function(cookie) {
        self.recommendedPlaces.push(new PlaceItem({
            "snippet"   : cookie.neighborhood,
            "optional"  : cookie.time
        }));
    });

};

var setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
};

$(".history").on('click', function() {

	// Update background color
	updateBackgroundColor($(this), "green");

	// Load History
	history();

});*/