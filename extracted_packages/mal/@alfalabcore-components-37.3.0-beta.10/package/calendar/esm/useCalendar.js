import { useState, useRef, useMemo, useCallback } from 'react';
import mergeRefs from 'react-merge-refs';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import isSameDay from 'date-fns/isSameDay';
import isSameMonth from 'date-fns/isSameMonth';
import isSameYear from 'date-fns/isSameYear';
import setYear from 'date-fns/setYear';
import startOfMonth from 'date-fns/startOfMonth';
import subYears from 'date-fns/subYears';
import { dateArrayToHashTable, generateWeeks, generateMonths, generateYears, limitDate, simulateTab, modifyDateByShift, MONTHS_IN_YEAR } from './utils.js';
import 'date-fns/addDays';
import 'date-fns/eachDayOfInterval';
import 'date-fns/eachMonthOfInterval';
import 'date-fns/eachYearOfInterval';
import 'date-fns/endOfWeek';
import 'date-fns/endOfYear';
import 'date-fns/format';
import 'date-fns/isAfter';
import 'date-fns/isBefore';
import 'date-fns/lastDayOfMonth';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/parse';
import 'date-fns/startOfDay';
import 'date-fns/startOfWeek';
import 'date-fns/startOfYear';
import 'date-fns/subDays';
import 'date-fns/subMonths';

