import React, { Fragment } from 'react';
import cn from 'classnames';
import { Button } from '../../../button/modern';
import { getIcon } from '../utils/index.js';
import '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import '@alfalab/icons-glyph/ChevronDownMIcon';
import '@alfalab/icons-glyph/MoreMIcon';
import '@alfalab/icons-glyph/MoreSIcon';

const styles = {"iconContainer":"picker-button__iconContainer_1043d","addonsContainer":"picker-button__addonsContainer_1043d","showControlIcon":"picker-button__showControlIcon_1043d","open":"picker-button__open_1043d"};
require('./index.css');

const Field = ({ buttonSize = 'm', buttonVariant = 'default', view, label, open, multiple, rightAddons, Arrow, innerProps, className, selected, selectedMultiple, setSelectedItems, toggleMenu, valueRenderer, showArrow = true, ...restProps }) => {
    const Icon = getIcon(buttonVariant, buttonSize);
    const { ref, ...restInnerProps } = innerProps;
    const buttonProps = {
        ...restProps,
        ...restInnerProps,
    };
    return (React.createElement("div", { ref: ref },
        React.createElement(Button, { ...buttonProps, rightAddons: React.createElement(Fragment, null,
                rightAddons && (React.createElement("span", { className: cn(styles.addonsContainer, {
                        [styles.showControlIcon]: showArrow || buttonVariant === 'compact',
                    }) }, rightAddons)),
                (showArrow || buttonVariant === 'compact') && (React.createElement("span", { className: cn(styles.iconContainer, buttonVariant !== 'compact' && open && styles.open) },
                    React.createElement(Icon, { "data-test-id": 'picker-button-icon' })))), block: true, view: view, size: buttonSize, className: cn(styles.component, view === 'primary' && styles.primary, className) }, buttonVariant !== 'compact' && label)));
};

export { Field };
