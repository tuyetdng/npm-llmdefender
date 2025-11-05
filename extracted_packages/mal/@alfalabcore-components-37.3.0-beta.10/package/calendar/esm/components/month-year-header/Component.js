import React from 'react';
import cn from 'classnames';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
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
import '../../tslib.es6-4869e457.js';

var styles = {"component":"calendar__component_u8097","button":"calendar__button_u8097","month":"calendar__month_u8097","year":"calendar__year_u8097","buttonContent":"calendar__buttonContent_u8097","upDownIcon":"calendar__upDownIcon_u8097"};
require('./index.css');

var MonthYearHeader = function (_a) {
    var value = _a.value, className = _a.className, onMonthClick = _a.onMonthClick, onYearClick = _a.onYearClick, dataTestId = _a.dataTestId;
    var month = value ? monthName(value) : undefined;
    var year = value ? value.getFullYear().toString() : undefined;
    return (React.createElement("div", { className: cn(styles.component, className), "aria-live": 'polite', "data-test-id": dataTestId },
        React.createElement(SelectButton, { view: 'filled', className: cn(styles.button, styles.month), onClick: onMonthClick },
            React.createElement("span", { className: styles.buttonContent },
                month,
                React.createElement(ChevronDownCompactSIcon, { className: styles.upDownIcon }))),
        React.createElement(SelectButton, { view: 'filled', className: cn(styles.button, styles.year), onClick: onYearClick },
            React.createElement("span", { className: styles.buttonContent },
                year,
                React.createElement(ChevronDownCompactSIcon, { className: styles.upDownIcon })))));
};

export { MonthYearHeader };
