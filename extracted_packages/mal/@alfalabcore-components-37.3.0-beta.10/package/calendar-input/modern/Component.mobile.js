import React from 'react';
import { CalendarMobile } from '../../calendar/modern';
import { CalendarInput } from './components/calendar-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../date-input/modern';
import '../../popover/modern';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils.js';
import 'date-fns/format';
import 'date-fns/isSameDay';
import 'date-fns/parse';

const CalendarInputMobile = (props) => (React.createElement(CalendarInput, { Calendar: CalendarMobile, view: 'mobile', ...props }));

export { CalendarInputMobile };
