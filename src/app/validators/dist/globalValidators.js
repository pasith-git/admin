"use strict";
exports.__esModule = true;
exports.dateValidators = exports.nationalRegexPatternLaosValidator = exports.englishValidator = exports.stringValidator = exports.amountValidator = exports.confirmPassword = exports.minValidator = exports.numberValidator = exports.portValidator = exports.ipAddressValidator = exports.regexValidator = exports.messageError = exports.patterns = void 0;
var moment = require("moment");
exports.patterns = {
    stringValid: /^[\p{L}]{1,}$/u
};
exports.messageError = {
    stringOnly: 'ຕົວອັກສອນຢ່າງດຽວ',
    cantNull: 'ບໍ່ໃຫ້ວ່າງ'
};
function regexValidator(nameRe) {
    return function (control) {
        var forbidden = nameRe.test(control.value);
        return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
}
exports.regexValidator = regexValidator;
function ipAddressValidator() {
    return function (control) {
        var regexTest = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(control.value);
        return regexTest ? null : { ipAddressFailed: control.value };
    };
}
exports.ipAddressValidator = ipAddressValidator;
function portValidator() {
    return function (control) {
        var regexTest = /^([0-9]){1,65535}$/.test(control.value);
        return regexTest ? null : { portFailed: control.value };
    };
}
exports.portValidator = portValidator;
function numberValidator() {
    return function (control) {
        var regexTest = /^([0-9]){1,}$/.test(control.value);
        if (control.value) {
            return regexTest ? null : { numberFailed: control.value };
        }
        return null;
    };
}
exports.numberValidator = numberValidator;
function minValidator(num) {
    return function (control) {
        var regexTest = new RegExp("^([0-9]){" + num + "}$").test(control.value);
        if (control.value) {
            return regexTest ? null : { minNumberFailed: control.value };
        }
        return null;
    };
}
exports.minValidator = minValidator;
exports.confirmPassword = function (group) {
    var pass = group.get('password').value;
    var confirmPass = group.get('cPassword').value;
    return pass === confirmPass ? null : { notSame: true };
};
function amountValidator() {
    return function (control) {
        var regexTest = /^[1-9*0]\d*$/.test(control.value);
        if (control.value) {
            return regexTest ? null : { amountFailed: control.value };
        }
        return null;
    };
}
exports.amountValidator = amountValidator;
function stringValidator() {
    return function (control) {
        var regexTest = /^([\u0E80-\u0EFF\u0E00-\u0E7Fa-zA-Z]){1,}$/.test(control.value);
        return regexTest ? null : { stringFailed: control.value };
    };
}
exports.stringValidator = stringValidator;
function englishValidator() {
    return function (control) {
        var regexTest = /^([a-zA-Z\s]){1,}$/.test(control.value);
        return regexTest ? null : { enFailed: control.value };
    };
}
exports.englishValidator = englishValidator;
function nationalRegexPatternLaosValidator() {
    return function (control) {
        var regexTest = /^[\u0e80-\u0eff\s]{1,}$/.test(control.value);
        return regexTest ? null : { loFailed: control.value };
    };
}
exports.nationalRegexPatternLaosValidator = nationalRegexPatternLaosValidator;
function dateValidators() {
    return function (control) {
        var dateTest = moment(control.value).isSameOrBefore(moment(), 'day');
        return !dateTest ? null : { dateBeforeFailed: control.value };
    };
}
exports.dateValidators = dateValidators;
