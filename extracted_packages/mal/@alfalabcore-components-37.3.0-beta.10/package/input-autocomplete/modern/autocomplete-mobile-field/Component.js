import React, { useState, useRef } from 'react';
import cn from 'classnames';
import { FormControl } from '../../../form-control/modern';
import { useFocus } from '@alfalab/hooks';

const styles = {"component":"input-autocomplete__component_17hpw","field":"input-autocomplete__field_17hpw","disabled":"input-autocomplete__disabled_17hpw","placeholder":"input-autocomplete__placeholder_17hpw","contentWrapper":"input-autocomplete__contentWrapper_17hpw","value":"input-autocomplete__value_17hpw","focusVisible":"input-autocomplete__focusVisible_17hpw"};
require('./index.css');

const AutocompleteMobileField = ({ size = 'm', open, error, hint, disabled, label, labelView = 'inner', placeholder, value, innerProps, dataTestId, fieldClassName, Arrow, valueRenderer, toggleMenu, setSelectedItems, selectedMultiple, ...restProps }) => {
    const [focused, setFocused] = useState(false);
    const wrapperRef = useRef(null);
    const [focusVisible] = useFocus(wrapperRef, 'keyboard');
    const filled = Boolean(value);
    const showLabel = !!label && (filled || !placeholder || labelView === 'outer');
    return (React.createElement("div", { className: styles.component, ref: wrapperRef, onFocus: () => setFocused(true), onBlur: () => setFocused(false) },
        React.createElement(FormControl, { fieldClassName: cn(styles.field, fieldClassName, {
                [styles.disabled]: disabled,
                [styles.focusVisible]: focusVisible,
            }), block: true, size: size, focused: focused, disabled: disabled, filled: filled, label: showLabel && label, labelView: labelView, error: error, hint: hint, rightAddons: Arrow, "data-test-id": dataTestId, ...restProps, ...innerProps },
            React.createElement("div", { className: styles.contentWrapper },
                placeholder && !filled && (React.createElement("span", { className: styles.placeholder }, placeholder)),
                filled && React.createElement("div", { className: styles.value }, value)))));
};

export { AutocompleteMobileField };
