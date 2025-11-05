var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"scrollable":"textarea__scrollable_1f5bc","scrollableWrapper":"textarea__scrollableWrapper_1f5bc","textarea":"textarea__textarea_1f5bc","s":"textarea__s_1f5bc","m":"textarea__m_1f5bc","l":"textarea__l_1f5bc","xl":"textarea__xl_1f5bc","textareaHidden":"textarea__textareaHidden_1f5bc","hasInnerLabel":"textarea__hasInnerLabel_1f5bc","resizeVertical":"textarea__resizeVertical_1f5bc","pseudoTextarea":"textarea__pseudoTextarea_1f5bc","overflow":"textarea__overflow_1f5bc","nativeScrollbar":"textarea__nativeScrollbar_1f5bc","customScrollbar":"textarea__customScrollbar_1f5bc","sub":"textarea__sub_1f5bc","scrollableWithLabel":"textarea__scrollableWithLabel_1f5bc","focusVisible":"textarea__focusVisible_1f5bc","filled":"textarea__filled_1f5bc"};
require('./index.css');

var PseudoTextArea = React.forwardRef(function (_a, ref) {
    var _b = _a.size, size = _b === void 0 ? 's' : _b, pseudoTextareaClassName = _a.pseudoTextareaClassName, maxLength = _a.maxLength, value = _a.value;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.pseudoTextarea, styles[size], pseudoTextareaClassName), ref: ref, hidden: true },
        React__default.default.createElement("span", null, value.slice(0, maxLength)),
        React__default.default.createElement("span", { className: cn__default.default(styles.overflow) }, value.slice(maxLength)),
        React__default.default.createElement("br", null)));
});

exports.PseudoTextArea = PseudoTextArea;
exports.styles = styles;
