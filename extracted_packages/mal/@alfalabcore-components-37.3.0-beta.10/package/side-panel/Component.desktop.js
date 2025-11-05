var tslib_es6 = require('./tslib.es6-9c29edce.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsDrawer = require('../drawer');
var components_content_Component_desktop = require('./components/content/Component.desktop.js');
var components_footer_Component_desktop = require('./components/footer/Component.desktop.js');
var components_header_Component_desktop = require('./components/header/Component.desktop.js');
require('./components/content/Component.js');
require('./Context.js');
require('../base-modal');
require('./components/footer/Component.js');
require('@alfalab/icons-glyph/CrossHeavyMIcon');
require('./components/closer/Component.js');
require('../icon-button');
require('./components/header/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"s":"side-panel__s_5fjgk","hidden":"side-panel__hidden_5fjgk"};
require('./desktop.css');

var transitions = {"enterRight":"side-panel__enterRight_1qrdo","enterLeft":"side-panel__enterLeft_1qrdo","enterActive":"side-panel__enterActive_1qrdo","exit":"side-panel__exit_1qrdo","exitActiveRight":"side-panel__exitActiveRight_1qrdo","exitActiveLeft":"side-panel__exitActiveLeft_1qrdo"};
require('./transitions.desktop.css');

var SidePanelDesktopComponent = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.size, size = _d === void 0 ? 's' : _d, children = _a.children, className = _a.className, wrapperClassName = _a.wrapperClassName, _e = _a.contentTransitionProps, contentTransitionProps = _e === void 0 ? {} : _e, backdropProps = _a.backdropProps, _f = _a.placement, placement = _f === void 0 ? 'right' : _f, restProps = tslib_es6.__rest(_a, ["size", "children", "className", "wrapperClassName", "contentTransitionProps", "backdropProps", "placement"]);
    var modalRef = React.useRef(null);
    var enterCn = cn__default.default((_b = {},
        _b[transitions.appearRight] = placement === 'right',
        _b[transitions.appearLeft] = placement === 'left',
        _b));
    var exitCn = cn__default.default((_c = {},
        _c[transitions.exitActiveRight] = placement === 'right',
        _c[transitions.exitActiveLeft] = placement === 'left',
        _c));
    return (React__default.default.createElement(coreComponentsDrawer.Drawer, tslib_es6.__assign({}, restProps, { ref: mergeRefs__default.default([ref, modalRef]), placement: placement, wrapperClassName: wrapperClassName, className: cn__default.default(className, styles[size], styles.hidden), backdropProps: backdropProps, contentTransitionProps: tslib_es6.__assign({ classNames: {
                appear: enterCn,
                enter: enterCn,
                appearActive: transitions.enterActive,
                enterActive: transitions.enterActive,
                exit: transitions.exit,
                exitActive: exitCn,
                exitDone: exitCn,
            } }, contentTransitionProps) }), React__default.default.Children.map(children, function (child) {
        return React.isValidElement(child) ? React.cloneElement(child, { size: size }) : child;
    })));
});
var SidePanelDesktop = Object.assign(SidePanelDesktopComponent, {
    Content: components_content_Component_desktop.ContentDesktop,
    Header: components_header_Component_desktop.HeaderDesktop,
    Footer: components_footer_Component_desktop.FooterDesktop,
});

exports.SidePanelDesktop = SidePanelDesktop;
