import React, { useRef, useState, useCallback, Fragment } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Button } from '../../button/esm';
import { FormControl } from '../../form-control/esm';
import { Badge } from '../../badge/esm';
import { useFocus } from '@alfalab/hooks';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ExclamationCircleMIcon } from '@alfalab/icons-glyph/ExclamationCircleMIcon';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var defaultColors = {"input":"input__input_135z1","hasInnerLabel":"input__hasInnerLabel_135z1","clearIcon":"input__clearIcon_135z1","error":"input__error_135z1"};
require('./default.css');

var styles = {"input":"input__input_1r9af","hasInnerLabel":"input__hasInnerLabel_1r9af","s":"input__s_1r9af","m":"input__m_1r9af","l":"input__l_1r9af","xl":"input__xl_1r9af","block":"input__block_1r9af","clearIcon":"input__clearIcon_1r9af","errorIcon":"input__errorIcon_1r9af","errorColorIcon":"input__errorColorIcon_1r9af","clearButton":"input__clearButton_1r9af","successIcon":"input__successIcon_1r9af","successColorIcon":"input__successColorIcon_1r9af","focusVisible":"input__focusVisible_1r9af","onautofillstart":"input__onautofillstart_1r9af","onautofillcancel":"input__onautofillcancel_1r9af"};
require('./index.css');

var invertedColors = {"input":"input__input_qzceo","hasInnerLabel":"input__hasInnerLabel_qzceo","clearIcon":"input__clearIcon_qzceo","error":"input__error_qzceo"};
require('./inverted.css');

var colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
var Input = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.size, size = _d === void 0 ? 's' : _d, _e = _a.type, type = _e === void 0 ? 'text' : _e, _f = _a.block, block = _f === void 0 ? false : _f, _g = _a.colors, colors = _g === void 0 ? 'default' : _g, bottomAddons = _a.bottomAddons, dataTestId = _a.dataTestId, _h = _a.clear, clear = _h === void 0 ? false : _h, disabled = _a.disabled, error = _a.error, success = _a.success, hint = _a.hint, className = _a.className, fieldClassName = _a.fieldClassName, inputClassName = _a.inputClassName, labelClassName = _a.labelClassName, addonsClassName = _a.addonsClassName, focusedClassName = _a.focusedClassName, filledClassName = _a.filledClassName, label = _a.label, _j = _a.labelView, labelView = _j === void 0 ? 'inner' : _j, leftAddons = _a.leftAddons, onFocus = _a.onFocus, onBlur = _a.onBlur, onChange = _a.onChange, onClear = _a.onClear, onClick = _a.onClick, onMouseDown = _a.onMouseDown, onMouseUp = _a.onMouseUp, onAnimationStart = _a.onAnimationStart, rightAddons = _a.rightAddons, value = _a.value, defaultValue = _a.defaultValue, wrapperRef = _a.wrapperRef, readOnly = _a.readOnly, restProps = __rest(_a, ["size", "type", "block", "colors", "bottomAddons", "dataTestId", "clear", "disabled", "error", "success", "hint", "className", "fieldClassName", "inputClassName", "labelClassName", "addonsClassName", "focusedClassName", "filledClassName", "label", "labelView", "leftAddons", "onFocus", "onBlur", "onChange", "onClear", "onClick", "onMouseDown", "onMouseUp", "onAnimationStart", "rightAddons", "value", "defaultValue", "wrapperRef", "readOnly"]);
    var uncontrolled = value === undefined;
    var inputRef = useRef(null);
    var focusVisible = useFocus(inputRef, 'keyboard')[0];
    var _k = useState(restProps.autoFocus), focused = _k[0], setFocused = _k[1];
    var _l = useState(defaultValue || ''), stateValue = _l[0], setStateValue = _l[1];
    var filled = Boolean(uncontrolled ? stateValue : value);
    var _m = useState(false), autofilled = _m[0], setAutofilled = _m[1];
    // отображаем крестик только для заполненного и активного инпута
    var clearButtonVisible = clear && filled && !disabled && !readOnly;
    var hasInnerLabel = label && labelView === 'inner';
    var handleInputFocus = useCallback(function (event) {
        if (!readOnly) {
            setFocused(true);
        }
        if (onFocus) {
            onFocus(event);
        }
    }, [onFocus, readOnly]);
    var handleInputBlur = useCallback(function (event) {
        setFocused(false);
        if (onBlur) {
            onBlur(event);
        }
    }, [onBlur]);
    var handleInputChange = useCallback(function (event) {
        if (onChange) {
            onChange(event, { value: event.target.value });
        }
        if (uncontrolled) {
            setStateValue(event.target.value);
        }
    }, [onChange, uncontrolled]);
    var handleClear = useCallback(function (event) {
        if (!clearButtonVisible)
            return;
        if (uncontrolled) {
            setStateValue('');
        }
        if (onClear) {
            onClear(event);
        }
        if (inputRef.current && !focused) {
            inputRef.current.focus();
        }
    }, [clearButtonVisible, focused, onClear, uncontrolled]);
    var handleAnimationStart = useCallback(function (event) {
        if (onAnimationStart) {
            onAnimationStart(event);
        }
        setAutofilled(event.animationName.includes('start'));
    }, [onAnimationStart]);
    var renderRightAddons = function () {
        var addonsVisible = clearButtonVisible || rightAddons || error || success;
        return (addonsVisible && (React.createElement(Fragment, null,
            clearButtonVisible && (React.createElement(Button, { type: 'button', view: 'ghost', disabled: disabled, "aria-label": '\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C', className: styles.clearButton, onClick: handleClear, tabIndex: -1 },
                React.createElement(CrossCircleMIcon, { className: cn(styles.clearIcon, colorStyles[colors].clearIcon) }))),
            rightAddons,
            error && (React.createElement("div", { className: styles.errorIcon },
                React.createElement(Badge, { view: 'icon', size: 'm', iconColor: 'negative', content: React.createElement(ExclamationCircleMIcon, { className: styles.errorColorIcon }) }))),
            success && !error && (React.createElement("div", { className: styles.successIcon },
                React.createElement(Badge, { view: 'icon', size: 'm', iconColor: 'positive', content: React.createElement(CheckmarkCircleMIcon, { className: styles.successColorIcon }) }))))));
    };
    return (React.createElement(FormControl, { ref: wrapperRef, className: cn(className, focused && focusedClassName, filled && filledClassName), fieldClassName: cn(fieldClassName, (_b = {},
            _b[styles.focusVisible] = focusVisible,
            _b)), labelClassName: labelClassName, addonsClassName: addonsClassName, size: size, colors: colors, block: block, disabled: disabled, readOnly: readOnly, filled: filled || autofilled || focused, focused: focused, error: error, label: label, labelView: labelView, hint: hint, leftAddons: leftAddons, rightAddons: renderRightAddons(), bottomAddons: bottomAddons, onClick: onClick, onMouseDown: onMouseDown, onMouseUp: onMouseUp },
        React.createElement("input", __assign({}, restProps, { className: cn(styles.input, colorStyles[colors].input, (_c = {},
                _c[styles.error] = error,
                _c[colorStyles[colors].error] = error,
                _c[styles[size]] = hasInnerLabel,
                _c[styles.hasInnerLabel] = hasInnerLabel,
                _c[colorStyles[colors].hasInnerLabel] = hasInnerLabel,
                _c), inputClassName), disabled: disabled, onBlur: handleInputBlur, onFocus: handleInputFocus, onChange: handleInputChange, onAnimationStart: handleAnimationStart, ref: mergeRefs([ref, inputRef]), type: type, value: uncontrolled ? stateValue : value, readOnly: readOnly, "data-test-id": dataTestId, "aria-label": typeof label === 'string' ? label : undefined }))));
});
/**
 * Для отображения в сторибуке
 */
Input.defaultProps = {
    size: 's',
    type: 'text',
    block: false,
};

export { Input };
