import React from 'react';
import cn from 'classnames';
import { Badge } from '../../../../../badge/modern';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { CheckmarkMIcon } from '@alfalab/icons-glyph/CheckmarkMIcon';

const styles = {"checkmark":"select__checkmark_6kgqw","selected":"select__selected_6kgqw","displayIcon":"select__displayIcon_6kgqw","displayBadge":"select__displayBadge_6kgqw"};
require('./index.css');

const Checkmark = ({ selected, className }) => (React.createElement("div", { className: cn(styles.checkmark, className, {
        [styles.selected]: selected,
    }) },
    React.createElement(CheckmarkMIcon, { className: styles.displayIcon }),
    React.createElement(Badge, { className: styles.displayBadge, view: 'icon', size: 'm', iconColor: 'positive', content: React.createElement(CheckmarkCircleMIcon, null) })));

export { Checkmark };
