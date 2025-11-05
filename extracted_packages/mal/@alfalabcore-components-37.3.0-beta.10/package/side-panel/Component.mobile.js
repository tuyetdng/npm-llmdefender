var tslib_es6 = require('./tslib.es6-9c29edce.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsBaseModal = require('../base-modal');
var components_content_Component_mobile = require('./components/content/Component.mobile.js');
var components_footer_Component_mobile = require('./components/footer/Component.mobile.js');
var components_header_Component_mobile = require('./components/header/Component.mobile.js');
require('./components/content/Component.js');
require('./Context.js');
require('./components/footer/Component.js');
require('@alfalab/icons-glyph/CrossMIcon');
require('./components/closer/Component.js');
require('../icon-button');
require('./components/header/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"side-panel__component_1fdcz"};
require('./mobile.css');

var transitions = {"appear":"side-panel__appear_fzzmd","enter":"side-panel__enter_fzzmd","appearActive":"side-panel__appearActive_fzzmd","enterActive":"side-panel__enterActive_fzzmd","exit":"side-panel__exit_fzzmd","exitActive":"side-panel__exitActive_fzzmd","exitDone":"side-panel__exitDone_fzzmd"};
require('./transitions.mobile.css');

var SidePanelMobileComponent = React.forwardRef(function (_a, ref) {
    var children = _a.children, className = _a.className, transitionProps = _a.transitionProps, restProps = tslib_es6.__rest(_a, ["children", "className", "transitionProps"]);
    return (React__default.default.createElement(coreComponentsBaseModal.BaseModal, tslib_es6.__assign({}, restProps, { ref: ref, transitionProps: tslib_es6.__assign({ classNames: transitions }, transitionProps), className: cn__default.default(className, styles.component) }), children));
});
var SidePanelMobile = Object.assign(SidePanelMobileComponent, {
    Content: components_content_Component_mobile.ContentMobile,
    Header: components_header_Component_mobile.HeaderMobile,
    Footer: components_footer_Component_mobile.FooterMobile,
});

exports.SidePanelMobile = SidePanelMobile;
