var React = require('react');
var mergeRefs = require('react-merge-refs');
var coreComponentsInput = require('../../input/cssm');
var utils_format = require('./utils/format.js');
var utils_nativeSupports = require('./utils/native-supports.js');
var styles = require('./index.module.css');
require('date-fns/format');
require('date-fns/isValid');
require('date-fns/parse');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

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

var DateInput = React.forwardRef(function (_a, ref) {
    var _b = _a.mobileMode, mobileMode = _b === void 0 ? 'input' : _b, _c = _a.defaultValue, defaultValue = _c === void 0 ? '' : _c, rightAddons = _a.rightAddons, error = _a.error, propValue = _a.value, onBlur = _a.onBlur, onChange = _a.onChange, onComplete = _a.onComplete, restProps = __rest(_a, ["mobileMode", "defaultValue", "rightAddons", "error", "value", "onBlur", "onChange", "onComplete"]);
    var inputRef = React.useRef(null);
    var _d = React.useState(false), shouldRenderNative = _d[0], setShouldRenderNative = _d[1];
    var _e = React.useState(propValue || defaultValue), value = _e[0], setValue = _e[1];
    var handleChange = React.useCallback(function (event) {
        var newValue = event.target.value;
        // Позволяем вводить только цифры и точки
        if (/[^\d.]/.test(newValue)) {
            return;
        }
        var dots = newValue.match(/\./g);
        // Не даем вводить больше, чем 2 точки
        if (dots && dots.length > 2) {
            return;
        }
        // Форматируем введенное значение (добавляем точки)
        var formattedValue = utils_format.format(newValue);
        var date = utils_format.parseDateString(formattedValue);
        setValue(formattedValue);
        if (onChange)
            onChange(event, { date: date, value: formattedValue });
        if (utils_format.isCompleteDateInput(formattedValue)) {
            var valid = formattedValue.length > 0 && utils_format.isValid(formattedValue);
            if (!valid)
                return;
            if (onComplete)
                onComplete(event, { date: date, value: formattedValue });
        }
    }, [onChange, onComplete]);
    var handleNativeInputChange = React.useCallback(function (event) {
        var newDate = utils_format.parseDateString(event.target.value, utils_format.NATIVE_DATE_FORMAT);
        var newValue = event.target.value === '' ? '' : utils_format.formatDate(newDate);
        setValue(newValue);
        if (onComplete)
            onComplete(event, { date: newDate, value: newValue });
        if (onChange)
            onChange(event, { date: newDate, value: newValue });
    }, [onComplete, onChange]);
    var handleBlur = React.useCallback(function (event) {
        if (onBlur)
            onBlur(event);
    }, [onBlur]);
    React.useEffect(function () {
        if (mobileMode === 'native' && utils_nativeSupports.isInputDateSupported()) {
            setShouldRenderNative(true);
        }
    }, [mobileMode]);
    React.useEffect(function () {
        if (typeof propValue !== 'undefined') {
            setValue(propValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propValue]);
    return (React__default.default.createElement(coreComponentsInput.Input, __assign({}, restProps, { ref: mergeRefs__default.default([ref, inputRef]), value: value, inputMode: 'decimal', pattern: '[0-9\\.]*', onChange: handleChange, onBlur: handleBlur, placeholder: '\u0414\u0414.\u041C\u041C.\u0413\u0413\u0413\u0413', error: error, rightAddons: React__default.default.createElement(React__default.default.Fragment, null,
            rightAddons,
            shouldRenderNative && (React__default.default.createElement("input", { type: 'date', ref: ref, defaultValue: defaultValue, onChange: handleNativeInputChange, className: styles__default.default.nativeInput }))) })));
});

exports.DateInput = DateInput;
