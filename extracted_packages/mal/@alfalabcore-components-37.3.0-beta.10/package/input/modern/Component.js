import React, { useRef, useState, useCallback, Fragment } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Button } from '../../button/modern';
import { FormControl } from '../../form-control/modern';
import { Badge } from '../../badge/modern';
import { useFocus } from '@alfalab/hooks';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ExclamationCircleMIcon } from '@alfalab/icons-glyph/ExclamationCircleMIcon';

const defaultColors = {"input":"input__input_135z1","hasInnerLabel":"input__hasInnerLabel_135z1","clearIcon":"input__clearIcon_135z1","error":"input__error_135z1"};
require('./default.css');

const styles = {"input":"input__input_1r9af","hasInnerLabel":"input__hasInnerLabel_1r9af","s":"input__s_1r9af","m":"input__m_1r9af","l":"input__l_1r9af","xl":"input__xl_1r9af","block":"input__block_1r9af","clearIcon":"input__clearIcon_1r9af","errorIcon":"input__errorIcon_1r9af","errorColorIcon":"input__errorColorIcon_1r9af","clearButton":"input__clearButton_1r9af","successIcon":"input__successIcon_1r9af","successColorIcon":"input__successColorIcon_1r9af","focusVisible":"input__focusVisible_1r9af","onautofillstart":"input__onautofillstart_1r9af","onautofillcancel":"input__onautofillcancel_1r9af"};
require('./index.css');

const invertedColors = {"input":"input__input_qzceo","hasInnerLabel":"input__hasInnerLabel_qzceo","clearIcon":"input__clearIcon_qzceo","error":"input__error_qzceo"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const Input = React.forwardRef(({ size = 's', type = 'text', block = false, colors = 'default', bottomAddons, dataTestId, clear = false, disabled, error, success, hint, className, fieldClassName, inputClassName, labelClassName, addonsClassName, focusedClassName, filledClassName, label, labelView = 'inner', leftAddons, onFocus, onBlur, onChange, onClear, onClick, onMouseDown, onMouseUp, onAnimationStart, rightAddons, value, defaultValue, wrapperRef, readOnly, ...restProps }, ref) => {
    const uncontrolled = value === undefined;
    const inputRef = useRef(null);
    const [focusVisible] = useFocus(inputRef, 'keyboard');
    const [focused, setFocused] = useState(restProps.autoFocus);
    const [stateValue, setStateValue] = useState(defaultValue || '');
    const filled = Boolean(uncontrolled ? stateValue : value);
    const [autofilled, setAutofilled] = useState(false);
    // отображаем крестик только для заполненного и активного инпута
    const clearButtonVisible = clear && filled && !disabled && !readOnly;
    const hasInnerLabel = label && labelView === 'inner';
    const handleInputFocus = useCallback((event) => {
        if (!readOnly) {
            setFocused(true);
        }
        if (onFocus) {
            onFocus(event);
        }
    }, [onFocus, readOnly]);
    const handleInputBlur = useCallback((event) => {
        setFocused(false);
        if (onBlur) {
            onBlur(event);
        }
    }, [onBlur]);
    const handleInputChange = useCallback((event) => {
        if (onChange) {
            onChange(event, { value: event.target.value });
        }
        if (uncontrolled) {
            setStateValue(event.target.value);
        }
    }, [onChange, uncontrolled]);
    const handleClear = useCallback((event) => {
        if (!clearButtonVisible)
            return;
        if (uncontrolled) {
            setStateValue('');
        }
        if (onClear) {
            onClear(event);
        }
        if (inputRef.current && !focused) {
            inputRef.current.focus();
        }
    }, [clearButtonVisible, focused, onClear, uncontrolled]);
    const handleAnimationStart = useCallback((event) => {
        if (onAnimationStart) {
            onAnimationStart(event);
        }
        setAutofilled(event.animationName.includes('start'));
    }, [onAnimationStart]);
    const renderRightAddons = () => {
        const addonsVisible = clearButtonVisible || rightAddons || error || success;
        return (addonsVisible && (React.createElement(Fragment, null,
            clearButtonVisible && (React.createElement(Button, { type: 'button', view: 'ghost', disabled: disabled, "aria-label": '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C', className: styles.clearButton, onClick: handleClear, tabIndex: -1 },
                React.createElement(CrossCircleMIcon, { className: cn(styles.clearIcon, colorStyles[colors].clearIcon) }))),
            rightAddons,
            error && (React.createElement("div", { className: styles.errorIcon },
                React.createElement(Badge, { view: 'icon', size: 'm', iconColor: 'negative', content: React.createElement(ExclamationCircleMIcon, { className: styles.errorColorIcon }) }))),
            success && !error && (React.createElement("div", { className: styles.successIcon },
                React.createElement(Badge, { view: 'icon', size: 'm', iconColor: 'positive', content: React.createElement(CheckmarkCircleMIcon, { className: styles.successColorIcon }) }))))));
    };
    return (React.createElement(FormControl, { ref: wrapperRef, className: cn(className, focused && focusedClassName, filled && filledClassName), fieldClassName: cn(fieldClassName, {
            [styles.focusVisible]: focusVisible,
        }), labelClassName: labelClassName, addonsClassName: addonsClassName, size: size, colors: colors, block: block, disabled: disabled, readOnly: readOnly, filled: filled || autofilled || focused, focused: focused, error: error, label: label, labelView: labelView, hint: hint, leftAddons: leftAddons, rightAddons: renderRightAddons(), bottomAddons: bottomAddons, onClick: onClick, onMouseDown: onMouseDown, onMouseUp: onMouseUp },
        React.createElement("input", { ...restProps, className: cn(styles.input, colorStyles[colors].input, {
                [styles.error]: error,
                [colorStyles[colors].error]: error,
                [styles[size]]: hasInnerLabel,
                [styles.hasInnerLabel]: hasInnerLabel,
                [colorStyles[colors].hasInnerLabel]: hasInnerLabel,
            }, inputClassName), disabled: disabled, onBlur: handleInputBlur, onFocus: handleInputFocus, onChange: handleInputChange, onAnimationStart: handleAnimationStart, ref: mergeRefs([ref, inputRef]), type: type, value: uncontrolled ? stateValue : value, readOnly: readOnly, "data-test-id": dataTestId, "aria-label": typeof label === 'string' ? label : undefined })));
});
/**
 * Для отображения в сторибуке
 */
Input.defaultProps = {
    size: 's',
    type: 'text',
    block: false,
};

export { Input };
