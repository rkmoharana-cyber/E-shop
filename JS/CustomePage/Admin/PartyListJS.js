function ValidateControl() {
    var myCtrl = $(ValidateControl.caller.arguments[0].target);
    var isvalid = validatectrl(myCtrl.attr('id'), myCtrl.val());
    if (isvalid) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    SaveBtnStatus();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {
        case "cPartyName":
            isvalid = IsAlphaNumericWithSpace(value);
            break;
        case "cContactNo":
            isvalid = IsValidContact(value);
            break;
        case "cEmailID":
            isvalid = IsValidEmail(value);
            break;
        case "cPartyAddress":
        case "cIsVendor":
        case "cIsCustomer":
        case "cIsActive":
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
    var primarykey = $(ctrl).attr('id');
    $.ajax({
        url: '/Admin/GetParty?PartyCode=' + primarykey,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#cPartyCode').val(item.PartyCode);
                $('#cPartyName').val(item.PartyName).isValid();
                $('#cPartyAddress').val(item.PartyAddress).isValid();
                $('#cGSTIN').val(item.GSTIN);
                $('#cContactNo').val(item.ContactNo).isValid();
                if (item.EmailID != '' && item.EmailID!=null) {
                    $('#cEmailID').val(item.EmailID).isValid();
                } else {
                    $('#cEmailID').val(item.EmailID).removeClass('is-valid is-invalid');
                }                
                $('#cIsVendor').val(item.IsVendor ? 'true' : 'false').isValid();
                $('#cIsCustomer').val(item.IsCustomer ? 'true' : 'false').isValid();
                $('#cIsActive').val(item.IsActive ? 'true' : 'false').isValid();

                $('#btnSave').makeEnabled();
            });
        }
    });
};
function FnDeleteNote(ctrl) {
    var mRow = ctrl.closest('tr');
    var primarykey = $(ctrl).attr('data-dt');
    var primaryText = $(ctrl).attr('data-text');
    Swal.fire({
        title: 'Confirmation',
        text: "Are You Sure Want To Delete The Party " + primaryText + "?",
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
            var x = '{"PartyCode":"' + primarykey + '"}';
            $.ajax({
                method: 'POST',
                url: '/Admin/RemoveParty',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: x,
                success: function (data) {
                    $(data).each(function (index, item) {
                        if (item.bResponseBool == true) {
                            mRow.remove();
                            Swal.fire({
                                title: 'Success',
                                text: 'Party Removed Successfully.',
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
                                text: 'Failed To Remove Party.',
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
$(document).ready(function () {
    var dtinstance = $('#tblDataList').DataTable({
        columns: [
            { 'data': 'PartyCode' },
            { 'data': 'PartyName' },
            { 'data': 'PartyAddress' },
            { 'data': 'GSTIN' },
            { 'data': 'ContactNo' },
            { 'data': 'EmailID' },
            { 'data': 'IsVendorStr' },
            { 'data': 'IsCustomerStr' },
            { 'data': 'IsActiveStr' },
            {
                'data': 'PartyCode', render: function (data, type, row, meta) {
                    var viewBtn = '<button type="button" id="' + row.PartyCode + '" data-btn="V" onclick="FnViewNote(this)" class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>';
                    var deleteBtn = '<button type="button" id="D_' + row.PartyCode + '" data-dt="' + row.PartyCode + '" data-text="' + row.PartyName+'" data-btn="D" onclick="FnDeleteNote(this)" class="btn secondaryLink" data-toggle="tooltip" data-placement="top" title="Remove" data-placement="top" title="" data-bs-original-title="Pending"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>';
                    var mbtns = '<span class="actionBtn d-block">';
                    mbtns = mbtns + viewBtn;
                    if (!row.IsApplied) { mbtns = mbtns + deleteBtn; }
                    mbtns = mbtns + '</span>';
                    return type === 'display' ? mbtns : data;
                }
            },
        ],
        bServerSide: true,
        sAjaxSource: '/Admin/GetPartyList',
        "pagingType": "input",
    });
    $('#btnSave').on('click', function () {
        var schrecords = GetRecordsFromTableHeader('tblDataList');
        var x = '{"DataList":' + schrecords + '}';
        $.ajax({
            method: 'POST',
            url: '/Admin/SetParty',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: x,
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.bResponseBool == true) {
                        $('#cPartyCode').val('');
                        $('#cPartyName').val('').isInvalid();
                        $('#cPartyAddress').val('').isInvalid();
                        $('#cGSTIN').val('');
                        $('#cContactNo').val('').isInvalid();
                        $('#cEmailID').val('').removeClass('is-valid is-invalid');
                        $('#cIsVendor').val('').isInvalid();
                        $('#cIsCustomer').val('').isInvalid();
                        $('#cIsActive').val('').isInvalid();

                        $('#btnSave').makeDisable();
                        Swal.fire({
                            title: 'Success',
                            text: 'Party Information Saved Successfully.',
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
                            text: 'Failed To Save Party Information. Error : ' + item.sResponseString,
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