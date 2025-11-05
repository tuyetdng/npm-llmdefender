import React from 'react';
import { DateRangeInput } from './components/date-range-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import 'date-fns/isValid';
import '../../calendar/modern';
import '../../icon-button/modern';
import '../../input/modern';
import '../../popover/modern';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CalendarMIcon';
import 'date-fns/parse';
import './utils/format.js';

const DateRangeInputDesktop = (props) => (React.createElement(DateRangeInput, { ...props }));

export { DateRangeInputDesktop };
