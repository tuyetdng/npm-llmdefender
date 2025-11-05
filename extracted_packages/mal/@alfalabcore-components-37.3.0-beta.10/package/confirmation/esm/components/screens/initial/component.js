import React, { useContext, useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import cn from 'classnames';
import { Button } from '../../../../../button/esm';
import { CodeInput } from '../../../../../code-input/esm';
import { Link } from '../../../../../link/esm';
import { Typography } from '../../../../../typography/esm';
import { usePrevious } from '@alfalab/hooks';
import { ConfirmationContext } from '../../../context.js';
import { Header } from '../../header/component.js';
import { s as styles, C as CountdownSection } from '../../../countdown-section-8814b585.js';
import '../../../../../loader/esm';
import '../../../utils.js';

var CODE_SEND_HINT_VISIBLE_DURATION = 2000;
var Initial = function (_a) {
    var _b;
    var mobile = _a.mobile;
    var _c = useContext(ConfirmationContext), state = _c.state, alignContent = _c.alignContent, texts = _c.texts, requiredCharAmount = _c.requiredCharAmount, timeLeft = _c.timeLeft, phone = _c.phone, clearCodeOnError = _c.clearCodeOnError, onChangeState = _c.onChangeState, onInputFinished = _c.onInputFinished, onChangeScreen = _c.onChangeScreen, onSmsRetryClick = _c.onSmsRetryClick;
    var prevState = usePrevious(state);
    var inputRef = useRef(null);
    var _d = useState(false), codeSendHintVisible = _d[0], setCodeSendHintVisible = _d[1];
    var timerId = useRef(0);
    var handleInputComplete = function (code) {
        onInputFinished(code);
    };
    var handleSmsHintLinkClick = function () {
        onChangeScreen('HINT');
    };
    var handleInputChange = function () {
        if (state === 'CODE_ERROR') {
            onChangeState('INITIAL');
        }
    };
    var handleSmsRetryClick = function () {
        if (inputRef.current) {
            inputRef.current.reset();
        }
        onSmsRetryClick();
    };
    var handleErrorAnimationEnd = function () {
        if (clearCodeOnError && state !== 'INITIAL') {
            onChangeState('INITIAL');
        }
    };
    var clearTimer = useCallback(function () {
        window.clearTimeout(timerId.current);
    }, []);
    useEffect(function () {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        return function () {
            clearTimer();
        };
    }, [clearTimer]);
    useEffect(function () {
        if (!inputRef.current) {
            return;
        }
        if (state === 'CODE_ERROR' && prevState !== 'CODE_ERROR') {
            inputRef.current.focus(requiredCharAmount - 1);
        }
        if (prevState === 'CODE_SENDING' && state !== 'CODE_SENDING') {
            inputRef.current.focus();
        }
    }, [prevState, state, requiredCharAmount]);
    useLayoutEffect(function () {
        if (prevState === 'CODE_SENDING' && state !== 'CODE_SENDING') {
            setCodeSendHintVisible(true);
            clearTimer();
            timerId.current = window.setTimeout(function () {
                setCodeSendHintVisible(false);
            }, CODE_SEND_HINT_VISIBLE_DURATION);
        }
    }, [prevState, state, clearTimer]);
    var getCodeInputError = function () {
        if (state === 'CODE_ERROR') {
            return texts.codeError || true;
        }
        return false;
    };
    var processing = ['CODE_CHECKING', 'CODE_SENDING'].includes(state);
    var timePassed = timeLeft === 0;
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        React.createElement(Header, { mobile: mobile }, texts.title),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.phone, (_b = {}, _b[styles.typographyTheme] = !mobile, _b)) },
            "\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 ",
            phone),
        React.createElement(CodeInput, { disabled: processing, error: getCodeInputError(), ref: inputRef, fields: requiredCharAmount, className: cn(styles.containerInput, styles.codeInput), onComplete: handleInputComplete, onChange: handleInputChange, clearCodeOnError: clearCodeOnError, onErrorAnimationEnd: handleErrorAnimationEnd }),
        React.createElement(CountdownSection, { processing: processing, timePassed: timePassed, codeSendHintVisible: codeSendHintVisible, handleSmsRetryClick: handleSmsRetryClick, mobile: mobile }),
        mobile ? (React.createElement(Button, { onClick: handleSmsHintLinkClick, view: 'link', size: 'xs' }, texts.linkToHint)) : (React.createElement(Link, { onClick: handleSmsHintLinkClick, className: styles.smsComeLink, view: mobile ? 'primary' : 'secondary', pseudo: true }, texts.linkToHint))));
};

export { Initial };
