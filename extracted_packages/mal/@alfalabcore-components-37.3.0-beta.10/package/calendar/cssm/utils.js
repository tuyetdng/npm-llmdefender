var addDays = require('date-fns/addDays');
var addMonths = require('date-fns/addMonths');
var eachDayOfInterval = require('date-fns/eachDayOfInterval');
var eachMonthOfInterval = require('date-fns/eachMonthOfInterval');
var eachYearOfInterval = require('date-fns/eachYearOfInterval');
var endOfWeek = require('date-fns/endOfWeek');
var endOfYear = require('date-fns/endOfYear');
var format = require('date-fns/format');
var isAfter = require('date-fns/isAfter');
var isBefore = require('date-fns/isBefore');
var isSameDay = require('date-fns/isSameDay');
var lastDayOfMonth = require('date-fns/lastDayOfMonth');
var max = require('date-fns/max');
var min = require('date-fns/min');
var parse = require('date-fns/parse');
var startOfDay = require('date-fns/startOfDay');
var startOfMonth = require('date-fns/startOfMonth');
var startOfWeek = require('date-fns/startOfWeek');
var startOfYear = require('date-fns/startOfYear');
var subDays = require('date-fns/subDays');
var subMonths = require('date-fns/subMonths');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var addDays__default = /*#__PURE__*/_interopDefaultCompat(addDays);
var addMonths__default = /*#__PURE__*/_interopDefaultCompat(addMonths);
var eachDayOfInterval__default = /*#__PURE__*/_interopDefaultCompat(eachDayOfInterval);
var eachMonthOfInterval__default = /*#__PURE__*/_interopDefaultCompat(eachMonthOfInterval);
var eachYearOfInterval__default = /*#__PURE__*/_interopDefaultCompat(eachYearOfInterval);
var endOfWeek__default = /*#__PURE__*/_interopDefaultCompat(endOfWeek);
var endOfYear__default = /*#__PURE__*/_interopDefaultCompat(endOfYear);
var format__default = /*#__PURE__*/_interopDefaultCompat(format);
var isAfter__default = /*#__PURE__*/_interopDefaultCompat(isAfter);
var isBefore__default = /*#__PURE__*/_interopDefaultCompat(isBefore);
var isSameDay__default = /*#__PURE__*/_interopDefaultCompat(isSameDay);
var lastDayOfMonth__default = /*#__PURE__*/_interopDefaultCompat(lastDayOfMonth);
var max__default = /*#__PURE__*/_interopDefaultCompat(max);
var min__default = /*#__PURE__*/_interopDefaultCompat(min);
var parse__default = /*#__PURE__*/_interopDefaultCompat(parse);
var startOfDay__default = /*#__PURE__*/_interopDefaultCompat(startOfDay);
var startOfMonth__default = /*#__PURE__*/_interopDefaultCompat(startOfMonth);
var startOfWeek__default = /*#__PURE__*/_interopDefaultCompat(startOfWeek);
var startOfYear__default = /*#__PURE__*/_interopDefaultCompat(startOfYear);
var subDays__default = /*#__PURE__*/_interopDefaultCompat(subDays);
var subMonths__default = /*#__PURE__*/_interopDefaultCompat(subMonths);

var DAYS_IN_WEEK = 7;
var MONTHS_IN_YEAR = 12;
var SUNDAY_INDEX = 6;
var DATE_FORMAT = 'dd.MM.yyyy';
var NATIVE_DATE_FORMAT = 'yyyy-MM-dd';
var WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
var MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];
/**
 * Возвращает «правильный» индекс дня недели, 0 - пн, 1 - вт и так далее.
 */
function russianWeekDay(date) {
    var sunday = 0;
    var foreignWeekDayIndex = date.getDay();
    return foreignWeekDayIndex === sunday ? DAYS_IN_WEEK - 1 : foreignWeekDayIndex - 1;
}
/**
 * Возвращает таблицу-календарь с заполненными датами для переданного месяца
 */
function generateWeeks(month, options) {
    var newWeek = function () { return Array(DAYS_IN_WEEK).fill(null); };
    var start = startOfMonth__default.default(month);
    var end = lastDayOfMonth__default.default(start);
    var week = newWeek();
    return eachDayOfInterval__default.default({ start: start, end: end }).reduce(function (weeks, day) {
        var weekDay = russianWeekDay(day);
        week[weekDay] = buildDay(day, options);
        if (weekDay === SUNDAY_INDEX || isSameDay__default.default(day, end)) {
            weeks.push(week);
            week = newWeek();
        }
        return weeks;
    }, []);
}
/**
 * Возвращает массив с месяцами для переданного года
 */
function generateMonths(year, options) {
    return eachMonthOfInterval__default.default({ start: startOfYear__default.default(year), end: endOfYear__default.default(year) }).map(function (month) {
        return buildMonth(month, options);
    });
}
/**
 * Возвращает массив лет от minYear до maxYear
 */
function generateYears(minYear, maxYear) {
    return eachYearOfInterval__default.default({
        start: min__default.default([startOfYear__default.default(maxYear), startOfYear__default.default(minYear)]),
        end: max__default.default([startOfYear__default.default(maxYear), startOfYear__default.default(minYear)]),
    }).reverse();
}
/**
 * Добавляет метаданные для переданного дня
 */
