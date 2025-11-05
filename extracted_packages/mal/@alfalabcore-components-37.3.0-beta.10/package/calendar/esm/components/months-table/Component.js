import { _ as __assign } from '../../tslib.es6-4869e457.js';
import React, { useCallback } from 'react';
import cn from 'classnames';
import isSameMonth from 'date-fns/isSameMonth';
import isThisMonth from 'date-fns/isThisMonth';
import { monthName } from '../../utils.js';
import { SelectButton } from '../select-button/Component.js';
import 'date-fns/addDays';
import 'date-fns/addMonths';
import 'date-fns/eachDayOfInterval';
import 'date-fns/eachMonthOfInterval';
import 'date-fns/eachYearOfInterval';
import 'date-fns/endOfWeek';
import 'date-fns/endOfYear';
import 'date-fns/format';
import 'date-fns/isAfter';
import 'date-fns/isBefore';
import 'date-fns/isSameDay';
import 'date-fns/lastDayOfMonth';
import 'date-fns/max';
import 'date-fns/min';
import 'date-fns/parse';
import 'date-fns/startOfDay';
import 'date-fns/startOfMonth';
import 'date-fns/startOfWeek';
import 'date-fns/startOfYear';
import 'date-fns/subDays';
import 'date-fns/subMonths';
import '../../../../button/esm';

var styles = {"monthsTable":"calendar__monthsTable_yx9bs","responsive":"calendar__responsive_yx9bs","button":"calendar__button_yx9bs"};
require('./index.css');

var MonthsTable = function (_a) {
    var _b;
    var selectedMonth = _a.selectedMonth, _c = _a.months, months = _c === void 0 ? [] : _c, getMonthProps = _a.getMonthProps, responsive = _a.responsive;
    var view = useCallback(function (month) {
        if (selectedMonth && isSameMonth(selectedMonth, month.date))
            return 'selected';
        if (isThisMonth(month.date))
            return 'outlined';
        return 'default';
    }, [selectedMonth]);
    return (React.createElement("div", { className: cn(styles.monthsTable, (_b = {}, _b[styles.responsive] = responsive, _b)) }, months.map(function (month) { return (React.createElement(SelectButton, __assign({}, getMonthProps(month), { key: month.date.getTime(), className: styles.button, view: view(month) }), monthName(month.date))); })));
};

export { MonthsTable };
