!function(t){"use strict";function e(t){if(t){var e=this;t(function(t){e.resolve(t)},function(t){e.reject(t)})}}function n(t,e){if("function"==typeof t.y)try{var n=t.y.call(i,e);t.p.resolve(n)}catch(o){t.p.reject(o)}else t.p.resolve(e)}function o(t,e){if("function"==typeof t.n)try{var n=t.n.call(i,e);t.p.resolve(n)}catch(o){t.p.reject(o)}else t.p.reject(e)}var r,i,c="fulfilled",u="rejected",s="undefined",f=function(){function e(){for(;n.length-o;){try{n[o]()}catch(e){t.console&&t.console.error(e)}n[o++]=i,o==r&&(n.splice(0,r),o=0)}}var n=[],o=0,r=1024,c=function(){if(typeof MutationObserver!==s){var t=document.createElement("div"),n=new MutationObserver(e);return n.observe(t,{attributes:!0}),function(){t.setAttribute("a",0)}}return typeof setImmediate!==s?function(){setImmediate(e)}:function(){setTimeout(e,0)}}();return function(t){n.push(t),n.length-o==1&&c()}}();e.prototype={resolve:function(t){if(this.state===r){if(t===this)return this.reject(new TypeError("Attempt to resolve promise with self"));var e=this;if(t&&("function"==typeof t||"object"==typeof t))try{var o=!0,i=t.then;if("function"==typeof i)return void i.call(t,function(t){o&&(o=!1,e.resolve(t))},function(t){o&&(o=!1,e.reject(t))})}catch(u){return void(o&&this.reject(u))}this.state=c,this.v=t,e.c&&f(function(){for(var o=0,r=e.c.length;r>o;o++)n(e.c[o],t)})}},reject:function(n){if(this.state===r){this.state=u,this.v=n;var i=this.c;i?f(function(){for(var t=0,e=i.length;e>t;t++)o(i[t],n)}):!e.suppressUncaughtRejectionError&&t.console&&t.console.log("You upset Zousan. Please catch rejections: ",n,n?n.stack:null)}},then:function(t,i){var u=new e,s={y:t,n:i,p:u};if(this.state===r)this.c?this.c.push(s):this.c=[s];else{var l=this.state,a=this.v;f(function(){l===c?n(s,a):o(s,a)})}return u},"catch":function(t){return this.then(null,t)},"finally":function(t){return this.then(t,t)},timeout:function(t,n){n=n||"Timeout";var o=this;return new e(function(e,r){setTimeout(function(){r(Error(n))},t),o.then(function(t){e(t)},function(t){r(t)})})}},e.resolve=function(t){var n=new e;return n.resolve(t),n},e.reject=function(t){var n=new e;return n.reject(t),n},e.all=function(t){function n(n,c){n&&"function"==typeof n.then||(n=e.resolve(n)),n.then(function(e){o[c]=e,r++,r==t.length&&i.resolve(o)},function(t){i.reject(t)})}for(var o=[],r=0,i=new e,c=0;c<t.length;c++)n(t[c],c);return t.length||i.resolve(o),i},typeof module!=s&&module.exports&&(module.exports=e),t.define&&t.define.amd&&t.define([],function(){return e}),t.Zousan=e,e.soon=f}("undefined"!=typeof global?global:this);
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
    	return (root.imagine = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.imagine = factory();
  }
}(this, function() {
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

return Imagine;
}));
