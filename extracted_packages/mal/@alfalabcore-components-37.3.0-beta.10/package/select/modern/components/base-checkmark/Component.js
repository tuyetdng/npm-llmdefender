import React from 'react';
import cn from 'classnames';
import { Checkbox } from '../../../../checkbox/modern';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

const styles = {"checkmark":"select__checkmark_wzibi","single":"select__single_wzibi","selected":"select__selected_wzibi"};
require('./index.css');

const BaseCheckmark = ({ selected, disabled = false, className, multiple, }) => {
    const checkmarkClassNames = cn(styles.checkmark, className, {
        [styles.multiple]: multiple,
        [styles.single]: !multiple,
        [styles.selected]: selected,
    });
    return multiple ? (React.createElement(Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: (event) => event.stopPropagation() })) : (React.createElement(CheckmarkMIcon, { className: checkmarkClassNames }));
};

export { BaseCheckmark };
