import { _ as __rest, a as __assign } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import { SecondaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-f7eca376.js';
import 'classnames';
import '../../../../tag/esm';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../../hooks/use-tabs.js';

var SecondaryTabListDesktop = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, restProps = __rest(_a, ["size"]);
    return (React.createElement(SecondaryTabList, __assign({}, restProps, { size: size, styles: commonStyles, tagSize: size })));
};

export { SecondaryTabListDesktop };
