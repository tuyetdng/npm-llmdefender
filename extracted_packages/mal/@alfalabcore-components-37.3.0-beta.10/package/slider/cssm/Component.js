var React = require('react');
var cn = require('classnames');
var noUiSlider = require('nouislider');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var noUiSlider__default = /*#__PURE__*/_interopDefaultCompat(noUiSlider);
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

var Slider = function (_a) {
    var _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.step, step = _d === void 0 ? 1 : _d, _e = _a.value, value = _e === void 0 ? 0 : _e, disabled = _a.disabled, pips = _a.pips, _f = _a.range, range = _f === void 0 ? { min: min, max: max } : _f, _g = _a.size, size = _g === void 0 ? 's' : _g, className = _a.className, onChange = _a.onChange, dataTestId = _a.dataTestId;
    var sliderRef = React.useRef(null);
    var busyRef = React.useRef(false);
    var getSlider = function () { var _a; return (_a = sliderRef.current) === null || _a === void 0 ? void 0 : _a.noUiSlider; };
    React.useEffect(function () {
        if (!sliderRef.current)
            return;
        var slider = noUiSlider__default.default.create(sliderRef.current, {
            start: [value],
            connect: [true, false],
            step: step,
            pips: pips,
            range: range,
        });
        slider.on('start', function () {
            busyRef.current = true;
        });
        slider.on('change', function () {
            busyRef.current = false;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(function () {
        var slider = getSlider();
        // Пропускаем обновление, если происходит взаимодействие со слайдером
        if (slider && busyRef.current === false)
            slider.set(value, false);
    }, [value]);
    React.useEffect(function () {
        var slider = getSlider();
        if (!slider)
            return;
        slider.updateOptions({
            step: step,
            range: range,
            pips: pips,
        }, true);
    }, [pips, range, step]);
    React.useEffect(function () {
        var slider = getSlider();
        if (!slider)
            return;
        var handler = function () {
            if (onChange) {
                onChange({ value: Number(slider.get()) });
            }
        };
        slider.off('slide');
        slider.on('slide', handler);
    }, [onChange]);
    return (React__default.default.createElement("div", __assign({ className: cn__default.default(styles__default.default.component, className, styles__default.default[size]), ref: sliderRef, "data-test-id": dataTestId }, { disabled: disabled })));
};

exports.Slider = Slider;
