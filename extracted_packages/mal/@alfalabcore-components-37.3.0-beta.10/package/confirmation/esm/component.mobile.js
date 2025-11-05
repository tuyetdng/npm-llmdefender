import { a as __rest, B as BaseConfirmation, _ as __assign } from './component-32bbfbc1.js';
import React from 'react';
import cn from 'classnames';
import '@alfalab/hooks';
import './context.js';
import '../../button/esm';
import '../../code-input/esm';
import '../../link/esm';
import '../../typography/esm';
import './components/header/component.js';
import './countdown-section-8814b585.js';
import '../../loader/esm';
import './components/screens/hint/component.js';
import './components/screens/fatal-error/component.js';
import './components/screens/temp-block/component.js';
import './components/countdown-loader/component.js';
import './types.js';
import './utils.js';
import './components/screens/initial/component.js';

var styles = {"container":"confirmation__container_n8i7v"};
require('./mobile.css');

var ConfirmationMobile = function (_a) {
    var className = _a.className, resProps = __rest(_a, ["className"]);
    return (React.createElement(BaseConfirmation, __assign({ mobile: true, className: cn(className, styles.container) }, resProps)));
};

export { ConfirmationMobile };
