import { _ as __rest, a as __assign } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import { PrimaryTabListDesktop } from '../primary-tablist/Component.desktop.js';
import { SecondaryTabListDesktop } from '../secondary-tablist/Component.desktop.js';
import { Tabs } from './Component.js';
import 'classnames';
import '../../../../badge/esm';
import '../../../../keyboard-focusable/esm';
import '../../../../picker-button/esm/desktop';
import '@alfalab/hooks';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import '../title/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-898e6905.js';
import '../../../../tag/esm';
import '../../index.module-f7eca376.js';
import '../primary-tablist/Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';
import '../secondary-tablist/Component.js';

var views = {
    primary: PrimaryTabListDesktop,
    secondary: SecondaryTabListDesktop,
};
var TabsDesktop = function (_a) {
    var _b = _a.view, view = _b === void 0 ? 'primary' : _b, _c = _a.scrollable, scrollable = _c === void 0 ? false : _c, _d = _a.size, size = _d === void 0 ? view === 'primary' ? 'm' : 's' : _d, restProps = __rest(_a, ["view", "scrollable", "size"]);
    return (React.createElement(Tabs, __assign({ TabList: views[view], scrollable: scrollable, size: size }, restProps)));
};

export { TabsDesktop };
