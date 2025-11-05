var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var components_closer_Component = require('./components/closer/Component.js');
var components_content_Component = require('./components/content/Component.js');
var components_footer_Component = require('./components/footer/Component.js');
var components_header_Component = require('./components/header/Component.js');
var Component = require('./Component.js');
require('classnames');
require('../../icon-button/cssm');
require('@alfalab/icons-glyph/CrossHeavyMIcon');
require('./Context.js');
require('../../base-modal/cssm');
require('./components/closer/index.module.css');
require('./ResponsiveContext.js');
require('./components/content/desktop.module.css');
require('./components/content/index.module.css');
require('./components/content/mobile.module.css');
require('./components/footer/desktop.module.css');
require('./components/footer/index.module.css');
require('./components/footer/layout.module.css');
require('./components/footer/mobile.module.css');
require('@alfalab/icons-glyph/CrossMIcon');
require('./components/header/desktop.module.css');
require('./components/header/index.module.css');
require('./components/header/mobile.module.css');
require('react-merge-refs');
require('./desktop.module.css');
require('./mobile.module.css');
require('./transitions.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var ModalResponsiveComponent = React.forwardRef(function (_a, ref) {
    var children = _a.children, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = tslib_es6.__rest(_a, ["children", "breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return (React__default.default.createElement(Component.Modal, tslib_es6.__assign({ ref: ref }, restProps, { view: view }), children));
});
var ModalResponsive = Object.assign(ModalResponsiveComponent, {
    Header: components_header_Component.Header,
    Content: components_content_Component.Content,
    Footer: components_footer_Component.Footer,
    Closer: components_closer_Component.Closer,
});

exports.ModalResponsive = ModalResponsive;
