import React, { useState, useRef, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import { Button } from '../../button/modern';
import { Input } from '../../input/modern';
import { SelectMobile } from '../../select/modern';
import { AutocompleteMobileField } from './autocomplete-mobile-field/Component.js';
import '../../form-control/modern';
import '@alfalab/hooks';

const styles = {"bottomSheetInput":"input-autocomplete__bottomSheetInput_30lcl","footer":"input-autocomplete__footer_30lcl"};
require('./mobile.css');

const SELECTED = [];
const InputAutocompleteMobile = React.forwardRef(({ Input: Input$1, bottomSheetProps = {}, bottomSheetHeaderAddonsProps = {}, value = '', filter = '', name, Arrow = null, label, placeholder, size = 's', open: openProp, onFilter, onChange, onOpen, onCancel, onClearFilter, continueButtonProps, cancelButtonProps, selected, multiple, ...restProps }, ref) => {
    const [open, setOpen] = useState(false);
    const bottomSheetInputRef = useRef(null);
    const targetRef = useRef(null);
    const setBottomSheetVisibility = (isOpen) => {
        if (openProp === undefined) {
            setOpen(isOpen);
        }
        if (onOpen) {
            onOpen({ open: isOpen, name });
        }
    };
    const handleOpen = (payload) => {
        setBottomSheetVisibility(Boolean(payload.open));
    };
    const handleOptionsListTouchMove = useMemo(() => throttle(() => {
        const input = bottomSheetInputRef.current;
        if (input && document.activeElement === input) {
            input.blur();
        }
    }, 300), []);
    const handleApply = () => {
        setBottomSheetVisibility(false);
        onChange(filter);
    };
    const handleChange = (payload) => {
        onChange(payload);
        if (multiple) {
            // После выбора опции возвращаем фокус в поле ввода.
            requestAnimationFrame(() => bottomSheetInputRef.current?.focus());
        }
    };
    const handleCancel = () => {
        setBottomSheetVisibility(false);
        if (onCancel) {
            onCancel();
        }
    };
    const handleInputFocus = (event) => {
        const input = bottomSheetInputRef.current;
        // Перед закрытием шторки снимаем фокус с инпута, чтобы предотвратить скачок шторки.
        if (event.relatedTarget === targetRef.current &&
            input &&
            input === document.activeElement) {
            input.blur();
        }
    };
    const getBottomSheetProps = () => {
        const Component = Input$1 || Input;
        return {
            actionButton: (React.createElement("div", { className: styles.footer },
                React.createElement(Button, { block: true, view: 'primary', size: 's', onClick: handleApply, ...continueButtonProps }, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"),
                React.createElement(Button, { block: true, view: 'secondary', size: 's', onClick: handleCancel, ...cancelButtonProps }, "\u041E\u0442\u043C\u0435\u043D\u0430"))),
            title: label || placeholder,
            bottomAddons: (React.createElement(Component, { block: true, clear: !!onClearFilter, onClear: onClearFilter, value: filter, onInput: onFilter, placeholder: placeholder, onFocus: handleInputFocus, ...bottomSheetHeaderAddonsProps, className: cn(styles.bottomSheetInput, bottomSheetHeaderAddonsProps.className), ref: mergeRefs([
                    bottomSheetInputRef,
                    bottomSheetHeaderAddonsProps.ref,
                ]) })),
            initialHeight: 'full',
            ...bottomSheetProps,
            containerProps: {
                onTouchMove: handleOptionsListTouchMove,
                ...bottomSheetProps.containerProps,
            },
        };
    };
    return (React.createElement(SelectMobile, { ref: mergeRefs([targetRef, ref]), selected: selected || SELECTED, open: Boolean(open || openProp), onOpen: handleOpen, onChange: handleChange, Arrow: Arrow, Field: AutocompleteMobileField, fieldProps: { value }, placeholder: placeholder, label: label, size: size, name: name, multiple: multiple, bottomSheetProps: getBottomSheetProps(), optionsListProps: { showFooter: false }, ...restProps }));
});

export { InputAutocompleteMobile };
