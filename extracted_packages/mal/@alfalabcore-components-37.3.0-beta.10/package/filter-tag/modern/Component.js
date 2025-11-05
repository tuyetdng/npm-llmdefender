import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';
import { useFocus } from '@alfalab/hooks';
import { ChevronDownCompactSIcon } from '@alfalab/icons-glyph/ChevronDownCompactSIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossCircleSIcon } from '@alfalab/icons-glyph/CrossCircleSIcon';

const styles = {"component":"filter-tag__component_1qx59","disabled":"filter-tag__disabled_1qx59","defaultVariant":"filter-tag__defaultVariant_1qx59","alt":"filter-tag__alt_1qx59","checked":"filter-tag__checked_1qx59","xxs":"filter-tag__xxs_1qx59","xs":"filter-tag__xs_1qx59","s":"filter-tag__s_1qx59","focused":"filter-tag__focused_1qx59","chevron":"filter-tag__chevron_1qx59","valueButton":"filter-tag__valueButton_1qx59","open":"filter-tag__open_1qx59","close":"filter-tag__close_1qx59","clear":"filter-tag__clear_1qx59","iconWrapper":"filter-tag__iconWrapper_1qx59"};
require('./index.css');

const isKeyBoardEvent = (event) => event.key !== undefined;
const FilterTag = forwardRef(({ children, checked, disabled, open, onClick, size = 's', variant = 'default', onClear = () => null, showClear = true, className, dataTestId, ...restProps }, ref) => {
    const valueRef = useRef(null);
    const [focused] = useFocus(valueRef, 'keyboard');
    const handleClear = (event) => {
        event.stopPropagation();
        if (isKeyBoardEvent(event)) {
            const clickSimilarKeys = ['Enter'].includes(event.key);
            if (clickSimilarKeys)
                onClear();
            return;
        }
        onClear();
    };
    const variantClassName = variant === 'default' ? 'defaultVariant' : variant;
    return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    React.createElement("div", { className: cn(className, [styles.component], styles[variantClassName], styles[size], {
            [styles.checked]: checked,
            [styles.disabled]: disabled,
            [styles.focused]: focused,
            [styles.open]: open,
        }), ref: ref, "data-test-id": dataTestId, onClick: disabled ? undefined : onClick, ...restProps },
        React.createElement("button", { type: 'button', ref: valueRef, disabled: disabled, className: cn(styles.valueButton, styles[size], styles[variantClassName], {
                [styles.checked]: checked,
                [styles.open]: open,
                [styles.close]: !showClear,
            }) },
            React.createElement("span", null, children),
            React.createElement("span", { className: styles.chevron }, size === 'xxs' ? React.createElement(ChevronDownCompactSIcon, null) : React.createElement(ChevronDownMIcon, null))),
        checked && !disabled && showClear && (React.createElement("div", { role: 'button', className: cn(styles.clear, styles[size], styles[variantClassName]), onClick: handleClear, onKeyDown: handleClear, tabIndex: 0 },
            React.createElement("span", { className: styles.iconWrapper }, size === 'xxs' ? React.createElement(CrossCircleSIcon, null) : React.createElement(CrossCircleMIcon, null))))));
});

export { FilterTag };
