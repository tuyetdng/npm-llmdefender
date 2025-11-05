import React, { forwardRef, useCallback, Fragment, isValidElement, cloneElement } from 'react';
import cn from 'classnames';
import { Input } from '../../input/esm';
import { Slider } from '../../slider/esm';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var styles = {"component":"slider-input__component_gbwhs","block":"slider-input__block_gbwhs","slider":"slider-input__slider_gbwhs","xl":"slider-input__xl_gbwhs","hidePips":"slider-input__hidePips_gbwhs","field":"slider-input__field_gbwhs","s":"slider-input__s_gbwhs","m":"slider-input__m_gbwhs","l":"slider-input__l_gbwhs","input":"slider-input__input_gbwhs","steps":"slider-input__steps_gbwhs","info":"slider-input__info_gbwhs","hasLabel":"slider-input__hasLabel_gbwhs","focused":"slider-input__focused_gbwhs","filled":"slider-input__filled_gbwhs"};
require('./index.css');

var SliderInput = forwardRef(function (_a, ref) {
    var _b, _c, _d;
    var className = _a.className, inputClassName = _a.inputClassName, sliderClassName = _a.sliderClassName, stepsClassName = _a.stepsClassName, focusedClassName = _a.focusedClassName, fieldClassName = _a.fieldClassName, _e = _a.value, value = _e === void 0 ? '' : _e, _f = _a.min, min = _f === void 0 ? 0 : _f, _g = _a.max, max = _g === void 0 ? 100 : _g, _h = _a.step, step = _h === void 0 ? 1 : _h, block = _a.block, _j = _a.steps, steps = _j === void 0 ? [] : _j, _k = _a.sliderValue, sliderValue = _k === void 0 ? +value : _k, _l = _a.size, size = _l === void 0 ? 's' : _l, label = _a.label, info = _a.info, disabled = _a.disabled, readOnly = _a.readOnly, onChange = _a.onChange, onInputChange = _a.onInputChange, onSliderChange = _a.onSliderChange, rightAddons = _a.rightAddons, _m = _a.Input, Input$1 = _m === void 0 ? Input : _m, _o = _a.customInputProps, customInputProps = _o === void 0 ? {} : _o, error = _a.error, hint = _a.hint, pips = _a.pips, range = _a.range, dataTestId = _a.dataTestId, restProps = __rest(_a, ["className", "inputClassName", "sliderClassName", "stepsClassName", "focusedClassName", "fieldClassName", "value", "min", "max", "step", "block", "steps", "sliderValue", "size", "label", "info", "disabled", "readOnly", "onChange", "onInputChange", "onSliderChange", "rightAddons", "Input", "customInputProps", "error", "hint", "pips", "range", "dataTestId"]);
    var getValidInputValue = useCallback(function (inputValue) {
        var number = parseInt(inputValue.replace(/\s/g, ''), 10);
        return inputValue === '' || Number.isNaN(number) ? '' : Math.abs(number);
    }, []);
    var handleSliderChange = useCallback(function (payload) {
        if (onChange)
            onChange(null, payload);
        if (onSliderChange)
            onSliderChange(payload);
    }, [onChange, onSliderChange]);
    var handleInputChange = useCallback(function (event, payload) {
        if (onChange)
            onChange(event, { value: getValidInputValue(payload.value) });
        if (onInputChange)
            onInputChange(event, { value: getValidInputValue(payload.value) });
    }, [getValidInputValue, onChange, onInputChange]);
    return (React.createElement("div", { className: cn(styles.component, (_b = {},
            _b[styles.block] = block,
            _b[styles.filled] = Boolean(value),
            _b[styles.hasLabel] = label,
            _b[styles.hasError] = Boolean(error),
            _b), styles[size], className), "data-test-id": dataTestId },
        React.createElement(Input$1, __assign({}, restProps, customInputProps, { ref: ref, value: value.toString(), onChange: handleInputChange, block: true, size: size, label: label, disabled: disabled, readOnly: readOnly, className: cn(inputClassName, styles.input), focusedClassName: cn(focusedClassName, styles.focused), fieldClassName: cn(fieldClassName, styles.field, (_c = {}, _c[styles.disabled] = disabled, _c), styles[size]), inputMode: 'numeric', pattern: '[0-9]*', error: error, hint: hint, bottomAddons: !disabled && (React.createElement(Slider, { min: min, max: max, step: step, onChange: handleSliderChange, value: Number.isNaN(sliderValue) || !sliderValue ? min : sliderValue, disabled: disabled || readOnly, className: cn(styles.slider, styles[size], (_d = {}, _d[styles.hidePips] = error || hint, _d), sliderClassName), pips: pips, range: range })), rightAddons: (info || rightAddons) && (React.createElement(Fragment, null,
                info && React.createElement("span", { className: styles.info }, info),
                rightAddons)) })),
        steps.length > 0 && !error && (React.createElement("div", { className: cn(styles.steps, stepsClassName) }, steps.map(function (stepLabel, i) {
            return isValidElement(stepLabel) ? (cloneElement(stepLabel, { key: i })) : (React.createElement("span", { key: i.toString() }, stepLabel));
        })))));
});

export { SliderInput };
