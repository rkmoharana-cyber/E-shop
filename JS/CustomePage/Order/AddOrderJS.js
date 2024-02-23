function SubmitBtnClicked() {
    Swal.fire({
        title: 'Confirmation',
        text: "Are You Sure Want To Place Order?",
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
            var customer = $('#cCustomer').val();
            var expDelDate = $('#cInvDate').val();
            var itemtot = $('#cItemTotal').val();
            var tradeDis = $('#cTradeDiscount').val();
            var taxableAmt = $('#cTaxableAmount').val();
            var gst = $('#cGST').val();
            var gstAmount = $('#cGSTAmount').val();
            var netpayable = $('#cNetPayable').val();
            var amtReceived = $('#cAmountReceived').val();
            var modeofReceipt = $('#cReceiptMode').val();
            var payRef = $('#cReceiptRef').val();
            var balanceAmt = $('#cAmountBalance').val();
            var schrecords = GetOrderRecords('tblDataList');
            var x = '{"CustomerID":"' + customer
                + '","ExpectedDeliveryDate":"' + expDelDate
                + '","ItemTotal":"' + itemtot
                + '","TradeDiscount":"' + tradeDis
                + '","TaxableAmount":"' + taxableAmt
                + '","GST":"' + gst
                + '","GSTAmount":"' + gstAmount
                + '","NetPayableAmount":"' + netpayable
                + '","AmountReceived":"' + amtReceived
                + '","ModeodofPayment":"' + modeofReceipt
                + '","PaymentRef":"' + payRef
                + '","ApproxPayable":"' + balanceAmt
                + '","AppStockList":' + schrecords + '}';
            $.ajax({
                method: 'POST',
                url: '/Order/SetOrder',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: x,
                success: function (data) {
                    $(data).each(function (index, item) {
                        if (item.bResponseBool == true) {
                            Swal.fire({
                                title: 'Success',
                                text: 'Order Placed Successfully.',
                                icon: 'success',
                                customClass: 'swal-wide',
                                buttons: {
                                    confirm: 'Ok'
                                },
                                confirmButtonColor: '#2527a2',
                            }).then(callback);
                            function callback(result) {
                                if (result.value) {
                                    window.location.href = "/Order/Index";
                                }
                            }
                        }
                        else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Failed To Place Order Due To: ' + item.sResponseString,
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
function GetOrderRecords(tableName) {
    //The fields should have an attribute "data-name", Which is the property name of the MVC object
    var MVariant = '';
    var DVariant = '';
    var SVariant = '';
    var schrecords = '';
    var dataname;
    var datavalue;
    var mrecord = '';
    $('#' + tableName + ' .Ptbody').each(function () {
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
        //mrecord = mrecord.replace(/,\s*$/, "");
        MVariant = GetRecordsFromChildTableBody(mRow, 'MVTable');
        DVariant = GetRecordsFromChildTableBody(mRow, 'DVTable');
        SVariant = GetRecordsFromChildTableBody(mRow, 'SVTable');
        mrecord = mrecord + '"MetalVariants":' + MVariant
            + ',"DiamondVariants":' + DVariant
            + ',"StoneVariants":' + SVariant
        schrecords = schrecords + '{' + mrecord + '},';
        mrecord = '';
        MVariant = '';
        DVariant = '';
        SVariant = '';
    });
    schrecords = schrecords.replace(/,\s*$/, "");
    schrecords = '[' + schrecords + ']';
    return schrecords;
};
function CustomerSearchFocused() {
    var myCtrl = $(CustomerSearchFocused.caller.arguments[0].target);
    myCtrl.tooltip('show');
};
function ValidateModalControl() {
    var myCtrl = $(ValidateModalControl.caller.arguments[0].target);
    var isvalid = validatectrl(myCtrl.attr('id'), myCtrl.val(), 1);
    if (isvalid) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    SaveVendorBtnStatus();
};
function validatectrl(targetid, value, spltag) {
    var isvalid = false;
    switch (targetid) {
        case "cVendorName":
        case "cVendorAddress":
            isvalid = IsAlphaNumericWithSpace(value);
            break;
        case "cVendorGSTIN":
            if (value != '') {
                isvalid = true;
            }
            break;
        case "cVendorContact":
            isvalid = IsValidContact(value);
            break;
        case "cVendorEmailID":
            isvalid = IsValidEmail(value);
            break;
    }
    return isvalid;
};
function CustomerSearChanged() {
    var myCtrl = $(CustomerSearChanged.caller.arguments[0].target);
    var DropdownCtrl = $('#cCustomer');
    if (myCtrl.val() != '' && myCtrl.val().length > 2) {
        $.ajax({
            url: '/POS/SearchParty?SearchText=' + myCtrl.val(),
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    DropdownCtrl.empty();
                    DropdownCtrl.append($('<option/>', { value: "", text: "Select Customer" }));
                    $(data).each(function (index, item) {
                        DropdownCtrl.append($('<option/>', { value: item.ID, text: item.DisplayText }));
                    });
                });
            }
        });
        DropdownCtrl.isInvalid();
    }
};
function CustomerClicked() {
    var myCtrl = $(CustomerClicked.caller.arguments[0].target);
    if (myCtrl.val() != '') {
        myCtrl.isValid();
        $.ajax({
            url: '/Admin/GetParty?PartyCode=' + myCtrl.val(),
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                $(data).each(function (index, item) {
                    $('#cAddress').html(item.PartyAddress);
                    $('#cContact').html(item.ContactNo);
                    //$('#cEmail').html(item.ContactNo);
                    $('#cEmail').html(item.EmailID);
                });
            }
        });
    } else { myCtrl.isInvalid(); }
    SaveBtnStatus();
};
function SaveBtnStatus() {
    //alert($('.is-invalid').length);
    var btnSubmitCtrl = $('#btnSubmit');
    if (GetDivInvalidCount('HdrDIV') > 0) {
        btnSubmitCtrl.makeDisable();
    }
    else {
        btnSubmitCtrl.makeEnabled();
    }
};
function SaveVendorBtnStatus() {
    //alert($('.is-invalid').length);
    var btnSubmitCtrl = $('#btnVendorSave');
    if (GetDivInvalidCount('VendorModal') > 0) {
        btnSubmitCtrl.makeDisable();
    }
    else {
        btnSubmitCtrl.makeEnabled();
    }
};
function AddVendorClicked() {
    var modalDiv = $('#VendorModal');
    modalDiv.modal('show');
};
function VendorSaveBtnClicked() {
    var vName = $('#cVendorName');
    var vAddress = $('#cVendorAddress');
    var vContact = $('#cVendorContact');
    var vEmail = $('#cVendorEmailID');
    var vGSTIN = $('#cVendorGSTIN');
    var x = '{"PartyName":"' + vName.val()
        + '","PartyAddress":"' + vAddress.val()
        + '","GSTIN":"' + vGSTIN.val()
        + '","ContactNo":"' + vContact.val()
        + '","EmailID":"' + vEmail.val() + '"}';
    $.ajax({
        method: 'POST',
        url: '/POS/SetCostomer',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: x,
        success: function (data) {
            $(data).each(function (index, item) {
                if (item.bResponseBool == true) {
                    RefreshVendorDropDown(vName.val());
                    vName.val('').isInvalid();
                    vAddress.val('').isInvalid();
                    vContact.val('').isInvalid();
                    vEmail.val('').isInvalid();
                    vGSTIN.val('').isInvalid();
                    Swal.fire({
                        title: 'Success',
                        text: 'New Customer Created Successfully.',
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
                        text: 'Failed To Create A New Customer. Error : ' + item.sResponseString,
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
};
function ItemCategoryChanged() {
    var myCtrl = $(ItemCategoryChanged.caller.arguments[0].target);
    if (myCtrl.val() != '') { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    SaveBtnStatus();
};
function ItemCodeChanged() {
    var myCtrl = $(ItemCodeChanged.caller.arguments[0].target);
    if (myCtrl.val() != '') { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    SaveBtnStatus();
};
function QtyChanged() {
    var myCtrl = $(QtyChanged.caller.arguments[0].target);
    if (myCtrl.val() >0) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    var pRowID = GetParentRowID(myCtrl.attr('id'));
    calculateItemNetAmount(pRowID);    
};

function AddMVClicked() {
    var row = $(AddMVClicked.caller.arguments[0].target.closest('tbody'));
    var sBody = 'mvTBody1';
    var dBody = 'mvTBody2';
    if (row.attr('id').indexOf('-') >= 0) {
        var rowid = row.attr('id').split('-')[1];
        sBody = 'mvTBody1-' + rowid;
        dBody = 'mvTBody2-' + rowid;
    }
    var rowid = CloneRowChildTableReturningID(sBody, dBody, true, false);
};
function AddDVClicked() {
    var row = $(AddDVClicked.caller.arguments[0].target.closest('tbody'));
    var sBody = 'dvTBody1';
    var dBody = 'dvTBody2';
    if (row.attr('id').indexOf('-') >= 0) {
        var rowid = row.attr('id').split('-')[1];
        sBody = 'dvTBody1-' + rowid;
        dBody = 'dvTBody2-' + rowid;
    }
    var rowid = CloneRowChildTableReturningID(sBody, dBody, true, false);
};
function AddSVClicked() {
    var row = $(AddSVClicked.caller.arguments[0].target.closest('tbody'));
    var sBody = 'svTBody1';
    var dBody = 'svTBody2';
    if (row.attr('id').indexOf('-') >= 0) {
        var rowid = row.attr('id').split('-')[1];
        sBody = 'svTBody1-' + rowid;
        dBody = 'svTBody2-' + rowid;
    }
    var rowid = CloneRowChildTableReturningID(sBody, dBody, true, false);
};
function RemoveMVChildClicked() {
    var row = RemoveMVChildClicked.caller.arguments[0].target.closest('tr');
    removeBtnClickFromChildTableCloneRow(row, 'mvTBody2');
    var myCtrl = $(RemoveMVChildClicked.caller.arguments[0].target);
    parentRowID = GetParentRowID(myCtrl.attr('id'));
    CalculateMCWt(parentRowID);
    calculateItemNetAmount(parentRowID);
};
function RemoveDVChildClicked() {
    var row = RemoveDVChildClicked.caller.arguments[0].target.closest('tr');
    removeBtnClickFromChildTableCloneRow(row, 'dvTBody2');
    var myCtrl = $(RemoveDVChildClicked.caller.arguments[0].target);
    parentRowID = GetParentRowID(myCtrl.attr('id'));
    CalculateMCWt(parentRowID);
    calculateItemNetAmount(parentRowID);
};
function RemoveSVChildClicked() {
    var row = RemoveSVChildClicked.caller.arguments[0].target.closest('tr');
    removeBtnClickFromChildTableCloneRow(row, 'svTBody2');
    var myCtrl = $(RemoveSVChildClicked.caller.arguments[0].target);
    parentRowID = GetParentRowID(myCtrl.attr('id'));
    CalculateMCWt(parentRowID);
    calculateItemNetAmount(parentRowID);
};
function ParentCloneRowAddClicked() {
    var rowid = CloneRowParentTableReturningID('tbody1', 'tbody2', true, true);
};
function ParentCloneRowRemoveClicked() {
    var row = ParentCloneRowRemoveClicked.caller.arguments[0].target.closest('tr');
    removeBtnClickFromParentTableCloneRow(row, 'tbody2');
    calculateOrderAmount();
};

function MetalVariantChanged() {
    var myCtrl = $(MetalVariantChanged.caller.arguments[0].target);    
    myCtrlID = myCtrl.attr('id');
    var childRowID = myCtrlID.split('_')[0];
    var parentRowID = 0;
    if (myCtrlID.indexOf('-') >= 0) { parentRowID = myCtrlID.split('-')[1]; }
    var rateCtrlid = childRowID + '_cMetalRate';
    var wtCtrlid = childRowID + '_cMetalWt';
    if (parentRowID > 0) {
        rateCtrlid = rateCtrlid + '-' + parentRowID;
        wtCtrlid = wtCtrlid + '-' + parentRowID;
    }
    myRateCtrl = $('#' + rateCtrlid);
    myWtCtrl = $('#' + wtCtrlid);    
    if (myCtrl.val() != '') {
        myCtrl.isValid();
        var purity = $('#' + myCtrlID + ' option:selected').attr('data-purity');
        $.ajax({
            url: '/Order/GetGoldRates?GoldKarate=' + purity,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                myRateCtrl.val(data);
                calculateMetalAmount(childRowID, parentRowID, myWtCtrl.val());
            }
        });
    } else { myCtrl.isInvalid(); }    
};
function DiamondVariantChanged() {
    var myCtrl = $(DiamondVariantChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    var childRowID = myCtrlID.split('_')[0];
    var parentRowID = 0;
    if (myCtrlID.indexOf('-') >= 0) { parentRowID = myCtrlID.split('-')[1]; }
    var rateCtrlid = childRowID + '_cDiamondRate';
    //var wtCtrlid = childRowID + '_cDiamondWt';
    if (parentRowID > 0) {
        rateCtrlid = rateCtrlid + '-' + parentRowID;
        //wtCtrlid = wtCtrlid + '-' + parentRowID;
    }
    myRateCtrl = $('#' + rateCtrlid);
    //myWtCtrl = $('#' + wtCtrlid);
    if (myCtrl.val() != '') {
        myCtrl.isValid();        
        $.ajax({
            url: '/Order/GetVariantRates?VariantID=' + myCtrl.val(),
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                myRateCtrl.val(data);
                calculateDiamondAmount(childRowID, parentRowID);
            }
        });
    } else { myCtrl.isInvalid(); }
};
function StoneVariantChanged() {
    var myCtrl = $(StoneVariantChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    var childRowID = myCtrlID.split('_')[0];
    var parentRowID = 0;
    if (myCtrlID.indexOf('-') >= 0) { parentRowID = myCtrlID.split('-')[1]; }
    var rateCtrlid = childRowID + '_cStoneRate';
    if (parentRowID > 0) {
        rateCtrlid = rateCtrlid + '-' + parentRowID;
    }
    myRateCtrl = $('#' + rateCtrlid);
    //myWtCtrl = $('#' + wtCtrlid);
    if (myCtrl.val() != '') {
        myCtrl.isValid();
        $.ajax({
            url: '/Order/GetVariantRates?VariantID=' + myCtrl.val(),
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                myRateCtrl.val(data);
                calculateStoneAmount(childRowID, parentRowID);
            }
        });
    } else { myCtrl.isInvalid(); }
};

function MetalWeightChanged() {
    var myCtrl = $(MetalWeightChanged.caller.arguments[0].target);    
    myCtrlID = myCtrl.attr('id');
    var pRowID = GetParentRowID(myCtrlID);
    if (myCtrl.val() > 0) {
        myCtrl.isValid();
        calculateMetalAmount(GetChildRowID(myCtrlID), pRowID, myCtrl.val());
    } else { myCtrl.isInvalid(); }
    CalculateMCWt(pRowID);
};
function DiamondWtChanged() {
    var myCtrl = $(DiamondWtChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    var pRowID = GetParentRowID(myCtrlID);
    if (myCtrl.val() > 0) {
        myCtrl.isValid();
        calculateDiamondAmount(GetChildRowID(myCtrlID), pRowID);
    } else { myCtrl.isInvalid(); }
    CalculateMCWt(pRowID);
};
function DiamondDiscountChanged() {
    var myCtrl = $(DiamondDiscountChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    if (myCtrl.val() >= 0) {
        myCtrl.isValid();
        calculateDiamondAmount(GetChildRowID(myCtrlID), GetParentRowID(myCtrlID));
    } else { myCtrl.isInvalid(); }
};
function StonetWtChanged() {
    var myCtrl = $(StonetWtChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    var pRowID = GetParentRowID(myCtrlID);
    if (myCtrl.val() > 0) {
        myCtrl.isValid();
        calculateStoneAmount(GetChildRowID(myCtrlID), pRowID);
    } else { myCtrl.isInvalid(); }
    CalculateMCWt(pRowID);
};
function CalculateMCWt(parentRowID) {
    var wt = 0;
    $('#' + parentRowID).find('.wtg').each(function () {
        wt =wt+ $(this).val()*1;
    });
    $('#' + parentRowID).find('.wtk').each(function () {
        wt = wt + Math.round($(this).val()*1/5,3);
    });
    var mswtCtrl = $('#cMCWt');
    if (parentRowID > 0) { mswtCtrl = $('#cMCWt-' + parentRowID); }
    mswtCtrl.val(wt);
    CalculateMCAmount(parentRowID);
};
function MCRateChanged() {
    var myCtrl = $(MCRateChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    var pRowID = GetParentRowID(myCtrlID);
    if (myCtrl.val() >= 0) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    CalculateMCAmount(pRowID);
};
function CalculateMCAmount(parentRowID) {
    var mswtCtrl = $('#cMCWt');
    var msrateCtrl = $('#cMCRate');
    var msAmountCtrl = $('#cMCAmount');
    if (parentRowID > 0) {
        mswtCtrl = $('#cMCWt-' + parentRowID);
        msrateCtrl = $('#cMCRate-' + parentRowID);
        msrateCtrl = $('#cMCAmount-' + parentRowID);
    }
    var rate = msrateCtrl.val();
    var wt = mswtCtrl.val();
    msAmountCtrl.val(Math.round(wt * rate, 0));
    calculateItemNetAmount(parentRowID);
};

function ChargesChanged() {
    var myCtrl = $(ChargesChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    var pRowID = GetParentRowID(myCtrlID);
    if (myCtrl.val() >= 0) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    calculateItemNetAmount(pRowID);
};
function ItemDiscountChanged() {
    var myCtrl = $(ItemDiscountChanged.caller.arguments[0].target);
    myCtrlID = myCtrl.attr('id');
    var pRowID = GetParentRowID(myCtrlID);
    if (myCtrl.val() >= 0) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    calculateItemNetAmount(pRowID);
};
function calculateMetalAmount(childRowID, parentRowID,Wt) {
    var rateCtrlid = childRowID+'_cMetalRate';
    var wtCtrlid = childRowID+'_cMetalWt';
    var amtCtrlid = childRowID+'_cMetalAmount';
    if (parentRowID > 0) {
        rateCtrlid = rateCtrlid + '-' + parentRowID;
        wtCtrlid = wtCtrlid + '-' + parentRowID;
        amtCtrlid = amtCtrlid + '-' + parentRowID;
    }
    var rate = $('#' + rateCtrlid).val();
    var amount = Wt * rate;
    $('#' + amtCtrlid).val(amount);
    $('#' + wtCtrlid).val(Wt);
    if (Wt > 0) { $('#' + wtCtrlid).isValid(); } else { $('#' + wtCtrlid).isInvalid(); }
    calculateItemNetAmount(parentRowID);
};
function calculateDiamondAmount(childRowID, parentRowID) {
    var rateCtrlid = childRowID + '_cDiamondRate';
    var wtCtrlid = childRowID + '_cDiamondWt';
    var amtCtrlid = childRowID + '_cDiamondGA';
    var disCtrlid = childRowID + '_cDiamondDis';
    var disAmtCtrlid = childRowID + '_cDiamondDisAmount';
    var disAmtADCtrlid = childRowID + '_cDiamondAmount';
    if (parentRowID > 0) {
        rateCtrlid = rateCtrlid + '-' + parentRowID;
        wtCtrlid = wtCtrlid + '-' + parentRowID;
        amtCtrlid = amtCtrlid + '-' + parentRowID;
        disCtrlid = disCtrlid + '-' + parentRowID;
        disAmtCtrlid = disAmtCtrlid + '-' + parentRowID;
        disAmtADCtrlid = disAmtADCtrlid + '-' + parentRowID;
    }
    var Wt = $('#' + wtCtrlid).val();
    var rate = $('#' + rateCtrlid).val();
    var amount = Math.round(Wt * rate,0);
    var discount = $('#' + disCtrlid).val();
    var discountAmt = Math.round(amount * discount / 100, 0);
    var netamount = amount - discountAmt;
    $('#' + amtCtrlid).val(amount);
    $('#' + disAmtCtrlid).val(discountAmt);
    $('#' + disAmtADCtrlid).val(netamount);
    if (Wt > 0) { $('#' + wtCtrlid).isValid(); } else { $('#' + wtCtrlid).isInvalid(); }
    calculateItemNetAmount(parentRowID);
};
function calculateStoneAmount(childRowID, parentRowID) {
    var rateCtrlid = childRowID + '_cStoneRate';
    var wtCtrlid = childRowID + '_cStoneWt';
    var amtCtrlid = childRowID + '_cStoneAmount';    
    if (parentRowID > 0) {
        rateCtrlid = rateCtrlid + '-' + parentRowID;
        wtCtrlid = wtCtrlid + '-' + parentRowID;
        amtCtrlid = amtCtrlid + '-' + parentRowID;        
    }
    var Wt = $('#' + wtCtrlid).val();
    var rate = $('#' + rateCtrlid).val();
    var amount = Math.round(Wt * rate, 0);    
    $('#' + amtCtrlid).val(amount);    
    if (Wt > 0) { $('#' + wtCtrlid).isValid(); } else { $('#' + wtCtrlid).isInvalid(); }
    calculateItemNetAmount(parentRowID);
};
function calculateItemNetAmount(parentRowID) {
    var amt = 0;
    $('#' + parentRowID).find('.iamt').each(function () {
        amt = amt + $(this).val() * 1;
    });
    $('#' + parentRowID).find('.igrossamt').each(function () {
        $(this).val(amt);
    });
    var qty = 0;
    $('#' + parentRowID).find('.iqty').each(function () {
        qty = qty + $(this).val() * 1;
    });
    var amtbeforediscount = Math.round(amt * qty, 0);
    $('#' + parentRowID).find('.inetamt').each(function () {
        $(this).val(amtbeforediscount);
    });
    var dis = 0;
    $('#' + parentRowID).find('.iTotalDis').each(function () {
        dis = dis + $(this).val() * 1;
    });
    var disamt = Math.round(amtbeforediscount * dis / 100, 0);
    $('#' + parentRowID).find('.idisamt').each(function () {
        $(this).val(disamt);
    });
    var netafterdis = amtbeforediscount - disamt;
    $('#' + parentRowID).find('.inetafterdis').each(function () {
        $(this).val(netafterdis);
    });

    calculateOrderAmount();
};
function calculateOrderAmount() {
    var itemamt = 0;
    $('.inetafterdis').each(function () {
        itemamt = itemamt + $(this).val() * 1;
    });
    $('#cItemTotal').val(itemamt);
    FooterValueChanged();
};
function FooterValueChanged() {
    var itemamt = $('#cItemTotal').val();
    var tradeDisAmt = $('#cTradeDiscount').val();
    var gstrate = $('#cGST').val();    
    var taxableAmt = itemamt - tradeDisAmt;
    var gstAmt = Math.round(taxableAmt * gstrate/100, 0);
    var netAmt = taxableAmt - gstAmt;
    $('#cTaxableAmount').val(taxableAmt);
    $('#cGSTAmount').val(gstAmt);
    $('#cNetPayable').val(netAmt);

    var advReceived = $('#cAmountReceived').val();
    $('#cAmountBalance').val(netAmt - advReceived);

    if (tradeDisAmt >= 0) { $('#cTradeDiscount').isValid(); } else { $('#cTradeDiscount').isInvalid();}
    if (gstrate >= 0) { $('#cGST').isValid(); } else { $('#cGST').isInvalid(); }
    if (advReceived >= 0) { $('#cAmountReceived').isValid(); } else { $('#cAmountReceived').isInvalid(); }
    SaveBtnStatus();
};

function GetParentRowID(myCtrlID) {
    var parentRowID = 0;
    if (myCtrlID.indexOf('-') >= 0) { parentRowID = myCtrlID.split('-')[1]; }
    return parentRowID
};
function GetChildRowID(myCtrlID) {
    var childRowID = 0;
    if (myCtrlID.indexOf('_') >= 0) { childRowID = myCtrlID.split('_')[0]; }
    return childRowID
};

$(document).ready(function () {
    $('.cloneBtn').hover(function () {
        $(this).closest('tr').css('background-color', '#FFC0CB');
    }, function () {
        $(this).closest('tr').css('background-color', '#fff');
    });
    $('.CloneBtn').hover(function () {
        $(this).closest('tr').css('background-color', '#FFC0CB');
    }, function () {
        $(this).closest('tr').css('background-color', '#fff');
    });
    
    $('.mcrate').each(function () {
        $(this).val($('#MakingCharges').val());
    });
});