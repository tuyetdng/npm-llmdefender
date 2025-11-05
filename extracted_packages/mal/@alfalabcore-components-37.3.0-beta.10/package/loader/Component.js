var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"loader__component_1u243","blink":"loader__blink_1u243"};
require('./index.css');

var Loader = function (_a) {
    var className = _a.className, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, className), "data-test-id": dataTestId },
        React__default.default.createElement("div", null),
        React__default.default.createElement("div", null),
        React__default.default.createElement("div", null)));
};

exports.Loader = Loader;
