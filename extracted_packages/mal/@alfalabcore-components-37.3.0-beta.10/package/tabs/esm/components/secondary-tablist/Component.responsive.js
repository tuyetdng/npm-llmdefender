import { _ as __rest, a as __assign } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import { useMedia } from '@alfalab/hooks';
import { SecondaryTabListDesktop } from './Component.desktop.js';
import { SecondaryTabListMobile } from './Component.mobile.js';
import 'classnames';
import '../../../../tag/esm';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../../index.module-f7eca376.js';
import './Component.js';
import '../../hooks/use-tabs.js';

var SecondaryTabListResponsive = function (_a) {
    var size = _a.size, _b = _a.defaultMatch, defaultMatch = _b === void 0 ? 'desktop' : _b, fullWidthScroll = _a.fullWidthScroll, restProps = __rest(_a, ["size", "defaultMatch", "fullWidthScroll"]);
    var view = useMedia([
        ['mobile', '(max-width: 767px)'],
        ['desktop', '(min-width: 768px)'],
    ], defaultMatch)[0];
    return view === 'desktop' ? (React.createElement(SecondaryTabListDesktop, __assign({ size: size }, restProps))) : (React.createElement(SecondaryTabListMobile, __assign({ fullWidthScroll: fullWidthScroll }, restProps)));
};

export { SecondaryTabListResponsive };
