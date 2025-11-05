import React, { useState, useRef, useCallback } from 'react';
import cn from 'classnames';
import { FormControl } from '../../../../form-control/modern';
import { useFocus } from '@alfalab/hooks';
import { joinOptions } from '../../utils.js';

const styles = {"component":"select__component_1kuji","field":"select__field_1kuji","disabled":"select__disabled_1kuji","arrow":"select__arrow_1kuji","placeholder":"select__placeholder_1kuji","contentWrapper":"select__contentWrapper_1kuji","value":"select__value_1kuji","focusVisible":"select__focusVisible_1kuji"};
require('./index.css');

const Field = ({ size = 'm', open, multiple, error, hint, disabled, label, labelView = 'inner', placeholder, selectedMultiple = [], selected, rightAddons, valueRenderer = joinOptions, setSelectedItems, toggleMenu, Arrow, innerProps, dataTestId, fieldClassName, ...restProps }) => {
    const [focused, setFocused] = useState(false);
    const wrapperRef = useRef(null);
    const [focusVisible] = useFocus(wrapperRef, 'keyboard');
    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);
    const value = valueRenderer({ selected, selectedMultiple });
    const filled = Boolean(value);
    const showLabel = !!label && (filled || !placeholder || labelView === 'outer');
    return (React.createElement("div", { className: styles.component, ref: wrapperRef, onFocus: handleFocus, onBlur: handleBlur },
        React.createElement(FormControl, { fieldClassName: cn(styles.field, fieldClassName, {
                [styles.disabled]: disabled,
                [styles.focusVisible]: focusVisible,
            }), block: true, size: size, focused: open || focused, disabled: disabled, filled: filled, label: showLabel && label, labelView: labelView, error: error, hint: hint, rightAddons: (Arrow || rightAddons) && (React.createElement(React.Fragment, null,
                rightAddons,
                Arrow ? React.cloneElement(Arrow, { className: styles.arrow }) : null)), "data-test-id": dataTestId, ...restProps, ...innerProps },
            React.createElement("div", { className: styles.contentWrapper },
                placeholder && !filled && (React.createElement("span", { className: styles.placeholder }, placeholder)),
                filled && React.createElement("div", { className: styles.value }, value)))));
};

export { Field };
