import React, { useState, useCallback, useEffect } from 'react';
import cn from 'classnames';
import addMonths from 'date-fns/addMonths';
import endOfMonth from 'date-fns/endOfMonth';
import max from 'date-fns/max';
import startOfMonth from 'date-fns/startOfMonth';
import subMonths from 'date-fns/subMonths';
import { usePeriodWithReset, Calendar } from '../../../calendar/modern';
import { isValidInputValue, parseDateString, formatDate } from '../../../calendar-input/modern';
import { isCompleteDateInput, DateInput } from '../../../date-input/modern';
import { Divider } from '../components/divider/Component.js';
import { useStaticViewMonthes, useSelectionProps } from '../hooks.js';
import { isDayButton } from '../utils.js';
import { s as styles } from '../index.module-249f068b.js';
import 'date-fns/isEqual';
import 'date-fns/min';

/* eslint-disable complexity */
const CalendarRangeStatic = ({ className, defaultMonth = startOfMonth(new Date()).getTime(), defaultMonthPosition = 'left', minDate, maxDate, valueFrom = '', valueTo = '', onDateFromChange = () => null, onDateToChange = () => null, onChange = () => null, onError, inputFromProps = {}, inputToProps = {}, offDays, events, dataTestId, }) => {
    const [inputFromValue, setInputFromValue] = useState(valueFrom);
    const [inputToValue, setInputToValue] = useState(valueTo);
    let dateFrom = isValidInputValue(inputFromValue, minDate, maxDate, offDays)
        ? parseDateString(inputFromValue).getTime()
        : null;
    const dateTo = isValidInputValue(inputToValue, dateFrom || minDate, maxDate, offDays)
        ? parseDateString(inputToValue).getTime()
        : null;
    if (isCompleteDateInput(inputToValue) && !dateTo) {
        dateFrom = null;
    }
    const bothInvalid = isCompleteDateInput(inputFromValue) &&
        isCompleteDateInput(inputToValue) &&
        parseDateString(inputFromValue).getTime() > parseDateString(inputToValue).getTime();
    const [highlightedDate, setHighlightedDate] = useState(undefined);
    const period = usePeriodWithReset({
        initialSelectedFrom: dateFrom ? parseDateString(inputFromValue).getTime() : undefined,
        initialSelectedTo: dateTo ? parseDateString(inputToValue).getTime() : undefined,
    });
    const validateInputFromValue = useCallback((value) => isValidInputValue(value, minDate, dateFrom || maxDate, offDays), [dateFrom, maxDate, minDate, offDays]);
    const validateInputToValue = useCallback((value) => isValidInputValue(value, dateFrom || minDate, maxDate, offDays), [dateFrom, minDate, maxDate, offDays]);
    const [inputFromInvalid, setInputFromInvalid] = useState(isCompleteDateInput(inputFromValue) && dateFrom === null);
    const [inputToInvalid, setInputToInvalid] = useState(isCompleteDateInput(inputToValue) && dateTo === null);
    const hasValidateError = bothInvalid || inputFromInvalid || inputToInvalid;
    const { monthFrom, monthTo, handleMonthFromChange, handleMonthToChange } = useStaticViewMonthes({
        selectedFrom: period.selectedFrom,
        selectedTo: period.selectedTo,
        defaultMonth,
        defaultMonthPosition,
    });
    const handleValidInputFrom = useCallback(() => {
        setInputFromInvalid(inputFromValue !== '' && !validateInputFromValue(inputFromValue));
    }, [inputFromValue, validateInputFromValue]);
    const handleValidInputTo = useCallback(() => {
        setInputToInvalid(inputToValue !== '' && !validateInputToValue(inputToValue));
    }, [inputToValue, validateInputToValue]);
    const handleInputFromChange = useCallback((_, payload) => {
        setInputFromValue(payload.value);
    }, []);
    const handleInputToChange = useCallback((_, payload) => {
        setInputToValue(payload.value);
    }, []);
    const handleMouseOver = useCallback((event) => {
        const target = event.target;
        const mouseOverDayButton = isDayButton(target) || isDayButton(target.parentElement);
        let date;
        if (mouseOverDayButton) {
            const button = target.tagName === 'BUTTON' ? target : target.parentElement;
            if (button.dataset.date) {
                date = +button.dataset.date;
            }
        }
        setHighlightedDate(date);
    }, []);
    const handleClearFrom = useCallback(() => {
        setInputFromValue('');
    }, []);
    const handleClearTo = useCallback(() => {
        setInputToValue('');
    }, []);
    useEffect(() => {
        setInputFromValue(period.selectedFrom ? formatDate(period.selectedFrom) : '');
    }, [period.selectedFrom]);
    useEffect(() => {
        setInputToValue(period.selectedTo ? formatDate(period.selectedTo) : '');
    }, [period.selectedTo]);
    useEffect(() => {
        setInputFromValue(valueFrom);
    }, [valueFrom]);
    useEffect(() => {
        setInputToValue(valueTo);
    }, [valueTo]);
    useEffect(() => {
        if (!inputFromValue || isCompleteDateInput(inputFromValue)) {
            handleValidInputFrom();
        }
        period.setStart(dateFrom || undefined);
        if (dateTo) {
            period.setEnd(dateTo);
        }
        if (inputFromValue !== valueFrom) {
            onDateFromChange({
                value: inputFromValue,
                date: dateFrom,
            });
            onChange({
                valueFrom: inputFromValue,
                valueTo: inputToValue,
                dateFrom,
                dateTo,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputFromValue]);
    useEffect(() => {
        if (!inputToValue || isCompleteDateInput(inputToValue)) {
            handleValidInputTo();
        }
        period.setEnd(dateTo || undefined);
        if (dateFrom) {
            period.setStart(dateFrom);
        }
        if (inputToValue !== valueTo) {
            onDateToChange({
                value: inputToValue,
                date: dateTo,
            });
            onChange({
                valueFrom: inputFromValue,
                valueTo: inputToValue,
                dateFrom,
                dateTo,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputToValue]);
    useEffect(() => {
        if (onError) {
            onError(hasValidateError);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasValidateError]);
    const rangeProps = useSelectionProps(period.selectedFrom, period.selectedTo, highlightedDate);
    const { calendarProps: calendarFromProps, ...dateInputFromProps } = inputFromProps;
    const { calendarProps: calendarToProps, ...dateInputToProps } = inputToProps;
    const CalendarFromComponent = dateInputFromProps.Calendar || Calendar;
    const CalendarToComponent = dateInputToProps.Calendar || Calendar;
    return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    React.createElement("div", { className: cn(styles.component, styles.static, className), onMouseOver: handleMouseOver, "data-test-id": dataTestId },
        React.createElement("div", null,
            React.createElement(DateInput, { ...dateInputFromProps, mobileMode: dateInputFromProps.mobileMode === 'popover'
                    ? 'input'
                    : dateInputFromProps.mobileMode, value: inputFromValue, onChange: handleInputFromChange, onClear: handleClearFrom, onBlur: handleValidInputFrom, error: bothInvalid || inputFromInvalid || dateInputFromProps.error, clear: true, block: true }),
            React.createElement(CalendarFromComponent, { ...calendarFromProps, className: cn(styles.calendar, calendarFromProps?.className), month: monthFrom, selectorView: 'month-only', offDays: offDays, events: events, onChange: period.updatePeriod, onMonthChange: handleMonthFromChange, minDate: minDate, maxDate: maxDate && max([maxDate, endOfMonth(subMonths(maxDate, 1))]).getTime(), ...rangeProps })),
        React.createElement(Divider, { inputFromProps: inputFromProps, inputToProps: inputToProps }),
        React.createElement("div", null,
            React.createElement(DateInput, { ...dateInputToProps, mobileMode: dateInputToProps.mobileMode === 'popover'
                    ? 'input'
                    : dateInputToProps.mobileMode, value: inputToValue, onChange: handleInputToChange, onClear: handleClearTo, onBlur: handleValidInputTo, error: bothInvalid || inputToInvalid, clear: true, block: true }),
            React.createElement(CalendarToComponent, { ...calendarToProps, className: cn(styles.calendar, calendarToProps?.className), month: monthTo, selectorView: 'month-only', offDays: offDays, events: events, onChange: period.updatePeriod, onMonthChange: handleMonthToChange, minDate: minDate && startOfMonth(addMonths(minDate, 1)).getTime(), maxDate: maxDate, ...rangeProps }))));
};

export { CalendarRangeStatic };
