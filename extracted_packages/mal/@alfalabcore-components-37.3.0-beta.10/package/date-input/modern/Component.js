import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import { Input } from '../../input/modern';
import { format, parseDateString, isCompleteDateInput, isValid, formatDate, NATIVE_DATE_FORMAT } from './utils/format.js';
import { isInputDateSupported } from './utils/native-supports.js';
import 'date-fns/format';
import 'date-fns/isValid';
import 'date-fns/parse';

const styles = {"nativeInput":"date-input__nativeInput_198fa"};
require('./index.css');

const DateInput = forwardRef(({ mobileMode = 'input', defaultValue = '', rightAddons, error, value: propValue, onBlur, onChange, onComplete, ...restProps }, ref) => {
    const inputRef = useRef(null);
    const [shouldRenderNative, setShouldRenderNative] = useState(false);
    const [value, setValue] = useState(propValue || defaultValue);
    const handleChange = useCallback((event) => {
        const { value: newValue } = event.target;
        // Позволяем вводить только цифры и точки
        if (/[^\d.]/.test(newValue)) {
            return;
        }
        const dots = newValue.match(/\./g);
        // Не даем вводить больше, чем 2 точки
        if (dots && dots.length > 2) {
            return;
        }
        // Форматируем введенное значение (добавляем точки)
        const formattedValue = format(newValue);
        const date = parseDateString(formattedValue);
        setValue(formattedValue);
        if (onChange)
            onChange(event, { date, value: formattedValue });
        if (isCompleteDateInput(formattedValue)) {
            const valid = formattedValue.length > 0 && isValid(formattedValue);
            if (!valid)
                return;
            if (onComplete)
                onComplete(event, { date, value: formattedValue });
        }
    }, [onChange, onComplete]);
    const handleNativeInputChange = useCallback((event) => {
        const newDate = parseDateString(event.target.value, NATIVE_DATE_FORMAT);
        const newValue = event.target.value === '' ? '' : formatDate(newDate);
        setValue(newValue);
        if (onComplete)
            onComplete(event, { date: newDate, value: newValue });
        if (onChange)
            onChange(event, { date: newDate, value: newValue });
    }, [onComplete, onChange]);
    const handleBlur = useCallback((event) => {
        if (onBlur)
            onBlur(event);
    }, [onBlur]);
    useEffect(() => {
        if (mobileMode === 'native' && isInputDateSupported()) {
            setShouldRenderNative(true);
        }
    }, [mobileMode]);
    useEffect(() => {
        if (typeof propValue !== 'undefined') {
            setValue(propValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propValue]);
    return (React.createElement(Input, { ...restProps, ref: mergeRefs([ref, inputRef]), value: value, inputMode: 'decimal', pattern: '[0-9\\.]*', onChange: handleChange, onBlur: handleBlur, placeholder: '\u0414\u0414.\u041C\u041C.\u0413\u0413\u0413\u0413', error: error, rightAddons: React.createElement(React.Fragment, null,
            rightAddons,
            shouldRenderNative && (React.createElement("input", { type: 'date', ref: ref, defaultValue: defaultValue, onChange: handleNativeInputChange, className: styles.nativeInput }))) }));
});

export { DateInput };
