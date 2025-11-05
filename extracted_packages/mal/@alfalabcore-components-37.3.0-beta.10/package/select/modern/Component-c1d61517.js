import React, { forwardRef, useRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Arrow } from './components/arrow/Component.js';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useMultipleSelection, useCombobox } from 'downshift';
import { BottomSheet } from '../../bottom-sheet/modern';
import { ModalMobile } from '../../modal/modern/mobile';
import './Component.js';
import { g as getDataTestId } from './Component-1d36bace.js';
import { Field } from './components/field/Component.js';
import { Optgroup } from './components/optgroup/Component.js';
import { Option } from './components/option/Component.js';
import { OptionsList } from './components/options-list/Component.js';
import 'react-virtual';
import '../../scrollbar/modern';
import '@alfalab/hooks';
import { processOptions, getFilteredOptions } from './utils.js';
import { BaseOption } from './components/base-option/Component.js';
import '../../skeleton/modern';
import './intersection-observer-b8a51493.js';
import { Button } from '../../button/modern';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '../../form-control/modern';
import '../../badge/modern';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../checkbox/modern';
import { BaseCheckmark } from './components/base-checkmark/Component.js';
import { Checkmark } from './components/base-select-mobile/checkmark/Component.js';
import { OptionsList as OptionsList$1 } from './components/base-select-mobile/options-list/Component.js';
import '@juggle/resize-observer';
import '../../popover/modern';
import './components/native-select/Component.js';
import './components/checkmark/Component.js';
import '../../base-modal/modern';

const styles$1 = {"footer":"select__footer_ir798","withBorder":"select__withBorder_ir798"};
require('./presets/useSelectWithApply/options-list-with-apply/index.css');

