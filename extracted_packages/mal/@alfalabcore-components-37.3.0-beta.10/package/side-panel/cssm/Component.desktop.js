var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsDrawer = require('../../drawer/cssm');
var components_content_Component_desktop = require('./components/content/Component.desktop.js');
var components_footer_Component_desktop = require('./components/footer/Component.desktop.js');
var components_header_Component_desktop = require('./components/header/Component.desktop.js');
var styles = require('./desktop.module.css');
var transitions = require('./transitions.desktop.module.css');
require('./components/content/Component.js');
require('./Context.js');
require('../../base-modal/cssm');
require('./components/content/index.module.css');
require('./components/content/desktop.module.css');
require('./components/footer/Component.js');
require('./components/footer/index.module.css');
require('./components/footer/layout.module.css');
require('./components/footer/desktop.module.css');
require('@alfalab/icons-glyph/CrossHeavyMIcon');
require('./components/closer/Component.js');
require('../../icon-button/cssm');
require('./components/closer/index.module.css');
require('./components/header/Component.js');
require('./components/header/index.module.css');
require('./components/header/desktop.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var transitions__default = /*#__PURE__*/_interopDefaultCompat(transitions);

var SidePanelDesktopComponent = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.size, size = _d === void 0 ? 's' : _d, children = _a.children, className = _a.className, wrapperClassName = _a.wrapperClassName, _e = _a.contentTransitionProps, contentTransitionProps = _e === void 0 ? {} : _e, backdropProps = _a.backdropProps, _f = _a.placement, placement = _f === void 0 ? 'right' : _f, restProps = tslib_es6.__rest(_a, ["size", "children", "className", "wrapperClassName", "contentTransitionProps", "backdropProps", "placement"]);
    var modalRef = React.useRef(null);
    var enterCn = cn__default.default((_b = {},
        _b[transitions__default.default.appearRight] = placement === 'right',
        _b[transitions__default.default.appearLeft] = placement === 'left',
        _b));
    var exitCn = cn__default.default((_c = {},
        _c[transitions__default.default.exitActiveRight] = placement === 'right',
        _c[transitions__default.default.exitActiveLeft] = placement === 'left',
        _c));
    return (React__default.default.createElement(coreComponentsDrawer.Drawer, tslib_es6.__assign({}, restProps, { ref: mergeRefs__default.default([ref, modalRef]), placement: placement, wrapperClassName: wrapperClassName, className: cn__default.default(className, styles__default.default[size], styles__default.default.hidden), backdropProps: backdropProps, contentTransitionProps: tslib_es6.__assign({ classNames: {
                appear: enterCn,
                enter: enterCn,
                appearActive: transitions__default.default.enterActive,
                enterActive: transitions__default.default.enterActive,
                exit: transitions__default.default.exit,
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
