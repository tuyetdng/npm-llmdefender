var React = require('react');
var cn = require('classnames');
var hooks = require('@alfalab/hooks');
var ChevronDownCompactSIcon = require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
var ChevronDownMIcon = require('@alfalab/icons-glyph/ChevronDownMIcon');
var CrossCircleMIcon = require('@alfalab/icons-glyph/CrossCircleMIcon');
var CrossCircleSIcon = require('@alfalab/icons-glyph/CrossCircleSIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

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

var styles = {"component":"filter-tag__component_1qx59","disabled":"filter-tag__disabled_1qx59","defaultVariant":"filter-tag__defaultVariant_1qx59","alt":"filter-tag__alt_1qx59","checked":"filter-tag__checked_1qx59","xxs":"filter-tag__xxs_1qx59","xs":"filter-tag__xs_1qx59","s":"filter-tag__s_1qx59","focused":"filter-tag__focused_1qx59","chevron":"filter-tag__chevron_1qx59","valueButton":"filter-tag__valueButton_1qx59","open":"filter-tag__open_1qx59","close":"filter-tag__close_1qx59","clear":"filter-tag__clear_1qx59","iconWrapper":"filter-tag__iconWrapper_1qx59"};
require('./index.css');

var isKeyBoardEvent = function (event) {
    return event.key !== undefined;
};
var FilterTag = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var children = _a.children, checked = _a.checked, disabled = _a.disabled, open = _a.open, onClick = _a.onClick, _d = _a.size, size = _d === void 0 ? 's' : _d, _e = _a.variant, variant = _e === void 0 ? 'default' : _e, _f = _a.onClear, onClear = _f === void 0 ? function () { return null; } : _f, _g = _a.showClear, showClear = _g === void 0 ? true : _g, className = _a.className, dataTestId = _a.dataTestId, restProps = __rest(_a, ["children", "checked", "disabled", "open", "onClick", "size", "variant", "onClear", "showClear", "className", "dataTestId"]);
    var valueRef = React.useRef(null);
    var focused = hooks.useFocus(valueRef, 'keyboard')[0];
    var handleClear = function (event) {
        event.stopPropagation();
        if (isKeyBoardEvent(event)) {
            var clickSimilarKeys = ['Enter'].includes(event.key);
            if (clickSimilarKeys)
                onClear();
            return;
        }
        onClear();
    };
    var variantClassName = variant === 'default' ? 'defaultVariant' : variant;
    return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    React__default.default.createElement("div", __assign({ className: cn__default.default(className, [styles.component], styles[variantClassName], styles[size], (_b = {},
            _b[styles.checked] = checked,
            _b[styles.disabled] = disabled,
            _b[styles.focused] = focused,
            _b[styles.open] = open,
            _b)), ref: ref, "data-test-id": dataTestId, onClick: disabled ? undefined : onClick }, restProps),
        React__default.default.createElement("button", { type: 'button', ref: valueRef, disabled: disabled, className: cn__default.default(styles.valueButton, styles[size], styles[variantClassName], (_c = {},
                _c[styles.checked] = checked,
                _c[styles.open] = open,
                _c[styles.close] = !showClear,
                _c)) },
            React__default.default.createElement("span", null, children),
            React__default.default.createElement("span", { className: styles.chevron }, size === 'xxs' ? React__default.default.createElement(ChevronDownCompactSIcon.ChevronDownCompactSIcon, null) : React__default.default.createElement(ChevronDownMIcon.ChevronDownMIcon, null))),
        checked && !disabled && showClear && (React__default.default.createElement("div", { role: 'button', className: cn__default.default(styles.clear, styles[size], styles[variantClassName]), onClick: handleClear, onKeyDown: handleClear, tabIndex: 0 },
            React__default.default.createElement("span", { className: styles.iconWrapper }, size === 'xxs' ? React__default.default.createElement(CrossCircleSIcon.CrossCircleSIcon, null) : React__default.default.createElement(CrossCircleMIcon.CrossCircleMIcon, null))))));
});

exports.FilterTag = FilterTag;
