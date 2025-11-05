var tslib_es6 = require('../../tslib.es6-0e9bf404.js');
var React = require('react');
var cn = require('classnames');
var isSameMonth = require('date-fns/isSameMonth');
var isThisMonth = require('date-fns/isThisMonth');
var utils = require('../../utils.js');
var components_selectButton_Component = require('../select-button/Component.js');
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
require('date-fns/isSameDay');
require('date-fns/lastDayOfMonth');
require('date-fns/max');
require('date-fns/min');
require('date-fns/parse');
require('date-fns/startOfDay');
require('date-fns/startOfMonth');
require('date-fns/startOfWeek');
require('date-fns/startOfYear');
require('date-fns/subDays');
require('date-fns/subMonths');
require('../../../../button/cssm');
require('../select-button/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var isSameMonth__default = /*#__PURE__*/_interopDefaultCompat(isSameMonth);
var isThisMonth__default = /*#__PURE__*/_interopDefaultCompat(isThisMonth);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var MonthsTable = function (_a) {
    var _b;
    var selectedMonth = _a.selectedMonth, _c = _a.months, months = _c === void 0 ? [] : _c, getMonthProps = _a.getMonthProps, responsive = _a.responsive;
    var view = React.useCallback(function (month) {
        if (selectedMonth && isSameMonth__default.default(selectedMonth, month.date))
            return 'selected';
        if (isThisMonth__default.default(month.date))
            return 'outlined';
        return 'default';
    }, [selectedMonth]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.monthsTable, (_b = {}, _b[styles__default.default.responsive] = responsive, _b)) }, months.map(function (month) { return (React__default.default.createElement(components_selectButton_Component.SelectButton, tslib_es6.__assign({}, getMonthProps(month), { key: month.date.getTime(), className: styles__default.default.button, view: view(month) }), utils.monthName(month.date))); })));
};

exports.MonthsTable = MonthsTable;
