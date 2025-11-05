import React, { forwardRef, useRef, useState, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import TextareaAutosize from 'react-textarea-autosize';
import cn from 'classnames';
import { FormControl } from '../../form-control/modern';
import { Scrollbar } from '../../scrollbar/modern';
import { useMedia, useFocus } from '@alfalab/hooks';
import { s as styles, P as PseudoTextArea } from './PseudoTextArea-0c4e4741.js';

const defaultColors = {"input":"textarea__input_m4zlq","hasInnerLabel":"textarea__hasInnerLabel_m4zlq","clearIcon":"textarea__clearIcon_m4zlq","error":"textarea__error_m4zlq","textarea":"textarea__textarea_m4zlq","hint":"textarea__hint_m4zlq"};
require('./default.css');

const invertedColors = {"input":"textarea__input_1guwx","hasInnerLabel":"textarea__hasInnerLabel_1guwx","clearIcon":"textarea__clearIcon_1guwx","error":"textarea__error_1guwx","textarea":"textarea__textarea_1guwx","hint":"textarea__hint_1guwx"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const getDefaultCounterText = (textLength, maxLength = 0) => `${textLength}/${maxLength} символов`;
const Textarea = forwardRef(({ autoComplete = 'on', autosize = true, size = 's', colors = 'default', block = false, bottomAddons, fieldClassName, className, dataTestId, disabled, error, hint, textareaClassName, label, labelView = 'inner', leftAddons, onFocus, onBlur, onChange, onHeightChange, rightAddons, maxRows, minRows, maxHeight, resize = 'none', value, defaultValue, rows = autosize ? 1 : 3, showCounter = false, getCounterText = getDefaultCounterText, maxLength, nativeScrollbar: nativeScrollbarProp, ...restProps }, ref) => {
    const uncontrolled = value === undefined;
    let [nativeScrollbar] = useMedia([[true, '(max-width: 1023px)']], false);
    nativeScrollbar = resize !== 'none' || Boolean(nativeScrollbarProp ?? nativeScrollbar);
    const textareaRef = useRef(null);
    const pseudoTextareaRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const [stateValue, setStateValue] = useState(defaultValue || '');
    const [scrollableHeight, setScrollableHeight] = useState();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [focusVisible] = useFocus(textareaRef, 'keyboard');
    const filled = Boolean(uncontrolled ? stateValue : value);
    const hasInnerLabel = label && labelView === 'inner';
    const hasOverflow = Boolean((maxLength && value?.slice(maxLength)) || (maxLength && stateValue.slice(maxLength)));
    useEffect(() => {
        const pseudoNode = pseudoTextareaRef.current;
        if (pseudoNode) {
            pseudoNode.scrollTop = scrollPosition;
        }
    }, [scrollPosition, stateValue]);
    // Хак, так как react-textarea-autosize перестал поддерживать maxHeight
    useEffect(() => {
        if (autosize) {
            if (nativeScrollbar &&
                maxHeight &&
                textareaRef.current &&
                textareaRef.current.style) {
                textareaRef.current.style.maxHeight = `${maxHeight}px`;
            }
        }
        else if (!nativeScrollbar && textareaRef.current) {
            const textareaHeight = textareaRef.current.scrollHeight;
            setScrollableHeight(textareaHeight);
        }
    }, [autosize, maxHeight, nativeScrollbar]);
    const handleTextareaFocus = (event) => {
        setFocused(true);
        if (onFocus) {
            onFocus(event);
        }
    };
    const handleTextareaBlur = (event) => {
        setFocused(false);
        if (onBlur) {
            onBlur(event);
        }
    };
    const handleTextareaChange = (event) => {
        const { target: { value }, } = event;
        if (onChange) {
            onChange(event, { value });
        }
        if (uncontrolled) {
            setStateValue(value);
        }
    };
    const handleTeaxtareaScroll = (event) => {
        if (maxLength) {
            const value = event.target.scrollTop;
            setScrollPosition(value);
        }
    };
    const getValueLength = () => {
        if (uncontrolled) {
            return stateValue.length;
        }
        return value.length;
    };
    const textareaClassNameCalc = cn(styles.textarea, colorStyles[colors].textarea, styles[size], {
        [styles.hasInnerLabel]: nativeScrollbar && hasInnerLabel,
        [colorStyles[colors].hasInnerLabel]: hasInnerLabel,
        [styles.filled]: nativeScrollbar && filled,
        [styles.resizeVertical]: resize === 'vertical',
    }, textareaClassName);
    const textareaProps = {
        ...restProps,
        className: textareaClassNameCalc,
        autoComplete,
        disabled,
        onBlur: handleTextareaBlur,
        onFocus: handleTextareaFocus,
        onChange: handleTextareaChange,
        value: uncontrolled ? stateValue : value,
        rows,
        ref: mergeRefs([ref, textareaRef]),
        'data-test-id': dataTestId,
        onScroll: handleTeaxtareaScroll,
    };
    const renderWithNativeScrollbar = () => autosize ? (React.createElement(TextareaAutosize, { ...textareaProps, maxRows: maxRows, minRows: minRows, onHeightChange: onHeightChange })) : (React.createElement("textarea", { ...textareaProps, style: { maxHeight } }));
    const renderWithCustomScrollbar = () => {
        const minRowsValue = autosize ? minRows : rows;
        return (React.createElement(Scrollbar, { style: { maxHeight, height: scrollableHeight, padding: 0 }, className: cn(styles.scrollable, styles[size], {
                [styles.scrollableWithLabel]: label,
                [styles.filled]: filled,
            }), horizontalAutoStretch: !block, widthPropName: 'width', contentNodeProps: { className: styles.scrollableWrapper } },
            hasOverflow && (React.createElement(PseudoTextArea, { value: value ?? stateValue, size: size, maxLength: maxLength, pseudoTextareaClassName: cn(textareaClassNameCalc, styles.customScrollbar), ref: pseudoTextareaRef })),
            React.createElement(TextareaAutosize, { ...textareaProps, minRows: minRowsValue, style: { overflow: 'hidden' } }),
            React.createElement(TextareaAutosize, { className: cn(textareaProps.className, styles.textareaHidden), rows: textareaProps.rows, maxRows: maxRows, minRows: minRowsValue, value: textareaProps.value, role: 'none', onHeightChange: (height) => {
                    if (autosize) {
                        setScrollableHeight(height);
                        if (onHeightChange) {
                            onHeightChange(height);
                        }
                    }
                } })));
    };
    const getBottomAddons = () => {
        const counterIsVisible = Boolean(maxLength && showCounter);
        return (React.createElement(React.Fragment, null,
            counterIsVisible && (React.createElement("span", { className: cn(styles.sub, {
                    [colorStyles[colors].error]: hasOverflow,
                    [colorStyles[colors].hint]: !hasOverflow,
                }) }, getCounterText(getValueLength(), maxLength))),
            bottomAddons));
    };
    return (React.createElement(FormControl, { className: cn(className), fieldClassName: cn(fieldClassName, {
            [styles.focusVisible]: focusVisible,
        }), size: size, colors: colors, block: block, disabled: disabled, filled: filled || focused, focused: focused, error: error, label: label, labelView: labelView, hint: hint, leftAddons: leftAddons, rightAddons: rightAddons, bottomAddons: getBottomAddons() }, nativeScrollbar ? (React.createElement(React.Fragment, null,
        hasOverflow && (React.createElement(PseudoTextArea, { value: value ?? stateValue, size: size, maxLength: maxLength, pseudoTextareaClassName: cn(textareaClassNameCalc, styles.nativeScrollbar), ref: pseudoTextareaRef })),
        renderWithNativeScrollbar())) : (renderWithCustomScrollbar())));
});

export { Textarea, getDefaultCounterText };
