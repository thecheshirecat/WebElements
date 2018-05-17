(function($) {
    $.fn.extend({
        scrollAnimation: function(opts) {
            
            //Element
            var $this = $(this);
            
            //Options
            var animation = "bottomToTop";
            var offset = 0;
            var resetAnimation = false;
            
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
                
                var theWindow = finalWindow - offset
                
                $this.each(function() {
                    var position = $(this).offset().top;
                    if( theWindow >= position ) {
                        console.log(theWindow+" // "+position)
                        $(this).addClass(animation);
                    }
                    else {
                        console.log($this.attr("id"));
                        if(resetAnimation) {
                            $(this).removeClass(animation);
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