var React = require('react');
var cn = require('classnames');
var coreComponentsLink = require('../../../link');
var coreComponentsLoader = require('../../../loader');
var components_codeInput_component = require('../code-input/component.js');
var components_countdown_component = require('../countdown/component.js');
require('@alfalab/hooks');
require('../code-input/utils.js');
require('../../../button');
require('@alfalab/utils');
require('../countdown-loader/component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"confirmation-v1__component_19wlo","countdown":"confirmation-v1__countdown_19wlo","hidden":"confirmation-v1__hidden_19wlo","header":"confirmation-v1__header_19wlo","inputContainer":"confirmation-v1__inputContainer_19wlo","smsComeLinkWrap":"confirmation-v1__smsComeLinkWrap_19wlo","smsComeLink":"confirmation-v1__smsComeLink_19wlo","error":"confirmation-v1__error_19wlo","loaderWrap":"confirmation-v1__loaderWrap_19wlo","loaderText":"confirmation-v1__loaderText_19wlo","center":"confirmation-v1__center_19wlo","codeInput":"confirmation-v1__codeInput_19wlo"};
require('./index.css');

var SignConfirmation = function (_a) {
    var _b;
    var codeChecking = _a.codeChecking, codeSending = _a.codeSending, smsHintVisible = _a.smsHintVisible, requiredCharAmount = _a.requiredCharAmount, countdownDuration = _a.countdownDuration, additionalContent = _a.additionalContent, hasPhoneMask = _a.hasPhoneMask, phone = _a.phone, inputValue = _a.code, error = _a.error, errorText = _a.errorText, title = _a.title, hasSmsCountdown = _a.hasSmsCountdown, inputRef = _a.inputRef, codeCheckingText = _a.codeCheckingText, codeSendingText = _a.codeSendingText, alignContent = _a.alignContent, noAttemptsLeftMessage = _a.noAttemptsLeftMessage, buttonRetryText = _a.buttonRetryText, countdownContent = _a.countdownContent, onInputFinished = _a.onInputFinished, onInputChange = _a.onInputChange, onSmsRetryClick = _a.onSmsRetryClick, onCountdownFinished = _a.onCountdownFinished, onSmsHintLinkClick = _a.onSmsHintLinkClick;
    var processing = codeChecking || codeSending;
    var displayedError = processing ? '' : errorText;
    var handleInputKeyDown = React.useCallback(function (event) {
        if (event.key === 'Enter') {
            onInputFinished({ code: event.target.value });
        }
    }, [onInputFinished]);
    var handleInputFinished = React.useCallback(function (code) {
        onInputFinished({ code: code });
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, [onInputFinished, inputRef]);
    var handleInputChange = React.useCallback(function (code) {
        if (code.length === requiredCharAmount) {
            handleInputFinished(code);
        }
        onInputChange({ code: code });
    }, [handleInputFinished, onInputChange, requiredCharAmount]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, styles[alignContent]) },
        typeof title === 'string' ? React__default.default.createElement("span", { className: styles.header }, title) : title,
        React__default.default.createElement("div", { className: styles.inputContainer },
            React__default.default.createElement(components_codeInput_component.CodeInput, { processing: processing, error: error, value: inputValue, ref: inputRef, slotsCount: requiredCharAmount, className: styles.codeInput, alignContent: alignContent, handleChange: handleInputChange, handleInputKeyDown: handleInputKeyDown }),
            displayedError && (React__default.default.createElement("div", { className: styles.error, role: 'alert' }, displayedError))),
        processing && (React__default.default.createElement("div", { className: styles.loaderWrap },
            React__default.default.createElement(coreComponentsLoader.Loader, null),
            React__default.default.createElement("span", { className: styles.loaderText }, codeChecking ? codeCheckingText : codeSendingText))),
        hasSmsCountdown && (React__default.default.createElement("div", { className: cn__default.default('countdown', styles.countdown, (_b = {}, _b[styles.hidden] = processing, _b)) },
            React__default.default.createElement(components_countdown_component.Countdown, { duration: countdownDuration, phone: phone, hasPhoneMask: hasPhoneMask, alignContent: alignContent, noAttemptsLeftMessage: noAttemptsLeftMessage, hasError: Boolean(displayedError), buttonRetryText: buttonRetryText, content: countdownContent, onRepeatSms: onSmsRetryClick, onCountdownFinished: onCountdownFinished }))),
        smsHintVisible && (React__default.default.createElement("div", { className: styles.smsComeLinkWrap },
            React__default.default.createElement(coreComponentsLink.Link, { onClick: onSmsHintLinkClick, className: styles.smsComeLink, view: 'secondary', pseudo: true }, "\u041D\u0435 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435?"))),
        React__default.default.createElement("div", null, additionalContent)));
};

exports.SignConfirmation = SignConfirmation;
