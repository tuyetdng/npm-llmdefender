import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import startOfMonth from 'date-fns/startOfMonth';
import { isValidInputValue, parseDateString, CalendarInput } from '../../../calendar-input/modern';
import { isCompleteDateInput } from '../../../date-input/modern';
import { Divider } from '../components/divider/Component.js';
import { usePopoverViewMonthes } from '../hooks.js';
import { s as styles } from '../index.module-249f068b.js';
import 'date-fns/addMonths';
import 'date-fns/isEqual';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/subMonths';

const CalendarRangePopover = ({ className, defaultMonth = startOfMonth(new Date()).getTime(), minDate, maxDate, valueFrom = '', valueTo = '', onDateFromChange = () => null, onDateToChange = () => null, onChange = () => null, onError, inputFromProps = {}, inputToProps = {}, offDays, events, dataTestId, }) => {
    const [inputFromValue, setInputFromValue] = useState(valueFrom);
    const [inputToValue, setInputToValue] = useState(valueTo);
    /**
     * Ключ для сброса календарей
     * Пользователь открыл календарь, изменил месяц, но ничего не выбрал
     * — при следующем открытии в календаре будет установлен начальный месяц
     */
    const [resetKey, setResetKey] = useState(0);
    const dateFrom = isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? parseDateString(inputFromValue).getTime()
        : null;
    const dateTo = isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? parseDateString(inputToValue).getTime()
        : null;
    const [inputFromInvalid, setInputFromInvalid] = useState(isCompleteDateInput(inputFromValue) && dateFrom === null);
    const [inputToInvalid, setInputToInvalid] = useState(isCompleteDateInput(inputToValue) && dateTo === null);
    const bothInvalid = isCompleteDateInput(inputFromValue) &&
        isCompleteDateInput(inputToValue) &&
        parseDateString(inputFromValue).getTime() > parseDateString(inputToValue).getTime();
    const hasValidateError = inputFromInvalid || inputToInvalid || bothInvalid;
    const { monthFrom, monthTo, handleMonthFromChange, handleMonthToChange } = usePopoverViewMonthes({
        dateFrom,
        dateTo,
        defaultMonth,
        resetKey,
    });
    const handleValidInputFrom = useCallback(() => {
        setInputFromInvalid(inputFromValue !== '' && !isValidInputValue(inputFromValue, minDate, maxDate, offDays));
    }, [inputFromValue, maxDate, minDate, offDays]);
    const handleValidInputTo = useCallback(() => {
        setInputToInvalid(inputToValue !== '' &&
            !isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays));
    }, [dateFrom, inputToValue, maxDate, minDate, offDays]);
    const handleInputFromChange = useCallback((_, payload) => {
        setInputFromValue(payload.value);
    }, []);
    const handleInputToChange = useCallback((_, payload) => {
        setInputToValue(payload.value);
    }, []);
    const handleInputFromBlur = useCallback(() => {
        handleValidInputFrom();
        setResetKey(+new Date());
    }, [handleValidInputFrom]);
    const handleInputToBlur = useCallback(() => {
        handleValidInputTo();
        setResetKey(+new Date());
    }, [handleValidInputTo]);
    const handleFromChange = useCallback((_, payload) => {
        setInputFromValue(payload.value);
    }, []);
    const handleToChange = useCallback((_, payload) => {
        setInputToValue(payload.value);
    }, []);
    useEffect(() => {
        setInputFromValue(valueFrom);
    }, [valueFrom]);
    useEffect(() => {
        setInputToValue(valueTo);
    }, [valueTo]);
    useEffect(() => {
        onDateFromChange({ value: inputFromValue, date: dateFrom });
        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom,
            dateTo,
        });
        if (!inputFromValue || isCompleteDateInput(inputFromValue)) {
            handleValidInputFrom();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFromValue]);
    useEffect(() => {
        onDateToChange({ value: inputToValue, date: dateTo });
        onChange({
            valueFrom: inputFromValue,
            valueTo: inputToValue,
            dateFrom,
            dateTo,
        });
        if (!inputToValue || isCompleteDateInput(inputToValue)) {
            handleValidInputTo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToValue]);
    useEffect(() => {
        if (onError) {
            onError(hasValidateError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasValidateError]);
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement(CalendarInput, { ...inputFromProps, useAnchorWidth: false, calendarPosition: 'popover', popoverPosition: 'bottom-start', error: inputFromInvalid || bothInvalid || inputFromProps.error, onChange: handleFromChange, onInputChange: handleInputFromChange, onBlur: handleInputFromBlur, value: inputFromValue, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events, calendarProps: {
                ...inputFromProps.calendarProps,
                month: monthFrom,
                onMonthChange: handleMonthFromChange,
                selectorView: 'full',
            } }),
        React.createElement(Divider, { inputFromProps: inputFromProps, inputToProps: inputToProps }),
        React.createElement(CalendarInput, { ...inputToProps, useAnchorWidth: false, calendarPosition: 'popover', popoverPosition: 'bottom-end', error: inputToInvalid || bothInvalid || inputToProps.error, onChange: handleToChange, onInputChange: handleInputToChange, onBlur: handleInputToBlur, value: inputToValue, minDate: dateFrom || minDate, maxDate: maxDate, offDays: offDays, events: events, calendarProps: {
                ...inputToProps.calendarProps,
                month: monthTo,
                onMonthChange: handleMonthToChange,
                selectorView: 'full',
            } })));
};

export { CalendarRangePopover };
