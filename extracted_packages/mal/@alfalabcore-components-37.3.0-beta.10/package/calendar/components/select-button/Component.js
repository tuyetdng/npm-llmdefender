var tslib_es6 = require('../../tslib.es6-e98b28a2.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../button');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"button":"calendar__button_9j6vw","filled":"calendar__filled_9j6vw","outlined":"calendar__outlined_9j6vw","selected":"calendar__selected_9j6vw"};
require('./index.css');

var SelectButton = React.forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, _b = _a.view, view = _b === void 0 ? 'default' : _b, restProps = tslib_es6.__rest(_a, ["className", "children", "view"]);
    return (React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({}, restProps, { ref: ref, view: 'ghost', size: 'xs', className: cn__default.default(styles.button, styles[view], className) }), children));
});

exports.SelectButton = SelectButton;
