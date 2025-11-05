var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var components_footer_Component = require('./Component.js');
var styles = require('./mobile.module.css');
require('../../Context.js');
require('../../../../base-modal/cssm');
require('./index.module.css');
require('./layout.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var FooterMobile = function (_a) {
    var _b;
    var className = _a.className, sticky = _a.sticky, restProps = tslib_es6.__rest(_a, ["className", "sticky"]);
    return (React__default.default.createElement(components_footer_Component.Footer, tslib_es6.__assign({ className: cn__default.default(className, styles__default.default.footer, (_b = {},
            _b[styles__default.default.sticky] = sticky,
            _b)), sticky: sticky }, restProps)));
};

exports.FooterMobile = FooterMobile;
