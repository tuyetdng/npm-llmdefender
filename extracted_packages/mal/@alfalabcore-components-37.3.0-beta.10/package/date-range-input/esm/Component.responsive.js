import { a as __rest, _ as __assign } from './Component-6b915ca3.js';
import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { DateRangeInputDesktop } from './Component.desktop.js';
import { DateRangeInputMobile } from './Component.mobile.js';
import 'react-merge-refs';
import 'classnames';
import 'date-fns/isValid';
import '../../calendar/esm';
import '../../icon-button/esm';
import '../../input/esm';
import '../../popover/esm';
import '@alfalab/icons-glyph/CalendarMIcon';
import 'date-fns/parse';
import './utils/format.js';

var DateRangeInputResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React.createElement(DateRangeInputDesktop, __assign({}, restProps))) : (React.createElement(DateRangeInputMobile, __assign({}, restProps)));
};

export { DateRangeInputResponsive };
