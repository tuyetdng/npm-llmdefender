import { a as __assign } from '../tslib.es6-c603502c.js';
import React, { useRef, useCallback } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Input } from '../../../input/esm';

var styles = {"arrow":"input-autocomplete__arrow_jx6hq","error":"input-autocomplete__error_jx6hq"};
require('./index.css');

var AutocompleteField = function (_a) {
    var _b;
    var label = _a.label, _c = _a.labelView, labelView = _c === void 0 ? 'inner' : _c, placeholder = _a.placeholder, size = _a.size, Arrow = _a.Arrow, _d = _a.Input, Input$1 = _d === void 0 ? Input : _d, value = _a.value, error = _a.error, success = _a.success, hint = _a.hint, disabled = _a.disabled, readOnly = _a.readOnly, onInput = _a.onInput, _e = _a.inputProps, inputProps = _e === void 0 ? {} : _e, innerProps = _a.innerProps;
    var inputRef = useRef(null);
    var onClick = innerProps.onClick, onFocus = innerProps.onFocus;
    var inputDisabled = disabled || readOnly;
    var handleClick = useCallback(function (event) {
        if (onClick)
            onClick(event);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [onClick]);
    return (React.createElement(Input$1, __assign({}, inputProps, innerProps, { wrapperRef: mergeRefs([
            innerProps.ref,
            inputProps.wrapperRef,
        ]), ref: mergeRefs([inputRef, inputProps.ref]), disabled: disabled, readOnly: readOnly, block: true, label: label, labelView: labelView, placeholder: placeholder, size: size, error: error, success: success, hint: hint, onChange: onInput, onClick: inputDisabled ? undefined : handleClick, onFocus: inputDisabled ? undefined : onFocus, autoComplete: 'off', value: value, rightAddons: (Arrow || inputProps.rightAddons) && (React.createElement(React.Fragment, null,
            inputProps.rightAddons,
            Arrow && (React.createElement("span", { className: cn(styles.arrow, (_b = {},
                    _b[styles.error] = error,
                    _b)) }, Arrow)))) })));
};

export { AutocompleteField };
