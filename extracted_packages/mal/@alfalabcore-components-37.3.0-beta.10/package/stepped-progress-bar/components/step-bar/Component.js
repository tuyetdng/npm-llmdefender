var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"bar":"stepped-progress-bar__bar_3hgxe","positive":"stepped-progress-bar__positive_3hgxe","attention":"stepped-progress-bar__attention_3hgxe","negative":"stepped-progress-bar__negative_3hgxe","link":"stepped-progress-bar__link_3hgxe","tertiary":"stepped-progress-bar__tertiary_3hgxe","secondary":"stepped-progress-bar__secondary_3hgxe","primary":"stepped-progress-bar__primary_3hgxe","accent":"stepped-progress-bar__accent_3hgxe"};
require('./index.css');

var StepBar = React.memo(function (_a) {
    var isDone = _a.isDone, _b = _a.view, view = _b === void 0 ? 'positive' : _b;
    return (React__default.default.createElement("span", { "data-test-id": isDone ? 'on' : 'off', className: cn__default.default(styles.bar, isDone && styles[view]) }));
});

exports.StepBar = StepBar;
