var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var reactVirtuoso = require('react-virtuoso');
var resizeObserver = require('@juggle/resize-observer');
var cn = require('classnames');
var endOfDay = require('date-fns/endOfDay');
var startOfDay = require('date-fns/startOfDay');
var startOfMonth = require('date-fns/startOfMonth');
var coreComponentsButton = require('../../../../button/cssm');
var mobile = require('../../../../modal/cssm/mobile');
var Component_desktop = require('../../Component.desktop.js');
require('@alfalab/hooks');
require('date-fns/differenceInDays');
var useCalendar = require('../../useCalendar.js');
require('date-fns/endOfWeek');
require('date-fns/startOfWeek');
require('../../../../icon-button/cssm');
require('@alfalab/icons-glyph/ChevronBackMIcon');
var utils = require('../../utils.js');
require('date-fns/addDays');
require('date-fns/addMonths');
require('date-fns/addQuarters');
require('date-fns/addWeeks');
require('date-fns/addYears');
require('date-fns/endOfMonth');
require('date-fns/endOfQuarter');
require('date-fns/endOfYear');
require('date-fns/getQuarter');
require('date-fns/getYear');
require('date-fns/isToday');
require('date-fns/isYesterday');
require('date-fns/startOfQuarter');
require('date-fns/startOfYear');
require('../period-slider/index.module.css');
var components_daysTable_Component = require('../days-table/Component.js');
var styles = require('./index.module.css');
require('../header/Component.js');
require('../header/index.module.css');
require('../month-year-header/Component.js');
require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
require('../select-button/Component.js');
require('../select-button/index.module.css');
require('../month-year-header/index.module.css');
require('date-fns/eachDayOfInterval');
require('date-fns/eachMonthOfInterval');
require('date-fns/eachYearOfInterval');
require('date-fns/format');
require('date-fns/isAfter');
require('date-fns/isBefore');
require('date-fns/isSameDay');
require('date-fns/lastDayOfMonth');
require('date-fns/max');
require('date-fns/min');
require('date-fns/parse');
require('date-fns/subDays');
require('date-fns/subMonths');
require('../months-table/Component.js');
require('date-fns/isSameMonth');
require('date-fns/isThisMonth');
require('../months-table/index.module.css');
require('../period-slider/Component.js');
require('../period-slider/utils.js');
require('../years-table/Component.js');
require('date-fns/isSameYear');
require('date-fns/isThisYear');
require('../years-table/index.module.css');
require('../../desktop.module.css');
require('react-transition-group');
require('date-fns/isEqual');
require('date-fns/isLastDayOfMonth');
require('date-fns/isWithinInterval');
require('../days-table/index.module.css');
require('react-merge-refs');
require('date-fns/setYear');
require('date-fns/subYears');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var endOfDay__default = /*#__PURE__*/_interopDefaultCompat(endOfDay);
var startOfDay__default = /*#__PURE__*/_interopDefaultCompat(startOfDay);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

