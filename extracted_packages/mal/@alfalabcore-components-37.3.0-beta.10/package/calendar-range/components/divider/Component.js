var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"calendar-range__component_eslzr","outer":"calendar-range__outer_eslzr","s":"calendar-range__s_eslzr","m":"calendar-range__m_eslzr","l":"calendar-range__l_eslzr","xl":"calendar-range__xl_eslzr"};
require('./index.css');

var Divider = function (_a) {
    var _b;
    var inputFromProps = _a.inputFromProps, inputToProps = _a.inputToProps;
    var outer = (inputFromProps === null || inputFromProps === void 0 ? void 0 : inputFromProps.label) &&
        (inputFromProps === null || inputFromProps === void 0 ? void 0 : inputFromProps.labelView) === 'outer' &&
        (inputToProps === null || inputToProps === void 0 ? void 0 : inputToProps.label) &&
        (inputToProps === null || inputToProps === void 0 ? void 0 : inputToProps.labelView) === 'outer';
    var size = (inputFromProps === null || inputFromProps === void 0 ? void 0 : inputFromProps.size) || (inputToProps === null || inputToProps === void 0 ? void 0 : inputToProps.size) || 's';
    return React__default.default.createElement("span", { className: cn__default.default(styles.component, styles[size], (_b = {}, _b[styles.outer] = outer, _b)) });
};

exports.Divider = Divider;
