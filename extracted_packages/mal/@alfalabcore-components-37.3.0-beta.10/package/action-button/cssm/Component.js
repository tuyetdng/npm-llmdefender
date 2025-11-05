var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsLoader = require('../../loader/cssm');
var hooks = require('@alfalab/hooks');
var hooks$1 = require('./hooks.js');
var defaultColors = require('./default.module.css');
var styles = require('./index.module.css');
var invertedColors = require('./inverted.module.css');
var staticColors = require('./static.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var defaultColors__default = /*#__PURE__*/_interopDefaultCompat(defaultColors);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var invertedColors__default = /*#__PURE__*/_interopDefaultCompat(invertedColors);
var staticColors__default = /*#__PURE__*/_interopDefaultCompat(staticColors);

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

var colorStyles = {
    default: defaultColors__default.default,
    inverted: invertedColors__default.default,
    static: staticColors__default.default,
};
/**
 * Минимальное время отображения лоадера - 500мс,
 * чтобы при быстрых ответах от сервера кнопка не «моргала».
 */
var LOADER_MIN_DISPLAY_INTERVAL = 500;
var ActionButton = React.forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, icon = _a.icon, children = _a.children, href = _a.href, _c = _a.size, size = _c === void 0 ? 's' : _c, _d = _a.view, view = _d === void 0 ? 'primary' : _d, _e = _a.type, type = _e === void 0 ? 'button' : _e, iconWrapperClassName = _a.iconWrapperClassName, disabled = _a.disabled, loading = _a.loading, dataTestId = _a.dataTestId, _f = _a.colors, colors = _f === void 0 ? 'default' : _f, rest = __rest(_a, ["className", "icon", "children", "href", "size", "view", "type", "iconWrapperClassName", "disabled", "loading", "dataTestId", "colors"]);
    var componentRef = React.useRef(null);
    var focused = hooks.useFocus(componentRef, 'keyboard')[0];
    var showLoader = hooks$1.useLoader(!!loading, LOADER_MIN_DISPLAY_INTERVAL).showLoader;
    var componentProps = {
        className: cn__default.default(styles__default.default.component, colorStyles[colors][view], styles__default.default[size], (_b = {},
            _b[styles__default.default.focused] = focused,
            _b[styles__default.default.disabled] = disabled,
            _b[styles__default.default.loading] = showLoader,
            _b), className),
        'data-test-id': dataTestId,
    };
    var buttonChildren = (React__default.default.createElement(React.Fragment, null,
        React__default.default.createElement("span", { role: 'img', className: cn__default.default(styles__default.default.iconWrapper, colorStyles[colors].iconWrapper, styles__default.default[size], iconWrapperClassName) }, showLoader ? React__default.default.createElement(coreComponentsLoader.Loader, { dataTestId: 'loader' }) : icon),
        React__default.default.createElement("span", { className: styles__default.default.label }, children)));
    if (href) {
        return (React__default.default.createElement("a", __assign({ role: 'button', ref: mergeRefs__default.default([componentRef, ref]), href: href, "aria-disabled": disabled || loading }, componentProps, rest), buttonChildren));
    }
    return (React__default.default.createElement("button", __assign({ ref: mergeRefs__default.default([componentRef, ref]), 
        // eslint-disable-next-line react/button-has-type
        type: type, disabled: disabled || loading }, componentProps, rest), buttonChildren));
});

exports.ActionButton = ActionButton;
