import React, { forwardRef } from 'react';
import cn from 'classnames';

const Title = forwardRef(({ id, toggleClassName, title, styles = {}, rightAddons = null, hidden = false, selected = false, disabled = false, collapsed = false, focused = false, isOption = false, ...restProps }, ref) => hidden ? null : (React.createElement("button", { ...restProps, ref: ref, disabled: disabled, type: 'button', id: String(id), className: cn(styles.title, {
        [styles.selected]: selected,
        [styles.disabled]: disabled,
        [styles.collapsed]: collapsed && !isOption,
        [styles.option]: isOption,
    }, toggleClassName) },
    React.createElement("span", { className: cn(styles.content, { [styles.focused]: focused }) }, title),
    rightAddons && React.createElement("span", { className: styles.rightAddons }, rightAddons))));

export { Title };
