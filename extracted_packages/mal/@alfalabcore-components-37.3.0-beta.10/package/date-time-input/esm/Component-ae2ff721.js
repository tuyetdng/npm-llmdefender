import React, { useRef, useState, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Calendar, dateInLimits } from '../../calendar/esm';
import { IconButton } from '../../icon-button/esm';
import { Input } from '../../input/esm';
import { Popover } from '../../popover/esm';
import { useDidUpdateEffect } from '@alfalab/hooks';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { getDateWithoutTime, DATE_WITH_TIME_LENGTH, format, getFullDateTime, isCompleteDateInput, isValid, addTimeToDate, parseTimestampToDate } from './utils/format.js';
import 'date-fns/isValid';
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

var styles = {"component":"date-time-input__component_oixy4","calendarContainer":"date-time-input__calendarContainer_oixy4","calendarResponsive":"date-time-input__calendarResponsive_oixy4","block":"date-time-input__block_oixy4"};
require('./components/date-time-input/index.css');

/* eslint-disable no-useless-escape, jsx-a11y/click-events-have-key-events */
var DateTimeInput = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d;
    var className = _a.className, inputClassName = _a.inputClassName, popoverClassName = _a.popoverClassName, disabled = _a.disabled, readOnly = _a.readOnly, picker = _a.picker, _e = _a.defaultValue, defaultValue = _e === void 0 ? '' : _e, propValue = _a.value, onChange = _a.onChange, onComplete = _a.onComplete, rightAddons = _a.rightAddons, useAnchorWidth = _a.useAnchorWidth, block = _a.block, _f = _a.popoverPosition, popoverPosition = _f === void 0 ? 'bottom-start' : _f, zIndexPopover = _a.zIndexPopover, preventFlip = _a.preventFlip, _g = _a.Calendar, Calendar$1 = _g === void 0 ? Calendar : _g, _h = _a.calendarProps, calendarProps = _h === void 0 ? {} : _h, defaultMonth = _a.defaultMonth, _j = _a.minDate, minDate = _j === void 0 ? calendarProps.minDate : _j, _k = _a.maxDate, maxDate = _k === void 0 ? calendarProps.maxDate : _k, _l = _a.offDays, offDays = _l === void 0 ? calendarProps.offDays || [] : _l, _m = _a.events, events = _m === void 0 ? calendarProps.events || [] : _m, _o = _a.defaultOpen, defaultOpen = _o === void 0 ? false : _o, error = _a.error, _p = _a.view, view = _p === void 0 ? 'desktop' : _p, restProps = __rest(_a, ["className", "inputClassName", "popoverClassName", "disabled", "readOnly", "picker", "defaultValue", "value", "onChange", "onComplete", "rightAddons", "useAnchorWidth", "block", "popoverPosition", "zIndexPopover", "preventFlip", "Calendar", "calendarProps", "defaultMonth", "minDate", "maxDate", "offDays", "events", "defaultOpen", "error", "view"]);
    var inputRef = useRef(null);
    var calendarRef = useRef(null);
    var _q = useState(propValue || defaultValue), value = _q[0], setValue = _q[1];
    var _r = useState(false), open = _r[0], setOpen = _r[1];
    var calendarValue = value ? getDateWithoutTime(value).getTime() : undefined;
    var inputDisabled = disabled || readOnly;
    var calendarResponsive = (_d = calendarProps === null || calendarProps === void 0 ? void 0 : calendarProps.responsive) !== null && _d !== void 0 ? _d : true;
    useEffect(function () {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    useDidUpdateEffect(function () {
        var newPropValue = propValue || '';
        setValue(function (prevValue) { return (prevValue === propValue ? prevValue : newPropValue); });
    }, [propValue]);
    var checkInputValueIsValid = function (newInputValue) {
        if (!newInputValue || error)
            return false;
        var dateValue = getDateWithoutTime(newInputValue).getTime();
        return (dateValue &&
            dateInLimits(dateValue, minDate, maxDate) &&
            !offDays.includes(dateValue));
    };
    var setTimeToDate = function () {
        setValue(function (prevValue) {
            var dateWithTime = addTimeToDate(prevValue);
            if (dateWithTime !== prevValue && dateWithTime.length === DATE_WITH_TIME_LENGTH) {
                onComplete === null || onComplete === void 0 ? void 0 : onComplete(null, {
                    date: getFullDateTime(dateWithTime),
                    value: dateWithTime,
                });
            }
            return dateWithTime;
        });
    };
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
                setTimeToDate();
            }
        }
    };
    var handleChange = function (event) {
        var newValue = event.target.value;
        if (newValue.length > DATE_WITH_TIME_LENGTH)
            return;
        // Позволяем вводить только цифры, точки, запятую, двоеточие и пробел
        if (/[^\d., :]/.test(newValue)) {
            return;
        }
        var dots = newValue.match(/\./g);
        var colon = newValue.match(/:/g);
        var comma = newValue.match(/,/g);
        // Не даем вводить больше, чем 2 точки, 1 двоеточие и 1 запятую
        if ((dots && dots.length > 2) ||
            (colon && colon.length > 1) ||
            (comma && comma.length > 1)) {
            return;
        }
        var formattedValue = format(newValue);
        var date = getFullDateTime(formattedValue);
        setValue(formattedValue);
        if (onChange)
            onChange(event, { date: date, value: formattedValue });
        if (isCompleteDateInput(formattedValue)) {
            var valid = isValid(formattedValue);
            if (!valid)
                return;
            if (onComplete) {
                onComplete(event, { date: date, value: formattedValue });
            }
        }
    };
    var handleMobileCalendarClose = function () {
        setOpen(false);
        setTimeToDate();
    };
    var handleClear = function () {
        setValue('');
    };
    var handleCalendarChange = function (date) {
        if (date) {
            var newValue = parseTimestampToDate(date);
            setValue(newValue);
            onChange === null || onChange === void 0 ? void 0 : onChange(null, { date: getFullDateTime(newValue), value: newValue });
        }
    };
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
        React.createElement(Calendar$1, __assign({}, calendarProps, { responsive: calendarResponsive, open: open, onClose: handleMobileCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, value: checkInputValueIsValid(value) ? calendarValue : undefined, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })))); };
    return (React.createElement("div", { className: cn(styles.component, className, (_b = {},
            _b[styles.block] = block,
            _b)), onFocus: inputDisabled ? undefined : handleInputWrapperFocus, onBlur: handleBlur },
        React.createElement(Input, __assign({}, restProps, { block: block, ref: mergeRefs([ref, inputRef]), value: value, onChange: handleChange, disabled: disabled, readOnly: readOnly, className: inputClassName, onClear: handleClear, error: error, rightAddons: React.createElement(React.Fragment, null,
                rightAddons,
                picker && (React.createElement(IconButton, { onClick: inputDisabled ? undefined : handleIconButtonClick, icon: CalendarMIcon, size: 'xxs' }))) })),
        picker && (React.createElement(Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputRef.current, popperClassName: cn(styles.calendarContainer, (_c = {},
                _c[styles.calendarResponsive] = calendarResponsive,
                _c)), className: popoverClassName, position: popoverPosition, offset: [0, 8], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

export { DateTimeInput as D, __assign as _, __rest as a };
