import { _ as __assign } from './tslib.es6-ac9b62a7.js';
import React, { forwardRef } from 'react';
import { Closer } from './components/closer/Component.js';
import { Content } from './components/content/Component.js';
import { Footer } from './components/footer/Component.js';
import { Header } from './components/header/Component.js';
import { Modal } from './Component.js';
import 'classnames';
import '../../icon-button/esm';
import '@alfalab/icons-glyph/CrossHeavyMIcon';
import '../../base-modal/esm';
import './ResponsiveContext.js';
import '@alfalab/icons-glyph/CrossMIcon';
import 'react-merge-refs';
import './Context.js';

var ModalDesktopComponent = forwardRef(function (props, ref) { return (React.createElement(Modal, __assign({}, props, { ref: ref, view: 'desktop' }))); });
var ModalDesktop = Object.assign(ModalDesktopComponent, {
    Content: Content,
    Header: Header,
    Footer: Footer,
    Closer: Closer,
});

export { ModalDesktop };
