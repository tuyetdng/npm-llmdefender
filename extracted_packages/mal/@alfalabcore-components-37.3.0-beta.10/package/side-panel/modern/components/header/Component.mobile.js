import React from 'react';
import cn from 'classnames';
import CrossMIcon from '@alfalab/icons-glyph/CrossMIcon';
import { Closer } from '../closer/Component.js';
import { Header } from './Component.js';
import '../../../../icon-button/modern';
import '../../../../base-modal/modern';
import '../../Context.js';

const styles = {"sticky":"side-panel__sticky_18zx5","content":"side-panel__content_18zx5"};
require('./mobile.css');

const HeaderMobile = ({ className, contentClassName, hasCloser = true, sticky, closerIcon = CrossMIcon, ...restProps }) => (React.createElement(Header, { className: cn(className, {
        [styles.sticky]: sticky,
    }), contentClassName: cn(styles.content, contentClassName), closer: hasCloser ? React.createElement(Closer, { icon: closerIcon, size: 'xs' }) : null, sticky: sticky, ...restProps }));

export { HeaderMobile };
