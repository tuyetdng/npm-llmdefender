import React from 'react';
import cn from 'classnames';
import { CrossHeavyMIcon } from '@alfalab/icons-glyph/CrossHeavyMIcon';
import { Closer } from '../closer/Component.js';
import { Header } from './Component.js';
import '../../../../icon-button/modern';
import '../../../../base-modal/modern';
import '../../Context.js';

const styles = {"content":"side-panel__content_1wmke","s":"side-panel__s_1wmke","hasContent":"side-panel__hasContent_1wmke","sticky":"side-panel__sticky_1wmke"};
require('./desktop.css');

const HeaderDesktop = ({ size = 's', className, contentClassName, hasCloser = true, closerIcon = CrossHeavyMIcon, sticky, leftAddons = React.createElement("span", null), title, children, ...restProps }) => {
    const hasContent = Boolean(title || children);
    return (React.createElement(Header, { className: cn(className, size && styles[size], {
            [styles.sticky]: sticky,
            [styles.hasContent]: hasContent,
        }), contentClassName: cn(styles.content, contentClassName), closer: hasCloser ? React.createElement(Closer, { icon: closerIcon }) : null, leftAddons: leftAddons, sticky: sticky, title: title, ...restProps }, children));
};

export { HeaderDesktop };
