import { D as DateTimeInput, _ as __assign } from './Component-ae2ff721.js';
import React from 'react';
import { CalendarMobile } from '../../calendar/esm';
import 'react-merge-refs';
import 'classnames';
import '../../icon-button/esm';
import '../../input/esm';
import '../../popover/esm';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils/format.js';
import 'date-fns/isValid';
import 'date-fns/parse';

var DateTimeInputMobile = function (props) { return (React.createElement(DateTimeInput, __assign({ Calendar: CalendarMobile, view: 'mobile' }, props))); };

export { DateTimeInputMobile };
