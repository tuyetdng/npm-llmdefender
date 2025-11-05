var React = require('react');
var cn = require('classnames');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Gap = function (_a) {
    var size = _a.size, _b = _a.direction, direction = _b === void 0 ? 'vertical' : _b, _c = _a.tag, Component = _c === void 0 ? 'div' : _c, className = _a.className, dataTestId = _a.dataTestId;
    return (React__default.default.createElement(Component, { "data-test-id": dataTestId, "data-gap-size": size, className: cn__default.default(styles__default.default.gap, styles__default.default[direction], className) }));
};

exports.Gap = Gap;
