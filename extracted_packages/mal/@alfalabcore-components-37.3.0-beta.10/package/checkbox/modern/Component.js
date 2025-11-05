import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { CheckmarkCompactMIcon } from '@alfalab/icons-glyph/CheckmarkCompactMIcon';

const styles = {"component":"checkbox__component_1osos","start":"checkbox__start_1osos","center":"checkbox__center_1osos","addons":"checkbox__addons_1osos","block":"checkbox__block_1osos","box":"checkbox__box_1osos","checkedIcon":"checkbox__checkedIcon_1osos","s":"checkbox__s_1osos","disabled":"checkbox__disabled_1osos","inactive":"checkbox__inactive_1osos","checked":"checkbox__checked_1osos","indeterminate":"checkbox__indeterminate_1osos","label":"checkbox__label_1osos","hint":"checkbox__hint_1osos","focused":"checkbox__focused_1osos","content":"checkbox__content_1osos","errorMessage":"checkbox__errorMessage_1osos","indeterminateLine":"checkbox__indeterminateLine_1osos"};
require('./index.css');

const Checkbox = forwardRef(({ checked, label, hint, size = 's', boxClassName, contentClassName, align = 'start', addons, block, onChange, className, name, disabled, inactive, dataTestId, indeterminate = false, error, ...restProps }, ref) => {
    const labelRef = useRef(null);
    const [focused] = useFocus(labelRef, 'keyboard');
    const handleChange = (event) => {
        if (onChange) {
            onChange(event, { checked: event.target.checked, name });
        }
    };
    const errorMessage = typeof error === 'boolean' ? '' : error;
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    React.createElement("label", { className: cn(styles.component, styles[size], styles[align], className, {
            [styles.disabled]: disabled,
            [styles.inactive]: inactive,
            [styles.checked]: checked,
            [styles.indeterminate]: indeterminate,
            [styles.focused]: focused,
            [styles.block]: block,
        }), ref: mergeRefs([labelRef, ref]) },
        React.createElement("input", { type: 'checkbox', onChange: handleChange, disabled: disabled || inactive, checked: checked, "data-test-id": dataTestId, ...restProps }),
        React.createElement("span", { className: cn(styles.box, boxClassName) },
            checked && React.createElement(CheckmarkCompactMIcon, { className: styles.checkedIcon }),
            indeterminate && !checked && React.createElement("span", { className: styles.indeterminateLine })),
        (label || hint || errorMessage) && (React.createElement("span", { className: cn(styles.content, contentClassName) },
            label && React.createElement("span", { className: styles.label }, label),
            hint && !errorMessage && React.createElement("span", { className: styles.hint }, hint),
            errorMessage && (React.createElement("span", { className: styles.errorMessage, role: 'alert' }, errorMessage)))),
        addons && React.createElement("span", { className: styles.addons }, addons)));
});
/**
 * Для отображения в сторибуке
 */
Checkbox.defaultProps = {
    indeterminate: false,
};

export { Checkbox };
