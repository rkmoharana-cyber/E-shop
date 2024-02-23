function SaveButtonClicked() {
    
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
        case "cUserName":            
            isvalid = IsAlphaNumericWithSpace(value);
            break;
        case "cEmailID":
            isvalid = IsValidEmail(value);
            break;
        case "cContactNo":
            isvalid = IsValidContact(value);
            break;
        case "cIsActive":
        case "cIsSuperUser":
            if (value != '') { isvalid = true; }
            break;
    }    
    return isvalid;
};
function SaveBtnStatus() {    
    if ($('.is-invalid').length > 0) {
        $('#btnSave').makeDisable();
    } else { $('#btnSave').makeEnabled();}
};
function FnViewNote(ctrl) {
    var empid = $(ctrl).attr('id');
    $.ajax({
        url: '/Admin/GetUser?UserID=' + empid,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            $(data).each(function (index, item) {
                $('#dUserID').html(item.UserID);
                $('#cUserName').val(item.UserName).isValid();
                $('#cEmailID').val(item.EmailID).isValid();
                $('#cContactNo').val(item.ContactNo).isValid();
                $('#cIsActive').val(item.IsActive ? 'true' : 'false').isValid();
                $('#cIsSuperUser').val(item.IsSuperUser ? 'true' : 'false').isValid();
                $('#btnSave').makeEnabled();
            });
        }
    });
};
function FnEditNote(ctrl)
{
    var empid = $(ctrl).attr('data-dt');
    var empname = $(ctrl).attr('data-uname');
    window.location.href = "/Admin/UserRole?UserID=" + empid + "&FullName=" + empname;
}
$(document).ready(function () {
    var dtinstance = $('#tblUsers').DataTable({
        columns: [
            { 'data': 'ID' },
            { 'data': 'FullName' },
            { 'data': 'EmailID' },
            { 'data': 'ContactNo' },
            { 'data': 'IsActive' },
            { 'data': 'IsSuperUser', 'searchable': true, },
            {
                'data': 'ID', render: function (data, type, row, meta) {
                    var viewBtn = '<button type="button" id="' + row.ID + '" data-btn="V" onclick="FnViewNote(this)" class="btn primaryLink" data-toggle="tooltip" data-placement="top" title="Details"> <svg xmlns=http://www.w3.org/2000/svg width=24 height=24 viewBox="0 0 24 24" fill=none stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx=12 cy=12 r=3></circle></svg></button>';
                    var editBtn = '<button type="button" id="D_' + row.ID + '" data-uname="' + row.FullName+'" data-dt="' + row.ID + '" onclick="FnEditNote(this)" class="btn secondaryLink" data-toggle="tooltip" data-placement="top" title="Edit" data-placement="top" title="" data-bs-original-title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>';
                    var mbtns = '<span class="actionBtn d-block">';
                    mbtns = mbtns + viewBtn + editBtn;
                    //if (!row.IsApplied) { mbtns = mbtns + deleteBtn; }
                    mbtns = mbtns + '</span>';
                    return type === 'display' ? mbtns : data;
                }
            },
        ],
        bServerSide: true,
        sAjaxSource: '/Admin/GetUserList',
        "pagingType": "input",
    });
    $('#btnSave').on('click', function () {
        var schrecords = GetRecordsFromTableHeader('tblUsers');
        var x = '{"UserList":' + schrecords + '}';
        $.ajax({
            method: 'POST',
            url: '/Admin/SetUser',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: x,
            success: function (data) {
                $(data).each(function (index, item) {
                    if (item.bResponseBool == true) {
                        $('#dUserID').html('');
                        $('#cUserName').val('').isInvalid();
                        $('#cEmailID').val('').isInvalid();
                        $('#cContactNo').val('').isInvalid();
                        $('#cIsActive').val('').isInvalid();
                        $('#cIsSuperUser').val('').isInvalid();
                        $('#btnSave').makeDisable();
                        Swal.fire({
                            title: 'Success',
                            text: 'User Information Saved Successfully.',
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
                            text: 'Failed To Save User Information.',
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
