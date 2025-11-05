var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsFormControl = require('../../../../form-control/cssm');
var hooks = require('@alfalab/hooks');
var utils = require('../../utils.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Field = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 'm' : _c, open = _a.open; _a.multiple; var error = _a.error, hint = _a.hint, disabled = _a.disabled, label = _a.label, _d = _a.labelView, labelView = _d === void 0 ? 'inner' : _d, placeholder = _a.placeholder, _e = _a.selectedMultiple, selectedMultiple = _e === void 0 ? [] : _e, selected = _a.selected, rightAddons = _a.rightAddons, _f = _a.valueRenderer, valueRenderer = _f === void 0 ? utils.joinOptions : _f; _a.setSelectedItems; _a.toggleMenu; var Arrow = _a.Arrow, innerProps = _a.innerProps, dataTestId = _a.dataTestId, fieldClassName = _a.fieldClassName, restProps = tslib_es6.__rest(_a, ["size", "open", "multiple", "error", "hint", "disabled", "label", "labelView", "placeholder", "selectedMultiple", "selected", "rightAddons", "valueRenderer", "setSelectedItems", "toggleMenu", "Arrow", "innerProps", "dataTestId", "fieldClassName"]);
    var _g = React.useState(false), focused = _g[0], setFocused = _g[1];
    var wrapperRef = React.useRef(null);
    var focusVisible = hooks.useFocus(wrapperRef, 'keyboard')[0];
    var handleFocus = React.useCallback(function () { return setFocused(true); }, []);
    var handleBlur = React.useCallback(function () { return setFocused(false); }, []);
    var value = valueRenderer({ selected: selected, selectedMultiple: selectedMultiple });
    var filled = Boolean(value);
    var showLabel = !!label && (filled || !placeholder || labelView === 'outer');
    return (React__default.default.createElement("div", { className: styles__default.default.component, ref: wrapperRef, onFocus: handleFocus, onBlur: handleBlur },
        React__default.default.createElement(coreComponentsFormControl.FormControl, tslib_es6.__assign({ fieldClassName: cn__default.default(styles__default.default.field, fieldClassName, (_b = {},
                _b[styles__default.default.disabled] = disabled,
                _b[styles__default.default.focusVisible] = focusVisible,
                _b)), block: true, size: size, focused: open || focused, disabled: disabled, filled: filled, label: showLabel && label, labelView: labelView, error: error, hint: hint, rightAddons: (Arrow || rightAddons) && (React__default.default.createElement(React__default.default.Fragment, null,
                rightAddons,
                Arrow ? React__default.default.cloneElement(Arrow, { className: styles__default.default.arrow }) : null)), "data-test-id": dataTestId }, restProps, innerProps),
            React__default.default.createElement("div", { className: styles__default.default.contentWrapper },
                placeholder && !filled && (React__default.default.createElement("span", { className: styles__default.default.placeholder }, placeholder)),
                filled && React__default.default.createElement("div", { className: styles__default.default.value }, value)))));
};

exports.Field = Field;
