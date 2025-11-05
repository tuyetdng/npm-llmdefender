var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../button');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"pass-code__component_1y7g6","button":"pass-code__button_1y7g6","secondary":"pass-code__secondary_1y7g6","ghost":"pass-code__ghost_1y7g6"};
require('./index.css');

function KeyPadButton(_a) {
    var children = _a.children, onClick = _a.onClick, className = _a.className, _b = _a.view, view = _b === void 0 ? 'secondary' : _b, buttonClassName = _a.buttonClassName;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, className) },
        React__default.default.createElement(coreComponentsButton.Button, { className: cn__default.default(styles.button, styles[view], buttonClassName), view: view, onClick: function () { return onClick === null || onClick === void 0 ? void 0 : onClick(children); } }, children)));
}

exports.KeyPadButton = KeyPadButton;
