import React, { forwardRef } from 'react';
import { SelectMobile, Optgroup } from '../../select/modern';
import { Field } from './field/Component.js';
import { Option } from './option/Component.js';
import 'classnames';
import '../../button/modern';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';
import './utils/index.js';

const PickerButtonMobile = forwardRef(({ options, label, Option: Option$1 = Option, Optgroup: Optgroup$1 = Optgroup, view, loading, variant = 'default', leftAddons, rightAddons, size, bottomSheetProps, showArrow, ...restProps }, ref) => (React.createElement(SelectMobile, { ...restProps, label: label, Option: Option$1, bottomSheetProps: {
        title: label,
        stickyHeader: true,
        ...bottomSheetProps,
    }, Field: Field, Optgroup: Optgroup$1, size: size === 'm' ? 'm' : 's', closeOnSelect: true, fieldProps: {
        view,
        loading,
        /** size у select, button несовместимы */
        buttonSize: size,
        buttonVariant: variant,
        leftAddons,
        rightAddons,
        showArrow,
    }, ref: ref, options: options, selected: [] })));

export { PickerButtonMobile };
