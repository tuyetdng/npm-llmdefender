import React, { useContext, useRef, useState, useCallback, useEffect, useLayoutEffect } from 'react';
import cn from 'classnames';
import { Button } from '../../../../../button/modern';
import { CodeInput } from '../../../../../code-input/modern';
import { Link } from '../../../../../link/modern';
import { Typography } from '../../../../../typography/modern';
import { usePrevious } from '@alfalab/hooks';
import { ConfirmationContext } from '../../../context.js';
import { Header } from '../../header/component.js';
import { s as styles, C as CountdownSection } from '../../../countdown-section-e6fd8508.js';
import '../../../../../loader/modern';
import '../../../utils.js';

const CODE_SEND_HINT_VISIBLE_DURATION = 2000;
const Initial = ({ mobile }) => {
    const { state, alignContent, texts, requiredCharAmount, timeLeft, phone, clearCodeOnError, onChangeState, onInputFinished, onChangeScreen, onSmsRetryClick, } = useContext(ConfirmationContext);
    const prevState = usePrevious(state);
    const inputRef = useRef(null);
    const [codeSendHintVisible, setCodeSendHintVisible] = useState(false);
    const timerId = useRef(0);
    const handleInputComplete = (code) => {
        onInputFinished(code);
    };
    const handleSmsHintLinkClick = () => {
        onChangeScreen('HINT');
    };
    const handleInputChange = () => {
        if (state === 'CODE_ERROR') {
            onChangeState('INITIAL');
        }
    };
    const handleSmsRetryClick = () => {
        if (inputRef.current) {
            inputRef.current.reset();
        }
        onSmsRetryClick();
    };
    const handleErrorAnimationEnd = () => {
        if (clearCodeOnError && state !== 'INITIAL') {
            onChangeState('INITIAL');
        }
    };
    const clearTimer = useCallback(() => {
        window.clearTimeout(timerId.current);
    }, []);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        return () => {
            clearTimer();
        };
    }, [clearTimer]);
    useEffect(() => {
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
    useLayoutEffect(() => {
        if (prevState === 'CODE_SENDING' && state !== 'CODE_SENDING') {
            setCodeSendHintVisible(true);
            clearTimer();
            timerId.current = window.setTimeout(() => {
                setCodeSendHintVisible(false);
            }, CODE_SEND_HINT_VISIBLE_DURATION);
        }
    }, [prevState, state, clearTimer]);
    const getCodeInputError = () => {
        if (state === 'CODE_ERROR') {
            return texts.codeError || true;
        }
        return false;
    };
    const processing = ['CODE_CHECKING', 'CODE_SENDING'].includes(state);
    const timePassed = timeLeft === 0;
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        React.createElement(Header, { mobile: mobile }, texts.title),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.phone, { [styles.typographyTheme]: !mobile }) },
            "\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 ",
            phone),
        React.createElement(CodeInput, { disabled: processing, error: getCodeInputError(), ref: inputRef, fields: requiredCharAmount, className: cn(styles.containerInput, styles.codeInput), onComplete: handleInputComplete, onChange: handleInputChange, clearCodeOnError: clearCodeOnError, onErrorAnimationEnd: handleErrorAnimationEnd }),
        React.createElement(CountdownSection, { processing: processing, timePassed: timePassed, codeSendHintVisible: codeSendHintVisible, handleSmsRetryClick: handleSmsRetryClick, mobile: mobile }),
        mobile ? (React.createElement(Button, { onClick: handleSmsHintLinkClick, view: 'link', size: 'xs' }, texts.linkToHint)) : (React.createElement(Link, { onClick: handleSmsHintLinkClick, className: styles.smsComeLink, view: mobile ? 'primary' : 'secondary', pseudo: true }, texts.linkToHint))));
};

export { Initial };
