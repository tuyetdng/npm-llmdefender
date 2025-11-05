import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { dateInLimits, Calendar } from '../../calendar/esm';
import { parseDateString, isCompleteDateInput, formatDate, DateInput } from '../../date-input/esm';
import { Popover } from '../../popover/esm';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { SUPPORTS_INPUT_TYPE_DATE } from './utils.js';
import 'date-fns/format';
import 'date-fns/isSameDay';
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

var styles = {"component":"calendar-input__component_lskkj","block":"calendar-input__block_lskkj","calendarContainer":"calendar-input__calendarContainer_lskkj","calendarResponsive":"calendar-input__calendarResponsive_lskkj","calendarIcon":"calendar-input__calendarIcon_lskkj","nativeInput":"calendar-input__nativeInput_lskkj"};
require('./components/calendar-input/index.css');

var CalendarInput = forwardRef(function (_a, ref) {
    var _b, _c;
    var _d;
    var _e = _a.block, block = _e === void 0 ? false : _e, className = _a.className; _a.inputClassName; var popoverClassName = _a.popoverClassName, _f = _a.defaultOpen, defaultOpen = _f === void 0 ? false : _f, defaultMonth = _a.defaultMonth, _g = _a.defaultValue, defaultValue = _g === void 0 ? '' : _g, _h = _a.calendarPosition, calendarPosition = _h === void 0 ? 'popover' : _h, value = _a.value, dataTestId = _a.dataTestId, _j = _a.calendarProps, calendarProps = _j === void 0 ? {} : _j, _k = _a.minDate, minDate = _k === void 0 ? calendarProps.minDate : _k, _l = _a.maxDate, maxDate = _l === void 0 ? calendarProps.maxDate : _l, _m = _a.offDays, offDays = _m === void 0 ? calendarProps.offDays || [] : _m, _o = _a.events, events = _o === void 0 ? calendarProps.events || [] : _o, preventFlip = _a.preventFlip, _p = _a.mobileMode, mobileMode = _p === void 0 ? 'popover' : _p, _q = _a.wrapperRef, wrapperRef = _q === void 0 ? null : _q, disabled = _a.disabled, _r = _a.onChange, onChange = _r === void 0 ? function () { return null; } : _r, onInputChange = _a.onInputChange, onCalendarChange = _a.onCalendarChange, onKeyDown = _a.onKeyDown, readOnly = _a.readOnly, _s = _a.Calendar, Calendar$1 = _s === void 0 ? Calendar : _s, _t = _a.popoverPosition, popoverPosition = _t === void 0 ? 'bottom-start' : _t, zIndexPopover = _a.zIndexPopover, useAnchorWidth = _a.useAnchorWidth, rightAddons = _a.rightAddons, error = _a.error, _u = _a.view, view = _u === void 0 ? 'desktop' : _u, restProps = __rest(_a, ["block", "className", "inputClassName", "popoverClassName", "defaultOpen", "defaultMonth", "defaultValue", "calendarPosition", "value", "dataTestId", "calendarProps", "minDate", "maxDate", "offDays", "events", "preventFlip", "mobileMode", "wrapperRef", "disabled", "onChange", "onInputChange", "onCalendarChange", "onKeyDown", "readOnly", "Calendar", "popoverPosition", "zIndexPopover", "useAnchorWidth", "rightAddons", "error", "view"]);
    var calendarResponsive = (_d = calendarProps === null || calendarProps === void 0 ? void 0 : calendarProps.responsive) !== null && _d !== void 0 ? _d : true;
    var shouldRenderNative = SUPPORTS_INPUT_TYPE_DATE && mobileMode === 'native';
    var shouldRenderOnlyInput = mobileMode === 'input';
    var shouldRenderStatic = calendarPosition === 'static' && !shouldRenderOnlyInput;
    var shouldRenderPopover = calendarPosition === 'popover' && !shouldRenderNative && !shouldRenderOnlyInput;
    var _v = useState(false), open = _v[0], setOpen = _v[1];
    var _w = useState(value || defaultValue), inputValue = _w[0], setInputValue = _w[1];
    var calendarValue = inputValue ? parseDateString(inputValue).getTime() : undefined;
    var checkInputValueIsValid = useCallback(function (newInputValue) {
        if (!newInputValue)
            return false;
        var dateValue = parseDateString(newInputValue).getTime();
        return !!(dateValue &&
            isCompleteDateInput(newInputValue) &&
            dateInLimits(dateValue, minDate, maxDate) &&
            !offDays.includes(dateValue));
    }, [maxDate, minDate, offDays]);
    var inputDisabled = disabled || readOnly;
    var inputWrapperRef = useRef(null);
    var calendarRef = useRef(null);
    var handleKeyDown = useCallback(function (event) {
        if (event.target.tagName === 'INPUT' && event.key === 'Enter') {
            setOpen(!open);
        }
        if (event.key === 'Escape') {
            setOpen(false);
        }
    }, [open]);
    var handleClick = useCallback(function () {
        if (!open)
            setOpen(true);
    }, [open]);
    var handleFocus = useCallback(function (event) {
        if (view === 'desktop') {
            setOpen(true);
            if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                calendarRef.current.focus();
            }
        }
    }, [open, view]);
    var handleBlur = useCallback(function (event) {
        if (view === 'desktop') {
            var target = (event.relatedTarget || document.activeElement);
            if (calendarRef.current && calendarRef.current.contains(target) === false) {
                setOpen(false);
            }
        }
    }, [view]);
    var handleInputKeyDown = useCallback(function (event) {
        if (['ArrowDown', 'ArrowUp'].includes(event.key) && calendarRef.current) {
            event.preventDefault();
            calendarRef.current.focus();
        }
        if (onKeyDown)
            onKeyDown(event);
    }, [onKeyDown]);
    var changeHandler = useCallback(function (event, newValue, newDate, initiator, shouldChange) {
        if (initiator === void 0) { initiator = 'input'; }
        if (shouldChange === void 0) { shouldChange = true; }
        if (initiator === 'input' && event && onInputChange) {
            onInputChange(event, { value: newValue, date: newDate });
        }
        if (initiator === 'calendar' && onCalendarChange) {
            onCalendarChange(newDate.getTime());
        }
        setInputValue(newValue);
        if (shouldChange) {
            onChange(event, { date: newDate, value: newValue });
        }
    }, [onCalendarChange, onChange, onInputChange]);
    var handleInputChange = useCallback(function (event, payload) {
        changeHandler(event, payload.value, payload.date, 'input', !payload.value || checkInputValueIsValid(payload.value));
    }, [changeHandler, checkInputValueIsValid]);
    var handleCalendarChange = useCallback(function (date) {
        if (date) {
            changeHandler(null, formatDate(date), new Date(date), 'calendar');
        }
        if (view === 'desktop') {
            setOpen(false);
        }
    }, [changeHandler, view]);
    var handleCalendarWrapperMouseDown = useCallback(function (event) {
        // Не дает инпуту терять фокус при выборе даты
        event.preventDefault();
    }, []);
    var handleCalendarClose = useCallback(function () {
        setOpen(false);
    }, []);
    useEffect(function () {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    useEffect(function () {
        if (typeof value !== 'undefined') {
            setInputValue(value);
        }
    }, [value]);
    var renderCalendar = function () { return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", { onMouseDown: handleCalendarWrapperMouseDown },
        React.createElement(Calendar$1, __assign({}, calendarProps, { responsive: calendarResponsive, open: open, onClose: handleCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, value: checkInputValueIsValid(inputValue) ? calendarValue : undefined, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })))); };
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", { className: cn(styles.component, className, (_b = {},
            _b[styles.block] = block,
            _b)), tabIndex: -1, onKeyDown: inputDisabled ? undefined : handleKeyDown, onClick: inputDisabled ? undefined : handleClick, onFocus: inputDisabled ? undefined : handleFocus, onBlur: handleBlur, "data-test-id": dataTestId },
        React.createElement(DateInput, __assign({}, restProps, { ref: ref, wrapperRef: mergeRefs([wrapperRef, inputWrapperRef]), value: inputValue, defaultValue: defaultValue, disabled: disabled, readOnly: readOnly, mobileMode: mobileMode === 'native' ? 'native' : 'input', error: error, rightAddons: React.createElement(React.Fragment, null,
                rightAddons,
                shouldRenderPopover && (React.createElement(CalendarMIcon, { className: styles.calendarIcon }))), onKeyDown: handleInputKeyDown, onChange: handleInputChange, block: true })),
        shouldRenderStatic && renderCalendar(),
        shouldRenderPopover && (React.createElement(Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputWrapperRef.current, popperClassName: cn(styles.calendarContainer, (_c = {},
                _c[styles.calendarResponsive] = calendarResponsive,
                _c)), className: popoverClassName, position: popoverPosition, offset: [0, 4], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

export { CalendarInput as C, __assign as _, __rest as a };
