"use strict";
exports.__esModule = true;
var eventHook = {
    componentName: 'new-password',
    registerHook: function (dataId, validator, polyglot) {
        var passwordInput = document.getElementsByName(dataId)[0];
        var passwordConfirmInput = document.getElementsByName(dataId + "Confirm")[0];
        var errorCard = document.getElementById(dataId + "__error-card");
        var confirmTouched = false;
        var onInputChange = function () {
            var validationErrors = validator.validate(dataId, passwordInput.value);
            var matchError;
            if (confirmTouched &&
                passwordConfirmInput.value !== passwordInput.value) {
                matchError = {
                    dataId: dataId,
                    validationName: 'new-password',
                    errorName: 'confirm-does-not-match'
                };
            }
            if (validationErrors.length || matchError) {
                errorCard.innerHTML = 'Error';
                errorCard.classList.remove('hidden');
            }
            else {
                errorCard.innerHTML = '';
                errorCard.classList.add('hidden');
            }
        };
        var onFocus = function () {
            confirmTouched = true;
        };
        passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.addEventListener('focus', onFocus);
        passwordConfirmInput === null || passwordConfirmInput === void 0 ? void 0 : passwordConfirmInput.addEventListener('focus', onFocus);
        passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.addEventListener('input', onInputChange);
        passwordConfirmInput === null || passwordConfirmInput === void 0 ? void 0 : passwordConfirmInput.addEventListener('input', onInputChange);
    }
};
exports["default"] = eventHook;
