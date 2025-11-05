var React = require('react');
var cn = require('classnames');
var ChevronDownMIcon = require('@alfalab/icons-glyph/ChevronDownMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"arrow":"select__arrow_1c6c2","open":"select__open_1c6c2"};
require('./index.css');

var Arrow = function (_a) {
    var _b;
    var open = _a.open, className = _a.className;
    return (React__default.default.createElement(ChevronDownMIcon.ChevronDownMIcon, { className: cn__default.default(styles.arrow, className, (_b = {}, _b[styles.open] = open, _b)) }));
};

exports.Arrow = Arrow;
