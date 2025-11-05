import React, { forwardRef, useRef, useMemo, useCallback, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import { useMultipleSelection, useCombobox } from 'downshift';
import { Popover } from '../../popover/modern';
import { useLayoutEffect_SAFE_FOR_SSR } from '@alfalab/hooks';
import { processOptions, getFilteredOptions } from './utils.js';
import { NativeSelect } from './components/native-select/Component.js';

const getDataTestId = (dataTestId, element) => {
    const elementPart = element ? `-${element.toLowerCase()}` : '';
    return dataTestId ? `${dataTestId}${elementPart}` : undefined;
};

const styles = {"component":"select__component_fvul1","popoverInner":"select__popoverInner_fvul1","optionsList":"select__optionsList_fvul1","nativeSelect":"select__nativeSelect_fvul1","block":"select__block_fvul1"};
require('./components/base-select/index.css');

const BaseSelect = forwardRef(({ dataTestId, className, fieldClassName, optionsListClassName, optionClassName, popperClassName, options, autocomplete = false, multiple = false, allowUnselect = false, disabled = false, closeOnSelect = !multiple, circularNavigation = false, nativeSelect = false, defaultOpen = false, open: openProp, popoverPosition = 'bottom-start', preventFlip = true, optionsListWidth = 'content', name, id, selected, size = 's', optionsSize = size, error, hint, block, label, labelView, placeholder, fieldProps = {}, optionsListProps = {}, optionProps = {}, valueRenderer, onChange, onOpen, onFocus, onBlur, onScroll, Arrow, Field = () => null, OptionsList = () => null, Optgroup = () => null, Option = () => null, updatePopover, zIndexPopover, showEmptyOptionsList = false, visibleOptions, filterProps: { filterFunction, filterValue } = {}, }, ref) => {
    const rootRef = useRef(null);
    const fieldRef = useRef(null);
    const listRef = useRef(null);
    const initiatorRef = useRef(null);
    const itemToString = (option) => (option ? option.key : '');
    const { flatOptions, selectedOptions } = useMemo(() => processOptions(options, selected), [options, selected]);
    const useMultipleSelectionProps = {
        itemToString,
        onSelectedItemsChange: (changes) => {
            if (onChange) {
                const { selectedItems = [] } = changes;
                onChange({
                    selectedMultiple: selectedItems,
                    selected: selectedItems.length ? selectedItems[0] : null,
                    initiator: initiatorRef.current,
                    name,
                });
                initiatorRef.current = null;
            }
        },
        stateReducer: (state, actionAndChanges) => {
            const { type, changes } = actionAndChanges;
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
    const { selectedItems, addSelectedItem, setSelectedItems, removeSelectedItem, getDropdownProps, } = useMultipleSelection(useMultipleSelectionProps);
    const { isOpen: open, getMenuProps, getInputProps, getItemProps, getComboboxProps, getLabelProps, highlightedIndex, toggleMenu, openMenu, } = useCombobox({
        id,
        isOpen: openProp,
        circularNavigation,
        items: flatOptions,
        itemToString,
        defaultHighlightedIndex: selectedItems.length === 0 ? -1 : undefined,
        onIsOpenChange: (changes) => {
            if (onOpen) {
                /**
                 *  Вызываем обработчик асинхронно.
                 *
                 * Иначе при клике вне открытого селекта сначала сработает onOpen, который закроет селект,
                 * А затем сработает onClick кнопки открытия\закрытия с open=false и в итоге селект откроется снова.
                 */
                setTimeout(() => {
                    onOpen({
                        open: changes.isOpen,
                        name,
                    });
                }, 0);
            }
        },
        stateReducer: (state, actionAndChanges) => {
            const { type, changes } = actionAndChanges;
            const { selectedItem } = changes;
            switch (type) {
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    initiatorRef.current = selectedItem;
                    if (selectedItem && !selectedItem.disabled) {
                        const alreadySelected = selectedItems.includes(selectedItem);
                        const allowRemove = allowUnselect || (multiple && selectedItems.length > 1);
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
                    return {
                        ...changes,
                        isOpen: !closeOnSelect,
                        // при closeOnSelect === false - сохраняем подсвеченный индекс
                        highlightedIndex: state.isOpen && !closeOnSelect
                            ? state.highlightedIndex
                            : changes.highlightedIndex,
                    };
                default:
                    return changes;
            }
        },
    });
    const menuProps = getMenuProps({ ref: listRef }, { suppressRefError: true });
    const inputProps = getInputProps(getDropdownProps({ ref: mergeRefs([ref, fieldRef]) }));
    const handleFieldFocus = (event) => {
        if (onFocus)
            onFocus(event);
        if (autocomplete && !open) {
            openMenu();
        }
    };
    const handleFieldBlur = (event) => {
        const isNextFocusInsideList = listRef.current?.contains((event.relatedTarget || document.activeElement));
        if (!isNextFocusInsideList) {
            if (onBlur)
                onBlur(event);
            inputProps.onBlur(event);
        }
    };
    const handleFieldKeyDown = (event) => {
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
    const handleFieldClick = (event) => {
        if (!autocomplete || event.target.tagName !== 'INPUT') {
            toggleMenu();
        }
        else {
            openMenu();
        }
    };
    const handleNativeSelectChange = useCallback((event) => {
        setSelectedItems([...event.target.options].reduce((acc, option, index) => option.selected ? acc.concat(flatOptions[index]) : acc, []));
    }, [flatOptions, setSelectedItems]);
    const getOptionProps = useCallback((option, index) => ({
        ...optionProps,
        className: optionClassName,
        innerProps: getItemProps({
            index,
            item: option,
            disabled: option.disabled,
            onMouseDown: (event) => event.preventDefault(),
        }),
        multiple,
        index,
        option,
        size: optionsSize,
        disabled: option.disabled,
        highlighted: index === highlightedIndex,
        selected: selectedItems.includes(option),
        dataTestId: getDataTestId(dataTestId, 'option'),
    }), [
        dataTestId,
        getItemProps,
        highlightedIndex,
        multiple,
        optionClassName,
        optionProps,
        optionsSize,
        selectedItems,
    ]);
    useEffect(() => {
        if (defaultOpen)
            openMenu();
    }, [defaultOpen, openMenu]);
    useEffect(() => {
        if (openProp) {
            openMenu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const calcOptionsListWidth = useCallback(() => {
        if (listRef.current) {
            const widthAttr = optionsListWidth === 'field' ? 'width' : 'minWidth';
            const optionsListMinWidth = rootRef.current
                ? rootRef.current.getBoundingClientRect().width
                : 0;
            listRef.current.setAttribute('style', '');
            listRef.current.style[widthAttr] = `${optionsListMinWidth}px`;
        }
    }, [optionsListWidth]);
    useEffect(() => {
        const ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        const observer = new ResizeObserver$1(calcOptionsListWidth);
        if (rootRef.current) {
            observer.observe(rootRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [calcOptionsListWidth, open, optionsListWidth]);
    const finalOptions = useMemo(() => {
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
    const renderValue = useCallback(() => selectedItems.map((option) => (React.createElement("input", { type: 'hidden', name: name, value: option.key, key: option.key }))), [selectedItems, name]);
    const renderNativeSelect = useCallback(() => {
        const value = multiple
            ? selectedItems.map((option) => option.key)
            : (selectedItems[0] || {}).key;
        return (React.createElement(NativeSelect, { ...menuProps, className: styles.nativeSelect, disabled: disabled, multiple: multiple, name: name, value: value, onChange: handleNativeSelectChange, options: finalOptions }));
    }, [
        multiple,
        selectedItems,
        disabled,
        name,
        handleNativeSelectChange,
        finalOptions,
        menuProps,
    ]);
    const needRenderOptionsList = flatOptions.length > 0 || showEmptyOptionsList;
    return (React.createElement("div", { ...getComboboxProps({
            ref: rootRef,
            ...(disabled && { 'aria-disabled': true }),
            className: cn(styles.component, { [styles.block]: block }, className),
        }), onKeyDown: disabled ? undefined : handleFieldKeyDown, tabIndex: -1, "data-test-id": getDataTestId(dataTestId) },
        nativeSelect && renderNativeSelect(),
        React.createElement(Field, { selectedMultiple: selectedItems, selected: selectedItems[0], setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, multiple: multiple, open: open, disabled: disabled, size: size, placeholder: placeholder, label: label && React.createElement("span", { ...getLabelProps() }, label), labelView: labelView, Arrow: Arrow && React.createElement(Arrow, { open: open }), error: error, hint: hint, valueRenderer: valueRenderer, className: fieldClassName, innerProps: {
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
            }, dataTestId: getDataTestId(dataTestId, 'field'), ...fieldProps }),
        name && !nativeSelect && renderValue(),
        !nativeSelect && (React.createElement(Popover, { open: open, withTransition: false, anchorElement: fieldRef.current, position: popoverPosition, preventFlip: preventFlip, popperClassName: cn(styles.popoverInner, popperClassName), update: updatePopover, zIndex: zIndexPopover }, needRenderOptionsList && (React.createElement("div", { ...menuProps, className: cn(optionsListClassName, styles.optionsList) },
            React.createElement(OptionsList, { ...optionsListProps, optionsListWidth: optionsListWidth, flatOptions: flatOptions, highlightedIndex: highlightedIndex, open: open, size: size, options: finalOptions, Optgroup: Optgroup, Option: Option, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, visibleOptions: visibleOptions, onScroll: onScroll, dataTestId: getDataTestId(dataTestId, 'options-list') })))))));
});

export { BaseSelect as B, getDataTestId as g };
