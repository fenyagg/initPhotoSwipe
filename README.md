# initPhotoSwipe

<p>Jquery вызов плагина <a href="http://photoswipe.com/">PhotoSwipe</a></p>

<p>Пример использования</p>
```js
$(function() {
    $("a.photoswipe").initPhotoSwipe( {
        "loop"  : true,
        "events": {
           'afterChange': function(){}
        },

        /********** дополнительные параметры    */

        //использовать ли миниатюры
        "thumbs": true,

        //массив с объектами, если не нужно автоматически собирать из ссылок
        "items" : [
            {
                src: "image.jpg",
                msrc: "image_200x150.jpg",
                w: 400,
                h: 300,
                title: "Заголовок"
            }
        ]
    });
});
```


