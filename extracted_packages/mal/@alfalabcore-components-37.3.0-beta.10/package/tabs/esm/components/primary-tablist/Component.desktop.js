import { _ as __rest, a as __assign } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import { PrimaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-898e6905.js';
import 'classnames';
import '../../../../badge/esm';
import '../../../../keyboard-focusable/esm';
import '../../../../picker-button/esm/desktop';
import '@alfalab/hooks';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../title/Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';

var PrimaryTabListDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 'm' : _b, restProps = __rest(_a, ["size"]);
    return (React.createElement(PrimaryTabList, __assign({}, restProps, { size: size, styles: commonStyles })));
};

export { PrimaryTabListDesktop };
