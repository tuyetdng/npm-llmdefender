import { _ as __assign } from './tslib.es6-4869e457.js';
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
import '../../button/esm';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import './components/select-button/Component.js';
import 'date-fns/isSameMonth';
import 'date-fns/isThisMonth';
import '../../icon-button/esm';
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

var styles = {"component":"calendar__component_18ar2","responsive":"calendar__responsive_18ar2","period":"calendar__period_18ar2","monthYear":"calendar__monthYear_18ar2","container":"calendar__container_18ar2","sixWeeks":"calendar__sixWeeks_18ar2"};
require('./desktop.css');

var CalendarDesktop = forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, _c = _a.defaultView, defaultView = _c === void 0 ? 'days' : _c, _d = _a.selectorView, selectorView = _d === void 0 ? 'full' : _d, value = _a.value, monthTimestamp = _a.month, minDateTimestamp = _a.minDate, maxDateTimestamp = _a.maxDate, _e = _a.defaultMonth, defaultMonthTimestamp = _e === void 0 ? +new Date() : _e, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, rangeComplete = _a.rangeComplete, offDays = _a.offDays, events = _a.events, holidays = _a.holidays, onChange = _a.onChange, onMonthChange = _a.onMonthChange, onMonthClick = _a.onMonthClick, onYearClick = _a.onYearClick, dataTestId = _a.dataTestId, _f = _a.hasHeader, hasHeader = _f === void 0 ? true : _f, responsive = _a.responsive;
    var _g = useState(defaultView), view = _g[0], setView = _g[1];
    var _h = useState(false), scrolled = _h[0], setScrolled = _h[1];
    var selected = useMemo(function () { return (value ? new Date(value) : undefined); }, [value]);
    var defaultMonth = useMemo(function () {
        return startOfMonth(selected ||
            limitDate(defaultMonthTimestamp, minDateTimestamp, maxDateTimestamp));
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    var month = useMemo(function () { return (monthTimestamp ? new Date(monthTimestamp) : undefined); }, [monthTimestamp]);
    var minDate = useMemo(function () { return (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined); }, [minDateTimestamp]);
    var maxDate = useMemo(function () { return (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined); }, [maxDateTimestamp]);
    var _j = useCalendar({
        month: month,
        defaultMonth: defaultMonth,
        view: view,
        minDate: minDate,
        maxDate: maxDate,
        selected: selected,
        offDays: offDays,
        events: events,
        holidays: holidays,
        onChange: onChange,
        onMonthChange: onMonthChange,
    }), activeMonth = _j.activeMonth, weeks = _j.weeks, months = _j.months, years = _j.years, canSetPrevMonth = _j.canSetPrevMonth, canSetNextMonth = _j.canSetNextMonth, setMonthByDate = _j.setMonthByDate, setPrevMonth = _j.setPrevMonth, setNextMonth = _j.setNextMonth, highlighted = _j.highlighted, getDayProps = _j.getDayProps, getMonthProps = _j.getMonthProps, getYearProps = _j.getYearProps, getRootProps = _j.getRootProps;
    var toggleView = useCallback(function (newView) {
        setView(view === newView ? 'days' : newView);
    }, [view]);
    var handleScroll = useCallback(function (scrollTop) {
        setScrolled(scrollTop > 0);
    }, []);
    var handlePrevArrowClick = useCallback(function () {
        // TODO: Что должны делать стрелки при view !== days?
        setPrevMonth();
    }, [setPrevMonth]);
    var handleNextArrowClick = useCallback(function () {
        setNextMonth();
    }, [setNextMonth]);
    var handleMonthClick = useCallback(function (event) {
        toggleView('months');
        if (onMonthClick) {
            onMonthClick(event);
        }
    }, [onMonthClick, toggleView]);
    var handleYearClick = useCallback(function (event) {
        toggleView('years');
        if (onYearClick) {
            onYearClick(event);
        }
    }, [onYearClick, toggleView]);
    useDidUpdateEffect(function () {
        setView('days');
    }, [activeMonth]);
    useDidUpdateEffect(function () {
        setScrolled(false);
    }, [view]);
    useDidUpdateEffect(function () {
        var newMonth = value && startOfMonth(value);
        if (newMonth && newMonth.getTime() !== activeMonth.getTime()) {
            setMonthByDate(newMonth);
        }
    }, [value]);
    return (React.createElement("div", __assign({}, getRootProps({ ref: ref }), { className: cn('cc-calendar', styles.component, className, (_b = {},
            _b[styles.sixWeeks] = weeks.length === 6,
            _b[styles.responsive] = responsive,
            _b)), "data-test-id": dataTestId }),
        hasHeader && (React.createElement(Header, { view: selectorView, withShadow: scrolled }, selectorView === 'month-only' ? (React.createElement(PeriodSlider, { className: styles.period, value: activeMonth, periodType: 'month', prevArrowDisabled: !canSetPrevMonth, nextArrowDisabled: !canSetNextMonth, hideDisabledArrows: true, onPrevArrowClick: handlePrevArrowClick, onNextArrowClick: handleNextArrowClick })) : (React.createElement(MonthYearHeader, { className: styles.monthYear, value: activeMonth, onMonthClick: handleMonthClick, onYearClick: handleYearClick })))),
        React.createElement("div", { className: cn(styles.container, styles[view]) },
            view === 'days' && (React.createElement(DaysTable, { weeks: weeks, activeMonth: activeMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, getDayProps: getDayProps, highlighted: highlighted, rangeComplete: rangeComplete, responsive: responsive })),
            view === 'months' && (React.createElement(MonthsTable, { selectedMonth: activeMonth, months: months, getMonthProps: getMonthProps, responsive: responsive })),
            view === 'years' && (React.createElement(YearsTable, { selectedYear: activeMonth, years: years, getYearProps: getYearProps, onScroll: handleScroll, responsive: responsive })))));
});

export { CalendarDesktop };
