import React, { forwardRef, useRef, useState, useCallback, Fragment } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Portal } from '../../portal/modern';

const styles = {"suffixContainer":"with-suffix__suffixContainer_1bn4d","suffixVisible":"with-suffix__suffixVisible_1bn4d","hasSuffix":"with-suffix__hasSuffix_1bn4d","spacer":"with-suffix__spacer_1bn4d","suffix":"with-suffix__suffix_1bn4d","disabled":"with-suffix__disabled_1bn4d","readOnly":"with-suffix__readOnly_1bn4d"};
require('./index.css');

const withSuffix = (Input) => forwardRef(({ value, defaultValue, onChange, onClear, suffix = '', placeholder, className, disabled, readOnly, suffixContainerClassName, ...restProps }, ref) => {
    const uncontrolled = value === undefined;
    const inputRef = useRef(null);
    const [stateValue, setStateValue] = useState(defaultValue || '');
    const handleInputChange = useCallback((event, payload) => {
        if (onChange) {
            onChange(event, payload);
        }
        if (uncontrolled) {
            setStateValue(payload.value);
        }
    }, [onChange, uncontrolled]);
    const handleClear = useCallback((event) => {
        if (uncontrolled) {
            setStateValue('');
        }
        if (onClear) {
            onClear(event);
        }
    }, [onClear, uncontrolled]);
    const getPortalContainer = useCallback(
    // TODO: Изменить сигнатуру getPortalContainer в Portal
    () => inputRef.current.parentElement, []);
    const visibleValue = uncontrolled ? stateValue : value;
    return (React.createElement(Fragment, null,
        React.createElement(Input, { ref: mergeRefs([ref, inputRef]), value: visibleValue, disabled: disabled, readOnly: readOnly, onChange: handleInputChange, onClear: handleClear, placeholder: placeholder, className: cn(className, {
                [styles.suffixVisible]: Boolean(visibleValue),
                [styles.hasSuffix]: suffix,
            }), ...restProps }),
        React.createElement(Portal, { getPortalContainer: getPortalContainer },
            React.createElement("div", { className: cn(styles.suffixContainer, suffixContainerClassName) },
                React.createElement("span", { className: styles.spacer }, visibleValue),
                suffix && (React.createElement("div", { className: cn(styles.suffix, {
                        [styles.disabled]: disabled,
                        [styles.readOnly]: readOnly,
                    }) }, suffix))))));
});

export { withSuffix };
