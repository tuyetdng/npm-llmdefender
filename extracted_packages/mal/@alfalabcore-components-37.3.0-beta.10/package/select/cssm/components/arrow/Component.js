var React = require('react');
var cn = require('classnames');
var ChevronDownMIcon = require('@alfalab/icons-glyph/ChevronDownMIcon');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Arrow = function (_a) {
    var _b;
    var open = _a.open, className = _a.className;
    return (React__default.default.createElement(ChevronDownMIcon.ChevronDownMIcon, { className: cn__default.default(styles__default.default.arrow, className, (_b = {}, _b[styles__default.default.open] = open, _b)) }));
};

exports.Arrow = Arrow;
