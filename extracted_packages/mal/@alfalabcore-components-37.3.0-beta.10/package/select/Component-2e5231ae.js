var tslib_es6 = require('./tslib.es6-febad92e.js');
var React = require('react');
var components_arrow_Component = require('./components/arrow/Component.js');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var downshift = require('downshift');
var coreComponentsBottomSheet = require('../bottom-sheet');
var mobile = require('../modal/mobile');
require('./Component.js');
var components_baseSelect_Component = require('./Component-f670e03e.js');
var components_field_Component = require('./components/field/Component.js');
var components_optgroup_Component = require('./components/optgroup/Component.js');
var components_option_Component = require('./components/option/Component.js');
var components_optionsList_Component = require('./components/options-list/Component.js');
require('react-virtual');
require('../scrollbar');
require('@alfalab/hooks');
var utils = require('./utils.js');
var components_baseOption_Component = require('./components/base-option/Component.js');
require('../skeleton');
require('./intersection-observer-0f86c9db.js');
var coreComponentsButton = require('../button');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('../form-control');
require('../badge');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('../checkbox');
var components_baseCheckmark_Component = require('./components/base-checkmark/Component.js');
var components_baseSelectMobile_checkmark_Component = require('./components/base-select-mobile/checkmark/Component.js');
var components_baseSelectMobile_optionsList_Component = require('./components/base-select-mobile/options-list/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles$1 = {"footer":"select__footer_ir798","withBorder":"select__withBorder_ir798"};
require('./presets/useSelectWithApply/options-list-with-apply/index.css');

var OptionsListWithApply = React.forwardRef(function (_a, ref) {
    var _b;
    var toggleMenu = _a.toggleMenu, _c = _a.OptionsList, OptionsList = _c === void 0 ? components_optionsList_Component.OptionsList : _c, defaultGetOptionProps = _a.getOptionProps, _d = _a.showClear, showClear = _d === void 0 ? true : _d, _e = _a.selectedDraft, selectedDraft = _e === void 0 ? [] : _e, _f = _a.flatOptions, flatOptions = _f === void 0 ? [] : _f, _g = _a.onApply, onApply = _g === void 0 ? function () { return null; } : _g, _h = _a.onClear, onClear = _h === void 0 ? function () { return null; } : _h, _j = _a.onClose, onClose = _j === void 0 ? function () { return null; } : _j, _k = _a.visibleOptions, visibleOptions = _k === void 0 ? 5 : _k, restProps = tslib_es6.__rest(_a, ["toggleMenu", "OptionsList", "getOptionProps", "showClear", "selectedDraft", "flatOptions", "onApply", "onClear", "onClose", "visibleOptions"]);
    var footerRef = React.useRef(null);
    var getOptionProps = React.useCallback(function (option, index) {
        var optionProps = defaultGetOptionProps(option, index);
        var selected = option.key === SELECT_ALL_KEY
            ? selectedDraft.length === flatOptions.length - 1
            : selectedDraft.includes(option);
        return tslib_es6.__assign(tslib_es6.__assign({}, optionProps), { selected: selected });
    }, [defaultGetOptionProps, flatOptions.length, selectedDraft]);
    var handleApply = React.useCallback(function () {
        onApply();
        toggleMenu();
    }, [onApply, toggleMenu]);
    var handleClear = React.useCallback(function () {
        onClear();
        toggleMenu();
    }, [onClear, toggleMenu]);
    React.useEffect(function () {
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
    return (React__default.default.createElement(OptionsList, tslib_es6.__assign({}, restProps, { ref: ref, visibleOptions: visibleOptions, toggleMenu: toggleMenu, flatOptions: flatOptions, getOptionProps: getOptionProps, onApply: handleApply, onClear: handleClear, footer: React__default.default.createElement("div", { 
            // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex: 0, className: cn__default.default(styles$1.footer, (_b = {},
                _b[styles$1.withBorder] = visibleOptions && flatOptions.length > visibleOptions,
                _b)), ref: footerRef },
            React__default.default.createElement(coreComponentsButton.Button, { size: 'xxs', view: 'primary', onClick: handleApply }, "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"),
            showClear && (React__default.default.createElement(coreComponentsButton.Button, { size: 'xxs', view: 'secondary', onClick: handleClear }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C"))) })));
});

var SELECT_ALL_KEY = 'select_all';
var selectAllOption = { key: SELECT_ALL_KEY, content: 'Выбрать все' };
function useSelectWithApply(_a) {
    var options = _a.options, selected = _a.selected, _b = _a.onChange, onChange = _b === void 0 ? function () { return null; } : _b, OptionsList = _a.OptionsList, _c = _a.showClear, showClear = _c === void 0 ? true : _c, _d = _a.showSelectAll, showSelectAll = _d === void 0 ? false : _d;
    var _e = React.useMemo(function () { return utils.processOptions(options, selected); }, [options, selected]), flatOptions = _e.flatOptions, selectedOptions = _e.selectedOptions;
    var _f = React.useState(selectedOptions), selectedDraft = _f[0], setSelectedDraft = _f[1];
    var selectedOptionsRef = React.useRef(selectedOptions);
    var handleApply = React.useCallback(function () {
        onChange({
            selected: selectedDraft[0],
            selectedMultiple: selectedDraft,
            initiator: null,
        });
    }, [onChange, selectedDraft]);
    var handleClear = React.useCallback(function () {
        setSelectedDraft([]);
        onChange({
            selected: null,
            selectedMultiple: [],
            initiator: null,
        });
    }, [onChange]);
    var handleChange = React.useCallback(function (_a) {
        var initiator = _a.initiator, restArgs = tslib_es6.__rest(_a, ["initiator"]);
        if (!initiator) {
            onChange(tslib_es6.__assign({ initiator: null }, restArgs));
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
    var handleClose = React.useCallback(function () {
        setSelectedDraft(selectedOptionsRef.current);
    }, []);
    React.useEffect(function () {
        setSelectedDraft(selectedOptions);
        selectedOptionsRef.current = selectedOptions;
    }, [selectedOptions]);
    var memoizedOptions = React.useMemo(function () { return (showSelectAll ? tslib_es6.__spreadArray([selectAllOption], options, true) : options); }, [options, showSelectAll]);
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

var BaseSelectMobile = React.forwardRef(function (_a, ref) {
    var _b;
    var dataTestId = _a.dataTestId, className = _a.className, fieldClassName = _a.fieldClassName, optionsListClassName = _a.optionsListClassName, optionClassName = _a.optionClassName, optionGroupClassName = _a.optionGroupClassName, optionsListProps = _a.optionsListProps, options = _a.options, _c = _a.autocomplete, autocomplete = _c === void 0 ? false : _c, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.allowUnselect, allowUnselect = _e === void 0 ? false : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.closeOnSelect, closeOnSelect = _g === void 0 ? !multiple : _g, _h = _a.circularNavigation, circularNavigation = _h === void 0 ? false : _h, _j = _a.defaultOpen, defaultOpen = _j === void 0 ? false : _j, openProp = _a.open, name = _a.name, id = _a.id, selected = _a.selected, _k = _a.size, size = _k === void 0 ? 'm' : _k, _l = _a.optionsSize, optionsSize = _l === void 0 ? 'm' : _l, error = _a.error, hint = _a.hint, block = _a.block, label = _a.label, labelView = _a.labelView, placeholder = _a.placeholder, _m = _a.fieldProps, fieldProps = _m === void 0 ? {} : _m, _o = _a.optionProps, optionProps = _o === void 0 ? {} : _o, valueRenderer = _a.valueRenderer, onChange = _a.onChange, onOpen = _a.onOpen, onFocus = _a.onFocus, _p = _a.Arrow, Arrow = _p === void 0 ? components_arrow_Component.Arrow : _p, _q = _a.Field, Field = _q === void 0 ? components_field_Component.Field : _q, _r = _a.Optgroup, Optgroup = _r === void 0 ? components_optgroup_Component.Optgroup : _r, _s = _a.Option, Option = _s === void 0 ? components_option_Component.Option : _s, _t = _a.OptionsList, OptionsList = _t === void 0 ? components_baseSelectMobile_optionsList_Component.OptionsList : _t, swipeable = _a.swipeable, footer = _a.footer, isBottomSheet = _a.isBottomSheet, bottomSheetProps = _a.bottomSheetProps, _u = _a.filterProps, _v = _u === void 0 ? {} : _u, filterFunction = _v.filterFunction, filterValue = _v.filterValue;
    var rootRef = React.useRef(null);
    var fieldRef = React.useRef(null);
    var listRef = React.useRef(null);
    var initiatorRef = React.useRef(null);
    var itemToString = function (option) { return (option ? option.key : ''); };
    var _w = React.useMemo(function () { return utils.processOptions(options, selected); }, [options, selected]), flatOptions = _w.flatOptions, selectedOptions = _w.selectedOptions;
    var selectedOptionsRef = React.useRef(selectedOptions);
    var _x = React.useState(selectedOptions), selectedDraft = _x[0], setSelectedDraft = _x[1];
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
                type === downshift.useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace) {
                return state;
            }
            return changes;
        },
    };
    if (selected !== undefined) {
        useMultipleSelectionProps.selectedItems = selectedOptions;
    }
    var _y = downshift.useMultipleSelection(useMultipleSelectionProps), selectedItems = _y.selectedItems, addSelectedItem = _y.addSelectedItem, setSelectedItems = _y.setSelectedItems, removeSelectedItem = _y.removeSelectedItem, getDropdownProps = _y.getDropdownProps;
    var _z = downshift.useCombobox({
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
                case downshift.useCombobox.stateChangeTypes.InputBlur:
                    return state;
                case downshift.useCombobox.stateChangeTypes.InputKeyDownEnter:
                case downshift.useCombobox.stateChangeTypes.ItemClick:
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
                    return tslib_es6.__assign(tslib_es6.__assign({}, changes), { isOpen: !closeOnSelect || multiple, 
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
    var inputProps = getInputProps(getDropdownProps({ ref: mergeRefs__default.default([ref, fieldRef]) }));
    React.useEffect(function () {
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
        return tslib_es6.__assign(tslib_es6.__assign({}, optionProps), { mobile: true, className: cn__default.default(styles.option, optionClassName), innerProps: getItemProps({
                index: index,
                item: option,
                disabled: option.disabled,
                onMouseDown: function (event) { return event.preventDefault(); },
            }), multiple: multiple, index: index, option: option, size: optionsSize, disabled: option.disabled, highlighted: index === highlightedIndex, selected: selectedItem, dataTestId: components_baseSelect_Component.getDataTestId(dataTestId, 'option'), 
            // eslint-disable-next-line react/no-unstable-nested-components
            Checkmark: function () {
                return Option === components_baseOption_Component.BaseOption ? (React__default.default.createElement(components_baseCheckmark_Component.BaseCheckmark, { selected: selectedItem, multiple: multiple })) : (React__default.default.createElement(components_baseSelectMobile_checkmark_Component.Checkmark, { selected: selectedItem }));
            } });
    };
    React.useEffect(function () {
        if (defaultOpen)
            openMenu();
    }, [defaultOpen, openMenu]);
    React.useEffect(function () {
        if (openProp) {
            openMenu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var renderValue = function () {
        return selectedItems.map(function (option) { return (React__default.default.createElement("input", { type: 'hidden', name: name, value: option.key, key: option.key })); });
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
    var finalOptions = React.useMemo(function () {
        if (filterFunction) {
            return utils.getFilteredOptions(options, filterValue || '', filterFunction);
        }
        return options;
    }, [filterFunction, filterValue, options]);
    return (React__default.default.createElement("div", tslib_es6.__assign({}, getComboboxProps(tslib_es6.__assign(tslib_es6.__assign({ ref: rootRef }, (disabled && { 'aria-disabled': true })), { className: cn__default.default(styles.component, (_b = {}, _b[styles.block] = block, _b), className) })), { onKeyDown: disabled ? undefined : handleFieldKeyDown, tabIndex: -1, "data-test-id": components_baseSelect_Component.getDataTestId(dataTestId) }),
        React__default.default.createElement(Field, tslib_es6.__assign({ selectedMultiple: selectedDraft, selected: selectedItems[0], setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, multiple: multiple, open: open, disabled: disabled, size: size, placeholder: placeholder, label: label && React__default.default.createElement("span", tslib_es6.__assign({}, getLabelProps()), label), labelView: labelView, Arrow: Arrow && React__default.default.createElement(Arrow, { open: open }), error: error, hint: hint, valueRenderer: valueRenderer, className: fieldClassName, innerProps: {
                onFocus: disabled ? undefined : handleFieldFocus,
                onClick: disabled ? undefined : handleFieldClick,
                tabIndex: disabled ? -1 : 0,
                ref: mergeRefs__default.default([inputProps.ref]),
                id: inputProps.id,
                'aria-labelledby': inputProps['aria-labelledby'],
                'aria-controls': inputProps['aria-controls'],
                'aria-autocomplete': autocomplete
                    ? inputProps['aria-autocomplete']
                    : undefined,
            }, dataTestId: components_baseSelect_Component.getDataTestId(dataTestId, 'field') }, fieldProps)),
        name && renderValue(),
        isBottomSheet ? (React__default.default.createElement(coreComponentsBottomSheet.BottomSheet, tslib_es6.__assign({ open: open, onClose: handleClose, className: styles.sheet, contentClassName: styles.sheetContent, containerClassName: styles.sheetContainer, title: placeholder, actionButton: footer, stickyHeader: true, hasCloser: true, swipeable: swipeable }, bottomSheetProps),
            React__default.default.createElement("div", tslib_es6.__assign({}, menuProps, { className: optionsListClassName }),
                React__default.default.createElement(OptionsListWithApply, tslib_es6.__assign({ showFooter: multiple }, optionsListProps, { flatOptions: flatOptions, highlightedIndex: highlightedIndex, size: size, options: finalOptions, OptionsList: OptionsList, Optgroup: Optgroup, Option: Option, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, dataTestId: components_baseSelect_Component.getDataTestId(dataTestId, 'options-list'), optionGroupClassName: cn__default.default(styles.optionGroup, optionGroupClassName), onApply: handleApply, onClear: handleClear }))))) : (React__default.default.createElement(mobile.ModalMobile, { open: open, onClose: handleClose, contentClassName: styles.sheetContent, hasCloser: true },
            React__default.default.createElement(mobile.ModalMobile.Header, { hasCloser: true, title: placeholder, sticky: true }),
            React__default.default.createElement("div", tslib_es6.__assign({}, menuProps, { className: optionsListClassName }),
                React__default.default.createElement(OptionsListWithApply, tslib_es6.__assign({ showFooter: multiple }, optionsListProps, { flatOptions: flatOptions, highlightedIndex: highlightedIndex, size: size, options: finalOptions, OptionsList: OptionsList, Optgroup: Optgroup, Option: Option, selectedItems: selectedItems, setSelectedItems: setSelectedItems, toggleMenu: toggleMenu, getOptionProps: getOptionProps, dataTestId: components_baseSelect_Component.getDataTestId(dataTestId, 'options-list'), optionGroupClassName: cn__default.default(styles.optionGroup, optionGroupClassName), onApply: handleApply, onClear: handleClear })))))));
});

var SelectMobile = React.forwardRef(function (_a, ref) {
    var _b = _a.autocomplete, autocomplete = _b === void 0 ? false : _b, _c = _a.multiple, multiple = _c === void 0 ? false : _c, _d = _a.allowUnselect, allowUnselect = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.closeOnSelect, closeOnSelect = _f === void 0 ? !multiple : _f, _g = _a.circularNavigation, circularNavigation = _g === void 0 ? false : _g, _h = _a.defaultOpen, defaultOpen = _h === void 0 ? false : _h, openProp = _a.open, _j = _a.size, size = _j === void 0 ? 'm' : _j, _k = _a.optionsSize, optionsSize = _k === void 0 ? 'm' : _k, _l = _a.fieldProps, fieldProps = _l === void 0 ? {} : _l, _m = _a.optionProps, optionProps = _m === void 0 ? {} : _m, _o = _a.Arrow, Arrow = _o === void 0 ? components_arrow_Component.Arrow : _o, _p = _a.Field, Field = _p === void 0 ? components_field_Component.Field : _p, _q = _a.Optgroup, Optgroup = _q === void 0 ? components_optgroup_Component.Optgroup : _q, _r = _a.Option, Option = _r === void 0 ? components_option_Component.Option : _r, restProps = tslib_es6.__rest(_a, ["autocomplete", "multiple", "allowUnselect", "disabled", "closeOnSelect", "circularNavigation", "defaultOpen", "open", "size", "optionsSize", "fieldProps", "optionProps", "Arrow", "Field", "Optgroup", "Option"]);
    return (React__default.default.createElement(BaseSelectMobile, tslib_es6.__assign({ ref: ref, autocomplete: autocomplete, multiple: multiple, allowUnselect: allowUnselect, disabled: disabled, closeOnSelect: closeOnSelect, circularNavigation: circularNavigation, defaultOpen: defaultOpen, open: openProp, size: size, optionsSize: optionsSize, fieldProps: fieldProps, optionProps: optionProps, Arrow: Arrow, Field: Field, Optgroup: Optgroup, Option: Option, isBottomSheet: true }, restProps)));
});

var SelectModalMobile = React.forwardRef(function (_a, ref) {
    var _b = _a.autocomplete, autocomplete = _b === void 0 ? false : _b, _c = _a.multiple, multiple = _c === void 0 ? false : _c, _d = _a.allowUnselect, allowUnselect = _d === void 0 ? false : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.closeOnSelect, closeOnSelect = _f === void 0 ? !multiple : _f, _g = _a.circularNavigation, circularNavigation = _g === void 0 ? false : _g, _h = _a.defaultOpen, defaultOpen = _h === void 0 ? false : _h, openProp = _a.open, _j = _a.size, size = _j === void 0 ? 'm' : _j, _k = _a.optionsSize, optionsSize = _k === void 0 ? 'm' : _k, _l = _a.fieldProps, fieldProps = _l === void 0 ? {} : _l, _m = _a.optionProps, optionProps = _m === void 0 ? {} : _m, _o = _a.Arrow, Arrow = _o === void 0 ? components_arrow_Component.Arrow : _o, _p = _a.Field, Field = _p === void 0 ? components_field_Component.Field : _p, _q = _a.Optgroup, Optgroup = _q === void 0 ? components_optgroup_Component.Optgroup : _q, _r = _a.Option, Option = _r === void 0 ? components_option_Component.Option : _r, restProps = tslib_es6.__rest(_a, ["autocomplete", "multiple", "allowUnselect", "disabled", "closeOnSelect", "circularNavigation", "defaultOpen", "open", "size", "optionsSize", "fieldProps", "optionProps", "Arrow", "Field", "Optgroup", "Option"]);
    return (React__default.default.createElement(BaseSelectMobile, tslib_es6.__assign({ ref: ref, autocomplete: autocomplete, multiple: multiple, allowUnselect: allowUnselect, disabled: disabled, closeOnSelect: closeOnSelect, circularNavigation: circularNavigation, defaultOpen: defaultOpen, open: openProp, size: size, optionsSize: optionsSize, fieldProps: fieldProps, optionProps: optionProps, Arrow: Arrow, Field: Field, Optgroup: Optgroup, Option: Option, isBottomSheet: false }, restProps)));
});

exports.BaseSelectMobile = BaseSelectMobile;
exports.OptionsListWithApply = OptionsListWithApply;
exports.SELECT_ALL_KEY = SELECT_ALL_KEY;
exports.SelectMobile = SelectMobile;
exports.SelectModalMobile = SelectModalMobile;
exports.useSelectWithApply = useSelectWithApply;
