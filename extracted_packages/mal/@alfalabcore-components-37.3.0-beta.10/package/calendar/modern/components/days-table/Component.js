import React, { useRef, useCallback } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import isEqual from 'date-fns/isEqual';
import isLastDayOfMonth from 'date-fns/isLastDayOfMonth';
import isSameDay from 'date-fns/isSameDay';
import isToday from 'date-fns/isToday';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfMonth from 'date-fns/startOfMonth';
import { Button } from '../../../../button/modern';
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

const styles = {"daysTable":"calendar__daysTable_94q4q","responsive":"calendar__responsive_94q4q","dayName":"calendar__dayName_94q4q","day":"calendar__day_94q4q","highlighted":"calendar__highlighted_94q4q","range":"calendar__range_94q4q","disabled":"calendar__disabled_94q4q","holiday":"calendar__holiday_94q4q","today":"calendar__today_94q4q","rangeComplete":"calendar__rangeComplete_94q4q","selected":"calendar__selected_94q4q","dayWrapper":"calendar__dayWrapper_94q4q","cursorPointer":"calendar__cursorPointer_94q4q","rangeEnd":"calendar__rangeEnd_94q4q","rangeStart":"calendar__rangeStart_94q4q","transitLeft":"calendar__transitLeft_94q4q","transitRight":"calendar__transitRight_94q4q","sharpTransitLeft":"calendar__sharpTransitLeft_94q4q","sharpTransitRight":"calendar__sharpTransitRight_94q4q","daysEnter":"calendar__daysEnter_94q4q","left":"calendar__left_94q4q","daysEnterActive":"calendar__daysEnterActive_94q4q","daysExit":"calendar__daysExit_94q4q","daysExitActive":"calendar__daysExitActive_94q4q","right":"calendar__right_94q4q","dot":"calendar__dot_94q4q"};
require('./index.css');

/* eslint-disable complexity */
const DaysTable = ({ weeks = [], activeMonth = new Date(), highlighted, selectedFrom, selectedTo, rangeComplete = selectedFrom && selectedTo, getDayProps, hasHeader = true, responsive, }) => {
    const activeMonthRef = useRef(activeMonth);
    const directionRef = useRef();
    activeMonthRef.current = activeMonth;
    const prevActiveMonth = usePrevious(activeMonth);
    if (prevActiveMonth && prevActiveMonth !== activeMonth) {
        directionRef.current = activeMonth < prevActiveMonth ? 'right' : 'left';
    }
    const selection = getSelectionRange(selectedFrom, selectedTo, highlighted);
    const renderHeader = useCallback(() => WEEKDAYS.map((dayName) => (React.createElement("th", { className: styles.dayName, key: dayName }, dayName))), []);
    const renderDay = (day, dayIdx) => {
        if (!day)
            return React.createElement("td", { key: dayIdx });
        const daySelected = day.selected ||
            (selectedFrom && isSameDay(day.date, selectedFrom)) ||
            (selectedTo && isSameDay(day.date, selectedTo));
        const dayHighlighted = highlighted && isEqual(day.date, highlighted);
        const inRange = selection && isWithinInterval(day.date, selection);
        const firstDayOfMonth = day.date.getDate() === 1;
        const lastDayOfMonth = isLastDayOfMonth(day.date);
        const firstDayOfWeek = russianWeekDay(day.date) === 0;
        const lastDayOfWeek = russianWeekDay(day.date) === 6;
        const transitLeft = firstDayOfMonth && inRange && selection && day.date > selection.start;
        const transitRight = lastDayOfMonth && inRange && selection && day.date < selection.end;
        const rangeStart = selection && isSameDay(day.date, selection.start);
        const rangeEnd = selection && isSameDay(day.date, selection.end);
        const sharpTransitLeft = firstDayOfWeek &&
            firstDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay(day.date, selection.start) || isSameDay(day.date, selection.end));
        const sharpTransitRight = lastDayOfWeek &&
            lastDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay(day.date, selection.start) || isSameDay(day.date, selection.end));
        const dayProps = getDayProps(day);
        const { onClick } = dayProps;
        const handleDayClick = (e) => {
            if (!day.disabled)
                onClick(e);
        };
        return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        React.createElement("td", { ...dayProps, key: day.date.getTime(), className: cn(styles.dayWrapper, {
                [styles.range]: inRange,
                [styles.rangeComplete]: inRange && rangeComplete,
                [styles.transitLeft]: transitLeft,
                [styles.transitRight]: transitRight,
                [styles.sharpTransitLeft]: sharpTransitLeft,
                [styles.sharpTransitRight]: sharpTransitRight,
                [styles.rangeStart]: rangeStart,
                [styles.rangeEnd]: rangeEnd,
                [styles.cursorPointer]: !day.disabled,
            }), align: 'center', ref: (node) => {
                /**
                 * После анимации реф-коллбэк вызывается еще раз, и в него передается null и старый activeMonth.
                 * Поэтому приходится хранить актуальный месяц в рефе и сравнивать с ним.
                 */
                if (startOfMonth(day.date).getTime() === activeMonthRef.current.getTime()) {
                    dayProps.ref(node);
                }
            }, onClick: handleDayClick },
            React.createElement(Button, { type: 'button', view: 'ghost', size: 'xs', disabled: day.disabled, className: cn(styles.day, {
                    [styles.selected]: daySelected,
                    [styles.today]: isToday(day.date),
                    [styles.disabled]: day.disabled,
                    [styles.holiday]: !day.disabled && day.holiday,
                    [styles.highlighted]: dayHighlighted,
                }) },
                day.event && React.createElement("span", { className: styles.dot }),
                day.date.getDate())));
    };
    const renderWeek = (week, weekIdx) => (React.createElement("tr", { key: weekIdx }, week.map(renderDay)));
    return (React.createElement("table", { className: cn(styles.daysTable, directionRef.current && styles[directionRef.current], {
            [styles.responsive]: responsive,
        }) },
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
