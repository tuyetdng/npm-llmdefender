import React, { useContext } from 'react';
import cn from 'classnames';
import { Button } from '../../button/modern';
import { Loader } from '../../loader/modern';
import { Typography } from '../../typography/modern';
import { ConfirmationContext } from './context.js';
import { formatMsAsMinutes } from './utils.js';

const styles = {"component":"confirmation__component_pteqq","typographyTheme":"confirmation__typographyTheme_pteqq","phone":"confirmation__phone_pteqq","compact":"confirmation__compact_pteqq","loaderWrap":"confirmation__loaderWrap_pteqq","left":"confirmation__left_pteqq","center":"confirmation__center_pteqq","codeInput":"confirmation__codeInput_pteqq","smsComeLink":"confirmation__smsComeLink_pteqq","countdownContainer":"confirmation__countdownContainer_pteqq","countdownMobile":"confirmation__countdownMobile_pteqq","countdownLoaderMobile":"confirmation__countdownLoaderMobile_pteqq","getCodeButton":"confirmation__getCodeButton_pteqq","getCodeButtonMobile":"confirmation__getCodeButtonMobile_pteqq","containerInput":"confirmation__containerInput_pteqq"};
require('./components/screens/initial/index.css');

const CountdownSection = ({ codeSendHintVisible, timePassed, processing, mobile, handleSmsRetryClick, }) => {
    const { state, texts, timeLeft, blockSmsRetry } = useContext(ConfirmationContext);
    const renderText = (text) => (React.createElement(Typography.Text, { className: cn(styles.countdownContainer, {
            [styles.countdownMobile]: mobile,
            [styles.typographyTheme]: !mobile,
        }), view: mobile ? 'primary-small' : 'primary-medium', tag: 'div' }, text));
    if (codeSendHintVisible)
        return renderText(texts.codeSended);
    if (processing) {
        return (React.createElement("div", { className: cn(styles.loaderWrap, styles.countdownContainer, {
                [styles.countdownLoaderMobile]: mobile,
                [styles.typographyTheme]: !mobile,
            }) },
            React.createElement(Loader, null),
            React.createElement("span", { className: styles.loaderText }, state === 'CODE_CHECKING' ? texts.codeChecking : texts.codeSending)));
    }
    if (blockSmsRetry)
        return renderText(texts.noAttemptsLeft);
    if (timePassed) {
        return (React.createElement(Button, { size: mobile ? 'xs' : 'xxs', view: 'secondary', onClick: handleSmsRetryClick, className: cn(styles.getCodeButton, { [styles.getCodeButtonMobile]: mobile }) }, texts.buttonRetry));
    }
    return renderText(`${texts.countdown} ${formatMsAsMinutes(timeLeft)}`);
};

export { CountdownSection as C, styles as s };
