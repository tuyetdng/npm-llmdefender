import { useState, useCallback, useEffect, useMemo } from 'react';
import addMonths from 'date-fns/addMonths';
import isEqual from 'date-fns/isEqual';
import max from 'date-fns/max';
import min from 'date-fns/min';
import startOfMonth from 'date-fns/startOfMonth';
import subMonths from 'date-fns/subMonths';

function usePopoverViewMonthes(_a) {
    var dateFrom = _a.dateFrom, dateTo = _a.dateTo, defaultMonth = _a.defaultMonth, resetKey = _a.resetKey;
    var _b = useState(), monthFrom = _b[0], setMonthFrom = _b[1];
    var _c = useState(), monthTo = _c[0], setMonthTo = _c[1];
    var handleMonthFromChange = useCallback(function (newMonthFrom) {
        setMonthFrom(newMonthFrom);
        if (!dateTo) {
            setMonthTo(newMonthFrom);
        }
    }, [dateTo]);
    var handleMonthToChange = useCallback(function (newMonthTo) {
        setMonthTo(newMonthTo);
        if (!dateFrom) {
            setMonthFrom(newMonthTo);
        }
    }, [dateFrom]);
    useEffect(function () {
        setMonthFrom(dateFrom ? startOfMonth(dateFrom).getTime() : defaultMonth);
    }, [defaultMonth, dateFrom, resetKey]);
    useEffect(function () {
        setMonthTo(dateTo ? startOfMonth(dateTo).getTime() : monthFrom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateTo, resetKey]);
    return {
        monthFrom: monthFrom,
        monthTo: monthTo,
        handleMonthFromChange: handleMonthFromChange,
        handleMonthToChange: handleMonthToChange,
    };
}
function useStaticViewMonthes(_a) {
    var selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, defaultMonth = _a.defaultMonth, defaultMonthPosition = _a.defaultMonthPosition;
    /**
     * Если указана начальная дата — левый месяц равен ей, иначе используется дата конца.
     * Если обе даты не указаны, то используется дефолтный месяц
     */
    var initialMonthFrom = useMemo(function () { return startOfMonth(selectedFrom || selectedTo || defaultMonth).getTime(); }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    /**
     * Правый месяц должен быть как минимум на 1 месяц больше левого
     */
    var initialMonthTo = useMemo(function () {
        return max([
            selectedTo ? startOfMonth(selectedTo) : 0,
            addMonths(initialMonthFrom, 1),
        ]).getTime();
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    if (defaultMonthPosition === 'right') {
        initialMonthTo = initialMonthFrom;
        initialMonthFrom = subMonths(initialMonthFrom, 1).getTime();
    }
    var _b = useState(initialMonthFrom), monthFrom = _b[0], setMonthFrom = _b[1];
    var _c = useState(initialMonthTo), monthTo = _c[0], setMonthTo = _c[1];
    var handleMonthFromChange = useCallback(function (newMonthFrom) {
        setMonthFrom(newMonthFrom);
        if (monthTo && isEqual(newMonthFrom, monthTo)) {
            var nextMonth = addMonths(newMonthFrom, 1).getTime();
            setMonthTo(nextMonth);
        }
    }, [monthTo]);
    var handleMonthToChange = useCallback(function (newMonthTo) {
        setMonthTo(newMonthTo);
        if (monthFrom && isEqual(newMonthTo, monthFrom)) {
            var prevMonth = subMonths(newMonthTo, 1).getTime();
            setMonthFrom(prevMonth);
        }
    }, [monthFrom]);
    // eslint-disable-next-line complexity
    useEffect(function () {
        var selectedFromMonth = selectedFrom ? startOfMonth(selectedFrom).getTime() : undefined;
        var selectedToMonth = selectedTo ? startOfMonth(selectedTo).getTime() : undefined;
        // Проверяем, показываются ли выбранные месяцы в левой или правой части компонента
        var fromMonthOnLeft = selectedFromMonth && selectedFromMonth === monthFrom;
        var fromMonthOnRight = selectedFromMonth && selectedFromMonth === monthTo;
        var toMonthOnRight = selectedToMonth && selectedToMonth === monthTo;
        var toMonthOnLeft = selectedToMonth && selectedToMonth === monthFrom;
        var fromMonthOnScreen = fromMonthOnLeft || fromMonthOnRight;
        var toMonthOnScreen = toMonthOnLeft || toMonthOnRight;
        if (fromMonthOnLeft && toMonthOnLeft) {
            setMonthTo(max([addMonths(selectedFromMonth, 1), monthTo]).getTime());
            return;
        }
        if (fromMonthOnRight && toMonthOnRight) {
            setMonthFrom(min([subMonths(selectedToMonth, 1), monthFrom]).getTime());
            return;
        }
        if (selectedFromMonth && selectedToMonth) {
            setMonthFrom(selectedFromMonth);
            setMonthTo(max([addMonths(selectedFromMonth, 1), selectedToMonth]).getTime());
            return;
        }
        if (selectedFromMonth && !selectedToMonth && !fromMonthOnScreen) {
            setMonthFrom(selectedFromMonth);
            setMonthTo(max([addMonths(selectedFromMonth, 1), monthTo]).getTime());
        }
        if (selectedToMonth && !selectedFromMonth && !toMonthOnScreen) {
            setMonthTo(selectedToMonth);
            setMonthFrom(min([subMonths(selectedToMonth, 1), monthFrom]).getTime());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFrom, selectedTo]);
    return {
        monthFrom: monthFrom,
        monthTo: monthTo,
        handleMonthFromChange: handleMonthFromChange,
        handleMonthToChange: handleMonthToChange,
    };
}
function useSelectionProps(from, to, highlighted) {
    return useMemo(function () {
        if (from && to) {
            return {
                rangeComplete: true,
                selectedFrom: min([from, to]).getTime(),
                selectedTo: max([from, to]).getTime(),
            };
        }
        var dates = [from, to, highlighted].filter(function (date) { return date !== undefined; });
        return {
            rangeComplete: false,
            selectedFrom: from || dates.length === 2 ? min(dates).getTime() : undefined,
            selectedTo: to || dates.length === 2 ? max(dates).getTime() : undefined,
        };
    }, [from, highlighted, to]);
}

export { usePopoverViewMonthes, useSelectionProps, useStaticViewMonthes };
