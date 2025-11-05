var React = require('react');
var coreComponentsInput = require('../input');
var utils_format = require('./utils/format.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

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

/* eslint-disable no-useless-escape */
var TimeInput = React__default.default.forwardRef(function (_a, ref) {
    var _b = _a.defaultValue, defaultValue = _b === void 0 ? '' : _b, propValue = _a.value, onChange = _a.onChange, onComplete = _a.onComplete, className = _a.className, restProps = __rest(_a, ["defaultValue", "value", "onChange", "onComplete", "className"]);
    var _c = React.useState(propValue || defaultValue), value = _c[0], setValue = _c[1];
    var handleChange = function (event) {
        var newValue = event.target.value;
        if (newValue.length > 5)
            return;
        // Позволяем вводить только цифры и двоеточия
        if (/[^\d:]/.test(newValue)) {
            return;
        }
        var colon = newValue.match(/\:/g);
        // Не даем вводить больше, чем одно двоеточие
        if (colon && colon.length > 1) {
            return;
        }
        var formattedValue = utils_format.format(newValue);
        var formattedValueArr = formattedValue.split(':');
        var hours = Number(formattedValueArr[0]);
        var mins = Number(formattedValueArr[1]);
        setValue(formattedValue);
        if (onChange)
            onChange(event, { hours: hours, mins: mins, value: formattedValue });
        if (utils_format.isCompleteTimeInput(formattedValue)) {
            var valid = formattedValue.length > 0 && utils_format.isValidInputValue(formattedValue);
            if (!valid)
                return;
            if (onComplete) {
                onComplete(event, { hours: hours, mins: mins, value: formattedValue });
            }
        }
    };
    var handleClearClick = function () {
        setValue('');
    };
    return (React__default.default.createElement(coreComponentsInput.Input, __assign({}, restProps, { ref: ref, value: value, className: className, onChange: handleChange, onClear: handleClearClick })));
});

exports.TimeInput = TimeInput;
