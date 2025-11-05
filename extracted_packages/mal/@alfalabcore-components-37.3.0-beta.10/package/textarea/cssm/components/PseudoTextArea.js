var React = require('react');
var cn = require('classnames');
var styles = require('../index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var PseudoTextArea = React.forwardRef(function (_a, ref) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, pseudoTextareaClassName = _a.pseudoTextareaClassName, maxLength = _a.maxLength, value = _a.value;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.pseudoTextarea, styles__default.default[size], pseudoTextareaClassName), ref: ref, hidden: true },
        React__default.default.createElement("span", null, value.slice(0, maxLength)),
        React__default.default.createElement("span", { className: cn__default.default(styles__default.default.overflow) }, value.slice(maxLength)),
        React__default.default.createElement("br", null)));
});

exports.PseudoTextArea = PseudoTextArea;