function buildDay(day, options) {
    var minDate = options.minDate, maxDate = options.maxDate, selected = options.selected, _a = options.eventsMap, eventsMap = _a === void 0 ? {} : _a, _b = options.offDaysMap, offDaysMap = _b === void 0 ? {} : _b, _c = options.holidaysMap, holidaysMap = _c === void 0 ? {} : _c;
    var off = offDaysMap[day.getTime()];
    var disabled = (minDate && isBefore__default.default(day, minDate)) || (maxDate && isAfter__default.default(day, maxDate));
    return {
        date: day,
        disabled: disabled || off,
        event: eventsMap[day.getTime()],
        holiday: holidaysMap[day.getTime()],
        selected: selected && isSameDay__default.default(day, selected),
    };
}
/**
 * Добавляет метаданные для переданного месяца
 */
function buildMonth(month, options) {
    var minMonth = options.minMonth, maxMonth = options.maxMonth;
    return {
        date: month,
        disabled: (minMonth && isBefore__default.default(month, minMonth)) || (maxMonth && isAfter__default.default(month, maxMonth)),
    };
}
/**
 * Ограничивает дату на отрезке [minDate, maxDate]
 */
function limitDate(date, minDate, maxDate) {
    var limitedDate = date;
    if (minDate)
        limitedDate = max__default.default([minDate, limitedDate]);
    if (maxDate)
        limitedDate = min__default.default([maxDate, limitedDate]);
    return new Date(limitedDate);
}
/**
 * Проверяет, находится ли переданная дата в указанных границах
 */
function dateInLimits(date, minDate, maxDate) {
    return date && limitDate(date, minDate, maxDate).getTime() === new Date(date).getTime();
}
/**
 * Возвращает русское название месяца с большой буквы
 */
function monthName(month) {
    return MONTHS[month.getMonth()];
}
/**
 * Превращает массив в объект, у которого ключи составляются из элементов массива
 */
function dateArrayToHashTable(arr) {
    return arr.reduce(function (acc, v) {
        acc[startOfDay__default.default(v).getTime()] = true;
        return acc;
    }, {});
}
/**
 * Возвращает корректный отрезок дат для выделения
 */
function getSelectionRange(from, to, highlighted) {
    if (!from && !to)
        return null;
    var end = to || highlighted;
    var start = from || highlighted;
    if (start && end && start !== end) {
        return {
            start: min__default.default([start, end]),
            end: max__default.default([start, end]),
        };
    }
    return null;
}
// Меняет дату одним из способов с учетом границ и выходных дней
function modifyDateByShift(shift, date, minDate, maxDate, offDaysMap) {
    if (offDaysMap === void 0) { offDaysMap = {}; }
    var modifiers = {
        prev: function () { return subDays__default.default(date, 1); },
        prevWeek: function () { return subDays__default.default(date, 7); },
        prevMonth: function () { return subMonths__default.default(date, 1); },
        next: function () { return addDays__default.default(date, 1); },
        nextWeek: function () { return addDays__default.default(date, 7); },
        nextMonth: function () { return addMonths__default.default(date, 1); },
        startOfWeek: function () { return startOfWeek__default.default(date, { weekStartsOn: 1 }); },
        endOfWeek: function () { return startOfDay__default.default(endOfWeek__default.default(date, { weekStartsOn: 1 })); },
    };
    var newDate = modifiers[shift]();
    while (offDaysMap[newDate.getTime()]) {
        // Перескакиваем через выходные дни, кроме случаев с концами недели
        var amount = newDate < date ? -1 : 1;
        if (shift === 'endOfWeek')
            amount = -1;
        if (shift === 'startOfWeek')
            amount = 1;
        newDate = addDays__default.default(newDate, amount);
    }
    return limitDate(newDate, minDate, maxDate);
}
/**
 * Если дата была выбрана мышкой — фокусную обводку не видно
 * TODO: добавить в useFocus возможность переключать метод ввода программно
 */
function simulateTab(node) {
    if (window.KeyboardEvent) {
        var event_1 = new window.KeyboardEvent('keydown', {
            bubbles: true,
            key: 'Tab',
        });
        node.dispatchEvent(event_1);
    }
}
var formatDate = function (date, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return format__default.default(date, dateFormat);
};
var parseDateString = function (value, dateFormat) {
    if (dateFormat === void 0) { dateFormat = DATE_FORMAT; }
    return parse__default.default(value, dateFormat, new Date());
};

exports.DATE_FORMAT = DATE_FORMAT;
exports.DAYS_IN_WEEK = DAYS_IN_WEEK;
exports.MONTHS = MONTHS;
exports.MONTHS_IN_YEAR = MONTHS_IN_YEAR;
exports.NATIVE_DATE_FORMAT = NATIVE_DATE_FORMAT;
exports.SUNDAY_INDEX = SUNDAY_INDEX;
exports.WEEKDAYS = WEEKDAYS;
exports.buildDay = buildDay;
exports.buildMonth = buildMonth;
exports.dateArrayToHashTable = dateArrayToHashTable;
exports.dateInLimits = dateInLimits;
exports.formatDate = formatDate;
exports.generateMonths = generateMonths;
exports.generateWeeks = generateWeeks;
exports.generateYears = generateYears;
exports.getSelectionRange = getSelectionRange;
exports.limitDate = limitDate;
exports.modifyDateByShift = modifyDateByShift;
exports.monthName = monthName;
exports.parseDateString = parseDateString;
exports.russianWeekDay = russianWeekDay;
exports.simulateTab = simulateTab;
