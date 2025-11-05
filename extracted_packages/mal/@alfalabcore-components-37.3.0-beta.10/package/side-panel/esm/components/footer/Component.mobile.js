import { _ as __rest, a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React from 'react';
import cn from 'classnames';
import { Footer } from './Component.js';
import '../../../../base-modal/esm';
import '../../Context.js';

var styles = {"footer":"side-panel__footer_cw0sg","sticky":"side-panel__sticky_cw0sg"};
require('./mobile.css');

var FooterMobile = function (_a) {
    var _b;
    var className = _a.className, sticky = _a.sticky, restProps = __rest(_a, ["className", "sticky"]);
    return (React.createElement(Footer, __assign({ className: cn(className, styles.footer, (_b = {},
            _b[styles.sticky] = sticky,
            _b)), sticky: sticky }, restProps)));
};

export { FooterMobile };
