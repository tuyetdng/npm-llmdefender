var tslib_es6 = require('../tslib.es6-73246b1c.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsFormControl = require('../../form-control');
var hooks = require('@alfalab/hooks');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"input-autocomplete__component_17hpw","field":"input-autocomplete__field_17hpw","disabled":"input-autocomplete__disabled_17hpw","placeholder":"input-autocomplete__placeholder_17hpw","contentWrapper":"input-autocomplete__contentWrapper_17hpw","value":"input-autocomplete__value_17hpw","focusVisible":"input-autocomplete__focusVisible_17hpw"};
require('./index.css');

var AutocompleteMobileField = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 'm' : _c; _a.open; var error = _a.error, hint = _a.hint, disabled = _a.disabled, label = _a.label, _d = _a.labelView, labelView = _d === void 0 ? 'inner' : _d, placeholder = _a.placeholder, value = _a.value, innerProps = _a.innerProps, dataTestId = _a.dataTestId, fieldClassName = _a.fieldClassName, Arrow = _a.Arrow; _a.valueRenderer; _a.toggleMenu; _a.setSelectedItems; _a.selectedMultiple; var restProps = tslib_es6.__rest(_a, ["size", "open", "error", "hint", "disabled", "label", "labelView", "placeholder", "value", "innerProps", "dataTestId", "fieldClassName", "Arrow", "valueRenderer", "toggleMenu", "setSelectedItems", "selectedMultiple"]);
    var _e = React.useState(false), focused = _e[0], setFocused = _e[1];
    var wrapperRef = React.useRef(null);
    var focusVisible = hooks.useFocus(wrapperRef, 'keyboard')[0];
    var filled = Boolean(value);
    var showLabel = !!label && (filled || !placeholder || labelView === 'outer');
    return (React__default.default.createElement("div", { className: styles.component, ref: wrapperRef, onFocus: function () { return setFocused(true); }, onBlur: function () { return setFocused(false); } },
        React__default.default.createElement(coreComponentsFormControl.FormControl, tslib_es6.__assign({ fieldClassName: cn__default.default(styles.field, fieldClassName, (_b = {},
                _b[styles.disabled] = disabled,
                _b[styles.focusVisible] = focusVisible,
                _b)), block: true, size: size, focused: focused, disabled: disabled, filled: filled, label: showLabel && label, labelView: labelView, error: error, hint: hint, rightAddons: Arrow, "data-test-id": dataTestId }, restProps, innerProps),
            React__default.default.createElement("div", { className: styles.contentWrapper },
                placeholder && !filled && (React__default.default.createElement("span", { className: styles.placeholder }, placeholder)),
                filled && React__default.default.createElement("div", { className: styles.value }, value)))));
};

exports.AutocompleteMobileField = AutocompleteMobileField;
