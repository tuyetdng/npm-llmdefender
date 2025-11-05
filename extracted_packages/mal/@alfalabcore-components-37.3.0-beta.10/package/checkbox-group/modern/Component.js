import React, { Children, isValidElement, cloneElement } from 'react';
import cn from 'classnames';

const styles = {"component":"checkbox-group__component_2ptyx","error":"checkbox-group__error_2ptyx","checkboxList":"checkbox-group__checkboxList_2ptyx","vertical":"checkbox-group__vertical_2ptyx","checkbox":"checkbox-group__checkbox_2ptyx","horizontal":"checkbox-group__horizontal_2ptyx","tag":"checkbox-group__tag_2ptyx","tagLabel":"checkbox-group__tagLabel_2ptyx","label":"checkbox-group__label_2ptyx","sub":"checkbox-group__sub_2ptyx","errorMessage":"checkbox-group__errorMessage_2ptyx","hint":"checkbox-group__hint_2ptyx","hiddenInput":"checkbox-group__hiddenInput_2ptyx"};
require('./index.css');

const CheckboxGroup = ({ children, className, direction = 'vertical', label, error, hint, onChange, onBlur, onFocus, type = 'checkbox', dataTestId, disabled = false, }) => {
    const renderCheckbox = (child) => {
        const { name, checked, className: childClassName } = child.props;
        const handleChange = (event) => {
            if (onChange) {
                onChange(event, { name, checked: !checked });
            }
        };
        return cloneElement(child, {
            onChange: handleChange,
            disabled,
            ...child.props,
            className: cn(childClassName, styles.checkbox),
        });
    };
    const renderTag = (child) => {
        const { name, checked } = child.props;
        const handleChange = (event) => {
            if (onChange) {
                onChange(event, { name, checked: !checked });
            }
        };
        const clone = cloneElement(child, { onClick: handleChange, disabled, ...child.props });
        return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        React.createElement("label", { className: cn(styles.checkbox, styles.tagLabel) },
            clone,
            React.createElement("input", { type: 'checkbox', autoComplete: 'off', onChange: handleChange, disabled: disabled || child.props.disabled, checked: checked, className: styles.hiddenInput })));
    };
    const errorMessage = typeof error === 'boolean' ? '' : error;
    return (React.createElement("div", { className: cn(styles.component, styles[type], styles[direction], { [styles.error]: error }, className), "data-test-id": dataTestId },
        label ? React.createElement("span", { className: styles.label }, label) : null,
        children ? (React.createElement("div", { className: styles.checkboxList, onBlur: onBlur, onFocus: onFocus }, Children.map(children, (child) => {
            if (isValidElement(child)) {
                return type === 'checkbox' ? renderCheckbox(child) : renderTag(child);
            }
            return null;
        }))) : null,
        errorMessage && (React.createElement("span", { className: cn(styles.sub, styles.errorMessage), role: 'alert' }, errorMessage)),
        hint && !errorMessage && React.createElement("span", { className: cn(styles.sub, styles.hint) }, hint)));
};

export { CheckboxGroup };
