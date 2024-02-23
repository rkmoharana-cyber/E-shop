function ValidateControl() {
    var myCtrl = $(ValidateControl.caller.arguments[0].target);
    var isvalid = validatectrl(myCtrl.attr('id'), myCtrl.val());
    if (isvalid) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    SaveBtnStatus();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "cPCID":
            isvalid = Is4DigitValid(value);
            break;
        case "cPCDesc":
            isvalid = IsAlphaNumericWithSpace(value);
            break;
        case "cPCAddress":
            isvalid = IsAlphaNumericWithSpace(value);
            break;
        case "cIsActive":
            if (value != '') { isvalid = true; }
            break;
        case "cMakingCharges":
        case "cDiamondDiscount":
            if (value != '') { isvalid = $.isNumeric(value);}            
            break;
        case "cGLocation":
            if (value != '') { isvalid = true; }
            break;
    }
    return isvalid;
};
function SaveBtnStatus() {
    if ($('.is-invalid').length > 0) {
        $('#btnSave').makeDisable();
    } else { $('#btnSave').makeEnabled(); }
};
function FnViewNote(ctrl) {
    var pcid = $(ctrl).attr('id');
    $.ajax({
        url: '/Admin/GetProfitCentre?PCID=' + pcid,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#cPCID').val(item.PCID).isValid();
                $('#cPCDesc').val(item.PCDesc).isValid();
                $('#cPCAddress').val(item.PCAddress).isValid();
                $('#cIsActive').val(item.IsActive ? 'true' : 'false').isValid();
                $('#cMakingCharges').val(item.MakingCharges).isValid();
                $('#cGLocation').val(item.GLocation).isValid();
                $('#cDiamondDiscount').val(item.DiamondDiscount).isValid();
                $('#btnSave').makeEnabled();
            });
        }
    });
};
function FnDeleteNote(ctrl) {
    var pcid = $(ctrl).attr('data-dt');

};
$(document).ready(function () {
    var dtinstance = $('#tblDataList').DataTable({
        columns: [
            { 'data': 'ID' },
            { 'data': 'PCDescription' },
            { 'data': 'PCAddress' },
            { 'data': 'IsActive' },
            { 'data': 'MakingCharges' },
            { 'data': 'DiamondDiscount' },
            { 'data': 'GLocation', 'searchable': true, },
            {
                'data': 'ID', render: function (data, type, row, meta) {
                    var viewBtn = '<button type="button" id="' + row.ID + '" data-btn="V" onclick="FnViewNote(this)" class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>';
                    var deleteBtn = '<button type="button" id="D_' + row.ID + '" data-dt="' + row.ID + '" data-btn="D" onclick="FnDeleteNote(this)" class="btn secondaryLink" data-toggle="tooltip" data-placement="top" title="Remove" data-placement="top" title="" data-bs-original-title="Pending"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>';
                    var mbtns = '<span class="actionBtn d-block">';
                    mbtns = mbtns + viewBtn;
                    //if (!row.IsApplied) { mbtns = mbtns + deleteBtn; }
                    mbtns = mbtns + '</span>';
                    return type === 'display' ? mbtns : data;
                }
            },
        ],
        bServerSide: true,
        sAjaxSource: '/Admin/GetProfitCentreList',
        "pagingType": "input",
    });
    $('#btnSave').on('click', function () {
        var schrecords = GetRecordsFromTableHeader('tblDataList');
        var x = '{"PCList":' + schrecords + '}';
        $.ajax({
            method: 'POST',
            url: '/Admin/SetProfitCentre',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: x,
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.bResponseBool == true) {
                        $('#cPCID').val('').isInvalid();
                        $('#cPCDesc').val('').isInvalid();
                        $('#cPCAddress').val('').isInvalid();
                        $('#cIsActive').val('').isInvalid();
                        $('#cMakingCharges').val('').isInvalid();
                        $('#cGLocation').val('').isInvalid();
                        $('#cDiamondDiscount').val('').isInvalid();
                        $('#btnSave').makeDisable();
                        Swal.fire({
                            title: 'Success',
                            text: 'Profit Centre Information Saved Successfully.',
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
                            text: 'Failed To Save Profit Centre Information.',
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


