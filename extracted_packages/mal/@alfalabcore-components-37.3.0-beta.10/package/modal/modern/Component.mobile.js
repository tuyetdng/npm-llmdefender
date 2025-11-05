import React, { forwardRef } from 'react';
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

const ModalMobileComponent = forwardRef((props, ref) => (React.createElement(Modal, { ...props, ref: ref, view: 'mobile' })));
const ModalMobile = Object.assign(ModalMobileComponent, {
    Content,
    Header,
    Footer,
    Closer,
});

export { ModalMobile };
