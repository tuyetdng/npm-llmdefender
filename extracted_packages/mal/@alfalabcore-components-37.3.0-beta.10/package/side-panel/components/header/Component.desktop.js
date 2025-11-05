var tslib_es6 = require('../../tslib.es6-9c29edce.js');
var React = require('react');
var cn = require('classnames');
var CrossHeavyMIcon = require('@alfalab/icons-glyph/CrossHeavyMIcon');
var components_closer_Component = require('../closer/Component.js');
var components_header_Component = require('./Component.js');
require('../../../icon-button');
require('../../Context.js');
require('../../../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"content":"side-panel__content_1wmke","s":"side-panel__s_1wmke","hasContent":"side-panel__hasContent_1wmke","sticky":"side-panel__sticky_1wmke"};
require('./desktop.css');

var HeaderDesktop = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, className = _a.className, contentClassName = _a.contentClassName, _d = _a.hasCloser, hasCloser = _d === void 0 ? true : _d, _e = _a.closerIcon, closerIcon = _e === void 0 ? CrossHeavyMIcon.CrossHeavyMIcon : _e, sticky = _a.sticky, _f = _a.leftAddons, leftAddons = _f === void 0 ? React__default.default.createElement("span", null) : _f, title = _a.title, children = _a.children, restProps = tslib_es6.__rest(_a, ["size", "className", "contentClassName", "hasCloser", "closerIcon", "sticky", "leftAddons", "title", "children"]);
    var hasContent = Boolean(title || children);
    return (React__default.default.createElement(components_header_Component.Header, tslib_es6.__assign({ className: cn__default.default(className, size && styles[size], (_b = {},
            _b[styles.sticky] = sticky,
            _b[styles.hasContent] = hasContent,
            _b)), contentClassName: cn__default.default(styles.content, contentClassName), closer: hasCloser ? React__default.default.createElement(components_closer_Component.Closer, { icon: closerIcon }) : null, leftAddons: leftAddons, sticky: sticky, title: title }, restProps), children));
};

exports.HeaderDesktop = HeaderDesktop;
