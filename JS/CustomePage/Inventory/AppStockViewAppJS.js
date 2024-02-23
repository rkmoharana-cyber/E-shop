function BtnDeleteClicked() {
    var docNo = $('#DocumentNumber').val();
    Swal.fire({
        title: 'Confirmation',
        text: "Are You Sure Want to Delete Document Having Number " + docNo + " ?",
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
            var x = '{"DocumentNumber":"' + docNo + '"}';
            $.ajax({
                method: 'POST',
                url: '/Inventory/RemoveStockEntryDocument',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: x,
                success: function (data) {
                    $(data).each(function (index, item) {
                        if (item.bResponseBool == true) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Document Having Number ' + docNo + ' Removed Successfully.',
                                icon: 'success',
                                customClass: 'swal-wide',
                                buttons: {
                                    confirm: 'Ok'
                                },
                                confirmButtonColor: '#2527a2',
                            }).then(callback);
                            function callback(result) {
                                if (result.value) {
                                    window.location.href = "/Inventory/VirtualStockApproval";
                                }
                            }
                        }
                        else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed To Remove Document Having Number ' + docNo,
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
function ApproveBtnClicked() {
    var docNo = $('#DocumentNumber').val();
    Swal.fire({
        title: 'Confirmation',
        text: "Are You Sure Want to Approve Document Having Number " + docNo + " ?",
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
            var x = '{"DocumentNumber":"' + docNo + '"}';
            $.ajax({
                method: 'POST',
                url: '/Inventory/ApproveStockEntryDocument',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: x,
                success: function (data) {
                    $(data).each(function (index, item) {
                        if (item.bResponseBool == true) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Document Having Number ' + docNo + ' Has Been Approved Successfully.',
                                icon: 'success',
                                customClass: 'swal-wide',
                                buttons: {
                                    confirm: 'Ok'
                                },
                                confirmButtonColor: '#2527a2',
                            }).then(callback);
                            function callback(result) {
                                if (result.value) {
                                    window.location.href = "/Inventory/VirtualStockApproval";
                                }
                            }
                        }
                        else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed To Approve Document Having Number ' + docNo + ' Message : ' + item.sResponseString,
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