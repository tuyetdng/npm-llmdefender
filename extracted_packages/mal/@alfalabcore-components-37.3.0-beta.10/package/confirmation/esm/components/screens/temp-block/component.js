import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { Typography } from '../../../../../typography/esm';
import { ConfirmationContext } from '../../../context.js';
import { useCountdown, formatMsAsMinutes } from '../../../utils.js';
import { CountdownLoader } from '../../countdown-loader/component.js';
import { Header } from '../../header/component.js';

var styles = {"component":"confirmation__component_1ydrb","center":"confirmation__center_1ydrb","typographyTheme":"confirmation__typographyTheme_1ydrb","description":"confirmation__description_1ydrb","countdownWrap":"confirmation__countdownWrap_1ydrb","loader":"confirmation__loader_1ydrb"};
require('./index.css');

var TempBlock = function (_a) {
    var _b, _c;
    var mobile = _a.mobile;
    var _d = useContext(ConfirmationContext), alignContent = _d.alignContent, texts = _d.texts, tempBlockDuration = _d.tempBlockDuration, onChangeScreen = _d.onChangeScreen, onTempBlockFinished = _d.onTempBlockFinished;
    var _e = useCountdown(tempBlockDuration), timeLeft = _e[0], startTimer = _e[1];
    useEffect(function () {
        startTimer();
    }, [startTimer]);
    useEffect(function () {
        if (timeLeft === 0 && onTempBlockFinished) {
            onTempBlockFinished();
        }
    }, [timeLeft, onChangeScreen, onTempBlockFinished]);
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        React.createElement(Header, { mobile: mobile }, texts.tempBlockTitle),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.description, (_b = {}, _b[styles.typographyTheme] = !mobile, _b)) }, texts.tempBlockDescription),
        React.createElement("div", { className: cn(styles.countdownWrap, (_c = {}, _c[styles.typographyTheme] = !mobile, _c)) },
            React.createElement(CountdownLoader, { progress: 1 - timeLeft / tempBlockDuration, className: styles.loader }),
            formatMsAsMinutes(timeLeft))));
};

export { TempBlock };
