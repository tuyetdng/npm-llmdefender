import React, { useRef, useState, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import dateFnsIsValid from 'date-fns/isValid';
import { usePeriod, Calendar } from '../../calendar/esm';
import { IconButton } from '../../icon-button/esm';
import { Input } from '../../input/esm';
import { Popover } from '../../popover/esm';
import { useDidUpdateEffect } from '@alfalab/hooks';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { parseTimestampToDate, DATE_FORMAT, DATE_MASK, format, parseDateString, isCompleteDateInput, isValid } from './utils/format.js';
import 'date-fns/parse';

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

var styles = {"component":"date-range-input__component_qy3ed","calendarContainer":"date-range-input__calendarContainer_qy3ed","calendarResponsive":"date-range-input__calendarResponsive_qy3ed","block":"date-range-input__block_qy3ed"};
require('./components/date-range-input/index.css');

/* eslint-disable no-useless-escape, jsx-a11y/click-events-have-key-events */
var DateRangeInput = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d;
    var className = _a.className, inputClassName = _a.inputClassName, popoverClassName = _a.popoverClassName, disabled = _a.disabled, readOnly = _a.readOnly, picker = _a.picker, _e = _a.defaultValue, defaultValue = _e === void 0 ? '' : _e, propValue = _a.value, onChange = _a.onChange, onComplete = _a.onComplete, rightAddons = _a.rightAddons, useAnchorWidth = _a.useAnchorWidth, block = _a.block, _f = _a.popoverPosition, popoverPosition = _f === void 0 ? 'bottom-start' : _f, zIndexPopover = _a.zIndexPopover, preventFlip = _a.preventFlip, _g = _a.Calendar, Calendar$1 = _g === void 0 ? Calendar : _g, _h = _a.calendarProps, calendarProps = _h === void 0 ? {} : _h, defaultMonth = _a.defaultMonth, _j = _a.minDate, minDate = _j === void 0 ? calendarProps.minDate : _j, _k = _a.maxDate, maxDate = _k === void 0 ? calendarProps.maxDate : _k, _l = _a.offDays, offDays = _l === void 0 ? calendarProps.offDays || [] : _l, _m = _a.events, events = _m === void 0 ? calendarProps.events || [] : _m, _o = _a.defaultOpen, defaultOpen = _o === void 0 ? false : _o, _p = _a.view, view = _p === void 0 ? 'desktop' : _p, restProps = __rest(_a, ["className", "inputClassName", "popoverClassName", "disabled", "readOnly", "picker", "defaultValue", "value", "onChange", "onComplete", "rightAddons", "useAnchorWidth", "block", "popoverPosition", "zIndexPopover", "preventFlip", "Calendar", "calendarProps", "defaultMonth", "minDate", "maxDate", "offDays", "events", "defaultOpen", "view"]);
    var inputRef = useRef(null);
    var calendarRef = useRef(null);
    var _q = useState(propValue || defaultValue), value = _q[0], setValue = _q[1];
    var _r = useState(false), open = _r[0], setOpen = _r[1];
    var inputDisabled = disabled || readOnly;
    var calendarResponsive = (_d = calendarProps === null || calendarProps === void 0 ? void 0 : calendarProps.responsive) !== null && _d !== void 0 ? _d : true;
    useEffect(function () {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    useDidUpdateEffect(function () {
        var newPropValue = propValue || '';
        setValue(function (prevValue) { return (prevValue === newPropValue ? prevValue : newPropValue); });
    }, [propValue]);
    var handlePeriodChange = function (selectedFrom, selectedTo) {
        if (selectedFrom && !selectedTo && value.length === DATE_MASK.length) {
            setValue(parseTimestampToDate(selectedFrom));
        }
        else if ((!selectedFrom && !selectedTo && value.length === DATE_FORMAT.length) ||
            (selectedFrom === selectedTo && value.length === DATE_MASK.length)) {
            setValue('');
        }
        var dateFrom = selectedFrom ? new Date(selectedFrom) : undefined;
        var dateTo = selectedTo ? new Date(selectedTo) : undefined;
        var newValue = [selectedFrom, selectedTo].filter(Boolean)
            .map(function (timestamp) { return parseTimestampToDate(timestamp); })
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
    var _s = usePeriod({ onPeriodChange: handlePeriodChange }), selectedFrom = _s.selectedFrom, selectedTo = _s.selectedTo, updatePeriod = _s.updatePeriod, resetPeriod = _s.resetPeriod, setStart = _s.setStart, setEnd = _s.setEnd;
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
        if (newValue.length > DATE_MASK.length)
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
        var formattedValue = format(newValue);
        var dateArr = formattedValue.split(' - ');
        var dateFrom = dateArr[0] ? parseDateString(dateArr[0]) : undefined;
        var dateTo = dateArr[1] ? parseDateString(dateArr[1]) : undefined;
        if (!dateFrom && !dateTo) {
            resetPeriod();
        }
        else if (selectedFrom && formattedValue.length < DATE_FORMAT.length) {
            setStart();
        }
        else if (selectedFrom && selectedTo) {
            setEnd();
        }
        else if (dateFrom &&
            dateFnsIsValid(dateFrom) &&
            ((_a = dateArr[0]) === null || _a === void 0 ? void 0 : _a.length) === DATE_FORMAT.length &&
            dateFrom.getTime() !== selectedFrom) {
            setStart(dateFrom.getTime());
        }
        else if (dateTo &&
            dateFnsIsValid(dateTo) &&
            ((_b = dateArr[1]) === null || _b === void 0 ? void 0 : _b.length) === DATE_FORMAT.length &&
            dateTo.getTime() !== selectedTo) {
            setEnd(dateTo.getTime());
        }
        setValue(formattedValue);
        onChange === null || onChange === void 0 ? void 0 : onChange({ dateFrom: dateFrom, dateTo: dateTo, value: formattedValue }, event);
        if (isCompleteDateInput(formattedValue)) {
            var valid = isValid(formattedValue, dateArr[0], dateArr[1]);
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
    useEffect(function () {
        if (selectedFrom && selectedTo) {
            setValue("".concat(parseTimestampToDate(selectedFrom), " - ").concat(parseTimestampToDate(selectedTo)));
        }
        else if (selectedFrom && value.length < DATE_FORMAT.length) {
            setValue(parseTimestampToDate(selectedFrom));
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
    React.createElement("div", { onMouseDown: handleCalendarWrapperMouseDown },
        React.createElement(Calendar$1, __assign({}, calendarProps, { responsive: calendarResponsive, open: open, onClose: handleCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })))); };
    return (React.createElement("div", { className: cn(styles.component, className, (_b = {},
            _b[styles.block] = block,
            _b)), onFocus: inputDisabled ? undefined : handleInputWrapperFocus, onBlur: handleBlur },
        React.createElement(Input, __assign({}, restProps, { block: block, ref: mergeRefs([ref, inputRef]), value: value, onChange: handleChange, disabled: disabled, readOnly: readOnly, className: inputClassName, onClear: handleClear, rightAddons: React.createElement(React.Fragment, null,
                rightAddons,
                picker && (React.createElement(IconButton, { onClick: inputDisabled ? undefined : handleIconButtonClick, icon: CalendarMIcon, size: 'xxs' }))) })),
        picker && (React.createElement(Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputRef.current, popperClassName: cn(styles.calendarContainer, (_c = {},
                _c[styles.calendarResponsive] = calendarResponsive,
                _c)), className: popoverClassName, position: popoverPosition, offset: [0, 8], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

export { DateRangeInput as D, __assign as _, __rest as a };