const OptionsListWithApply = forwardRef(({ toggleMenu, OptionsList: OptionsList$1 = OptionsList, getOptionProps: defaultGetOptionProps, showClear = true, selectedDraft = [], flatOptions = [], onApply = () => null, onClear = () => null, onClose = () => null, visibleOptions = 5, ...restProps }, ref) => {
    const footerRef = useRef(null);
    const getOptionProps = useCallback((option, index) => {
        const optionProps = defaultGetOptionProps(option, index);
        const selected = option.key === SELECT_ALL_KEY
            ? selectedDraft.length === flatOptions.length - 1
            : selectedDraft.includes(option);
        return {
            ...optionProps,
            selected,
        };
    }, [defaultGetOptionProps, flatOptions.length, selectedDraft]);
    const handleApply = useCallback(() => {
        onApply();
        toggleMenu();
    }, [onApply, toggleMenu]);
    const handleClear = useCallback(() => {
        onClear();
        toggleMenu();
    }, [onClear, toggleMenu]);
    useEffect(() => {
        const activeElement = document.activeElement;
        setTimeout(() => {
            if (footerRef.current) {
                footerRef.current.focus();
            }
        }, 0);
        return () => {
            onClose();
            if (activeElement) {
                activeElement.focus();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement(OptionsList$1, { ...restProps, ref: ref, visibleOptions: visibleOptions, toggleMenu: toggleMenu, flatOptions: flatOptions, getOptionProps: getOptionProps, onApply: handleApply, onClear: handleClear, footer: React.createElement("div", { 
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex: 0, className: cn(styles$1.footer, {
                [styles$1.withBorder]: visibleOptions && flatOptions.length > visibleOptions,
            }), ref: footerRef },
            React.createElement(Button, { size: 'xxs', view: 'primary', onClick: handleApply }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"),
            showClear && (React.createElement(Button, { size: 'xxs', view: 'secondary', onClick: handleClear }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C"))) }));
});

const SELECT_ALL_KEY = 'select_all';
const selectAllOption = { key: SELECT_ALL_KEY, content: 'Выбрать все' };
function useSelectWithApply({ options, selected, onChange = () => null, OptionsList, showClear = true, showSelectAll = false, }) {
    const { flatOptions, selectedOptions } = useMemo(() => processOptions(options, selected), [options, selected]);
    const [selectedDraft, setSelectedDraft] = useState(selectedOptions);
    const selectedOptionsRef = useRef(selectedOptions);
    const handleApply = useCallback(() => {
        onChange({
            selected: selectedDraft[0],
            selectedMultiple: selectedDraft,
            initiator: null,
        });
    }, [onChange, selectedDraft]);
    const handleClear = useCallback(() => {
        setSelectedDraft([]);
        onChange({
            selected: null,
            selectedMultiple: [],
            initiator: null,
        });
    }, [onChange]);
    const handleChange = useCallback(({ initiator, ...restArgs }) => {
        if (!initiator) {
            onChange({
                initiator: null,
                ...restArgs,
            });
            return;
        }
        const initiatorSelected = selectedDraft.includes(initiator) ||
            (initiator.key === SELECT_ALL_KEY && selectedDraft.length === flatOptions.length);
        if (initiator.key === SELECT_ALL_KEY) {
            setSelectedDraft(initiatorSelected ? [] : flatOptions);
        }
        else {
            setSelectedDraft(initiatorSelected
                ? selectedDraft.filter((o) => o !== initiator)
                : selectedDraft.concat(initiator));
        }
    }, [flatOptions, onChange, selectedDraft]);
    const handleClose = useCallback(() => {
        setSelectedDraft(selectedOptionsRef.current);
    }, []);
    useEffect(() => {
        setSelectedDraft(selectedOptions);
        selectedOptionsRef.current = selectedOptions;
    }, [selectedOptions]);
    const memoizedOptions = useMemo(() => (showSelectAll ? [selectAllOption, ...options] : options), [options, showSelectAll]);
    return {
        OptionsList: OptionsListWithApply,
        optionsListProps: {
            OptionsList,
            showClear: showClear && (selectedDraft.length > 0 || selectedOptions.length > 0),
            onClear: handleClear,
            onApply: handleApply,
            onClose: handleClose,
            selectedDraft,
        },
        allowUnselect: true,
        multiple: true,
        options: memoizedOptions,
        onChange: handleChange,
        selected,
    };
}

const styles = {"component":"select__component_1pba6","popoverInner":"select__popoverInner_1pba6","sheet":"select__sheet_1pba6","sheetContent":"select__sheetContent_1pba6","sheetContainer":"select__sheetContainer_1pba6","block":"select__block_1pba6","option":"select__option_1pba6","optionGroup":"select__optionGroup_1pba6"};
require('./components/base-select-mobile/index.css');

const BaseSelectMobile = forwardRef(({ dataTestId, className, fieldClassName, optionsListClassName, optionClassName, optionGroupClassName, optionsListProps, options, autocomplete = false, multiple = false, allowUnselect = false, disabled = false, closeOnSelect = !multiple, circularNavigation = false, defaultOpen = false, open: openProp, name, id, selected, size = 'm', optionsSize = 'm', error, hint, block, label, labelView, placeholder, fieldProps = {}, optionProps = {}, valueRenderer, onChange, onOpen, onFocus, Arrow: Arrow$1 = Arrow, Field: Field$1 = Field, Optgroup: Optgroup$1 = Optgroup, Option: Option$1 = Option, OptionsList = OptionsList$1, swipeable, footer, isBottomSheet, bottomSheetProps, filterProps: { filterFunction, filterValue } = {}, }, ref) => {
    const rootRef = useRef(null);
    const fieldRef = useRef(null);
    const listRef = useRef(null);
    const initiatorRef = useRef(null);
    const itemToString = (option) => (option ? option.key : '');
    const { flatOptions, selectedOptions } = useMemo(() => processOptions(options, selected), [options, selected]);
    const selectedOptionsRef = useRef(selectedOptions);
    const [selectedDraft, setSelectedDraft] = useState(selectedOptions);
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
        defaultHighlightedIndex: -1,
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
                case useCombobox.stateChangeTypes.InputBlur:
                    return state;
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    initiatorRef.current = selectedItem;
                    if (selectedItem && !selectedItem.disabled) {
                        const alreadySelected = selectedItems.includes(selectedItem);
                        const allowRemove = allowUnselect || (multiple && selectedItems.length > 1);
                        if (alreadySelected && allowRemove) {
                            if (multiple) {
                                removeSelectedItem(selectedItem);
                            }
                            else {
                                setSelectedItems([]);
                                setSelectedDraft([]);
                            }
                        }
                        if (!alreadySelected) {
                            if (multiple) {
                                addSelectedItem(selectedItem);
                            }
                            else {
                                setSelectedItems([selectedItem]);
                                setSelectedDraft([selectedItem]);
                            }
                        }
                    }
                    return {
                        ...changes,
                        isOpen: !closeOnSelect || multiple,
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
    useEffect(() => {
        setSelectedDraft(selectedOptions);
        setSelectedItems(selectedOptions);
        selectedOptionsRef.current = selectedOptions;
    }, [setSelectedItems, selectedOptions]);
    const handleFieldFocus = (event) => {
        if (onFocus)
            onFocus(event);
        if (autocomplete && !open) {
            openMenu();
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
    const getOptionProps = (option, index) => {
        const selectedItem = selectedItems.includes(option);
        return {
            ...optionProps,
            mobile: true,
            className: cn(styles.option, optionClassName),
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
            selected: selectedItem,
            dataTestId: getDataTestId(dataTestId, 'option'),
            // eslint-disable-next-line react/no-unstable-nested-components
            Checkmark: () => Option$1 === BaseOption ? (React.createElement(BaseCheckmark, { selected: selectedItem, multiple: multiple })) : (React.createElement(Checkmark, { selected: selectedItem })),
        };
    };
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
    const renderValue = () => selectedItems.map((option) => (React.createElement("input", { type: 'hidden', name: name, value: option.key, key: option.key })));
    const handleApply = () => {
        setSelectedDraft(selectedItems);
    };
    const handleClear = () => {
        setSelectedDraft([]);
        setSelectedItems([]);
    };
    const handleClose = () => {
        if (multiple) {
            setSelectedItems(selectedDraft);
        }
        toggleMenu();
    };
    const finalOptions = useMemo(() => {
        if (filterFunction) {
            return getFilteredOptions(options, filterValue || '', filterFunction);
        }
        return options;
    }, [filterFunction, filterValue, options]);
    return (React.createElement("div", { ...getComboboxProps({
            ref: rootRef,
            ...(disabled && { 'aria-disabled': true }),
            className: cn(styles.component, { [styles.block]: block }, className),
        }), onKeyDown: disabled ? undefined : handleFieldKeyDown, tabIndex: -1, "data-test-id": getDataTestId(dataTestId) },
        React.createElement(Field$1, { selectedMultiple: selectedDraft, selected: selectedItems[0], setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, multiple: multiple, open: open, disabled: disabled, size: size, placeholder: placeholder, label: label && React.createElement("span", { ...getLabelProps() }, label), labelView: labelView, Arrow: Arrow$1 && React.createElement(Arrow$1, { open: open }), error: error, hint: hint, valueRenderer: valueRenderer, className: fieldClassName, innerProps: {
                onFocus: disabled ? undefined : handleFieldFocus,
                onClick: disabled ? undefined : handleFieldClick,
                tabIndex: disabled ? -1 : 0,
                ref: mergeRefs([inputProps.ref]),
                id: inputProps.id,
                'aria-labelledby': inputProps['aria-labelledby'],
                'aria-controls': inputProps['aria-controls'],
                'aria-autocomplete': autocomplete
                    ? inputProps['aria-autocomplete']
                    : undefined,
            }, dataTestId: getDataTestId(dataTestId, 'field'), ...fieldProps }),
        name && renderValue(),
        isBottomSheet ? (React.createElement(BottomSheet, { open: open, onClose: handleClose, className: styles.sheet, contentClassName: styles.sheetContent, containerClassName: styles.sheetContainer, title: placeholder, actionButton: footer, stickyHeader: true, hasCloser: true, swipeable: swipeable, ...bottomSheetProps },
            React.createElement("div", { ...menuProps, className: optionsListClassName },
                React.createElement(OptionsListWithApply, { showFooter: multiple, ...optionsListProps, flatOptions: flatOptions, highlightedIndex: highlightedIndex, size: size, options: finalOptions, OptionsList: OptionsList, Optgroup: Optgroup$1, Option: Option$1, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, dataTestId: getDataTestId(dataTestId, 'options-list'), optionGroupClassName: cn(styles.optionGroup, optionGroupClassName), onApply: handleApply, onClear: handleClear })))) : (React.createElement(ModalMobile, { open: open, onClose: handleClose, contentClassName: styles.sheetContent, hasCloser: true },
            React.createElement(ModalMobile.Header, { hasCloser: true, title: placeholder, sticky: true }),
            React.createElement("div", { ...menuProps, className: optionsListClassName },
                React.createElement(OptionsListWithApply, { showFooter: multiple, ...optionsListProps, flatOptions: flatOptions, highlightedIndex: highlightedIndex, size: size, options: finalOptions, OptionsList: OptionsList, Optgroup: Optgroup$1, Option: Option$1, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, dataTestId: getDataTestId(dataTestId, 'options-list'), optionGroupClassName: cn(styles.optionGroup, optionGroupClassName), onApply: handleApply, onClear: handleClear }))))));
});

const SelectMobile = forwardRef(({ autocomplete = false, multiple = false, allowUnselect = false, disabled = false, closeOnSelect = !multiple, circularNavigation = false, defaultOpen = false, open: openProp, size = 'm', optionsSize = 'm', fieldProps = {}, optionProps = {}, Arrow: Arrow$1 = Arrow, Field: Field$1 = Field, Optgroup: Optgroup$1 = Optgroup, Option: Option$1 = Option, ...restProps }, ref) => (React.createElement(BaseSelectMobile, { ref: ref, autocomplete: autocomplete, multiple: multiple, allowUnselect: allowUnselect, disabled: disabled, closeOnSelect: closeOnSelect, circularNavigation: circularNavigation, defaultOpen: defaultOpen, open: openProp, size: size, optionsSize: optionsSize, fieldProps: fieldProps, optionProps: optionProps, Arrow: Arrow$1, Field: Field$1, Optgroup: Optgroup$1, Option: Option$1, isBottomSheet: true, ...restProps })));

const SelectModalMobile = forwardRef(({ autocomplete = false, multiple = false, allowUnselect = false, disabled = false, closeOnSelect = !multiple, circularNavigation = false, defaultOpen = false, open: openProp, size = 'm', optionsSize = 'm', fieldProps = {}, optionProps = {}, Arrow: Arrow$1 = Arrow, Field: Field$1 = Field, Optgroup: Optgroup$1 = Optgroup, Option: Option$1 = Option, ...restProps }, ref) => (React.createElement(BaseSelectMobile, { ref: ref, autocomplete: autocomplete, multiple: multiple, allowUnselect: allowUnselect, disabled: disabled, closeOnSelect: closeOnSelect, circularNavigation: circularNavigation, defaultOpen: defaultOpen, open: openProp, size: size, optionsSize: optionsSize, fieldProps: fieldProps, optionProps: optionProps, Arrow: Arrow$1, Field: Field$1, Optgroup: Optgroup$1, Option: Option$1, isBottomSheet: false, ...restProps })));

export { BaseSelectMobile as B, OptionsListWithApply as O, SelectMobile as S, SelectModalMobile as a, SELECT_ALL_KEY as b, useSelectWithApply as u };
