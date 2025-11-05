import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { DateTimeInputDesktop } from './Component.desktop.js';
import { DateTimeInputMobile } from './Component.mobile.js';
import './components/date-time-input/Component.js';
import 'react-merge-refs';
import 'classnames';
import '../../calendar/modern';
import '../../icon-button/modern';
import '../../input/modern';
import '../../popover/modern';
import '@alfalab/icons-glyph/CalendarMIcon';
import './utils/format.js';
import 'date-fns/isValid';
import 'date-fns/parse';

const DateTimeInputResponsive = ({ breakpoint = 1024, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return view === 'desktop' ? (React.createElement(DateTimeInputDesktop, { ...restProps })) : (React.createElement(DateTimeInputMobile, { ...restProps }));
};

export { DateTimeInputResponsive };
