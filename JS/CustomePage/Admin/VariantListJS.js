function VariantCatIDClicked() {
    var vType = $('#cVariantCatID').val();
    var descCtrl = $('#cShortText');
    var purityCtrl = $('#cPurity');
    if (vType != '') {
        $('#cVariantCatID').isValid();
        if (vType == 2 || vType == 3) {
            descCtrl.makeEnabled();
            descCtrl.val('').isInvalid();
            purityCtrl.val('').clearValidationClass();
            purityCtrl.makeDisable();
        }
        else {
            purityCtrl.makeEnabled();
            purityCtrl.val('').isInvalid();
            descCtrl.val('').clearValidationClass();
            descCtrl.makeDisable();            
        }
    } else { $('#cVariantCatID').isInvalid(); }
    SaveBtnStatus();
};
function ValidateControl() {
    var myCtrl = $(ValidateControl.caller.arguments[0].target);
    var isvalid = validatectrl(myCtrl.attr('id'), myCtrl.val());
    if (isvalid) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    SaveBtnStatus();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "cVariantCatID":
        case "cUOM":
        case "cIsActive":
            if (value != '') { isvalid = true;}
            //isvalid = IsAlphaNumeric(value);
            break;
        case "cRatePerUnit":
            isvalid = IsValidInteger(value);
            break;
        case "cShortText":
            var vType = $('#cVariantCatID').val();
            if (vType == 1 || vType == 4 || vType == 5) {
                isvalid = true;
            }
            else {
                if (value != '') { isvalid = true; }
            }
            break;
        case "cPurity":
            var vType = $('#cVariantCatID').val();
            if (vType == 1 || vType == 4 || vType == 5) {
                if (value != '') { isvalid = true; }
            }
            else {
                isvalid = true;
            }
            break;
    }
    return isvalid;
};
function SaveBtnStatus() {
    if ($('.is-invalid').length > 0) {
        $('#btnSave').makeDisable();
    } else { $('#btnSave').makeEnabled(); }
};
function FnDeleteNote(ctrl) {
    var mRow = ctrl.closest('tr');
    var primarykey = $(ctrl).attr('data-dt');
    var primaryText = $(ctrl).attr('data-text');
    Swal.fire({
        title: 'Confirmation',
        text: "Are You Sure Want To Delete The Varint " + primaryText + "?",
        icon: 'question',
        customClass: 'swal-wide',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        cancelButtonClass: 'btn-cancel',
        confirmButtonColor: '#2527a2',
        showCancelButton: true,
    }).then(callback);
    function callback(result) {
        if (result.value) {
            var x = '{"ID":"' + primarykey + '"}';
            $.ajax({
                method: 'POST',
                url: '/Admin/RemoveVariant',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: x,
                success: function (data) {
                    $(data).each(function (index, item) {
                        if (item.bResponseBool == true) {
                            //dtinstance.ajax.reload();
                            //dtinstance.row($(el).parents("tr")).remove().draw();
                            mRow.remove();
                            Swal.fire({
                                title: 'Success',
                                text: 'Variant Removed Successfully.',
                                icon: 'success',
                                customClass: 'swal-wide',
                                buttons: {
                                    confirm: 'Ok'
                                },
                                confirmButtonColor: '#2527a2',
                            });
                            
                        }
                        else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed To Remove Variant.',
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
            });
        }
    }
};
function FnViewNote(ctrl) {
    var primarykey = $(ctrl).attr('id');
    $.ajax({
        url: '/Admin/GetVariant?VariantID=' + primarykey,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#cID').val(item.ID);
                $('#cVariantCatID').val(item.VariantCatID).isValid();
                $('#cShortText').val(item.ShortText).isValid();
                $('#cPurity').val(item.Purity).isValid();
                $('#cUOM').val(item.UOM).isValid();
                $('#cRatePerUnit').val(item.RatePerUnit).isValid();
                $('#cIsActive').val(item.IsActive ? 'true' : 'false').isValid();

                $('#btnSave').makeEnabled();
            });
        }
    });
};
$(document).ready(function () {
    var dtinstance = $('#tblDataList').DataTable({
        columns: [
            { 'data': 'ID' },
            { 'data': 'VariantCatText' },
            { 'data': 'ShortText' },
            { 'data': 'Purity' },
            { 'data': 'UOM' },
            { 'data': 'IsActiveStr' },
            { 'data': 'RatePerUnit' },
            {
                'data': 'ID', render: function (data, type, row, meta) {
                    var viewBtn = '<button type="button" id="' + row.ID + '" data-btn="V" onclick="FnViewNote(this)" class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>';
                    var deleteBtn = '<button type="button" id="D_' + row.ID + '" data-dt="' + row.ID + '" data-text="' + row.ShortText+'" onclick="FnDeleteNote(this)" class="btn secondaryLink" data-toggle="tooltip" data-placement="top" title="Remove" data-placement="top" title="" data-bs-original-title="Pending"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>';
                    var mbtns = '<span class="actionBtn d-block">';
                    mbtns = mbtns + viewBtn;
                    if (!row.IsApplied) { mbtns = mbtns + deleteBtn; }
                    mbtns = mbtns + '</span>';
                    return type === 'display' ? mbtns : data;
                }
            },
        ],
        bServerSide: true,
        sAjaxSource: '/Admin/GetVariantList',
        "pagingType": "input",
    });
    $('#btnSave').on('click', function () {
        var schrecords = GetRecordsFromTableHeader('tblDataList');
        var x = '{"DataList":' + schrecords + '}';
        $.ajax({
            method: 'POST',
            url: '/Admin/SetVariant',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: x,
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.bResponseBool == true) {
                        $('#cID').val('');
                        $('#cVariantCatID').val('').isInvalid();
                        $('#cShortText').makeEnabled();
                        $('#cPurity').makeEnabled();
                        $('#cShortText').val('').isInvalid();
                        $('#cPurity').val('').isInvalid();
                        $('#cUOM').val('').isInvalid();
                        $('#cRatePerUnit').val('').isInvalid();
                        $('#cIsActive').val('').isInvalid();

                        $('#btnSave').makeDisable();
                        Swal.fire({
                            title: 'Success',
                            text: 'Variant Information Saved Successfully.',
                            icon: 'success',
                            customClass: 'swal-wide',
                            buttons: {
                                confirm: 'Ok'
                            },
                            confirmButtonColor: '#2527a2',
                        });
                        dtinstance.ajax.reload();

                    }
                    else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed To Save Variant Information.',
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
        });
    });
    

});