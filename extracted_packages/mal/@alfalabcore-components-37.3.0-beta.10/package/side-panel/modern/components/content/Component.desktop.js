import React from 'react';
import cn from 'classnames';
import { Content } from './Component.js';
import '../../../../base-modal/modern';
import '../../Context.js';

const styles = {"s":"side-panel__s_8a8xv"};
require('./desktop.css');

const ContentDesktop = ({ size = 's', className, ...restProps }) => React.createElement(Content, { className: cn(className, size && styles[size]), ...restProps });

export { ContentDesktop };
