import React, { useRef, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { Button } from '../../../../button/esm';
import { usePrevious } from '@alfalab/hooks';
import { phoneNumber } from '@alfalab/utils';
import { CountdownLoader } from '../countdown-loader/component.js';

var styles = {"component":"confirmation-v1__component_1j13p","hasError":"confirmation-v1__hasError_1j13p","getCodeButton":"confirmation-v1__getCodeButton_1j13p","info":"confirmation-v1__info_1j13p","customContent":"confirmation-v1__customContent_1j13p","loaderWrap":"confirmation-v1__loaderWrap_1j13p","loader":"confirmation-v1__loader_1j13p","center":"confirmation-v1__center_1j13p","timePassed":"confirmation-v1__timePassed_1j13p","noAttemptsLeftMessage":"confirmation-v1__noAttemptsLeftMessage_1j13p"};
require('./index.css');

/**
 * TODO: Вынести это в utils
 * Форматирование миллисекунд в hh:mm:ss.
 *
 * @param {Number} ms миллисекунды
 * @returns {String} время в формате mm:ss
 */
function formatMsAsMinutes(ms) {
    var totalSeconds = Math.ceil(ms / 1000);
    var totalMinutes = Math.floor(totalSeconds / 60);
    var totalHours = Math.floor(totalMinutes / 60);
    var seconds = totalSeconds % 60;
    var paddedSeconds = "00".concat(seconds).slice(-2);
    if (totalHours > 0) {
        var minutes = totalMinutes % 60;
        var paddedMinutes_1 = "00".concat(minutes).slice(-2);
        var paddedHours = "00".concat(totalHours).slice(-2);
        return "".concat(paddedHours, ":").concat(paddedMinutes_1, ":").concat(paddedSeconds);
    }
    var paddedMinutes = "00".concat(totalMinutes).slice(-2);
    return "".concat(paddedMinutes, ":").concat(paddedSeconds);
}
var Container = function (_a) {
    var _b;
    var alignContent = _a.alignContent, hasError = _a.hasError, children = _a.children;
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent], (_b = {},
            _b[styles.hasError] = hasError,
            _b)) }, children));
};
var Countdown = function (_a) {
    var _b = _a.duration, duration = _b === void 0 ? 5000 : _b, _c = _a.phone, phone = _c === void 0 ? '' : _c, _d = _a.hasPhoneMask, hasPhoneMask = _d === void 0 ? true : _d, buttonRetryText = _a.buttonRetryText, alignContent = _a.alignContent, noAttemptsLeftMessage = _a.noAttemptsLeftMessage, hasError = _a.hasError, content = _a.content, onRepeatSms = _a.onRepeatSms, onCountdownFinished = _a.onCountdownFinished;
    var timerId = useRef(0);
    var start = useRef(0);
    var _e = useState(false), repeatSmsButtonShow = _e[0], setRepeatSmsButtonShow = _e[1];
    var _f = useState(0), timePassed = _f[0], setTimePassed = _f[1];
    var noAttemptsLeftMessagePrev = usePrevious(noAttemptsLeftMessage);
    var stopTimer = useCallback(function () {
        window.clearInterval(timerId.current);
    }, []);
    var updateProgress = useCallback(function () {
        var passed = Date.now() - start.current;
        if (passed >= duration) {
            setRepeatSmsButtonShow(true);
            if (onCountdownFinished) {
                onCountdownFinished();
            }
            stopTimer();
        }
        else {
            setTimePassed(passed);
        }
    }, [duration, onCountdownFinished, stopTimer]);
    var startTimer = useCallback(function () {
        start.current = Date.now();
        updateProgress();
        timerId.current = window.setInterval(updateProgress, 50);
    }, [updateProgress]);
    var handleRepeatSmsButtonClick = useCallback(function (event) {
        setRepeatSmsButtonShow(false);
        if (onRepeatSms) {
            onRepeatSms(event);
        }
        startTimer();
    }, [onRepeatSms, startTimer]);
    useEffect(function () {
        startTimer();
        return function () {
            stopTimer();
        };
    }, [startTimer, stopTimer]);
    useEffect(function () {
        // Если кончились попытки ввода кода, то останавливаем таймер
        if (!noAttemptsLeftMessagePrev && noAttemptsLeftMessage) {
            stopTimer();
        }
    }, [noAttemptsLeftMessage, noAttemptsLeftMessagePrev, stopTimer]);
    var progress = timePassed / duration;
    var formattedPhone = phoneNumber.format(phone);
    var retryButton = (React.createElement(Button, { size: 'xs', view: 'secondary', onClick: handleRepeatSmsButtonClick, className: styles.getCodeButton }, buttonRetryText));
    if (content) {
        return (React.createElement(Container, { alignContent: alignContent, hasError: hasError },
            React.createElement("div", { className: styles.customContent }, content),
            retryButton));
    }
    return (React.createElement(Container, { alignContent: alignContent, hasError: hasError },
        phone && !hasError && (React.createElement("div", null,
            "\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430",
            ' ',
            hasPhoneMask ? phoneNumber.mask(formattedPhone) : formattedPhone)),
        noAttemptsLeftMessage ? (React.createElement("div", { className: styles.noAttemptsLeftMessage }, noAttemptsLeftMessage)) : repeatSmsButtonShow ? (retryButton) : (React.createElement("div", null,
            React.createElement("div", { className: styles.info }, "\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u043C\u043E\u0436\u043D\u043E \u0447\u0435\u0440\u0435\u0437"),
            React.createElement("div", { className: styles.loaderWrap },
                React.createElement(CountdownLoader, { progress: progress, className: styles.loader }),
                React.createElement("div", { className: styles.timePassed }, formatMsAsMinutes(duration - timePassed)))))));
};

export { Countdown, formatMsAsMinutes };
