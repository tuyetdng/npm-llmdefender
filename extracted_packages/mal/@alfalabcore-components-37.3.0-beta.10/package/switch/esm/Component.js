import React, { forwardRef, useRef, useCallback } from 'react';
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

var styles = {"component":"switch__component_4pdv6","start":"switch__start_4pdv6","center":"switch__center_4pdv6","addons":"switch__addons_4pdv6","block":"switch__block_4pdv6","switch":"switch__switch_4pdv6","content":"switch__content_4pdv6","label":"switch__label_4pdv6","hint":"switch__hint_4pdv6","reversed":"switch__reversed_4pdv6","checked":"switch__checked_4pdv6","disabled":"switch__disabled_4pdv6","inactive":"switch__inactive_4pdv6","focused":"switch__focused_4pdv6"};
require('./index.css');

var Switch = forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.reversed, reversed = _c === void 0 ? false : _c, _d = _a.checked, checked = _d === void 0 ? false : _d, _e = _a.align, align = _e === void 0 ? 'start' : _e, addons = _a.addons, block = _a.block, disabled = _a.disabled, inactive = _a.inactive, label = _a.label, hint = _a.hint, name = _a.name, value = _a.value, className = _a.className, onChange = _a.onChange, dataTestId = _a.dataTestId, restProps = __rest(_a, ["reversed", "checked", "align", "addons", "block", "disabled", "inactive", "label", "hint", "name", "value", "className", "onChange", "dataTestId"]);
    var labelRef = useRef(null);
    var focused = useFocus(labelRef, 'keyboard')[0];
    var handleChange = useCallback(function (e) {
        if (onChange) {
            onChange(e, { checked: e.target.checked, name: name });
        }
    }, [onChange, name]);
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    React.createElement("label", { className: cn(styles.component, styles[align], className, (_b = {},
            _b[styles.disabled] = disabled,
            _b[styles.inactive] = inactive,
            _b[styles.checked] = checked,
            _b[styles.reversed] = reversed,
            _b[styles.focused] = focused,
            _b[styles.block] = block,
            _b)), ref: mergeRefs([labelRef, ref]) },
        React.createElement("input", __assign({ type: 'checkbox', onChange: handleChange, disabled: disabled || inactive, checked: checked, name: name, value: value, "data-test-id": dataTestId }, restProps)),
        React.createElement("span", { className: styles.switch }),
        (label || hint) && (React.createElement("span", { className: styles.content },
            label && React.createElement("span", { className: styles.label }, label),
            hint && React.createElement("span", { className: styles.hint }, hint))),
        addons && React.createElement("span", { className: styles.addons }, addons)));
});

export { Switch };
