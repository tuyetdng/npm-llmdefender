import React, { forwardRef, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';

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

var defaultColors = {"component":"tag__component_18740","checked":"tag__checked_18740"};
require('./default.css');

var styles = {"component":"tag__component_13dwt","focused":"tag__focused_13dwt","addons":"tag__addons_13dwt","s":"tag__s_13dwt","m":"tag__m_13dwt","l":"tag__l_13dwt","xl":"tag__xl_13dwt","xxs":"tag__xxs_13dwt","xs":"tag__xs_13dwt","withRightAddons":"tag__withRightAddons_13dwt","withLeftAddons":"tag__withLeftAddons_13dwt","defaultVariant":"tag__defaultVariant_13dwt","alt":"tag__alt_13dwt"};
require('./index.css');

var invertedColors = {"component":"tag__component_v9s7a","checked":"tag__checked_v9s7a"};
require('./inverted.css');

var colorStylesMap = {
    default: defaultColors,
    inverted: invertedColors,
};
var Tag = forwardRef(function (_a, ref) {
    var _b;
    var rightAddons = _a.rightAddons, leftAddons = _a.leftAddons, children = _a.children, _c = _a.size, size = _c === void 0 ? 's' : _c, checked = _a.checked, className = _a.className, dataTestId = _a.dataTestId, name = _a.name, _d = _a.colors, colors = _d === void 0 ? 'default' : _d, onClick = _a.onClick, _e = _a.variant, variant = _e === void 0 ? 'default' : _e, restProps = __rest(_a, ["rightAddons", "leftAddons", "children", "size", "checked", "className", "dataTestId", "name", "colors", "onClick", "variant"]);
    var colorStyles = colorStylesMap[colors];
    var tagRef = useRef(null);
    var focused = useFocus(tagRef, 'keyboard')[0];
    var variantClassName = variant === 'default' ? 'defaultVariant' : variant;
    var tagProps = {
        className: cn(styles.component, colorStyles.component, styles[size], styles[variantClassName], (_b = {},
            _b[styles.checked] = checked,
            _b[colorStyles.checked] = checked,
            _b[styles.focused] = focused,
            _b[styles.withRightAddons] = Boolean(rightAddons),
            _b[styles.withLeftAddons] = Boolean(leftAddons),
            _b), className),
        'data-test-id': dataTestId,
    };
    var handleClick = function (event) {
        if (onClick) {
            onClick(event, { name: name, checked: !checked });
        }
    };
    return (React.createElement("button", __assign({ ref: mergeRefs([tagRef, ref]), type: 'button', onClick: handleClick }, tagProps, restProps),
        leftAddons ? React.createElement("span", { className: styles.addons }, leftAddons) : null,
        children && React.createElement("span", null, children),
        rightAddons ? React.createElement("span", { className: styles.addons }, rightAddons) : null));
});

export { Tag };
