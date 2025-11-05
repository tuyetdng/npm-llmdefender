import React, { useRef, useState, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import dateFnsIsValid from 'date-fns/isValid';
import { usePeriod, Calendar } from '../../../../calendar/modern';
import { IconButton } from '../../../../icon-button/modern';
import { Input } from '../../../../input/modern';
import { Popover } from '../../../../popover/modern';
import { useDidUpdateEffect } from '@alfalab/hooks';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { parseTimestampToDate, DATE_FORMAT, DATE_MASK, format, parseDateString, isCompleteDateInput, isValid } from '../../utils/format.js';
import 'date-fns/parse';

const styles = {"component":"date-range-input__component_qy3ed","calendarContainer":"date-range-input__calendarContainer_qy3ed","calendarResponsive":"date-range-input__calendarResponsive_qy3ed","block":"date-range-input__block_qy3ed"};
require('./index.css');

/* eslint-disable no-useless-escape, jsx-a11y/click-events-have-key-events */
const DateRangeInput = React.forwardRef(({ className, inputClassName, popoverClassName, disabled, readOnly, picker, defaultValue = '', value: propValue, onChange, onComplete, rightAddons, useAnchorWidth, block, popoverPosition = 'bottom-start', zIndexPopover, preventFlip, Calendar: Calendar$1 = Calendar, calendarProps = {}, defaultMonth, minDate = calendarProps.minDate, maxDate = calendarProps.maxDate, offDays = calendarProps.offDays || [], events = calendarProps.events || [], defaultOpen = false, view = 'desktop', ...restProps }, ref) => {
    const inputRef = useRef(null);
    const calendarRef = useRef(null);
    const [value, setValue] = useState(propValue || defaultValue);
    const [open, setOpen] = useState(false);
    const inputDisabled = disabled || readOnly;
    const calendarResponsive = calendarProps?.responsive ?? true;
    useEffect(() => {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    useDidUpdateEffect(() => {
        const newPropValue = propValue || '';
        setValue((prevValue) => (prevValue === newPropValue ? prevValue : newPropValue));
    }, [propValue]);
    const handlePeriodChange = (selectedFrom, selectedTo) => {
        if (selectedFrom && !selectedTo && value.length === DATE_MASK.length) {
            setValue(parseTimestampToDate(selectedFrom));
        }
        else if ((!selectedFrom && !selectedTo && value.length === DATE_FORMAT.length) ||
            (selectedFrom === selectedTo && value.length === DATE_MASK.length)) {
            setValue('');
        }
        const dateFrom = selectedFrom ? new Date(selectedFrom) : undefined;
        const dateTo = selectedTo ? new Date(selectedTo) : undefined;
        const newValue = [selectedFrom, selectedTo].filter(Boolean)
            .map((timestamp) => parseTimestampToDate(timestamp))
            .join(' - ');
        onChange?.({
            dateFrom,
            dateTo,
            value: newValue,
        });
        if (dateFrom && dateTo) {
            onComplete?.({
                dateFrom,
                dateTo,
                value: newValue,
            });
        }
    };
    const { selectedFrom, selectedTo, updatePeriod, resetPeriod, setStart, setEnd } = usePeriod({ onPeriodChange: handlePeriodChange });
    const handleInputWrapperFocus = (event) => {
        if (view === 'desktop') {
            if (picker) {
                setOpen(true);
            }
            if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                calendarRef.current.focus();
            }
        }
    };
    const handleBlur = (event) => {
        if (view === 'desktop') {
            const target = (event.relatedTarget || document.activeElement);
            if (calendarRef.current && calendarRef.current.contains(target) === false) {
                setOpen(false);
            }
        }
    };
    const handleChange = (event) => {
        const { value: newValue } = event.target;
        if (newValue.length > DATE_MASK.length)
            return;
        // Позволяем вводить только цифры, точки, дефис и пробелы
        if (/[^\d. -]/.test(newValue)) {
            return;
        }
        const dots = newValue.match(/\./g);
        const hyphen = newValue.match(/\-/g);
        // Не даем вводить больше, чем 4 точки и 1 дефис
        if ((dots && dots.length > 4) || (hyphen && hyphen.length > 1)) {
            return;
        }
        const formattedValue = format(newValue);
        const dateArr = formattedValue.split(' - ');
        const dateFrom = dateArr[0] ? parseDateString(dateArr[0]) : undefined;
        const dateTo = dateArr[1] ? parseDateString(dateArr[1]) : undefined;
        if (!dateFrom && !dateTo) {
            resetPeriod();
        }
        else if (selectedFrom && formattedValue.length < DATE_FORMAT.length) {
            setStart();
        }
        else if (selectedFrom && selectedTo) {
            setEnd();
        }
        else if (dateFrom &&
            dateFnsIsValid(dateFrom) &&
            dateArr[0]?.length === DATE_FORMAT.length &&
            dateFrom.getTime() !== selectedFrom) {
            setStart(dateFrom.getTime());
        }
        else if (dateTo &&
            dateFnsIsValid(dateTo) &&
            dateArr[1]?.length === DATE_FORMAT.length &&
            dateTo.getTime() !== selectedTo) {
            setEnd(dateTo.getTime());
        }
        setValue(formattedValue);
        onChange?.({ dateFrom, dateTo, value: formattedValue }, event);
        if (isCompleteDateInput(formattedValue)) {
            const valid = isValid(formattedValue, dateArr[0], dateArr[1]);
            if (!valid)
                return;
            if (dateFrom && dateTo) {
                onComplete?.({ dateFrom, dateTo, value: formattedValue }, event);
            }
        }
    };
    const handleCalendarClose = () => {
        setOpen(false);
    };
    const handleClear = () => {
        setValue('');
        resetPeriod();
    };
    const handleCalendarChange = (date) => {
        if (date) {
            updatePeriod(date);
        }
    };
    useEffect(() => {
        if (selectedFrom && selectedTo) {
            setValue(`${parseTimestampToDate(selectedFrom)} - ${parseTimestampToDate(selectedTo)}`);
        }
        else if (selectedFrom && value.length < DATE_FORMAT.length) {
            setValue(parseTimestampToDate(selectedFrom));
        }
    }, [selectedFrom, selectedTo, value]);
    const handleCalendarWrapperMouseDown = (event) => {
        // Не дает инпуту терять фокус при выборе даты
        event.preventDefault();
    };
    const handleIconButtonClick = () => {
        if (!open)
            setOpen(true);
        if (view === 'desktop' && inputRef.current) {
            inputRef.current.focus();
        }
    };
    const renderCalendar = () => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", { onMouseDown: handleCalendarWrapperMouseDown },
        React.createElement(Calendar$1, { ...calendarProps, responsive: calendarResponsive, open: open, onClose: handleCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, selectedFrom: selectedFrom, selectedTo: selectedTo, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })));
    return (React.createElement("div", { className: cn(styles.component, className, {
            [styles.block]: block,
        }), onFocus: inputDisabled ? undefined : handleInputWrapperFocus, onBlur: handleBlur },
        React.createElement(Input, { ...restProps, block: block, ref: mergeRefs([ref, inputRef]), value: value, onChange: handleChange, disabled: disabled, readOnly: readOnly, className: inputClassName, onClear: handleClear, rightAddons: React.createElement(React.Fragment, null,
                rightAddons,
                picker && (React.createElement(IconButton, { onClick: inputDisabled ? undefined : handleIconButtonClick, icon: CalendarMIcon, size: 'xxs' }))) }),
        picker && (React.createElement(Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputRef.current, popperClassName: cn(styles.calendarContainer, {
                [styles.calendarResponsive]: calendarResponsive,
            }), className: popoverClassName, position: popoverPosition, offset: [0, 8], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

export { DateRangeInput };
