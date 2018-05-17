/*
    Version 1.0
    
    Plug-in created by Sergi Codina Sinclair
    Contact: sergi.codina.sinclair@gmail.com
    
    Open source plug-in. Personal or commercial purposes are allowed.
*/
(function($) {
    $.fn.extend({
        WETotalScroll: function(opts) {
            var object          = $(this);                  //The object where to attach
            var position        = "top";                    //Position of the bar
            var domHeight       = 0;                        //Document height 
            var windowHeight    = $(window).outerHeight();  //Window Viewport height
            if(opts) {
                position = opts.position;
            }
            
            /* The dom is ready */
            $(document).ready(function() {
                domHeight = $(this).outerHeight() - windowHeight;
                object.addClass(position);
                var totalScrollContainer = '<div class="scrolled"></div>';
                object.append(totalScrollContainer);
            });
            
            /* The window gets resized or scrolls */
            $(window).on("resize scroll touchmove", function() {
                windowHeight = $(window).outerHeight();
                domHeight = $(document).outerHeight() - windowHeight;
                calculateHeight();
            });
            
            function calculateHeight() {
                var scroll = $(window).scrollTop();
                if( scroll >= domHeight ) {
                    changeScrollFill($(".scrolled"), 0);
                }
                else if( scroll <= 0 ) {
                    changeScrollFill($(".scrolled"), 100);
                }
                else {
                    var calc = (scroll*100)/(domHeight);
                    changeScrollFill($(".scrolled"), 100-calc);
                }
            }
            function changeScrollFill(obj, percent) {
                if(position == "top" || position == "bottom") {
                    $(obj).css({
                        "width": percent+"%"
                    });
                }
                else {
                    $(obj).css({
                        "height": percent+"%"
                    });
                }
            }
        }
    })
})(jQuery);