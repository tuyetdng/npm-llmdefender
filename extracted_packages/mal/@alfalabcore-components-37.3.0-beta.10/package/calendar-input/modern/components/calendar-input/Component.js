import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { dateInLimits, Calendar } from '../../../../calendar/modern';
import { parseDateString, isCompleteDateInput, formatDate, DateInput } from '../../../../date-input/modern';
import { Popover } from '../../../../popover/modern';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import { SUPPORTS_INPUT_TYPE_DATE } from '../../utils.js';
import 'date-fns/format';
import 'date-fns/isSameDay';
import 'date-fns/parse';

const styles = {"component":"calendar-input__component_lskkj","block":"calendar-input__block_lskkj","calendarContainer":"calendar-input__calendarContainer_lskkj","calendarResponsive":"calendar-input__calendarResponsive_lskkj","calendarIcon":"calendar-input__calendarIcon_lskkj","nativeInput":"calendar-input__nativeInput_lskkj"};
require('./index.css');

const CalendarInput = forwardRef(({ block = false, className, inputClassName, popoverClassName, defaultOpen = false, defaultMonth, defaultValue = '', calendarPosition = 'popover', value, dataTestId, calendarProps = {}, minDate = calendarProps.minDate, maxDate = calendarProps.maxDate, offDays = calendarProps.offDays || [], events = calendarProps.events || [], preventFlip, mobileMode = 'popover', wrapperRef = null, disabled, onChange = () => null, onInputChange, onCalendarChange, onKeyDown, readOnly, Calendar: Calendar$1 = Calendar, popoverPosition = 'bottom-start', zIndexPopover, useAnchorWidth, rightAddons, error, view = 'desktop', ...restProps }, ref) => {
    const calendarResponsive = calendarProps?.responsive ?? true;
    const shouldRenderNative = SUPPORTS_INPUT_TYPE_DATE && mobileMode === 'native';
    const shouldRenderOnlyInput = mobileMode === 'input';
    const shouldRenderStatic = calendarPosition === 'static' && !shouldRenderOnlyInput;
    const shouldRenderPopover = calendarPosition === 'popover' && !shouldRenderNative && !shouldRenderOnlyInput;
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value || defaultValue);
    const calendarValue = inputValue ? parseDateString(inputValue).getTime() : undefined;
    const checkInputValueIsValid = useCallback((newInputValue) => {
        if (!newInputValue)
            return false;
        const dateValue = parseDateString(newInputValue).getTime();
        return !!(dateValue &&
            isCompleteDateInput(newInputValue) &&
            dateInLimits(dateValue, minDate, maxDate) &&
            !offDays.includes(dateValue));
    }, [maxDate, minDate, offDays]);
    const inputDisabled = disabled || readOnly;
    const inputWrapperRef = useRef(null);
    const calendarRef = useRef(null);
    const handleKeyDown = useCallback((event) => {
        if (event.target.tagName === 'INPUT' && event.key === 'Enter') {
            setOpen(!open);
        }
        if (event.key === 'Escape') {
            setOpen(false);
        }
    }, [open]);
    const handleClick = useCallback(() => {
        if (!open)
            setOpen(true);
    }, [open]);
    const handleFocus = useCallback((event) => {
        if (view === 'desktop') {
            setOpen(true);
            if (!open && event.target.tagName !== 'INPUT' && calendarRef.current) {
                calendarRef.current.focus();
            }
        }
    }, [open, view]);
    const handleBlur = useCallback((event) => {
        if (view === 'desktop') {
            const target = (event.relatedTarget || document.activeElement);
            if (calendarRef.current && calendarRef.current.contains(target) === false) {
                setOpen(false);
            }
        }
    }, [view]);
    const handleInputKeyDown = useCallback((event) => {
        if (['ArrowDown', 'ArrowUp'].includes(event.key) && calendarRef.current) {
            event.preventDefault();
            calendarRef.current.focus();
        }
        if (onKeyDown)
            onKeyDown(event);
    }, [onKeyDown]);
    const changeHandler = useCallback((event, newValue, newDate, initiator = 'input', shouldChange = true) => {
        if (initiator === 'input' && event && onInputChange) {
            onInputChange(event, { value: newValue, date: newDate });
        }
        if (initiator === 'calendar' && onCalendarChange) {
            onCalendarChange(newDate.getTime());
        }
        setInputValue(newValue);
        if (shouldChange) {
            onChange(event, { date: newDate, value: newValue });
        }
    }, [onCalendarChange, onChange, onInputChange]);
    const handleInputChange = useCallback((event, payload) => {
        changeHandler(event, payload.value, payload.date, 'input', !payload.value || checkInputValueIsValid(payload.value));
    }, [changeHandler, checkInputValueIsValid]);
    const handleCalendarChange = useCallback((date) => {
        if (date) {
            changeHandler(null, formatDate(date), new Date(date), 'calendar');
        }
        if (view === 'desktop') {
            setOpen(false);
        }
    }, [changeHandler, view]);
    const handleCalendarWrapperMouseDown = useCallback((event) => {
        // Не дает инпуту терять фокус при выборе даты
        event.preventDefault();
    }, []);
    const handleCalendarClose = useCallback(() => {
        setOpen(false);
    }, []);
    useEffect(() => {
        setOpen(defaultOpen);
    }, [defaultOpen]);
    useEffect(() => {
        if (typeof value !== 'undefined') {
            setInputValue(value);
        }
    }, [value]);
    const renderCalendar = () => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", { onMouseDown: handleCalendarWrapperMouseDown },
        React.createElement(Calendar$1, { ...calendarProps, responsive: calendarResponsive, open: open, onClose: handleCalendarClose, ref: calendarRef, defaultMonth: defaultMonth, value: checkInputValueIsValid(inputValue) ? calendarValue : undefined, onChange: handleCalendarChange, minDate: minDate, maxDate: maxDate, offDays: offDays, events: events })));
    return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    React.createElement("div", { className: cn(styles.component, className, {
            [styles.block]: block,
        }), tabIndex: -1, onKeyDown: inputDisabled ? undefined : handleKeyDown, onClick: inputDisabled ? undefined : handleClick, onFocus: inputDisabled ? undefined : handleFocus, onBlur: handleBlur, "data-test-id": dataTestId },
        React.createElement(DateInput, { ...restProps, ref: ref, wrapperRef: mergeRefs([wrapperRef, inputWrapperRef]), value: inputValue, defaultValue: defaultValue, disabled: disabled, readOnly: readOnly, mobileMode: mobileMode === 'native' ? 'native' : 'input', error: error, rightAddons: React.createElement(React.Fragment, null,
                rightAddons,
                shouldRenderPopover && (React.createElement(CalendarMIcon, { className: styles.calendarIcon }))), onKeyDown: handleInputKeyDown, onChange: handleInputChange, block: true }),
        shouldRenderStatic && renderCalendar(),
        shouldRenderPopover && (React.createElement(Popover, { open: open, useAnchorWidth: useAnchorWidth, anchorElement: inputWrapperRef.current, popperClassName: cn(styles.calendarContainer, {
                [styles.calendarResponsive]: calendarResponsive,
            }), className: popoverClassName, position: popoverPosition, offset: [0, 4], withTransition: false, preventFlip: preventFlip, zIndex: zIndexPopover }, renderCalendar()))));
});

export { CalendarInput };
