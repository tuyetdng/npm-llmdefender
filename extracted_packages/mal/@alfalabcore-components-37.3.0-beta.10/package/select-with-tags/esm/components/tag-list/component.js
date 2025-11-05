import { _ as __rest, a as __assign } from '../../tslib.es6-411b8c4a.js';
import React, { useState, useRef, useLayoutEffect, useCallback, useEffect, useMemo } from 'react';
import cn from 'classnames';
import { FormControl } from '../../../../form-control/esm';
import { useFocus } from '@alfalab/hooks';
import { calculateTotalElementsPerRow } from '../../utils/calculate-collapse-size.js';
import { Tag } from '../tag/component.js';
import '../../../../tag/esm';
import '@alfalab/icons-glyph/CrossCompactMIcon';

var styles = {"component":"select-with-tags__component_1ms7d","xl":"select-with-tags__xl_1ms7d","contentWrapper":"select-with-tags__contentWrapper_1ms7d","l":"select-with-tags__l_1ms7d","m":"select-with-tags__m_1ms7d","s":"select-with-tags__s_1ms7d","contentWrapperVertical":"select-with-tags__contentWrapperVertical_1ms7d","hasLabel":"select-with-tags__hasLabel_1ms7d","hasTags":"select-with-tags__hasTags_1ms7d","addons":"select-with-tags__addons_1ms7d","field":"select-with-tags__field_1ms7d","input":"select-with-tags__input_1ms7d","block":"select-with-tags__block_1ms7d","focusVisible":"select-with-tags__focusVisible_1ms7d","placeholder":"select-with-tags__placeholder_1ms7d","addons-size-m":"select-with-tags__addons-size-m_1ms7d","addons-size-l":"select-with-tags__addons-size-l_1ms7d","addons-size-xl":"select-with-tags__addons-size-xl_1ms7d","label":"select-with-tags__label_1ms7d"};
require('./index.css');

