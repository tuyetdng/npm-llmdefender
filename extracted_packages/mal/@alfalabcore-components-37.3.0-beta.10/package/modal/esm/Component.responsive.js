import { a as __rest, _ as __assign } from './tslib.es6-ac9b62a7.js';
import React, { forwardRef } from 'react';
import { useMedia } from '@alfalab/hooks';
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

var ModalResponsiveComponent = forwardRef(function (_a, ref) {
    var children = _a.children, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["children", "breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return (React.createElement(Modal, __assign({ ref: ref }, restProps, { view: view }), children));
});
var ModalResponsive = Object.assign(ModalResponsiveComponent, {
    Header: Header,
    Content: Content,
    Footer: Footer,
    Closer: Closer,
});

export { ModalResponsive };
