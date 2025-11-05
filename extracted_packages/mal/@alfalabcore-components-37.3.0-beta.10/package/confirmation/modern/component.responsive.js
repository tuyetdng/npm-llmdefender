import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { ConfirmationDesktop } from './component.desktop.js';
import { ConfirmationMobile } from './component.mobile.js';
import './components/base-confirmation/component.js';
import 'classnames';
import './context.js';
import '../../button/modern';
import '../../code-input/modern';
import '../../link/modern';
import '../../typography/modern';
import './components/header/component.js';
import './countdown-section-e6fd8508.js';
import '../../loader/modern';
import './components/screens/hint/component.js';
import './components/screens/fatal-error/component.js';
import './components/screens/temp-block/component.js';
import './components/countdown-loader/component.js';
import './types.js';
import './utils.js';
import './components/screens/initial/component.js';

const ConfirmationResponsive = ({ breakpoint = 1024, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return view === 'desktop' ? (React.createElement(ConfirmationDesktop, { ...restProps })) : (React.createElement(ConfirmationMobile, { ...restProps }));
};

export { ConfirmationResponsive };
