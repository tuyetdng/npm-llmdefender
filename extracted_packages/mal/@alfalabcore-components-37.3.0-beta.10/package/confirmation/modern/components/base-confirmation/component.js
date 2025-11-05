import React, { useEffect } from 'react';
import cn from 'classnames';
import { usePrevious } from '@alfalab/hooks';
import { ConfirmationContext } from '../../context.js';
import { defaultTexts } from '../../types.js';
import { useCountdown, ONE_MINUTE, ONE_DAY } from '../../utils.js';
import { Initial } from '../screens/initial/component.js';
import { Hint } from '../screens/hint/component.js';
import { FatalError } from '../screens/fatal-error/component.js';
import { TempBlock } from '../screens/temp-block/component.js';
import '../../../../button/modern';
import '../../../../code-input/modern';
import '../../../../link/modern';
import '../../../../typography/modern';
import '../header/component.js';
import '../../countdown-section-e6fd8508.js';
import '../../../../loader/modern';
import '../countdown-loader/component.js';

const styles = {"component":"confirmation__component_16tyl"};
require('./index.css');

const confirmationScreens = {
    INITIAL: Initial,
    HINT: Hint,
    FATAL_ERROR: FatalError,
    TEMP_BLOCK: TempBlock,
};
const BaseConfirmation = ({ state, screen, alignContent = 'left', children, requiredCharAmount = 5, countdownDuration = ONE_MINUTE, tempBlockDuration = ONE_DAY, phone, blockSmsRetry, dataTestId, className, getScreensMap, onInputFinished, onChangeState, onSmsRetryClick, onChangeScreen, onFatalErrorOkButtonClick, onTempBlockFinished, mobile, clearCodeOnError = true, ...restProps }) => {
    const [timeLeft, startTimer, stopTimer] = useCountdown(countdownDuration);
    const prevState = usePrevious(state);
    useEffect(() => {
        startTimer();
    }, [startTimer]);
    useEffect(() => {
        /**
         * Перезапускаем таймер после повторного запроса кода
         */
        if (state === 'INITIAL' && prevState === 'CODE_SENDING') {
            startTimer();
        }
    }, [state, prevState, startTimer]);
    useEffect(() => {
        /**
         * Останавливаем таймер, если новый экран/состояние не содержит таймер
         */
        if (!['INITIAL', 'HINT', 'TEMP_BLOCK'].includes(screen) || blockSmsRetry) {
            stopTimer();
        }
    }, [state, screen, blockSmsRetry, stopTimer]);
    const handleSmsRetry = () => {
        onChangeState('CODE_SENDING');
        onSmsRetryClick();
    };
    const handleInputFinished = (code) => {
        onChangeState('CODE_CHECKING');
        onInputFinished(code);
    };
    const handleFatalErrorOkButtonClick = () => {
        if (onFatalErrorOkButtonClick) {
            onFatalErrorOkButtonClick();
        }
    };
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const contextValue = {
        alignContent,
        texts: { ...defaultTexts, ...restProps.texts },
        state,
        screen,
        requiredCharAmount,
        countdownDuration,
        timeLeft,
        tempBlockDuration,
        phone,
        blockSmsRetry,
        onTempBlockFinished,
        onChangeState,
        onChangeScreen,
        clearCodeOnError,
        onInputFinished: handleInputFinished,
        onSmsRetryClick: handleSmsRetry,
        onFatalErrorOkButtonClick: handleFatalErrorOkButtonClick,
    };
    const screensMap = getScreensMap ? getScreensMap(confirmationScreens) : confirmationScreens;
    const CurrentScreen = screensMap[screen];
    return (React.createElement(ConfirmationContext.Provider, { value: contextValue },
        React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId }, CurrentScreen && React.createElement(CurrentScreen, { mobile: mobile }))));
};

export { BaseConfirmation };
