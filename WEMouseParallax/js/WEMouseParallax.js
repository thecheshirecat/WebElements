(function($) {
    $.fn.extend({
        WEMouseParallax: function(opts) {
            /*
                $this -> the container where the mouse will take action
            */
            var $this = $(this);
            var backgroundPercentage = 30;
            var objectPercentage = 25;
            if(opts) {
                backgroundPercentage = opts.backgroundPercentage;
                objectPercentage = opts.objectPercentage;
            }
            
            $this.mousemove(function(e) {
                var $obj = $(this);
                //Object position
                var objectX = $obj.offset().left;
                var objectY = $obj.offset().top;
                
                //Mouse position
                var mousePosY = e.pageY;
                var mousePosX = e.pageX;
                
                //Object sizes
                var width = $obj.outerWidth();
                var height = $obj.outerHeight();
                
                //Object center
                var centerY = objectY + height/2;
                var centerX = objectX + width/2;
                
                var x = mousePosX - centerX;
                var y = mousePosY - centerY;
                
                /*
                    Object position percentage calc
                */
                var moveXP = x/objectPercentage;
                var moveYP = y/objectPercentage;
                
                var totalX = -50-moveXP;
                var totalY = -50-moveYP;
                
                /*
                    Background position percentage calc
                */
                var moveXPB = x/backgroundPercentage;
                var moveYPB = y/backgroundPercentage;
                
                var totalBX = 50-moveXPB;
                var totalBY = 50-moveYPB;
                
                $obj.find(".WEMouseParallax").css("transform", "translate("+totalX+"%, "+totalY+"%)");
                $obj.css("background-position", totalBX+"% "+totalBY+"%");
            });
        }
    });
})(jQuery);