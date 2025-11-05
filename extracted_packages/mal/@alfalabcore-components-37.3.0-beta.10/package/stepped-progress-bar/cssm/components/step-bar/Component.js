var React = require('react');
var cn = require('classnames');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var StepBar = React.memo(function (_a) {
    var isDone = _a.isDone, _b = _a.view, view = _b === void 0 ? 'positive' : _b;
    return (React__default.default.createElement("span", { "data-test-id": isDone ? 'on' : 'off', className: cn__default.default(styles__default.default.bar, isDone && styles__default.default[view]) }));
});

exports.StepBar = StepBar;
