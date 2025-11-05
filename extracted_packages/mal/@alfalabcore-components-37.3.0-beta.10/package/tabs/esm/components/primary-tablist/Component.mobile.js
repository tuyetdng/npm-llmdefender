import { a as __assign, _ as __rest } from '../../tslib.es6-3f4e7063.js';
import React from 'react';
import cn from 'classnames';
import { PrimaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-898e6905.js';
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

var mobileStyles = {"title":"tabs__title_f1h14 tabs__title_1w0vv","mobile":"tabs__mobile_f1h14"};
require('./mobile.css');

var styles = __assign(__assign({}, commonStyles), mobileStyles);
var PrimaryTabListMobile = function (_a) {
    var className = _a.className, restProps = __rest(_a, ["className"]);
    return (React.createElement(PrimaryTabList, __assign({}, restProps, { styles: styles, className: cn(className, styles.mobile) })));
};

export { PrimaryTabListMobile };
