import { a as __rest, _ as __assign } from './Component-ae2ff721.js';
import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { DateTimeInputDesktop } from './Component.desktop.js';
import { DateTimeInputMobile } from './Component.mobile.js';
import 'react-merge-refs';
import 'classnames';
import '../../calendar/esm';
import '../../icon-button/esm';
import '../../input/esm';
import '../../popover/esm';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils/format.js';
import 'date-fns/isValid';
import 'date-fns/parse';

var DateTimeInputResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React.createElement(DateTimeInputDesktop, __assign({}, restProps))) : (React.createElement(DateTimeInputMobile, __assign({}, restProps)));
};

export { DateTimeInputResponsive };
