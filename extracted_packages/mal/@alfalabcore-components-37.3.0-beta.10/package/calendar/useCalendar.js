var React = require('react');
var mergeRefs = require('react-merge-refs');
var addMonths = require('date-fns/addMonths');
var addYears = require('date-fns/addYears');
var isSameDay = require('date-fns/isSameDay');
var isSameMonth = require('date-fns/isSameMonth');
var isSameYear = require('date-fns/isSameYear');
var setYear = require('date-fns/setYear');
var startOfMonth = require('date-fns/startOfMonth');
var subYears = require('date-fns/subYears');
var utils = require('./utils.js');
require('date-fns/addDays');
require('date-fns/eachDayOfInterval');
require('date-fns/eachMonthOfInterval');
require('date-fns/eachYearOfInterval');
require('date-fns/endOfWeek');
require('date-fns/endOfYear');
require('date-fns/format');
require('date-fns/isAfter');
require('date-fns/isBefore');
require('date-fns/lastDayOfMonth');
require('date-fns/max');
require('date-fns/min');
require('date-fns/parse');
require('date-fns/startOfDay');
require('date-fns/startOfWeek');
require('date-fns/startOfYear');
require('date-fns/subDays');
require('date-fns/subMonths');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var addMonths__default = /*#__PURE__*/_interopDefaultCompat(addMonths);
var addYears__default = /*#__PURE__*/_interopDefaultCompat(addYears);
var isSameDay__default = /*#__PURE__*/_interopDefaultCompat(isSameDay);
var isSameMonth__default = /*#__PURE__*/_interopDefaultCompat(isSameMonth);
var isSameYear__default = /*#__PURE__*/_interopDefaultCompat(isSameYear);
var setYear__default = /*#__PURE__*/_interopDefaultCompat(setYear);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);
var subYears__default = /*#__PURE__*/_interopDefaultCompat(subYears);

