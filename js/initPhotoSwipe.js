/**
*	http://photoswipe.com/
*
*	!! передаем ссылки с обязательным параметром data-size="WIDTHxHEIGHT"
*
*	Пример использования:
*	$("a.photoswipe").initPhotoSwipe( {
*		"loop"	: true,
*		"events": {
*			'afterChange': function(){
*
*			}
*		}
*	});
*/


;(function( $ ){

	var countPhotoSwipe = 0;
	function objClone(obj){
	    if(obj == null || typeof(obj) != 'object') return obj;
	    var temp = new obj.constructor();
	    for(var key in obj)
	        temp[key] = objClone(obj[key]);
	    return temp;
	}

	$.fn.initPhotoSwipe = function( options ) {
		var $elements 	= $(this),
			items 	= [];
		if(!$elements.length) return;

		//перед </body> должен располагаться html код окна .pswp
		if(!$('.pswp').length) {
			;(function(){
				var pswp = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">'+
								'<div class="pswp__bg"></div>'+
								'<div class="pswp__scroll-wrap">'+
									'<div class="pswp__container">'+
										'<div class="pswp__item"></div>'+
										'<div class="pswp__item"></div>'+
										'<div class="pswp__item"></div>'+
									'</div>'+
									'<div class="pswp__ui pswp__ui--hidden">'+
										'<div class="pswp__top-bar">'+
											'<div class="pswp__counter"></div>'+
											'<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>'+
											'<button class="pswp__button pswp__button--share" title="Share"></button>'+
											'<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>'+
											'<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>'+
											'<div class="pswp__preloader">'+
												'<div class="pswp__preloader__icn">'+
													'<div class="pswp__preloader__cut">'+
														'<div class="pswp__preloader__donut"></div>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</div>'+
										'<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">'+
											'<div class="pswp__share-tooltip"></div>'+
										'</div>'+
										'<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>'+
										'<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>'+
										'<div class="pswp__caption">'+
											'<div class="pswp__caption__center"></div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>';
				$("body").append(pswp);
			})();
		}
		var pswpElement = $('.pswp').get(0);

		// !! Свои параметры по умолчанию
		var	settings = $.extend( {
			'loop': false,
			'shareEl': false,
		}, options);

		countPhotoSwipe++;

		var openPhotoSwipe = function ( index, disableAnimation, uid ){
			var localSettings = objClone(settings);
			var uid = uid || 1;
			localSettings.galleryUID = uid;

			if(!!disableAnimation) {localSettings.showAnimationDuration = 0;}
			localSettings.index = index;
			localSettings.getThumbBoundsFn = function( index ) {
				// See Options -> getThumbBoundsFn section of documentation for more info
               var thumbnail = $elements.eq(index).find("img").get(0), // find thumbnail
                   pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                   rect = thumbnail.getBoundingClientRect();

                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            }


			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, localSettings);
			if(!!localSettings.events) {
				if ($.isPlainObject(localSettings.events)) {
					for (var eventName in localSettings.events) {
						gallery.listen(eventName, localSettings.events[eventName]);
					}
				} else {
					console.error("Ошибка в settings.events");
				}
			}
			gallery.init();
		};

		$elements.each(function(index, el) {
			var $link 	= $(this),
				dataSizes = $link.data("size"),
				localCount = countPhotoSwipe;

			if(!dataSizes) {console.error("initPhotoSwipe: Нет атрибута 'data-size' у ссылки"); return;}
			if(!$link.attr("href").length) {console.error("initPhotoSwipe: Нет атрибута 'href' у ссылки:"); return;}

			var arSizes = dataSizes.split("x");
			var item = {
				src: $link.attr("href"),
				w: arSizes[0],
				h: arSizes[1],
				title: $link.attr("title")
			}

			if($link.find("img").length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = $link.find("img").attr("src");
            }

			//для каждой ссылки добавим свой data-pswp-uid
			$link.data("pswp-uid", index);

			items.push(item);

			$link.on('click', function(event) {
				event.preventDefault();
				openPhotoSwipe(index, false, localCount);
			});
		});


		// parse picture index and gallery index from URL (#&pid=1&gid=2)
	    var photoswipeParseHash = function() {
	        var hash = window.location.hash.substring(1),
	        params = {};

	        if(hash.length < 5) {
	            return params;
	        }

	        var vars = hash.split('&');
	        for (var i = 0; i < vars.length; i++) {
	            if(!vars[i]) {
	                continue;
	            }
	            var pair = vars[i].split('=');
	            if(pair.length < 2) {
	                continue;
	            }
	            params[pair[0]] = pair[1];
	        }

	        if(params.gid) {
	            params.gid = parseInt(params.gid, 10);
	        }

	        return params;
	    };
	    // Parse URL and open gallery if it contains #&pid=3&gid=1
	    var hashData = photoswipeParseHash();
	    if(hashData.pid && hashData.gid) {
	    	if( countPhotoSwipe == hashData.gid ){
	    		openPhotoSwipe(+hashData.pid-1, true, countPhotoSwipe);
	    	}
	    }

	};

})( $ );