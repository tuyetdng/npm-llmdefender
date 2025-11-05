import React, { useRef, useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import { Button } from '../../../../button/modern';
import { usePrevious } from '@alfalab/hooks';
import { phoneNumber } from '@alfalab/utils';
import { CountdownLoader } from '../countdown-loader/component.js';

const styles = {"component":"confirmation-v1__component_1j13p","hasError":"confirmation-v1__hasError_1j13p","getCodeButton":"confirmation-v1__getCodeButton_1j13p","info":"confirmation-v1__info_1j13p","customContent":"confirmation-v1__customContent_1j13p","loaderWrap":"confirmation-v1__loaderWrap_1j13p","loader":"confirmation-v1__loader_1j13p","center":"confirmation-v1__center_1j13p","timePassed":"confirmation-v1__timePassed_1j13p","noAttemptsLeftMessage":"confirmation-v1__noAttemptsLeftMessage_1j13p"};
require('./index.css');

/**
 * TODO: Вынести это в utils
 * Форматирование миллисекунд в hh:mm:ss.
 *
 * @param {Number} ms миллисекунды
 * @returns {String} время в формате mm:ss
 */
function formatMsAsMinutes(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const seconds = totalSeconds % 60;
    const paddedSeconds = `00${seconds}`.slice(-2);
    if (totalHours > 0) {
        const minutes = totalMinutes % 60;
        const paddedMinutes = `00${minutes}`.slice(-2);
        const paddedHours = `00${totalHours}`.slice(-2);
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
    const paddedMinutes = `00${totalMinutes}`.slice(-2);
    return `${paddedMinutes}:${paddedSeconds}`;
}
const Container = ({ alignContent, hasError, children }) => (React.createElement("div", { className: cn(styles.component, styles[alignContent], {
        [styles.hasError]: hasError,
    }) }, children));
const Countdown = ({ duration = 5000, phone = '', hasPhoneMask = true, buttonRetryText, alignContent, noAttemptsLeftMessage, hasError, content, onRepeatSms, onCountdownFinished, }) => {
    const timerId = useRef(0);
    const start = useRef(0);
    const [repeatSmsButtonShow, setRepeatSmsButtonShow] = useState(false);
    const [timePassed, setTimePassed] = useState(0);
    const noAttemptsLeftMessagePrev = usePrevious(noAttemptsLeftMessage);
    const stopTimer = useCallback(() => {
        window.clearInterval(timerId.current);
    }, []);
    const updateProgress = useCallback(() => {
        const passed = Date.now() - start.current;
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
    const startTimer = useCallback(() => {
        start.current = Date.now();
        updateProgress();
        timerId.current = window.setInterval(updateProgress, 50);
    }, [updateProgress]);
    const handleRepeatSmsButtonClick = useCallback((event) => {
        setRepeatSmsButtonShow(false);
        if (onRepeatSms) {
            onRepeatSms(event);
        }
        startTimer();
    }, [onRepeatSms, startTimer]);
    useEffect(() => {
        startTimer();
        return () => {
            stopTimer();
        };
    }, [startTimer, stopTimer]);
    useEffect(() => {
        // Если кончились попытки ввода кода, то останавливаем таймер
        if (!noAttemptsLeftMessagePrev && noAttemptsLeftMessage) {
            stopTimer();
        }
    }, [noAttemptsLeftMessage, noAttemptsLeftMessagePrev, stopTimer]);
    const progress = timePassed / duration;
    const formattedPhone = phoneNumber.format(phone);
    const retryButton = (React.createElement(Button, { size: 'xs', view: 'secondary', onClick: handleRepeatSmsButtonClick, className: styles.getCodeButton }, buttonRetryText));
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
