var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../button/cssm');
var defaultColors = require('./default.module.css');
var styles = require('./index.module.css');
var invertedColors = require('./inverted.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var defaultColors__default = /*#__PURE__*/_interopDefaultCompat(defaultColors);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var invertedColors__default = /*#__PURE__*/_interopDefaultCompat(invertedColors);

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
};
var IconButton = React.forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, Icon = _a.icon, _c = _a.view, view = _c === void 0 ? 'primary' : _c, _d = _a.size, size = _d === void 0 ? 's' : _d, _e = _a.colors, colors = _e === void 0 ? 'default' : _e, restProps = __rest(_a, ["className", "icon", "view", "size", "colors"]);
    return (React__default.default.createElement(coreComponentsButton.Button, __assign({}, restProps, { ref: ref, view: 'ghost', className: cn__default.default('cc-icon-button', className, colorStyles[colors][view], colorStyles[colors].component, (_b = {},
            _b[colorStyles[colors].loader] = restProps.loading,
            _b)), size: 's' }),
        React__default.default.createElement("span", { className: cn__default.default(styles__default.default.iconWrapper, styles__default.default[size]) },
            React__default.default.createElement(Icon, { className: styles__default.default.icon }))));
});

exports.IconButton = IconButton;
