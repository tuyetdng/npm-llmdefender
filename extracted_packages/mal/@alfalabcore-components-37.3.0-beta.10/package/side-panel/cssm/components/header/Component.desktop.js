var tslib_es6 = require('../../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var CrossHeavyMIcon = require('@alfalab/icons-glyph/CrossHeavyMIcon');
var components_closer_Component = require('../closer/Component.js');
var components_header_Component = require('./Component.js');
var styles = require('./desktop.module.css');
require('../../../../icon-button/cssm');
require('../../Context.js');
require('../../../../base-modal/cssm');
require('../closer/index.module.css');
require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var HeaderDesktop = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, className = _a.className, contentClassName = _a.contentClassName, _d = _a.hasCloser, hasCloser = _d === void 0 ? true : _d, _e = _a.closerIcon, closerIcon = _e === void 0 ? CrossHeavyMIcon.CrossHeavyMIcon : _e, sticky = _a.sticky, _f = _a.leftAddons, leftAddons = _f === void 0 ? React__default.default.createElement("span", null) : _f, title = _a.title, children = _a.children, restProps = tslib_es6.__rest(_a, ["size", "className", "contentClassName", "hasCloser", "closerIcon", "sticky", "leftAddons", "title", "children"]);
    var hasContent = Boolean(title || children);
    return (React__default.default.createElement(components_header_Component.Header, tslib_es6.__assign({ className: cn__default.default(className, size && styles__default.default[size], (_b = {},
            _b[styles__default.default.sticky] = sticky,
            _b[styles__default.default.hasContent] = hasContent,
            _b)), contentClassName: cn__default.default(styles__default.default.content, contentClassName), closer: hasCloser ? React__default.default.createElement(components_closer_Component.Closer, { icon: closerIcon }) : null, leftAddons: leftAddons, sticky: sticky, title: title }, restProps), children));
};

exports.HeaderDesktop = HeaderDesktop;
