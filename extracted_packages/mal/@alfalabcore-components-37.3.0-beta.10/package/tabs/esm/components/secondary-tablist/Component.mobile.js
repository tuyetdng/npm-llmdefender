import { a as __assign, _ as __rest } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import cn from 'classnames';
import { SecondaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-f7eca376.js';
import '../../../../tag/esm';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../../hooks/use-tabs.js';

var mobileStyles = {"title":"tabs__title_qaf9d tabs__title_1p09l","mobile":"tabs__mobile_qaf9d"};
require('./mobile.css');

var styles = __assign(__assign({}, commonStyles), mobileStyles);
var SecondaryTabListMobile = function (_a) {
    var className = _a.className, restProps = __rest(_a, ["className"]);
    return (React.createElement(SecondaryTabList, __assign({}, restProps, { styles: styles, className: cn(className, styles.mobile), tagSize: 'xs' })));
};

export { SecondaryTabListMobile };
