import React from 'react';
import cn from 'classnames';
import { SecondaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-8eccc1a1.js';
import '../../../../tag/modern';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../../hooks/use-tabs.js';

const mobileStyles = {"title":"tabs__title_qaf9d tabs__title_1p09l","mobile":"tabs__mobile_qaf9d"};
require('./mobile.css');

const styles = {
    ...commonStyles,
    ...mobileStyles,
};
const SecondaryTabListMobile = ({ className, ...restProps }) => (React.createElement(SecondaryTabList, { ...restProps, styles: styles, className: cn(className, styles.mobile), tagSize: 'xs' }));

export { SecondaryTabListMobile };
