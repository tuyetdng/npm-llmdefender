import React, { forwardRef, useRef, Fragment } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Loader } from '../../loader/esm';
import { useFocus } from '@alfalab/hooks';
import { useLoader } from './hooks.js';

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

var defaultColors = {"primary":"action-button__primary_1fonb","iconWrapper":"action-button__iconWrapper_1fonb","secondary":"action-button__secondary_1fonb"};
require('./default.css');

var styles = {"component":"action-button__component_14d6p","s":"action-button__s_14d6p","disabled":"action-button__disabled_14d6p","loading":"action-button__loading_14d6p","iconWrapper":"action-button__iconWrapper_14d6p","label":"action-button__label_14d6p","focused":"action-button__focused_14d6p"};
require('./index.css');

var invertedColors = {"primary":"action-button__primary_161fw","iconWrapper":"action-button__iconWrapper_161fw","secondary":"action-button__secondary_161fw"};
require('./inverted.css');

var staticColors = {"primary":"action-button__primary_1qm9y","iconWrapper":"action-button__iconWrapper_1qm9y","secondary":"action-button__secondary_1qm9y"};
require('./static.css');

var colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
    static: staticColors,
};
/**
 * Минимальное время отображения лоадера - 500мс,
 * чтобы при быстрых ответах от сервера кнопка не «моргала».
 */
var LOADER_MIN_DISPLAY_INTERVAL = 500;
var ActionButton = forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, icon = _a.icon, children = _a.children, href = _a.href, _c = _a.size, size = _c === void 0 ? 's' : _c, _d = _a.view, view = _d === void 0 ? 'primary' : _d, _e = _a.type, type = _e === void 0 ? 'button' : _e, iconWrapperClassName = _a.iconWrapperClassName, disabled = _a.disabled, loading = _a.loading, dataTestId = _a.dataTestId, _f = _a.colors, colors = _f === void 0 ? 'default' : _f, rest = __rest(_a, ["className", "icon", "children", "href", "size", "view", "type", "iconWrapperClassName", "disabled", "loading", "dataTestId", "colors"]);
    var componentRef = useRef(null);
    var focused = useFocus(componentRef, 'keyboard')[0];
    var showLoader = useLoader(!!loading, LOADER_MIN_DISPLAY_INTERVAL).showLoader;
    var componentProps = {
        className: cn(styles.component, colorStyles[colors][view], styles[size], (_b = {},
            _b[styles.focused] = focused,
            _b[styles.disabled] = disabled,
            _b[styles.loading] = showLoader,
            _b), className),
        'data-test-id': dataTestId,
    };
    var buttonChildren = (React.createElement(Fragment, null,
        React.createElement("span", { role: 'img', className: cn(styles.iconWrapper, colorStyles[colors].iconWrapper, styles[size], iconWrapperClassName) }, showLoader ? React.createElement(Loader, { dataTestId: 'loader' }) : icon),
        React.createElement("span", { className: styles.label }, children)));
    if (href) {
        return (React.createElement("a", __assign({ role: 'button', ref: mergeRefs([componentRef, ref]), href: href, "aria-disabled": disabled || loading }, componentProps, rest), buttonChildren));
    }
    return (React.createElement("button", __assign({ ref: mergeRefs([componentRef, ref]), 
        // eslint-disable-next-line react/button-has-type
        type: type, disabled: disabled || loading }, componentProps, rest), buttonChildren));
});

export { ActionButton };
