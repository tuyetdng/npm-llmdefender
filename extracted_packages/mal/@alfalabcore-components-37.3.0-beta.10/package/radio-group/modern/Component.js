import React, { forwardRef, useState, Children, isValidElement, cloneElement } from 'react';
import cn from 'classnames';

const styles = {"component":"radio-group__component_pnspl","error":"radio-group__error_pnspl","radioList":"radio-group__radioList_pnspl","vertical":"radio-group__vertical_pnspl","radio":"radio-group__radio_pnspl","horizontal":"radio-group__horizontal_pnspl","tag":"radio-group__tag_pnspl","tagLabel":"radio-group__tagLabel_pnspl","label":"radio-group__label_pnspl","sub":"radio-group__sub_pnspl","errorMessage":"radio-group__errorMessage_pnspl","hint":"radio-group__hint_pnspl","hiddenInput":"radio-group__hiddenInput_pnspl"};
require('./index.css');

const RadioGroup = forwardRef(({ children, className, direction = 'vertical', label, error, hint, onChange, onBlur, onFocus, type = 'radio', dataTestId, disabled = false, name, value, }, ref) => {
    const [stateValue, setStateValue] = useState('');
    const renderRadio = (child) => {
        const { className: childClassName } = child.props;
        const checked = value !== null && (value || stateValue) === child.props.value;
        const handleChange = (event) => {
            setStateValue(child.props.value);
            if (onChange) {
                onChange(event, { name, value: child.props.value });
            }
        };
        return cloneElement(child, {
            onChange: handleChange,
            disabled,
            ...child.props,
            checked,
            name,
            className: cn(childClassName, styles.radio),
        });
    };
    const renderTag = (child) => {
        const checked = value !== null && (value || stateValue) === child.props.value;
        const handleChange = (event) => {
            setStateValue(child.props.value);
            if (onChange) {
                onChange(event, { name, value: child.props.value });
            }
        };
        const clone = cloneElement(child, {
            onClick: handleChange,
            disabled,
            ...child.props,
            checked,
            name,
        });
        return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        React.createElement("label", { className: cn(styles.radio, styles.tagLabel) },
            clone,
            React.createElement("input", { type: 'radio', autoComplete: 'off', onChange: handleChange, disabled: disabled || child.props.disabled, name: name, checked: checked, className: styles.hiddenInput, value: child.props.value })));
    };
    const errorMessage = typeof error === 'boolean' ? '' : error;
    return (React.createElement("div", { className: cn(styles.component, styles[type], styles[direction], { [styles.error]: error }, className), "data-test-id": dataTestId, ref: ref },
        label ? React.createElement("span", { className: styles.label }, label) : null,
        children ? (React.createElement("div", { className: styles.radioList, onBlur: onBlur, onFocus: onFocus }, Children.map(children, (child) => {
            if (isValidElement(child)) {
                return type === 'radio' ? renderRadio(child) : renderTag(child);
            }
            return null;
        }))) : null,
        errorMessage && (React.createElement("span", { className: cn(styles.sub, styles.errorMessage), role: 'alert' }, errorMessage)),
        hint && !errorMessage && (React.createElement("span", { className: cn(styles.sub, styles.hint) }, hint))));
});
/**
 * Для отображения в сторибуке
 */
RadioGroup.defaultProps = {
    direction: 'vertical',
    type: 'radio',
    disabled: false,
};

export { RadioGroup };
