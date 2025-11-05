import React from 'react';
import { CalendarMobile } from '../../calendar/modern';
import { DateRangeInput } from './components/date-range-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import 'date-fns/isValid';
import '../../icon-button/modern';
import '../../input/modern';
import '../../popover/modern';
import '@alfalab/hooks';
import '@alfalab/icons-glyph/CalendarMIcon';
import 'date-fns/parse';
import './utils/format.js';

const DateRangeInputMobile = (props) => (React.createElement(DateRangeInput, { Calendar: CalendarMobile, view: 'mobile', ...props }));

export { DateRangeInputMobile };
