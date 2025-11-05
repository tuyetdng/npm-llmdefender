var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"optgroup":"select__optgroup_1yxqk","label":"select__label_1yxqk","l":"select__l_1yxqk","xl":"select__xl_1yxqk"};
require('./index.css');

var Optgroup = function (_a) {
    var children = _a.children, className = _a.className, label = _a.label, _b = _a.size, size = _b === void 0 ? 's' : _b;
    return (React__default.default.createElement(React__default.default.Fragment, null,
        React__default.default.createElement("div", { className: cn__default.default(styles.optgroup, className, styles[size]) },
            React__default.default.createElement("span", { className: styles.label }, label)),
        children));
};

exports.Optgroup = Optgroup;
