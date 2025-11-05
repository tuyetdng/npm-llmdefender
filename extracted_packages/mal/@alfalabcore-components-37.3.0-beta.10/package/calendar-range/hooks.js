var React = require('react');
var addMonths = require('date-fns/addMonths');
var isEqual = require('date-fns/isEqual');
var max = require('date-fns/max');
var min = require('date-fns/min');
var startOfMonth = require('date-fns/startOfMonth');
var subMonths = require('date-fns/subMonths');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var addMonths__default = /*#__PURE__*/_interopDefaultCompat(addMonths);
var isEqual__default = /*#__PURE__*/_interopDefaultCompat(isEqual);
var max__default = /*#__PURE__*/_interopDefaultCompat(max);
var min__default = /*#__PURE__*/_interopDefaultCompat(min);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);
var subMonths__default = /*#__PURE__*/_interopDefaultCompat(subMonths);

function usePopoverViewMonthes(_a) {
    var dateFrom = _a.dateFrom, dateTo = _a.dateTo, defaultMonth = _a.defaultMonth, resetKey = _a.resetKey;
    var _b = React.useState(), monthFrom = _b[0], setMonthFrom = _b[1];
    var _c = React.useState(), monthTo = _c[0], setMonthTo = _c[1];
    var handleMonthFromChange = React.useCallback(function (newMonthFrom) {
        setMonthFrom(newMonthFrom);
        if (!dateTo) {
            setMonthTo(newMonthFrom);
        }
    }, [dateTo]);
    var handleMonthToChange = React.useCallback(function (newMonthTo) {
        setMonthTo(newMonthTo);
        if (!dateFrom) {
            setMonthFrom(newMonthTo);
        }
    }, [dateFrom]);
    React.useEffect(function () {
        setMonthFrom(dateFrom ? startOfMonth__default.default(dateFrom).getTime() : defaultMonth);
    }, [defaultMonth, dateFrom, resetKey]);
    React.useEffect(function () {
        setMonthTo(dateTo ? startOfMonth__default.default(dateTo).getTime() : monthFrom);
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
    var initialMonthFrom = React.useMemo(function () { return startOfMonth__default.default(selectedFrom || selectedTo || defaultMonth).getTime(); }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    /**
     * Правый месяц должен быть как минимум на 1 месяц больше левого
     */
    var initialMonthTo = React.useMemo(function () {
        return max__default.default([
            selectedTo ? startOfMonth__default.default(selectedTo) : 0,
            addMonths__default.default(initialMonthFrom, 1),
        ]).getTime();
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    if (defaultMonthPosition === 'right') {
        initialMonthTo = initialMonthFrom;
        initialMonthFrom = subMonths__default.default(initialMonthFrom, 1).getTime();
    }
    var _b = React.useState(initialMonthFrom), monthFrom = _b[0], setMonthFrom = _b[1];
    var _c = React.useState(initialMonthTo), monthTo = _c[0], setMonthTo = _c[1];
    var handleMonthFromChange = React.useCallback(function (newMonthFrom) {
        setMonthFrom(newMonthFrom);
        if (monthTo && isEqual__default.default(newMonthFrom, monthTo)) {
            var nextMonth = addMonths__default.default(newMonthFrom, 1).getTime();
            setMonthTo(nextMonth);
        }
    }, [monthTo]);
    var handleMonthToChange = React.useCallback(function (newMonthTo) {
        setMonthTo(newMonthTo);
        if (monthFrom && isEqual__default.default(newMonthTo, monthFrom)) {
            var prevMonth = subMonths__default.default(newMonthTo, 1).getTime();
            setMonthFrom(prevMonth);
        }
    }, [monthFrom]);
    // eslint-disable-next-line complexity
    React.useEffect(function () {
        var selectedFromMonth = selectedFrom ? startOfMonth__default.default(selectedFrom).getTime() : undefined;
        var selectedToMonth = selectedTo ? startOfMonth__default.default(selectedTo).getTime() : undefined;
        // Проверяем, показываются ли выбранные месяцы в левой или правой части компонента
        var fromMonthOnLeft = selectedFromMonth && selectedFromMonth === monthFrom;
        var fromMonthOnRight = selectedFromMonth && selectedFromMonth === monthTo;
        var toMonthOnRight = selectedToMonth && selectedToMonth === monthTo;
        var toMonthOnLeft = selectedToMonth && selectedToMonth === monthFrom;
        var fromMonthOnScreen = fromMonthOnLeft || fromMonthOnRight;
        var toMonthOnScreen = toMonthOnLeft || toMonthOnRight;
        if (fromMonthOnLeft && toMonthOnLeft) {
            setMonthTo(max__default.default([addMonths__default.default(selectedFromMonth, 1), monthTo]).getTime());
            return;
        }
        if (fromMonthOnRight && toMonthOnRight) {
            setMonthFrom(min__default.default([subMonths__default.default(selectedToMonth, 1), monthFrom]).getTime());
            return;
        }
        if (selectedFromMonth && selectedToMonth) {
            setMonthFrom(selectedFromMonth);
            setMonthTo(max__default.default([addMonths__default.default(selectedFromMonth, 1), selectedToMonth]).getTime());
            return;
        }
        if (selectedFromMonth && !selectedToMonth && !fromMonthOnScreen) {
            setMonthFrom(selectedFromMonth);
            setMonthTo(max__default.default([addMonths__default.default(selectedFromMonth, 1), monthTo]).getTime());
        }
        if (selectedToMonth && !selectedFromMonth && !toMonthOnScreen) {
            setMonthTo(selectedToMonth);
            setMonthFrom(min__default.default([subMonths__default.default(selectedToMonth, 1), monthFrom]).getTime());
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
    return React.useMemo(function () {
        if (from && to) {
            return {
                rangeComplete: true,
                selectedFrom: min__default.default([from, to]).getTime(),
                selectedTo: max__default.default([from, to]).getTime(),
            };
        }
        var dates = [from, to, highlighted].filter(function (date) { return date !== undefined; });
        return {
            rangeComplete: false,
            selectedFrom: from || dates.length === 2 ? min__default.default(dates).getTime() : undefined,
            selectedTo: to || dates.length === 2 ? max__default.default(dates).getTime() : undefined,
        };
    }, [from, highlighted, to]);
}

exports.usePopoverViewMonthes = usePopoverViewMonthes;
exports.useSelectionProps = useSelectionProps;
exports.useStaticViewMonthes = useStaticViewMonthes;
