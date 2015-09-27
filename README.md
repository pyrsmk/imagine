imagine 1.0.0
=============

Imagine is a tiny image (pre)loading library with promises.

Install
-------

You can pick the minified library or install it with :

```
jam install pyrsmk-imagine
bower install pyrsmk-imagine
npm install pyrsmk-imagine --save-dev
```

Use
---

Imagine lets you load one or several images and executes some tasks when they had fully loaded, or catch errors when something went wrong. Here's an example with already existing images :

```js
imagine($('img')).then(function(images) {
					// 'this' refers to the successfully loaded images (images that have encounter an error are not listed)
					$(this).animate({
						opacity: 1,
						duration: 250
					});
				})
				.catch(function(image, e) {
					// 'this' refers to the image that has encounter the error
					$(this).css('background','red');
				});
```

You can also preload some images for future use by specifying their URLs.

```js
var images = [
		'images/example.jpg',
		'http://example.com/images/cat.png'
	],
	preloaded;

// Preload images
imagine(images).then(function(images) {
    preloaded = images;
});


/*
	...
*/

// Finally at them to the body
$(preloaded).forEach(function() {
	$('body').append(this);
});
```

License
-------

Published under the [MIT license](http://dreamysource.mit-license.org).
