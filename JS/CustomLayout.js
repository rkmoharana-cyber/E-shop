    $.fn.noneInteractive = function () {
            var that = this;
    that.focus(function (e) {
        that.blur();
            });
        };
    $.fn.preventTypying = function () {
            var that = this;
    that.keypress(function (e) {
                return false;
                //return false; or e.preventDefault();
            });
        };
    $.fn.isInvalid = function () {
            var that = this;
    that.addClass('is-invalid').removeClass('is-valid')
        };
    $.fn.isValid = function () {
            var that = this;
    that.addClass('is-valid').removeClass('is-invalid')
        };





$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
$(document).ready(function () {
    $('.example-getting-started').multiselect({
        templates: {
            button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
        },
    });
});
$(function () {
    $('.datepicker1').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-mm-yy',
        minDate: new Date(),
        maxDate: "+1m",
        autoclose: true
    });
});

$(document).ready(function () {
    $(".only-numeric").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode

        if (!(keyCode >= 48 && keyCode <= 57)) {
            $(".error").css("display", "inline");
            return false;
        } else {
            $(".error").css("display", "none");
        }
    });
    $(".only-decimal").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode
        //alert(keyCode);
        if (!(keyCode >= 48 && keyCode <= 57)) {
            if (keyCode != 46) { return false; }
            //$(".error").css("display", "inline");                    
        } else {
            //$(".error").css("display", "none");
        }
    });
    
});
