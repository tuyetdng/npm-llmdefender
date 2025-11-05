var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"divider__component_1bs2b"};
require('./index.css');

var Divider = function (_a) {
    var className = _a.className, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("hr", { className: cn__default.default(styles.component, className), "data-test-id": dataTestId }));
};

exports.Divider = Divider;
