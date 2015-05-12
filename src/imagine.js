/*! imagine 0.4.0 (https://github.com/pyrsmk/imagine) */

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
	var image,
		loading = elements.length,
		thens = [],
		catchs = [],
		successful = [],
		onload = function(element) {
			return function() {
				successful.push(element);
				if(!--loading) {
					for(var i=0, j=thens.length; i<j; ++i) {
						thens[i].call(successful);
					}
				}
			};
		},
		onerror = function(element) {
			return function(e) {
				var i, j;
				if(catchs.length) {
					for(i=0, j=catchs.length; i<j; ++i) {
						catchs[i].call(element);
					}
				}
				if(!--loading) {
					for(i=0, j=thens.length; i<j; ++i) {
						thens[i].call(successful);
					}
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

	// Return promises
	var obj={
		then: function(callback){
			if(loading){
				thens.push(callback);
			}
			else{
				callback.call(elements);
			}
			return obj;
		},
		'catch': function(callback){
			catchs.push(callback);
			return obj;
		}
	};
	return obj;

}));
