imagine 1.1.0
=============

__This library is now obsolete and I encourage you to choose another solution like [imagesLoaded](https://github.com/desandro/imagesloaded)__

Imagine is a tiny image (pre)loading library with promises. It fixes weird behaviors on some browsers and add a simple/stable way to know if one or several images are loaded or not.

Install
-------

You can pick the minified library or install it with :

```
npm install pyrsmk-imagine
bower install pyrsmk-imagine
```

Use
---

Imagine lets you load one or several images and executes some tasks when they had fully loaded, or catch errors when something went wrong. Here's an example with already existing images :

```js
imagine($('img')).then(function(images) {
					// the 'images' variable refers to the loaded images
					$(images).animate({
						opacity: 1,
						duration: 250
					});
				})
				.catch(function(images) {
					// 'images' refers to the failed images
					$(images).css('background','red');
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

// Finally add them to the body
$(preloaded).forEach(function() {
	$('body').append(this);
});
```

License
-------

Published under the [MIT license](http://dreamysource.mit-license.org).
