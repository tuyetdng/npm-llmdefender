var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsCalendar = require('../calendar');
var coreComponentsDateInput = require('../date-input');
var coreComponentsPopover = require('../popover');
var CalendarMIcon = require('@alfalab/icons-glyph/CalendarMIcon');
var utils = require('./utils.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
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

var styles = {"component":"calendar-input__component_lskkj","block":"calendar-input__block_lskkj","calendarContainer":"calendar-input__calendarContainer_lskkj","calendarResponsive":"calendar-input__calendarResponsive_lskkj","calendarIcon":"calendar-input__calendarIcon_lskkj","nativeInput":"calendar-input__nativeInput_lskkj"};
require('./components/calendar-input/index.css');

var CalendarInput = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d;
    var _e = _a.block, block = _e === void 0 ? false : _e, className = _a.className; _a.inputClassName; var popoverClassName = _a.popoverClassName, _f = _a.defaultOpen, defaultOpen = _f === void 0 ? false : _f, defaultMonth = _a.defaultMonth, _g = _a.defaultValue, defaultValue = _g === void 0 ? '' : _g, _h = _a.calendarPosition, calendarPosition = _h === void 0 ? 'popover' : _h, value = _a.value, dataTestId = _a.dataTestId, _j = _a.calendarProps, calendarProps = _j === void 0 ? {} : _j, _k = _a.minDate, minDate = _k === void 0 ? calendarProps.minDate : _k, _l = _a.maxDate, maxDate = _l === void 0 ? calendarProps.maxDate : _l, _m = _a.offDays, offDays = _m === void 0 ? calendarProps.offDays || [] : _m, _o = _a.events, events = _o === void 0 ? calendarProps.events || [] : _o, preventFlip = _a.preventFlip, _p = _a.mobileMode, mobileMode = _p === void 0 ? 'popover' : _p, _q = _a.wrapperRef, wrapperRef = _q === void 0 ? null : _q, disabled = _a.disabled, _r = _a.onChange, onChange = _r === void 0 ? function () { return null; } : _r, onInputChange = _a.onInputChange, onCalendarChange = _a.onCalendarChange, onKeyDown = _a.onKeyDown, readOnly = _a.readOnly, _s = _a.Calendar, Calendar = _s === void 0 ? coreComponentsCalendar.Calendar : _s, _t = _a.popoverPosition, popoverPosition = _t === void 0 ? 'bottom-start' : _t, zIndexPopover = _a.zIndexPopover, useAnchorWidth = _a.useAnchorWidth, rightAddons = _a.rightAddons, error = _a.error, _u = _a.view, view = _u === void 0 ? 'desktop' : _u, restProps = __rest(_a, ["block", "className", "inputClassName", "popoverClassName", "defaultOpen", "defaultMonth", "defaultValue", "calendarPosition", "value", "dataTestId", "calendarProps", "minDate", "maxDate", "offDays", "events", "preventFlip", "mobileMode", "wrapperRef", "disabled", "onChange", "onInputChange", "onCalendarChange", "onKeyDown", "readOnly", "Calendar", "popoverPosition", "zIndexPopover", "useAnchorWidth", "rightAddons", "error", "view"]);
    var calendarResponsive = (_d = calendarProps === null || calendarProps === void 0 ? void 0 : calendarProps.responsive) !== null && _d !== void 0 ? _d : true;
    var shouldRenderNative = utils.SUPPORTS_INPUT_TYPE_DATE && mobileMode === 'native';
    var shouldRenderOnlyInput = mobileMode === 'input';
    var shouldRenderStatic = calendarPosition === 'static' && !shouldRenderOnlyInput;
    var shouldRenderPopover = calendarPosition === 'popover' && !shouldRenderNative && !shouldRenderOnlyInput;
    var _v = React.useState(false), open = _v[0], setOpen = _v[1];
    var _w = React.useState(value || defaultValue), inputValue = _w[0], setInputValue = _w[1];
    var calendarValue = inputValue ? coreComponentsDateInput.parseDateString(inputValue).getTime() : undefined;
    var checkInputValueIsValid = React.useCallback(function (newInputValue) {
        if (!newInputValue)
            return false;
        var dateValue = coreComponentsDateInput.parseDateString(newInputValue).getTime();
        return !!(dateValue &&
            coreComponentsDateInput.isCompleteDateInput(newInputValue) &&
            coreComponentsCalendar.dateInLimits(dateValue, minDate, maxDate) &&
            !offDays.includes(dateValue));
    }, [maxDate, minDate, offDays]);
    var inputDisabled = disabled || readOnly;
    var inputWrapperRef = React.useRef(null);
    var calendarRef = React.useRef(null);
    var handleKeyDown = React.useCallback(function (event) {
        if (event.target.tagName === 'INPUT' && event.key === 'Enter') {
            setOpen(!open);
        }
        if (event.key === 'Escape') {
            setOpen(false);
        }
    }, [open]);
    var handleClick = React.useCallback(function () {
        if (!open)
            setOpen(true);
    }, [open]);
    var handleFocus = React.useCallback(function (event) {
        if (view === 'desktop') {
            setOpen(true);
            if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                calendarRef.current.focus();
            }
        }
    }, [open, view]);
    var handleBlur = React.useCallback(function (event) {
        if (view === 'desktop') {
            var target = (event.relatedTarget || document.activeElement);
            if (calendarRef.current && calendarRef.current.contains(target) === false) {
                setOpen(false);
            }
        }
    }, [view]);
    var handleInputKeyDown = React.useCallback(function (event) {
        if (['ArrowDown', 'ArrowUp'].includes(event.key) && calendarRef.current) {
            event.preventDefault();
            calendarRef.current.focus();
        }
        if (onKeyDown)
            onKeyDown(event);
    }, [onKeyDown]);
    var changeHandler = React.useCallback(function (event, newValue, newDate, initiator, shouldChange) {
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
    var handleInputChange = React.useCallback(function (event, payload) {
        changeHandler(event, payload.value, payload.date, 'input', !payload.value || checkInputValueIsValid(payload.value));
    }, [changeHandler, checkInputValueIsValid]);
    var handleCalendarChange = React.useCallback(function (date) {
        if (date) {
            changeHandler(null, coreComponentsDateInput.formatDate(date), new Date(date), 'calendar');
        }
        if (view === 'desktop') {
            setOpen(false);
        }
    }, [changeHandler, view]);
    var handleCalendarWrapperMouseDown = React.useCallback(function (event) {
        // Не дает инпуту терять фокус при выборе даты
        event.preventDefault();
    }, []);
    var handleCalendarClose = React.useCallback(function () {
        setOpen(false);
    }, []);
    React.useEffect(function () {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    React.useEffect(function () {
        if (typeof value !== 'undefined') {
            setInputValue(value);
        }
    }, [value]);
    var renderCalendar = function () { return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React__default.default.createElement("div", { onMouseDown: handleCalendarWrapperMouseDown },
        React__default.default.createElement(Calendar, exports.__assign({}, calendarProps, { responsive: calendarResponsive, open: open, onClose: handleCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, value: checkInputValueIsValid(inputValue) ? calendarValue : undefined, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })))); };
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React__default.default.createElement("div", { className: cn__default.default(styles.component, className, (_b = {},
            _b[styles.block] = block,
            _b)), tabIndex: -1, onKeyDown: inputDisabled ? undefined : handleKeyDown, onClick: inputDisabled ? undefined : handleClick, onFocus: inputDisabled ? undefined : handleFocus, onBlur: handleBlur, "data-test-id": dataTestId },
        React__default.default.createElement(coreComponentsDateInput.DateInput, exports.__assign({}, restProps, { ref: ref, wrapperRef: mergeRefs__default.default([wrapperRef, inputWrapperRef]), value: inputValue, defaultValue: defaultValue, disabled: disabled, readOnly: readOnly, mobileMode: mobileMode === 'native' ? 'native' : 'input', error: error, rightAddons: React__default.default.createElement(React__default.default.Fragment, null,
                rightAddons,
                shouldRenderPopover && (React__default.default.createElement(CalendarMIcon.CalendarMIcon, { className: styles.calendarIcon }))), onKeyDown: handleInputKeyDown, onChange: handleInputChange, block: true })),
        shouldRenderStatic && renderCalendar(),
        shouldRenderPopover && (React__default.default.createElement(coreComponentsPopover.Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputWrapperRef.current, popperClassName: cn__default.default(styles.calendarContainer, (_c = {},
                _c[styles.calendarResponsive] = calendarResponsive,
                _c)), className: popoverClassName, position: popoverPosition, offset: [0, 4], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

exports.CalendarInput = CalendarInput;
exports.__rest = __rest;
