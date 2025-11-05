import { _ as __rest, a as __assign } from './tslib.es6-46a2fd0f.js';
import React, { forwardRef } from 'react';
import cn from 'classnames';
import { BaseModal } from '../../base-modal/esm';
import { ContentMobile } from './components/content/Component.mobile.js';
import { FooterMobile } from './components/footer/Component.mobile.js';
import { HeaderMobile } from './components/header/Component.mobile.js';
import './components/content/Component.js';
import './components/footer/Component.js';
import '@alfalab/icons-glyph/CrossMIcon';
import './components/closer/Component.js';
import '../../icon-button/esm';
import './components/header/Component.js';
import './Context.js';

var styles = {"component":"side-panel__component_1fdcz"};
require('./mobile.css');

var transitions = {"appear":"side-panel__appear_fzzmd","enter":"side-panel__enter_fzzmd","appearActive":"side-panel__appearActive_fzzmd","enterActive":"side-panel__enterActive_fzzmd","exit":"side-panel__exit_fzzmd","exitActive":"side-panel__exitActive_fzzmd","exitDone":"side-panel__exitDone_fzzmd"};
require('./transitions.mobile.css');

var SidePanelMobileComponent = forwardRef(function (_a, ref) {
    var children = _a.children, className = _a.className, transitionProps = _a.transitionProps, restProps = __rest(_a, ["children", "className", "transitionProps"]);
    return (React.createElement(BaseModal, __assign({}, restProps, { ref: ref, transitionProps: __assign({ classNames: transitions }, transitionProps), className: cn(className, styles.component) }), children));
});
var SidePanelMobile = Object.assign(SidePanelMobileComponent, {
    Content: ContentMobile,
    Header: HeaderMobile,
    Footer: FooterMobile,
});

export { SidePanelMobile };
