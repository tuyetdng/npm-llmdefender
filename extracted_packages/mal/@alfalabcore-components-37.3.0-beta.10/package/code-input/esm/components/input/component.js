import React, { forwardRef } from 'react';
import cn from 'classnames';

var styles = {"component":"code-input__component_100i4","input":"code-input__input_100i4","hasError":"code-input__hasError_100i4","disabled":"code-input__disabled_100i4","compact":"code-input__compact_100i4"};
require('./index.css');

var Input = forwardRef(function (_a, ref) {
    var _b;
    var index = _a.index, error = _a.error, disabled = _a.disabled, _c = _a.value, value = _c === void 0 ? '' : _c, _d = _a.compact, compact = _d === void 0 ? false : _d, onChange = _a.onChange, onKeyDown = _a.onKeyDown, onFocus = _a.onFocus;
    var handleChange = function (event) {
        onChange(event, { index: index });
    };
    var handleKeyDown = function (event) {
        onKeyDown(event, { index: index });
    };
    var handleClick = function (event) {
        var target = event.target;
        /**
         * В сафари выделение корректно работает только с асинхронным вызовом
         */
        requestAnimationFrame(function () {
            target.select();
        });
    };
    return (React.createElement("input", { ref: ref, className: cn(styles.input, (_b = {},
            _b[styles.hasError] = error,
            _b[styles.disabled] = disabled,
            _b[styles.compact] = compact,
            _b)), disabled: disabled, value: value, autoComplete: index === 0 ? 'one-time-code' : '', inputMode: 'numeric', pattern: '[0-9]*', onChange: handleChange, onKeyDown: handleKeyDown, onFocus: onFocus, onClick: handleClick }));
});

export { Input };
