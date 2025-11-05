import React, { Fragment } from 'react';
import cn from 'classnames';
import { BottomSheet } from '../../bottom-sheet/modern';
import { Button } from '../../button/modern';
import { useMedia } from '@alfalab/hooks';
import { useControlled } from './utils.js';
import { TooltipDesktop } from './Component.js';
import 'react-merge-refs';
import '../../popover/modern';

const styles = {"target":"tooltip__target_1netx","overlap":"tooltip__overlap_1netx"};
require('./responsive.css');

const TooltipResponsive = ({ defaultMatch = 'mobile', content, children, open, onOpen, onClose, actionButtonTitle = 'Понятно', hasCloser, targetRef, targetClassName, bottomSheetProps, breakpoint = 1024, ...restProps }) => {
    const [view] = useMedia([
        ['mobile', `(max-width: ${breakpoint - 1}px)`],
        ['desktop', `(min-width: ${breakpoint}px)`],
    ], defaultMatch);
    const [openValue, setOpenValueIfUncontrolled] = useControlled(open, false);
    const handleOpen = (event) => {
        if (onOpen) {
            onOpen(event);
        }
        else {
            setOpenValueIfUncontrolled(true);
        }
    };
    const handleClose = (event) => {
        if (onClose) {
            onClose(event);
        }
        else {
            setOpenValueIfUncontrolled(false);
        }
    };
    const isMobile = view === 'mobile';
    return isMobile ? (React.createElement(Fragment, null,
        React.createElement(BottomSheet, { ...restProps, open: Boolean(openValue), onClose: handleClose, hasCloser: hasCloser, actionButton: React.createElement(Button, { view: 'secondary', block: true, size: 's', onClick: handleClose }, actionButtonTitle), ...bottomSheetProps }, content),
        React.createElement("div", { ref: targetRef, onClick: handleOpen, className: cn(styles.target, targetClassName) },
            children?.props.disabled && React.createElement("div", { className: styles.overlap }),
            children))) : (React.createElement(TooltipDesktop, { ...restProps, open: open, content: content, onOpen: handleOpen, onClose: handleClose, targetClassName: targetClassName, targetRef: targetRef }, children));
};

export { TooltipResponsive };
