/*! imagine 1.0.4 (https://github.com/pyrsmk/imagine) */

module.exports = function(elements) {

	// Prepare
	var pinkyswear = require('pinkyswear')(function(pinky) {
			pinky['catch'] = function(f) {
				return pinky.then(null, f);
			};
			return pinky;
		}),
		image,
		getImages = function(state) {
			var images = [];
			for(var i=0, j=elements.length; i<j; ++i) {
				if(elements[i].imagine == state) {
					images.push(elements[i]);
				}
			}
			return images;
		},
		isLoading = function() {
			for(var i=0, j=elements.length; i<j; ++i) {
				if(!('imagine' in elements[i])) {
					return true;
				}
			}
			return false;
		},
		onLoad = function(element) {
			if(typeof element.imagine == 'undefined') {
				element.imagine = 'loaded';
			}
			if(!isLoading()) {
				if(getImages('failed').length) {
					pinkyswear(false, [getImages('failed')]);
				}
				else {
					pinkyswear(true, [getImages('loaded')]);
				}
			}
		},
		onError = function(element) {
			return function(e) {
				element.imagine = 'failed'; // overwrite anything set previously to avoid false positives
				if(!isLoading()) {
					pinkyswear(false, [getImages('failed')]);
				}
			};
		},
		watchComplete = function(image, element) {
			var interval = setInterval(function() {
				if(image.complete && image.width) {
					clearInterval(interval);
					onLoad(element);
				}
			}, 100);
		};
	
	// Normalize
	if(typeof elements != 'object' || !('length' in elements)) {
		elements = [elements];
	}
	var i, j, url;
	for(i=0, j=elements.length; i<j; ++i) {
		if(typeof elements[i] == 'string') {
			url = elements[i];
			elements[i] = document.createElement('img');
			elements[i].src = url;
		}
	}
	
	// Load images
	for(i=0, j=elements.length; i<j; ++i) {
		image = new Image();
		image.onerror = onError(elements[i]);
		image.src = elements[i].src;
		watchComplete(image, elements[i]); // we need to watch for 'complete' property because onload is not always triggered
	}
	
	return pinkyswear;

};
