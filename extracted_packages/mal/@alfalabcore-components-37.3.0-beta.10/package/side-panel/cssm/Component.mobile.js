var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../base-modal/cssm');
var components_content_Component_mobile = require('./components/content/Component.mobile.js');
var components_footer_Component_mobile = require('./components/footer/Component.mobile.js');
var components_header_Component_mobile = require('./components/header/Component.mobile.js');
var styles = require('./mobile.module.css');
var transitions = require('./transitions.mobile.module.css');
require('./components/content/Component.js');
require('./Context.js');
require('./components/content/index.module.css');
require('./components/content/mobile.module.css');
require('./components/footer/Component.js');
require('./components/footer/index.module.css');
require('./components/footer/layout.module.css');
require('./components/footer/mobile.module.css');
require('@alfalab/icons-glyph/CrossMIcon');
require('./components/closer/Component.js');
require('../../icon-button/cssm');
require('./components/closer/index.module.css');
require('./components/header/Component.js');
require('./components/header/index.module.css');
require('./components/header/mobile.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var transitions__default = /*#__PURE__*/_interopDefaultCompat(transitions);

var SidePanelMobileComponent = React.forwardRef(function (_a, ref) {
    var children = _a.children, className = _a.className, transitionProps = _a.transitionProps, restProps = tslib_es6.__rest(_a, ["children", "className", "transitionProps"]);
    return (React__default.default.createElement(coreComponentsBaseModal.BaseModal, tslib_es6.__assign({}, restProps, { ref: ref, transitionProps: tslib_es6.__assign({ classNames: transitions__default.default }, transitionProps), className: cn__default.default(className, styles__default.default.component) }), children));
});
var SidePanelMobile = Object.assign(SidePanelMobileComponent, {
    Content: components_content_Component_mobile.ContentMobile,
    Header: components_header_Component_mobile.HeaderMobile,
    Footer: components_footer_Component_mobile.FooterMobile,
});

exports.SidePanelMobile = SidePanelMobile;