var TagList = function (_a) {
    var _b, _c, _d;
    var _e = _a.size, size = _e === void 0 ? 'xl' : _e, open = _a.open, disabled = _a.disabled, placeholder = _a.placeholder, _f = _a.selectedMultiple, selectedMultiple = _f === void 0 ? [] : _f, Arrow = _a.Arrow, innerProps = _a.innerProps, className = _a.className, fieldClassName = _a.fieldClassName, _g = _a.value, value = _g === void 0 ? '' : _g, autocomplete = _a.autocomplete, label = _a.label; _a.valueRenderer; var onInput = _a.onInput, handleDeleteTag = _a.handleDeleteTag, collapseTagList = _a.collapseTagList, moveInputToNewLine = _a.moveInputToNewLine, transformCollapsedTagText = _a.transformCollapsedTagText, transformTagText = _a.transformTagText, isPopoverOpen = _a.isPopoverOpen, handleUpdatePopover = _a.handleUpdatePopover, _h = _a.Tag, Tag$1 = _h === void 0 ? Tag : _h; _a.setSelectedItems; _a.toggleMenu; var restProps = __rest(_a, ["size", "open", "disabled", "placeholder", "selectedMultiple", "Arrow", "innerProps", "className", "fieldClassName", "value", "autocomplete", "label", "valueRenderer", "onInput", "handleDeleteTag", "collapseTagList", "moveInputToNewLine", "transformCollapsedTagText", "transformTagText", "isPopoverOpen", "handleUpdatePopover", "Tag", "setSelectedItems", "toggleMenu"]);
    var _j = useState(false), focused = _j[0], setFocused = _j[1];
    var _k = useState(false), isShowMoreEnabled = _k[0], setShowMoreEnabled = _k[1];
    var _l = useState(1), visibleElements = _l[0], setVisibleElements = _l[1];
    var _m = useState(false), inputOnNewLine = _m[0], setInputOnNewLine = _m[1];
    var wrapperRef = useRef(null);
    var inputRef = useRef(null);
    var contentWrapperRef = useRef(null);
    var focusVisible = useFocus(wrapperRef, 'keyboard')[0];
    var inputFocusVisible = useFocus(inputRef, 'keyboard')[0];
    useLayoutEffect(function () {
        setShowMoreEnabled(isPopoverOpen);
    }, [isPopoverOpen]);
    useLayoutEffect(function () {
        setVisibleElements(selectedMultiple.length);
        setShowMoreEnabled(false);
    }, [selectedMultiple]);
    useLayoutEffect(function () {
        if (collapseTagList && contentWrapperRef.current) {
            var totalVisibleElements = calculateTotalElementsPerRow(contentWrapperRef.current, autocomplete && inputRef.current ? inputRef.current : null);
            setVisibleElements(totalVisibleElements);
        }
    }, [collapseTagList, visibleElements, autocomplete]);
    var handleFocus = useCallback(function () { return setFocused(true); }, []);
    var handleBlur = useCallback(function () { return setFocused(false); }, []);
    var inputTextIsOverflow = useCallback(function () { return inputRef.current && inputRef.current.scrollWidth > inputRef.current.clientWidth; }, []);
    var handleMouseDown = useCallback(function (event) {
        event.preventDefault();
    }, []);
    var onClick = innerProps.onClick, restInnerProps = __rest(innerProps, ["onClick"]);
    var handleClick = useCallback(function (event) {
        if (onClick && contentWrapperRef.current) {
            var eventTarget = event.target;
            var clickedInsideContent = eventTarget !== contentWrapperRef.current &&
                contentWrapperRef.current.contains(eventTarget);
            if (!clickedInsideContent) {
                onClick(event);
            }
        }
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [onClick]);
    var handleKeyDown = useCallback(function (event) {
        var lastSelectedTag = selectedMultiple[selectedMultiple.length - 1];
        if (event.key === 'Backspace' && !value && handleDeleteTag && lastSelectedTag) {
            handleDeleteTag(lastSelectedTag.key);
        }
    }, [handleDeleteTag, selectedMultiple, value]);
    var toggleShowMoreLessButton = useCallback(function (event) {
        if (event) {
            event.stopPropagation();
            setShowMoreEnabled(function (v) { return !v; });
            if (handleUpdatePopover) {
                handleUpdatePopover();
            }
        }
    }, [handleUpdatePopover]);
    useEffect(function () {
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
    var collapseTagTitle = useMemo(function () {
        if (isShowMoreEnabled) {
            return 'Свернуть';
        }
        if (transformCollapsedTagText) {
            return transformCollapsedTagText(selectedMultiple.length - visibleElements);
        }
        return "+".concat(selectedMultiple.length - visibleElements);
    }, [transformCollapsedTagText, isShowMoreEnabled, selectedMultiple.length, visibleElements]);
    var filled = Boolean(selectedMultiple.length > 0) || Boolean(value);
    /**
     * Флаг который позволит добавлять класс с вертикальными
     * отступами если элементы не помещаются в один ряд,
     * для того чтобы не менялась высота инпута
     */
    var shouldAddVerticalMargin = Boolean((!collapseTagList || isShowMoreEnabled) && !label);
    return (React.createElement("div", { ref: wrapperRef, onFocus: handleFocus, onBlur: handleBlur, className: cn(className, styles.component, styles[size]) },
        React.createElement(FormControl, __assign({}, restProps, { ref: innerProps.ref, fieldClassName: cn(fieldClassName, styles.field, (_b = {},
                _b[styles.focusVisible] = focusVisible,
                _b)), block: true, size: size, focused: open || focused, disabled: disabled, filled: filled || !!placeholder, onMouseDown: handleMouseDown, rightAddons: Arrow, onClick: handleClick, addonsClassName: cn(styles.addons, styles["addons-size-".concat(size)]), label: label, labelClassName: styles.label }),
            React.createElement("div", { className: cn(styles.contentWrapper, (_c = {},
                    _c[styles.hasLabel] = Boolean(label),
                    _c[styles.hasTags] = selectedMultiple.length > 0,
                    _c[styles.contentWrapperVertical] = shouldAddVerticalMargin,
                    _c)), ref: contentWrapperRef },
                selectedMultiple.map(function (option, index) {
                    return isShowMoreEnabled || index + 1 <= visibleElements ? (React.createElement(Tag$1, { option: __assign(__assign({}, option), { content: transformTagText
                                ? transformTagText(option.content)
                                : option.content }), key: option.key, handleDeleteTag: handleDeleteTag })) : null;
                }),
                visibleElements < selectedMultiple.length && (React.createElement(Tag$1, { "data-collapse": 'collapse-last-tag-element', onClick: toggleShowMoreLessButton, option: {
                        key: 'collapse',
                        content: collapseTagTitle,
                    } })),
                autocomplete && (React.createElement("input", __assign({}, restInnerProps, { autoComplete: 'off', ref: inputRef, value: value, onChange: onInput, className: cn(styles.input, (_d = {},
                        _d[styles.focusVisible] = inputFocusVisible,
                        _d[styles.block] = inputOnNewLine,
                        _d)), disabled: disabled, onKeyDown: handleKeyDown, placeholder: filled ? '' : placeholder }))),
                placeholder && !filled && !autocomplete && (React.createElement("span", { className: styles.placeholder }, placeholder))))));
};

export { TagList };
