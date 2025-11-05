import React from 'react';
import cn from 'classnames';
import { PrimaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-a40a00d4.js';
import '../../../../badge/modern';
import '../../../../keyboard-focusable/modern';
import '../../../../picker-button/modern/desktop';
import '@alfalab/hooks';
import '@juggle/resize-observer';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../title/Component.js';
import '../../hooks/use-tablist-titles.js';
import '../../hooks/use-collapsible-elements.js';
import '../../hooks/use-tabs.js';
import '../../synthetic-events.js';

const mobileStyles = {"title":"tabs__title_f1h14 tabs__title_1w0vv","mobile":"tabs__mobile_f1h14"};
require('./mobile.css');

const styles = {
    ...commonStyles,
    ...mobileStyles,
};
const PrimaryTabListMobile = ({ className, ...restProps }) => (React.createElement(PrimaryTabList, { ...restProps, styles: styles, className: cn(className, styles.mobile) }));

export { PrimaryTabListMobile };
