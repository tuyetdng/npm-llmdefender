var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../../../../typography/cssm');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Header = function (_a) {
    var _b;
    var mobile = _a.mobile, children = _a.children;
    return (React__default.default.createElement(coreComponentsTypography.Typography.Title, { className: cn__default.default(styles__default.default.header, styles__default.default.typography, (_b = {}, _b[styles__default.default.typographyMobile] = mobile, _b)), tag: 'h3', color: 'primary' }, children));
};

exports.Header = Header;
