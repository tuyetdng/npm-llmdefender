import React, { useContext } from 'react';
import cn from 'classnames';
import { Button } from '../../../../../button/modern';
import { Typography } from '../../../../../typography/modern';
import { ConfirmationContext } from '../../../context.js';
import { Header } from '../../header/component.js';
import '../../../utils.js';

const styles = {"component":"confirmation__component_1n8wj","typographyTheme":"confirmation__typographyTheme_1n8wj","left":"confirmation__left_1n8wj","center":"confirmation__center_1n8wj","button":"confirmation__button_1n8wj"};
require('./index.css');

const FatalError = ({ mobile }) => {
    const { alignContent, texts, onFatalErrorOkButtonClick } = useContext(ConfirmationContext);
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        React.createElement(Header, { mobile: mobile }, texts.fatalErrorTitle),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn({ [styles.typographyTheme]: !mobile }) }, texts.fatalErrorDescription),
        React.createElement(Button, { size: mobile ? 'xs' : 's', view: 'secondary', onClick: onFatalErrorOkButtonClick, className: styles.button }, texts.fatalErrorButton)));
};

export { FatalError };
