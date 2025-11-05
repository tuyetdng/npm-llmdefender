var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../../../typography');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"header":"confirmation__header_46n9r","typography":"confirmation__typography_46n9r","typographyMobile":"confirmation__typographyMobile_46n9r"};
require('./index.css');

var Header = function (_a) {
    var _b;
    var mobile = _a.mobile, children = _a.children;
    return (React__default.default.createElement(coreComponentsTypography.Typography.Title, { className: cn__default.default(styles.header, styles.typography, (_b = {}, _b[styles.typographyMobile] = mobile, _b)), tag: 'h3', color: 'primary' }, children));
};

exports.Header = Header;
