var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var dateFnsIsValid = require('date-fns/isValid');
var coreComponentsCalendar = require('../calendar');
var coreComponentsIconButton = require('../icon-button');
var coreComponentsInput = require('../input');
var coreComponentsPopover = require('../popover');
var hooks = require('@alfalab/hooks');
var CalendarMIcon = require('@alfalab/icons-glyph/CalendarMIcon');
var utils_format = require('./utils/format.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var dateFnsIsValid__default = /*#__PURE__*/_interopDefaultCompat(dateFnsIsValid);

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

var styles = {"component":"date-range-input__component_qy3ed","calendarContainer":"date-range-input__calendarContainer_qy3ed","calendarResponsive":"date-range-input__calendarResponsive_qy3ed","block":"date-range-input__block_qy3ed"};
require('./components/date-range-input/index.css');

/* eslint-disable no-useless-escape, jsx-a11y/click-events-have-key-events */
var DateRangeInput = React__default.default.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d;
    var className = _a.className, inputClassName = _a.inputClassName, popoverClassName = _a.popoverClassName, disabled = _a.disabled, readOnly = _a.readOnly, picker = _a.picker, _e = _a.defaultValue, defaultValue = _e === void 0 ? '' : _e, propValue = _a.value, onChange = _a.onChange, onComplete = _a.onComplete, rightAddons = _a.rightAddons, useAnchorWidth = _a.useAnchorWidth, block = _a.block, _f = _a.popoverPosition, popoverPosition = _f === void 0 ? 'bottom-start' : _f, zIndexPopover = _a.zIndexPopover, preventFlip = _a.preventFlip, _g = _a.Calendar, Calendar = _g === void 0 ? coreComponentsCalendar.Calendar : _g, _h = _a.calendarProps, calendarProps = _h === void 0 ? {} : _h, defaultMonth = _a.defaultMonth, _j = _a.minDate, minDate = _j === void 0 ? calendarProps.minDate : _j, _k = _a.maxDate, maxDate = _k === void 0 ? calendarProps.maxDate : _k, _l = _a.offDays, offDays = _l === void 0 ? calendarProps.offDays || [] : _l, _m = _a.events, events = _m === void 0 ? calendarProps.events || [] : _m, _o = _a.defaultOpen, defaultOpen = _o === void 0 ? false : _o, _p = _a.view, view = _p === void 0 ? 'desktop' : _p, restProps = __rest(_a, ["className", "inputClassName", "popoverClassName", "disabled", "readOnly", "picker", "defaultValue", "value", "onChange", "onComplete", "rightAddons", "useAnchorWidth", "block", "popoverPosition", "zIndexPopover", "preventFlip", "Calendar", "calendarProps", "defaultMonth", "minDate", "maxDate", "offDays", "events", "defaultOpen", "view"]);
    var inputRef = React.useRef(null);
    var calendarRef = React.useRef(null);
    var _q = React.useState(propValue || defaultValue), value = _q[0], setValue = _q[1];
    var _r = React.useState(false), open = _r[0], setOpen = _r[1];
    var inputDisabled = disabled || readOnly;
    var calendarResponsive = (_d = calendarProps === null || calendarProps === void 0 ? void 0 : calendarProps.responsive) !== null && _d !== void 0 ? _d : true;
    React.useEffect(function () {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    hooks.useDidUpdateEffect(function () {
        var newPropValue = propValue || '';
        setValue(function (prevValue) { return (prevValue === newPropValue ? prevValue : newPropValue); });
    }, [propValue]);
    var handlePeriodChange = function (selectedFrom, selectedTo) {
        if (selectedFrom && !selectedTo && value.length === utils_format.DATE_MASK.length) {
            setValue(utils_format.parseTimestampToDate(selectedFrom));
        }
        else if ((!selectedFrom && !selectedTo && value.length === utils_format.DATE_FORMAT.length) ||
            (selectedFrom === selectedTo && value.length === utils_format.DATE_MASK.length)) {
            setValue('');
        }
        var dateFrom = selectedFrom ? new Date(selectedFrom) : undefined;
        var dateTo = selectedTo ? new Date(selectedTo) : undefined;
        var newValue = [selectedFrom, selectedTo].filter(Boolean)
            .map(function (timestamp) { return utils_format.parseTimestampToDate(timestamp); })
            .join(' - ');
        onChange === null || onChange === void 0 ? void 0 : onChange({
            dateFrom: dateFrom,
            dateTo: dateTo,
            value: newValue,
        });
        if (dateFrom && dateTo) {
            onComplete === null || onComplete === void 0 ? void 0 : onComplete({
                dateFrom: dateFrom,
                dateTo: dateTo,
                value: newValue,
            });
        }
    };
    var _s = coreComponentsCalendar.usePeriod({ onPeriodChange: handlePeriodChange }), selectedFrom = _s.selectedFrom, selectedTo = _s.selectedTo, updatePeriod = _s.updatePeriod, resetPeriod = _s.resetPeriod, setStart = _s.setStart, setEnd = _s.setEnd;
    var handleInputWrapperFocus = function (event) {
        if (view === 'desktop') {
            if (picker) {
                setOpen(true);
            }
            if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                calendarRef.current.focus();
            }
        }
    };
    var handleBlur = function (event) {
        if (view === 'desktop') {
            var target = (event.relatedTarget || document.activeElement);
            if (calendarRef.current && calendarRef.current.contains(target) === false) {
                setOpen(false);
            }
        }
    };
    var handleChange = function (event) {
        var _a, _b;
        var newValue = event.target.value;
        if (newValue.length > utils_format.DATE_MASK.length)
            return;
        // Позволяем вводить только цифры, точки, дефис и пробелы
        if (/[^\d. -]/.test(newValue)) {
            return;
        }
        var dots = newValue.match(/\./g);
        var hyphen = newValue.match(/\-/g);
        // Не даем вводить больше, чем 4 точки и 1 дефис
        if ((dots && dots.length > 4) || (hyphen && hyphen.length > 1)) {
            return;
        }
        var formattedValue = utils_format.format(newValue);
        var dateArr = formattedValue.split(' - ');
        var dateFrom = dateArr[0] ? utils_format.parseDateString(dateArr[0]) : undefined;
        var dateTo = dateArr[1] ? utils_format.parseDateString(dateArr[1]) : undefined;
        if (!dateFrom && !dateTo) {
            resetPeriod();
        }
        else if (selectedFrom && formattedValue.length < utils_format.DATE_FORMAT.length) {
            setStart();
        }
        else if (selectedFrom && selectedTo) {
            setEnd();
        }
        else if (dateFrom &&
            dateFnsIsValid__default.default(dateFrom) &&
            ((_a = dateArr[0]) === null || _a === void 0 ? void 0 : _a.length) === utils_format.DATE_FORMAT.length &&
            dateFrom.getTime() !== selectedFrom) {
            setStart(dateFrom.getTime());
        }
        else if (dateTo &&
            dateFnsIsValid__default.default(dateTo) &&
            ((_b = dateArr[1]) === null || _b === void 0 ? void 0 : _b.length) === utils_format.DATE_FORMAT.length &&
            dateTo.getTime() !== selectedTo) {
            setEnd(dateTo.getTime());
        }
        setValue(formattedValue);
        onChange === null || onChange === void 0 ? void 0 : onChange({ dateFrom: dateFrom, dateTo: dateTo, value: formattedValue }, event);
        if (utils_format.isCompleteDateInput(formattedValue)) {
            var valid = utils_format.isValid(formattedValue, dateArr[0], dateArr[1]);
            if (!valid)
                return;
            if (dateFrom && dateTo) {
                onComplete === null || onComplete === void 0 ? void 0 : onComplete({ dateFrom: dateFrom, dateTo: dateTo, value: formattedValue }, event);
            }
        }
    };
    var handleCalendarClose = function () {
        setOpen(false);
    };
    var handleClear = function () {
        setValue('');
        resetPeriod();
    };
    var handleCalendarChange = function (date) {
        if (date) {
            updatePeriod(date);
        }
    };
    React.useEffect(function () {
        if (selectedFrom && selectedTo) {
            setValue("".concat(utils_format.parseTimestampToDate(selectedFrom), " - ").concat(utils_format.parseTimestampToDate(selectedTo)));
        }
        else if (selectedFrom && value.length < utils_format.DATE_FORMAT.length) {
            setValue(utils_format.parseTimestampToDate(selectedFrom));
        }
    }, [selectedFrom, selectedTo, value]);
    var handleCalendarWrapperMouseDown = function (event) {
        // Не дает инпуту терять фокус при выборе даты
        event.preventDefault();
    };
    var handleIconButtonClick = function () {
        if (!open)
            setOpen(true);
        if (view === 'desktop' && inputRef.current) {
            inputRef.current.focus();
        }
    };
    var renderCalendar = function () { return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React__default.default.createElement("div", { onMouseDown: handleCalendarWrapperMouseDown },
        React__default.default.createElement(Calendar, exports.__assign({}, calendarProps, { responsive: calendarResponsive, open: open, onClose: handleCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })))); };
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, className, (_b = {},
            _b[styles.block] = block,
            _b)), onFocus: inputDisabled ? undefined : handleInputWrapperFocus, onBlur: handleBlur },
        React__default.default.createElement(coreComponentsInput.Input, exports.__assign({}, restProps, { block: block, ref: mergeRefs__default.default([ref, inputRef]), value: value, onChange: handleChange, disabled: disabled, readOnly: readOnly, className: inputClassName, onClear: handleClear, rightAddons: React__default.default.createElement(React__default.default.Fragment, null,
                rightAddons,
                picker && (React__default.default.createElement(coreComponentsIconButton.IconButton, { onClick: inputDisabled ? undefined : handleIconButtonClick, icon: CalendarMIcon.CalendarMIcon, size: 'xxs' }))) })),
        picker && (React__default.default.createElement(coreComponentsPopover.Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputRef.current, popperClassName: cn__default.default(styles.calendarContainer, (_c = {},
                _c[styles.calendarResponsive] = calendarResponsive,
                _c)), className: popoverClassName, position: popoverPosition, offset: [0, 8], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

exports.DateRangeInput = DateRangeInput;
exports.__rest = __rest;
