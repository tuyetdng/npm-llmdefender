import React from 'react';
import cn from 'classnames';
import { Footer } from './Component.js';
import '../../../../base-modal/modern';
import '../../Context.js';

const styles = {"footer":"side-panel__footer_cw0sg","sticky":"side-panel__sticky_cw0sg"};
require('./mobile.css');

const FooterMobile = ({ className, sticky, ...restProps }) => (React.createElement(Footer, { className: cn(className, styles.footer, {
        [styles.sticky]: sticky,
    }), sticky: sticky, ...restProps }));

export { FooterMobile };