function useCalendar(_a) {
    var defaultMonth = _a.defaultMonth, month = _a.month, minDate = _a.minDate, _b = _a.view, view = _b === void 0 ? 'days' : _b, maxDate = _a.maxDate, selected = _a.selected, events = _a.events, offDays = _a.offDays, holidays = _a.holidays, onMonthChange = _a.onMonthChange, onChange = _a.onChange;
    var _c = useState(defaultMonth), monthState = _c[0], setMonthState = _c[1];
    var _d = useState(), highlighted = _d[0], setHighlighted = _d[1];
    var uncontrolled = month === undefined;
    var activeMonth = uncontrolled ? monthState : month;
    var dateRefs = useRef([]);
    var rootRef = useRef(null);
    var minMonth = useMemo(function () { return minDate && startOfMonth(minDate); }, [minDate]);
    var maxMonth = useMemo(function () { return maxDate && startOfMonth(maxDate); }, [maxDate]);
    var canSetPrevMonth = minMonth ? activeMonth > minMonth : true;
    var canSetNextMonth = maxMonth ? activeMonth < maxMonth : true;
    var eventsMap = useMemo(function () { return dateArrayToHashTable(events || []); }, [events]);
    var offDaysMap = useMemo(function () { return dateArrayToHashTable(offDays || []); }, [offDays]);
    var holidaysMap = useMemo(function () { return dateArrayToHashTable(holidays || []); }, [holidays]);
    var weeks = useMemo(function () {
        return generateWeeks(activeMonth, {
            minDate: minDate,
            maxDate: maxDate,
            selected: selected,
            eventsMap: eventsMap,
            offDaysMap: offDaysMap,
            holidaysMap: holidaysMap,
        });
    }, [maxDate, minDate, selected, activeMonth, eventsMap, offDaysMap, holidaysMap]);
    var months = useMemo(function () { return generateMonths(activeMonth, { minMonth: minMonth, maxMonth: maxMonth }); }, [minMonth, maxMonth, activeMonth]);
    var years = useMemo(function () {
        return generateYears(minDate || subYears(new Date(), 100), maxDate || addYears(new Date(), 1));
    }, [minDate, maxDate]);
    var setMonth = useCallback(function (newMonth) {
        if (uncontrolled) {
            setMonthState(newMonth);
        }
        if (onMonthChange) {
            onMonthChange(newMonth.getTime());
        }
    }, [onMonthChange, uncontrolled]);
    var setMonthByStep = useCallback(function (step) {
        setMonth(limitDate(addMonths(activeMonth, step), minMonth, maxMonth));
    }, [setMonth, activeMonth, minMonth, maxMonth]);
    var setMonthByDate = useCallback(function (newMonth) {
        setMonth(limitDate(newMonth, minMonth, maxMonth));
    }, [maxMonth, minMonth, setMonth]);
    var setNextMonth = useCallback(function () {
        setMonthByStep(1);
    }, [setMonthByStep]);
    var setPrevMonth = useCallback(function () {
        setMonthByStep(-1);
    }, [setMonthByStep]);
    var getFocusedDate = useCallback(function () { return dateRefs.current.find(function (node) { return document.activeElement === node; }); }, []);
    var getFocusableDate = useCallback(function () { return dateRefs.current.find(function (node) { return node && node.tabIndex === 0; }); }, []);
    var focusDate = useCallback(function (node) {
        if (node) {
            simulateTab(node);
            node.focus();
        }
    }, []);
    var focusFirstAvailableDate = useCallback(function () { return focusDate(getFocusableDate()); }, [focusDate, getFocusableDate]);
    var focusDay = useCallback(function (shift) {
        var focusedNode = getFocusedDate();
        if (focusedNode && focusedNode.dataset.date) {
            var focusedDate = new Date(+focusedNode.dataset.date);
            var newDate_1 = modifyDateByShift(shift, focusedDate, minDate, maxDate, offDaysMap);
            var monthChanged = false;
            if (newDate_1 < focusedDate && newDate_1.getMonth() !== focusedDate.getMonth()) {
                setPrevMonth();
                monthChanged = true;
            }
            if (newDate_1 > focusedDate && newDate_1.getMonth() !== focusedDate.getMonth()) {
                setNextMonth();
                monthChanged = true;
            }
            var effect = function () { return focusDate(dateRefs.current[newDate_1.getDate() - 1]); };
            if (monthChanged) {
                setTimeout(effect, 0);
            }
            else {
                effect();
            }
        }
        else {
            focusFirstAvailableDate();
        }
    }, [
        focusDate,
        focusFirstAvailableDate,
        getFocusedDate,
        maxDate,
        minDate,
        offDaysMap,
        setNextMonth,
        setPrevMonth,
    ]);
    var focusMonth = useCallback(function (offset) {
        var focusedNode = getFocusedDate();
        if (focusedNode && focusedNode.dataset.date) {
            var focusedMonth = new Date(+focusedNode.dataset.date).getMonth();
            var newFocusedMonth = focusedMonth + offset;
            if (newFocusedMonth >= 0 && newFocusedMonth < MONTHS_IN_YEAR) {
                focusDate(dateRefs.current[newFocusedMonth]);
            }
        }
        else {
            focusFirstAvailableDate();
        }
    }, [focusDate, focusFirstAvailableDate, getFocusedDate]);
    var focusYear = useCallback(function (offset) {
        var focusedNode = getFocusedDate();
        if (focusedNode && focusedNode.dataset.date) {
            var focusedYear = new Date(+focusedNode.dataset.date).getFullYear();
            var newFocusedYear = focusedYear + offset;
            var currentYear = new Date().getFullYear();
            if (newFocusedYear <= currentYear && newFocusedYear > currentYear - years.length) {
                focusDate(dateRefs.current[newFocusedYear]);
            }
        }
        else {
            focusFirstAvailableDate();
        }
    }, [focusDate, focusFirstAvailableDate, getFocusedDate, years.length]);
    var handleMonthClick = useCallback(function (event) {
        var date = event.currentTarget.dataset.date;
        if (date) {
            setMonthByDate(new Date(+date));
        }
        /**
         * Возвращаем фокус внутрь компонента после переключения
         * Но только если фокус и раньше был внутри
         */
        if (rootRef.current && rootRef.current.contains(document.activeElement)) {
            rootRef.current.focus();
        }
    }, [setMonthByDate]);
    var handleYearClick = useCallback(function (event) {
        var date = event.currentTarget.dataset.date;
        if (date) {
            setMonthByDate(setYear(activeMonth, new Date(+date).getFullYear()));
        }
        if (rootRef.current && rootRef.current.contains(document.activeElement)) {
            rootRef.current.focus();
        }
    }, [activeMonth, setMonthByDate]);
    var handleDateRef = useCallback(function (node, index) {
        dateRefs.current[index] = node;
    }, []);
    var handleDayMouseEnter = useCallback(function (event) {
        var date = event.currentTarget.dataset.date;
        setHighlighted(date ? +date : undefined);
    }, []);
    var handleDayMouseLeave = useCallback(function () {
        setHighlighted(undefined);
    }, []);
    var handleDayClick = function (event) {
        var date = event.currentTarget.dataset.date;
        if (date && onChange) {
            onChange(+date);
        }
        handleDayMouseLeave();
    };
    var daysControls = useMemo(function () { return ({
        ArrowLeft: function () { return focusDay('prev'); },
        ArrowRight: function () { return focusDay('next'); },
        ArrowUp: function () { return focusDay('prevWeek'); },
        ArrowDown: function () { return focusDay('nextWeek'); },
        End: function () { return focusDay('endOfWeek'); },
        Home: function () { return focusDay('startOfWeek'); },
        PageUp: function () { return focusDay('prevMonth'); },
        PageDown: function () { return focusDay('nextMonth'); },
    }); }, [focusDay]);
    var monthControls = useMemo(function () { return ({
        ArrowLeft: function () { return focusMonth(-1); },
        ArrowRight: function () { return focusMonth(1); },
        ArrowUp: function () { return focusMonth(-3); },
        ArrowDown: function () { return focusMonth(3); },
    }); }, [focusMonth]);
    var yearsControls = useMemo(function () { return ({
        ArrowLeft: function () { return focusYear(1); },
        ArrowRight: function () { return focusYear(-1); },
        ArrowUp: function () { return focusYear(3); },
        ArrowDown: function () { return focusYear(-3); },
    }); }, [focusYear]);
    var controlsByView = {
        days: daysControls,
        months: monthControls,
        years: yearsControls,
    };
    var handleKeyDown = function (event) {
        var controls = controlsByView[view];
        if (event.key in controls) {
            controls[event.key]();
            event.preventDefault();
        }
    };
    var focusableDayIsSet = false;
    var getDayProps = function (day) {
        var daySelected = selected && isSameDay(selected, day.date);
        var canFocus = daySelected;
        // Если день не выбран — фокус должен начинаться с первого доступного дня месяца
        if ((!selected || !isSameMonth(selected, activeMonth)) &&
            !focusableDayIsSet &&
            !day.disabled) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            focusableDayIsSet = true;
            canFocus = true;
        }
        return {
            'data-date': day.date.getTime(),
            'aria-selected': daySelected,
            ref: function (node) {
                handleDateRef(node, day.date.getDate() - 1);
            },
            tabIndex: canFocus ? 0 : -1,
            onMouseEnter: handleDayMouseEnter,
            onMouseLeave: handleDayMouseLeave,
            onClick: handleDayClick,
        };
    };
    var getMonthProps = function (month) {
        var monthselected = isSameMonth(activeMonth, month.date);
        return {
            'data-date': month.date.getTime(),
            'aria-selected': monthselected,
            ref: function (node) {
                handleDateRef(node, month.date.getMonth());
            },
            tabIndex: monthselected ? 0 : -1,
            disabled: month.disabled,
            onClick: handleMonthClick,
        };
    };
    var getYearProps = function (year) {
        var yearSelected = isSameYear(activeMonth, year);
        return {
            'data-date': year.getTime(),
            'aria-selected': yearSelected,
            ref: function (node) {
                handleDateRef(node, year.getFullYear());
            },
            tabIndex: yearSelected ? 0 : -1,
            onClick: handleYearClick,
        };
    };
    var getRootProps = function (_a) {
        var _b = _a.ref, ref = _b === void 0 ? null : _b;
        return ({
            onKeyDown: handleKeyDown,
            ref: mergeRefs([ref, rootRef]),
            tabIndex: -1,
        });
    };
    return {
        activeMonth: activeMonth,
        weeks: weeks,
        months: months,
        years: years,
        canSetPrevMonth: canSetPrevMonth,
        canSetNextMonth: canSetNextMonth,
        highlighted: highlighted,
        setPrevMonth: setPrevMonth,
        setNextMonth: setNextMonth,
        setMonthByDate: setMonthByDate,
        getDayProps: getDayProps,
        getMonthProps: getMonthProps,
        getYearProps: getYearProps,
        getRootProps: getRootProps,
    };
}

export { useCalendar };
