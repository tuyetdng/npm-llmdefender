var React = require('react');
var cn = require('classnames');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var ProgressBar = React__default.default.forwardRef(function (_a, ref) {
    var className = _a.className, value = _a.value, _b = _a.view, view = _b === void 0 ? 'positive' : _b, _c = _a.size, size = _c === void 0 ? 'm' : _c, dataTestId = _a.dataTestId;
    var translateX = Math.max(-100, Math.min(0, value - 100));
    return (React__default.default.createElement("div", { role: 'progressbar', "aria-valuenow": Math.round(value), "aria-valuemin": 0, "aria-valuemax": 100, className: cn__default.default(styles__default.default.container, styles__default.default[size], className), "data-test-id": dataTestId, ref: ref },
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.filled, styles__default.default[view]), style: { transform: "translateX(".concat(translateX, "%)") } })));
});

exports.ProgressBar = ProgressBar;
