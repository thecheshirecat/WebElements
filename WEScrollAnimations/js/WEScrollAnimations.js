(function($) {
    $.fn.extend({
        WEScrollAnimation: function(opts) {
            
            //Element
            var $this = $(this);
            
            //Options
            var animation = "bottomToTop";
            var offset = 0;
            var resetAnimation = false;
            var target = $this;
            
            //Check if options are setted
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
            function checkAnimations() {
                var windowPosition = $(window).scrollTop();
                var windowHeight = $(window).outerHeight();
                var finalWindow = windowPosition + windowHeight;
                
                var theWindow = finalWindow - offset;
                
                $this.each(function() {
                    var target = $(this);
                    // We check if it has a target
                    if(opts.target) {
                        target = $(opts.target);
                    }
                    var position = $(this).offset().top;
                    if( theWindow >= position ) {
                        target.addClass(animation);
                    }
                    else {
                        if(resetAnimation) {
                            target.removeClass(animation);
                        }
                    }
                });
            }
            $(document).ready(function() {
                checkAnimations();
            });
            $(window).on("load scroll", function() {
                checkAnimations();
            });
        }
    });
})(jQuery);