import { a as __rest, _ as __assign } from './component-32bbfbc1.js';
import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { ConfirmationDesktop } from './component.desktop.js';
import { ConfirmationMobile } from './component.mobile.js';
import 'classnames';
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

var ConfirmationResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React.createElement(ConfirmationDesktop, __assign({}, restProps))) : (React.createElement(ConfirmationMobile, __assign({}, restProps)));
};

export { ConfirmationResponsive };
