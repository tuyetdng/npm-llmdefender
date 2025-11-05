import { _ as __rest, a as __assign } from './index.module-3369c8fe.js';
import React from 'react';
import { CalendarRangePopover } from './views/popover.js';
import { CalendarRangeStatic } from './views/static.js';
import 'classnames';
import 'date-fns/startOfMonth';
import '../../calendar-input/esm';
import '../../date-input/esm';
import './components/divider/Component.js';
import 'date-fns/addMonths';
import 'date-fns/isEqual';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/subMonths';
import 'date-fns/endOfMonth';
import '../../calendar/esm';
import './hooks.js';
import './utils.js';

var CalendarRange = function (_a) {
    var _b = _a.calendarPosition, calendarPosition = _b === void 0 ? 'static' : _b, restProps = __rest(_a, ["calendarPosition"]);
    var View = calendarPosition === 'popover' ? CalendarRangePopover : CalendarRangeStatic;
    return React.createElement(View, __assign({}, restProps));
};

export { CalendarRange };
