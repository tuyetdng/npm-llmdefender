import { _ as __rest, a as __assign } from './tslib.es6-46a2fd0f.js';
import React, { forwardRef, useMemo, useContext } from 'react';
import { useMedia } from '@alfalab/hooks';
import { Closer } from './components/closer/Component.js';
import { SidePanelDesktop } from './Component.desktop.js';
import { SidePanelMobile } from './Component.mobile.js';
import 'classnames';
import '../../icon-button/esm';
import '../../base-modal/esm';
import 'react-merge-refs';
import '../../drawer/esm';
import './components/content/Component.desktop.js';
import './components/content/Component.js';
import './components/footer/Component.desktop.js';
import './components/footer/Component.js';
import './components/header/Component.desktop.js';
import '@alfalab/icons-glyph/CrossHeavyMIcon';
import './components/header/Component.js';
import './components/content/Component.mobile.js';
import './components/footer/Component.mobile.js';
import './components/header/Component.mobile.js';
import '@alfalab/icons-glyph/CrossMIcon';
import './Context.js';

// eslint-disable-next-line @typescript-eslint/no-redeclare
var ResponsiveContext = React.createContext({
    view: 'desktop',
});
function createResponsive(desktop, mobile) {
    function ResponsiveChild(props) {
        var view = useContext(ResponsiveContext).view;
        var Child = view === 'desktop' ? desktop : mobile;
        return React.createElement(Child, __assign({}, props));
    }
    return ResponsiveChild;
}
var SidePanelResponsiveComponent = forwardRef(function (_a, ref) {
    var children = _a.children, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = __rest(_a, ["children", "breakpoint"]);
    var view = useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    var contextValue = useMemo(function () { return ({ view: view }); }, [view]);
    var Component = view === 'desktop' ? SidePanelDesktop : SidePanelMobile;
    return (React.createElement(ResponsiveContext.Provider, { value: contextValue },
        React.createElement(Component, __assign({ ref: ref }, restProps), children)));
});
var SidePanelResponsive = Object.assign(SidePanelResponsiveComponent, {
    Header: createResponsive(SidePanelDesktop.Header, SidePanelMobile.Header),
    Content: createResponsive(SidePanelDesktop.Content, SidePanelMobile.Content),
    Footer: createResponsive(SidePanelDesktop.Footer, SidePanelMobile.Footer),
    Closer: Closer,
});

export { SidePanelResponsive };
