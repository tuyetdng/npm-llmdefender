var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../../button/cssm');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var SelectButton = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, _b = _a.view, view = _b === void 0 ? 'default' : _b, restProps = tslib_es6.__rest(_a, ["className", "children", "view"]);
    return (React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({}, restProps, { ref: ref, view: 'ghost', size: 'xs', className: cn__default.default(styles__default.default.button, styles__default.default[view], className) }), children));
});

exports.SelectButton = SelectButton;
