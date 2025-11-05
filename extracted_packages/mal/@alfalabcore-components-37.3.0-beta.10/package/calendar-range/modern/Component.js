import React from 'react';
import { CalendarRangePopover } from './views/popover.js';
import { CalendarRangeStatic } from './views/static.js';
import 'classnames';
import 'date-fns/startOfMonth';
import '../../calendar-input/modern';
import '../../date-input/modern';
import './components/divider/Component.js';
import 'date-fns/addMonths';
import 'date-fns/isEqual';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/subMonths';
import './index.module-249f068b.js';
import 'date-fns/endOfMonth';
import '../../calendar/modern';
import './hooks.js';
import './utils.js';

const CalendarRange = ({ calendarPosition = 'static', ...restProps }) => {
    const View = calendarPosition === 'popover' ? CalendarRangePopover : CalendarRangeStatic;
    return React.createElement(View, { ...restProps });
};

export { CalendarRange };
