var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var hooks = require('@alfalab/hooks');
var WorldMagnifierMIcon = require('@alfalab/icons-glyph/WorldMagnifierMIcon');
var components_flagIcon_component = require('./components/flag-icon/component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var WorldMagnifierMIcon__default = /*#__PURE__*/_interopDefaultCompat(WorldMagnifierMIcon);

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
exports.__assign = function () {
    exports.__assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return exports.__assign.apply(this, arguments);
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
    var wrapperRef = React.useRef(null);
    var focusVisible = hooks.useFocus(wrapperRef, 'keyboard')[0];
    var ref = innerProps.ref ? mergeRefs__default.default([innerProps.ref, wrapperRef]) : wrapperRef;
    return (React__default.default.createElement("div", { ref: ref, className: cn__default.default(styles.component, size && styles[size], (_b = {},
            _b[styles.focusVisible] = focusVisible,
            _b[styles.disabled] = disabled,
            _b)) },
        React__default.default.createElement("div", exports.__assign({}, innerProps, { className: styles.inner }),
            React__default.default.createElement("span", { className: styles.flagIconContainer }, !selected || selected === EMPTY_COUNTRY_SELECT_FIELD ? (React__default.default.createElement(WorldMagnifierMIcon__default.default, { className: styles.emptyCountryIcon })) : (React__default.default.createElement(components_flagIcon_component.FlagIcon, { country: selected.value }))),
            Arrow)));
};

exports.EMPTY_COUNTRY_SELECT_FIELD = EMPTY_COUNTRY_SELECT_FIELD;
exports.SelectField = SelectField;
exports.__rest = __rest;
