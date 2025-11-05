import React, { forwardRef, useRef, useMemo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import startOfMonth from 'date-fns/startOfMonth';
import { Button } from '../../../../button/modern';
import { ModalMobile } from '../../../../modal/modern/mobile';
import { CalendarDesktop } from '../../Component.desktop.js';
import '@alfalab/hooks';
import 'date-fns/differenceInDays';
import { useCalendar } from '../../useCalendar.js';
import 'date-fns/endOfWeek';
import 'date-fns/startOfWeek';
import '../../../../icon-button/modern';
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

const styles = {"wrapper":"calendar__wrapper_nsqhb","withZIndex":"calendar__withZIndex_nsqhb","calendar":"calendar__calendar_nsqhb","dayNames":"calendar__dayNames_nsqhb","withHeader":"calendar__withHeader_nsqhb","month":"calendar__month_nsqhb","daysTable":"calendar__daysTable_nsqhb","dayName":"calendar__dayName_nsqhb"};
require('./index.css');

// ResizeObserverPolyfill необходим для корректной работы react-virtuoso.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver;
}
const CalendarMonthOnlyView = ({ value, defaultView, month: monthTimestamp, minDate: minDateTimestamp, maxDate: maxDateTimestamp, defaultMonth: defaultMonthTimestamp, offDays, events, holidays, onChange, selectedFrom, selectedTo, rangeComplete, onMonthChange, yearsAmount = 3, }) => {
    const initialMonthIndex = useMemo(() => {
        const currentMonthIndex = new Date().getMonth();
        return yearsAmount * 12 + currentMonthIndex;
    }, [yearsAmount]);
    const month = useMemo(() => (monthTimestamp ? new Date(monthTimestamp) : undefined), [monthTimestamp]);
    const minDate = useMemo(() => (minDateTimestamp ? startOfDay(minDateTimestamp) : undefined), [minDateTimestamp]);
    const maxDate = useMemo(() => (maxDateTimestamp ? endOfDay(maxDateTimestamp) : undefined), [maxDateTimestamp]);
    const selected = useMemo(() => (value ? new Date(value) : undefined), [value]);
    const defaultMonth = useMemo(() => startOfMonth(selected ||
        limitDate(defaultMonthTimestamp || Date.now(), minDateTimestamp, maxDateTimestamp)), [defaultMonthTimestamp, maxDateTimestamp, minDateTimestamp, selected]);
    const { activeMonth, months, highlighted, getDayProps } = useCalendar({
        month,
        defaultMonth,
        view: defaultView,
        minDate,
        maxDate,
        selected,
        offDays,
        events,
        onChange,
        onMonthChange,
    });
    const activeMonths = useMemo(() => {
        const eventsMap = dateArrayToHashTable(events || []);
        const offDaysMap = dateArrayToHashTable(offDays || []);
        const holidaysMap = dateArrayToHashTable(holidays || []);
        const prevMonths = [];
        const nextMonths = [];
        const date = new Date();
        const currentYear = date.getFullYear();
        for (let i = 0; i < yearsAmount; i++) {
            const prevYear = date.setFullYear(currentYear - (i + 1));
            const nextYear = date.setFullYear(currentYear + (i + 1));
            const prevYearMonths = generateMonths(new Date(prevYear), {});
            const nextYearMonths = generateMonths(new Date(nextYear), {});
            prevMonths.unshift(...prevYearMonths);
            nextMonths.push(...nextYearMonths);
        }
        const generatedMonths = [...prevMonths, ...months, ...nextMonths];
        return generatedMonths.map((item) => ({
            ...item,
            weeks: generateWeeks(item.date, {
                minDate,
                maxDate,
                selected,
                eventsMap,
                offDaysMap,
                holidaysMap,
            }),
            title: `${monthName(item.date)} ${item.date.getFullYear()}`,
        }));
    }, [events, offDays, holidays, months, yearsAmount, minDate, maxDate, selected]);
    const renderMonth = (index) => (React.createElement("div", { className: styles.daysTable, id: `month-${index}` },
        React.createElement("span", { className: styles.month }, activeMonths[index].title),
        React.createElement(DaysTable, { weeks: activeMonths[index].weeks, activeMonth: activeMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, getDayProps: getDayProps, highlighted: highlighted, rangeComplete: rangeComplete, hasHeader: false, responsive: true })));
    return (React.createElement(Virtuoso, { totalCount: activeMonths.length, itemContent: renderMonth, initialTopMostItemIndex: initialMonthIndex, increaseViewportBy: 800, itemSize: (el) => el.getBoundingClientRect().height + 32 }));
};
const CalendarMobile = forwardRef(({ hasHeader = true, allowSelectionFromEmptyRange = false, className, defaultView = 'days', selectorView = 'full', value, selectedFrom, selectedTo, onChange, dataTestId, open, onClose, title = 'Календарь', yearsAmount = 3, ...restProps }, ref) => {
    const modalRef = useRef(null);
    const monthOnlyView = selectorView === 'month-only';
    const handleClose = () => {
        if (onClose)
            onClose();
    };
    const handleClear = () => {
        if (onChange)
            onChange();
    };
    const renderDayNames = () => (React.createElement("table", { className: styles.dayNames },
        React.createElement("thead", null,
            React.createElement("tr", null, WEEKDAYS.map((dayName) => (React.createElement("th", { className: styles.dayName, key: dayName }, dayName)))))));
    const renderContent = () => {
        const commonProps = {
            value,
            onChange,
            defaultView,
            selectorView,
            selectedFrom,
            selectedTo,
        };
        if (monthOnlyView) {
            return (React.createElement(CalendarMonthOnlyView, { open: open, yearsAmount: yearsAmount, ...commonProps, ...restProps }));
        }
        return (React.createElement(CalendarDesktop, { responsive: true, className: styles.calendar, ...commonProps, ...restProps }));
    };
    const renderFooter = () => {
        if (selectedFrom || selectedTo) {
            let selectButtonDisabled = !selectedFrom || !selectedTo;
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
            hasHeader && (React.createElement(ModalMobile.Header, { hasCloser: true, title: title, align: 'center', leftAddons: React.createElement("div", null), sticky: true, className: cn({ [styles.withZIndex]: selectorView === 'full' }) })),
            monthOnlyView && renderDayNames(),
            React.createElement(ModalMobile.Content, { flex: true }, renderContent()),
            React.createElement(ModalMobile.Footer, { sticky: true, className: cn({ [styles.withZIndex]: selectorView === 'full' }) }, renderFooter()))));
});

export { CalendarMobile };
