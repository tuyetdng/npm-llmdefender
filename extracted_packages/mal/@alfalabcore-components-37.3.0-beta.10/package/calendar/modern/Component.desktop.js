import React, { forwardRef, useState, useMemo, useCallback } from 'react';
import cn from 'classnames';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import { useDidUpdateEffect } from '@alfalab/hooks';
import { DaysTable } from './components/days-table/Component.js';
import { Header } from './components/header/Component.js';
import { MonthYearHeader } from './components/month-year-header/Component.js';
import { MonthsTable } from './components/months-table/Component.js';
import { PeriodSlider } from './components/period-slider/Component.js';
import 'date-fns/addDays';
import 'date-fns/addMonths';
import 'date-fns/addQuarters';
import 'date-fns/addWeeks';
import 'date-fns/addYears';
import 'date-fns/endOfMonth';
import 'date-fns/endOfQuarter';
import 'date-fns/endOfWeek';
import 'date-fns/endOfYear';
import 'date-fns/getQuarter';
import 'date-fns/getYear';
import 'date-fns/isToday';
import 'date-fns/isYesterday';
import 'date-fns/startOfQuarter';
import 'date-fns/startOfWeek';
import 'date-fns/startOfYear';
import { limitDate } from './utils.js';
import { YearsTable } from './components/years-table/Component.js';
import { useCalendar } from './useCalendar.js';
import 'react-transition-group';
import 'date-fns/isEqual';
import 'date-fns/isLastDayOfMonth';
import 'date-fns/isSameDay';
import 'date-fns/isWithinInterval';
import '../../button/modern';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import './components/select-button/Component.js';
import 'date-fns/isSameMonth';
import 'date-fns/isThisMonth';
import '../../icon-button/modern';
import '@alfalab/icons-glyph/ChevronBackMIcon';
import 'date-fns/eachDayOfInterval';
import 'date-fns/eachMonthOfInterval';
import 'date-fns/eachYearOfInterval';
import 'date-fns/format';
import 'date-fns/isAfter';
import 'date-fns/isBefore';
import 'date-fns/lastDayOfMonth';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/parse';
import 'date-fns/subDays';
import 'date-fns/subMonths';
import 'date-fns/isSameYear';
import 'date-fns/isThisYear';
import 'react-merge-refs';
import 'date-fns/setYear';
import 'date-fns/subYears';
import './components/period-slider/utils.js';

const styles = {"component":"calendar__component_18ar2","responsive":"calendar__responsive_18ar2","period":"calendar__period_18ar2","monthYear":"calendar__monthYear_18ar2","container":"calendar__container_18ar2","sixWeeks":"calendar__sixWeeks_18ar2"};
require('./desktop.css');

const CalendarDesktop = forwardRef(({ className, defaultView = 'days', selectorView = 'full', value, month: monthTimestamp, minDate: minDateTimestamp, maxDate: maxDateTimestamp, defaultMonth: defaultMonthTimestamp = +new Date(), selectedFrom, selectedTo, rangeComplete, offDays, events, holidays, onChange, onMonthChange, onMonthClick, onYearClick, dataTestId, hasHeader = true, responsive, }, ref) => {
    const [view, setView] = useState(defaultView);
    const [scrolled, setScrolled] = useState(false);
    const selected = useMemo(() => (value ? new Date(value) : undefined), [value]);
    const defaultMonth = useMemo(() => startOfMonth(selected ||
        limitDate(defaultMonthTimestamp, minDateTimestamp, maxDateTimestamp)), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const month = useMemo(() => (monthTimestamp ? new Date(monthTimestamp) : undefined), [monthTimestamp]);
    const minDate = useMemo(() => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined), [minDateTimestamp]);
    const maxDate = useMemo(() => (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined), [maxDateTimestamp]);
    const { activeMonth, weeks, months, years, canSetPrevMonth, canSetNextMonth, setMonthByDate, setPrevMonth, setNextMonth, highlighted, getDayProps, getMonthProps, getYearProps, getRootProps, } = useCalendar({
        month,
        defaultMonth,
        view,
        minDate,
        maxDate,
        selected,
        offDays,
        events,
        holidays,
        onChange,
        onMonthChange,
    });
    const toggleView = useCallback((newView) => {
        setView(view === newView ? 'days' : newView);
    }, [view]);
    const handleScroll = useCallback((scrollTop) => {
        setScrolled(scrollTop > 0);
    }, []);
    const handlePrevArrowClick = useCallback(() => {
        // TODO: Что должны делать стрелки при view !== days?
        setPrevMonth();
    }, [setPrevMonth]);
    const handleNextArrowClick = useCallback(() => {
        setNextMonth();
    }, [setNextMonth]);
    const handleMonthClick = useCallback((event) => {
        toggleView('months');
        if (onMonthClick) {
            onMonthClick(event);
        }
    }, [onMonthClick, toggleView]);
    const handleYearClick = useCallback((event) => {
        toggleView('years');
        if (onYearClick) {
            onYearClick(event);
        }
    }, [onYearClick, toggleView]);
    useDidUpdateEffect(() => {
        setView('days');
    }, [activeMonth]);
    useDidUpdateEffect(() => {
        setScrolled(false);
    }, [view]);
    useDidUpdateEffect(() => {
        const newMonth = value && startOfMonth(value);
        if (newMonth && newMonth.getTime() !== activeMonth.getTime()) {
            setMonthByDate(newMonth);
        }
    }, [value]);
    return (React.createElement("div", { ...getRootProps({ ref }), className: cn('cc-calendar', styles.component, className, {
            [styles.sixWeeks]: weeks.length === 6,
            [styles.responsive]: responsive,
        }), "data-test-id": dataTestId },
        hasHeader && (React.createElement(Header, { view: selectorView, withShadow: scrolled }, selectorView === 'month-only' ? (React.createElement(PeriodSlider, { className: styles.period, value: activeMonth, periodType: 'month', prevArrowDisabled: !canSetPrevMonth, nextArrowDisabled: !canSetNextMonth, hideDisabledArrows: true, onPrevArrowClick: handlePrevArrowClick, onNextArrowClick: handleNextArrowClick })) : (React.createElement(MonthYearHeader, { className: styles.monthYear, value: activeMonth, onMonthClick: handleMonthClick, onYearClick: handleYearClick })))),
        React.createElement("div", { className: cn(styles.container, styles[view]) },
            view === 'days' && (React.createElement(DaysTable, { weeks: weeks, activeMonth: activeMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, getDayProps: getDayProps, highlighted: highlighted, rangeComplete: rangeComplete, responsive: responsive })),
            view === 'months' && (React.createElement(MonthsTable, { selectedMonth: activeMonth, months: months, getMonthProps: getMonthProps, responsive: responsive })),
            view === 'years' && (React.createElement(YearsTable, { selectedYear: activeMonth, years: years, getYearProps: getYearProps, onScroll: handleScroll, responsive: responsive })))));
});

export { CalendarDesktop };
