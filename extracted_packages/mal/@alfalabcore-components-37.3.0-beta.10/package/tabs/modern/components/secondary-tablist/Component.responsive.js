import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { SecondaryTabListDesktop } from './Component.desktop.js';
import { SecondaryTabListMobile } from './Component.mobile.js';
import 'classnames';
import '../../../../tag/modern';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-8eccc1a1.js';
import './Component.js';
import '../../hooks/use-tabs.js';

const SecondaryTabListResponsive = ({ size, defaultMatch = 'desktop', fullWidthScroll, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', '(max-width: 767px)'],
        ['desktop', '(min-width: 768px)'],
    ], defaultMatch);
    return view === 'desktop' ? (React.createElement(SecondaryTabListDesktop, { size: size, ...restProps })) : (React.createElement(SecondaryTabListMobile, { fullWidthScroll: fullWidthScroll, ...restProps }));
};

export { SecondaryTabListResponsive };
