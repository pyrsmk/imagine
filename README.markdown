imagine 0.1.0
=============

Imagine is a tiny library which execute callbacks when the specified images have fully been loaded.

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
