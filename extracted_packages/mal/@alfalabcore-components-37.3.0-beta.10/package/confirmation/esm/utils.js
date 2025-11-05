import { useRef, useState, useCallback, useEffect } from 'react';

/**
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
/**
 * Возвращает время, которое осталось до истечения таймера в ms
 */
var useCountdown = function (countdownDuration, tick) {
    if (tick === void 0) { tick = 1000; }
    var timerId = useRef(0);
    var start = useRef(0);
    var _a = useState(0), timePassed = _a[0], setTimePassed = _a[1];
    var stopTimer = useCallback(function () {
        window.clearInterval(timerId.current);
    }, []);
    var updateProgress = useCallback(function () {
        var passed = Date.now() - start.current;
        if (passed >= countdownDuration) {
            stopTimer();
            setTimePassed(countdownDuration);
        }
        else {
            setTimePassed(passed);
        }
    }, [countdownDuration, stopTimer]);
    var startTimer = useCallback(function () {
        stopTimer();
        start.current = Date.now();
        updateProgress();
        timerId.current = window.setInterval(updateProgress, tick);
    }, [stopTimer, updateProgress, tick]);
    var timeLeft = countdownDuration - timePassed;
    useEffect(function () { return function () {
        stopTimer();
    }; }, [stopTimer]);
    return [timeLeft, startTimer, stopTimer];
};
var ONE_DAY = 24 * 60 * 60 * 1000;
var ONE_MINUTE = 60 * 1000;
var useConfirmation = function (_a) {
    var _b = _a === void 0 ? {} : _a, state = _b.state, screen = _b.screen, blockSmsRetry = _b.blockSmsRetry;
    var _c = useState(state !== null && state !== void 0 ? state : 'INITIAL'), confirmationState = _c[0], setConfirmationState = _c[1];
    var _d = useState(screen !== null && screen !== void 0 ? screen : 'INITIAL'), confirmationScreen = _d[0], setConfirmationScreen = _d[1];
    var _e = useState(blockSmsRetry !== null && blockSmsRetry !== void 0 ? blockSmsRetry : false), confirmationBlockSmsRetry = _e[0], setConfirmationBlockSmsRetry = _e[1];
    return {
        confirmationState: confirmationState,
        confirmationScreen: confirmationScreen,
        confirmationBlockSmsRetry: confirmationBlockSmsRetry,
        setConfirmationState: setConfirmationState,
        setConfirmationScreen: setConfirmationScreen,
        setConfirmationBlockSmsRetry: setConfirmationBlockSmsRetry,
    };
};

export { ONE_DAY, ONE_MINUTE, formatMsAsMinutes, useConfirmation, useCountdown };
