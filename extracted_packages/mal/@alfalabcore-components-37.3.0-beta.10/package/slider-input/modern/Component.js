import React, { forwardRef, useCallback, Fragment, isValidElement, cloneElement } from 'react';
import cn from 'classnames';
import { Input } from '../../input/modern';
import { Slider } from '../../slider/modern';

const styles = {"component":"slider-input__component_gbwhs","block":"slider-input__block_gbwhs","slider":"slider-input__slider_gbwhs","xl":"slider-input__xl_gbwhs","hidePips":"slider-input__hidePips_gbwhs","field":"slider-input__field_gbwhs","s":"slider-input__s_gbwhs","m":"slider-input__m_gbwhs","l":"slider-input__l_gbwhs","input":"slider-input__input_gbwhs","steps":"slider-input__steps_gbwhs","info":"slider-input__info_gbwhs","hasLabel":"slider-input__hasLabel_gbwhs","focused":"slider-input__focused_gbwhs","filled":"slider-input__filled_gbwhs"};
require('./index.css');

const SliderInput = forwardRef(({ className, inputClassName, sliderClassName, stepsClassName, focusedClassName, fieldClassName, value = '', min = 0, max = 100, step = 1, block, steps = [], sliderValue = +value, size = 's', label, info, disabled, readOnly, onChange, onInputChange, onSliderChange, rightAddons, Input: Input$1 = Input, customInputProps = {}, error, hint, pips, range, dataTestId, ...restProps }, ref) => {
    const getValidInputValue = useCallback((inputValue) => {
        const number = parseInt(inputValue.replace(/\s/g, ''), 10);
        return inputValue === '' || Number.isNaN(number) ? '' : Math.abs(number);
    }, []);
    const handleSliderChange = useCallback((payload) => {
        if (onChange)
            onChange(null, payload);
        if (onSliderChange)
            onSliderChange(payload);
    }, [onChange, onSliderChange]);
    const handleInputChange = useCallback((event, payload) => {
        if (onChange)
            onChange(event, { value: getValidInputValue(payload.value) });
        if (onInputChange)
            onInputChange(event, { value: getValidInputValue(payload.value) });
    }, [getValidInputValue, onChange, onInputChange]);
    return (React.createElement("div", { className: cn(styles.component, {
            [styles.block]: block,
            [styles.filled]: Boolean(value),
            [styles.hasLabel]: label,
            [styles.hasError]: Boolean(error),
        }, styles[size], className), "data-test-id": dataTestId },
        React.createElement(Input$1, { ...restProps, ...customInputProps, ref: ref, value: value.toString(), onChange: handleInputChange, block: true, size: size, label: label, disabled: disabled, readOnly: readOnly, className: cn(inputClassName, styles.input), focusedClassName: cn(focusedClassName, styles.focused), fieldClassName: cn(fieldClassName, styles.field, { [styles.disabled]: disabled }, styles[size]), inputMode: 'numeric', pattern: '[0-9]*', error: error, hint: hint, bottomAddons: !disabled && (React.createElement(Slider, { min: min, max: max, step: step, onChange: handleSliderChange, value: Number.isNaN(sliderValue) || !sliderValue ? min : sliderValue, disabled: disabled || readOnly, className: cn(styles.slider, styles[size], { [styles.hidePips]: error || hint }, sliderClassName), pips: pips, range: range })), rightAddons: (info || rightAddons) && (React.createElement(Fragment, null,
                info && React.createElement("span", { className: styles.info }, info),
                rightAddons)) }),
        steps.length > 0 && !error && (React.createElement("div", { className: cn(styles.steps, stepsClassName) }, steps.map((stepLabel, i) => isValidElement(stepLabel) ? (cloneElement(stepLabel, { key: i })) : (React.createElement("span", { key: i.toString() }, stepLabel)))))));
});

export { SliderInput };
