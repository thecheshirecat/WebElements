(function($) {
    $.fn.extend({
        scrollAnimation: function(opts) {
            //Element
            var $this = $(this);
            //Options
            var animation = "bottomToTop";
            var offset = 0;
            var resetAnimation = false;
            if(opts) {
                if(opts.animation) {
                    animation = opts.animation;
                }
                if(opts.offset) {
                    offset = opts.offset;
                }
                if(opts.resetAnimation) {
                    resetAnimation = true;
                }
            }
            //Scrolling function
            $(window).scroll(function() {
                var windowPosition = $(this).scrollTop();
                var windowHeight = $(this).outerHeight();
                var finalWindow = windowPosition + windowHeight;
                
                $this.each(function() {
                    if( (finalWindow - offset) >= $(this).offset().top) {
                        $(this).addClass(opts.animation);
                    }
                    if(resetAnimation) {
                        if(finalWindow < $(this).offset().top) {
                            $(this).removeClass(opts.animation);
                        }
                    }
                })
            });
        }
    });
})(jQuery);