# initPhotoSwipe

<p>Jquery plugin call <a href="http://photoswipe.com/">PhotoSwipe</a></p>

<p>Example</p>

html. Attribute `data-size` is required
```
<a data-size="462x198" class="photoswipe" href="http://placehold.it/462x198" title="1"><img src="http://placehold.it/350x150"></a>
```
    
js
```
$(function() {
    $("a.photoswipe").initPhotoSwipe( {
        "loop"  : true,
        "events": {
           'afterChange': function(){}
        },

        /********** additional params    */

        // using thubnails
        "thumbs": true,

        // array with objects, if you do not need to automatically collect from links
        "items" : [
            {
                src: "image.jpg",
                msrc: "image_200x150.jpg",
                w: 400,
                h: 300,
                title: "Some title"
            }
        ]
    });
});
```


