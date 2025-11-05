var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');
var components_closer_Component = require('../closer/Component.js');
var components_header_Component = require('./Component.js');
var styles = require('./mobile.module.css');
require('../../../../icon-button/cssm');
require('../../Context.js');
require('../../../../base-modal/cssm');
require('../closer/index.module.css');
require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var CrossMIcon__default = /*#__PURE__*/_interopDefaultCompat(CrossMIcon);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var HeaderMobile = function (_a) {
    var _b;
    var className = _a.className, contentClassName = _a.contentClassName, _c = _a.hasCloser, hasCloser = _c === void 0 ? true : _c, sticky = _a.sticky, _d = _a.closerIcon, closerIcon = _d === void 0 ? CrossMIcon__default.default : _d, restProps = tslib_es6.__rest(_a, ["className", "contentClassName", "hasCloser", "sticky", "closerIcon"]);
    return (React__default.default.createElement(components_header_Component.Header, tslib_es6.__assign({ className: cn__default.default(className, (_b = {},
            _b[styles__default.default.sticky] = sticky,
            _b)), contentClassName: cn__default.default(styles__default.default.content, contentClassName), closer: hasCloser ? React__default.default.createElement(components_closer_Component.Closer, { icon: closerIcon, size: 'xs' }) : null, sticky: sticky }, restProps)));
};

exports.HeaderMobile = HeaderMobile;
