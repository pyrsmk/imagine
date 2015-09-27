/*! imagine 0.5.0 (https://github.com/pyrsmk/imagine) */

;(function(context, name, definition) {
	if(typeof module != 'undefined' && module.exports) {
		module.exports = definition;
	}
	else if(typeof define == 'function' && define.amd) {
		define(definition);
	}
	else{
		context[name] = definition;
	}
}(this, 'imagine', function(elements) {

	// Normalize
	if(typeof elements == 'string' || typeof elements.length == 'undefined') {
		elements = [elements];
	}

	// Prepare
	var pinkyswear = require('pinkyswear')(),
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
				pinkyswear(false, [element]);
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
			}, 100);
		};

	// Load images
	for(var i=0, j=elements.length; i<j; ++i){
		image = new Image();
		image.onerror = onerror(elements[i]);
		if(typeof elements[i] == 'string') {
			image.src = elements[i];
		}
		else {
			image.src = elements[i].src;
		}
		watch(image, elements[i]);
	}
	
	return pinkyswear;

}));
