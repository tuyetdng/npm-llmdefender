var React = require('react');
var mergeRefs = require('react-merge-refs');
var TextareaAutosize = require('react-textarea-autosize');
var cn = require('classnames');
var coreComponentsFormControl = require('../form-control');
var coreComponentsScrollbar = require('../scrollbar');
var hooks = require('@alfalab/hooks');
var components_PseudoTextArea = require('./PseudoTextArea-580d8087.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var TextareaAutosize__default = /*#__PURE__*/_interopDefaultCompat(TextareaAutosize);
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

var defaultColors = {"input":"textarea__input_m4zlq","hasInnerLabel":"textarea__hasInnerLabel_m4zlq","clearIcon":"textarea__clearIcon_m4zlq","error":"textarea__error_m4zlq","textarea":"textarea__textarea_m4zlq","hint":"textarea__hint_m4zlq"};
require('./default.css');

var invertedColors = {"input":"textarea__input_1guwx","hasInnerLabel":"textarea__hasInnerLabel_1guwx","clearIcon":"textarea__clearIcon_1guwx","error":"textarea__error_1guwx","textarea":"textarea__textarea_1guwx","hint":"textarea__hint_1guwx"};
require('./inverted.css');

var colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
var getDefaultCounterText = function (textLength, maxLength) {
    if (maxLength === void 0) { maxLength = 0; }
    return "".concat(textLength, "/").concat(maxLength, " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432");
};
var Textarea = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.autoComplete, autoComplete = _d === void 0 ? 'on' : _d, _e = _a.autosize, autosize = _e === void 0 ? true : _e, _f = _a.size, size = _f === void 0 ? 's' : _f, _g = _a.colors, colors = _g === void 0 ? 'default' : _g, _h = _a.block, block = _h === void 0 ? false : _h, bottomAddons = _a.bottomAddons, fieldClassName = _a.fieldClassName, className = _a.className, dataTestId = _a.dataTestId, disabled = _a.disabled, error = _a.error, hint = _a.hint, textareaClassName = _a.textareaClassName, label = _a.label, _j = _a.labelView, labelView = _j === void 0 ? 'inner' : _j, leftAddons = _a.leftAddons, onFocus = _a.onFocus, onBlur = _a.onBlur, onChange = _a.onChange, onHeightChange = _a.onHeightChange, rightAddons = _a.rightAddons, maxRows = _a.maxRows, minRows = _a.minRows, maxHeight = _a.maxHeight, _k = _a.resize, resize = _k === void 0 ? 'none' : _k, value = _a.value, defaultValue = _a.defaultValue, _l = _a.rows, rows = _l === void 0 ? autosize ? 1 : 3 : _l, _m = _a.showCounter, showCounter = _m === void 0 ? false : _m, _o = _a.getCounterText, getCounterText = _o === void 0 ? getDefaultCounterText : _o, maxLength = _a.maxLength, nativeScrollbarProp = _a.nativeScrollbar, restProps = __rest(_a, ["autoComplete", "autosize", "size", "colors", "block", "bottomAddons", "fieldClassName", "className", "dataTestId", "disabled", "error", "hint", "textareaClassName", "label", "labelView", "leftAddons", "onFocus", "onBlur", "onChange", "onHeightChange", "rightAddons", "maxRows", "minRows", "maxHeight", "resize", "value", "defaultValue", "rows", "showCounter", "getCounterText", "maxLength", "nativeScrollbar"]);
    var uncontrolled = value === undefined;
    var nativeScrollbar = hooks.useMedia([[true, '(max-width: 1023px)']], false)[0];
    nativeScrollbar = resize !== 'none' || Boolean(nativeScrollbarProp !== null && nativeScrollbarProp !== void 0 ? nativeScrollbarProp : nativeScrollbar);
    var textareaRef = React.useRef(null);
    var pseudoTextareaRef = React.useRef(null);
    var _p = React.useState(false), focused = _p[0], setFocused = _p[1];
    var _q = React.useState(defaultValue || ''), stateValue = _q[0], setStateValue = _q[1];
    var _r = React.useState(), scrollableHeight = _r[0], setScrollableHeight = _r[1];
    var _s = React.useState(0), scrollPosition = _s[0], setScrollPosition = _s[1];
    var focusVisible = hooks.useFocus(textareaRef, 'keyboard')[0];
    var filled = Boolean(uncontrolled ? stateValue : value);
    var hasInnerLabel = label && labelView === 'inner';
    var hasOverflow = Boolean((maxLength && (value === null || value === void 0 ? void 0 : value.slice(maxLength))) || (maxLength && stateValue.slice(maxLength)));
    React.useEffect(function () {
        var pseudoNode = pseudoTextareaRef.current;
        if (pseudoNode) {
            pseudoNode.scrollTop = scrollPosition;
        }
    }, [scrollPosition, stateValue]);
    // Хак, так как react-textarea-autosize перестал поддерживать maxHeight
    React.useEffect(function () {
        if (autosize) {
            if (nativeScrollbar &&
                maxHeight &&
                textareaRef.current &&
                textareaRef.current.style) {
                textareaRef.current.style.maxHeight = "".concat(maxHeight, "px");
            }
        }
        else if (!nativeScrollbar && textareaRef.current) {
            var textareaHeight = textareaRef.current.scrollHeight;
            setScrollableHeight(textareaHeight);
        }
    }, [autosize, maxHeight, nativeScrollbar]);
    var handleTextareaFocus = function (event) {
        setFocused(true);
        if (onFocus) {
            onFocus(event);
        }
    };
    var handleTextareaBlur = function (event) {
        setFocused(false);
        if (onBlur) {
            onBlur(event);
        }
    };
    var handleTextareaChange = function (event) {
        var value = event.target.value;
        if (onChange) {
            onChange(event, { value: value });
        }
        if (uncontrolled) {
            setStateValue(value);
        }
    };
    var handleTeaxtareaScroll = function (event) {
        if (maxLength) {
            var value_1 = event.target.scrollTop;
            setScrollPosition(value_1);
        }
    };
    var getValueLength = function () {
        if (uncontrolled) {
            return stateValue.length;
        }
        return value.length;
    };
    var textareaClassNameCalc = cn__default.default(components_PseudoTextArea.styles.textarea, colorStyles[colors].textarea, components_PseudoTextArea.styles[size], (_b = {},
        _b[components_PseudoTextArea.styles.hasInnerLabel] = nativeScrollbar && hasInnerLabel,
        _b[colorStyles[colors].hasInnerLabel] = hasInnerLabel,
        _b[components_PseudoTextArea.styles.filled] = nativeScrollbar && filled,
        _b[components_PseudoTextArea.styles.resizeVertical] = resize === 'vertical',
        _b), textareaClassName);
    var textareaProps = __assign(__assign({}, restProps), { className: textareaClassNameCalc, autoComplete: autoComplete, disabled: disabled, onBlur: handleTextareaBlur, onFocus: handleTextareaFocus, onChange: handleTextareaChange, value: uncontrolled ? stateValue : value, rows: rows, ref: mergeRefs__default.default([ref, textareaRef]), 'data-test-id': dataTestId, onScroll: handleTeaxtareaScroll });
    var renderWithNativeScrollbar = function () {
        return autosize ? (React__default.default.createElement(TextareaAutosize__default.default, __assign({}, textareaProps, { maxRows: maxRows, minRows: minRows, onHeightChange: onHeightChange }))) : (React__default.default.createElement("textarea", __assign({}, textareaProps, { style: { maxHeight: maxHeight } })));
    };
    var renderWithCustomScrollbar = function () {
        var _a;
        var minRowsValue = autosize ? minRows : rows;
        return (React__default.default.createElement(coreComponentsScrollbar.Scrollbar, { style: { maxHeight: maxHeight, height: scrollableHeight, padding: 0 }, className: cn__default.default(components_PseudoTextArea.styles.scrollable, components_PseudoTextArea.styles[size], (_a = {},
                _a[components_PseudoTextArea.styles.scrollableWithLabel] = label,
                _a[components_PseudoTextArea.styles.filled] = filled,
                _a)), horizontalAutoStretch: !block, widthPropName: 'width', contentNodeProps: { className: components_PseudoTextArea.styles.scrollableWrapper } },
            hasOverflow && (React__default.default.createElement(components_PseudoTextArea.PseudoTextArea, { value: value !== null && value !== void 0 ? value : stateValue, size: size, maxLength: maxLength, pseudoTextareaClassName: cn__default.default(textareaClassNameCalc, components_PseudoTextArea.styles.customScrollbar), ref: pseudoTextareaRef })),
            React__default.default.createElement(TextareaAutosize__default.default, __assign({}, textareaProps, { minRows: minRowsValue, style: { overflow: 'hidden' } })),
            React__default.default.createElement(TextareaAutosize__default.default, { className: cn__default.default(textareaProps.className, components_PseudoTextArea.styles.textareaHidden), rows: textareaProps.rows, maxRows: maxRows, minRows: minRowsValue, value: textareaProps.value, role: 'none', onHeightChange: function (height) {
                    if (autosize) {
                        setScrollableHeight(height);
                        if (onHeightChange) {
                            onHeightChange(height);
                        }
                    }
                } })));
    };
    var getBottomAddons = function () {
        var _a;
        var counterIsVisible = Boolean(maxLength && showCounter);
        return (React__default.default.createElement(React__default.default.Fragment, null,
            counterIsVisible && (React__default.default.createElement("span", { className: cn__default.default(components_PseudoTextArea.styles.sub, (_a = {},
                    _a[colorStyles[colors].error] = hasOverflow,
                    _a[colorStyles[colors].hint] = !hasOverflow,
                    _a)) }, getCounterText(getValueLength(), maxLength))),
            bottomAddons));
    };
    return (React__default.default.createElement(coreComponentsFormControl.FormControl, { className: cn__default.default(className), fieldClassName: cn__default.default(fieldClassName, (_c = {},
            _c[components_PseudoTextArea.styles.focusVisible] = focusVisible,
            _c)), size: size, colors: colors, block: block, disabled: disabled, filled: filled || focused, focused: focused, error: error, label: label, labelView: labelView, hint: hint, leftAddons: leftAddons, rightAddons: rightAddons, bottomAddons: getBottomAddons() }, nativeScrollbar ? (React__default.default.createElement(React__default.default.Fragment, null,
        hasOverflow && (React__default.default.createElement(components_PseudoTextArea.PseudoTextArea, { value: value !== null && value !== void 0 ? value : stateValue, size: size, maxLength: maxLength, pseudoTextareaClassName: cn__default.default(textareaClassNameCalc, components_PseudoTextArea.styles.nativeScrollbar), ref: pseudoTextareaRef })),
        renderWithNativeScrollbar())) : (renderWithCustomScrollbar())));
});

exports.Textarea = Textarea;
exports.getDefaultCounterText = getDefaultCounterText;
