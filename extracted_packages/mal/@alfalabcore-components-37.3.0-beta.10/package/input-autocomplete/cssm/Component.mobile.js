var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var throttle = require('lodash.throttle');
var coreComponentsButton = require('../../button/cssm');
var coreComponentsInput = require('../../input/cssm');
var coreComponentsSelect = require('../../select/cssm');
var autocompleteMobileField_Component = require('./autocomplete-mobile-field/Component.js');
var styles = require('./mobile.module.css');
require('../../form-control/cssm');
require('@alfalab/hooks');
require('./autocomplete-mobile-field/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var throttle__default = /*#__PURE__*/_interopDefaultCompat(throttle);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var SELECTED = [];
var InputAutocompleteMobile = React__default.default.forwardRef(function (_a, ref) {
    var Input = _a.Input, _b = _a.bottomSheetProps, bottomSheetProps = _b === void 0 ? {} : _b, _c = _a.bottomSheetHeaderAddonsProps, bottomSheetHeaderAddonsProps = _c === void 0 ? {} : _c, _d = _a.value, value = _d === void 0 ? '' : _d, _e = _a.filter, filter = _e === void 0 ? '' : _e, name = _a.name, _f = _a.Arrow, Arrow = _f === void 0 ? null : _f, label = _a.label, placeholder = _a.placeholder, _g = _a.size, size = _g === void 0 ? 's' : _g, openProp = _a.open, onFilter = _a.onFilter, onChange = _a.onChange, onOpen = _a.onOpen, onCancel = _a.onCancel, onClearFilter = _a.onClearFilter, continueButtonProps = _a.continueButtonProps, cancelButtonProps = _a.cancelButtonProps, selected = _a.selected, multiple = _a.multiple, restProps = tslib_es6.__rest(_a, ["Input", "bottomSheetProps", "bottomSheetHeaderAddonsProps", "value", "filter", "name", "Arrow", "label", "placeholder", "size", "open", "onFilter", "onChange", "onOpen", "onCancel", "onClearFilter", "continueButtonProps", "cancelButtonProps", "selected", "multiple"]);
    var _h = React.useState(false), open = _h[0], setOpen = _h[1];
    var bottomSheetInputRef = React.useRef(null);
    var targetRef = React.useRef(null);
    var setBottomSheetVisibility = function (isOpen) {
        if (openProp === undefined) {
            setOpen(isOpen);
        }
        if (onOpen) {
            onOpen({ open: isOpen, name: name });
        }
    };
    var handleOpen = function (payload) {
        setBottomSheetVisibility(Boolean(payload.open));
    };
    var handleOptionsListTouchMove = React.useMemo(function () {
        return throttle__default.default(function () {
            var input = bottomSheetInputRef.current;
            if (input && document.activeElement === input) {
                input.blur();
            }
        }, 300);
    }, []);
    var handleApply = function () {
        setBottomSheetVisibility(false);
        onChange(filter);
    };
    var handleChange = function (payload) {
        onChange(payload);
        if (multiple) {
            // После выбора опции возвращаем фокус в поле ввода.
            requestAnimationFrame(function () { var _a; return (_a = bottomSheetInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); });
        }
    };
    var handleCancel = function () {
        setBottomSheetVisibility(false);
        if (onCancel) {
            onCancel();
        }
    };
    var handleInputFocus = function (event) {
        var input = bottomSheetInputRef.current;
        // Перед закрытием шторки снимаем фокус с инпута, чтобы предотвратить скачок шторки.
        if (event.relatedTarget === targetRef.current &&
            input &&
            input === document.activeElement) {
            input.blur();
        }
    };
    var getBottomSheetProps = function () {
        var Component = Input || coreComponentsInput.Input;
        return tslib_es6.__assign(tslib_es6.__assign({ actionButton: (React__default.default.createElement("div", { className: styles__default.default.footer },
                React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({ block: true, view: 'primary', size: 's', onClick: handleApply }, continueButtonProps), "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"),
                React__default.default.createElement(coreComponentsButton.Button, tslib_es6.__assign({ block: true, view: 'secondary', size: 's', onClick: handleCancel }, cancelButtonProps), "\u041E\u0442\u043C\u0435\u043D\u0430"))), title: label || placeholder, bottomAddons: (React__default.default.createElement(Component, tslib_es6.__assign({ block: true, clear: !!onClearFilter, onClear: onClearFilter, value: filter, onInput: onFilter, placeholder: placeholder, onFocus: handleInputFocus }, bottomSheetHeaderAddonsProps, { className: cn__default.default(styles__default.default.bottomSheetInput, bottomSheetHeaderAddonsProps.className), ref: mergeRefs__default.default([
                    bottomSheetInputRef,
                    bottomSheetHeaderAddonsProps.ref,
                ]) }))), initialHeight: 'full' }, bottomSheetProps), { containerProps: tslib_es6.__assign({ onTouchMove: handleOptionsListTouchMove }, bottomSheetProps.containerProps) });
    };
    return (React__default.default.createElement(coreComponentsSelect.SelectMobile, tslib_es6.__assign({ ref: mergeRefs__default.default([targetRef, ref]), selected: selected || SELECTED, open: Boolean(open || openProp), onOpen: handleOpen, onChange: handleChange, Arrow: Arrow, Field: autocompleteMobileField_Component.AutocompleteMobileField, fieldProps: { value: value }, placeholder: placeholder, label: label, size: size, name: name, multiple: multiple, bottomSheetProps: getBottomSheetProps(), optionsListProps: { showFooter: false } }, restProps)));
});

exports.InputAutocompleteMobile = InputAutocompleteMobile;
