var tslib_es6 = require('./tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var endOfDay = require('date-fns/endOfDay');
var startOfDay = require('date-fns/startOfDay');
var startOfMonth = require('date-fns/startOfMonth');
var hooks = require('@alfalab/hooks');
var components_daysTable_Component = require('./components/days-table/Component.js');
var components_header_Component = require('./components/header/Component.js');
var components_monthYearHeader_Component = require('./components/month-year-header/Component.js');
var components_monthsTable_Component = require('./components/months-table/Component.js');
var components_periodSlider_Component = require('./components/period-slider/Component.js');
require('date-fns/addDays');
require('date-fns/addMonths');
require('date-fns/addQuarters');
require('date-fns/addWeeks');
require('date-fns/addYears');
require('date-fns/endOfMonth');
require('date-fns/endOfQuarter');
require('date-fns/endOfWeek');
require('date-fns/endOfYear');
require('date-fns/getQuarter');
require('date-fns/getYear');
require('date-fns/isToday');
require('date-fns/isYesterday');
require('date-fns/startOfQuarter');
require('date-fns/startOfWeek');
require('date-fns/startOfYear');
var utils = require('./utils.js');
var components_yearsTable_Component = require('./components/years-table/Component.js');
var useCalendar = require('./useCalendar.js');
var styles = require('./desktop.module.css');
require('react-transition-group');
require('date-fns/isEqual');
require('date-fns/isLastDayOfMonth');
require('date-fns/isSameDay');
require('date-fns/isWithinInterval');
require('../../button/cssm');
require('./components/days-table/index.module.css');
require('./components/header/index.module.css');
require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
require('./components/select-button/Component.js');
require('./components/select-button/index.module.css');
require('./components/month-year-header/index.module.css');
require('date-fns/isSameMonth');
require('date-fns/isThisMonth');
require('./components/months-table/index.module.css');
require('../../icon-button/cssm');
require('@alfalab/icons-glyph/ChevronBackMIcon');
require('./components/period-slider/utils.js');
require('./components/period-slider/index.module.css');
require('date-fns/eachDayOfInterval');
require('date-fns/eachMonthOfInterval');
require('date-fns/eachYearOfInterval');
require('date-fns/format');
require('date-fns/isAfter');
require('date-fns/isBefore');
require('date-fns/lastDayOfMonth');
require('date-fns/max');
require('date-fns/min');
require('date-fns/parse');
require('date-fns/subDays');
require('date-fns/subMonths');
require('date-fns/isSameYear');
require('date-fns/isThisYear');
require('./components/years-table/index.module.css');
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

var CalendarDesktop = React.forwardRef(function (_a, ref) {
    var _b;
    var className = _a.className, _c = _a.defaultView, defaultView = _c === void 0 ? 'days' : _c, _d = _a.selectorView, selectorView = _d === void 0 ? 'full' : _d, value = _a.value, monthTimestamp = _a.month, minDateTimestamp = _a.minDate, maxDateTimestamp = _a.maxDate, _e = _a.defaultMonth, defaultMonthTimestamp = _e === void 0 ? +new Date() : _e, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, rangeComplete = _a.rangeComplete, offDays = _a.offDays, events = _a.events, holidays = _a.holidays, onChange = _a.onChange, onMonthChange = _a.onMonthChange, onMonthClick = _a.onMonthClick, onYearClick = _a.onYearClick, dataTestId = _a.dataTestId, _f = _a.hasHeader, hasHeader = _f === void 0 ? true : _f, responsive = _a.responsive;
    var _g = React.useState(defaultView), view = _g[0], setView = _g[1];
    var _h = React.useState(false), scrolled = _h[0], setScrolled = _h[1];
    var selected = React.useMemo(function () { return (value ? new Date(value) : undefined); }, [value]);
    var defaultMonth = React.useMemo(function () {
        return startOfMonth__default.default(selected ||
            utils.limitDate(defaultMonthTimestamp, minDateTimestamp, maxDateTimestamp));
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    var month = React.useMemo(function () { return (monthTimestamp ? new Date(monthTimestamp) : undefined); }, [monthTimestamp]);
    var minDate = React.useMemo(function () { return (minDateTimestamp ? startOfDay__default.default(minDateTimestamp) : undefined); }, [minDateTimestamp]);
    var maxDate = React.useMemo(function () { return (maxDateTimestamp ? endOfDay__default.default(maxDateTimestamp) : undefined); }, [maxDateTimestamp]);
    var _j = useCalendar.useCalendar({
        month: month,
        defaultMonth: defaultMonth,
        view: view,
        minDate: minDate,
        maxDate: maxDate,
        selected: selected,
        offDays: offDays,
        events: events,
        holidays: holidays,
        onChange: onChange,
        onMonthChange: onMonthChange,
    }), activeMonth = _j.activeMonth, weeks = _j.weeks, months = _j.months, years = _j.years, canSetPrevMonth = _j.canSetPrevMonth, canSetNextMonth = _j.canSetNextMonth, setMonthByDate = _j.setMonthByDate, setPrevMonth = _j.setPrevMonth, setNextMonth = _j.setNextMonth, highlighted = _j.highlighted, getDayProps = _j.getDayProps, getMonthProps = _j.getMonthProps, getYearProps = _j.getYearProps, getRootProps = _j.getRootProps;
    var toggleView = React.useCallback(function (newView) {
        setView(view === newView ? 'days' : newView);
    }, [view]);
    var handleScroll = React.useCallback(function (scrollTop) {
        setScrolled(scrollTop > 0);
    }, []);
    var handlePrevArrowClick = React.useCallback(function () {
        // TODO: Что должны делать стрелки при view !== days?
        setPrevMonth();
    }, [setPrevMonth]);
    var handleNextArrowClick = React.useCallback(function () {
        setNextMonth();
    }, [setNextMonth]);
    var handleMonthClick = React.useCallback(function (event) {
        toggleView('months');
        if (onMonthClick) {
            onMonthClick(event);
        }
    }, [onMonthClick, toggleView]);
    var handleYearClick = React.useCallback(function (event) {
        toggleView('years');
        if (onYearClick) {
            onYearClick(event);
        }
    }, [onYearClick, toggleView]);
    hooks.useDidUpdateEffect(function () {
        setView('days');
    }, [activeMonth]);
    hooks.useDidUpdateEffect(function () {
        setScrolled(false);
    }, [view]);
    hooks.useDidUpdateEffect(function () {
        var newMonth = value && startOfMonth__default.default(value);
        if (newMonth && newMonth.getTime() !== activeMonth.getTime()) {
            setMonthByDate(newMonth);
        }
    }, [value]);
    return (React__default.default.createElement("div", tslib_es6.__assign({}, getRootProps({ ref: ref }), { className: cn__default.default('cc-calendar', styles__default.default.component, className, (_b = {},
            _b[styles__default.default.sixWeeks] = weeks.length === 6,
            _b[styles__default.default.responsive] = responsive,
            _b)), "data-test-id": dataTestId }),
        hasHeader && (React__default.default.createElement(components_header_Component.Header, { view: selectorView, withShadow: scrolled }, selectorView === 'month-only' ? (React__default.default.createElement(components_periodSlider_Component.PeriodSlider, { className: styles__default.default.period, value: activeMonth, periodType: 'month', prevArrowDisabled: !canSetPrevMonth, nextArrowDisabled: !canSetNextMonth, hideDisabledArrows: true, onPrevArrowClick: handlePrevArrowClick, onNextArrowClick: handleNextArrowClick })) : (React__default.default.createElement(components_monthYearHeader_Component.MonthYearHeader, { className: styles__default.default.monthYear, value: activeMonth, onMonthClick: handleMonthClick, onYearClick: handleYearClick })))),
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.container, styles__default.default[view]) },
            view === 'days' && (React__default.default.createElement(components_daysTable_Component.DaysTable, { weeks: weeks, activeMonth: activeMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, getDayProps: getDayProps, highlighted: highlighted, rangeComplete: rangeComplete, responsive: responsive })),
            view === 'months' && (React__default.default.createElement(components_monthsTable_Component.MonthsTable, { selectedMonth: activeMonth, months: months, getMonthProps: getMonthProps, responsive: responsive })),
            view === 'years' && (React__default.default.createElement(components_yearsTable_Component.YearsTable, { selectedYear: activeMonth, years: years, getYearProps: getYearProps, onScroll: handleScroll, responsive: responsive })))));
});

exports.CalendarDesktop = CalendarDesktop;
