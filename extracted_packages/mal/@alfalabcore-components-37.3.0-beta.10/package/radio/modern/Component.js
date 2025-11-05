import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';

const styles = {"container":"radio__container_ik2c1","checked":"radio__checked_ik2c1","disabled":"radio__disabled_ik2c1","inactive":"radio__inactive_ik2c1","circle":"radio__circle_ik2c1","label":"radio__label_ik2c1","hint":"radio__hint_ik2c1","focused":"radio__focused_ik2c1","s":"radio__s_ik2c1","content":"radio__content_ik2c1","start":"radio__start_ik2c1","center":"radio__center_ik2c1","addons":"radio__addons_ik2c1","block":"radio__block_ik2c1"};
require('./index.css');

const Radio = forwardRef(({ onChange, className, circleClassName, contentClassName, name, disabled, inactive, dataTestId, label, checked, hint, size = 's', align = 'start', addons, block, ...restProps }, ref) => {
    const labelRef = useRef(null);
    const [focused] = useFocus(labelRef, 'keyboard');
    const handleChange = (event) => {
        if (onChange) {
            onChange(event, { checked: event.target.checked, name });
        }
    };
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    React.createElement("label", { className: cn(styles.container, styles[size], styles[align], className, {
            [styles.disabled]: disabled,
            [styles.inactive]: inactive,
            [styles.checked]: checked,
            [styles.focused]: focused,
            [styles.block]: block,
        }), ref: mergeRefs([labelRef, ref]) },
        React.createElement("input", { type: 'radio', onChange: handleChange, "data-test-id": dataTestId, disabled: disabled || inactive, checked: checked, name: name, ...restProps }),
        React.createElement("span", { className: cn(styles.circle, circleClassName) }),
        (label || hint) && (React.createElement("span", { className: cn(styles.content, contentClassName) },
            label && React.createElement("span", { className: styles.label }, label),
            hint && React.createElement("span", { className: styles.hint }, hint))),
        addons && React.createElement("span", { className: styles.addons }, addons)));
});

export { Radio };
