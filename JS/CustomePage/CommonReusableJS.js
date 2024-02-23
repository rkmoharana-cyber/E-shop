$.fn.clearValidationClass = function () {
    var that = this;
    if (that.hasClass('is-valid')) { that.removeClass('is-valid'); }
    if (that.hasClass('is-invalid')) { that.removeClass('is-invalid'); }
};
$.fn.isInvalid = function () {
    var that = this;
    that.addClass('is-invalid').removeClass('is-valid');
};
$.fn.isValid = function () {
    var that = this;
    that.addClass('is-valid').removeClass('is-invalid');
};
$.fn.makeEnabled = function () {
    var that = this;
    that.removeAttr('disabled');
};
$.fn.makeDisable = function () {
    var that = this;
    that.attr('disabled', 'disabled');
};
function IsValidEmail(valuestring) {
    var result = false;
    if (valuestring != '') {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        result = emailRegex.test(valuestring);
    }    
    return result;
};
function IsValidContact(valuestring) {
    var result = false;
    if (valuestring != '') {
        var phoneRegex = /^\d{10}$/;
        result = phoneRegex.test(valuestring);
    }    
    return result;
};
function IsValidEmailorContact(valuestring) {
    var result = false;    
    if (valuestring != '') {
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var phoneRegex = /^\d{10}$/;
        if (!emailRegex.test(valuestring)) {
            if (!phoneRegex.test(valuestring)) {
                result = false;
            } else { result = true; }
        } else { result = true; }
    }    
    return result;
};
function IsAlphaNumeric(valuestring) {
    var result = false;
    if (valuestring != '') {
        var alphanumericRegex = /^[a-zA-Z0-9]+$/;
        result = alphanumericRegex.test(valuestring);
    }
    return result;
};
function IsAlphaNumericWithSpace(valuestring) {
    var result = false;
    if (valuestring != '') {
        var alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
        result = alphanumericRegex.test(valuestring);
    }
    return result;
};
function Is4DigitValid(valuestring) {
    var result = false;
    if (valuestring != '') {
        var phoneRegex = /^\d{4}$/;
        result = phoneRegex.test(valuestring);
    }
    return result;
};
function IsValidInteger(valuestring) {
    var result = false;
    if (valuestring != '') {
        var phoneRegex = /^\d+$/;
        result = phoneRegex.test(valuestring);
    }
    return result;
};
function IsValidIntegerOrDecimal(valuestring) {
    var result = false;
    if (valuestring != '') {
        var phoneRegex = /^[0-9]+(\.[0-9]{1,3})?$/;
        result = phoneRegex.test(valuestring);
    }
    return result;
};
function UploadFile() {
    Swal.fire({
        title: 'Attach Document',
        text: "",
        icon: 'success',
        html: `<div style="text-align:left;">
                            <div class="form-group">
                                <label class="swal-label">Attach File(Only Pdf,Png & Jpg Files)</label>
                                <input type="file" id="uploadCtrl" name="uploadCtrl" class="form-control" placeholder="">
                            </div>
                        </div>`,
        cancelButtonClass: 'btn-cancel',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Submit',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,
    }).then(callback);
    function callback(result) {
        if (result.value) {
            var data = new FormData();
            var files = $("#uploadCtrl").get(0).files;
            if (files.length > 0) {
                data.append("MyImages", files[0]);
                $.ajax({
                    url: "/Common/UploadFile",
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: data,
                    success: function (response) {
                        $(response).each(function (index, item) {
                            if (item.ResponseStat == 1) {
                                $('#DocumentFileName').val(item.FileName);
                                $('#btnScan').addClass('inVisible');
                                $('#btnScanView').removeClass('inVisible');
                                var filepath = "/Upload/Forms/" + item.FileName;
                                window.open(filepath);
                            }
                            else {
                                Swal.fire({
                                    title: 'Failed To Upload File.',
                                    text: item.ResponseMsg,
                                    icon: 'error',
                                    customClass: 'swal-wide',
                                    buttons: {
                                        confirm: 'Ok'
                                    },
                                    confirmButtonColor: '#2527a2',
                                });
                            }
                        });
                    },
                    error: function (er) {
                        //alert(er);
                    }
                });
            }
            else {
                Swal.fire({
                    title: 'No Files Selected.',
                    text: 'Select Only Pdf,Png & Jpg Files.',
                    icon: 'error',
                    customClass: 'swal-wide',
                    buttons: {
                        confirm: 'Ok'
                    },
                    confirmButtonColor: '#2527a2',
                });
            }
        }
    }
};
function ViewUploadedFile() {
    var filename = $('#DocumentFileName').val();
    var filepath = "/Upload/Forms/" + filename;
    if (filename != '') {
        window.open(filepath);
    } else {
        Swal.fire({
            title: 'No Files Found.',
            text: 'Unable To Find Uploaded File.',
            icon: 'error',
            customClass: 'swal-wide',
            buttons: {
                confirm: 'Ok'
            },
            confirmButtonColor: '#2527a2',
        });
    }

};
function GetDivInvalidCount(mdivID) {
    var x = 0;
    var mDiv = $('#' + mdivID);
    x = mDiv.find('.is-invalid').length;
    //alert(mdivID + ' - ' + x);
    return x;
};
function ReturnParentRowID(myCtrl) {
    var myCtrlID = myCtrl.attr('id');
    var myParentRowID = 0;
    if (myCtrlID.indexOf('-') >= 0) {
        myParentRowID = myCtrlID.split('-')[1] * 1;
    }
    return myParentRowID;
};
async function GetDropDownData(DropDownID, defaultText, dataSourceURL) {
    var DropdownCtrl = $('#' + DropDownID);
    $.ajax({
        url: dataSourceURL,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            DropdownCtrl.empty();
            DropdownCtrl.append($('<option/>', { value: "", text: defaultText }));
            $(data).each(function (index, item) {
                DropdownCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
            });
        }
    });
};

