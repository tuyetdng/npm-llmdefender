import React from 'react';
import { SecondaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-8eccc1a1.js';
import 'classnames';
import '../../../../tag/modern';
import '../scrollable-container/Component.js';
import 'compute-scroll-into-view';
import '../../hooks/use-tabs.js';

const SecondaryTabListDesktop = ({ size = 's', ...restProps }) => (React.createElement(SecondaryTabList, { ...restProps, size: size, styles: commonStyles, tagSize: size }));

export { SecondaryTabListDesktop };
