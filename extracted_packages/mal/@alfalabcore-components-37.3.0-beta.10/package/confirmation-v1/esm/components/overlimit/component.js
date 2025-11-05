import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '../../../../button/esm';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { formatMsAsMinutes } from '../countdown/component.js';
import { CountdownLoader } from '../countdown-loader/component.js';
import 'classnames';
import '@alfalab/hooks';
import '@alfalab/utils';

var styles = {"component":"confirmation-v1__component_19yys","title":"confirmation-v1__title_19yys","description":"confirmation-v1__description_19yys","countdown":"confirmation-v1__countdown_19yys","loader":"confirmation-v1__loader_19yys","timePassed":"confirmation-v1__timePassed_19yys","getCodeButton":"confirmation-v1__getCodeButton_19yys","alertIcon":"confirmation-v1__alertIcon_19yys"};
require('./index.css');

var Overlimit = function (_a) {
    var _b = _a.duration, duration = _b === void 0 ? 60000 : _b, buttonRetryText = _a.buttonRetryText, hasFatalError = _a.hasFatalError, onOverlimitRepeatSms = _a.onOverlimitRepeatSms, onOverlimitCountdownFinished = _a.onOverlimitCountdownFinished, text = _a.text, title = _a.title;
    var timerId = useRef(0);
    var start = useRef(0);
    var _c = useState(false), isBlockingOver = _c[0], setIsBlockingOver = _c[1];
    var _d = useState(0), timePassed = _d[0], setTimePassed = _d[1];
    var stopTimer = useCallback(function () {
        window.clearInterval(timerId.current);
    }, []);
    var updateProgress = useCallback(function () {
        var passed = Date.now() - start.current;
        if (passed >= duration) {
            setIsBlockingOver(true);
            if (onOverlimitCountdownFinished) {
                onOverlimitCountdownFinished();
            }
            stopTimer();
        }
        else {
            setTimePassed(passed);
        }
    }, [duration, onOverlimitCountdownFinished, stopTimer]);
    var startTimer = useCallback(function () {
        start.current = Date.now();
        updateProgress();
        timerId.current = window.setInterval(updateProgress, 50);
    }, [updateProgress]);
    var handleRepeatSmsButtonClick = useCallback(function (event) {
        setIsBlockingOver(false);
        if (onOverlimitRepeatSms) {
            onOverlimitRepeatSms(event);
        }
        startTimer();
    }, [onOverlimitRepeatSms, startTimer]);
    useEffect(function () {
        startTimer();
        return function () {
            stopTimer();
        };
    }, [startTimer, stopTimer]);
    var progress = timePassed / duration;
    return (React.createElement("div", { className: styles.component },
        hasFatalError && (React.createElement("div", { className: styles.alertIcon },
            React.createElement(CrossCircleMIcon, { "data-test-id": 'alert-icon', width: 64, height: 64 }))),
        React.createElement("span", { className: styles.title }, title),
        React.createElement("div", { className: styles.description },
            React.createElement("div", null, text),
            isBlockingOver ? (React.createElement(Button, { size: 'xs', view: 'secondary', onClick: handleRepeatSmsButtonClick, className: styles.getCodeButton }, buttonRetryText)) : (React.createElement("div", { className: styles.countdown },
                React.createElement(CountdownLoader, { progress: progress, className: styles.loader }),
                React.createElement("div", { className: styles.timePassed }, formatMsAsMinutes(duration - timePassed)))))));
};

export { Overlimit };
