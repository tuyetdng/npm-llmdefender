import React, { useState } from 'react';
import { Input } from '../../input/modern';
import { format, isCompleteTimeInput, isValidInputValue } from './utils/format.js';

/* eslint-disable no-useless-escape */
const TimeInput = React.forwardRef(({ defaultValue = '', value: propValue, onChange, onComplete, className, ...restProps }, ref) => {
    const [value, setValue] = useState(propValue || defaultValue);
    const handleChange = (event) => {
        const { value: newValue } = event.target;
        if (newValue.length > 5)
            return;
        // Позволяем вводить только цифры и двоеточия
        if (/[^\d:]/.test(newValue)) {
            return;
        }
        const colon = newValue.match(/\:/g);
        // Не даем вводить больше, чем одно двоеточие
        if (colon && colon.length > 1) {
            return;
        }
        const formattedValue = format(newValue);
        const formattedValueArr = formattedValue.split(':');
        const hours = Number(formattedValueArr[0]);
        const mins = Number(formattedValueArr[1]);
        setValue(formattedValue);
        if (onChange)
            onChange(event, { hours, mins, value: formattedValue });
        if (isCompleteTimeInput(formattedValue)) {
            const valid = formattedValue.length > 0 && isValidInputValue(formattedValue);
            if (!valid)
                return;
            if (onComplete) {
                onComplete(event, { hours, mins, value: formattedValue });
            }
        }
    };
    const handleClearClick = () => {
        setValue('');
    };
    return (React.createElement(Input, { ...restProps, ref: ref, value: value, className: className, onChange: handleChange, onClear: handleClearClick }));
});

export { TimeInput };
