$(document).ready(function() {
    /*
        For every keypress, when releasing it, it checks if the length of the input value is equal to it's maxlength.
    */
    $(".inputJumpContainer").find(".inputJump").find("input").on("keyup", function() {
        var $this = $(this),
            maxLength = $this.attr("maxlength"),
            inputLength = $this.val().length,
            index = $this.parents(".inputJump").index(),
            numberInputs = $this.parents(".inputJumpContainer").find(".inputJump").length - 1;
        /*
            If the index of the input container is less than the number of the containers, it will focus the following if the length of the value matches the maxlength.
        */
        if(index < numberInputs && inputLength == maxLength) {
            /*
                As many other times, developers will need to add their own functions. We trigger an "on.('change')" event so you can add your own functions once the value length matches the maxlength.
                Useful when trying to validate.
            */
            $this.trigger("change");
            $this.parents(".inputJumpContainer").find(".inputJump").eq(index + 1).find("input").focus();
        }
        /*
            If it's the last input we are focusing, we will check if the user left any other that doesn't matches the maxlength in the input value.
        */
        else if(index == numberInputs && inputLength == maxLength) {
            $this.parents(".inputJumpContainer").find(".inputJump").each(function() {
                var input = $(this).find("input"),
                    maxLength = $this.attr("maxlength"),
                    inputLength = input.val().length;
                if(inputLength < maxLength) {
                    input.focus();
                    return false;
                }
            });
        }
    });
    /*
        When focusing an input, we check if the length matches the maxlength.
        If so, we select all the input so the user can replace it if needed.
    */
    $(".inputJumpContainer").find(".inputJump").find("input").focus(function() {
        var $this = $(this),
            maxLength = $this.attr("maxlength"),
            inputLength = $this.val().length;
        if(inputLength == maxLength) {
            $this.select();
        }
    });
});