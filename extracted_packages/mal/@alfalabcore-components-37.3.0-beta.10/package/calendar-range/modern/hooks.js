import { useState, useCallback, useEffect, useMemo } from 'react';
import addMonths from 'date-fns/addMonths';
import isEqual from 'date-fns/isEqual';
import max from 'date-fns/max';
import min from 'date-fns/min';
import startOfMonth from 'date-fns/startOfMonth';
import subMonths from 'date-fns/subMonths';

function usePopoverViewMonthes({ dateFrom, dateTo, defaultMonth, resetKey, }) {
    const [monthFrom, setMonthFrom] = useState();
    const [monthTo, setMonthTo] = useState();
    const handleMonthFromChange = useCallback((newMonthFrom) => {
        setMonthFrom(newMonthFrom);
        if (!dateTo) {
            setMonthTo(newMonthFrom);
        }
    }, [dateTo]);
    const handleMonthToChange = useCallback((newMonthTo) => {
        setMonthTo(newMonthTo);
        if (!dateFrom) {
            setMonthFrom(newMonthTo);
        }
    }, [dateFrom]);
    useEffect(() => {
        setMonthFrom(dateFrom ? startOfMonth(dateFrom).getTime() : defaultMonth);
    }, [defaultMonth, dateFrom, resetKey]);
    useEffect(() => {
        setMonthTo(dateTo ? startOfMonth(dateTo).getTime() : monthFrom);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateTo, resetKey]);
    return {
        monthFrom,
        monthTo,
        handleMonthFromChange,
        handleMonthToChange,
    };
}
function useStaticViewMonthes({ selectedFrom, selectedTo, defaultMonth, defaultMonthPosition, }) {
    /**
     * Если указана начальная дата — левый месяц равен ей, иначе используется дата конца.
     * Если обе даты не указаны, то используется дефолтный месяц
     */
    let initialMonthFrom = useMemo(() => startOfMonth(selectedFrom || selectedTo || defaultMonth).getTime(), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    /**
     * Правый месяц должен быть как минимум на 1 месяц больше левого
     */
    let initialMonthTo = useMemo(() => max([
        selectedTo ? startOfMonth(selectedTo) : 0,
        addMonths(initialMonthFrom, 1),
    ]).getTime(), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    if (defaultMonthPosition === 'right') {
        initialMonthTo = initialMonthFrom;
        initialMonthFrom = subMonths(initialMonthFrom, 1).getTime();
    }
    const [monthFrom, setMonthFrom] = useState(initialMonthFrom);
    const [monthTo, setMonthTo] = useState(initialMonthTo);
    const handleMonthFromChange = useCallback((newMonthFrom) => {
        setMonthFrom(newMonthFrom);
        if (monthTo && isEqual(newMonthFrom, monthTo)) {
            const nextMonth = addMonths(newMonthFrom, 1).getTime();
            setMonthTo(nextMonth);
        }
    }, [monthTo]);
    const handleMonthToChange = useCallback((newMonthTo) => {
        setMonthTo(newMonthTo);
        if (monthFrom && isEqual(newMonthTo, monthFrom)) {
            const prevMonth = subMonths(newMonthTo, 1).getTime();
            setMonthFrom(prevMonth);
        }
    }, [monthFrom]);
    // eslint-disable-next-line complexity
    useEffect(() => {
        const selectedFromMonth = selectedFrom ? startOfMonth(selectedFrom).getTime() : undefined;
        const selectedToMonth = selectedTo ? startOfMonth(selectedTo).getTime() : undefined;
        // Проверяем, показываются ли выбранные месяцы в левой или правой части компонента
        const fromMonthOnLeft = selectedFromMonth && selectedFromMonth === monthFrom;
        const fromMonthOnRight = selectedFromMonth && selectedFromMonth === monthTo;
        const toMonthOnRight = selectedToMonth && selectedToMonth === monthTo;
        const toMonthOnLeft = selectedToMonth && selectedToMonth === monthFrom;
        const fromMonthOnScreen = fromMonthOnLeft || fromMonthOnRight;
        const toMonthOnScreen = toMonthOnLeft || toMonthOnRight;
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
        monthFrom,
        monthTo,
        handleMonthFromChange,
        handleMonthToChange,
    };
}
function useSelectionProps(from, to, highlighted) {
    return useMemo(() => {
        if (from && to) {
            return {
                rangeComplete: true,
                selectedFrom: min([from, to]).getTime(),
                selectedTo: max([from, to]).getTime(),
            };
        }
        const dates = [from, to, highlighted].filter((date) => date !== undefined);
        return {
            rangeComplete: false,
            selectedFrom: from || dates.length === 2 ? min(dates).getTime() : undefined,
            selectedTo: to || dates.length === 2 ? max(dates).getTime() : undefined,
        };
    }, [from, highlighted, to]);
}

export { usePopoverViewMonthes, useSelectionProps, useStaticViewMonthes };
