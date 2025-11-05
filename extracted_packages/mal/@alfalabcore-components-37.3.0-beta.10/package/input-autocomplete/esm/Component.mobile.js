import { _ as __rest, a as __assign } from './tslib.es6-c603502c.js';
import React, { useState, useRef, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import { Button } from '../../button/esm';
import { Input } from '../../input/esm';
import { SelectMobile } from '../../select/esm';
import { AutocompleteMobileField } from './autocomplete-mobile-field/Component.js';
import '../../form-control/esm';
import '@alfalab/hooks';

var styles = {"bottomSheetInput":"input-autocomplete__bottomSheetInput_30lcl","footer":"input-autocomplete__footer_30lcl"};
require('./mobile.css');

var SELECTED = [];
var InputAutocompleteMobile = React.forwardRef(function (_a, ref) {
    var Input$1 = _a.Input, _b = _a.bottomSheetProps, bottomSheetProps = _b === void 0 ? {} : _b, _c = _a.bottomSheetHeaderAddonsProps, bottomSheetHeaderAddonsProps = _c === void 0 ? {} : _c, _d = _a.value, value = _d === void 0 ? '' : _d, _e = _a.filter, filter = _e === void 0 ? '' : _e, name = _a.name, _f = _a.Arrow, Arrow = _f === void 0 ? null : _f, label = _a.label, placeholder = _a.placeholder, _g = _a.size, size = _g === void 0 ? 's' : _g, openProp = _a.open, onFilter = _a.onFilter, onChange = _a.onChange, onOpen = _a.onOpen, onCancel = _a.onCancel, onClearFilter = _a.onClearFilter, continueButtonProps = _a.continueButtonProps, cancelButtonProps = _a.cancelButtonProps, selected = _a.selected, multiple = _a.multiple, restProps = __rest(_a, ["Input", "bottomSheetProps", "bottomSheetHeaderAddonsProps", "value", "filter", "name", "Arrow", "label", "placeholder", "size", "open", "onFilter", "onChange", "onOpen", "onCancel", "onClearFilter", "continueButtonProps", "cancelButtonProps", "selected", "multiple"]);
    var _h = useState(false), open = _h[0], setOpen = _h[1];
    var bottomSheetInputRef = useRef(null);
    var targetRef = useRef(null);
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
    var handleOptionsListTouchMove = useMemo(function () {
        return throttle(function () {
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
        var Component = Input$1 || Input;
        return __assign(__assign({ actionButton: (React.createElement("div", { className: styles.footer },
                React.createElement(Button, __assign({ block: true, view: 'primary', size: 's', onClick: handleApply }, continueButtonProps), "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"),
                React.createElement(Button, __assign({ block: true, view: 'secondary', size: 's', onClick: handleCancel }, cancelButtonProps), "\u041E\u0442\u043C\u0435\u043D\u0430"))), title: label || placeholder, bottomAddons: (React.createElement(Component, __assign({ block: true, clear: !!onClearFilter, onClear: onClearFilter, value: filter, onInput: onFilter, placeholder: placeholder, onFocus: handleInputFocus }, bottomSheetHeaderAddonsProps, { className: cn(styles.bottomSheetInput, bottomSheetHeaderAddonsProps.className), ref: mergeRefs([
                    bottomSheetInputRef,
                    bottomSheetHeaderAddonsProps.ref,
                ]) }))), initialHeight: 'full' }, bottomSheetProps), { containerProps: __assign({ onTouchMove: handleOptionsListTouchMove }, bottomSheetProps.containerProps) });
    };
    return (React.createElement(SelectMobile, __assign({ ref: mergeRefs([targetRef, ref]), selected: selected || SELECTED, open: Boolean(open || openProp), onOpen: handleOpen, onChange: handleChange, Arrow: Arrow, Field: AutocompleteMobileField, fieldProps: { value: value }, placeholder: placeholder, label: label, size: size, name: name, multiple: multiple, bottomSheetProps: getBottomSheetProps(), optionsListProps: { showFooter: false } }, restProps)));
});

export { InputAutocompleteMobile };
