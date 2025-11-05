import React, { forwardRef, useMemo, createRef, useState, useRef, useImperativeHandle, useEffect } from 'react';
import cn from 'classnames';
import { Input } from './components/input/component.js';

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
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var styles = {"component":"code-input__component_1l18u","error":"code-input__error_1l18u","shake":"code-input__shake_1l18u"};
require('./index.css');

/** После истечения этого времени код очищается */
var CODE_ERROR_HINT_VISIBLE_DURATION = 300;
var CodeInput = forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, disabled = _a.disabled, error = _a.error, _c = _a.fields, fields = _c === void 0 ? 4 : _c, _d = _a.initialValues, initialValues = _d === void 0 ? '' : _d, dataTestId = _a.dataTestId, _e = _a.clearCodeOnError, clearCodeOnError = _e === void 0 ? true : _e, onErrorAnimationEnd = _a.onErrorAnimationEnd, onChange = _a.onChange, onComplete = _a.onComplete;
    var inputRefs = useMemo(function () {
        return Array(fields)
            .fill({})
            .map(function () { return createRef(); });
    }, [fields]);
    var _f = useState(initialValues.split('')), values = _f[0], setValues = _f[1];
    var clearErrorTimerId = useRef();
    var focusOnInput = function (inputRef) {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    var focus = function (index) {
        if (index === void 0) { index = 0; }
        focusOnInput(inputRefs[index]);
    };
    var blur = function () {
        var input = document.activeElement;
        if ((input === null || input === void 0 ? void 0 : input.tagName) === 'INPUT') {
            input.blur();
        }
    };
    var unselect = function () {
        var input = document.activeElement;
        if ((input === null || input === void 0 ? void 0 : input.tagName) === 'INPUT') {
            input.setSelectionRange(0, 0);
        }
    };
    var reset = function () {
        setValues([]);
    };
    useImperativeHandle(ref, function () { return ({ focus: focus, blur: blur, reset: reset, unselect: unselect }); });
    var triggerChange = function (argumentValues) {
        var newValue = (argumentValues || values).join('');
        if (onChange) {
            onChange(newValue);
        }
        if (onComplete && newValue.length >= fields) {
            onComplete(newValue);
        }
    };
    var handleChange = function (value, index, valid) {
        var newValue = value.replace(/\D/g, '');
        if (newValue === '' || !valid) {
            return;
        }
        var nextRef;
        var newValues = __spreadArray([], values, true);
        if (newValue.length > 1) {
            var nextIndex = newValue.length + index - 1;
            if (nextIndex >= fields) {
                nextIndex = fields - 1;
            }
            nextRef = inputRefs[nextIndex];
            newValue.split('').forEach(function (item, i) {
                var cursor = index + i;
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
    var handleChangeFromEvent = function (event, _a) {
        var index = _a.index;
        var _b = event.target, value = _b.value, valid = _b.validity.valid;
        handleChange(value, index, valid);
    };
    var handleKeyDown = function (event, _a) {
        var index = _a.index;
        var prevIndex = index - 1;
        var nextIndex = index + 1;
        var prevRef = inputRefs[prevIndex];
        var nextRef = inputRefs[nextIndex];
        var curtRef = inputRefs[index];
        var newValues = __spreadArray([], values, true);
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
    var handleFocus = function (event) {
        var target = event.target;
        /**
         * В сафари выделение корректно работает только с асинхронным вызовом
         */
        requestAnimationFrame(function () {
            target.select();
        });
    };
    var handleErrorAnimationEnd = function () {
        clearErrorTimerId.current = setTimeout(function () {
            if (clearCodeOnError) {
                focus();
                /** Очищаем только в случае, если код не изменился */
                setValues(function (prevState) { return (values === prevState ? [] : prevState); });
            }
            onErrorAnimationEnd === null || onErrorAnimationEnd === void 0 ? void 0 : onErrorAnimationEnd();
        }, CODE_ERROR_HINT_VISIBLE_DURATION);
    };
    useEffect(function () { return function () {
        if (clearErrorTimerId.current) {
            clearTimeout(clearErrorTimerId.current);
            clearErrorTimerId.current = undefined;
        }
    }; }, [error]);
    useEffect(function () {
        var _a;
        var ac = null;
        var unMountReason = 'component unMount';
        if ('OTPCredential' in window && ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.credentials) === null || _a === void 0 ? void 0 : _a.get)) {
            ac = new AbortController();
            var options = {
                otp: { transport: ['sms'] },
                signal: ac.signal,
            };
            navigator.credentials
                .get(options)
                .then(function (res) {
                if (res === null || res === void 0 ? void 0 : res.code)
                    handleChange(res.code, 0, true);
            })
                .catch(function (err) {
                if (err !== unMountReason) {
                    // eslint-disable-next-line no-console
                    console.error(err);
                }
            });
        }
        return function () {
            if (ac)
                ac.abort(unMountReason);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId, onAnimationEnd: handleErrorAnimationEnd },
        React.createElement("div", { className: cn((_b = {}, _b[styles.shake] = Boolean(error), _b)) }, new Array(fields).fill('').map(function (_, index) { return (React.createElement(Input, { ref: inputRefs[index], key: index.toString(), index: index, value: values[index], disabled: disabled, error: !!error, onChange: handleChangeFromEvent, onFocus: handleFocus, onKeyDown: handleKeyDown, className: styles.input, compact: fields > 6 })); })),
        error && (React.createElement("div", { className: styles.error, role: 'alert' }, error))));
});

export { CodeInput };
