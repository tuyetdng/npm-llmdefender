import { a as __assign, b as __spreadArray } from './tslib.es6-0bbcaa10.js';
import React, { forwardRef, useRef, useMemo, useCallback, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import { useMultipleSelection, useCombobox } from 'downshift';
import { Popover } from '../../popover/esm';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';
import { processOptions, getFilteredOptions } from './utils.js';
import { NativeSelect } from './components/native-select/Component.js';

var getDataTestId = function (dataTestId, element) {
    var elementPart = element ? "-".concat(element.toLowerCase()) : '';
    return dataTestId ? "".concat(dataTestId).concat(elementPart) : undefined;
};

var styles = {"component":"select__component_fvul1","popoverInner":"select__popoverInner_fvul1","optionsList":"select__optionsList_fvul1","nativeSelect":"select__nativeSelect_fvul1","block":"select__block_fvul1"};
require('./components/base-select/index.css');

var BaseSelect = forwardRef(function (_a, ref) {
    var _b;
    var dataTestId = _a.dataTestId, className = _a.className, fieldClassName = _a.fieldClassName, optionsListClassName = _a.optionsListClassName, optionClassName = _a.optionClassName, popperClassName = _a.popperClassName, options = _a.options, _c = _a.autocomplete, autocomplete = _c === void 0 ? false : _c, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.allowUnselect, allowUnselect = _e === void 0 ? false : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.closeOnSelect, closeOnSelect = _g === void 0 ? !multiple : _g, _h = _a.circularNavigation, circularNavigation = _h === void 0 ? false : _h, _j = _a.nativeSelect, nativeSelect = _j === void 0 ? false : _j, _k = _a.defaultOpen, defaultOpen = _k === void 0 ? false : _k, openProp = _a.open, _l = _a.popoverPosition, popoverPosition = _l === void 0 ? 'bottom-start' : _l, _m = _a.preventFlip, preventFlip = _m === void 0 ? true : _m, _o = _a.optionsListWidth, optionsListWidth = _o === void 0 ? 'content' : _o, name = _a.name, id = _a.id, selected = _a.selected, _p = _a.size, size = _p === void 0 ? 's' : _p, _q = _a.optionsSize, optionsSize = _q === void 0 ? size : _q, error = _a.error, hint = _a.hint, block = _a.block, label = _a.label, labelView = _a.labelView, placeholder = _a.placeholder, _r = _a.fieldProps, fieldProps = _r === void 0 ? {} : _r, _s = _a.optionsListProps, optionsListProps = _s === void 0 ? {} : _s, _t = _a.optionProps, optionProps = _t === void 0 ? {} : _t, valueRenderer = _a.valueRenderer, onChange = _a.onChange, onOpen = _a.onOpen, onFocus = _a.onFocus, onBlur = _a.onBlur, onScroll = _a.onScroll, Arrow = _a.Arrow, _u = _a.Field, Field = _u === void 0 ? function () { return null; } : _u, _v = _a.OptionsList, OptionsList = _v === void 0 ? function () { return null; } : _v, _w = _a.Optgroup, Optgroup = _w === void 0 ? function () { return null; } : _w, _x = _a.Option, Option = _x === void 0 ? function () { return null; } : _x, updatePopover = _a.updatePopover, zIndexPopover = _a.zIndexPopover, _y = _a.showEmptyOptionsList, showEmptyOptionsList = _y === void 0 ? false : _y, visibleOptions = _a.visibleOptions, _z = _a.filterProps, _0 = _z === void 0 ? {} : _z, filterFunction = _0.filterFunction, filterValue = _0.filterValue;
    var rootRef = useRef(null);
    var fieldRef = useRef(null);
    var listRef = useRef(null);
    var initiatorRef = useRef(null);
    var itemToString = function (option) { return (option ? option.key : ''); };
    var _1 = useMemo(function () { return processOptions(options, selected); }, [options, selected]), flatOptions = _1.flatOptions, selectedOptions = _1.selectedOptions;
    var useMultipleSelectionProps = {
        itemToString: itemToString,
        onSelectedItemsChange: function (changes) {
            if (onChange) {
                var _a = changes.selectedItems, selectedItems_1 = _a === void 0 ? [] : _a;
                onChange({
                    selectedMultiple: selectedItems_1,
                    selected: selectedItems_1.length ? selectedItems_1[0] : null,
                    initiator: initiatorRef.current,
                    name: name,
                });
                initiatorRef.current = null;
            }
        },
        stateReducer: function (state, actionAndChanges) {
            var type = actionAndChanges.type, changes = actionAndChanges.changes;
            if (!allowUnselect &&
                type === useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace) {
                return state;
            }
            return changes;
        },
    };
    if (selected !== undefined) {
        useMultipleSelectionProps.selectedItems = selectedOptions;
    }
    var _2 = useMultipleSelection(useMultipleSelectionProps), selectedItems = _2.selectedItems, addSelectedItem = _2.addSelectedItem, setSelectedItems = _2.setSelectedItems, removeSelectedItem = _2.removeSelectedItem, getDropdownProps = _2.getDropdownProps;
    var _3 = useCombobox({
        id: id,
        isOpen: openProp,
        circularNavigation: circularNavigation,
        items: flatOptions,
        itemToString: itemToString,
        defaultHighlightedIndex: selectedItems.length === 0 ? -1 : undefined,
        onIsOpenChange: function (changes) {
            if (onOpen) {
                /**
                 *  Вызываем обработчик асинхронно.
                 *
                 * Иначе при клике вне открытого селекта сначала сработает onOpen, который закроет селект,
                 * А затем сработает onClick кнопки открытия\закрытия с open=false и в итоге селект откроется снова.
                 */
                setTimeout(function () {
                    onOpen({
                        open: changes.isOpen,
                        name: name,
                    });
                }, 0);
            }
        },
        stateReducer: function (state, actionAndChanges) {
            var type = actionAndChanges.type, changes = actionAndChanges.changes;
            var selectedItem = changes.selectedItem;
            switch (type) {
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    initiatorRef.current = selectedItem;
                    if (selectedItem && !selectedItem.disabled) {
                        var alreadySelected = selectedItems.includes(selectedItem);
                        var allowRemove = allowUnselect || (multiple && selectedItems.length > 1);
                        if (alreadySelected && allowRemove) {
                            removeSelectedItem(selectedItem);
                        }
                        if (!alreadySelected) {
                            if (multiple) {
                                addSelectedItem(selectedItem);
                            }
                            else {
                                setSelectedItems([selectedItem]);
                            }
                        }
                    }
                    return __assign(__assign({}, changes), { isOpen: !closeOnSelect, 
                        // при closeOnSelect === false - сохраняем подсвеченный индекс
                        highlightedIndex: state.isOpen && !closeOnSelect
                            ? state.highlightedIndex
                            : changes.highlightedIndex });
                default:
                    return changes;
            }
        },
    }), open = _3.isOpen, getMenuProps = _3.getMenuProps, getInputProps = _3.getInputProps, getItemProps = _3.getItemProps, getComboboxProps = _3.getComboboxProps, getLabelProps = _3.getLabelProps, highlightedIndex = _3.highlightedIndex, toggleMenu = _3.toggleMenu, openMenu = _3.openMenu;
    var menuProps = getMenuProps({ ref: listRef }, { suppressRefError: true });
    var inputProps = getInputProps(getDropdownProps({ ref: mergeRefs([ref, fieldRef]) }));
    var handleFieldFocus = function (event) {
        if (onFocus)
            onFocus(event);
        if (autocomplete && !open) {
            openMenu();
        }
    };
    var handleFieldBlur = function (event) {
        var _a;
        var isNextFocusInsideList = (_a = listRef.current) === null || _a === void 0 ? void 0 : _a.contains((event.relatedTarget || document.activeElement));
        if (!isNextFocusInsideList) {
            if (onBlur)
                onBlur(event);
            inputProps.onBlur(event);
        }
    };
    var handleFieldKeyDown = function (event) {
        inputProps.onKeyDown(event);
        if (autocomplete && !open && (event.key.length === 1 || event.key === 'Backspace')) {
            // Для автокомплита - открываем меню при начале ввода
            openMenu();
        }
        if ([' ', 'Enter'].includes(event.key) &&
            !autocomplete &&
            !nativeSelect &&
            event.target.tagName !== 'INPUT' &&
            event.target.tagName !== 'BUTTON') {
            // Открываем\закрываем меню по нажатию enter или пробела
            event.preventDefault();
            if (!open || highlightedIndex === -1)
                toggleMenu();
        }
    };
    var handleFieldClick = function (event) {
        if (!autocomplete || event.target.tagName !== 'INPUT') {
            toggleMenu();
        }
        else {
            openMenu();
        }
    };
    var handleNativeSelectChange = useCallback(function (event) {
        setSelectedItems(__spreadArray([], event.target.options, true).reduce(function (acc, option, index) {
            return option.selected ? acc.concat(flatOptions[index]) : acc;
        }, []));
    }, [flatOptions, setSelectedItems]);
    var getOptionProps = useCallback(function (option, index) { return (__assign(__assign({}, optionProps), { className: optionClassName, innerProps: getItemProps({
            index: index,
            item: option,
            disabled: option.disabled,
            onMouseDown: function (event) { return event.preventDefault(); },
        }), multiple: multiple, index: index, option: option, size: optionsSize, disabled: option.disabled, highlighted: index === highlightedIndex, selected: selectedItems.includes(option), dataTestId: getDataTestId(dataTestId, 'option') })); }, [
        dataTestId,
        getItemProps,
        highlightedIndex,
        multiple,
        optionClassName,
        optionProps,
        optionsSize,
        selectedItems,
    ]);
    useEffect(function () {
        if (defaultOpen)
            openMenu();
    }, [defaultOpen, openMenu]);
    useEffect(function () {
        if (openProp) {
            openMenu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var calcOptionsListWidth = useCallback(function () {
        if (listRef.current) {
            var widthAttr = optionsListWidth === 'field' ? 'width' : 'minWidth';
            var optionsListMinWidth = rootRef.current
                ? rootRef.current.getBoundingClientRect().width
                : 0;
            listRef.current.setAttribute('style', '');
            listRef.current.style[widthAttr] = "".concat(optionsListMinWidth, "px");
        }
    }, [optionsListWidth]);
    useEffect(function () {
        var ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        var observer = new ResizeObserver$1(calcOptionsListWidth);
        if (rootRef.current) {
            observer.observe(rootRef.current);
        }
        return function () {
            observer.disconnect();
        };
    }, [calcOptionsListWidth, open, optionsListWidth]);
    var finalOptions = useMemo(function () {
        if (filterFunction) {
            return getFilteredOptions(options, filterValue || '', filterFunction);
        }
        return options;
    }, [filterFunction, filterValue, options]);
    useLayoutEffect_SAFE_FOR_SSR(calcOptionsListWidth, [
        open,
        optionsListWidth,
        finalOptions,
        selectedItems,
    ]);
    var renderValue = useCallback(function () {
        return selectedItems.map(function (option) { return (React.createElement("input", { type: 'hidden', name: name, value: option.key, key: option.key })); });
    }, [selectedItems, name]);
    var renderNativeSelect = useCallback(function () {
        var value = multiple
            ? selectedItems.map(function (option) { return option.key; })
            : (selectedItems[0] || {}).key;
        return (React.createElement(NativeSelect, __assign({}, menuProps, { className: styles.nativeSelect, disabled: disabled, multiple: multiple, name: name, value: value, onChange: handleNativeSelectChange, options: finalOptions })));
    }, [
        multiple,
        selectedItems,
        disabled,
        name,
        handleNativeSelectChange,
        finalOptions,
        menuProps,
    ]);
    var needRenderOptionsList = flatOptions.length > 0 || showEmptyOptionsList;
    return (React.createElement("div", __assign({}, getComboboxProps(__assign(__assign({ ref: rootRef }, (disabled && { 'aria-disabled': true })), { className: cn(styles.component, (_b = {}, _b[styles.block] = block, _b), className) })), { onKeyDown: disabled ? undefined : handleFieldKeyDown, tabIndex: -1, "data-test-id": getDataTestId(dataTestId) }),
        nativeSelect && renderNativeSelect(),
        React.createElement(Field, __assign({ selectedMultiple: selectedItems, selected: selectedItems[0], setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, multiple: multiple, open: open, disabled: disabled, size: size, placeholder: placeholder, label: label && React.createElement("span", __assign({}, getLabelProps()), label), labelView: labelView, Arrow: Arrow && React.createElement(Arrow, { open: open }), error: error, hint: hint, valueRenderer: valueRenderer, className: fieldClassName, innerProps: {
                onBlur: handleFieldBlur,
                onFocus: disabled ? undefined : handleFieldFocus,
                onClick: disabled ? undefined : handleFieldClick,
                tabIndex: nativeSelect || disabled ? -1 : 0,
                ref: mergeRefs([inputProps.ref]),
                id: inputProps.id,
                'aria-labelledby': inputProps['aria-labelledby'],
                'aria-controls': inputProps['aria-controls'],
                'aria-autocomplete': autocomplete
                    ? inputProps['aria-autocomplete']
                    : undefined,
            }, dataTestId: getDataTestId(dataTestId, 'field') }, fieldProps)),
        name && !nativeSelect && renderValue(),
        !nativeSelect && (React.createElement(Popover, { open: open, withTransition: false, anchorElement: fieldRef.current, position: popoverPosition, preventFlip: preventFlip, popperClassName: cn(styles.popoverInner, popperClassName), update: updatePopover, zIndex: zIndexPopover }, needRenderOptionsList && (React.createElement("div", __assign({}, menuProps, { className: cn(optionsListClassName, styles.optionsList) }),
            React.createElement(OptionsList, __assign({}, optionsListProps, { optionsListWidth: optionsListWidth, flatOptions: flatOptions, highlightedIndex: highlightedIndex, open: open, size: size, options: finalOptions, Optgroup: Optgroup, Option: Option, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, visibleOptions: visibleOptions, onScroll: onScroll, dataTestId: getDataTestId(dataTestId, 'options-list') }))))))));
});

export { BaseSelect as B, getDataTestId as g };
