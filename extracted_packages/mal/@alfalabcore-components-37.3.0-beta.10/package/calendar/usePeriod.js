var React = require('react');
var differenceInDays = require('date-fns/differenceInDays');
var hooks = require('@alfalab/hooks');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var differenceInDays__default = /*#__PURE__*/_interopDefaultCompat(differenceInDays);

function usePeriod(_a) {
    var _b = _a === void 0 ? {} : _a, onPeriodChange = _b.onPeriodChange, initialSelectedFrom = _b.initialSelectedFrom, initialSelectedTo = _b.initialSelectedTo;
    var _c = React.useState(initialSelectedFrom), selectedFrom = _c[0], setSelectedFrom = _c[1];
    var _d = React.useState(initialSelectedTo), selectedTo = _d[0], setSelectedTo = _d[1];
    var resetPeriod = React.useCallback(function () {
        setSelectedFrom(undefined);
        setSelectedTo(undefined);
    }, []);
    var setStart = React.useCallback(function (date) {
        setSelectedFrom(date);
    }, []);
    var setEnd = React.useCallback(function (date) {
        setSelectedTo(date);
    }, []);
    var updatePeriod = React.useCallback(function (date) {
        // сбрасываем выделение
        if (date === undefined || (date === selectedTo && date === selectedFrom)) {
            resetPeriod();
            return;
        }
        // сбрасываем конец, если выбранная дата совпадает с ним
        if (date === selectedTo) {
            setSelectedTo(undefined);
            return;
        }
        // сбрасываем начало, если выбранная дата совпадает с ним
        if (date === selectedFrom) {
            if (selectedTo) {
                setSelectedFrom(selectedTo);
                setSelectedTo(undefined);
            }
            else {
                setSelectedTo(date);
            }
            return;
        }
        if (!selectedFrom) {
            if (selectedTo) {
                setSelectedFrom(Math.min(date, selectedTo));
                setSelectedTo(Math.max(date, selectedTo));
            }
            else {
                // начинаем выделение
                setSelectedFrom(date);
            }
            return;
        }
        // заканчиваем выделение
        if (!selectedTo) {
            setSelectedFrom(Math.min(date, selectedFrom));
            setSelectedTo(Math.max(date, selectedFrom));
            return;
        }
        // сдвигаем тот конец выделения, который ближе к выбранной дате
        if (Math.abs(differenceInDays__default.default(date, selectedTo)) >
            Math.abs(differenceInDays__default.default(date, selectedFrom))) {
            setSelectedFrom(date);
        }
        else {
            setSelectedTo(date);
        }
    }, [resetPeriod, selectedFrom, selectedTo]);
    hooks.useDidUpdateEffect(function () {
        if (onPeriodChange) {
            onPeriodChange(selectedFrom, selectedTo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFrom, selectedTo]);
    return {
        selectedFrom: selectedFrom,
        selectedTo: selectedTo,
        setStart: setStart,
        setEnd: setEnd,
        resetPeriod: resetPeriod,
        updatePeriod: updatePeriod,
    };
}
function usePeriodWithReset(_a) {
    var _b = _a === void 0 ? {} : _a, onPeriodChange = _b.onPeriodChange, initialSelectedFrom = _b.initialSelectedFrom, initialSelectedTo = _b.initialSelectedTo;
    var _c = React.useState(initialSelectedFrom), selectedFrom = _c[0], setSelectedFrom = _c[1];
    var _d = React.useState(initialSelectedTo), selectedTo = _d[0], setSelectedTo = _d[1];
    var resetPeriod = React.useCallback(function () {
        setSelectedFrom(undefined);
        setSelectedTo(undefined);
    }, []);
    var setStart = React.useCallback(function (date) {
        setSelectedFrom(date);
    }, []);
    var setEnd = React.useCallback(function (date) {
        setSelectedTo(date);
    }, []);
    var updatePeriod = React.useCallback(function (date) {
        // сбрасываем выделение
        if (date === undefined) {
            resetPeriod();
            return;
        }
        if (!selectedFrom && selectedTo) {
            setSelectedFrom(Math.min(date, selectedTo));
            setSelectedTo(Math.max(date, selectedTo));
            return;
        }
        if (!selectedFrom) {
            // начинаем выделение
            setSelectedFrom(date);
            return;
        }
        // заканчиваем выделение
        if (!selectedTo) {
            setSelectedFrom(Math.min(date, selectedFrom));
            setSelectedTo(Math.max(date, selectedFrom));
            return;
        }
        // Если обе даты уже выбраны, начинаем выделение заново
        setSelectedTo(undefined);
        setSelectedFrom(date);
    }, [resetPeriod, selectedFrom, selectedTo]);
    hooks.useDidUpdateEffect(function () {
        if (onPeriodChange) {
            onPeriodChange(selectedFrom, selectedTo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFrom, selectedTo]);
    return {
        selectedFrom: selectedFrom,
        selectedTo: selectedTo,
        setStart: setStart,
        setEnd: setEnd,
        resetPeriod: resetPeriod,
        updatePeriod: updatePeriod,
    };
}

exports.usePeriod = usePeriod;
exports.usePeriodWithReset = usePeriodWithReset;
