import { _ as __rest, a as __assign } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import { PrimaryTabListResponsive } from '../primary-tablist/Component.responsive.js';
import { SecondaryTabListResponsive } from '../secondary-tablist/Component.responsive.js';
import { Tabs } from './Component.js';
import '@alfalab/hooks';
import 'classnames';
import '../../../../badge/esm';
import '../../../../keyboard-focusable/esm';
import '../../../../picker-button/esm/desktop';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import '../title/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-898e6905.js';
import '../primary-tablist/Component.mobile.js';
import '../../../../tag/esm';
import '../../index.module-f7eca376.js';
import '../secondary-tablist/Component.mobile.js';
import '../primary-tablist/Component.desktop.js';
import '../primary-tablist/Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';
import '../secondary-tablist/Component.desktop.js';
import '../secondary-tablist/Component.js';

var views = {
    primary: PrimaryTabListResponsive,
    secondary: SecondaryTabListResponsive,
};
var TabsResponsive = function (_a) {
    var _b = _a.view, view = _b === void 0 ? 'primary' : _b, _c = _a.scrollable, scrollable = _c === void 0 ? false : _c, restProps = __rest(_a, ["view", "scrollable"]);
    return React.createElement(Tabs, __assign({ TabList: views[view], scrollable: scrollable }, restProps));
};

export { TabsResponsive };
