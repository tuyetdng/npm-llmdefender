import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '../../../../button/modern';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { formatMsAsMinutes } from '../countdown/component.js';
import { CountdownLoader } from '../countdown-loader/component.js';
import 'classnames';
import '@alfalab/hooks';
import '@alfalab/utils';

const styles = {"component":"confirmation-v1__component_19yys","title":"confirmation-v1__title_19yys","description":"confirmation-v1__description_19yys","countdown":"confirmation-v1__countdown_19yys","loader":"confirmation-v1__loader_19yys","timePassed":"confirmation-v1__timePassed_19yys","getCodeButton":"confirmation-v1__getCodeButton_19yys","alertIcon":"confirmation-v1__alertIcon_19yys"};
require('./index.css');

const Overlimit = ({ duration = 60000, buttonRetryText, hasFatalError, onOverlimitRepeatSms, onOverlimitCountdownFinished, text, title, }) => {
    const timerId = useRef(0);
    const start = useRef(0);
    const [isBlockingOver, setIsBlockingOver] = useState(false);
    const [timePassed, setTimePassed] = useState(0);
    const stopTimer = useCallback(() => {
        window.clearInterval(timerId.current);
    }, []);
    const updateProgress = useCallback(() => {
        const passed = Date.now() - start.current;
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
    const startTimer = useCallback(() => {
        start.current = Date.now();
        updateProgress();
        timerId.current = window.setInterval(updateProgress, 50);
    }, [updateProgress]);
    const handleRepeatSmsButtonClick = useCallback((event) => {
        setIsBlockingOver(false);
        if (onOverlimitRepeatSms) {
            onOverlimitRepeatSms(event);
        }
        startTimer();
    }, [onOverlimitRepeatSms, startTimer]);
    useEffect(() => {
        startTimer();
        return () => {
            stopTimer();
        };
    }, [startTimer, stopTimer]);
    const progress = timePassed / duration;
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
