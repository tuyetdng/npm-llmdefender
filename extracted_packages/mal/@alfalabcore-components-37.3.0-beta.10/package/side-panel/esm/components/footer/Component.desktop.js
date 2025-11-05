import { _ as __rest, a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React from 'react';
import cn from 'classnames';
import { Footer } from './Component.js';
import '../../../../base-modal/esm';
import '../../Context.js';

var styles = {"sticky":"side-panel__sticky_1len3","s":"side-panel__s_1len3"};
require('./desktop.css');

var FooterDesktop = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, className = _a.className, sticky = _a.sticky, restProps = __rest(_a, ["size", "className", "sticky"]);
    return (React.createElement(Footer, __assign({ className: cn(className, size && styles[size], (_b = {},
            _b[styles.sticky] = sticky,
            _b)), sticky: sticky }, restProps)));
};

export { FooterDesktop };
