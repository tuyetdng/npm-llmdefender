import React, { forwardRef } from 'react';
import { useMedia } from '@alfalab/hooks';
import { Closer } from './components/closer/Component.js';
import { Content } from './components/content/Component.js';
import { Footer } from './components/footer/Component.js';
import { Header } from './components/header/Component.js';
import { Modal } from './Component.js';
import 'classnames';
import '../../icon-button/modern';
import '@alfalab/icons-glyph/CrossHeavyMIcon';
import '../../base-modal/modern';
import './ResponsiveContext.js';
import '@alfalab/icons-glyph/CrossMIcon';
import 'react-merge-refs';
import './Context.js';

const ModalResponsiveComponent = forwardRef(({ children, breakpoint = 1024, ...restProps }, ref) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    return (React.createElement(Modal, { ref: ref, ...restProps, view: view }, children));
});
const ModalResponsive = Object.assign(ModalResponsiveComponent, {
    Header,
    Content,
    Footer,
    Closer,
});

export { ModalResponsive };
