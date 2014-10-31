imagine 0.1.0
=============

Imagine is a tiny library which execute callbacks when the specified images have fully been loaded.

Install
-------

You can pick the minified library or install it with :

```
bower install pyrsmk-imagine
npm install pyrsmk-imagine --save-dev
```

Use
---

For the above examples, we're using jQuery.

```js
imagine($('img'),function(){
	// Runned when all images have been loaded
});

$('img').each(function(){
	imagine(this,function(){
		// Runned after the current image has been loaded
	});
});

imagine($('.menu_images'),function(){
	// Runned when menu images have been loaded
});
```

License
-------

Published under the [MIT license](http://dreamysource.mit-license.org).
