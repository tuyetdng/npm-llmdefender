var React = require('react');
var cn = require('classnames');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Optgroup = function (_a) {
    var children = _a.children, className = _a.className, label = _a.label, _b = _a.size, size = _b === void 0 ? 's' : _b;
    return (React__default.default.createElement(React__default.default.Fragment, null,
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.optgroup, className, styles__default.default[size]) },
            React__default.default.createElement("span", { className: styles__default.default.label }, label)),
        children));
};

exports.Optgroup = Optgroup;
