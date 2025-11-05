import { s as styles, a as __assign } from '../index.module-3369c8fe.js';
import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import startOfMonth from 'date-fns/startOfMonth';
import { isValidInputValue, parseDateString, CalendarInput } from '../../../calendar-input/esm';
import { isCompleteDateInput } from '../../../date-input/esm';
import { Divider } from '../components/divider/Component.js';
import { usePopoverViewMonthes } from '../hooks.js';
import 'date-fns/addMonths';
import 'date-fns/isEqual';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/subMonths';

var CalendarRangePopover = function (_a) {
    var className = _a.className, _b = _a.defaultMonth, defaultMonth = _b === void 0 ? startOfMonth(new Date()).getTime() : _b, minDate = _a.minDate, maxDate = _a.maxDate, _c = _a.valueFrom, valueFrom = _c === void 0 ? '' : _c, _d = _a.valueTo, valueTo = _d === void 0 ? '' : _d, _e = _a.onDateFromChange, onDateFromChange = _e === void 0 ? function () { return null; } : _e, _f = _a.onDateToChange, onDateToChange = _f === void 0 ? function () { return null; } : _f, _g = _a.onChange, onChange = _g === void 0 ? function () { return null; } : _g, onError = _a.onError, _h = _a.inputFromProps, inputFromProps = _h === void 0 ? {} : _h, _j = _a.inputToProps, inputToProps = _j === void 0 ? {} : _j, offDays = _a.offDays, events = _a.events, dataTestId = _a.dataTestId;
    var _k = useState(valueFrom), inputFromValue = _k[0], setInputFromValue = _k[1];
    var _l = useState(valueTo), inputToValue = _l[0], setInputToValue = _l[1];
    /**
     * Ключ для сброса календарей
     * Пользователь открыл календарь, изменил месяц, но ничего не выбрал
     * — при следующем открытии в календаре будет установлен начальный месяц
     */
    var _m = useState(0), resetKey = _m[0], setResetKey = _m[1];
    var dateFrom = isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? parseDateString(inputFromValue).getTime()
        : null;
    var dateTo = isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? parseDateString(inputToValue).getTime()
        : null;
    var _o = useState(isCompleteDateInput(inputFromValue) && dateFrom === null), inputFromInvalid = _o[0], setInputFromInvalid = _o[1];
    var _p = useState(isCompleteDateInput(inputToValue) && dateTo === null), inputToInvalid = _p[0], setInputToInvalid = _p[1];
    var bothInvalid = isCompleteDateInput(inputFromValue) &&
        isCompleteDateInput(inputToValue) &&
        parseDateString(inputFromValue).getTime() > parseDateString(inputToValue).getTime();
    var hasValidateError = inputFromInvalid || inputToInvalid || bothInvalid;
    var _q = usePopoverViewMonthes({
        dateFrom: dateFrom,
        dateTo: dateTo,
        defaultMonth: defaultMonth,
        resetKey: resetKey,
    }), monthFrom = _q.monthFrom, monthTo = _q.monthTo, handleMonthFromChange = _q.handleMonthFromChange, handleMonthToChange = _q.handleMonthToChange;
    var handleValidInputFrom = useCallback(function () {
        setInputFromInvalid(inputFromValue !== '' && !isValidInputValue(inputFromValue, minDate, maxDate, offDays));
    }, [inputFromValue, maxDate, minDate, offDays]);
    var handleValidInputTo = useCallback(function () {
        setInputToInvalid(inputToValue !== '' &&
            !isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays));
    }, [dateFrom, inputToValue, maxDate, minDate, offDays]);
    var handleInputFromChange = useCallback(function (_, payload) {
        setInputFromValue(payload.value);
    }, []);
    var handleInputToChange = useCallback(function (_, payload) {
        setInputToValue(payload.value);
    }, []);
    var handleInputFromBlur = useCallback(function () {
        handleValidInputFrom();
        setResetKey(+new Date());
    }, [handleValidInputFrom]);
    var handleInputToBlur = useCallback(function () {
        handleValidInputTo();
        setResetKey(+new Date());
    }, [handleValidInputTo]);
    var handleFromChange = useCallback(function (_, payload) {
        setInputFromValue(payload.value);
    }, []);
    var handleToChange = useCallback(function (_, payload) {
        setInputToValue(payload.value);
    }, []);
    useEffect(function () {
        setInputFromValue(valueFrom);
    }, [valueFrom]);
    useEffect(function () {
        setInputToValue(valueTo);
    }, [valueTo]);
    useEffect(function () {
        onDateFromChange({ value: inputFromValue, date: dateFrom });
        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom: dateFrom,
            dateTo: dateTo,
        });
        if (!inputFromValue || isCompleteDateInput(inputFromValue)) {
            handleValidInputFrom();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFromValue]);
    useEffect(function () {
        onDateToChange({ value: inputToValue, date: dateTo });
        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom: dateFrom,
            dateTo: dateTo,
        });
        if (!inputToValue || isCompleteDateInput(inputToValue)) {
            handleValidInputTo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToValue]);
    useEffect(function () {
        if (onError) {
            onError(hasValidateError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasValidateError]);
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement(CalendarInput, __assign({}, inputFromProps, { useAnchorWidth: false, calendarPosition: 'popover', popoverPosition: 'bottom-start', error: inputFromInvalid || bothInvalid || inputFromProps.error, onChange: handleFromChange, onInputChange: handleInputFromChange, onBlur: handleInputFromBlur, value: inputFromValue, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events, calendarProps: __assign(__assign({}, inputFromProps.calendarProps), { month: monthFrom, onMonthChange: handleMonthFromChange, selectorView: 'full' }) })),
        React.createElement(Divider, { inputFromProps: inputFromProps, inputToProps: inputToProps }),
        React.createElement(CalendarInput, __assign({}, inputToProps, { useAnchorWidth: false, calendarPosition: 'popover', popoverPosition: 'bottom-end', error: inputToInvalid || bothInvalid || inputToProps.error, onChange: handleToChange, onInputChange: handleInputToChange, onBlur: handleInputToBlur, value: inputToValue, minDate: dateFrom || minDate, maxDate: maxDate, offDays: offDays, events: events, calendarProps: __assign(__assign({}, inputToProps.calendarProps), { month: monthTo, onMonthChange: handleMonthToChange, selectorView: 'full' }) }))));
};

export { CalendarRangePopover };
