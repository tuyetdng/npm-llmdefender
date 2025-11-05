var tslib_es6 = require('../tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsFormControl = require('../../../form-control/cssm');
var hooks = require('@alfalab/hooks');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var AutocompleteMobileField = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 'm' : _c; _a.open; var error = _a.error, hint = _a.hint, disabled = _a.disabled, label = _a.label, _d = _a.labelView, labelView = _d === void 0 ? 'inner' : _d, placeholder = _a.placeholder, value = _a.value, innerProps = _a.innerProps, dataTestId = _a.dataTestId, fieldClassName = _a.fieldClassName, Arrow = _a.Arrow; _a.valueRenderer; _a.toggleMenu; _a.setSelectedItems; _a.selectedMultiple; var restProps = tslib_es6.__rest(_a, ["size", "open", "error", "hint", "disabled", "label", "labelView", "placeholder", "value", "innerProps", "dataTestId", "fieldClassName", "Arrow", "valueRenderer", "toggleMenu", "setSelectedItems", "selectedMultiple"]);
    var _e = React.useState(false), focused = _e[0], setFocused = _e[1];
    var wrapperRef = React.useRef(null);
    var focusVisible = hooks.useFocus(wrapperRef, 'keyboard')[0];
    var filled = Boolean(value);
    var showLabel = !!label && (filled || !placeholder || labelView === 'outer');
    return (React__default.default.createElement("div", { className: styles__default.default.component, ref: wrapperRef, onFocus: function () { return setFocused(true); }, onBlur: function () { return setFocused(false); } },
        React__default.default.createElement(coreComponentsFormControl.FormControl, tslib_es6.__assign({ fieldClassName: cn__default.default(styles__default.default.field, fieldClassName, (_b = {},
                _b[styles__default.default.disabled] = disabled,
                _b[styles__default.default.focusVisible] = focusVisible,
                _b)), block: true, size: size, focused: focused, disabled: disabled, filled: filled, label: showLabel && label, labelView: labelView, error: error, hint: hint, rightAddons: Arrow, "data-test-id": dataTestId }, restProps, innerProps),
            React__default.default.createElement("div", { className: styles__default.default.contentWrapper },
                placeholder && !filled && (React__default.default.createElement("span", { className: styles__default.default.placeholder }, placeholder)),
                filled && React__default.default.createElement("div", { className: styles__default.default.value }, value)))));
};

exports.AutocompleteMobileField = AutocompleteMobileField;
