var React = require('react');
var cn = require('classnames');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"tabs__component_jtbhp","hidden":"tabs__hidden_jtbhp"};
require('./index.css');

var Tab = function (_a) {
    var _b;
    var children = _a.children, hidden = _a.hidden, className = _a.className, disabled = _a.disabled, dataTestId = _a.dataTestId;
    return children ? (React__default.default.createElement("div", { className: cn__default.default(styles.component, (_b = {},
            _b[styles.hidden] = hidden,
            _b), className), hidden: hidden, role: 'tabpanel', tabIndex: disabled ? -1 : 0, "data-test-id": dataTestId }, children)) : null;
};

exports.Tab = Tab;
