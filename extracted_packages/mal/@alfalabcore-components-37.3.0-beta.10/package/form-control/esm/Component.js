import React from 'react';
import cn from 'classnames';

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

var defaultColors = {"component":"form-control__component_p1n34","inner":"form-control__inner_p1n34","label":"form-control__label_p1n34","hint":"form-control__hint_p1n34","disabled":"form-control__disabled_p1n34","hasError":"form-control__hasError_p1n34","filled":"form-control__filled_p1n34","focused":"form-control__focused_p1n34","error":"form-control__error_p1n34"};
require('./default.css');

var styles = {"component":"form-control__component_4trh7","inner":"form-control__inner_4trh7","inputWrapper":"form-control__inputWrapper_4trh7","input":"form-control__input_4trh7","label":"form-control__label_4trh7","labelInner":"form-control__labelInner_4trh7","addons":"form-control__addons_4trh7","leftAddons":"form-control__leftAddons_4trh7","rightAddons":"form-control__rightAddons_4trh7","sub":"form-control__sub_4trh7","above":"form-control__above_4trh7","block":"form-control__block_4trh7","s":"form-control__s_4trh7","hasInnerLabel":"form-control__hasInnerLabel_4trh7","m":"form-control__m_4trh7","l":"form-control__l_4trh7","xl":"form-control__xl_4trh7","hasLeftAddons":"form-control__hasLeftAddons_4trh7","hasRightAddons":"form-control__hasRightAddons_4trh7","disabled":"form-control__disabled_4trh7","focused":"form-control__focused_4trh7","hasError":"form-control__hasError_4trh7","filled":"form-control__filled_4trh7","hiddenLabel":"form-control__hiddenLabel_4trh7"};
require('./index.css');

var invertedColors = {"component":"form-control__component_1sors","inner":"form-control__inner_1sors","label":"form-control__label_1sors","hint":"form-control__hint_1sors","disabled":"form-control__disabled_1sors","hasError":"form-control__hasError_1sors","filled":"form-control__filled_1sors","focused":"form-control__focused_1sors","error":"form-control__error_1sors"};
require('./inverted.css');

var colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
var FormControl = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.block, block = _d === void 0 ? false : _d, _e = _a.size, size = _e === void 0 ? 's' : _e, _f = _a.colors, colors = _f === void 0 ? 'default' : _f, className = _a.className, fieldClassName = _a.fieldClassName, labelClassName = _a.labelClassName, addonsClassName = _a.addonsClassName, disabled = _a.disabled, readOnly = _a.readOnly, focused = _a.focused, filled = _a.filled, error = _a.error, hint = _a.hint, label = _a.label, _g = _a.labelView, labelView = _g === void 0 ? 'inner' : _g, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, bottomAddons = _a.bottomAddons, children = _a.children, dataTestId = _a.dataTestId, restProps = __rest(_a, ["block", "size", "colors", "className", "fieldClassName", "labelClassName", "addonsClassName", "disabled", "readOnly", "focused", "filled", "error", "hint", "label", "labelView", "leftAddons", "rightAddons", "bottomAddons", "children", "dataTestId"]);
    var errorMessage = typeof error === 'boolean' ? '' : error;
    return (React.createElement("div", { "data-test-id": dataTestId, className: cn(styles.component, colorStyles[colors].component, className, styles[size], (_b = {},
            _b[styles.block] = block,
            _b[styles.hasLeftAddons] = leftAddons,
            _b[styles.hasRightAddons] = rightAddons || error,
            _b)) },
        label && labelView === 'outer' && (React.createElement("span", { className: cn(styles.above, colorStyles[colors].label) }, label)),
        React.createElement("div", __assign({}, restProps, { className: cn(fieldClassName, styles.inner, colorStyles[colors].inner, (_c = {},
                _c[styles.disabled] = disabled || readOnly,
                _c[colorStyles[colors].disabled] = disabled || readOnly,
                _c[styles.filled] = filled,
                _c[colorStyles[colors].filled] = filled,
                _c[styles.hasInnerLabel] = label && labelView === 'inner',
                _c[styles.focused] = focused,
                _c[colorStyles[colors].focused] = focused,
                _c[styles.hasError] = error,
                _c[colorStyles[colors].hasError] = error,
                _c)), ref: ref }),
            leftAddons && (React.createElement("div", { className: cn(styles.addons, styles.leftAddons, addonsClassName) }, leftAddons)),
            React.createElement("div", { className: styles.inputWrapper },
                label && labelView === 'inner' && (React.createElement(React.Fragment, null,
                    React.createElement("span", { className: styles.hiddenLabel, "aria-hidden": true }, label),
                    React.createElement("div", { className: cn(styles.label, colorStyles[colors].label, labelClassName) },
                        React.createElement("span", { className: styles.labelInner }, label)))),
                React.createElement("div", { className: styles.input }, children)),
            rightAddons && (React.createElement("div", { className: cn(styles.addons, styles.rightAddons, addonsClassName) }, rightAddons))),
        bottomAddons,
        errorMessage && (React.createElement("span", { className: cn(styles.sub, styles.error, colorStyles[colors].error), role: 'alert' }, errorMessage)),
        hint && !errorMessage && (React.createElement("span", { className: cn(styles.sub, colorStyles[colors].hint) }, hint))));
});

export { FormControl };
