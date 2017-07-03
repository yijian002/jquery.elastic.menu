/*
    jquery.elastic.menu.js
    @author Vic 
    https://github.com/yijian002/jquery.elastic.menu
*/

;
(function($) {

    'use strict';

    $.fn.elasticMenu = function(options) {
        var p = {
            item: 'li',
            class_current: 'current',
            elastic: '.elastic',
            is_inner_width: true, // innerWidth() || width()
            offset: 0, // Offset left (px)
            time: 300, // Animate time (ms)
            event: 'click',
            event_func: function($item) {}
        };

        var $container = null,
            $elastic = null;

        if (options && typeof options === 'object') {
            $.extend(p, options);
        }

        function getWidth($cont) {
            return p.is_inner_width ? $cont.innerWidth() : $cont.width();
        }

        function getOffsetLeft() {
            var $currented = $container.find('.' + p.class_current),
                isCurrented = $currented.length;
            
            return isCurrented ? $currented.position().left + p.offset : 0;
        }

        function lineAnimate() {
            var $currented = $container.find('.' + p.class_current),
                isCurrented = $currented.length,
                itemW = isCurrented ? getWidth($currented) : 0;

            if (isCurrented) { // Init the line status
                $elastic
                    .show()
                    .animate({
                        left: getOffsetLeft(),
                        width: itemW
                    }, p.time);
            }

            $container.find(p.item).hover(function() {
                    var $this = $(this),
                        index = $this.index(),
                        leftW = $this.position().left + p.offset,
                        currentW = getWidth($this);

                    $elastic
                        .show()
                        .stop()
                        .animate({
                            left: leftW,
                            width: currentW
                        }, p.time);

                },
                function() {
                    if (isCurrented) {
                        $elastic
                            .stop()
                            .animate({
                                left: getOffsetLeft(),
                                width: itemW
                            }, p.time);
                    } else {
                        $elastic.hide();
                    }
                });
        }

        function bindEvent() {
            $container.find(p.item).on(p.event, function() {
                $(this).addClass(p.class_current).siblings().removeClass(p.class_current);

                p.event_func($(this));
            });
        }

        function init() {
            $container = $(this);
            if (!$container.length) {
                console.error('Not found the container.');
                return;
            }

            $elastic = $container.find(p.elastic);
            if (!$elastic.length) {
                console.error('Not found the nav current.');
                return;
            }

            lineAnimate();
            bindEvent();
        }

        this.each(function() {
            init.call(this, options);
        });

        return this;
    };

}($ || jQuery));
