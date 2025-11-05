import React, { forwardRef } from 'react';
import cn from 'classnames';
import { BaseModal } from '../../base-modal/modern';
import { ContentMobile } from './components/content/Component.mobile.js';
import { FooterMobile } from './components/footer/Component.mobile.js';
import { HeaderMobile } from './components/header/Component.mobile.js';
import './components/content/Component.js';
import './components/footer/Component.js';
import '@alfalab/icons-glyph/CrossMIcon';
import './components/closer/Component.js';
import '../../icon-button/modern';
import './components/header/Component.js';
import './Context.js';

const styles = {"component":"side-panel__component_1fdcz"};
require('./mobile.css');

const transitions = {"appear":"side-panel__appear_fzzmd","enter":"side-panel__enter_fzzmd","appearActive":"side-panel__appearActive_fzzmd","enterActive":"side-panel__enterActive_fzzmd","exit":"side-panel__exit_fzzmd","exitActive":"side-panel__exitActive_fzzmd","exitDone":"side-panel__exitDone_fzzmd"};
require('./transitions.mobile.css');

const SidePanelMobileComponent = forwardRef(({ children, className, transitionProps, ...restProps }, ref) => (React.createElement(BaseModal, { ...restProps, ref: ref, transitionProps: {
        classNames: transitions,
        ...transitionProps,
    }, className: cn(className, styles.component) }, children)));
const SidePanelMobile = Object.assign(SidePanelMobileComponent, {
    Content: ContentMobile,
    Header: HeaderMobile,
    Footer: FooterMobile,
});

export { SidePanelMobile };
