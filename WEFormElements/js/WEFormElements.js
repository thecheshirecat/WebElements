(function($) {
    $.fn.extend({
        WEformElements: function(opts) {
            var $this = $(this);
            var options = opts;
            
            /* We build the checkboxes if there are */
            $this.find(".we-checkbox").each(function() {
                getCustomData($(this), "checkbox");
            });
            
            /* We build the radiobuttons if there are */
            $this.find(".we-radio").each(function() {
                getCustomData($(this), "radio");
            });
            
            /* We build the dropdowns if there are */
            $this.find(".WEdropdown").each(function() {
                var dropdown = $(this);
                var initialValue = dropdown.find(".selected").attr("data-value");
                var initialText = dropdown.find(".selected").html();

                //We include to the parent dropdown the clases we gave additionally
                if(dropdown.attr("class-container")) {
                    var classes = dropdown.attr("class-container");
                }
                else {
                    var classes = "";
                }
                //Dropdown name
                var inputName = dropdown.attr("data-name");
                //Now we check if the dropdown is disabled
                var disabled = "";
                if( dropdown.attr("data-disabled") ) {
                    disabled = "disabled";
                }
                else {
                    disabled = "";
                }
                dropdown.wrap("<div class='dropdown-options'></div>");
                var parent = dropdown.parent();
                parent.wrap("<div class='dropdown "+classes+" "+disabled+"' data-state='hidden'></div>");
                parent.before('<input type="hidden" name="'+inputName+'" id="'+inputName+'" value="'+initialValue+'"><span class="dropdown-selected">'+initialText+'</span>');
            });
            
            function getCustomData(input, type) {
                var classes = input.attr("class").split(" ");
                var labelDisabled = "";
                if( input.prop("disabled") ) {
                    classes.push("disabled");
                    labelDisabled = "disabled";
                }
                var label = input.attr("data-label");
                var name = input.attr("name");
                var checked = "";
                if( input.prop("checked") ) {
                    checked = "checked";
                }
                var containerClasses = "";
                if( input.attr("class-container") ) {
                    containerClasses = input.attr("class-container");
                }
                var dataId = "";
                if( input.attr("data-id") ) {
                    dataId = input.attr("data-id");
                }
                var value = "";
                //Data value is ment for radio buttons value, so the hidden input of it can be found when clicked along with it's name.
                var dataValue = "";
                if( type == "chexkbox" ) {
                    
                }
                else if( type == "radio" ) {
                    value = input.val();
                    dataValue = 'data-value="'+value+'"';
                }
                var inputForm = '<div class="we-container '+containerClasses+'" id="'+dataId+'">'+
                    '<div class="'+type+' '+classes.join(" ")+' '+checked+'" data-name="'+name+'" '+dataValue+'></div>'+
                    '<span class="'+type+'-label '+labelDisabled+'">'+label+'</span>'+
                '</div>';
                input.addClass("hiddenInput");
                input.after(inputForm);
            }
            
            return {
                reinit: function(type) {
                    $("input[type="+type+"]").each(function() {
                        $(this).next(".we-container").each(function() {
                            $(this).prev().removeClass("hiddenInput");
                            $(this).remove();
                        });
                    });
                    $(".we-"+type).each(function() {
                        getCustomData($(this), type);
                    });
                }
            }
        }
    });
})(jQuery);
function getInput(obj, type) {
    var val;
    if( obj.is("span") ) {
        val = obj.siblings("."+type);
    }
    else {
        val = obj;
    }
    return val;
}
$(document).ready(function() {
    //Click function of custom checkbox
    $("html").on("click", ".checkbox-label, .checkbox", function(e) {
        if( !$(this).hasClass("disabled") ) {
            var WEInput = getInput($(this), "checkbox");
            var name = WEInput.attr("data-name");
            var input = $(this).parent(".we-container").siblings("input[name='"+name+"']");

            /* Toggle class checked on the clicked checkbox */
            WEInput.toggleClass("checked");

            /* Now we check if the custom checkbox has the class "checked" */
            var checked = false;
            if( WEInput.hasClass("checked") ) {
                checked = true;
            }
            /* Also we trigger a Change event so user can do a custom function on on.("change") */
            input.prop("checked", checked).trigger("change");
        }
    });
    $("html").on("click", ".checkbox-label a", function(e) {
        e.stopPropagation();
    });

    //Click function of custom radio
    $("html").on("click", ".radio-label, .radio", function(e) {
        if( !$(this).hasClass("disabled") ) {
            var WEInput = getInput($(this), "radio");
            var name = WEInput.attr("data-name");
            var value = WEInput.attr("data-value");

            /* Every radio with the same name, we uncheck it */
            $("input[name='"+name+"']").each(function() {
                $(this).prop("checked", false);
            });
            /* And we remove the class "checked" from the custom radio */
            $(".radio[data-name='"+name+"']").each(function() {
                $(this).removeClass("checked");
            });
            /* Now we add the class "checked" to the custom radio and we check the input radio */
            /* Also we trigger a Change event so user can do a custom function on on.("change") */
            $("input[value='"+value+"'][name='"+name+"']").prop("checked", true);
            WEInput.addClass("checked").trigger("change");
        }
    });
    $("html").on("click", ".radio-label a", function(e) {
        e.stopPropagation();
    });

    /* DROPDOWN */
    $("body").on("click", ".dropdown", function(e) {
        e.stopPropagation();
        var that = this;
        var dropdown = $(this);

        /* We collapse each other dropdown that it's open and it's not the clicked one */
        $(".dropdown").each(function() {
            if (that != this) {
                e.stopPropagation();
                $(this).removeClass("open").attr("data-state", "hidden").find(".dropdown-options").slideUp();
            }
        });
        if( !dropdown.hasClass("disabled") ) {
            if( dropdown.attr("data-state") == "hidden" ) {
                dropdown.addClass("open");
                dropdown.attr("data-state", "visible");
                dropdown.find(".dropdown-options").slideDown(200);
            }
            else {
                dropdown.removeClass("open");
                dropdown.attr("data-state", "hidden");
                dropdown.find(".dropdown-options").slideUp(200);
            }
        }
    });
    $("body").on("click", ".dropdown-options li", function() {
        var option = $(this).attr("data-value");
        var parent = $(this).parent().find("li").removeClass("selected");
        $(this).addClass("selected")
        /* Also we trigger a Change event so user can do a custom function on on.("change") */
        $(this).parents(".dropdown-options").siblings("input").val(option).trigger("change");
        $(this).parents(".dropdown-options").siblings("span").html($(this).html());
    });
    $("html").on("click", function() {
        $(".dropdown-options").slideUp(200).parent().attr("data-state", "hidden").removeClass("open");
    });
    
});
/* Keypress when Dropdown is open */
$(document).keyup(function(e) {
    if( $(".dropdown").hasClass("open") ) {
        var dropdown = $(".dropdown.open");
        /* Get the letter of the key pressed */
        var key = e.keyCode || e.which;
        var keyPressed = String.fromCharCode(key);
        /* Get all the dropdown thats it's open options */
        var options = $(".dropdown.open").find(".dropdown-options");
        if( key != 13) {
            options.find(".selected").removeClass("selected");
            options.find("li").each(function() {
                var text = $(this).text();
                var firstLetter = text.slice(0, 1);
                firstLetter = firstLetter.toUpperCase();

                if(firstLetter == keyPressed) {
                    $(this).addClass("selected");
                    return false;
                }
            });
        }
        else {
            var option = options.find(".selected");
            var value = option.attr("data-value");
            option.parents(".dropdown-options").siblings("input").val(value).trigger("change");
            option.parents(".dropdown-options").siblings("span").html(option.html());
            dropdown.trigger("click");
        }
    }
});