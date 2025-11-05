import React, { useContext } from 'react';
import cn from 'classnames';
import { Button } from '../../../../../button/esm';
import { Typography } from '../../../../../typography/esm';
import { ConfirmationContext } from '../../../context.js';
import { Header } from '../../header/component.js';
import '../../../utils.js';

var styles = {"component":"confirmation__component_1n8wj","typographyTheme":"confirmation__typographyTheme_1n8wj","left":"confirmation__left_1n8wj","center":"confirmation__center_1n8wj","button":"confirmation__button_1n8wj"};
require('./index.css');

var FatalError = function (_a) {
    var _b;
    var mobile = _a.mobile;
    var _c = useContext(ConfirmationContext), alignContent = _c.alignContent, texts = _c.texts, onFatalErrorOkButtonClick = _c.onFatalErrorOkButtonClick;
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        React.createElement(Header, { mobile: mobile }, texts.fatalErrorTitle),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn((_b = {}, _b[styles.typographyTheme] = !mobile, _b)) }, texts.fatalErrorDescription),
        React.createElement(Button, { size: mobile ? 'xs' : 's', view: 'secondary', onClick: onFatalErrorOkButtonClick, className: styles.button }, texts.fatalErrorButton)));
};

export { FatalError };
