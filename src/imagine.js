/*! imagine 1.0.9 (https://github.com/pyrsmk/imagine) */

module.exports = function(elements) {

	// Prepare
	var pinkyswear = require('pinkyswear')(function(pinky) {
			pinky['catch'] = function(f) {
				return pinky.then(null, f);
			};
			return pinky;
		}),
		
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
		
		onLoad = function(image) {
			if(typeof image.imagine == 'undefined') {
				image.imagine = 'loaded';
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
		
		onError = function(image) {
			return function(e) {
				image.imagine = 'failed'; // overwrite anything set previously to avoid false positives
				if(!isLoading()) {
					pinkyswear(false, [getImages('failed')]);
				}
			};
		},
		
		watchComplete = function(image) {
			var interval = setInterval(function() {
				if(image.complete && image.width) {
					clearInterval(interval);
					onLoad(image);
				}
			}, 100);
		};
	
	// Normalize
	if(typeof elements != 'object' || !('length' in elements)) {
		elements = [elements];
	}
	var image,
		i,
		j;
	
	// Load images
	for(i=0, j=elements.length; i<j; ++i) {
		if(typeof elements[i] == 'string') {
			image = new Image();
			image.src = elements[i];
			elements[i] = image;
		}
		else {
			image = elements[i];
		}
		image.onerror = onError(image);
		watchComplete(image); // we need to watch for the 'complete' property because onload() is not always triggered
	}
	
	return pinkyswear;

};
