import React, { forwardRef, useRef, isValidElement, cloneElement } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Drawer } from '../../drawer/modern';
import { ContentDesktop } from './components/content/Component.desktop.js';
import { FooterDesktop } from './components/footer/Component.desktop.js';
import { HeaderDesktop } from './components/header/Component.desktop.js';
import './components/content/Component.js';
import '../../base-modal/modern';
import './components/footer/Component.js';
import '@alfalab/icons-glyph/CrossHeavyMIcon';
import './components/closer/Component.js';
import '../../icon-button/modern';
import './components/header/Component.js';
import './Context.js';

const styles = {"s":"side-panel__s_5fjgk","hidden":"side-panel__hidden_5fjgk"};
require('./desktop.css');

const transitions = {"enterRight":"side-panel__enterRight_1qrdo","enterLeft":"side-panel__enterLeft_1qrdo","enterActive":"side-panel__enterActive_1qrdo","exit":"side-panel__exit_1qrdo","exitActiveRight":"side-panel__exitActiveRight_1qrdo","exitActiveLeft":"side-panel__exitActiveLeft_1qrdo"};
require('./transitions.desktop.css');

const SidePanelDesktopComponent = forwardRef(({ size = 's', children, className, wrapperClassName, contentTransitionProps = {}, backdropProps, placement = 'right', ...restProps }, ref) => {
    const modalRef = useRef(null);
    const enterCn = cn({
        [transitions.appearRight]: placement === 'right',
        [transitions.appearLeft]: placement === 'left',
    });
    const exitCn = cn({
        [transitions.exitActiveRight]: placement === 'right',
        [transitions.exitActiveLeft]: placement === 'left',
    });
    return (React.createElement(Drawer, { ...restProps, ref: mergeRefs([ref, modalRef]), placement: placement, wrapperClassName: wrapperClassName, className: cn(className, styles[size], styles.hidden), backdropProps: backdropProps, contentTransitionProps: {
            classNames: {
                appear: enterCn,
                enter: enterCn,
                appearActive: transitions.enterActive,
                enterActive: transitions.enterActive,
                exit: transitions.exit,
                exitActive: exitCn,
                exitDone: exitCn,
            },
            ...contentTransitionProps,
        } }, React.Children.map(children, (child) => isValidElement(child) ? cloneElement(child, { size }) : child)));
});
const SidePanelDesktop = Object.assign(SidePanelDesktopComponent, {
    Content: ContentDesktop,
    Header: HeaderDesktop,
    Footer: FooterDesktop,
});

export { SidePanelDesktop };
