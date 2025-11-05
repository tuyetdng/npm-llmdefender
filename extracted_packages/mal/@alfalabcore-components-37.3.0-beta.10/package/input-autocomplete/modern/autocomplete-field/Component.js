import React, { useRef, useCallback } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Input } from '../../../input/modern';

const styles = {"arrow":"input-autocomplete__arrow_jx6hq","error":"input-autocomplete__error_jx6hq"};
require('./index.css');

const AutocompleteField = ({ label, labelView = 'inner', placeholder, size, Arrow, Input: Input$1 = Input, value, error, success, hint, disabled, readOnly, onInput, inputProps = {}, innerProps, }) => {
    const inputRef = useRef(null);
    const { onClick, onFocus } = innerProps;
    const inputDisabled = disabled || readOnly;
    const handleClick = useCallback((event) => {
        if (onClick)
            onClick(event);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [onClick]);
    return (React.createElement(Input$1, { ...inputProps, ...innerProps, wrapperRef: mergeRefs([
            innerProps.ref,
            inputProps.wrapperRef,
        ]), ref: mergeRefs([inputRef, inputProps.ref]), disabled: disabled, readOnly: readOnly, block: true, label: label, labelView: labelView, placeholder: placeholder, size: size, error: error, success: success, hint: hint, onChange: onInput, onClick: inputDisabled ? undefined : handleClick, onFocus: inputDisabled ? undefined : onFocus, autoComplete: 'off', value: value, rightAddons: (Arrow || inputProps.rightAddons) && (React.createElement(React.Fragment, null,
            inputProps.rightAddons,
            Arrow && (React.createElement("span", { className: cn(styles.arrow, {
                    [styles.error]: error,
                }) }, Arrow)))) }));
};

export { AutocompleteField };