function GetRecordsFromTableV3(tableName) {
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
function GetRecordsFromTableHeader(tableName) {
    //The fields should have an attribute "data-name", Which is the property name of the MVC object
    //tr id must be 'PickHdrData'
    var schrecords = '';
    var dataname;
    var datavalue;
    var mrecord = '';
    $('#' + tableName + ' thead tr').each(function () {
        mRow = $(this);
        if (mRow.attr('id') == 'PickHdrData') {
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
        }        
    });
    schrecords = schrecords.replace(/,\s*$/, "");
    schrecords = '[' + schrecords + ']';
    //alert(schrecords);
    return schrecords;
};
function GetRecordsFromChildTableBody(ParentTableRow,ChildTableClass) {
    //The fields should have an attribute "data-name", Which is the property name of the MVC object
    //tr id must be 'PickHdrData'
    var schrecords = '';
    var dataname;
    var datavalue;
    var mrecord = '';
    ParentTableRow.find('.' + ChildTableClass+' tr').each(function () {
            var mRow = $(this);
            mRow.find('[data-name-child]').each(function () {
                that = $(this);
                dataname = that.attr('data-name-child');
                if (that.hasClass('htmlVal')) {
                    datavalue = that.html();
                }
                else { datavalue = that.val(); }
                mrecord = mrecord + '"' + dataname + '":"' + datavalue + '",';
            });
            mRow.find('[data-name-text-child]').each(function () {
                that = $(this);
                dataname = that.attr('data-name-text-child');
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
    return schrecords;
};



function removeBtnClickFromParentTableCloneRow(row, destinationTBody) {
    if ($(row).attr("id")== 0) {
    } else {
        row.remove();
    };
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });
}
function removeBtnClickFromChildTableCloneRow(row, destinationTBody) {
    if ($(row).attr("id").split('_')[0] == 0) {
    } else {
        row.remove();
    };
    //var sl = 2;
    //$('#' + destinationTBody + ' th').each(function () {
    //    $(this).html(sl);
    //    sl += 1;
    //});
}
function CloneRowChildTableReturningID(sourceTBody, destinationTBody, IsRemoveBtn, IsAddBtn) {
    //Source Body <tr id="mvRow-0">
    //<th>1</th> -- Auto serial in row
    var clonerowBaseID = '';
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    $('#' + sourceTBody + ' tr').each(function () {
        clonerowBaseID = $(this).attr('id').split('_')[1];
    });
    $('#' + destinationTBody + ' tr').each(function () {        
        var maxr = $(this).attr('id').split('_')[0] * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });  //Getting Max row id
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; } //Generating ID of the clone Row
    var cloneready = sourcebody.find('tr').clone();
    cloneready.attr('id', r+'_'+clonerowBaseID);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID =r+'_'+ mID[1];
        that.attr('id', newID);
        that.val('');
    });
    cloneready.find('.alterIDvalZero').each(function () {
        that = $(this);
        var mID = that.attr('id').split('_');
        var newID = r + '_' + mID[1];
        that.attr('id', newID);
        that.val(0);
    });
    cloneready.find('.inValidTagc').each(function () {
        that = $(this);
        that.isInvalid();
    });
    cloneready.find('.inVisibleTagc').each(function () {
        that = $(this);
        that.addClass('inVisible');
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
    cloneready.find('.cloneBtn').hover(function () {
        $(this).closest('tr').css('background-color', '#FFC0CB');
    }, function () {
        $(this).closest('tr').css('background-color', '#fff');
    });
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    });
    if (IsAddBtn) {
        cloneready.find('.addBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.addBtn').addClass('inVisible');
    };
    if (IsRemoveBtn) {
        cloneready.find('.removeBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.removeBtn').addClass('inVisible');
    }
    sourcebody.find('.cloneBtn').each(function () {
        that = $(this);
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.css('background-color', '#fff');
    destinationbody.append(cloneready); //Appending Clone Row to the destination body
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });

    return r;
};
function CloneRowParentTableReturningID(sourceTBody, destinationTBody, IsRemoveBtn, IsAddBtn) {
    //Source Body <tr id="mvRow-0">
    //<th>1</th> -- Auto serial in row
    var maxrows = 0, r = 0;
    var sourcebody = $('#' + sourceTBody);
    var destinationbody = $('#' + destinationTBody);
    destinationbody.find('.add-row').each(function () {
        var maxr = $(this).attr('id') * 1;
        if (maxr > maxrows) { maxrows = maxr; }
    });  //Getting Max row id
    if (maxrows >= 1) { r = maxrows + 1; } else { r = 1; } //Generating ID of the clone Row
    //alert(maxrows+' - '+r);
    var cloneready = sourcebody.find('.add-row').clone();
    cloneready.attr('id', r);
    cloneready.find('.alterID').each(function () {
        that = $(this);
        var mID = that.attr('id').split('-');
        var newID = mID[0]+'-'+r;
        that.attr('id', newID);
        that.val('');
    });
    cloneready.find('.alterIDvalZero').each(function () {
        that = $(this);
        var mID = that.attr('id').split('-');
        var newID = mID[0] + '-' + r;
        that.attr('id', newID);
        that.val(0);
    });
    cloneready.find('.alterIDvalOne').each(function () {
        that = $(this);
        var mID = that.attr('id').split('-');
        var newID = mID[0] + '-' + r;
        that.attr('id', newID);
        that.val(1);
    });
    cloneready.find('.alterIDcarryVal').each(function () {
        that = $(this);
        var mID = that.attr('id').split('-');
        var newID = mID[0] + '-' + r;
        that.attr('id', newID);        
    });
    cloneready.find('.inValidTag').each(function () {
        that = $(this);
        that.isInvalid();
    });
    cloneready.find('.inVisibleTag').each(function () {
        that = $(this);
        that.addClass('inVisible');
    });
    cloneready.find('.CloneBtn').each(function () {
        that = $(this);
        that.on('mouseenter', function () {
            $(this).tooltip('show');
        });
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.find('.htmlVal').each(function () {
        $(this).html('');
    });
    cloneready.find('.ChildTableBody').each(function () {
        $(this).find('tr').remove();
    });
    if (IsAddBtn) {
        cloneready.find('.AddBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.AddBtn').addClass('inVisible');
    };
    if (IsRemoveBtn) {
        cloneready.find('.RemoveBtn').removeClass('inVisible');
    }
    else {
        cloneready.find('.RemoveBtn').addClass('inVisible');
    }
    sourcebody.find('.CloneBtn').each(function () {
        that = $(this);
        that.on('mouseleave click', function () {
            $(this).tooltip('hide');
        });
    });
    cloneready.find('.cloneBtn').hover(function () {
        $(this).closest('tr').css('background-color', '#FFC0CB');
    }, function () {
        $(this).closest('tr').css('background-color', '#fff');
    });
    cloneready.find('.CloneBtn').hover(function () {
        $(this).closest('tr').css('background-color', '#FFC0CB');
    }, function () {
        $(this).closest('tr').css('background-color', '#fff');
    });
    cloneready.css('background-color', '#fff');
    destinationbody.append(cloneready); //Appending Clone Row to the destination body
    var sl = 2;
    $('#' + destinationTBody + ' th').each(function () {
        $(this).html(sl);
        sl += 1;
    });

    return r;
};
function CloneRowReturningID(sourceTBody, destinationTBody, rowid, IsRemoveBtn, IsAddBtnEnable) {
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