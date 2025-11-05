import React, { useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import WorldMagnifierMIcon from '@alfalab/icons-glyph/WorldMagnifierMIcon';
import { FlagIcon } from './components/flag-icon/component.js';
import './components/flag-icon/flagSprite.js';

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

var styles = {"component":"intl-phone-input__component_1vosh","flagIconContainer":"intl-phone-input__flagIconContainer_1vosh","emptyCountryIcon":"intl-phone-input__emptyCountryIcon_1vosh","disabled":"intl-phone-input__disabled_1vosh","inner":"intl-phone-input__inner_1vosh","l":"intl-phone-input__l_1vosh","xl":"intl-phone-input__xl_1vosh","focusVisible":"intl-phone-input__focusVisible_1vosh"};
require('./components/select-field/index.css');

var EMPTY_COUNTRY_SELECT_FIELD = {
    value: 'EMPTY_COUNTRY_SELECT_VALUE',
    key: 'EMPTY_COUNTRY_SELECT_KEY',
};
var SelectField = function (_a) {
    var _b;
    var selected = _a.selected, Arrow = _a.Arrow, size = _a.size, disabled = _a.disabled, _c = _a.innerProps, innerProps = _c === void 0 ? {} : _c;
    var wrapperRef = useRef(null);
    var focusVisible = useFocus(wrapperRef, 'keyboard')[0];
    var ref = innerProps.ref ? mergeRefs([innerProps.ref, wrapperRef]) : wrapperRef;
    return (React.createElement("div", { ref: ref, className: cn(styles.component, size && styles[size], (_b = {},
            _b[styles.focusVisible] = focusVisible,
            _b[styles.disabled] = disabled,
            _b)) },
        React.createElement("div", __assign({}, innerProps, { className: styles.inner }),
            React.createElement("span", { className: styles.flagIconContainer }, !selected || selected === EMPTY_COUNTRY_SELECT_FIELD ? (React.createElement(WorldMagnifierMIcon, { className: styles.emptyCountryIcon })) : (React.createElement(FlagIcon, { country: selected.value }))),
            Arrow)));
};

export { EMPTY_COUNTRY_SELECT_FIELD as E, SelectField as S, __rest as _, __assign as a };
