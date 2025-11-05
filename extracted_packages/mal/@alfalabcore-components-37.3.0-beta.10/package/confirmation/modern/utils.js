import { useRef, useState, useCallback, useEffect } from 'react';

/**
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
/**
 * Возвращает время, которое осталось до истечения таймера в ms
 */
const useCountdown = (countdownDuration, tick = 1000) => {
    const timerId = useRef(0);
    const start = useRef(0);
    const [timePassed, setTimePassed] = useState(0);
    const stopTimer = useCallback(() => {
        window.clearInterval(timerId.current);
    }, []);
    const updateProgress = useCallback(() => {
        const passed = Date.now() - start.current;
        if (passed >= countdownDuration) {
            stopTimer();
            setTimePassed(countdownDuration);
        }
        else {
            setTimePassed(passed);
        }
    }, [countdownDuration, stopTimer]);
    const startTimer = useCallback(() => {
        stopTimer();
        start.current = Date.now();
        updateProgress();
        timerId.current = window.setInterval(updateProgress, tick);
    }, [stopTimer, updateProgress, tick]);
    const timeLeft = countdownDuration - timePassed;
    useEffect(() => () => {
        stopTimer();
    }, [stopTimer]);
    return [timeLeft, startTimer, stopTimer];
};
const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_MINUTE = 60 * 1000;
const useConfirmation = ({ state, screen, blockSmsRetry } = {}) => {
    const [confirmationState, setConfirmationState] = useState(state ?? 'INITIAL');
    const [confirmationScreen, setConfirmationScreen] = useState(screen ?? 'INITIAL');
    const [confirmationBlockSmsRetry, setConfirmationBlockSmsRetry] = useState(blockSmsRetry ?? false);
    return {
        confirmationState,
        confirmationScreen,
        confirmationBlockSmsRetry,
        setConfirmationState,
        setConfirmationScreen,
        setConfirmationBlockSmsRetry,
    };
};

export { ONE_DAY, ONE_MINUTE, formatMsAsMinutes, useConfirmation, useCountdown };
