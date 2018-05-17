(function($) {
    $.fn.extend({
        WETooltip: function(opts) {
            /* INITIALIZE VARIABLES */
            var position    = "down";  //Position can be up, down, left or right, any other option is set to "down"
            var offsetX    = 0;           //Offset given by the user on the X axis
            var offsetY    = 10;           //Offset given by the user on the Y axis
            var text        = "";
            
            /* CHECK IF OPTIONS WHERE GIVEN */
            if(opts) {
                if(opts.position) {
                    if(opts.position == "up" || opts.position == "down" || opts.position == "left" || opts.position == "right") {
                        position = opts.position;
                    }
                }
                if(opts.offsetX && isFinite(opts.offsetX)) {
                    offsetX = opts.offsetX;
                }
                if(opts.offsetY && isFinite(opts.offsetY)) {
                    offsetY = opts.offsetY;
                }
                if(opts.text) {
                    text = opts.text;
                }
            }
            /* When we set the mouse on top of the tooltip object */
            var obj = $(this);
            var showTooltip = false;
            obj.mousemove(function(e) {
                /*
                    maxWidth        -> We get the window size, so the tooltip won't go out and get cutted
                    showTooltip     -> Controls if the tooltip is already poped out.
                    arrow           -> Direction of the arrow of the tooltip
                    offsetTopWindow -> Where the tooltip will be displayed
                    posX            -> Position of the cursor on the X
                */
                var posX = e.pageX;
                var maxWidth = $(window).width();
                var maxHeight = $(window).outerHeight();
                var offset = obj.offset();
                var offsetTopWindow = offset.top - $(window).scrollTop();
                var offsetBottomWindow = $(window).scrollTop() + maxHeight;
                var top;
                var left;
                var arrow;
                
                /* Check if the tooltip is already visible */
                if(!showTooltip) {
                    $("body").append("<div class='tooltip-bubble'><div class='tooltip-container'>"+text+"</div><div class='arrow'></div></div>");
                    showTooltip = true;
                }
                /* We put the tooltip on it's position, but if it's not entirely visible, we put it on the other side */
                var bubbleTooltip = $(".tooltip-bubble");
                /* First, we check the "up" position of the tooltip */
                if(position == "up" || position == "down") {
                    if(position == "up") {
                        if( (bubbleTooltip.outerHeight() + offsetY) >= offsetTopWindow ) {
                            top = offset.top + obj.outerHeight() + offsetY;
                            arrow = "up";
                        }
                        else {
                            top = offset.top - bubbleTooltip.outerHeight() - offsetY;
                            arrow = "down";
                        }
                    }
                    /* We check if the position is "down" */
                    else if( position == "down") {
                        if( (offset.top + obj.outerHeight() + offsetY + bubbleTooltip.outerHeight()) > offsetBottomWindow ) {
                            top = offset.top - bubbleTooltip.outerHeight() - offsetY;
                            arrow = "down";
                        }
                        else {
                            top = offset.top + obj.outerHeight() + offsetY;
                            arrow = "up";
                        }
                    }
                    /* Fix tooltip to the left */
                    if( bubbleTooltip.offset().left < 0 ) {
                        bubbleTooltip.css("transform", "none");
                        left = 0;
                    }
                    /* Not fixing the balloon, making it mobile */
                    else {
                        left = posX - (bubbleTooltip.outerWidth()/2);
                        if( left < 0 ) {
                            bubbleTooltip.css("transform", "none");
                            left = 0;
                            bubbleTooltip.find(".arrow").css("left", posX+"px");
                        }
                        //Fix balloon to the right
                        if( posX +(bubbleTooltip.outerWidth()/2) > maxWidth ) {
                            left = maxWidth - (bubbleTooltip.outerWidth());
                            bubbleTooltip.find(".arrow").css("left", (bubbleTooltip.outerWidth() - (maxWidth - posX))+"px");
                        }
                    }
                }
                /* We check if the position is "left" */
                else if(position == "left" || position == "right") {
                    /* Put the tooltip to the left */
                    var fits = false;
                    if(position == "left") {
                        arrow = "right";
                        left = offset.left - (bubbleTooltip.outerWidth() + offsetX);
                        /* Check if it fits */
                        if( left < 0 ) {
                            arrow = "left";
                            left = obj.outerWidth() + offset.left + offsetX;
                            /* We are going to check if it also fits on the right */
                            if( (left + bubbleTooltip.outerWidth()) > maxWidth ) {
                                fits = true;
                                left = 0;
                                arrow = "up";
                                top = offset.top + obj.outerHeight() + offsetY;
                            }
                        }
                    }
                    else if(position == "right") {
                        left = offset.left + obj.outerWidth() + offsetX;
                        arrow = "left";
                        /* Check if it fits */
                        if( (left + bubbleTooltip.outerWidth()) > maxWidth ) {
                            arrow = "right";
                            left = offset.left - (bubbleTooltip.outerWidth() + offsetX);
                            /* We are going to check if it also fits on the right */
                            if( left < 0 ) {
                                fits = true;
                                left = 0;
                                arrow = "up";
                                top = offset.top + obj.outerHeight() + offsetY;
                            }
                        }
                        /* We are going to check if it also fits on the left */
                        
                    }
                    if(!fits) {
                        top = offset.top - offsetY;
                    }
                    else {
                        bubbleTooltip.find(".arrow").css("left", posX+"px");
                    }
                }
                $(".arrow").addClass(arrow);
                bubbleTooltip.css({
                    "top": top+"px",
                    "left": left+"px"
                });
            }).mouseout(function() {
                showTooltip = false;
                $(".tooltip-bubble").remove();
            });
        }
    })
})(jQuery);