import React from 'react';
import { CalendarInput } from './components/calendar-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../calendar/modern';
import '../../date-input/modern';
import '../../popover/modern';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils.js';
import 'date-fns/format';
import 'date-fns/isSameDay';
import 'date-fns/parse';

const CalendarInputDesktop = (props) => (React.createElement(CalendarInput, { ...props }));

export { CalendarInputDesktop };
