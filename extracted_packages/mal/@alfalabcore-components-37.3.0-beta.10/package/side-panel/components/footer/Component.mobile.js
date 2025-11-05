var tslib_es6 = require('../../tslib.es6-9c29edce.js');
var React = require('react');
var cn = require('classnames');
var components_footer_Component = require('./Component.js');
require('../../Context.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"footer":"side-panel__footer_cw0sg","sticky":"side-panel__sticky_cw0sg"};
require('./mobile.css');

var FooterMobile = function (_a) {
    var _b;
    var className = _a.className, sticky = _a.sticky, restProps = tslib_es6.__rest(_a, ["className", "sticky"]);
    return (React__default.default.createElement(components_footer_Component.Footer, tslib_es6.__assign({ className: cn__default.default(className, styles.footer, (_b = {},
            _b[styles.sticky] = sticky,
            _b)), sticky: sticky }, restProps)));
};

exports.FooterMobile = FooterMobile;