// ResizeObserverPolyfill необходим для корректной работы react-virtuoso.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = resizeObserver.ResizeObserver;
}
var CalendarMonthOnlyView = function (_a) {
    var value = _a.value, defaultView = _a.defaultView, monthTimestamp = _a.month, minDateTimestamp = _a.minDate, maxDateTimestamp = _a.maxDate, defaultMonthTimestamp = _a.defaultMonth, offDays = _a.offDays, events = _a.events, holidays = _a.holidays, onChange = _a.onChange, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, rangeComplete = _a.rangeComplete, onMonthChange = _a.onMonthChange, _b = _a.yearsAmount, yearsAmount = _b === void 0 ? 3 : _b;
    var initialMonthIndex = React.useMemo(function () {
        var currentMonthIndex = new Date().getMonth();
        return yearsAmount * 12 + currentMonthIndex;
    }, [yearsAmount]);
    var month = React.useMemo(function () { return (monthTimestamp ? new Date(monthTimestamp) : undefined); }, [monthTimestamp]);
    var minDate = React.useMemo(function () { return (minDateTimestamp ? startOfDay__default.default(minDateTimestamp) : undefined); }, [minDateTimestamp]);
    var maxDate = React.useMemo(function () { return (maxDateTimestamp ? endOfDay__default.default(maxDateTimestamp) : undefined); }, [maxDateTimestamp]);
    var selected = React.useMemo(function () { return (value ? new Date(value) : undefined); }, [value]);
    var defaultMonth = React.useMemo(function () {
        return startOfMonth__default.default(selected ||
            utils.limitDate(defaultMonthTimestamp || Date.now(), minDateTimestamp, maxDateTimestamp));
    }, [defaultMonthTimestamp, maxDateTimestamp, minDateTimestamp, selected]);
    var _c = useCalendar.useCalendar({
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
    var activeMonths = React.useMemo(function () {
        var eventsMap = utils.dateArrayToHashTable(events || []);
        var offDaysMap = utils.dateArrayToHashTable(offDays || []);
        var holidaysMap = utils.dateArrayToHashTable(holidays || []);
        var prevMonths = [];
        var nextMonths = [];
        var date = new Date();
        var currentYear = date.getFullYear();
        for (var i = 0; i < yearsAmount; i++) {
            var prevYear = date.setFullYear(currentYear - (i + 1));
            var nextYear = date.setFullYear(currentYear + (i + 1));
            var prevYearMonths = utils.generateMonths(new Date(prevYear), {});
            var nextYearMonths = utils.generateMonths(new Date(nextYear), {});
            prevMonths.unshift.apply(prevMonths, prevYearMonths);
            nextMonths.push.apply(nextMonths, nextYearMonths);
        }
        var generatedMonths = tslib_es6.__spreadArray(tslib_es6.__spreadArray(tslib_es6.__spreadArray([], prevMonths, true), months, true), nextMonths, true);
        return generatedMonths.map(function (item) { return (tslib_es6.__assign(tslib_es6.__assign({}, item), { weeks: utils.generateWeeks(item.date, {
                minDate: minDate,
                maxDate: maxDate,
                selected: selected,
                eventsMap: eventsMap,
                offDaysMap: offDaysMap,
                holidaysMap: holidaysMap,
            }), title: "".concat(utils.monthName(item.date), " ").concat(item.date.getFullYear()) })); });
    }, [events, offDays, holidays, months, yearsAmount, minDate, maxDate, selected]);
    var renderMonth = function (index) { return (React__default.default.createElement("div", { className: styles__default.default.daysTable, id: "month-".concat(index) },
        React__default.default.createElement("span", { className: styles__default.default.month }, activeMonths[index].title),
        React__default.default.createElement(components_daysTable_Component.DaysTable, { weeks: activeMonths[index].weeks, activeMonth: activeMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, getDayProps: getDayProps, highlighted: highlighted, rangeComplete: rangeComplete, hasHeader: false, responsive: true }))); };
    return (React__default.default.createElement(reactVirtuoso.Virtuoso, { totalCount: activeMonths.length, itemContent: renderMonth, initialTopMostItemIndex: initialMonthIndex, increaseViewportBy: 800, itemSize: function (el) { return el.getBoundingClientRect().height + 32; } }));
};
var CalendarMobile = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var _d = _a.hasHeader, hasHeader = _d === void 0 ? true : _d, _e = _a.allowSelectionFromEmptyRange, allowSelectionFromEmptyRange = _e === void 0 ? false : _e, className = _a.className, _f = _a.defaultView, defaultView = _f === void 0 ? 'days' : _f, _g = _a.selectorView, selectorView = _g === void 0 ? 'full' : _g, value = _a.value, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, onChange = _a.onChange, dataTestId = _a.dataTestId, open = _a.open, onClose = _a.onClose, _h = _a.title, title = _h === void 0 ? 'Календарь' : _h, _j = _a.yearsAmount, yearsAmount = _j === void 0 ? 3 : _j, restProps = tslib_es6.__rest(_a, ["hasHeader", "allowSelectionFromEmptyRange", "className", "defaultView", "selectorView", "value", "selectedFrom", "selectedTo", "onChange", "dataTestId", "open", "onClose", "title", "yearsAmount"]);
    var modalRef = React.useRef(null);
    var monthOnlyView = selectorView === 'month-only';
    var handleClose = function () {
        if (onClose)
            onClose();
    };
    var handleClear = function () {
        if (onChange)
            onChange();
    };
    var renderDayNames = function () { return (React__default.default.createElement("table", { className: styles__default.default.dayNames },
        React__default.default.createElement("thead", null,
            React__default.default.createElement("tr", null, utils.WEEKDAYS.map(function (dayName) { return (React__default.default.createElement("th", { className: styles__default.default.dayName, key: dayName }, dayName)); }))))); };
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
            return (React__default.default.createElement(CalendarMonthOnlyView, tslib_es6.__assign({ open: open, yearsAmount: yearsAmount }, commonProps, restProps)));
        }
        return (React__default.default.createElement(Component_desktop.CalendarDesktop, tslib_es6.__assign({ responsive: true, className: styles__default.default.calendar }, commonProps, restProps)));
    };
    var renderFooter = function () {
        if (selectedFrom || selectedTo) {
            var selectButtonDisabled = !selectedFrom || !selectedTo;
            if (allowSelectionFromEmptyRange) {
                selectButtonDisabled = !selectedFrom;
            }
            return (React__default.default.createElement(React__default.default.Fragment, null,
                React__default.default.createElement(coreComponentsButton.Button, { view: 'primary', size: 's', block: true, onClick: handleClose, disabled: selectButtonDisabled }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C"),
                React__default.default.createElement(coreComponentsButton.Button, { view: 'secondary', size: 's', block: true, onClick: handleClear }, "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C")));
        }
        if (value) {
            return (React__default.default.createElement(coreComponentsButton.Button, { view: 'primary', size: 's', block: true, onClick: handleClose }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C"));
        }
        return (React__default.default.createElement(coreComponentsButton.Button, { view: 'secondary', size: 's', block: true, onClick: handleClose }, "\u041E\u0442\u043C\u0435\u043D\u0430"));
    };
    return (React__default.default.createElement("div", { className: cn__default.default(className, styles__default.default.component), ref: ref, "data-test-id": dataTestId },
        React__default.default.createElement(mobile.ModalMobile, { open: open, onClose: handleClose, ref: modalRef, className: styles__default.default.modal, wrapperClassName: styles__default.default.wrapper },
            hasHeader && (React__default.default.createElement(mobile.ModalMobile.Header, { hasCloser: true, title: title, align: 'center', leftAddons: React__default.default.createElement("div", null), sticky: true, className: cn__default.default((_b = {}, _b[styles__default.default.withZIndex] = selectorView === 'full', _b)) })),
            monthOnlyView && renderDayNames(),
            React__default.default.createElement(mobile.ModalMobile.Content, { flex: true }, renderContent()),
            React__default.default.createElement(mobile.ModalMobile.Footer, { sticky: true, className: cn__default.default((_c = {}, _c[styles__default.default.withZIndex] = selectorView === 'full', _c)) }, renderFooter()))));
});

exports.CalendarMobile = CalendarMobile;
