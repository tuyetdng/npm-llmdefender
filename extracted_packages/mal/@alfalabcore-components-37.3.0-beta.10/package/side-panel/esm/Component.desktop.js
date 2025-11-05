import { _ as __rest, a as __assign } from './tslib.es6-46a2fd0f.js';
import React, { forwardRef, useRef, isValidElement, cloneElement } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Drawer } from '../../drawer/esm';
import { ContentDesktop } from './components/content/Component.desktop.js';
import { FooterDesktop } from './components/footer/Component.desktop.js';
import { HeaderDesktop } from './components/header/Component.desktop.js';
import './components/content/Component.js';
import '../../base-modal/esm';
import './components/footer/Component.js';
import '@alfalab/icons-glyph/CrossHeavyMIcon';
import './components/closer/Component.js';
import '../../icon-button/esm';
import './components/header/Component.js';
import './Context.js';

var styles = {"s":"side-panel__s_5fjgk","hidden":"side-panel__hidden_5fjgk"};
require('./desktop.css');

var transitions = {"enterRight":"side-panel__enterRight_1qrdo","enterLeft":"side-panel__enterLeft_1qrdo","enterActive":"side-panel__enterActive_1qrdo","exit":"side-panel__exit_1qrdo","exitActiveRight":"side-panel__exitActiveRight_1qrdo","exitActiveLeft":"side-panel__exitActiveLeft_1qrdo"};
require('./transitions.desktop.css');

var SidePanelDesktopComponent = forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.size, size = _d === void 0 ? 's' : _d, children = _a.children, className = _a.className, wrapperClassName = _a.wrapperClassName, _e = _a.contentTransitionProps, contentTransitionProps = _e === void 0 ? {} : _e, backdropProps = _a.backdropProps, _f = _a.placement, placement = _f === void 0 ? 'right' : _f, restProps = __rest(_a, ["size", "children", "className", "wrapperClassName", "contentTransitionProps", "backdropProps", "placement"]);
    var modalRef = useRef(null);
    var enterCn = cn((_b = {},
        _b[transitions.appearRight] = placement === 'right',
        _b[transitions.appearLeft] = placement === 'left',
        _b));
    var exitCn = cn((_c = {},
        _c[transitions.exitActiveRight] = placement === 'right',
        _c[transitions.exitActiveLeft] = placement === 'left',
        _c));
    return (React.createElement(Drawer, __assign({}, restProps, { ref: mergeRefs([ref, modalRef]), placement: placement, wrapperClassName: wrapperClassName, className: cn(className, styles[size], styles.hidden), backdropProps: backdropProps, contentTransitionProps: __assign({ classNames: {
                appear: enterCn,
                enter: enterCn,
                appearActive: transitions.enterActive,
                enterActive: transitions.enterActive,
                exit: transitions.exit,
                exitActive: exitCn,
                exitDone: exitCn,
            } }, contentTransitionProps) }), React.Children.map(children, function (child) {
        return isValidElement(child) ? cloneElement(child, { size: size }) : child;
    })));
});
var SidePanelDesktop = Object.assign(SidePanelDesktopComponent, {
    Content: ContentDesktop,
    Header: HeaderDesktop,
    Footer: FooterDesktop,
});

export { SidePanelDesktop };
