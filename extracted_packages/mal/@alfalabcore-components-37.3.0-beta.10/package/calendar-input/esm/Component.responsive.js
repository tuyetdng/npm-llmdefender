import { a as __rest, _ as __assign } from './Component-c0c7ebc3.js';
import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { CalendarInputDesktop } from './Component.desktop.js';
import { CalendarInputMobile } from './Component.mobile.js';
import 'react-merge-refs';
import 'classnames';
import '../../calendar/esm';
import '../../date-input/esm';
import '../../popover/esm';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils.js';
import 'date-fns/format';
import 'date-fns/isSameDay';
import 'date-fns/parse';

var CalendarInputResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React.createElement(CalendarInputDesktop, __assign({}, restProps))) : (React.createElement(CalendarInputMobile, __assign({}, restProps)));
};

export { CalendarInputResponsive };
