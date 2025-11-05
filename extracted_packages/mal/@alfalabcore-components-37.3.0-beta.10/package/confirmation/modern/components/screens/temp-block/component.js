import React, { useContext, useEffect } from 'react';
import cn from 'classnames';
import { Typography } from '../../../../../typography/modern';
import { ConfirmationContext } from '../../../context.js';
import { useCountdown, formatMsAsMinutes } from '../../../utils.js';
import { CountdownLoader } from '../../countdown-loader/component.js';
import { Header } from '../../header/component.js';

const styles = {"component":"confirmation__component_1ydrb","center":"confirmation__center_1ydrb","typographyTheme":"confirmation__typographyTheme_1ydrb","description":"confirmation__description_1ydrb","countdownWrap":"confirmation__countdownWrap_1ydrb","loader":"confirmation__loader_1ydrb"};
require('./index.css');

const TempBlock = ({ mobile }) => {
    const { alignContent, texts, tempBlockDuration, onChangeScreen, onTempBlockFinished } = useContext(ConfirmationContext);
    const [timeLeft, startTimer] = useCountdown(tempBlockDuration);
    useEffect(() => {
        startTimer();
    }, [startTimer]);
    useEffect(() => {
        if (timeLeft === 0 && onTempBlockFinished) {
            onTempBlockFinished();
        }
    }, [timeLeft, onChangeScreen, onTempBlockFinished]);
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        React.createElement(Header, { mobile: mobile }, texts.tempBlockTitle),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.description, { [styles.typographyTheme]: !mobile }) }, texts.tempBlockDescription),
        React.createElement("div", { className: cn(styles.countdownWrap, { [styles.typographyTheme]: !mobile }) },
            React.createElement(CountdownLoader, { progress: 1 - timeLeft / tempBlockDuration, className: styles.loader }),
            formatMsAsMinutes(timeLeft))));
};

export { TempBlock };
