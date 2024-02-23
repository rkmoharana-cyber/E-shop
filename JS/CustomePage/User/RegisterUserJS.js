function ValidateUserName() {
    var myCtrl = $(ValidateUserName.caller.arguments[0].target);
    var valuestring = myCtrl.val();
    if (IsAlphaNumericWithSpace(valuestring)) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }

    LogInStat();
};
function ValidateEmail() {
    var myCtrl = $(ValidateEmail.caller.arguments[0].target);
    var valuestring = myCtrl.val();
    if (IsValidEmail(valuestring)) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }

    LogInStat();
};
function ValidateContact() {
    var myCtrl = $(ValidateContact.caller.arguments[0].target);
    var valuestring = myCtrl.val();
    if (IsValidContact(valuestring)) { myCtrl.isValid(); } else { myCtrl.isInvalid(); }

    LogInStat();
};
function ValidatePassword() {
    var myCtrl = $(ValidatePassword.caller.arguments[0].target);
    if (myCtrl.val() != '' && myCtrl.val().length > 1) {
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