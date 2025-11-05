import React from 'react';
import { PrimaryTabListResponsive } from '../primary-tablist/Component.responsive.js';
import { SecondaryTabListResponsive } from '../secondary-tablist/Component.responsive.js';
import { Tabs } from './Component.js';
import '@alfalab/hooks';
import 'classnames';
import '../../../../badge/modern';
import '../../../../keyboard-focusable/modern';
import '../../../../picker-button/modern/desktop';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import '../title/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-a40a00d4.js';
import '../primary-tablist/Component.mobile.js';
import '../../../../tag/modern';
import '../../index.module-8eccc1a1.js';
import '../secondary-tablist/Component.mobile.js';
import '../primary-tablist/Component.desktop.js';
import '../primary-tablist/Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';
import '../secondary-tablist/Component.desktop.js';
import '../secondary-tablist/Component.js';

const views = {
    primary: PrimaryTabListResponsive,
    secondary: SecondaryTabListResponsive,
};
const TabsResponsive = ({ view = 'primary', scrollable = false, ...restProps }) => React.createElement(Tabs, { TabList: views[view], scrollable: scrollable, ...restProps });

export { TabsResponsive };
