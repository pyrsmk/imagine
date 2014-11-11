imagine 0.3.0
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
imagine($('img')).then(function(){
    // 'this' refers to the successfully loaded images (images that have encounter an error are not listed)
    $(this).animate({
        opacity: 1,
        duration: 250
    });
}).catch(function(){
    // 'this' refers to the image that has encounter the error
    $(this).css('background','red');
});
```

But, with imagine you can also preload some images for future use. Note that there the `this` keyword does not return a DOM element but the URL itself.

```js
var images=[
    'images/example.jpg',
    'http://example.com/images/cat.png'
];
imagine(images).then(function(){
    var img=$('<img src="'+this+'">');
    $('body').append(img);
});
```

License
-------

Published under the [MIT license](http://dreamysource.mit-license.org).
