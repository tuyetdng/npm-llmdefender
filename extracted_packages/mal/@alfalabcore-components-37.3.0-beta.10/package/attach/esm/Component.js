import React, { useState, useRef, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Button } from '../../button/esm';
import { KeyboardFocusable } from '../../keyboard-focusable/esm';
import { ProgressBar } from '../../progress-bar/esm';
import { PaperclipMIcon } from '@alfalab/icons-glyph/PaperclipMIcon';
import { PaperclipSIcon } from '@alfalab/icons-glyph/PaperclipSIcon';
import { pluralize } from '@alfalab/utils';
import { truncateFilename } from './utils/index.js';

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

var styles = {"component":"attach__component_ttrdg","label":"attach__label_ttrdg","control":"attach__control_ttrdg","xxs":"attach__xxs_ttrdg","file":"attach__file_ttrdg","noFile":"attach__noFile_ttrdg","xs":"attach__xs_ttrdg","s":"attach__s_ttrdg","m":"attach__m_ttrdg","l":"attach__l_ttrdg","clear":"attach__clear_ttrdg","progressBar":"attach__progressBar_ttrdg","disabled":"attach__disabled_ttrdg","icon":"attach__icon_ttrdg","focused":"attach__focused_ttrdg"};
require('./index.css');

var MULTIPLE_TEXTS = ['файл', 'файла', 'файлов'];
var Attach = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.size, size = _c === void 0 ? 's' : _c, accept = _a.accept, _d = _a.buttonContent, buttonContent = _d === void 0 ? 'Выберите файл' : _d, _e = _a.buttonProps, buttonProps = _e === void 0 ? {} : _e, className = _a.className, fileClassName = _a.fileClassName, noFileClassName = _a.noFileClassName, disabled = _a.disabled, dataTestId = _a.dataTestId, id = _a.id, maxFilenameLength = _a.maxFilenameLength, multiple = _a.multiple, _f = _a.noFileText, noFileText = _f === void 0 ? 'Нет файла' : _f, progressBarPercent = _a.progressBarPercent, defaultValue = _a.defaultValue, value = _a.value, onChange = _a.onChange, onClear = _a.onClear, restProps = __rest(_a, ["size", "accept", "buttonContent", "buttonProps", "className", "fileClassName", "noFileClassName", "disabled", "dataTestId", "id", "maxFilenameLength", "multiple", "noFileText", "progressBarPercent", "defaultValue", "value", "onChange", "onClear"]);
    var uncontrolled = value === undefined;
    var _g = useState(defaultValue || []), files = _g[0], setFiles = _g[1];
    var inputRef = useRef(null);
    var labelRef = useRef(null);
    var buttonRef = useRef(null);
    var getDefaultLeftAddon = function () {
        var IconComponent;
        if (['xs', 'xxs'].includes(size)) {
            IconComponent = PaperclipSIcon;
        }
        else {
            IconComponent = PaperclipMIcon;
        }
        return React.createElement(IconComponent, { className: styles.icon });
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
    var statusTextContent = files.length === 1 ? (truncateFilename(files[0].name, maxFilenameLength)) : (React.createElement("abbr", { title: files.map(function (file) { return file.name; }).join() },
        files.length,
        " ",
        pluralize.apply(void 0, __spreadArray([files.length], MULTIPLE_TEXTS, false))));
    useEffect(function () {
        if (!uncontrolled) {
            setFiles(value || []);
        }
    }, [uncontrolled, value]);
    return (React.createElement("div", { className: cn(styles.component, styles[size], (_b = {},
            _b[styles.disabled] = disabled,
            _b), className) },
        React.createElement(Button, __assign({}, buttonProps, { size: size, disabled: disabled, view: (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.view) || 'secondary', leftAddons: (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.leftAddons) || getDefaultLeftAddon(), onClick: handleButtonClick, ref: buttonRef }),
            React.createElement("span", null, buttonContent)),
        React.createElement("label", { className: styles.label, htmlFor: id, ref: labelRef },
            React.createElement("input", __assign({}, restProps, { className: styles.control, accept: accept, disabled: disabled, id: id, multiple: multiple, tabIndex: -1, type: 'file', onChange: handleInputChange, ref: mergeRefs([ref, inputRef]), "data-test-id": dataTestId }))),
        files && files.length > 0 ? (React.createElement("div", { className: cn(styles.file, fileClassName) },
            React.createElement("span", null, statusTextContent),
            React.createElement(KeyboardFocusable, null, function (targetRef, focused) {
                var _a;
                return (React.createElement("button", { "aria-label": '\u043E\u0447\u0438\u0441\u0442\u0438\u0442\u044C', type: 'button', className: cn(styles.clear, (_a = {},
                        _a[styles.focused] = focused,
                        _a)), onClick: handleClearClick, ref: targetRef }));
            }),
            progressBarPercent && (React.createElement(ProgressBar, { className: styles.progressBar, value: progressBarPercent, view: 'positive' })))) : (React.createElement("div", { className: cn(styles.noFile, noFileClassName) }, noFileText))));
});
/**
 * Для отображения в сторибуке
 */
Attach.defaultProps = {
    size: 's',
    buttonContent: 'Выберите файл',
    noFileText: 'Нет файла',
};

export { Attach };
