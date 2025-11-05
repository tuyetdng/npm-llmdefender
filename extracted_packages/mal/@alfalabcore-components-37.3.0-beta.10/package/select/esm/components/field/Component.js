import { _ as __rest, a as __assign } from '../../tslib.es6-0bbcaa10.js';
import React, { useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import { FormControl } from '../../../../form-control/esm';
import { useFocus } from '@alfalab/hooks';
import { joinOptions } from '../../utils.js';

var styles = {"component":"select__component_1kuji","field":"select__field_1kuji","disabled":"select__disabled_1kuji","arrow":"select__arrow_1kuji","placeholder":"select__placeholder_1kuji","contentWrapper":"select__contentWrapper_1kuji","value":"select__value_1kuji","focusVisible":"select__focusVisible_1kuji"};
require('./index.css');

var Field = function (_a) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 'm' : _c, open = _a.open; _a.multiple; var error = _a.error, hint = _a.hint, disabled = _a.disabled, label = _a.label, _d = _a.labelView, labelView = _d === void 0 ? 'inner' : _d, placeholder = _a.placeholder, _e = _a.selectedMultiple, selectedMultiple = _e === void 0 ? [] : _e, selected = _a.selected, rightAddons = _a.rightAddons, _f = _a.valueRenderer, valueRenderer = _f === void 0 ? joinOptions : _f; _a.setSelectedItems; _a.toggleMenu; var Arrow = _a.Arrow, innerProps = _a.innerProps, dataTestId = _a.dataTestId, fieldClassName = _a.fieldClassName, restProps = __rest(_a, ["size", "open", "multiple", "error", "hint", "disabled", "label", "labelView", "placeholder", "selectedMultiple", "selected", "rightAddons", "valueRenderer", "setSelectedItems", "toggleMenu", "Arrow", "innerProps", "dataTestId", "fieldClassName"]);
    var _g = useState(false), focused = _g[0], setFocused = _g[1];
    var wrapperRef = useRef(null);
    var focusVisible = useFocus(wrapperRef, 'keyboard')[0];
    var handleFocus = useCallback(function () { return setFocused(true); }, []);
    var handleBlur = useCallback(function () { return setFocused(false); }, []);
    var value = valueRenderer({ selected: selected, selectedMultiple: selectedMultiple });
    var filled = Boolean(value);
    var showLabel = !!label && (filled || !placeholder || labelView === 'outer');
    return (React.createElement("div", { className: styles.component, ref: wrapperRef, onFocus: handleFocus, onBlur: handleBlur },
        React.createElement(FormControl, __assign({ fieldClassName: cn(styles.field, fieldClassName, (_b = {},
                _b[styles.disabled] = disabled,
                _b[styles.focusVisible] = focusVisible,
                _b)), block: true, size: size, focused: open || focused, disabled: disabled, filled: filled, label: showLabel && label, labelView: labelView, error: error, hint: hint, rightAddons: (Arrow || rightAddons) && (React.createElement(React.Fragment, null,
                rightAddons,
                Arrow ? React.cloneElement(Arrow, { className: styles.arrow }) : null)), "data-test-id": dataTestId }, restProps, innerProps),
            React.createElement("div", { className: styles.contentWrapper },
                placeholder && !filled && (React.createElement("span", { className: styles.placeholder }, placeholder)),
                filled && React.createElement("div", { className: styles.value }, value)))));
};

export { Field };
