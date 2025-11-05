import React, { useCallback } from 'react';
import cn from 'classnames';
import { Badge } from '../../../../badge/modern';
import { Checkbox } from '../../../../checkbox/modern';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';

const styles = {"checkmark":"select__checkmark_1advo","single":"select__single_1advo","selected":"select__selected_1advo","before":"select__before_1advo","multiple":"select__multiple_1advo","after":"select__after_1advo","colorIcon":"select__colorIcon_1advo"};
require('./index.css');

const Checkmark = ({ selected, disabled = false, className, multiple, position = 'before', }) => {
    const single = !multiple || position === 'after';
    const checkmarkClassNames = cn(styles.checkmark, className, styles[position], {
        [styles.multiple]: !single,
        [styles.single]: single,
        [styles.selected]: selected,
    });
    const handleCheckboxClick = useCallback((event) => event.stopPropagation(), []);
    return single ? (React.createElement("div", { className: checkmarkClassNames },
        React.createElement(Badge, { className: styles.after, view: 'icon', size: 'm', iconColor: 'positive', content: React.createElement(CheckmarkCircleMIcon, { className: styles.colorIcon }) }))) : (React.createElement(Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: handleCheckboxClick }));
};

export { Checkmark };
