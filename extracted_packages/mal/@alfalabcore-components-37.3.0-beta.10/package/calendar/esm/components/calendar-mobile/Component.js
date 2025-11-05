import { a as __rest, _ as __assign, b as __spreadArray } from '../../tslib.es6-4869e457.js';
import React, { forwardRef, useRef, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import { Button } from '../../../../button/esm';
import { ModalMobile } from '../../../../modal/esm/mobile';
import { CalendarDesktop } from '../../Component.desktop.js';
import '@alfalab/hooks';
import 'date-fns/differenceInDays';
import { useCalendar } from '../../useCalendar.js';
import 'date-fns/endOfWeek';
import 'date-fns/startOfWeek';
import '../../../../icon-button/esm';
import '@alfalab/icons-glyph/ChevronBackMIcon';
import { WEEKDAYS, limitDate, dateArrayToHashTable, generateMonths, generateWeeks, monthName } from '../../utils.js';
import 'date-fns/addDays';
import 'date-fns/addMonths';
import 'date-fns/addQuarters';
import 'date-fns/addWeeks';
import 'date-fns/addYears';
import 'date-fns/endOfMonth';
import 'date-fns/endOfQuarter';
import 'date-fns/endOfYear';
import 'date-fns/getQuarter';
import 'date-fns/getYear';
import 'date-fns/isToday';
import 'date-fns/isYesterday';
import 'date-fns/startOfQuarter';
import 'date-fns/startOfYear';
import { DaysTable } from '../days-table/Component.js';
import '../header/Component.js';
import '../month-year-header/Component.js';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '../select-button/Component.js';
import 'date-fns/eachDayOfInterval';
import 'date-fns/eachMonthOfInterval';
import 'date-fns/eachYearOfInterval';
import 'date-fns/format';
import 'date-fns/isAfter';
import 'date-fns/isBefore';
import 'date-fns/isSameDay';
import 'date-fns/lastDayOfMonth';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/parse';
import 'date-fns/subDays';
import 'date-fns/subMonths';
import '../months-table/Component.js';
import 'date-fns/isSameMonth';
import 'date-fns/isThisMonth';
import '../period-slider/Component.js';
import '../years-table/Component.js';
import 'date-fns/isSameYear';
import 'date-fns/isThisYear';
import 'react-transition-group';
import 'date-fns/isEqual';
import 'date-fns/isLastDayOfMonth';
import 'date-fns/isWithinInterval';
import 'react-merge-refs';
import 'date-fns/setYear';
import 'date-fns/subYears';
import '../period-slider/utils.js';

var styles = {"wrapper":"calendar__wrapper_nsqhb","withZIndex":"calendar__withZIndex_nsqhb","calendar":"calendar__calendar_nsqhb","dayNames":"calendar__dayNames_nsqhb","withHeader":"calendar__withHeader_nsqhb","month":"calendar__month_nsqhb","daysTable":"calendar__daysTable_nsqhb","dayName":"calendar__dayName_nsqhb"};
require('./index.css');

// ResizeObserverPolyfill необходим для корректной работы react-virtuoso.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver;
}
var CalendarMonthOnlyView = function (_a) {
    var value = _a.value, defaultView = _a.defaultView, monthTimestamp = _a.month, minDateTimestamp = _a.minDate, maxDateTimestamp = _a.maxDate, defaultMonthTimestamp = _a.defaultMonth, offDays = _a.offDays, events = _a.events, holidays = _a.holidays, onChange = _a.onChange, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, rangeComplete = _a.rangeComplete, onMonthChange = _a.onMonthChange, _b = _a.yearsAmount, yearsAmount = _b === void 0 ? 3 : _b;
    var initialMonthIndex = useMemo(function () {
        var currentMonthIndex = new Date().getMonth();
        return yearsAmount * 12 + currentMonthIndex;
    }, [yearsAmount]);
    var month = useMemo(function () { return (monthTimestamp ? new Date(monthTimestamp) : undefined); }, [monthTimestamp]);
    var minDate = useMemo(function () { return (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined); }, [minDateTimestamp]);
    var maxDate = useMemo(function () { return (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined); }, [maxDateTimestamp]);
    var selected = useMemo(function () { return (value ? new Date(value) : undefined); }, [value]);
    var defaultMonth = useMemo(function () {
        return startOfMonth(selected ||
            limitDate(defaultMonthTimestamp || Date.now(), minDateTimestamp, maxDateTimestamp));
    }, [defaultMonthTimestamp, maxDateTimestamp, minDateTimestamp, selected]);
    var _c = useCalendar({
        month: month,
        defaultMonth: defaultMonth,
        view: defaultView,
        minDate: minDate,
        maxDate: maxDate,
        selected: selected,
        offDays: offDays,
        events: events,
        onChange: onChange,
        onMonthChange: onMonthChange,
    }), activeMonth = _c.activeMonth, months = _c.months, highlighted = _c.highlighted, getDayProps = _c.getDayProps;
    var activeMonths = useMemo(function () {
        var eventsMap = dateArrayToHashTable(events || []);
        var offDaysMap = dateArrayToHashTable(offDays || []);
        var holidaysMap = dateArrayToHashTable(holidays || []);
        var prevMonths = [];
        var nextMonths = [];
        var date = new Date();
        var currentYear = date.getFullYear();
        for (var i = 0; i < yearsAmount; i++) {
            var prevYear = date.setFullYear(currentYear - (i + 1));
            var nextYear = date.setFullYear(currentYear + (i + 1));
            var prevYearMonths = generateMonths(new Date(prevYear), {});
            var nextYearMonths = generateMonths(new Date(nextYear), {});
            prevMonths.unshift.apply(prevMonths, prevYearMonths);
            nextMonths.push.apply(nextMonths, nextYearMonths);
        }
        var generatedMonths = __spreadArray(__spreadArray(__spreadArray([], prevMonths, true), months, true), nextMonths, true);
        return generatedMonths.map(function (item) { return (__assign(__assign({}, item), { weeks: generateWeeks(item.date, {
                minDate: minDate,
                maxDate: maxDate,
                selected: selected,
                eventsMap: eventsMap,
                offDaysMap: offDaysMap,
                holidaysMap: holidaysMap,
            }), title: "".concat(monthName(item.date), " ").concat(item.date.getFullYear()) })); });
    }, [events, offDays, holidays, months, yearsAmount, minDate, maxDate, selected]);
    var renderMonth = function (index) { return (React.createElement("div", { className: styles.daysTable, id: "month-".concat(index) },
        React.createElement("span", { className: styles.month }, activeMonths[index].title),
        React.createElement(DaysTable, { weeks: activeMonths[index].weeks, activeMonth: activeMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, getDayProps: getDayProps, highlighted: highlighted, rangeComplete: rangeComplete, hasHeader: false, responsive: true }))); };
    return (React.createElement(Virtuoso, { totalCount: activeMonths.length, itemContent: renderMonth, initialTopMostItemIndex: initialMonthIndex, increaseViewportBy: 800, itemSize: function (el) { return el.getBoundingClientRect().height + 32; } }));
};
var CalendarMobile = forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.hasHeader, hasHeader = _d === void 0 ? true : _d, _e = _a.allowSelectionFromEmptyRange, allowSelectionFromEmptyRange = _e === void 0 ? false : _e, className = _a.className, _f = _a.defaultView, defaultView = _f === void 0 ? 'days' : _f, _g = _a.selectorView, selectorView = _g === void 0 ? 'full' : _g, value = _a.value, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, onChange = _a.onChange, dataTestId = _a.dataTestId, open = _a.open, onClose = _a.onClose, _h = _a.title, title = _h === void 0 ? 'Календарь' : _h, _j = _a.yearsAmount, yearsAmount = _j === void 0 ? 3 : _j, restProps = __rest(_a, ["hasHeader", "allowSelectionFromEmptyRange", "className", "defaultView", "selectorView", "value", "selectedFrom", "selectedTo", "onChange", "dataTestId", "open", "onClose", "title", "yearsAmount"]);
    var modalRef = useRef(null);
    var monthOnlyView = selectorView === 'month-only';
    var handleClose = function () {
        if (onClose)
            onClose();
    };
    var handleClear = function () {
        if (onChange)
            onChange();
    };
    var renderDayNames = function () { return (React.createElement("table", { className: styles.dayNames },
        React.createElement("thead", null,
            React.createElement("tr", null, WEEKDAYS.map(function (dayName) { return (React.createElement("th", { className: styles.dayName, key: dayName }, dayName)); }))))); };
    var renderContent = function () {
        var commonProps = {
            value: value,
            onChange: onChange,
            defaultView: defaultView,
            selectorView: selectorView,
            selectedFrom: selectedFrom,
            selectedTo: selectedTo,
        };
        if (monthOnlyView) {
            return (React.createElement(CalendarMonthOnlyView, __assign({ open: open, yearsAmount: yearsAmount }, commonProps, restProps)));
        }
        return (React.createElement(CalendarDesktop, __assign({ responsive: true, className: styles.calendar }, commonProps, restProps)));
    };
    var renderFooter = function () {
        if (selectedFrom || selectedTo) {
            var selectButtonDisabled = !selectedFrom || !selectedTo;
            if (allowSelectionFromEmptyRange) {
                selectButtonDisabled = !selectedFrom;
            }
            return (React.createElement(React.Fragment, null,
                React.createElement(Button, { view: 'primary', size: 's', block: true, onClick: handleClose, disabled: selectButtonDisabled }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C"),
                React.createElement(Button, { view: 'secondary', size: 's', block: true, onClick: handleClear }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C")));
        }
        if (value) {
            return (React.createElement(Button, { view: 'primary', size: 's', block: true, onClick: handleClose }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C"));
        }
        return (React.createElement(Button, { view: 'secondary', size: 's', block: true, onClick: handleClose }, "\u041E\u0442\u043C\u0435\u043D\u0430"));
    };
    return (React.createElement("div", { className: cn(className, styles.component), ref: ref, "data-test-id": dataTestId },
        React.createElement(ModalMobile, { open: open, onClose: handleClose, ref: modalRef, className: styles.modal, wrapperClassName: styles.wrapper },
            hasHeader && (React.createElement(ModalMobile.Header, { hasCloser: true, title: title, align: 'center', leftAddons: React.createElement("div", null), sticky: true, className: cn((_b = {}, _b[styles.withZIndex] = selectorView === 'full', _b)) })),
            monthOnlyView && renderDayNames(),
            React.createElement(ModalMobile.Content, { flex: true }, renderContent()),
            React.createElement(ModalMobile.Footer, { sticky: true, className: cn((_c = {}, _c[styles.withZIndex] = selectorView === 'full', _c)) }, renderFooter()))));
});

export { CalendarMobile };
