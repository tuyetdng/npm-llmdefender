import { _ as __rest, a as __assign } from '../tslib.es6-c603502c.js';
import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { FormControl } from '../../../form-control/esm';
import { useFocus } from '@alfalab/hooks';

var styles = {"component":"input-autocomplete__component_17hpw","field":"input-autocomplete__field_17hpw","disabled":"input-autocomplete__disabled_17hpw","placeholder":"input-autocomplete__placeholder_17hpw","contentWrapper":"input-autocomplete__contentWrapper_17hpw","value":"input-autocomplete__value_17hpw","focusVisible":"input-autocomplete__focusVisible_17hpw"};
require('./index.css');

var AutocompleteMobileField = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 'm' : _c; _a.open; var error = _a.error, hint = _a.hint, disabled = _a.disabled, label = _a.label, _d = _a.labelView, labelView = _d === void 0 ? 'inner' : _d, placeholder = _a.placeholder, value = _a.value, innerProps = _a.innerProps, dataTestId = _a.dataTestId, fieldClassName = _a.fieldClassName, Arrow = _a.Arrow; _a.valueRenderer; _a.toggleMenu; _a.setSelectedItems; _a.selectedMultiple; var restProps = __rest(_a, ["size", "open", "error", "hint", "disabled", "label", "labelView", "placeholder", "value", "innerProps", "dataTestId", "fieldClassName", "Arrow", "valueRenderer", "toggleMenu", "setSelectedItems", "selectedMultiple"]);
    var _e = useState(false), focused = _e[0], setFocused = _e[1];
    var wrapperRef = useRef(null);
    var focusVisible = useFocus(wrapperRef, 'keyboard')[0];
    var filled = Boolean(value);
    var showLabel = !!label && (filled || !placeholder || labelView === 'outer');
    return (React.createElement("div", { className: styles.component, ref: wrapperRef, onFocus: function () { return setFocused(true); }, onBlur: function () { return setFocused(false); } },
        React.createElement(FormControl, __assign({ fieldClassName: cn(styles.field, fieldClassName, (_b = {},
                _b[styles.disabled] = disabled,
                _b[styles.focusVisible] = focusVisible,
                _b)), block: true, size: size, focused: focused, disabled: disabled, filled: filled, label: showLabel && label, labelView: labelView, error: error, hint: hint, rightAddons: Arrow, "data-test-id": dataTestId }, restProps, innerProps),
            React.createElement("div", { className: styles.contentWrapper },
                placeholder && !filled && (React.createElement("span", { className: styles.placeholder }, placeholder)),
                filled && React.createElement("div", { className: styles.value }, value)))));
};

export { AutocompleteMobileField };
