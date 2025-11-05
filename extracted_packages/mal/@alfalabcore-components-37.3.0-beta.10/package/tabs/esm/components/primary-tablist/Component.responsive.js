import { _ as __rest, a as __assign } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { PrimaryTabListDesktop } from './Component.desktop.js';
import { PrimaryTabListMobile } from './Component.mobile.js';
import 'classnames';
import '../../../../badge/esm';
import '../../../../keyboard-focusable/esm';
import '../../../../picker-button/esm/desktop';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import '../title/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-898e6905.js';
import './Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';

var PrimaryTabListResponsive = function (_a) {
    var size = _a.size, _b = _a.defaultMatch, defaultMatch = _b === void 0 ? 'desktop' : _b, collapsible = _a.collapsible, collapsedTabsIds = _a.collapsedTabsIds, fullWidthScroll = _a.fullWidthScroll, restProps = __rest(_a, ["size", "defaultMatch", "collapsible", "collapsedTabsIds", "fullWidthScroll"]);
    var view = useMedia([
        ['mobile', '(max-width: 767px)'],
        ['desktop', '(min-width: 768px)'],
    ], defaultMatch)[0];
    return view === 'desktop' ? (React.createElement(PrimaryTabListDesktop, __assign({ collapsible: collapsible, collapsedTabsIds: collapsedTabsIds, size: size }, restProps))) : (React.createElement(PrimaryTabListMobile, __assign({ fullWidthScroll: fullWidthScroll }, restProps)));
};

export { PrimaryTabListResponsive };
