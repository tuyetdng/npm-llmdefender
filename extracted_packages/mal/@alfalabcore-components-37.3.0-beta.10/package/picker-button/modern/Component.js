import React, { forwardRef } from 'react';
import cn from 'classnames';
import { BaseSelect, OptionsList, Optgroup } from '../../select/modern';
import { Field } from './field/Component.js';
import { Option } from './option/Component.js';
import '../../button/modern';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';
import './utils/index.js';

const styles = {"container":"picker-button__container_1haon","optionsPopover":"picker-button__optionsPopover_1haon","sideGap":"picker-button__sideGap_1haon","optionsListContainer":"picker-button__optionsListContainer_1haon","option":"picker-button__option_1haon"};
require('./index.css');

const SIDE_POSITIONS = ['right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'];
const PickerButtonDesktop = forwardRef(({ OptionsList: OptionsList$1 = OptionsList, Optgroup: Optgroup$1 = Optgroup, Option: Option$1 = Option, view, loading, size = 'm', variant = 'default', className, leftAddons, rightAddons, popperClassName, optionsListClassName, optionClassName, showArrow, ...restProps }, ref) => {
    const isSideGap = !!restProps.popoverPosition && SIDE_POSITIONS.includes(restProps.popoverPosition);
    return (React.createElement(BaseSelect, { ...restProps, optionProps: { Checkmark: null }, ref: ref, Option: Option$1, Field: Field, size: size === 'm' ? 'm' : 's', fieldProps: {
            view,
            loading,
            /** size у select, button несовместимы */
            buttonSize: size,
            buttonVariant: variant,
            leftAddons,
            rightAddons,
            showArrow,
        }, Optgroup: Optgroup$1, OptionsList: OptionsList$1, className: cn(styles.container, className), popperClassName: cn('cc-picker-button', styles.optionsPopover, popperClassName, {
            [styles.sideGap]: isSideGap,
        }), optionsListClassName: cn(styles.optionsListContainer, optionsListClassName), optionClassName: cn(styles.option, optionClassName), selected: [], closeOnSelect: true }));
});

export { PickerButtonDesktop };
