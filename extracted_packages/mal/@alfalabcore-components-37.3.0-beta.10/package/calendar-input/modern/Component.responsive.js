import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { CalendarInputDesktop } from './Component.desktop.js';
import { CalendarInputMobile } from './Component.mobile.js';
import './components/calendar-input/Component.js';
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

const CalendarInputResponsive = ({ breakpoint = 1024, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return view === 'desktop' ? (React.createElement(CalendarInputDesktop, { ...restProps })) : (React.createElement(CalendarInputMobile, { ...restProps }));
};

export { CalendarInputResponsive };
