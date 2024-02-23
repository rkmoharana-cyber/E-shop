function ValidateControl() {
    var myCtrl = $(ValidateControl.caller.arguments[0].target);
    var isvalid = validatectrl(myCtrl.attr('id'), myCtrl.val());
    if (isvalid) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    SaveBtnStatus();
};
function validatectrl(targetid, value) {
    var isvalid = false;
    switch (targetid) {        
        case "cProfitCentre":
            $('#ProfitCentreID').val(value);
            if (value != '') { isvalid = true; }
            break;
        case "cRoles":
            $('#URole').val(value);
            if (value != '') { isvalid = true; }
            break;
    }
    return isvalid;
};
function SaveBtnStatus() {
    if ($('.is-invalid').length > 0) {
        $('#btnSubmit').makeDisable();
    } else { $('#btnSubmit').makeEnabled(); }
};
function RemoveRole(ctrl) {
    var myRow = $(RemoveRole.caller.arguments[0].target.closest('tr'));
    myCtrl = $(ctrl);
    var role = myCtrl.attr('data-role');
    var pcid = myCtrl.attr('data-pc');
    var userid = $('#UserID').val();
    Swal.fire({
        title: 'Confirmation',
        text: "Are You Sure Want To Remove Role " + role + " ?",
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
            var x = '{"URole":"' + role + '","UserID":"' + userid + '","ProfitCentreID":"' + pcid+'"}';
            $.ajax({
                method: 'POST',
                url: '/Admin/RemoveRole',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: x,
                success: function (data) {
                    $(data).each(function (index, item) {
                        if (item.bResponseBool == true) {
                            myRow.remove();
                            Swal.fire({
                                title: 'Success',
                                text: 'Role ' + role + ' Removed Successfully.',
                                icon: 'success',
                                customClass: 'swal-wide',
                                buttons: {
                                    confirm: 'Ok'
                                },
                                confirmButtonColor: '#2527a2',
                          })//.then(callback);
                            //function callback(result) {
                            //    if (result.value) {
                            //        window.location.href = "/Inventory/StockOnApproval";
                            //    }
                            //}
                        }
                        else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed To Remove Role ' + role + ' Message : ' + item.sResponseString,
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
