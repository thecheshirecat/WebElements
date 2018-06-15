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
            var objectsParallaxPosition = [];
            
            $this.each(function(index) {
                var $obj = $(this);
                var objY = $obj.find(".WEMouseParallax").position().top;
                var objX = $obj.find(".WEMouseParallax").position().left;
                
                var objXCenter = $obj.find(".WEMouseParallax").outerWidth()/2 + objX;
                var objYCenter = $obj.find(".WEMouseParallax").outerHeight()/2 + objY;
                
                var objPosition = [objXCenter, objYCenter];
                objectsParallaxPosition.push(objPosition);
                
                $obj.mousemove(function(e) {
                    
                    //Mouse position of the mouse minus offset of the container
                    var mousePosX = e.pageX - $obj.offset().left;
                    var mousePosY = e.pageY - $obj.offset().top;
                    
                    //Mouse position relative to the center of the object
                    var x = mousePosX - objectsParallaxPosition[index][0];
                    var y = mousePosY - objectsParallaxPosition[index][1];

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
            });
        }
    });
})(jQuery);