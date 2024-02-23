function ValidateEmailContact() {
    var myCtrl = $(ValidateEmailContact.caller.arguments[0].target);
    var valuestring = myCtrl.val();
    if (IsValidEmailorContact(valuestring)) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    
    LogInStat();
};
function ValidatePassword() {
    var myCtrl = $(ValidatePassword.caller.arguments[0].target);
    if (myCtrl.val()!='' && myCtrl.val().length > 1) {
        myCtrl.isValid();
    } else {
        myCtrl.isInvalid();
    }
    LogInStat();
};
function LogInStat() {
    var myBtn = $('#btnLogIn');
    var username = $('#UserEmailContact').val().length;
    var pwd = $('#UserCredentials').val().length;
    var x = $('.is-invalid').length;
    if (username > 0 && pwd > 1 && x == 0) {
        myBtn.makeEnabled();
    }
    else {
        myBtn.makeDisable();
    }
};
function ProfitCentreSelcted() {
    var myCtrl = $(ProfitCentreSelcted.caller.arguments[0].target);
    if (myCtrl.val() > 0) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }
    ProceedBtnStat();
};
function ProceedBtnStat() {
    var myBtn = $('#btnProceed');
    var pcid = $('#PCID').val();
    if (pcid > 0) {
        myBtn.makeEnabled();
    }
    else {
        myBtn.makeDisable();
    }
};