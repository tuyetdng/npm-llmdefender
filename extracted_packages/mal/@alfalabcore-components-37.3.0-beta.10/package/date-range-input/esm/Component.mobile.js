import { D as DateRangeInput, _ as __assign } from './Component-6b915ca3.js';
import React from 'react';
import { CalendarMobile } from '../../calendar/esm';
import 'react-merge-refs';
import 'classnames';
import 'date-fns/isValid';
import '../../icon-button/esm';
import '../../input/esm';
import '../../popover/esm';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CalendarMIcon';
import 'date-fns/parse';
import './utils/format.js';

var DateRangeInputMobile = function (props) { return (React.createElement(DateRangeInput, __assign({ Calendar: CalendarMobile, view: 'mobile' }, props))); };

export { DateRangeInputMobile };
