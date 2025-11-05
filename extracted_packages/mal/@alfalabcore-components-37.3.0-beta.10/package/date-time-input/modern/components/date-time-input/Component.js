import React, { useRef, useState, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Calendar, dateInLimits } from '../../../../calendar/modern';
import { IconButton } from '../../../../icon-button/modern';
import { Input } from '../../../../input/modern';
import { Popover } from '../../../../popover/modern';
import { useDidUpdateEffect } from '@alfalab/hooks';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { getDateWithoutTime, DATE_WITH_TIME_LENGTH, format, getFullDateTime, isCompleteDateInput, isValid, addTimeToDate, parseTimestampToDate } from '../../utils/format.js';
import 'date-fns/isValid';
import 'date-fns/parse';

const styles = {"component":"date-time-input__component_oixy4","calendarContainer":"date-time-input__calendarContainer_oixy4","calendarResponsive":"date-time-input__calendarResponsive_oixy4","block":"date-time-input__block_oixy4"};
require('./index.css');

/* eslint-disable no-useless-escape, jsx-a11y/click-events-have-key-events */
const DateTimeInput = React.forwardRef(({ className, inputClassName, popoverClassName, disabled, readOnly, picker, defaultValue = '', value: propValue, onChange, onComplete, rightAddons, useAnchorWidth, block, popoverPosition = 'bottom-start', zIndexPopover, preventFlip, Calendar: Calendar$1 = Calendar, calendarProps = {}, defaultMonth, minDate = calendarProps.minDate, maxDate = calendarProps.maxDate, offDays = calendarProps.offDays || [], events = calendarProps.events || [], defaultOpen = false, error, view = 'desktop', ...restProps }, ref) => {
    const inputRef = useRef(null);
    const calendarRef = useRef(null);
    const [value, setValue] = useState(propValue || defaultValue);
    const [open, setOpen] = useState(false);
    const calendarValue = value ? getDateWithoutTime(value).getTime() : undefined;
    const inputDisabled = disabled || readOnly;
    const calendarResponsive = calendarProps?.responsive ?? true;
    useEffect(() => {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    useDidUpdateEffect(() => {
        const newPropValue = propValue || '';
        setValue((prevValue) => (prevValue === propValue ? prevValue : newPropValue));
    }, [propValue]);
    const checkInputValueIsValid = (newInputValue) => {
        if (!newInputValue || error)
            return false;
        const dateValue = getDateWithoutTime(newInputValue).getTime();
        return (dateValue &&
            dateInLimits(dateValue, minDate, maxDate) &&
            !offDays.includes(dateValue));
    };
    const setTimeToDate = () => {
        setValue((prevValue) => {
            const dateWithTime = addTimeToDate(prevValue);
            if (dateWithTime !== prevValue && dateWithTime.length === DATE_WITH_TIME_LENGTH) {
                onComplete?.(null, {
                    date: getFullDateTime(dateWithTime),
                    value: dateWithTime,
                });
            }
            return dateWithTime;
        });
    };
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
                setTimeToDate();
            }
        }
    };
    const handleChange = (event) => {
        const { value: newValue } = event.target;
        if (newValue.length > DATE_WITH_TIME_LENGTH)
            return;
        // Позволяем вводить только цифры, точки, запятую, двоеточие и пробел
        if (/[^\d., :]/.test(newValue)) {
            return;
        }
        const dots = newValue.match(/\./g);
        const colon = newValue.match(/:/g);
        const comma = newValue.match(/,/g);
        // Не даем вводить больше, чем 2 точки, 1 двоеточие и 1 запятую
        if ((dots && dots.length > 2) ||
            (colon && colon.length > 1) ||
            (comma && comma.length > 1)) {
            return;
        }
        const formattedValue = format(newValue);
        const date = getFullDateTime(formattedValue);
        setValue(formattedValue);
        if (onChange)
            onChange(event, { date, value: formattedValue });
        if (isCompleteDateInput(formattedValue)) {
            const valid = isValid(formattedValue);
            if (!valid)
                return;
            if (onComplete) {
                onComplete(event, { date, value: formattedValue });
            }
        }
    };
    const handleMobileCalendarClose = () => {
        setOpen(false);
        setTimeToDate();
    };
    const handleClear = () => {
        setValue('');
    };
    const handleCalendarChange = (date) => {
        if (date) {
            const newValue = parseTimestampToDate(date);
            setValue(newValue);
            onChange?.(null, { date: getFullDateTime(newValue), value: newValue });
        }
    };
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
        React.createElement(Calendar$1, { ...calendarProps, responsive: calendarResponsive, open: open, onClose: handleMobileCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, value: checkInputValueIsValid(value) ? calendarValue : undefined, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })));
    return (React.createElement("div", { className: cn(styles.component, className, {
            [styles.block]: block,
        }), onFocus: inputDisabled ? undefined : handleInputWrapperFocus, onBlur: handleBlur },
        React.createElement(Input, { ...restProps, block: block, ref: mergeRefs([ref, inputRef]), value: value, onChange: handleChange, disabled: disabled, readOnly: readOnly, className: inputClassName, onClear: handleClear, error: error, rightAddons: React.createElement(React.Fragment, null,
                rightAddons,
                picker && (React.createElement(IconButton, { onClick: inputDisabled ? undefined : handleIconButtonClick, icon: CalendarMIcon, size: 'xxs' }))) }),
        picker && (React.createElement(Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputRef.current, popperClassName: cn(styles.calendarContainer, {
                [styles.calendarResponsive]: calendarResponsive,
            }), className: popoverClassName, position: popoverPosition, offset: [0, 8], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

export { DateTimeInput };