function useCalendar(_a) {
    var defaultMonth = _a.defaultMonth, month = _a.month, minDate = _a.minDate, _b = _a.view, view = _b === void 0 ? 'days' : _b, maxDate = _a.maxDate, selected = _a.selected, events = _a.events, offDays = _a.offDays, holidays = _a.holidays, onMonthChange = _a.onMonthChange, onChange = _a.onChange;
    var _c = React.useState(defaultMonth), monthState = _c[0], setMonthState = _c[1];
    var _d = React.useState(), highlighted = _d[0], setHighlighted = _d[1];
    var uncontrolled = month === undefined;
    var activeMonth = uncontrolled ? monthState : month;
    var dateRefs = React.useRef([]);
    var rootRef = React.useRef(null);
    var minMonth = React.useMemo(function () { return minDate && startOfMonth__default.default(minDate); }, [minDate]);
    var maxMonth = React.useMemo(function () { return maxDate && startOfMonth__default.default(maxDate); }, [maxDate]);
    var canSetPrevMonth = minMonth ? activeMonth > minMonth : true;
    var canSetNextMonth = maxMonth ? activeMonth < maxMonth : true;
    var eventsMap = React.useMemo(function () { return utils.dateArrayToHashTable(events || []); }, [events]);
    var offDaysMap = React.useMemo(function () { return utils.dateArrayToHashTable(offDays || []); }, [offDays]);
    var holidaysMap = React.useMemo(function () { return utils.dateArrayToHashTable(holidays || []); }, [holidays]);
    var weeks = React.useMemo(function () {
        return utils.generateWeeks(activeMonth, {
            minDate: minDate,
            maxDate: maxDate,
            selected: selected,
            eventsMap: eventsMap,
            offDaysMap: offDaysMap,
            holidaysMap: holidaysMap,
        });
    }, [maxDate, minDate, selected, activeMonth, eventsMap, offDaysMap, holidaysMap]);
    var months = React.useMemo(function () { return utils.generateMonths(activeMonth, { minMonth: minMonth, maxMonth: maxMonth }); }, [minMonth, maxMonth, activeMonth]);
    var years = React.useMemo(function () {
        return utils.generateYears(minDate || subYears__default.default(new Date(), 100), maxDate || addYears__default.default(new Date(), 1));
    }, [minDate, maxDate]);
    var setMonth = React.useCallback(function (newMonth) {
        if (uncontrolled) {
            setMonthState(newMonth);
        }
        if (onMonthChange) {
            onMonthChange(newMonth.getTime());
        }
    }, [onMonthChange, uncontrolled]);
    var setMonthByStep = React.useCallback(function (step) {
        setMonth(utils.limitDate(addMonths__default.default(activeMonth, step), minMonth, maxMonth));
    }, [setMonth, activeMonth, minMonth, maxMonth]);
    var setMonthByDate = React.useCallback(function (newMonth) {
        setMonth(utils.limitDate(newMonth, minMonth, maxMonth));
    }, [maxMonth, minMonth, setMonth]);
    var setNextMonth = React.useCallback(function () {
        setMonthByStep(1);
    }, [setMonthByStep]);
    var setPrevMonth = React.useCallback(function () {
        setMonthByStep(-1);
    }, [setMonthByStep]);
    var getFocusedDate = React.useCallback(function () { return dateRefs.current.find(function (node) { return document.activeElement === node; }); }, []);
    var getFocusableDate = React.useCallback(function () { return dateRefs.current.find(function (node) { return node && node.tabIndex === 0; }); }, []);
    var focusDate = React.useCallback(function (node) {
        if (node) {
            utils.simulateTab(node);
            node.focus();
        }
    }, []);
    var focusFirstAvailableDate = React.useCallback(function () { return focusDate(getFocusableDate()); }, [focusDate, getFocusableDate]);
    var focusDay = React.useCallback(function (shift) {
        var focusedNode = getFocusedDate();
        if (focusedNode && focusedNode.dataset.date) {
            var focusedDate = new Date(+focusedNode.dataset.date);
            var newDate_1 = utils.modifyDateByShift(shift, focusedDate, minDate, maxDate, offDaysMap);
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
    var focusMonth = React.useCallback(function (offset) {
        var focusedNode = getFocusedDate();
        if (focusedNode && focusedNode.dataset.date) {
            var focusedMonth = new Date(+focusedNode.dataset.date).getMonth();
            var newFocusedMonth = focusedMonth + offset;
            if (newFocusedMonth >= 0 && newFocusedMonth < utils.MONTHS_IN_YEAR) {
                focusDate(dateRefs.current[newFocusedMonth]);
            }
        }
        else {
            focusFirstAvailableDate();
        }
    }, [focusDate, focusFirstAvailableDate, getFocusedDate]);
    var focusYear = React.useCallback(function (offset) {
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
    var handleMonthClick = React.useCallback(function (event) {
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
    var handleYearClick = React.useCallback(function (event) {
        var date = event.currentTarget.dataset.date;
        if (date) {
            setMonthByDate(setYear__default.default(activeMonth, new Date(+date).getFullYear()));
        }
        if (rootRef.current && rootRef.current.contains(document.activeElement)) {
            rootRef.current.focus();
        }
    }, [activeMonth, setMonthByDate]);
    var handleDateRef = React.useCallback(function (node, index) {
        dateRefs.current[index] = node;
    }, []);
    var handleDayMouseEnter = React.useCallback(function (event) {
        var date = event.currentTarget.dataset.date;
        setHighlighted(date ? +date : undefined);
    }, []);
    var handleDayMouseLeave = React.useCallback(function () {
        setHighlighted(undefined);
    }, []);
    var handleDayClick = function (event) {
        var date = event.currentTarget.dataset.date;
        if (date && onChange) {
            onChange(+date);
        }
        handleDayMouseLeave();
    };
    var daysControls = React.useMemo(function () { return ({
        ArrowLeft: function () { return focusDay('prev'); },
        ArrowRight: function () { return focusDay('next'); },
        ArrowUp: function () { return focusDay('prevWeek'); },
        ArrowDown: function () { return focusDay('nextWeek'); },
        End: function () { return focusDay('endOfWeek'); },
        Home: function () { return focusDay('startOfWeek'); },
        PageUp: function () { return focusDay('prevMonth'); },
        PageDown: function () { return focusDay('nextMonth'); },
    }); }, [focusDay]);
    var monthControls = React.useMemo(function () { return ({
        ArrowLeft: function () { return focusMonth(-1); },
        ArrowRight: function () { return focusMonth(1); },
        ArrowUp: function () { return focusMonth(-3); },
        ArrowDown: function () { return focusMonth(3); },
    }); }, [focusMonth]);
    var yearsControls = React.useMemo(function () { return ({
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
        var daySelected = selected && isSameDay__default.default(selected, day.date);
        var canFocus = daySelected;
        // Если день не выбран — фокус должен начинаться с первого доступного дня месяца
        if ((!selected || !isSameMonth__default.default(selected, activeMonth)) &&
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
        var monthselected = isSameMonth__default.default(activeMonth, month.date);
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
        var yearSelected = isSameYear__default.default(activeMonth, year);
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
            ref: mergeRefs__default.default([ref, rootRef]),
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

exports.useCalendar = useCalendar;
