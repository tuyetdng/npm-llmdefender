var React = require('react');
var cn = require('classnames');
var hooks = require('@alfalab/hooks');
var context = require('./context.js');
var types = require('./types.js');
var utils = require('./utils.js');
var components_screens_initial_component = require('./components/screens/initial/component.js');
var components_screens_hint_component = require('./components/screens/hint/component.js');
var components_screens_fatalError_component = require('./components/screens/fatal-error/component.js');
var components_screens_tempBlock_component = require('./components/screens/temp-block/component.js');
var styles = require('./components/base-confirmation/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

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
exports.__assign = function () {
    exports.__assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return exports.__assign.apply(this, arguments);
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

var confirmationScreens = {
    INITIAL: components_screens_initial_component.Initial,
    HINT: components_screens_hint_component.Hint,
    FATAL_ERROR: components_screens_fatalError_component.FatalError,
    TEMP_BLOCK: components_screens_tempBlock_component.TempBlock,
};
var BaseConfirmation = function (_a) {
    var state = _a.state, screen = _a.screen, _b = _a.alignContent, alignContent = _b === void 0 ? 'left' : _b; _a.children; var _c = _a.requiredCharAmount, requiredCharAmount = _c === void 0 ? 5 : _c, _d = _a.countdownDuration, countdownDuration = _d === void 0 ? utils.ONE_MINUTE : _d, _e = _a.tempBlockDuration, tempBlockDuration = _e === void 0 ? utils.ONE_DAY : _e, phone = _a.phone, blockSmsRetry = _a.blockSmsRetry, dataTestId = _a.dataTestId, className = _a.className, getScreensMap = _a.getScreensMap, onInputFinished = _a.onInputFinished, onChangeState = _a.onChangeState, onSmsRetryClick = _a.onSmsRetryClick, onChangeScreen = _a.onChangeScreen, onFatalErrorOkButtonClick = _a.onFatalErrorOkButtonClick, onTempBlockFinished = _a.onTempBlockFinished, mobile = _a.mobile, _f = _a.clearCodeOnError, clearCodeOnError = _f === void 0 ? true : _f, restProps = __rest(_a, ["state", "screen", "alignContent", "children", "requiredCharAmount", "countdownDuration", "tempBlockDuration", "phone", "blockSmsRetry", "dataTestId", "className", "getScreensMap", "onInputFinished", "onChangeState", "onSmsRetryClick", "onChangeScreen", "onFatalErrorOkButtonClick", "onTempBlockFinished", "mobile", "clearCodeOnError"]);
    var _g = utils.useCountdown(countdownDuration), timeLeft = _g[0], startTimer = _g[1], stopTimer = _g[2];
    var prevState = hooks.usePrevious(state);
    React.useEffect(function () {
        startTimer();
    }, [startTimer]);
    React.useEffect(function () {
        /**
         * Перезапускаем таймер после повторного запроса кода
         */
        if (state === 'INITIAL' && prevState === 'CODE_SENDING') {
            startTimer();
        }
    }, [state, prevState, startTimer]);
    React.useEffect(function () {
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
        texts: exports.__assign(exports.__assign({}, types.defaultTexts), restProps.texts),
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
    return (React__default.default.createElement(context.ConfirmationContext.Provider, { value: contextValue },
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, className), "data-test-id": dataTestId }, CurrentScreen && React__default.default.createElement(CurrentScreen, { mobile: mobile }))));
};

exports.BaseConfirmation = BaseConfirmation;
exports.__rest = __rest;
