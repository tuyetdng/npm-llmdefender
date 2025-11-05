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

var styles = {"container":"radio__container_ik2c1","checked":"radio__checked_ik2c1","disabled":"radio__disabled_ik2c1","inactive":"radio__inactive_ik2c1","circle":"radio__circle_ik2c1","label":"radio__label_ik2c1","hint":"radio__hint_ik2c1","focused":"radio__focused_ik2c1","s":"radio__s_ik2c1","content":"radio__content_ik2c1","start":"radio__start_ik2c1","center":"radio__center_ik2c1","addons":"radio__addons_ik2c1","block":"radio__block_ik2c1"};
require('./index.css');

var Radio = forwardRef(function (_a, ref) {
    var _b;
    var onChange = _a.onChange, className = _a.className, circleClassName = _a.circleClassName, contentClassName = _a.contentClassName, name = _a.name, disabled = _a.disabled, inactive = _a.inactive, dataTestId = _a.dataTestId, label = _a.label, checked = _a.checked, hint = _a.hint, _c = _a.size, size = _c === void 0 ? 's' : _c, _d = _a.align, align = _d === void 0 ? 'start' : _d, addons = _a.addons, block = _a.block, restProps = __rest(_a, ["onChange", "className", "circleClassName", "contentClassName", "name", "disabled", "inactive", "dataTestId", "label", "checked", "hint", "size", "align", "addons", "block"]);
    var labelRef = useRef(null);
    var focused = useFocus(labelRef, 'keyboard')[0];
    var handleChange = function (event) {
        if (onChange) {
            onChange(event, { checked: event.target.checked, name: name });
        }
    };
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    React.createElement("label", { className: cn(styles.container, styles[size], styles[align], className, (_b = {},
            _b[styles.disabled] = disabled,
            _b[styles.inactive] = inactive,
            _b[styles.checked] = checked,
            _b[styles.focused] = focused,
            _b[styles.block] = block,
            _b)), ref: mergeRefs([labelRef, ref]) },
        React.createElement("input", __assign({ type: 'radio', onChange: handleChange, "data-test-id": dataTestId, disabled: disabled || inactive, checked: checked, name: name }, restProps)),
        React.createElement("span", { className: cn(styles.circle, circleClassName) }),
        (label || hint) && (React.createElement("span", { className: cn(styles.content, contentClassName) },
            label && React.createElement("span", { className: styles.label }, label),
            hint && React.createElement("span", { className: styles.hint }, hint))),
        addons && React.createElement("span", { className: styles.addons }, addons)));
});

export { Radio };
