var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsButton = require('../../button/cssm');
var coreComponentsKeyboardFocusable = require('../../keyboard-focusable/cssm');
var coreComponentsProgressBar = require('../../progress-bar/cssm');
var PaperclipMIcon = require('@alfalab/icons-glyph/PaperclipMIcon');
var PaperclipSIcon = require('@alfalab/icons-glyph/PaperclipSIcon');
var utils = require('@alfalab/utils');
var utils_index = require('./utils/index.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
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
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var MULTIPLE_TEXTS = ['файл', 'файла', 'файлов'];
var Attach = React__default.default.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, accept = _a.accept, _d = _a.buttonContent, buttonContent = _d === void 0 ? 'Выберите файл' : _d, _e = _a.buttonProps, buttonProps = _e === void 0 ? {} : _e, className = _a.className, fileClassName = _a.fileClassName, noFileClassName = _a.noFileClassName, disabled = _a.disabled, dataTestId = _a.dataTestId, id = _a.id, maxFilenameLength = _a.maxFilenameLength, multiple = _a.multiple, _f = _a.noFileText, noFileText = _f === void 0 ? 'Нет файла' : _f, progressBarPercent = _a.progressBarPercent, defaultValue = _a.defaultValue, value = _a.value, onChange = _a.onChange, onClear = _a.onClear, restProps = __rest(_a, ["size", "accept", "buttonContent", "buttonProps", "className", "fileClassName", "noFileClassName", "disabled", "dataTestId", "id", "maxFilenameLength", "multiple", "noFileText", "progressBarPercent", "defaultValue", "value", "onChange", "onClear"]);
    var uncontrolled = value === undefined;
    var _g = React.useState(defaultValue || []), files = _g[0], setFiles = _g[1];
    var inputRef = React.useRef(null);
    var labelRef = React.useRef(null);
    var buttonRef = React.useRef(null);
    var getDefaultLeftAddon = function () {
        var IconComponent;
        if (['xs', 'xxs'].includes(size)) {
            IconComponent = PaperclipSIcon.PaperclipSIcon;
        }
        else {
            IconComponent = PaperclipMIcon.PaperclipMIcon;
        }
        return React__default.default.createElement(IconComponent, { className: styles__default.default.icon });
    };
    var handleInputChange = function (event) {
        var filesArray = event.target.files ? Array.from(event.target.files) : [];
        if (onChange) {
            onChange(event, { files: filesArray });
        }
        if (uncontrolled && event.target.files) {
            setFiles(filesArray);
        }
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };
    var handleButtonClick = function (event) {
        if (labelRef.current) {
            labelRef.current.click();
        }
        if (buttonRef.current) {
            buttonRef.current.focus();
        }
        if (buttonProps.onClick) {
            buttonProps.onClick(event);
        }
    };
    var handleClearClick = function (ev) {
        if (uncontrolled) {
            setFiles([]);
        }
        if (onClear) {
            onClear(ev);
        }
    };
    var statusTextContent = files.length === 1 ? (utils_index.truncateFilename(files[0].name, maxFilenameLength)) : (React__default.default.createElement("abbr", { title: files.map(function (file) { return file.name; }).join() },
        files.length,
        " ",
        utils.pluralize.apply(void 0, __spreadArray([files.length], MULTIPLE_TEXTS, false))));
    React.useEffect(function () {
        if (!uncontrolled) {
            setFiles(value || []);
        }
    }, [uncontrolled, value]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, styles__default.default[size], (_b = {},
            _b[styles__default.default.disabled] = disabled,
            _b), className) },
        React__default.default.createElement(coreComponentsButton.Button, __assign({}, buttonProps, { size: size, disabled: disabled, view: (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.view) || 'secondary', leftAddons: (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.leftAddons) || getDefaultLeftAddon(), onClick: handleButtonClick, ref: buttonRef }),
            React__default.default.createElement("span", null, buttonContent)),
        React__default.default.createElement("label", { className: styles__default.default.label, htmlFor: id, ref: labelRef },
            React__default.default.createElement("input", __assign({}, restProps, { className: styles__default.default.control, accept: accept, disabled: disabled, id: id, multiple: multiple, tabIndex: -1, type: 'file', onChange: handleInputChange, ref: mergeRefs__default.default([ref, inputRef]), "data-test-id": dataTestId }))),
        files && files.length > 0 ? (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.file, fileClassName) },
            React__default.default.createElement("span", null, statusTextContent),
            React__default.default.createElement(coreComponentsKeyboardFocusable.KeyboardFocusable, null, function (targetRef, focused) {
                var _a;
                return (React__default.default.createElement("button", { "aria-label": '\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C', type: 'button', className: cn__default.default(styles__default.default.clear, (_a = {},
                        _a[styles__default.default.focused] = focused,
                        _a)), onClick: handleClearClick, ref: targetRef }));
            }),
            progressBarPercent && (React__default.default.createElement(coreComponentsProgressBar.ProgressBar, { className: styles__default.default.progressBar, value: progressBarPercent, view: 'positive' })))) : (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.noFile, noFileClassName) }, noFileText))));
});
/**
 * Для отображения в сторибуке
 */
Attach.defaultProps = {
    size: 's',
    buttonContent: 'Выберите файл',
    noFileText: 'Нет файла',
};

exports.Attach = Attach;
