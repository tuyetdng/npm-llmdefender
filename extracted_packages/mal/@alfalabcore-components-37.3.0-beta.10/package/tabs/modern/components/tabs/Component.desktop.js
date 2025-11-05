import React from 'react';
import { PrimaryTabListDesktop } from '../primary-tablist/Component.desktop.js';
import { SecondaryTabListDesktop } from '../secondary-tablist/Component.desktop.js';
import { Tabs } from './Component.js';
import 'classnames';
import '../../../../badge/modern';
import '../../../../keyboard-focusable/modern';
import '../../../../picker-button/modern/desktop';
import '@alfalab/hooks';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import '../title/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-a40a00d4.js';
import '../../../../tag/modern';
import '../../index.module-8eccc1a1.js';
import '../primary-tablist/Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';
import '../secondary-tablist/Component.js';

const views = {
    primary: PrimaryTabListDesktop,
    secondary: SecondaryTabListDesktop,
};
const TabsDesktop = ({ view = 'primary', scrollable = false, size = view === 'primary' ? 'm' : 's', ...restProps }) => (React.createElement(Tabs, { TabList: views[view], scrollable: scrollable, size: size, ...restProps }));

export { TabsDesktop };
