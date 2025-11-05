import { _ as __rest, a as __assign, b as __spreadArray } from './tslib.es6-0bbcaa10.js';
import React, { forwardRef, useRef, useCallback, useEffect, useMemo, useState } from 'react';
import { Arrow } from './components/arrow/Component.js';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useMultipleSelection, useCombobox } from 'downshift';
import { BottomSheet } from '../../bottom-sheet/esm';
import { ModalMobile } from '../../modal/esm/mobile';
import './Component.js';
import { g as getDataTestId } from './Component-31f76563.js';
import { Field } from './components/field/Component.js';
import { Optgroup } from './components/optgroup/Component.js';
import { Option } from './components/option/Component.js';
import { OptionsList } from './components/options-list/Component.js';
import 'react-virtual';
import '../../scrollbar/esm';
import '@alfalab/hooks';
import { processOptions, getFilteredOptions } from './utils.js';
import { BaseOption } from './components/base-option/Component.js';
import '../../skeleton/esm';
import './intersection-observer-b8a51493.js';
import { Button } from '../../button/esm';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '../../form-control/esm';
import '../../badge/esm';
import '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import '@alfalab/icons-glyph/CheckmarkMIcon';
import '../../checkbox/esm';
import { BaseCheckmark } from './components/base-checkmark/Component.js';
import { Checkmark } from './components/base-select-mobile/checkmark/Component.js';
import { OptionsList as OptionsList$1 } from './components/base-select-mobile/options-list/Component.js';
import '@juggle/resize-observer';
import '../../popover/esm';
import './components/native-select/Component.js';
import './components/checkmark/Component.js';
import '../../base-modal/esm';

var styles$1 = {"footer":"select__footer_ir798","withBorder":"select__withBorder_ir798"};
require('./presets/useSelectWithApply/options-list-with-apply/index.css');

