import React from 'react';
import cn from 'classnames';
import { Typography } from '../../../../typography/esm';

var styles = {"header":"confirmation__header_46n9r","typography":"confirmation__typography_46n9r","typographyMobile":"confirmation__typographyMobile_46n9r"};
require('./index.css');

var Header = function (_a) {
    var _b;
    var mobile = _a.mobile, children = _a.children;
    return (React.createElement(Typography.Title, { className: cn(styles.header, styles.typography, (_b = {}, _b[styles.typographyMobile] = mobile, _b)), tag: 'h3', color: 'primary' }, children));
};

export { Header };
