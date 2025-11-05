var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"container":"progress-bar__container_ocl1l","s":"progress-bar__s_ocl1l","m":"progress-bar__m_ocl1l","filled":"progress-bar__filled_ocl1l","positive":"progress-bar__positive_ocl1l","negative":"progress-bar__negative_ocl1l","attention":"progress-bar__attention_ocl1l","link":"progress-bar__link_ocl1l","tertiary":"progress-bar__tertiary_ocl1l","secondary":"progress-bar__secondary_ocl1l","primary":"progress-bar__primary_ocl1l","accent":"progress-bar__accent_ocl1l"};
require('./index.css');

var ProgressBar = React__default.default.forwardRef(function (_a, ref) {
    var className = _a.className, value = _a.value, _b = _a.view, view = _b === void 0 ? 'positive' : _b, _c = _a.size, size = _c === void 0 ? 'm' : _c, dataTestId = _a.dataTestId;
    var translateX = Math.max(-100, Math.min(0, value - 100));
    return (React__default.default.createElement("div", { role: 'progressbar', "aria-valuenow": Math.round(value), "aria-valuemin": 0, "aria-valuemax": 100, className: cn__default.default(styles.container, styles[size], className), "data-test-id": dataTestId, ref: ref },
        React__default.default.createElement("div", { className: cn__default.default(styles.filled, styles[view]), style: { transform: "translateX(".concat(translateX, "%)") } })));
});

exports.ProgressBar = ProgressBar;
