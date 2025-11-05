import React from 'react';
import { CalendarMobile } from '../../calendar/modern';
import { DateTimeInput } from './components/date-time-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../icon-button/modern';
import '../../input/modern';
import '../../popover/modern';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils/format.js';
import 'date-fns/isValid';
import 'date-fns/parse';

const DateTimeInputMobile = (props) => (React.createElement(DateTimeInput, { Calendar: CalendarMobile, view: 'mobile', ...props }));

export { DateTimeInputMobile };
