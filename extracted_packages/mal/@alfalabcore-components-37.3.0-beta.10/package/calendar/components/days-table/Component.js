var tslib_es6 = require('../../tslib.es6-e98b28a2.js');
var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var cn = require('classnames');
var isEqual = require('date-fns/isEqual');
var isLastDayOfMonth = require('date-fns/isLastDayOfMonth');
var isSameDay = require('date-fns/isSameDay');
var isToday = require('date-fns/isToday');
var isWithinInterval = require('date-fns/isWithinInterval');
var startOfMonth = require('date-fns/startOfMonth');
var coreComponentsButton = require('../../../button');
var hooks = require('@alfalab/hooks');
var utils = require('../../utils.js');
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

var styles = {"daysTable":"calendar__daysTable_94q4q","responsive":"calendar__responsive_94q4q","dayName":"calendar__dayName_94q4q","day":"calendar__day_94q4q","highlighted":"calendar__highlighted_94q4q","range":"calendar__range_94q4q","disabled":"calendar__disabled_94q4q","holiday":"calendar__holiday_94q4q","today":"calendar__today_94q4q","rangeComplete":"calendar__rangeComplete_94q4q","selected":"calendar__selected_94q4q","dayWrapper":"calendar__dayWrapper_94q4q","cursorPointer":"calendar__cursorPointer_94q4q","rangeEnd":"calendar__rangeEnd_94q4q","rangeStart":"calendar__rangeStart_94q4q","transitLeft":"calendar__transitLeft_94q4q","transitRight":"calendar__transitRight_94q4q","sharpTransitLeft":"calendar__sharpTransitLeft_94q4q","sharpTransitRight":"calendar__sharpTransitRight_94q4q","daysEnter":"calendar__daysEnter_94q4q","left":"calendar__left_94q4q","daysEnterActive":"calendar__daysEnterActive_94q4q","daysExit":"calendar__daysExit_94q4q","daysExitActive":"calendar__daysExitActive_94q4q","right":"calendar__right_94q4q","dot":"calendar__dot_94q4q"};
require('./index.css');

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
        return utils.WEEKDAYS.map(function (dayName) { return (React__default.default.createElement("th", { className: styles.dayName, key: dayName }, dayName)); });
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
        React__default.default.createElement("td", tslib_es6.__assign({}, dayProps, { key: day.date.getTime(), className: cn__default.default(styles.dayWrapper, (_a = {},
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
                if (startOfMonth__default.default(day.date).getTime() === activeMonthRef.current.getTime()) {
                    dayProps.ref(node);
                }
            }, onClick: handleDayClick }),
            React__default.default.createElement(coreComponentsButton.Button, { type: 'button', view: 'ghost', size: 'xs', disabled: day.disabled, className: cn__default.default(styles.day, (_b = {},
                    _b[styles.selected] = daySelected,
                    _b[styles.today] = isToday__default.default(day.date),
                    _b[styles.disabled] = day.disabled,
                    _b[styles.holiday] = !day.disabled && day.holiday,
                    _b[styles.highlighted] = dayHighlighted,
                    _b)) },
                day.event && React__default.default.createElement("span", { className: styles.dot }),
                day.date.getDate())));
    };
    var renderWeek = function (week, weekIdx) { return (React__default.default.createElement("tr", { key: weekIdx }, week.map(renderDay))); };
    return (React__default.default.createElement("table", { className: cn__default.default(styles.daysTable, directionRef.current && styles[directionRef.current], (_b = {},
            _b[styles.responsive] = responsive,
            _b)) },
        hasHeader && (React__default.default.createElement("thead", null,
            React__default.default.createElement("tr", null, renderHeader()))),
        React__default.default.createElement(reactTransitionGroup.TransitionGroup, { component: null },
            React__default.default.createElement(reactTransitionGroup.CSSTransition, { key: activeMonth.getTime(), timeout: 300, classNames: {
                    enter: styles.daysEnter,
                    enterActive: styles.daysEnterActive,
                    exit: styles.daysExit,
                    exitActive: styles.daysExitActive,
                } },
                React__default.default.createElement("tbody", null, weeks.map(renderWeek))))));
};

exports.DaysTable = DaysTable;
