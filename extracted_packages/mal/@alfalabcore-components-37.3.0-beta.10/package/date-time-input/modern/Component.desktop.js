import React from 'react';
import { DateTimeInput } from './components/date-time-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../calendar/modern';
import '../../icon-button/modern';
import '../../input/modern';
import '../../popover/modern';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils/format.js';
import 'date-fns/isValid';
import 'date-fns/parse';

const DateTimeInputDesktop = (props) => (React.createElement(DateTimeInput, { ...props }));

export { DateTimeInputDesktop };
