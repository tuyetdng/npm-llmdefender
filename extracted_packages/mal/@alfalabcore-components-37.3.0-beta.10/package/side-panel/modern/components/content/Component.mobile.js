import React from 'react';
import cn from 'classnames';
import { Content } from './Component.js';
import '../../../../base-modal/modern';
import '../../Context.js';

const styles = {"content":"side-panel__content_1ecix"};
require('./mobile.css');

const ContentMobile = ({ className, ...restProps }) => (React.createElement(Content, { className: cn(className, styles.content), ...restProps }));

export { ContentMobile };