var OptionsListWithApply = forwardRef(function (_a, ref) {
    var _b;
    var toggleMenu = _a.toggleMenu, _c = _a.OptionsList, OptionsList$1 = _c === void 0 ? OptionsList : _c, defaultGetOptionProps = _a.getOptionProps, _d = _a.showClear, showClear = _d === void 0 ? true : _d, _e = _a.selectedDraft, selectedDraft = _e === void 0 ? [] : _e, _f = _a.flatOptions, flatOptions = _f === void 0 ? [] : _f, _g = _a.onApply, onApply = _g === void 0 ? function () { return null; } : _g, _h = _a.onClear, onClear = _h === void 0 ? function () { return null; } : _h, _j = _a.onClose, onClose = _j === void 0 ? function () { return null; } : _j, _k = _a.visibleOptions, visibleOptions = _k === void 0 ? 5 : _k, restProps = __rest(_a, ["toggleMenu", "OptionsList", "getOptionProps", "showClear", "selectedDraft", "flatOptions", "onApply", "onClear", "onClose", "visibleOptions"]);
    var footerRef = useRef(null);
    var getOptionProps = useCallback(function (option, index) {
        var optionProps = defaultGetOptionProps(option, index);
        var selected = option.key === SELECT_ALL_KEY
            ? selectedDraft.length === flatOptions.length - 1
            : selectedDraft.includes(option);
        return __assign(__assign({}, optionProps), { selected: selected });
    }, [defaultGetOptionProps, flatOptions.length, selectedDraft]);
    var handleApply = useCallback(function () {
        onApply();
        toggleMenu();
    }, [onApply, toggleMenu]);
    var handleClear = useCallback(function () {
        onClear();
        toggleMenu();
    }, [onClear, toggleMenu]);
    useEffect(function () {
        var activeElement = document.activeElement;
        setTimeout(function () {
            if (footerRef.current) {
                footerRef.current.focus();
            }
        }, 0);
        return function () {
            onClose();
            if (activeElement) {
                activeElement.focus();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (React.createElement(OptionsList$1, __assign({}, restProps, { ref: ref, visibleOptions: visibleOptions, toggleMenu: toggleMenu, flatOptions: flatOptions, getOptionProps: getOptionProps, onApply: handleApply, onClear: handleClear, footer: React.createElement("div", { 
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex: 0, className: cn(styles$1.footer, (_b = {},
                _b[styles$1.withBorder] = visibleOptions && flatOptions.length > visibleOptions,
                _b)), ref: footerRef },
            React.createElement(Button, { size: 'xxs', view: 'primary', onClick: handleApply }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"),
            showClear && (React.createElement(Button, { size: 'xxs', view: 'secondary', onClick: handleClear }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C"))) })));
});

var SELECT_ALL_KEY = 'select_all';
var selectAllOption = { key: SELECT_ALL_KEY, content: 'Выбрать все' };
function useSelectWithApply(_a) {
    var options = _a.options, selected = _a.selected, _b = _a.onChange, onChange = _b === void 0 ? function () { return null; } : _b, OptionsList = _a.OptionsList, _c = _a.showClear, showClear = _c === void 0 ? true : _c, _d = _a.showSelectAll, showSelectAll = _d === void 0 ? false : _d;
    var _e = useMemo(function () { return processOptions(options, selected); }, [options, selected]), flatOptions = _e.flatOptions, selectedOptions = _e.selectedOptions;
    var _f = useState(selectedOptions), selectedDraft = _f[0], setSelectedDraft = _f[1];
    var selectedOptionsRef = useRef(selectedOptions);
    var handleApply = useCallback(function () {
        onChange({
            selected: selectedDraft[0],
            selectedMultiple: selectedDraft,
            initiator: null,
        });
    }, [onChange, selectedDraft]);
    var handleClear = useCallback(function () {
        setSelectedDraft([]);
        onChange({
            selected: null,
            selectedMultiple: [],
            initiator: null,
        });
    }, [onChange]);
    var handleChange = useCallback(function (_a) {
        var initiator = _a.initiator, restArgs = __rest(_a, ["initiator"]);
        if (!initiator) {
            onChange(__assign({ initiator: null }, restArgs));
            return;
        }
        var initiatorSelected = selectedDraft.includes(initiator) ||
            (initiator.key === SELECT_ALL_KEY && selectedDraft.length === flatOptions.length);
        if (initiator.key === SELECT_ALL_KEY) {
            setSelectedDraft(initiatorSelected ? [] : flatOptions);
        }
        else {
            setSelectedDraft(initiatorSelected
                ? selectedDraft.filter(function (o) { return o !== initiator; })
                : selectedDraft.concat(initiator));
        }
    }, [flatOptions, onChange, selectedDraft]);
    var handleClose = useCallback(function () {
        setSelectedDraft(selectedOptionsRef.current);
    }, []);
    useEffect(function () {
        setSelectedDraft(selectedOptions);
        selectedOptionsRef.current = selectedOptions;
    }, [selectedOptions]);
    var memoizedOptions = useMemo(function () { return (showSelectAll ? __spreadArray([selectAllOption], options, true) : options); }, [options, showSelectAll]);
    return {
        OptionsList: OptionsListWithApply,
        optionsListProps: {
            OptionsList: OptionsList,
            showClear: showClear && (selectedDraft.length > 0 || selectedOptions.length > 0),
            onClear: handleClear,
            onApply: handleApply,
            onClose: handleClose,
            selectedDraft: selectedDraft,
        },
        allowUnselect: true,
        multiple: true,
        options: memoizedOptions,
        onChange: handleChange,
        selected: selected,
    };
}

var styles = {"component":"select__component_1pba6","popoverInner":"select__popoverInner_1pba6","sheet":"select__sheet_1pba6","sheetContent":"select__sheetContent_1pba6","sheetContainer":"select__sheetContainer_1pba6","block":"select__block_1pba6","option":"select__option_1pba6","optionGroup":"select__optionGroup_1pba6"};
require('./components/base-select-mobile/index.css');

var BaseSelectMobile = forwardRef(function (_a, ref) {
    var _b;
    var dataTestId = _a.dataTestId, className = _a.className, fieldClassName = _a.fieldClassName, optionsListClassName = _a.optionsListClassName, optionClassName = _a.optionClassName, optionGroupClassName = _a.optionGroupClassName, optionsListProps = _a.optionsListProps, options = _a.options, _c = _a.autocomplete, autocomplete = _c === void 0 ? false : _c, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.allowUnselect, allowUnselect = _e === void 0 ? false : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.closeOnSelect, closeOnSelect = _g === void 0 ? !multiple : _g, _h = _a.circularNavigation, circularNavigation = _h === void 0 ? false : _h, _j = _a.defaultOpen, defaultOpen = _j === void 0 ? false : _j, openProp = _a.open, name = _a.name, id = _a.id, selected = _a.selected, _k = _a.size, size = _k === void 0 ? 'm' : _k, _l = _a.optionsSize, optionsSize = _l === void 0 ? 'm' : _l, error = _a.error, hint = _a.hint, block = _a.block, label = _a.label, labelView = _a.labelView, placeholder = _a.placeholder, _m = _a.fieldProps, fieldProps = _m === void 0 ? {} : _m, _o = _a.optionProps, optionProps = _o === void 0 ? {} : _o, valueRenderer = _a.valueRenderer, onChange = _a.onChange, onOpen = _a.onOpen, onFocus = _a.onFocus, _p = _a.Arrow, Arrow$1 = _p === void 0 ? Arrow : _p, _q = _a.Field, Field$1 = _q === void 0 ? Field : _q, _r = _a.Optgroup, Optgroup$1 = _r === void 0 ? Optgroup : _r, _s = _a.Option, Option$1 = _s === void 0 ? Option : _s, _t = _a.OptionsList, OptionsList = _t === void 0 ? OptionsList$1 : _t, swipeable = _a.swipeable, footer = _a.footer, isBottomSheet = _a.isBottomSheet, bottomSheetProps = _a.bottomSheetProps, _u = _a.filterProps, _v = _u === void 0 ? {} : _u, filterFunction = _v.filterFunction, filterValue = _v.filterValue;
    var rootRef = useRef(null);
    var fieldRef = useRef(null);
    var listRef = useRef(null);
    var initiatorRef = useRef(null);
    var itemToString = function (option) { return (option ? option.key : ''); };
    var _w = useMemo(function () { return processOptions(options, selected); }, [options, selected]), flatOptions = _w.flatOptions, selectedOptions = _w.selectedOptions;
    var selectedOptionsRef = useRef(selectedOptions);
    var _x = useState(selectedOptions), selectedDraft = _x[0], setSelectedDraft = _x[1];
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
    var _y = useMultipleSelection(useMultipleSelectionProps), selectedItems = _y.selectedItems, addSelectedItem = _y.addSelectedItem, setSelectedItems = _y.setSelectedItems, removeSelectedItem = _y.removeSelectedItem, getDropdownProps = _y.getDropdownProps;
    var _z = useCombobox({
        id: id,
        isOpen: openProp,
        circularNavigation: circularNavigation,
        items: flatOptions,
        itemToString: itemToString,
        defaultHighlightedIndex: -1,
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
                case useCombobox.stateChangeTypes.InputBlur:
                    return state;
                case useCombobox.stateChangeTypes.InputKeyDownEnter:
                case useCombobox.stateChangeTypes.ItemClick:
                    initiatorRef.current = selectedItem;
                    if (selectedItem && !selectedItem.disabled) {
                        var alreadySelected = selectedItems.includes(selectedItem);
                        var allowRemove = allowUnselect || (multiple && selectedItems.length > 1);
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
                    return __assign(__assign({}, changes), { isOpen: !closeOnSelect || multiple, 
                        // при closeOnSelect === false - сохраняем подсвеченный индекс
                        highlightedIndex: state.isOpen && !closeOnSelect
                            ? state.highlightedIndex
                            : changes.highlightedIndex });
                default:
                    return changes;
            }
        },
    }), open = _z.isOpen, getMenuProps = _z.getMenuProps, getInputProps = _z.getInputProps, getItemProps = _z.getItemProps, getComboboxProps = _z.getComboboxProps, getLabelProps = _z.getLabelProps, highlightedIndex = _z.highlightedIndex, toggleMenu = _z.toggleMenu, openMenu = _z.openMenu;
    var menuProps = getMenuProps({ ref: listRef }, { suppressRefError: true });
    var inputProps = getInputProps(getDropdownProps({ ref: mergeRefs([ref, fieldRef]) }));
    useEffect(function () {
        setSelectedDraft(selectedOptions);
        setSelectedItems(selectedOptions);
        selectedOptionsRef.current = selectedOptions;
    }, [setSelectedItems, selectedOptions]);
    var handleFieldFocus = function (event) {
        if (onFocus)
            onFocus(event);
        if (autocomplete && !open) {
            openMenu();
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
    var getOptionProps = function (option, index) {
        var selectedItem = selectedItems.includes(option);
        return __assign(__assign({}, optionProps), { mobile: true, className: cn(styles.option, optionClassName), innerProps: getItemProps({
                index: index,
                item: option,
                disabled: option.disabled,
                onMouseDown: function (event) { return event.preventDefault(); },
            }), multiple: multiple, index: index, option: option, size: optionsSize, disabled: option.disabled, highlighted: index === highlightedIndex, selected: selectedItem, dataTestId: getDataTestId(dataTestId, 'option'), 
            // eslint-disable-next-line react/no-unstable-nested-components
            Checkmark: function () {
                return Option$1 === BaseOption ? (React.createElement(BaseCheckmark, { selected: selectedItem, multiple: multiple })) : (React.createElement(Checkmark, { selected: selectedItem }));
            } });
    };
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
    var renderValue = function () {
        return selectedItems.map(function (option) { return (React.createElement("input", { type: 'hidden', name: name, value: option.key, key: option.key })); });
    };
    var handleApply = function () {
        setSelectedDraft(selectedItems);
    };
    var handleClear = function () {
        setSelectedDraft([]);
        setSelectedItems([]);
    };
    var handleClose = function () {
        if (multiple) {
            setSelectedItems(selectedDraft);
        }
        toggleMenu();
    };
    var finalOptions = useMemo(function () {
        if (filterFunction) {
            return getFilteredOptions(options, filterValue || '', filterFunction);
        }
        return options;
    }, [filterFunction, filterValue, options]);
    return (React.createElement("div", __assign({}, getComboboxProps(__assign(__assign({ ref: rootRef }, (disabled && { 'aria-disabled': true })), { className: cn(styles.component, (_b = {}, _b[styles.block] = block, _b), className) })), { onKeyDown: disabled ? undefined : handleFieldKeyDown, tabIndex: -1, "data-test-id": getDataTestId(dataTestId) }),
        React.createElement(Field$1, __assign({ selectedMultiple: selectedDraft, selected: selectedItems[0], setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, multiple: multiple, open: open, disabled: disabled, size: size, placeholder: placeholder, label: label && React.createElement("span", __assign({}, getLabelProps()), label), labelView: labelView, Arrow: Arrow$1 && React.createElement(Arrow$1, { open: open }), error: error, hint: hint, valueRenderer: valueRenderer, className: fieldClassName, innerProps: {
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
            }, dataTestId: getDataTestId(dataTestId, 'field') }, fieldProps)),
        name && renderValue(),
        isBottomSheet ? (React.createElement(BottomSheet, __assign({ open: open, onClose: handleClose, className: styles.sheet, contentClassName: styles.sheetContent, containerClassName: styles.sheetContainer, title: placeholder, actionButton: footer, stickyHeader: true, hasCloser: true, swipeable: swipeable }, bottomSheetProps),
            React.createElement("div", __assign({}, menuProps, { className: optionsListClassName }),
                React.createElement(OptionsListWithApply, __assign({ showFooter: multiple }, optionsListProps, { flatOptions: flatOptions, highlightedIndex: highlightedIndex, size: size, options: finalOptions, OptionsList: OptionsList, Optgroup: Optgroup$1, Option: Option$1, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, dataTestId: getDataTestId(dataTestId, 'options-list'), optionGroupClassName: cn(styles.optionGroup, optionGroupClassName), onApply: handleApply, onClear: handleClear }))))) : (React.createElement(ModalMobile, { open: open, onClose: handleClose, contentClassName: styles.sheetContent, hasCloser: true },
            React.createElement(ModalMobile.Header, { hasCloser: true, title: placeholder, sticky: true }),
            React.createElement("div", __assign({}, menuProps, { className: optionsListClassName }),
                React.createElement(OptionsListWithApply, __assign({ showFooter: multiple }, optionsListProps, { flatOptions: flatOptions, highlightedIndex: highlightedIndex, size: size, options: finalOptions, OptionsList: OptionsList, Optgroup: Optgroup$1, Option: Option$1, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, dataTestId: getDataTestId(dataTestId, 'options-list'), optionGroupClassName: cn(styles.optionGroup, optionGroupClassName), onApply: handleApply, onClear: handleClear })))))));
});

var SelectMobile = forwardRef(function (_a, ref) {
    var _b = _a.autocomplete, autocomplete = _b === void 0 ? false : _b, _c = _a.multiple, multiple = _c === void 0 ? false : _c, _d = _a.allowUnselect, allowUnselect = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.closeOnSelect, closeOnSelect = _f === void 0 ? !multiple : _f, _g = _a.circularNavigation, circularNavigation = _g === void 0 ? false : _g, _h = _a.defaultOpen, defaultOpen = _h === void 0 ? false : _h, openProp = _a.open, _j = _a.size, size = _j === void 0 ? 'm' : _j, _k = _a.optionsSize, optionsSize = _k === void 0 ? 'm' : _k, _l = _a.fieldProps, fieldProps = _l === void 0 ? {} : _l, _m = _a.optionProps, optionProps = _m === void 0 ? {} : _m, _o = _a.Arrow, Arrow$1 = _o === void 0 ? Arrow : _o, _p = _a.Field, Field$1 = _p === void 0 ? Field : _p, _q = _a.Optgroup, Optgroup$1 = _q === void 0 ? Optgroup : _q, _r = _a.Option, Option$1 = _r === void 0 ? Option : _r, restProps = __rest(_a, ["autocomplete", "multiple", "allowUnselect", "disabled", "closeOnSelect", "circularNavigation", "defaultOpen", "open", "size", "optionsSize", "fieldProps", "optionProps", "Arrow", "Field", "Optgroup", "Option"]);
    return (React.createElement(BaseSelectMobile, __assign({ ref: ref, autocomplete: autocomplete, multiple: multiple, allowUnselect: allowUnselect, disabled: disabled, closeOnSelect: closeOnSelect, circularNavigation: circularNavigation, defaultOpen: defaultOpen, open: openProp, size: size, optionsSize: optionsSize, fieldProps: fieldProps, optionProps: optionProps, Arrow: Arrow$1, Field: Field$1, Optgroup: Optgroup$1, Option: Option$1, isBottomSheet: true }, restProps)));
});

var SelectModalMobile = forwardRef(function (_a, ref) {
    var _b = _a.autocomplete, autocomplete = _b === void 0 ? false : _b, _c = _a.multiple, multiple = _c === void 0 ? false : _c, _d = _a.allowUnselect, allowUnselect = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.closeOnSelect, closeOnSelect = _f === void 0 ? !multiple : _f, _g = _a.circularNavigation, circularNavigation = _g === void 0 ? false : _g, _h = _a.defaultOpen, defaultOpen = _h === void 0 ? false : _h, openProp = _a.open, _j = _a.size, size = _j === void 0 ? 'm' : _j, _k = _a.optionsSize, optionsSize = _k === void 0 ? 'm' : _k, _l = _a.fieldProps, fieldProps = _l === void 0 ? {} : _l, _m = _a.optionProps, optionProps = _m === void 0 ? {} : _m, _o = _a.Arrow, Arrow$1 = _o === void 0 ? Arrow : _o, _p = _a.Field, Field$1 = _p === void 0 ? Field : _p, _q = _a.Optgroup, Optgroup$1 = _q === void 0 ? Optgroup : _q, _r = _a.Option, Option$1 = _r === void 0 ? Option : _r, restProps = __rest(_a, ["autocomplete", "multiple", "allowUnselect", "disabled", "closeOnSelect", "circularNavigation", "defaultOpen", "open", "size", "optionsSize", "fieldProps", "optionProps", "Arrow", "Field", "Optgroup", "Option"]);
    return (React.createElement(BaseSelectMobile, __assign({ ref: ref, autocomplete: autocomplete, multiple: multiple, allowUnselect: allowUnselect, disabled: disabled, closeOnSelect: closeOnSelect, circularNavigation: circularNavigation, defaultOpen: defaultOpen, open: openProp, size: size, optionsSize: optionsSize, fieldProps: fieldProps, optionProps: optionProps, Arrow: Arrow$1, Field: Field$1, Optgroup: Optgroup$1, Option: Option$1, isBottomSheet: false }, restProps)));
});

export { BaseSelectMobile as B, OptionsListWithApply as O, SelectMobile as S, SelectModalMobile as a, SELECT_ALL_KEY as b, useSelectWithApply as u };
