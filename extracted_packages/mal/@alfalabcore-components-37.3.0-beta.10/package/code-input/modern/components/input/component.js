import React, { forwardRef } from 'react';
import cn from 'classnames';

const styles = {"component":"code-input__component_100i4","input":"code-input__input_100i4","hasError":"code-input__hasError_100i4","disabled":"code-input__disabled_100i4","compact":"code-input__compact_100i4"};
require('./index.css');

const Input = forwardRef(({ index, error, disabled, value = '', compact = false, onChange, onKeyDown, onFocus }, ref) => {
    const handleChange = (event) => {
        onChange(event, { index });
    };
    const handleKeyDown = (event) => {
        onKeyDown(event, { index });
    };
    const handleClick = (event) => {
        const target = event.target;
        /**
         * В сафари выделение корректно работает только с асинхронным вызовом
         */
        requestAnimationFrame(() => {
            target.select();
        });
    };
    return (React.createElement("input", { ref: ref, className: cn(styles.input, {
            [styles.hasError]: error,
            [styles.disabled]: disabled,
            [styles.compact]: compact,
        }), disabled: disabled, value: value, autoComplete: index === 0 ? 'one-time-code' : '', inputMode: 'numeric', pattern: '[0-9]*', onChange: handleChange, onKeyDown: handleKeyDown, onFocus: onFocus, onClick: handleClick }));
});

export { Input };
