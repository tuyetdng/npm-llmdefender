import React, { useState, useRef, useLayoutEffect, useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { FormControl } from '../../../../form-control/modern';
import { useFocus } from '@alfalab/hooks';
import { calculateTotalElementsPerRow } from '../../utils/calculate-collapse-size.js';
import { Tag } from '../tag/component.js';
import '../../../../tag/modern';
import '@alfalab/icons-glyph/CrossCompactMIcon';

const styles = {"component":"select-with-tags__component_1ms7d","xl":"select-with-tags__xl_1ms7d","contentWrapper":"select-with-tags__contentWrapper_1ms7d","l":"select-with-tags__l_1ms7d","m":"select-with-tags__m_1ms7d","s":"select-with-tags__s_1ms7d","contentWrapperVertical":"select-with-tags__contentWrapperVertical_1ms7d","hasLabel":"select-with-tags__hasLabel_1ms7d","hasTags":"select-with-tags__hasTags_1ms7d","addons":"select-with-tags__addons_1ms7d","field":"select-with-tags__field_1ms7d","input":"select-with-tags__input_1ms7d","block":"select-with-tags__block_1ms7d","focusVisible":"select-with-tags__focusVisible_1ms7d","placeholder":"select-with-tags__placeholder_1ms7d","addons-size-m":"select-with-tags__addons-size-m_1ms7d","addons-size-l":"select-with-tags__addons-size-l_1ms7d","addons-size-xl":"select-with-tags__addons-size-xl_1ms7d","label":"select-with-tags__label_1ms7d"};
require('./index.css');

const TagList = ({ size = 'xl', open, disabled, placeholder, selectedMultiple = [], Arrow, innerProps, className, fieldClassName, value = '', autocomplete, label, valueRenderer, onInput, handleDeleteTag, collapseTagList, moveInputToNewLine, transformCollapsedTagText, transformTagText, isPopoverOpen, handleUpdatePopover, Tag: Tag$1 = Tag, setSelectedItems, toggleMenu, ...restProps }) => {
    const [focused, setFocused] = useState(false);
    const [isShowMoreEnabled, setShowMoreEnabled] = useState(false);
    const [visibleElements, setVisibleElements] = useState(1);
    const [inputOnNewLine, setInputOnNewLine] = useState(false);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const contentWrapperRef = useRef(null);
    const [focusVisible] = useFocus(wrapperRef, 'keyboard');
    const [inputFocusVisible] = useFocus(inputRef, 'keyboard');
    useLayoutEffect(() => {
        setShowMoreEnabled(isPopoverOpen);
    }, [isPopoverOpen]);
    useLayoutEffect(() => {
        setVisibleElements(selectedMultiple.length);
        setShowMoreEnabled(false);
    }, [selectedMultiple]);
    useLayoutEffect(() => {
        if (collapseTagList && contentWrapperRef.current) {
            const totalVisibleElements = calculateTotalElementsPerRow(contentWrapperRef.current, autocomplete && inputRef.current ? inputRef.current : null);
            setVisibleElements(totalVisibleElements);
        }
    }, [collapseTagList, visibleElements, autocomplete]);
    const handleFocus = useCallback(() => setFocused(true), []);
    const handleBlur = useCallback(() => setFocused(false), []);
    const inputTextIsOverflow = useCallback(() => inputRef.current && inputRef.current.scrollWidth > inputRef.current.clientWidth, []);
    const handleMouseDown = useCallback((event) => {
        event.preventDefault();
    }, []);
    const { onClick, ...restInnerProps } = innerProps;
    const handleClick = useCallback((event) => {
        if (onClick && contentWrapperRef.current) {
            const eventTarget = event.target;
            const clickedInsideContent = eventTarget !== contentWrapperRef.current &&
                contentWrapperRef.current.contains(eventTarget);
            if (!clickedInsideContent) {
                onClick(event);
            }
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [onClick]);
    const handleKeyDown = useCallback((event) => {
        const lastSelectedTag = selectedMultiple[selectedMultiple.length - 1];
        if (event.key === 'Backspace' && !value && handleDeleteTag && lastSelectedTag) {
            handleDeleteTag(lastSelectedTag.key);
        }
    }, [handleDeleteTag, selectedMultiple, value]);
    const toggleShowMoreLessButton = useCallback((event) => {
        if (event) {
            event.stopPropagation();
            setShowMoreEnabled((v) => !v);
            if (handleUpdatePopover) {
                handleUpdatePopover();
            }
        }
    }, [handleUpdatePopover]);
    useEffect(() => {
        /**
         * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
         */
        if (moveInputToNewLine) {
            if (inputTextIsOverflow() && !inputOnNewLine) {
                setInputOnNewLine(true);
            }
            else if (value.length === 0) {
                setInputOnNewLine(false);
            }
        }
    }, [value, inputOnNewLine, inputTextIsOverflow, moveInputToNewLine]);
    const collapseTagTitle = useMemo(() => {
        if (isShowMoreEnabled) {
            return 'Свернуть';
        }
        if (transformCollapsedTagText) {
            return transformCollapsedTagText(selectedMultiple.length - visibleElements);
        }
        return `+${selectedMultiple.length - visibleElements}`;
    }, [transformCollapsedTagText, isShowMoreEnabled, selectedMultiple.length, visibleElements]);
    const filled = Boolean(selectedMultiple.length > 0) || Boolean(value);
    /**
     * Флаг который позволит добавлять класс с вертикальными
     * отступами если элементы не помещаются в один ряд,
     * для того чтобы не менялась высота инпута
     */
    const shouldAddVerticalMargin = Boolean((!collapseTagList || isShowMoreEnabled) && !label);
    return (React.createElement("div", { ref: wrapperRef, onFocus: handleFocus, onBlur: handleBlur, className: cn(className, styles.component, styles[size]) },
        React.createElement(FormControl, { ...restProps, ref: innerProps.ref, fieldClassName: cn(fieldClassName, styles.field, {
                [styles.focusVisible]: focusVisible,
            }), block: true, size: size, focused: open || focused, disabled: disabled, filled: filled || !!placeholder, onMouseDown: handleMouseDown, rightAddons: Arrow, onClick: handleClick, addonsClassName: cn(styles.addons, styles[`addons-size-${size}`]), label: label, labelClassName: styles.label },
            React.createElement("div", { className: cn(styles.contentWrapper, {
                    [styles.hasLabel]: Boolean(label),
                    [styles.hasTags]: selectedMultiple.length > 0,
                    [styles.contentWrapperVertical]: shouldAddVerticalMargin,
                }), ref: contentWrapperRef },
                selectedMultiple.map((option, index) => isShowMoreEnabled || index + 1 <= visibleElements ? (React.createElement(Tag$1, { option: {
                        ...option,
                        content: transformTagText
                            ? transformTagText(option.content)
                            : option.content,
                    }, key: option.key, handleDeleteTag: handleDeleteTag })) : null),
                visibleElements < selectedMultiple.length && (React.createElement(Tag$1, { "data-collapse": 'collapse-last-tag-element', onClick: toggleShowMoreLessButton, option: {
                        key: 'collapse',
                        content: collapseTagTitle,
                    } })),
                autocomplete && (React.createElement("input", { ...restInnerProps, autoComplete: 'off', ref: inputRef, value: value, onChange: onInput, className: cn(styles.input, {
                        [styles.focusVisible]: inputFocusVisible,
                        [styles.block]: inputOnNewLine,
                    }), disabled: disabled, onKeyDown: handleKeyDown, placeholder: filled ? '' : placeholder })),
                placeholder && !filled && !autocomplete && (React.createElement("span", { className: styles.placeholder }, placeholder))))));
};

export { TagList };
