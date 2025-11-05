import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { DateRangeInputDesktop } from './Component.desktop.js';
import { DateRangeInputMobile } from './Component.mobile.js';
import './components/date-range-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import 'date-fns/isValid';
import '../../calendar/modern';
import '../../icon-button/modern';
import '../../input/modern';
import '../../popover/modern';
import '@alfalab/icons-glyph/CalendarMIcon';
import 'date-fns/parse';
import './utils/format.js';

const DateRangeInputResponsive = ({ breakpoint = 1024, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return view === 'desktop' ? (React.createElement(DateRangeInputDesktop, { ...restProps })) : (React.createElement(DateRangeInputMobile, { ...restProps }));
};

export { DateRangeInputResponsive };
