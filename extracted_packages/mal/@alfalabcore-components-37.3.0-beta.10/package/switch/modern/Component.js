import React, { forwardRef, useRef, useCallback } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';

const styles = {"component":"switch__component_4pdv6","start":"switch__start_4pdv6","center":"switch__center_4pdv6","addons":"switch__addons_4pdv6","block":"switch__block_4pdv6","switch":"switch__switch_4pdv6","content":"switch__content_4pdv6","label":"switch__label_4pdv6","hint":"switch__hint_4pdv6","reversed":"switch__reversed_4pdv6","checked":"switch__checked_4pdv6","disabled":"switch__disabled_4pdv6","inactive":"switch__inactive_4pdv6","focused":"switch__focused_4pdv6"};
require('./index.css');

const Switch = forwardRef(({ reversed = false, checked = false, align = 'start', addons, block, disabled, inactive, label, hint, name, value, className, onChange, dataTestId, ...restProps }, ref) => {
    const labelRef = useRef(null);
    const [focused] = useFocus(labelRef, 'keyboard');
    const handleChange = useCallback((e) => {
        if (onChange) {
            onChange(e, { checked: e.target.checked, name });
        }
    }, [onChange, name]);
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    React.createElement("label", { className: cn(styles.component, styles[align], className, {
            [styles.disabled]: disabled,
            [styles.inactive]: inactive,
            [styles.checked]: checked,
            [styles.reversed]: reversed,
            [styles.focused]: focused,
            [styles.block]: block,
        }), ref: mergeRefs([labelRef, ref]) },
        React.createElement("input", { type: 'checkbox', onChange: handleChange, disabled: disabled || inactive, checked: checked, name: name, value: value, "data-test-id": dataTestId, ...restProps }),
        React.createElement("span", { className: styles.switch }),
        (label || hint) && (React.createElement("span", { className: styles.content },
            label && React.createElement("span", { className: styles.label }, label),
            hint && React.createElement("span", { className: styles.hint }, hint))),
        addons && React.createElement("span", { className: styles.addons }, addons)));
});

export { Switch };
