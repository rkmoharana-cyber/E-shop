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
$.fn.makeEnabled = function () {
    var that = this;
    that.removeAttr('disabled');
};
$.fn.makeDisable = function () {
    var that = this;
    that.attr('disabled', 'disabled');
};
$.fn.RemoveReadOnly = function () {
    var that = this;
    that.removeAttr('readonly');
};
$.fn.makeReadOnly = function () {
    var that = this;
    that.attr('readonly', 'readonly');
};
$.fn.isInvalid = function () {
    var that = this;
    that.addClass('is-invalid valid').removeClass('is-valid');
};
$.fn.isValid = function () {
    var that = this;
    that.addClass('is-valid valid').removeClass('is-invalid');
};
$.fn.isRed = function () {
    var that = this;
    that.addClass('border-red').removeClass('border-green');
};
$.fn.isGreen = function () {
    var that = this;
    that.addClass('border-green').removeClass('border-red');
};
$.fn.makeVisible = function () {
    var that = this;
    that.removeClass('inVisible');
};
$.fn.makeInVisible = function () {
    var that = this;
    that.AddClass('inVisible');
};
$.fn.clearValidateClass = function () {
    var that = this;
    if (that.hasClass('is-valid')) { that.removeClass('is-valid'); }
    if (that.hasClass('is-invalid')) { that.removeClass('is-invalid'); }
};
$.fn.CustomDateFormat = function () {
    var that = this;
    var parentid = that.attr('id');
    var lblid = 'lbl'+parentid ;
    var dt = this.val();
    var e = dt;
    if (dt.indexOf('/') != -1) {
        var e = dt.split('/').reverse().join('/');
    } else {
        var e = dt.split('-').reverse().join('/');
    }
    $('#' + lblid).html(e);
    //that.addClass('is-valid').removeClass('is-invalid')
};
$(document).ready(function () {
    $(".only-numeric").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode

        if (!(keyCode >= 48 && keyCode <= 57)) {
            //$(".error").css("display", "inline");
            return false;
        } else {
            //$(".error").css("display", "none");
        }
    });
    $(".only-decimal").bind("keypress", function (e) {
        var keyCode = e.which ? e.which : e.keyCode
        //alert(keyCode);
        if (!(keyCode >= 48 && keyCode <= 57)) {
            if (keyCode != 46) { return false; }                    
        } else {
        }
    });    
    $(".mDivDisable").each(function () {
        $(this).find('.form-select').makeDisable();
        $(this).find('.form-control').makeDisable();
        $(this).find('.form-multi').multiselect("disable");
    });
});
function CompareTime(fromTime, toTime) {
    var ft = convertTime12To24int(fromTime);
    var tt = convertTime12To24int(toTime);
    var result = false;
    if (ft <= tt) { result = true; }
    return result;
}
function convertTime12To24int(mtime) {
    var hours = Number(mtime.match(/^(\d+)/)[1]);
    var minutes = Number(mtime.match(/:(\d+)/)[1]);
    var AMPM = mtime.match(/\s(.*)$/)[1];
    if (AMPM === "PM" && hours < 12) hours = hours + 12;
    if (AMPM === "AM" && hours === 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    var result = sHours + "." + sMinutes;
    return (result*1);
}
function convertTime12To24(mtime) {
    var hours = Number(mtime.match(/^(\d+)/)[1]);
    var minutes = Number(mtime.match(/:(\d+)/)[1]);
    var AMPM = mtime.match(/\s(.*)$/)[1];
    if (AMPM === "PM" && hours < 12) hours = hours + 12;
    if (AMPM === "AM" && hours === 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    return (sHours + ":" + sMinutes);
}
function CompareDate(fromDate,fromDateOrder, toDate,toDateOrder)
{
    var result = false;
    var fdt = fromDate;
    var tdt = toDate;
    if (fromDateOrder == 1) {
        if (fromDate.indexOf('/') != -1) {
            fdt = fromDate.split('/').join('-');
        } else {
            fdt = fromDate.split('-').join('-');
        }
    }
    else {
        if (fromDate.indexOf('/') != -1) {
            fdt = fromDate.split('/').reverse().join('-');
        }
        else {
            fdt = fromDate.split('-').reverse().join('-');
        }
    }
    if (toDateOrder == 1) {
        if (toDate.indexOf('/') != -1) {
            tdt = toDate.split('/').join('-');
        } else {
            tdt = toDate.split('-').join('-');
        }
    }
    else {
        if (toDate.indexOf('/') != -1) {
            tdt = toDate.split('/').reverse().join('-');
        }
        else {
            tdt = toDate.split('-').reverse().join('-');
        }
    }
    if (fdt <= tdt) { result = true; }
    //alert(fdt + ' - ' + tdt + ' - ' + result);
    return result;
};
function ChangeDateFormat(dt) {
    //dt must be a string not a date
    var e = '';
    if (dt.indexOf('/') != -1) {
        e = dt.split('/').reverse().join('/');
    } else {
        e = dt.split('-').reverse().join('/');
    }
    return e;
};
function ChangeDateFormatV2(dt) {
    //dt must be a string not a date
    var e = '';
    if (dt.indexOf('/') != -1) {
        e = dt.split('/').reverse().join('-');
    } else {
        e = dt.split('-').reverse().join('-');
    }
    return e;
};
function CustomDateChange(firstDate, addDays, DisplaySeparator) {
    first_date = new Date(firstDate);
    output_f = new Date(first_date.setDate(first_date.getDate() + addDays)).toISOString().split('.');
    output_s = output_f[0].split('T');
    //$('#second_date').val(output_s[0]);
    //$('#datetime').val(output_f[0]);
    var result = output_s[0];
    var e = result;
    if (result.indexOf('/') != -1) {
        e = result.split('/').reverse().join(DisplaySeparator);
    } else {
        e = result.split('-').reverse().join(DisplaySeparator);
    }
    return e;
}
function WordCount(value) {
    return $.trim(value).split(" ").length;
};
function IsAlphaNumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
};
function CloneRow_Backup(sourceTBody, destinationTBody, rowid, IsRemoveBtn, IsAddBtnEnable) {
    // Source table Body must have a row having (id="0" class="add-row")
    //The controlls should have a class named "alterID";
    // buttons should have class "cloneBtn" - For tooltip functionalities
    //"addBtn" and removeBtn are also used for corrosponding buttons of a row
    //"CustomDateFormatCloneRow" - This class is used for customdatepicker. 
    //If multiselects are in a row then use the class "clonemultiselect" and remove multiple attribute and the classes which are responsible for multiselect creations.
    //Use "htmlVal" class for a controll if the value will be picked from innerhtml.
    //There should be "th" tag which may exclusively used for Serial Number Purpose.
    //alert('CloneRow');
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + destinationTBody + ' tr').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }//Geting maximum row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr("id", r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = mID[0] + '_' + r;
        that.attr('id', newID);
    });
    cloneready.find('.btn-group').remove();
    cloneready.find('.clonemultiselect').each(function () {
        that = $(this);
        that.multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
        });
        that.multiselect('clearSelection');
        that.multiselect('refresh');
    });
    cloneready.find('.CustomDateFormatCloneRow').each(function () {
        $(this).change(function () {
            $(this).CustomDateFormatCloneRow();
        });
    });
    cloneready.find('.CustomTimeFormatCloneRow').each(function () {
        var firstOpen = true;
        var time;
        $(this).datetimepicker({
            useCurrent: false,
            format: "hh:mm A"
        }).on('dp.show', function () {
            if (firstOpen) {
                time = moment().startOf('day');
                firstOpen = false;
            } else {
                time = "01:00 PM"
            }

            $(this).data('DateTimePicker').date(time);
        });
    });
    cloneready.find('.cloneBtn').each(function () {
        that = $(this);
        that.on('mouseenter', function () {
            $(this).tooltip('show');
        });
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    if (IsAddBtnEnable) {
        cloneready.find('.addBtn').makeEnabled();
    }
    else {
        cloneready.find('.addBtn').makeDisable();
    };
    if (IsRemoveBtn) {
        cloneready.find('.removeBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.removeBtn').addClass('inVisible');
    }
    sourcebody.find('.btn').each(function () {
        that = $(this);
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    if (rowid == 0) {
        if (maxrows == 0) {
            destinationbody.append(cloneready);
        } else {
            $(cloneready).insertBefore('#' + destinationTBody + ' tr:first');
        }
    } else {
        $(cloneready).insertAfter('#' + rowid);
    }
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
};
function CloneRowWithNoControls(sourceTBody, destinationTBody, rowid) {
    // Source table Body must have a row having (id="0" class="add-row")
    //The controlls should have a class named "alterID";
   //Use "htmlVal" class for a controll if the value will be picked from innerhtml.
    //There should be "th" tag which may exclusively used for Serial Number Purpose.
    //alert('CloneRow : ' + sourceTBody + " - " + destinationTBody + " - "+rowid);
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + destinationTBody + ' tr').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }//Geting maximum row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr("id", r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = mID[0] + '_' + r;
        that.attr('id', newID);
    });    
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    });
    destinationbody.append(cloneready);    
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
};
function CloneRowWithNoControlsReturningID(sourceTBody, destinationTBody, rowid) {
    // Source table Body must have a row having (id="0" class="add-row")
    //The controlls should have a class named "alterID";
    //Use "htmlVal" class for a controll if the value will be picked from innerhtml.
    //There should be "th" tag which may exclusively used for Serial Number Purpose.
    //alert('CloneRow : ' + sourceTBody + " - " + destinationTBody + " - "+rowid);
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + destinationTBody + ' tr').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }//Geting maximum row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr("id", r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = mID[0] + '_' + r;
        that.attr('id', newID);
    });
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    });
    destinationbody.append(cloneready);
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
    return r;
};
function CloneRow(sourceTBody, destinationTBody, rowid, IsRemoveBtn, IsAddBtnEnable) {
    // Source table Body must have a row having (id="0" class="add-row")
    //The controlls should have a class named "alterID";
    // buttons should have class "cloneBtn" - For tooltip functionalities
    //"addBtn" and removeBtn are also used for corrosponding buttons of a row
    //"CustomDateFormatCloneRow" - This class is used for customdatepicker. 
   //If multiselects are in a row then use the class "clonemultiselect" and remove multiple attribute and the classes which are responsible for multiselect creations.
    //Use "htmlVal" class for a controll if the value will be picked from innerhtml.
    //There should be "th" tag which may exclusively used for Serial Number Purpose.
    //"inValidTag" class can be used to apply boot strap invalid class to the control.
    //alert('CloneRow');
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + destinationTBody+' tr').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }//Geting maximum row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr("id", r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = mID[0] + '_' + r;
        that.attr('id', newID);
    });
    cloneready.find('.inValidTag').each(function () {
        that = $(this);
        that.val('').isInvalid();
    });
    cloneready.find('.btn-group').remove();
    cloneready.find('.clonemultiselect').each(function () {
        that = $(this);
        that.multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
        });
        that.multiselect('clearSelection');
        that.multiselect('refresh');
    });
    cloneready.find('.CustomDateFormatCloneRow').each(function () {
        $(this).change(function () {
            $(this).CustomDateFormatCloneRow();
        });
    });
    cloneready.find('.CustomTimeFormatCloneRow').each(function () {
        var firstOpen = true;
        var time;
        $(this).datetimepicker({
            useCurrent: false,
            format: "hh:mm A"
        }).on('dp.show', function () {
            if (firstOpen) {
                time = moment().startOf('day');
                firstOpen = false;
            } else {
                time = "01:00 PM"
            }

            $(this).data('DateTimePicker').date(time);
        });
    });
    cloneready.find('.cloneBtn').each(function () {
        that = $(this);
        that.on('mouseenter', function () {
            $(this).tooltip('show');
        });
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.find('.datelabel').each(function () {
        $(this).html('Select Date');
    });
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    });
    if (IsAddBtnEnable) {
        cloneready.find('.addBtn').makeEnabled();
    }
    else {
        cloneready.find('.addBtn').makeDisable();
    };    
    if (IsRemoveBtn) {
        cloneready.find('.removeBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.removeBtn').addClass('inVisible');
    }
    sourcebody.find('.btn').each(function () {
        that = $(this);
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    if (rowid == 0) {
        if (maxrows == 0) {
            destinationbody.append(cloneready);
        } else {
            $(cloneready).insertBefore('#' + destinationTBody+' tr:first');
        }
    } else {
        $(cloneready).insertAfter('#' + rowid);
    }
    var sl = 2;
    $('#' + destinationTBody+' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
};
function CloneRowReturningID(sourceTBody, destinationTBody, rowid, IsRemoveBtn, IsAddBtnEnable) {
    // Source table Body must have a row having (id="0" class="add-row")
    //The controlls should have a class named "alterID";
    // buttons should have class "cloneBtn" - For tooltip functionalities
    //"addBtn" and removeBtn are also used for corrosponding buttons of a row
    //"CustomDateFormatCloneRow" - This class is used for customdatepicker. 
    //If multiselects are in a row then use the class "clonemultiselect" and remove multiple attribute and the classes which are responsible for multiselect creations.
    //Use "htmlVal" class for a controll if the value will be picked from innerhtml.
    //There should be "th" tag which may exclusively used for Serial Number Purpose.
    //alert('CloneRow');
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + destinationTBody + ' tr').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }//Geting maximum row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr("id", r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = mID[0] + '_' + r;
        that.attr('id', newID);
        //that.val('').isInvalid();
    });
    cloneready.find('.inValidTag').each(function () {
        that = $(this);
        //that.val('');
        that.isInvalid();
    });
    cloneready.find('.btn-group').remove();
    cloneready.find('.clonemultiselect').each(function () {
        that = $(this);
        that.multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
        });
        that.multiselect('clearSelection');
        that.multiselect('refresh');
    });
    cloneready.find('.CustomDateFormatCloneRow').each(function () {
        $(this).change(function () {
            $(this).CustomDateFormatCloneRow();
        });
    });
    cloneready.find('.CustomTimeFormatCloneRow').each(function () {
        var firstOpen = true;
        var time;
        $(this).datetimepicker({
            useCurrent: false,
            format: "hh:mm A"
        }).on('dp.show', function () {
            if (firstOpen) {
                time = moment().startOf('day');
                firstOpen = false;
            } else {
                time = "01:00 PM"
            }

            $(this).data('DateTimePicker').date(time);
        });
    });
    cloneready.find('.cloneBtn').each(function () {
        that = $(this);
        that.on('mouseenter', function () {
            $(this).tooltip('show');
        });
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.find('.datelabel').each(function () {
        $(this).html('Select Date');
    });
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    }); 
    if (IsAddBtnEnable) {
        cloneready.find('.addBtn').removeAttr('disabled');
    }
    else {
        cloneready.find('.addBtn').attr('disabled', 'disabled');;
    };
    if (IsRemoveBtn) {
        cloneready.find('.removeBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.removeBtn').addClass('inVisible');
    }
    sourcebody.find('.btn').each(function () {
        that = $(this);
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    if (rowid == 0) {
        if (maxrows == 0) {
            destinationbody.append(cloneready);
        } else {
            $(cloneready).insertBefore('#' + destinationTBody + ' tr:first');
        }
    } else {
        $(cloneready).insertAfter('#' + rowid);
    }    
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
    return r;
};
function CloneRowReturningIDV2(sourceTBody, destinationTBody, rowid, IsRemoveBtn, IsAddBtnEnable) {
    //New - 1. Checkbox Label for attribute functionality autogenerated 2. InvisibleTag introduced
    // Source table Body must have a row having (id="0" class="add-row")
    //The controlls should have a class named "alterID";
    // buttons should have class "cloneBtn" - For tooltip functionalities
    //"addBtn" and removeBtn are also used for corrosponding buttons of a row
    //"CustomDateFormatCloneRow" - This class is used for customdatepicker. 
    //If multiselects are in a row then use the class "clonemultiselect" and remove multiple attribute and the classes which are responsible for multiselect creations.
    //Use "htmlVal" class for a controll if the value will be picked from innerhtml.
    //There should be "th" tag which may exclusively used for Serial Number Purpose.
    // "inVisibleTag" & "inValidTag" use this class to make a controll invalid or invisible when cloaning.
    //alert('CloneRow');
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + destinationTBody + ' tr').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; }//Geting maximum row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr("id", r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = mID[0] + '_' + r;
        that.attr('id', newID);
        //that.val('').isInvalid();
    });
    cloneready.find('.form-check-label').each(function () {
        that = $(this);
        var mID = that.attr('id');
        that.attr('for', 'opt' + mID)
    });
    cloneready.find('.inValidTag').each(function () {
        that = $(this);
        //that.val('');
        that.isInvalid();
    });
    cloneready.find('.inVisibleTag').each(function () {
        that = $(this);
        //that.val('');
        that.addClass('inVisible');
    });
    cloneready.find('.btn-group').remove();
    cloneready.find('.clonemultiselect').each(function () {
        that = $(this);
        that.multiselect({
            templates: {
                button: '<button type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
            },
        });
        that.multiselect('clearSelection');
        that.multiselect('refresh');
    });
    cloneready.find('.CustomDateFormatCloneRow').each(function () {
        $(this).change(function () {
            $(this).CustomDateFormatCloneRow();
        });
    });
    cloneready.find('.CustomTimeFormatCloneRow').each(function () {
        var firstOpen = true;
        var time;
        $(this).datetimepicker({
            useCurrent: false,
            format: "hh:mm A"
        }).on('dp.show', function () {
            if (firstOpen) {
                time = moment().startOf('day');
                firstOpen = false;
            } else {
                time = "01:00 PM"
            }

            $(this).data('DateTimePicker').date(time);
        });
    });
    cloneready.find('.cloneBtn').each(function () {
        that = $(this);
        that.on('mouseenter', function () {
            $(this).tooltip('show');
        });
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.find('.datelabel').each(function () {
        $(this).html('Select Date');
    });
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    });
    if (IsAddBtnEnable) {
        cloneready.find('.addBtn').removeAttr('disabled');
    }
    else {
        cloneready.find('.addBtn').attr('disabled', 'disabled');;
    };
    if (IsRemoveBtn) {
        cloneready.find('.removeBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.removeBtn').addClass('inVisible');
    }
    sourcebody.find('.btn').each(function () {
        that = $(this);
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    if (rowid == 0) {
        if (maxrows == 0) {
            destinationbody.append(cloneready);
        } else {
            $(cloneready).insertBefore('#' + destinationTBody + ' tr:first');
        }
    } else {
        $(cloneready).insertAfter('#' + rowid);
    }
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
    return r;
};
async function getMultiselectData(multiselectID,dataSourceURL) {
    var multiselectCtrl = $('#' + multiselectID);
    $.ajax({
        url: dataSourceURL,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            multiselectCtrl.empty();
            multiselectCtrl.multiselect('destroy');
            //ToLT.append($('<option/>', { value: "-1", text: "Select location type" }));
            $(data).each(function (index, item) {                
                multiselectCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            multiselectCtrl.attr('multiple', 'multiple');
            multiselectCtrl.multiselect({
                templates: {
                    button: '<button id="B0" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },
            });
            multiselectCtrl.multiselect('clearSelection');
            multiselectCtrl.multiselect('refresh');
        }
    });
};
async function getDropDownDataWithSelectedValueWithColor(DropDownID, defaultText, dataSourceURL, selectedValue) {
    var DropdownCtrl = $('#' + DropDownID);
    //alert(DropDownID + ' - ' + dataSourceURL);
    $.ajax({
        url: dataSourceURL,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            DropdownCtrl.empty();
            DropdownCtrl.append($('<option/>', { value: "-1", text: defaultText }));
            $(data).each(function (index, item) {
                if (item.IsSelected) {
                    DropdownCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText, class: 'Active' }));
                } else {
                    DropdownCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText}));
                }
                });
            DropdownCtrl.val(selectedValue);
            //if (selectedValue.length > 0) { DropdownCtrl.isValid(); } else { DropdownCtrl.isInvalid(); }
        }
    });
};
async function getMultiselectDataWithSelectedValues(multiselectID, dataSourceURL, commaSeparatedSelectedValues) {
    var multiselectCtrl = $('#' + multiselectID);
    var i = commaSeparatedSelectedValues.indexOf(',');
    //alert(commaSeparatedSelectedValues + ' - ' + i);
    $.ajax({
        url: dataSourceURL,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            multiselectCtrl.empty();
            multiselectCtrl.multiselect('destroy');
            //ToLT.append($('<option/>', { value: "-1", text: "Select location type" }));
            $(data).each(function (index, item) {
                multiselectCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            multiselectCtrl.attr('multiple', 'multiple');
            multiselectCtrl.multiselect({
                templates: {
                    button: '<button id="B0" type="button" class="multiselect dropdown-toggle btn btn-primary w-100 selectBox" data-bs-toggle="dropdown" aria-expanded="false"><span class="multiselect-selected-text"></span></button>',
                },
            });
            multiselectCtrl.multiselect('clearSelection');
            if (i > 0) {
                multiselectCtrl.val(commaSeparatedSelectedValues.split(','));
            } else {
                multiselectCtrl.val(commaSeparatedSelectedValues);
            }
            multiselectCtrl.multiselect('refresh');
        }
    });
};
function ChangeCashCadingSourceInCloaning(destinationCtrlID,datasourceURL) {
    var target = ChangeCashCadingSourceInCloaning.caller.arguments[0].target;
    var targetCtrl = $(target);
    var targetid = targetCtrl.attr('id');
    //alert(targetid);
    var rowid = $(target.closest('.add-row')).attr("id");
    var i = targetid.indexOf('_');
    if (i >= 0) { destinationCtrlID = destinationCtrlID + '_' + rowid; }
    var x = '';
    $('#' + targetid + ' option:selected').each(function () {
        x = x + '_' + $(this).val();
    });
    datasourceURL = datasourceURL + x;
    //alert(datasourceURL);
    (async function () {
        const r1 = await getMultiselectData(destinationCtrlID, datasourceURL);
    })();
    if (targetCtrl.val().length > 0) { targetCtrl.isValid(); } else { targetCtrl.isInvalid();}
};
async function getDropDownData(DropDownID,defaultText, dataSourceURL) {
    var DropdownCtrl = $('#' + DropDownID);
    $.ajax({
        url: dataSourceURL,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            DropdownCtrl.empty();
            DropdownCtrl.append($('<option/>', { value: "-1", text: defaultText }));
            $(data).each(function (index, item) {
                DropdownCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });            
        }
    });
};
async function getDropDownDataWithSelectedValue(DropDownID, defaultText, dataSourceURL,selectedValue) {
    var DropdownCtrl = $('#' + DropDownID);
    //alert(DropDownID + ' - ' + dataSourceURL);
    $.ajax({
        url: dataSourceURL,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            DropdownCtrl.empty();
            DropdownCtrl.append($('<option/>', { value: "-1", text: defaultText }));
            $(data).each(function (index, item) {
                DropdownCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
            DropdownCtrl.val(selectedValue);
            //if (selectedValue.length > 0) { DropdownCtrl.isValid(); } else { DropdownCtrl.isInvalid(); }
        }
    });
};
function getRecordsFromTable(tableName) {
    //The fields should have an attribute "data-name", Which is the property name of the MVC object
    var schrecords='';
    var dataname;
    var datavalue;
    var mrecord='';
    $('#' + tableName+' tbody tr').each(function () {
        mRow = $(this);
        mRow.find('[data-name]').each(function () {
            that = $(this);
            dataname = that.attr('data-name');
            if (that.hasClass('htmlVal')) {
                datavalue = that.html();
            }
            else { datavalue = that.val(); }
            mrecord = mrecord+ '"' + dataname + '":"' + datavalue+'",';
        });
        mrecord = mrecord.replace(/,\s*$/, "");
        schrecords = schrecords +'{'+ mrecord+'},';
        mrecord = '';
    });
    schrecords = schrecords.replace(/,\s*$/, "");
    schrecords = '[' + schrecords + ']';
    return schrecords;
};
function getRecordsFromTableV2(tableName) {
    //The fields should have an attribute "data-name", Which is the property name of the MVC object
    var schrecords = '';
    var dataname;
    var datavalue;
    var mrecord = '';
    $('#' + tableName + ' tbody tr').each(function () {
        mRow = $(this);
        mRow.find('[data-name]').each(function () {
            that = $(this);
            dataname = that.attr('data-name');
            if (that.hasClass('htmlVal')) {
                datavalue = that.html().trim();
                //datavalue = datavalue.replace('"', '');
            }
            else { datavalue = that.val(); }
            mrecord = mrecord + '"' + dataname + '":"' + datavalue + '",';
        });
        mRow.find('[data-name-text]').each(function () {
            that = $(this);
            dataname = that.attr('data-name-text');
            thatid = that.attr('id');
            datavalue = $('#' + thatid+' option:selected').toArray().map(item => item.text).join();
            mrecord = mrecord + '"' + dataname + '":"' + datavalue + '",';
        });
        mrecord = mrecord.replace(/,\s*$/, "");
        schrecords = schrecords + '{' + mrecord + '},';
        mrecord = '';
    });
    schrecords = schrecords.replace(/,\s*$/, "");
    schrecords = '[' + schrecords + ']';
    //alert(schrecords);
    return schrecords;
};
function getRecordsFromTableV3(tableName) {
    //The fields should have an attribute "data-name", Which is the property name of the MVC object
    var schrecords = '';
    var dataname;
    var datavalue;
    var mrecord = '';
    $('#' + tableName + ' tbody tr').each(function () {
        mRow = $(this);
        mRow.find('[data-name]').each(function () {
            that = $(this);
            dataname = that.attr('data-name');
            if (that.hasClass('htmlVal')) {
                datavalue = that.html();
            }
            else { datavalue = that.val(); }
            mrecord = mrecord + '"' + dataname + '":"' + datavalue + '",';
        });
        mRow.find('[data-name-text]').each(function () {
            that = $(this);
            dataname = that.attr('data-name-text');
            thatid = that.attr('id');
            datavalue = $('#' + thatid + ' option:selected').toArray().map(item => item.text).join();
            mrecord = mrecord + '"' + dataname + '":"' + datavalue + '",';
        });
        mrecord = mrecord.replace(/,\s*$/, "");
        schrecords = schrecords + '{' + mrecord + '},';
        mrecord = '';
    });
    schrecords = schrecords.replace(/,\s*$/, "");
    schrecords = '[' + schrecords + ']';
    //alert(schrecords);
    return schrecords;
};
function removeBtnClickFromCloneRow(r,destinationTBody) {
    //var r = removeBtnClickFromCloneRow.caller.arguments[0].target.closest('.add-row');
    if ($(r).attr("id") == 0) {
    } else {
        r.remove();
    };
    var sl = 2;
    $('#' + destinationTBody+' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
}
function BackButtonClicked(backFunUrl) {
    $.ajax({
        url: backFunUrl,
        success: function (result) { window.location.href = result; }
    });
};
function EnableAddBtnInCloneRow(tblRow, addBtnBaseID) {
    var tblrow = $(tblRow);
    var rowid = tblrow.attr('id')
    if (rowid != 0) { addBtnBaseID = addBtnBaseID + '_' + rowid; }
    var addBtnctrl = $('#' + addBtnBaseID);
    if (tblrow.find('.is-invalid').length > 0) { addBtnctrl.makeDisable(); } else { addBtnctrl.makeEnabled(); }
    //alert(tblrow.find('.is-invalid').length);
};
function getDivInvalidCount(mdivID) {
    var x = 0;
    var mDiv = $('#' + mdivID);
    x = mDiv.find('.is-invalid').length;
    //alert(mdivID + ' - ' + x);
    return x;
};
function OpenDocument(pathid, docName) {
    var filepath = "/Upload/Forms/";
    if (pathid == 1) { filepath = "/Upload/Docs/"; }
    filepath = filepath + docName;
    window.open(filepath);
};
function FireSweetAlert() {

};
function GetNoteDescription(notetype)
{
    var notedesc = "";
    if (notetype == 'EHG') {
        notedesc='Ref. Employee’s Travelling  Details & Vehicle Allotment (By HG)  –  ENTRY Note No.';
    }
    else if (notetype == 'EZB') {
        notedesc='Ref. Employees Travelling  Schedule Details – ENTRY (FOR NZB STAFF) Note No.';
    }
    else if (notetype == 'EMN') {
        notedesc='Ref. Employees Travelling  Schedule Details – ENTRY (FOR MFG. CENTERS RECORDED AT NZB) Note No.';
    }
    else {
        notedesc = 'Ref. Employees Travelling  Schedule Details – ENTRY (FOR MFG. CENTERS) Note No.';
    }
    return notedesc;
};
function GetSelectedTextOfaMultiSelect(multiselectid) {
    var selectedOptions = $('#' + multiselectid+' option:selected');
    var selectedText = [];
    selectedOptions.each(function () {
        selectedText.push($(this).text().trim());
    });
    var selectedTextString = selectedText.join(', ');
    //alert(selectedTextString);
    return selectedTextString;
};
function GetSelectedTextOfCheckBoxes(groupname) {
    var selectedFruits = $('input[name="' + groupname+'"]:checked').map(function () {
        return $(this).attr('data-name');
    }).get();
    return selectedFruits;
};
function GetSelectedValueOfCheckBoxes(groupname) {
    var selectedFruits = $('input[name="' + groupname + '"]:checked').map(function () {
        return $(this).val();
    }).get();
    return selectedFruits;
};
function GetPreviousTRId(trID) {
    var currentRow = document.getElementById(trID);
    var previousRow = currentRow.previousElementSibling;
    return previousRow.attr('id');
};




//Need to make RND
function GetMultiSelectDataInClickedSequence(multiselectid) {
    var selectedData = [];
    $("#"+multiselectid+" option").mousedown(function (e) {
        e.preventDefault();
        $(this).prop("selected", !$(this).prop("selected"));
        $(this).data("index", $(this).index());
    }).mousemove(function (e) {
        e.preventDefault();
    }).mouseup(function (e) {
        $(this).prop("selected", !$(this).prop("selected"));
    });
    $("#" + multiselectid+" option:selected").each(function () {
        var index = $(this).data("index");
        //selectedData.push($(this).val());
        selectedData[index] = $(this).val();
        alert(index + ' - ' + $(this).val());
    });
    var commaSeparated = selectedData.join(",");
    alert(commaSeparated);
};


