var tslib_es6 = require('./tslib.es6-9c29edce.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var components_closer_Component = require('./components/closer/Component.js');
var Component_desktop = require('./Component.desktop.js');
var Component_mobile = require('./Component.mobile.js');
require('classnames');
require('../icon-button');
require('./Context.js');
require('../base-modal');
require('react-merge-refs');
require('../drawer');
require('./components/content/Component.desktop.js');
require('./components/content/Component.js');
require('./components/footer/Component.desktop.js');
require('./components/footer/Component.js');
require('./components/header/Component.desktop.js');
require('@alfalab/icons-glyph/CrossHeavyMIcon');
require('./components/header/Component.js');
require('./components/content/Component.mobile.js');
require('./components/footer/Component.mobile.js');
require('./components/header/Component.mobile.js');
require('@alfalab/icons-glyph/CrossMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

// eslint-disable-next-line @typescript-eslint/no-redeclare
var ResponsiveContext = React__default.default.createContext({
    view: 'desktop',
});
function createResponsive(desktop, mobile) {
    function ResponsiveChild(props) {
        var view = React.useContext(ResponsiveContext).view;
        var Child = view === 'desktop' ? desktop : mobile;
        return React__default.default.createElement(Child, tslib_es6.__assign({}, props));
    }
    return ResponsiveChild;
}
var SidePanelResponsiveComponent = React.forwardRef(function (_a, ref) {
    var children = _a.children, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = tslib_es6.__rest(_a, ["children", "breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    var contextValue = React.useMemo(function () { return ({ view: view }); }, [view]);
    var Component = view === 'desktop' ? Component_desktop.SidePanelDesktop : Component_mobile.SidePanelMobile;
    return (React__default.default.createElement(ResponsiveContext.Provider, { value: contextValue },
        React__default.default.createElement(Component, tslib_es6.__assign({ ref: ref }, restProps), children)));
});
var SidePanelResponsive = Object.assign(SidePanelResponsiveComponent, {
    Header: createResponsive(Component_desktop.SidePanelDesktop.Header, Component_mobile.SidePanelMobile.Header),
    Content: createResponsive(Component_desktop.SidePanelDesktop.Content, Component_mobile.SidePanelMobile.Content),
    Footer: createResponsive(Component_desktop.SidePanelDesktop.Footer, Component_mobile.SidePanelMobile.Footer),
    Closer: components_closer_Component.Closer,
});

exports.SidePanelResponsive = SidePanelResponsive;
