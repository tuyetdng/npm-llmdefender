import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { PrimaryTabListDesktop } from './Component.desktop.js';
import { PrimaryTabListMobile } from './Component.mobile.js';
import 'classnames';
import '../../../../badge/modern';
import '../../../../keyboard-focusable/modern';
import '../../../../picker-button/modern/desktop';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import '../title/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-a40a00d4.js';
import './Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';

const PrimaryTabListResponsive = ({ size, defaultMatch = 'desktop', collapsible, collapsedTabsIds, fullWidthScroll, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', '(max-width: 767px)'],
        ['desktop', '(min-width: 768px)'],
    ], defaultMatch);
    return view === 'desktop' ? (React.createElement(PrimaryTabListDesktop, { collapsible: collapsible, collapsedTabsIds: collapsedTabsIds, size: size, ...restProps })) : (React.createElement(PrimaryTabListMobile, { fullWidthScroll: fullWidthScroll, ...restProps }));
};

export { PrimaryTabListResponsive };
