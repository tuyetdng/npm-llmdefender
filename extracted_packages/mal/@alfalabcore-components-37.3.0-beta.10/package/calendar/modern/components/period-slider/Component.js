import React, { useMemo } from 'react';
import cn from 'classnames';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import { Button } from '../../../../button/modern';
import { IconButton } from '../../../../icon-button/modern';
import { ChevronBackMIcon } from '@alfalab/icons-glyph/ChevronBackMIcon';
import { monthName } from '../../utils.js';
import { getYearSelectorValue, formatPeriod, shiftValues } from './utils.js';
import 'date-fns/addDays';
import 'date-fns/addMonths';
import 'date-fns/eachDayOfInterval';
import 'date-fns/eachMonthOfInterval';
import 'date-fns/eachYearOfInterval';
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
import 'date-fns/startOfYear';
import 'date-fns/subDays';
import 'date-fns/subMonths';
import 'date-fns/addQuarters';
import 'date-fns/addWeeks';
import 'date-fns/addYears';
import 'date-fns/endOfMonth';
import 'date-fns/endOfQuarter';
import 'date-fns/getQuarter';
import 'date-fns/getYear';
import 'date-fns/isToday';
import 'date-fns/isYesterday';
import 'date-fns/startOfQuarter';

const styles = {"component":"calendar__component_9zunt","period":"calendar__period_9zunt","empty":"calendar__empty_9zunt","arrow":"calendar__arrow_9zunt","full":"calendar__full_9zunt","yearSelectorButton":"calendar__yearSelectorButton_9zunt"};
require('./index.css');

const PeriodSlider = ({ value, periodType = 'month', className, periodFormatter = formatPeriod, prevArrowDisabled = false, nextArrowDisabled = false, hideDisabledArrows = false, isMonthAndYearSelectable = false, showCurrentYearSelector = false, onPrevArrowClick = () => null, onNextArrowClick = () => null, onMonthClick, onYearClick, dataTestId, }) => {
    const [valueFrom, valueTo] = useMemo(() => {
        let from;
        let to;
        if (!value)
            return [undefined, undefined];
        if (Array.isArray(value)) {
            [from, to] = value;
        }
        else {
            [from, to] = [value, value];
            if (periodType === 'week') {
                from = startOfWeek(from, { weekStartsOn: 1 });
                to = endOfWeek(from, { weekStartsOn: 1 });
            }
        }
        return [from, to];
    }, [periodType, value]);
    const yearSelectorValue = useMemo(() => getYearSelectorValue(valueFrom, showCurrentYearSelector), [showCurrentYearSelector, valueFrom]);
    const showArrow = (direction) => {
        if (hideDisabledArrows) {
            const disabled = direction === 'prev' ? prevArrowDisabled : nextArrowDisabled;
            return !disabled && valueFrom;
        }
        return true;
    };
    const handleNextArrowClick = (event) => {
        if (!valueFrom || !valueTo)
            return;
        const newValues = shiftValues(valueFrom, valueTo, periodType, 'next');
        onNextArrowClick(event, {
            value: newValues.valueFrom,
            valueFrom: newValues.valueFrom,
            valueTo: newValues.valueTo,
            periodType,
        });
    };
    const handlePrevArrowClick = (event) => {
        if (!valueFrom || !valueTo)
            return;
        const newValues = shiftValues(valueFrom, valueTo, periodType, 'prev');
        onPrevArrowClick(event, {
            value: newValues.valueFrom,
            valueFrom: newValues.valueFrom,
            valueTo: newValues.valueTo,
            periodType,
        });
    };
    const renderHeader = () => {
        if (!(valueFrom && valueTo)) {
            return React.createElement("span", { className: cn(styles.period, styles.empty) }, "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0435\u0440\u0438\u043E\u0434");
        }
        return periodType === 'month' && isMonthAndYearSelectable ? (React.createElement("div", null,
            React.createElement(Button, { className: styles.period, view: 'ghost', size: 'l', onClick: onMonthClick }, monthName(valueFrom)),
            yearSelectorValue && (React.createElement(Button, { className: cn(styles.yearSelectorButton, styles.period), view: 'ghost', size: 'l', onClick: onYearClick }, yearSelectorValue)))) : (React.createElement("span", { className: styles.period }, periodFormatter(valueFrom, valueTo, periodType)));
    };
    return (React.createElement("div", { className: cn(styles.component, className), "aria-live": 'polite', "data-test-id": dataTestId },
        showArrow('prev') && (React.createElement(IconButton, { size: 'xs', className: styles.arrow, icon: ChevronBackMIcon, onClick: handlePrevArrowClick, disabled: prevArrowDisabled || !valueFrom, "aria-label": '\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043F\u0435\u0440\u0438\u043E\u0434' })),
        renderHeader(),
        showArrow('next') && (React.createElement(IconButton, { size: 'xs', className: styles.arrow, icon: ChevronBackMIcon, onClick: handleNextArrowClick, disabled: nextArrowDisabled || !valueFrom, "aria-label": '\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0435\u0440\u0438\u043E\u0434' }))));
};

export { PeriodSlider };
