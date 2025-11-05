import { _ as __assign } from '../../tslib.es6-4869e457.js';
import React, { useRef, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import isEqual from 'date-fns/isEqual';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfMonth from 'date-fns/startOfMonth';
import { Button } from '../../../../button/esm';
import { usePrevious } from '@alfalab/hooks';
import { getSelectionRange, WEEKDAYS, russianWeekDay } from '../../utils.js';
import 'date-fns/addDays';
import 'date-fns/addMonths';
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

var styles = {"daysTable":"calendar__daysTable_94q4q","responsive":"calendar__responsive_94q4q","dayName":"calendar__dayName_94q4q","day":"calendar__day_94q4q","highlighted":"calendar__highlighted_94q4q","range":"calendar__range_94q4q","disabled":"calendar__disabled_94q4q","holiday":"calendar__holiday_94q4q","today":"calendar__today_94q4q","rangeComplete":"calendar__rangeComplete_94q4q","selected":"calendar__selected_94q4q","dayWrapper":"calendar__dayWrapper_94q4q","cursorPointer":"calendar__cursorPointer_94q4q","rangeEnd":"calendar__rangeEnd_94q4q","rangeStart":"calendar__rangeStart_94q4q","transitLeft":"calendar__transitLeft_94q4q","transitRight":"calendar__transitRight_94q4q","sharpTransitLeft":"calendar__sharpTransitLeft_94q4q","sharpTransitRight":"calendar__sharpTransitRight_94q4q","daysEnter":"calendar__daysEnter_94q4q","left":"calendar__left_94q4q","daysEnterActive":"calendar__daysEnterActive_94q4q","daysExit":"calendar__daysExit_94q4q","daysExitActive":"calendar__daysExitActive_94q4q","right":"calendar__right_94q4q","dot":"calendar__dot_94q4q"};
require('./index.css');

var DaysTable = function (_a) {
    var _b;
    var _c = _a.weeks, weeks = _c === void 0 ? [] : _c, _d = _a.activeMonth, activeMonth = _d === void 0 ? new Date() : _d, highlighted = _a.highlighted, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, _e = _a.rangeComplete, rangeComplete = _e === void 0 ? selectedFrom && selectedTo : _e, getDayProps = _a.getDayProps, _f = _a.hasHeader, hasHeader = _f === void 0 ? true : _f, responsive = _a.responsive;
    var activeMonthRef = useRef(activeMonth);
    var directionRef = useRef();
    activeMonthRef.current = activeMonth;
    var prevActiveMonth = usePrevious(activeMonth);
    if (prevActiveMonth && prevActiveMonth !== activeMonth) {
        directionRef.current = activeMonth < prevActiveMonth ? 'right' : 'left';
    }
    var selection = getSelectionRange(selectedFrom, selectedTo, highlighted);
    var renderHeader = useCallback(function () {
        return WEEKDAYS.map(function (dayName) { return (React.createElement("th", { className: styles.dayName, key: dayName }, dayName)); });
    }, []);
    var renderDay = function (day, dayIdx) {
        var _a, _b;
        if (!day)
            return React.createElement("td", { key: dayIdx });
        var daySelected = day.selected ||
            (selectedFrom && isSameDay(day.date, selectedFrom)) ||
            (selectedTo && isSameDay(day.date, selectedTo));
        var dayHighlighted = highlighted && isEqual(day.date, highlighted);
        var inRange = selection && isWithinInterval(day.date, selection);
        var firstDayOfMonth = day.date.getDate() === 1;
        var lastDayOfMonth = isLastDayOfMonth(day.date);
        var firstDayOfWeek = russianWeekDay(day.date) === 0;
        var lastDayOfWeek = russianWeekDay(day.date) === 6;
        var transitLeft = firstDayOfMonth && inRange && selection && day.date > selection.start;
        var transitRight = lastDayOfMonth && inRange && selection && day.date < selection.end;
        var rangeStart = selection && isSameDay(day.date, selection.start);
        var rangeEnd = selection && isSameDay(day.date, selection.end);
        var sharpTransitLeft = firstDayOfWeek &&
            firstDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay(day.date, selection.start) || isSameDay(day.date, selection.end));
        var sharpTransitRight = lastDayOfWeek &&
            lastDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay(day.date, selection.start) || isSameDay(day.date, selection.end));
        var dayProps = getDayProps(day);
        var onClick = dayProps.onClick;
        var handleDayClick = function (e) {
            if (!day.disabled)
                onClick(e);
        };
        return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        React.createElement("td", __assign({}, dayProps, { key: day.date.getTime(), className: cn(styles.dayWrapper, (_a = {},
                _a[styles.range] = inRange,
                _a[styles.rangeComplete] = inRange && rangeComplete,
                _a[styles.transitLeft] = transitLeft,
                _a[styles.transitRight] = transitRight,
                _a[styles.sharpTransitLeft] = sharpTransitLeft,
                _a[styles.sharpTransitRight] = sharpTransitRight,
                _a[styles.rangeStart] = rangeStart,
                _a[styles.rangeEnd] = rangeEnd,
                _a[styles.cursorPointer] = !day.disabled,
                _a)), align: 'center', ref: function (node) {
                /**
                 * После анимации реф-коллбэк вызывается еще раз, и в него передается null и старый activeMonth.
                 * Поэтому приходится хранить актуальный месяц в рефе и сравнивать с ним.
                 */
                if (startOfMonth(day.date).getTime() === activeMonthRef.current.getTime()) {
                    dayProps.ref(node);
                }
            }, onClick: handleDayClick }),
            React.createElement(Button, { type: 'button', view: 'ghost', size: 'xs', disabled: day.disabled, className: cn(styles.day, (_b = {},
                    _b[styles.selected] = daySelected,
                    _b[styles.today] = isToday(day.date),
                    _b[styles.disabled] = day.disabled,
                    _b[styles.holiday] = !day.disabled && day.holiday,
                    _b[styles.highlighted] = dayHighlighted,
                    _b)) },
                day.event && React.createElement("span", { className: styles.dot }),
                day.date.getDate())));
    };
    var renderWeek = function (week, weekIdx) { return (React.createElement("tr", { key: weekIdx }, week.map(renderDay))); };
    return (React.createElement("table", { className: cn(styles.daysTable, directionRef.current && styles[directionRef.current], (_b = {},
            _b[styles.responsive] = responsive,
            _b)) },
        hasHeader && (React.createElement("thead", null,
            React.createElement("tr", null, renderHeader()))),
        React.createElement(TransitionGroup, { component: null },
            React.createElement(CSSTransition, { key: activeMonth.getTime(), timeout: 300, classNames: {
                    enter: styles.daysEnter,
                    enterActive: styles.daysEnterActive,
                    exit: styles.daysExit,
                    exitActive: styles.daysExitActive,
                } },
                React.createElement("tbody", null, weeks.map(renderWeek))))));
};

export { DaysTable };
