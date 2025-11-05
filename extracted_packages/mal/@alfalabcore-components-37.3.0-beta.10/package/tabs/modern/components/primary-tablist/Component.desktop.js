import React from 'react';
import { PrimaryTabList } from './Component.js';
import { c as commonStyles } from '../../index.module-a40a00d4.js';
import 'classnames';
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

const PrimaryTabListDesktop = ({ size = 'm', ...restProps }) => (React.createElement(PrimaryTabList, { ...restProps, size: size, styles: commonStyles }));

export { PrimaryTabListDesktop };
