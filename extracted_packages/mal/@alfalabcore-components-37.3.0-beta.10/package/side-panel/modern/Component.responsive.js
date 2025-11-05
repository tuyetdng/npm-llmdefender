import React, { forwardRef, useMemo, useContext } from 'react';
import { useMedia } from '@alfalab/hooks';
import { Closer } from './components/closer/Component.js';
import { SidePanelDesktop } from './Component.desktop.js';
import { SidePanelMobile } from './Component.mobile.js';
import 'classnames';
import '../../icon-button/modern';
import '../../base-modal/modern';
import 'react-merge-refs';
import '../../drawer/modern';
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
const ResponsiveContext = React.createContext({
    view: 'desktop',
});
function createResponsive(desktop, mobile) {
    function ResponsiveChild(props) {
        const { view } = useContext(ResponsiveContext);
        const Child = view === 'desktop' ? desktop : mobile;
        return React.createElement(Child, { ...props });
    }
    return ResponsiveChild;
}
const SidePanelResponsiveComponent = forwardRef(({ children, breakpoint = 1024, ...restProps }, ref) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], 'desktop');
    const contextValue = useMemo(() => ({ view }), [view]);
    const Component = view === 'desktop' ? SidePanelDesktop : SidePanelMobile;
    return (React.createElement(ResponsiveContext.Provider, { value: contextValue },
        React.createElement(Component, { ref: ref, ...restProps }, children)));
});
const SidePanelResponsive = Object.assign(SidePanelResponsiveComponent, {
    Header: createResponsive(SidePanelDesktop.Header, SidePanelMobile.Header),
    Content: createResponsive(SidePanelDesktop.Content, SidePanelMobile.Content),
    Footer: createResponsive(SidePanelDesktop.Footer, SidePanelMobile.Footer),
    Closer,
});

export { SidePanelResponsive };
