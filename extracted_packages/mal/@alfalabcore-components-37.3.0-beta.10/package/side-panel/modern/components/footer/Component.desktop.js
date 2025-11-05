import React from 'react';
import cn from 'classnames';
import { Footer } from './Component.js';
import '../../../../base-modal/modern';
import '../../Context.js';

const styles = {"sticky":"side-panel__sticky_1len3","s":"side-panel__s_1len3"};
require('./desktop.css');

const FooterDesktop = ({ size = 's', className, sticky, ...restProps }) => (React.createElement(Footer, { className: cn(className, size && styles[size], {
        [styles.sticky]: sticky,
    }), sticky: sticky, ...restProps }));

export { FooterDesktop };
