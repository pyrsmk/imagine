/*! imagine 1.0.0 (https://github.com/pyrsmk/imagine) */

module.exports = function(elements) {

	var i, j, url;
	
	// Normalize
	if(typeof elements.length == 'undefined') {
		elements = [elements];
	}
	for(i=0, j=elements.length; i<j; ++i) {
		if(typeof elements[i] == 'string') {
			url = elements[i];
			elements[i] = document.createElement('img');
			elements[i].src = url;
		}
	}

	// Prepare
	var pinkyswear = require('pinkyswear')(function(pinky) {
			pinky['catch'] = function(f) {
				return pinky.then(null, f);
			};
			return pinky;
		}),
		image,
		loading = elements.length,
		successful = [],
		onload = function(element) {
			return function() {
				successful.push(element);
				if(!--loading) {
					pinkyswear(true, [successful]);
				}
			};
		},
		onerror = function(element) {
			return function(e) {
				pinkyswear(false, [element, e]);
				if(!--loading) {
					pinkyswear(true, [successful]);
				}
			};
		},
		watch = function(image, element) {
			var interval = setInterval(function() {
				if(image.complete === true) {
					clearInterval(interval);
					onload(element)();
				}
			}, 10);
		};

	// Load images
	for(i=0, j=elements.length; i<j; ++i) {
		image = new Image();
		image.onerror = onerror(elements[i]);
		image.src = elements[i].src;
		watch(image, elements[i]);
	}
	
	return pinkyswear;

};
