function Imagine(elements) {
	// Normalize
	if(typeof elements != 'object' || !('length' in elements)) {
		elements = [elements];
	}
    
    // Create promise
	return new Zousan(function(resolve, reject) {
        var
            // Return images for resolve()/reject()
            getImages = function(state) {
                var images = [];
                for(var i=0, j=elements.length; i<j; ++i) {
                    if(elements[i].imagine == state) {
                        images.push(elements[i]);
                    }
                }
                return images;
            },
            
            // Verify if all images have been loaded
            isLoading = function() {
                for(var i=0, j=elements.length; i<j; ++i) {
                    if(!('imagine' in elements[i])) {
                        return true;
                    }
                }
                return false;
            },
            
            // Triggered when an image is fully loaded
            onLoad = function(image) {
                if(typeof image.imagine == 'undefined') {
                    image.imagine = 'loaded';
                }
                if(!isLoading()) {
                    if(getImages('failed').length) {
                        reject(getImages('failed'));
                    }
                    else {
                        resolve(getImages('loaded'));
                    }
                }
            },
            
            // Triggered when a loading image has encountered an error
            onError = function(image) {
                return function(e) {
                    image.imagine = 'failed'; // overwrite anything set previously to avoid false positives
                    if(!isLoading()) {
                        reject(getImages('failed'));
                    }
                };
            },
            
            // We need to watch for the 'complete' property because onload() is not always triggered
            watchComplete = function(image) {
                var interval = setInterval(function() {
                    if(image.complete && image.width) {
                        clearInterval(interval);
                        onLoad(image);
                    }
                }, 100);
            };
        
        // Prepare
        var image, i, j;
        
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
            watchComplete(image);
        }
    });
}
