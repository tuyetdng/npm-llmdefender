import React, { useEffect } from 'react';
import cn from 'classnames';
import { usePrevious } from '@alfalab/hooks';
import { ConfirmationContext } from './context.js';
import { defaultTexts } from './types.js';
import { useCountdown, ONE_MINUTE, ONE_DAY } from './utils.js';
import { Initial } from './components/screens/initial/component.js';
import { Hint } from './components/screens/hint/component.js';
import { FatalError } from './components/screens/fatal-error/component.js';
import { TempBlock } from './components/screens/temp-block/component.js';
import '../../button/esm';
import '../../code-input/esm';
import '../../link/esm';
import '../../typography/esm';
import './components/header/component.js';
import './countdown-section-8814b585.js';
import '../../loader/esm';
import './components/countdown-loader/component.js';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var styles = {"component":"confirmation__component_16tyl"};
require('./components/base-confirmation/index.css');

var confirmationScreens = {
    INITIAL: Initial,
    HINT: Hint,
    FATAL_ERROR: FatalError,
    TEMP_BLOCK: TempBlock,
};
var BaseConfirmation = function (_a) {
    var state = _a.state, screen = _a.screen, _b = _a.alignContent, alignContent = _b === void 0 ? 'left' : _b; _a.children; var _c = _a.requiredCharAmount, requiredCharAmount = _c === void 0 ? 5 : _c, _d = _a.countdownDuration, countdownDuration = _d === void 0 ? ONE_MINUTE : _d, _e = _a.tempBlockDuration, tempBlockDuration = _e === void 0 ? ONE_DAY : _e, phone = _a.phone, blockSmsRetry = _a.blockSmsRetry, dataTestId = _a.dataTestId, className = _a.className, getScreensMap = _a.getScreensMap, onInputFinished = _a.onInputFinished, onChangeState = _a.onChangeState, onSmsRetryClick = _a.onSmsRetryClick, onChangeScreen = _a.onChangeScreen, onFatalErrorOkButtonClick = _a.onFatalErrorOkButtonClick, onTempBlockFinished = _a.onTempBlockFinished, mobile = _a.mobile, _f = _a.clearCodeOnError, clearCodeOnError = _f === void 0 ? true : _f, restProps = __rest(_a, ["state", "screen", "alignContent", "children", "requiredCharAmount", "countdownDuration", "tempBlockDuration", "phone", "blockSmsRetry", "dataTestId", "className", "getScreensMap", "onInputFinished", "onChangeState", "onSmsRetryClick", "onChangeScreen", "onFatalErrorOkButtonClick", "onTempBlockFinished", "mobile", "clearCodeOnError"]);
    var _g = useCountdown(countdownDuration), timeLeft = _g[0], startTimer = _g[1], stopTimer = _g[2];
    var prevState = usePrevious(state);
    useEffect(function () {
        startTimer();
    }, [startTimer]);
    useEffect(function () {
        /**
         * Перезапускаем таймер после повторного запроса кода
         */
        if (state === 'INITIAL' && prevState === 'CODE_SENDING') {
            startTimer();
        }
    }, [state, prevState, startTimer]);
    useEffect(function () {
        /**
         * Останавливаем таймер, если новый экран/состояние не содержит таймер
         */
        if (!['INITIAL', 'HINT', 'TEMP_BLOCK'].includes(screen) || blockSmsRetry) {
            stopTimer();
        }
    }, [state, screen, blockSmsRetry, stopTimer]);
    var handleSmsRetry = function () {
        onChangeState('CODE_SENDING');
        onSmsRetryClick();
    };
    var handleInputFinished = function (code) {
        onChangeState('CODE_CHECKING');
        onInputFinished(code);
    };
    var handleFatalErrorOkButtonClick = function () {
        if (onFatalErrorOkButtonClick) {
            onFatalErrorOkButtonClick();
        }
    };
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    var contextValue = {
        alignContent: alignContent,
        texts: __assign(__assign({}, defaultTexts), restProps.texts),
        state: state,
        screen: screen,
        requiredCharAmount: requiredCharAmount,
        countdownDuration: countdownDuration,
        timeLeft: timeLeft,
        tempBlockDuration: tempBlockDuration,
        phone: phone,
        blockSmsRetry: blockSmsRetry,
        onTempBlockFinished: onTempBlockFinished,
        onChangeState: onChangeState,
        onChangeScreen: onChangeScreen,
        clearCodeOnError: clearCodeOnError,
        onInputFinished: handleInputFinished,
        onSmsRetryClick: handleSmsRetry,
        onFatalErrorOkButtonClick: handleFatalErrorOkButtonClick,
    };
    var screensMap = getScreensMap ? getScreensMap(confirmationScreens) : confirmationScreens;
    var CurrentScreen = screensMap[screen];
    return (React.createElement(ConfirmationContext.Provider, { value: contextValue },
        React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId }, CurrentScreen && React.createElement(CurrentScreen, { mobile: mobile }))));
};

export { BaseConfirmation as B, __assign as _, __rest as a };
