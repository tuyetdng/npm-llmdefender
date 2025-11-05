import { _ as __rest, a as __assign } from '../../tslib.es6-46a2fd0f.js';
import React from 'react';
import cn from 'classnames';
import { Content } from './Component.js';
import '../../../../base-modal/esm';
import '../../Context.js';

var styles = {"s":"side-panel__s_8a8xv"};
require('./desktop.css');

var ContentDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, className = _a.className, restProps = __rest(_a, ["size", "className"]);
    return React.createElement(Content, __assign({ className: cn(className, size && styles[size]) }, restProps));
};

export { ContentDesktop };
