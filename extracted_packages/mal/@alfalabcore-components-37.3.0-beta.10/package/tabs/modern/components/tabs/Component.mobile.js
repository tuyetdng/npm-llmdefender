import React from 'react';
import { PrimaryTabListMobile } from '../primary-tablist/Component.mobile.js';
import { SecondaryTabListMobile } from '../secondary-tablist/Component.mobile.js';
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
    primary: PrimaryTabListMobile,
    secondary: SecondaryTabListMobile,
};
const TabsMobile = ({ view = 'primary', scrollable = true, ...restProps }) => React.createElement(Tabs, { TabList: views[view], scrollable: scrollable, ...restProps });

export { TabsMobile };
