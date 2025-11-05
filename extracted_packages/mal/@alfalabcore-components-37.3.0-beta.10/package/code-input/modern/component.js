import React, { forwardRef, useMemo, createRef, useState, useRef, useImperativeHandle, useEffect } from 'react';
import cn from 'classnames';
import { Input } from './components/input/component.js';

const styles = {"component":"code-input__component_1l18u","error":"code-input__error_1l18u","shake":"code-input__shake_1l18u"};
require('./index.css');

/** После истечения этого времени код очищается */
const CODE_ERROR_HINT_VISIBLE_DURATION = 300;
const CodeInput = forwardRef(({ className, disabled, error, fields = 4, initialValues = '', dataTestId, clearCodeOnError = true, onErrorAnimationEnd, onChange, onComplete, }, ref) => {
    const inputRefs = useMemo(() => Array(fields)
        .fill({})
        .map(() => createRef()), [fields]);
    const [values, setValues] = useState(initialValues.split(''));
    const clearErrorTimerId = useRef();
    const focusOnInput = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const focus = (index = 0) => {
        focusOnInput(inputRefs[index]);
    };
    const blur = () => {
        const input = document.activeElement;
        if (input?.tagName === 'INPUT') {
            input.blur();
        }
    };
    const unselect = () => {
        const input = document.activeElement;
        if (input?.tagName === 'INPUT') {
            input.setSelectionRange(0, 0);
        }
    };
    const reset = () => {
        setValues([]);
    };
    useImperativeHandle(ref, () => ({ focus, blur, reset, unselect }));
    const triggerChange = (argumentValues) => {
        const newValue = (argumentValues || values).join('');
        if (onChange) {
            onChange(newValue);
        }
        if (onComplete && newValue.length >= fields) {
            onComplete(newValue);
        }
    };
    const handleChange = (value, index, valid) => {
        const newValue = value.replace(/\D/g, '');
        if (newValue === '' || !valid) {
            return;
        }
        let nextRef;
        const newValues = [...values];
        if (newValue.length > 1) {
            let nextIndex = newValue.length + index - 1;
            if (nextIndex >= fields) {
                nextIndex = fields - 1;
            }
            nextRef = inputRefs[nextIndex];
            newValue.split('').forEach((item, i) => {
                const cursor = index + i;
                if (cursor < fields) {
                    newValues[cursor] = item;
                }
            });
        }
        else {
            nextRef = inputRefs[index + 1];
            newValues[index] = newValue;
        }
        setValues(newValues);
        if (nextRef && nextRef.current) {
            nextRef.current.focus();
            nextRef.current.select();
        }
        triggerChange(newValues);
    };
    const handleChangeFromEvent = (event, { index }) => {
        const { target: { value, validity: { valid }, }, } = event;
        handleChange(value, index, valid);
    };
    const handleKeyDown = (event, { index }) => {
        const prevIndex = index - 1;
        const nextIndex = index + 1;
        const prevRef = inputRefs[prevIndex];
        const nextRef = inputRefs[nextIndex];
        const curtRef = inputRefs[index];
        const newValues = [...values];
        switch (event.key) {
            case 'Backspace':
                event.preventDefault();
                if (values[index]) {
                    newValues[index] = '';
                }
                else if (prevRef) {
                    newValues[prevIndex] = '';
                    focusOnInput(prevRef);
                }
                setValues(newValues);
                triggerChange(newValues);
                break;
            case 'Delete':
                event.preventDefault();
                newValues[index] = '';
                if (!values[nextIndex]) {
                    focusOnInput(curtRef);
                }
                if (nextRef) {
                    focusOnInput(nextRef);
                }
                setValues(newValues);
                triggerChange(newValues);
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (prevRef) {
                    focusOnInput(prevRef);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (nextRef) {
                    focusOnInput(nextRef);
                }
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                event.preventDefault();
                break;
        }
    };
    const handleFocus = (event) => {
        const target = event.target;
        /**
         * В сафари выделение корректно работает только с асинхронным вызовом
         */
        requestAnimationFrame(() => {
            target.select();
        });
    };
    const handleErrorAnimationEnd = () => {
        clearErrorTimerId.current = setTimeout(() => {
            if (clearCodeOnError) {
                focus();
                /** Очищаем только в случае, если код не изменился */
                setValues((prevState) => (values === prevState ? [] : prevState));
            }
            onErrorAnimationEnd?.();
        }, CODE_ERROR_HINT_VISIBLE_DURATION);
    };
    useEffect(() => () => {
        if (clearErrorTimerId.current) {
            clearTimeout(clearErrorTimerId.current);
            clearErrorTimerId.current = undefined;
        }
    }, [error]);
    useEffect(() => {
        let ac = null;
        const unMountReason = 'component unMount';
        if ('OTPCredential' in window && navigator?.credentials?.get) {
            ac = new AbortController();
            const options = {
                otp: { transport: ['sms'] },
                signal: ac.signal,
            };
            navigator.credentials
                .get(options)
                .then((res) => {
                if (res?.code)
                    handleChange(res.code, 0, true);
            })
                .catch((err) => {
                if (err !== unMountReason) {
                    // eslint-disable-next-line no-console
                    console.error(err);
                }
            });
        }
        return () => {
            if (ac)
                ac.abort(unMountReason);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId, onAnimationEnd: handleErrorAnimationEnd },
        React.createElement("div", { className: cn({ [styles.shake]: Boolean(error) }) }, new Array(fields).fill('').map((_, index) => (React.createElement(Input, { ref: inputRefs[index], key: index.toString(), index: index, value: values[index], disabled: disabled, error: !!error, onChange: handleChangeFromEvent, onFocus: handleFocus, onKeyDown: handleKeyDown, className: styles.input, compact: fields > 6 })))),
        error && (React.createElement("div", { className: styles.error, role: 'alert' }, error))));
});

export { CodeInput };
