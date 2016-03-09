
// Scope to be used in all files
var self = this;

// Load main app
var MapMarker = function(marker, name, position) {
	this.marker = marker;
	this.name = name;
	this.position = position;
};

var PlaceItem = function(data) {
	this.web_url = ko.observable(data.web_url),
	this.snippet = ko.observable(data.snippet),
	this.name = ko.observable(data.name),
	this.optional = ko.observable(data.optional);
	this.image = ko.observable(data.image);
};

var PlaceViewModel = function(data) {
	self.neighborhood = ko.observable();
	self.locationLat = ko.observable();
	self.locationLng = ko.observable();
	self.placeHeader = ko.observable();
	self.placeList = ko.observableArray();

	self.clickMarker = function(venue) {
		markers.forEach(function(pin) {
			if (pin.name === venue.name()) {
				google.maps.event.trigger( pin.marker, 'click' );
				map.panTo( pin.position );
			};
		});
	};
}

ko.applyBindings(new PlaceViewModel());


// Setting dynamic max-height property
var setMaxHeight = function() {
	var winHeight = $(window).height();

	var $menuPlaceList = $(".menu-places-list");

	$menuPlaceList.css({
		'max-height': winHeight - 120 + "px"
	});
};

// Set the background color for the ICON and the LIST
var updateBackgroundColor = function(elem, color) {

	var fourSquareBackgroundColor = { "background-color" : color };

	// Set Icon Background Color, and remove others
	$(".menu-search-icon").css("background", "");
	elem.css(fourSquareBackgroundColor);

	// Menu Places
	$(".menu-places").css(fourSquareBackgroundColor);
}

// Page ready load function
$(function() {
	setMaxHeight();

	$(window).resize(function() {
		setMaxHeight();

		// after the center of the map has changed,
  		// pan back to the marker
		window.setTimeout(function() {
	      map.panTo(marker.getPosition());
	    });

	    window.addEventListener('resize', function() {
	    	map.fitBounds(mapBounds);
	    	$('#map').height( $(window).height() );
	    });
	});

	// Toggle the hamburger top MENU
	$("#hamburger-top-menu").click(function() {
		$("#menu").toggle("slide");
	});
});