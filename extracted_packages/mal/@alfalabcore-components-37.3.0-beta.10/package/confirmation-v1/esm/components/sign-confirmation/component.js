import React, { useCallback } from 'react';
import cn from 'classnames';
import { Link } from '../../../../link/esm';
import { Loader } from '../../../../loader/esm';
import { CodeInput } from '../code-input/component.js';
import { Countdown } from '../countdown/component.js';
import '@alfalab/hooks';
import '../../../../button/esm';
import '@alfalab/utils';
import '../countdown-loader/component.js';
import '../code-input/utils.js';

var styles = {"component":"confirmation-v1__component_19wlo","countdown":"confirmation-v1__countdown_19wlo","hidden":"confirmation-v1__hidden_19wlo","header":"confirmation-v1__header_19wlo","inputContainer":"confirmation-v1__inputContainer_19wlo","smsComeLinkWrap":"confirmation-v1__smsComeLinkWrap_19wlo","smsComeLink":"confirmation-v1__smsComeLink_19wlo","error":"confirmation-v1__error_19wlo","loaderWrap":"confirmation-v1__loaderWrap_19wlo","loaderText":"confirmation-v1__loaderText_19wlo","center":"confirmation-v1__center_19wlo","codeInput":"confirmation-v1__codeInput_19wlo"};
require('./index.css');

var SignConfirmation = function (_a) {
    var _b;
    var codeChecking = _a.codeChecking, codeSending = _a.codeSending, smsHintVisible = _a.smsHintVisible, requiredCharAmount = _a.requiredCharAmount, countdownDuration = _a.countdownDuration, additionalContent = _a.additionalContent, hasPhoneMask = _a.hasPhoneMask, phone = _a.phone, inputValue = _a.code, error = _a.error, errorText = _a.errorText, title = _a.title, hasSmsCountdown = _a.hasSmsCountdown, inputRef = _a.inputRef, codeCheckingText = _a.codeCheckingText, codeSendingText = _a.codeSendingText, alignContent = _a.alignContent, noAttemptsLeftMessage = _a.noAttemptsLeftMessage, buttonRetryText = _a.buttonRetryText, countdownContent = _a.countdownContent, onInputFinished = _a.onInputFinished, onInputChange = _a.onInputChange, onSmsRetryClick = _a.onSmsRetryClick, onCountdownFinished = _a.onCountdownFinished, onSmsHintLinkClick = _a.onSmsHintLinkClick;
    var processing = codeChecking || codeSending;
    var displayedError = processing ? '' : errorText;
    var handleInputKeyDown = useCallback(function (event) {
        if (event.key === 'Enter') {
            onInputFinished({ code: event.target.value });
        }
    }, [onInputFinished]);
    var handleInputFinished = useCallback(function (code) {
        onInputFinished({ code: code });
        if (inputRef.current) {
            inputRef.current.blur();
        }
    }, [onInputFinished, inputRef]);
    var handleInputChange = useCallback(function (code) {
        if (code.length === requiredCharAmount) {
            handleInputFinished(code);
        }
        onInputChange({ code: code });
    }, [handleInputFinished, onInputChange, requiredCharAmount]);
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        typeof title === 'string' ? React.createElement("span", { className: styles.header }, title) : title,
        React.createElement("div", { className: styles.inputContainer },
            React.createElement(CodeInput, { processing: processing, error: error, value: inputValue, ref: inputRef, slotsCount: requiredCharAmount, className: styles.codeInput, alignContent: alignContent, handleChange: handleInputChange, handleInputKeyDown: handleInputKeyDown }),
            displayedError && (React.createElement("div", { className: styles.error, role: 'alert' }, displayedError))),
        processing && (React.createElement("div", { className: styles.loaderWrap },
            React.createElement(Loader, null),
            React.createElement("span", { className: styles.loaderText }, codeChecking ? codeCheckingText : codeSendingText))),
        hasSmsCountdown && (React.createElement("div", { className: cn('countdown', styles.countdown, (_b = {}, _b[styles.hidden] = processing, _b)) },
            React.createElement(Countdown, { duration: countdownDuration, phone: phone, hasPhoneMask: hasPhoneMask, alignContent: alignContent, noAttemptsLeftMessage: noAttemptsLeftMessage, hasError: Boolean(displayedError), buttonRetryText: buttonRetryText, content: countdownContent, onRepeatSms: onSmsRetryClick, onCountdownFinished: onCountdownFinished }))),
        smsHintVisible && (React.createElement("div", { className: styles.smsComeLinkWrap },
            React.createElement(Link, { onClick: onSmsHintLinkClick, className: styles.smsComeLink, view: 'secondary', pseudo: true }, "\u041D\u0435 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435?"))),
        React.createElement("div", null, additionalContent)));
};

export { SignConfirmation };
