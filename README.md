# initPhotoSwipe

<p>Jquery вызов плагина <a href="http://photoswipe.com/">PhotoSwipe</a></p>

<p>Пример использования</p>
```js
$(function() {
    $("a.photoswipe").initPhotoSwipe( {
        "loop"  : true,
        "events": {
           'afterChange': function(){}
        }
    });
});
```


