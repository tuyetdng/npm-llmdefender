var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var cn = require('classnames');
var isEqual = require('date-fns/isEqual');
var isLastDayOfMonth = require('date-fns/isLastDayOfMonth');
var isSameDay = require('date-fns/isSameDay');
var isToday = require('date-fns/isToday');
var isWithinInterval = require('date-fns/isWithinInterval');
var startOfMonth = require('date-fns/startOfMonth');
var coreComponentsButton = require('../../../../button/cssm');
var hooks = require('@alfalab/hooks');
var utils = require('../../utils.js');
var styles = require('./index.module.css');
require('date-fns/addDays');
require('date-fns/addMonths');
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

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var isEqual__default = /*#__PURE__*/_interopDefaultCompat(isEqual);
var isLastDayOfMonth__default = /*#__PURE__*/_interopDefaultCompat(isLastDayOfMonth);
var isSameDay__default = /*#__PURE__*/_interopDefaultCompat(isSameDay);
var isToday__default = /*#__PURE__*/_interopDefaultCompat(isToday);
var isWithinInterval__default = /*#__PURE__*/_interopDefaultCompat(isWithinInterval);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var DaysTable = function (_a) {
    var _b;
    var _c = _a.weeks, weeks = _c === void 0 ? [] : _c, _d = _a.activeMonth, activeMonth = _d === void 0 ? new Date() : _d, highlighted = _a.highlighted, selectedFrom = _a.selectedFrom, selectedTo = _a.selectedTo, _e = _a.rangeComplete, rangeComplete = _e === void 0 ? selectedFrom && selectedTo : _e, getDayProps = _a.getDayProps, _f = _a.hasHeader, hasHeader = _f === void 0 ? true : _f, responsive = _a.responsive;
    var activeMonthRef = React.useRef(activeMonth);
    var directionRef = React.useRef();
    activeMonthRef.current = activeMonth;
    var prevActiveMonth = hooks.usePrevious(activeMonth);
    if (prevActiveMonth && prevActiveMonth !== activeMonth) {
        directionRef.current = activeMonth < prevActiveMonth ? 'right' : 'left';
    }
    var selection = utils.getSelectionRange(selectedFrom, selectedTo, highlighted);
    var renderHeader = React.useCallback(function () {
        return utils.WEEKDAYS.map(function (dayName) { return (React__default.default.createElement("th", { className: styles__default.default.dayName, key: dayName }, dayName)); });
    }, []);
    var renderDay = function (day, dayIdx) {
        var _a, _b;
        if (!day)
            return React__default.default.createElement("td", { key: dayIdx });
        var daySelected = day.selected ||
            (selectedFrom && isSameDay__default.default(day.date, selectedFrom)) ||
            (selectedTo && isSameDay__default.default(day.date, selectedTo));
        var dayHighlighted = highlighted && isEqual__default.default(day.date, highlighted);
        var inRange = selection && isWithinInterval__default.default(day.date, selection);
        var firstDayOfMonth = day.date.getDate() === 1;
        var lastDayOfMonth = isLastDayOfMonth__default.default(day.date);
        var firstDayOfWeek = utils.russianWeekDay(day.date) === 0;
        var lastDayOfWeek = utils.russianWeekDay(day.date) === 6;
        var transitLeft = firstDayOfMonth && inRange && selection && day.date > selection.start;
        var transitRight = lastDayOfMonth && inRange && selection && day.date < selection.end;
        var rangeStart = selection && isSameDay__default.default(day.date, selection.start);
        var rangeEnd = selection && isSameDay__default.default(day.date, selection.end);
        var sharpTransitLeft = firstDayOfWeek &&
            firstDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay__default.default(day.date, selection.start) || isSameDay__default.default(day.date, selection.end));
        var sharpTransitRight = lastDayOfWeek &&
            lastDayOfMonth &&
            inRange &&
            selection &&
            (isSameDay__default.default(day.date, selection.start) || isSameDay__default.default(day.date, selection.end));
        var dayProps = getDayProps(day);
        var onClick = dayProps.onClick;
        var handleDayClick = function (e) {
            if (!day.disabled)
                onClick(e);
        };
        return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        React__default.default.createElement("td", tslib_es6.__assign({}, dayProps, { key: day.date.getTime(), className: cn__default.default(styles__default.default.dayWrapper, (_a = {},
                _a[styles__default.default.range] = inRange,
                _a[styles__default.default.rangeComplete] = inRange && rangeComplete,
                _a[styles__default.default.transitLeft] = transitLeft,
                _a[styles__default.default.transitRight] = transitRight,
                _a[styles__default.default.sharpTransitLeft] = sharpTransitLeft,
                _a[styles__default.default.sharpTransitRight] = sharpTransitRight,
                _a[styles__default.default.rangeStart] = rangeStart,
                _a[styles__default.default.rangeEnd] = rangeEnd,
                _a[styles__default.default.cursorPointer] = !day.disabled,
                _a)), align: 'center', ref: function (node) {
                /**
                 * После анимации реф-коллбэк вызывается еще раз, и в него передается null и старый activeMonth.
                 * Поэтому приходится хранить актуальный месяц в рефе и сравнивать с ним.
                 */
                if (startOfMonth__default.default(day.date).getTime() === activeMonthRef.current.getTime()) {
                    dayProps.ref(node);
                }
            }, onClick: handleDayClick }),
            React__default.default.createElement(coreComponentsButton.Button, { type: 'button', view: 'ghost', size: 'xs', disabled: day.disabled, className: cn__default.default(styles__default.default.day, (_b = {},
                    _b[styles__default.default.selected] = daySelected,
                    _b[styles__default.default.today] = isToday__default.default(day.date),
                    _b[styles__default.default.disabled] = day.disabled,
                    _b[styles__default.default.holiday] = !day.disabled && day.holiday,
                    _b[styles__default.default.highlighted] = dayHighlighted,
                    _b)) },
                day.event && React__default.default.createElement("span", { className: styles__default.default.dot }),
                day.date.getDate())));
    };
    var renderWeek = function (week, weekIdx) { return (React__default.default.createElement("tr", { key: weekIdx }, week.map(renderDay))); };
    return (React__default.default.createElement("table", { className: cn__default.default(styles__default.default.daysTable, directionRef.current && styles__default.default[directionRef.current], (_b = {},
            _b[styles__default.default.responsive] = responsive,
            _b)) },
        hasHeader && (React__default.default.createElement("thead", null,
            React__default.default.createElement("tr", null, renderHeader()))),
        React__default.default.createElement(reactTransitionGroup.TransitionGroup, { component: null },
            React__default.default.createElement(reactTransitionGroup.CSSTransition, { key: activeMonth.getTime(), timeout: 300, classNames: {
                    enter: styles__default.default.daysEnter,
                    enterActive: styles__default.default.daysEnterActive,
                    exit: styles__default.default.daysExit,
                    exitActive: styles__default.default.daysExitActive,
                } },
                React__default.default.createElement("tbody", null, weeks.map(renderWeek))))));
};

exports.DaysTable = DaysTable;
