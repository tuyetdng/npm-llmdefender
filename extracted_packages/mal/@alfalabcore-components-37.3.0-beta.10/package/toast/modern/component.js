import React, { forwardRef, useRef, useCallback, useEffect } from 'react';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { Popover } from '../../popover/modern';
import { Portal } from '../../portal/modern';
import { Stack, stackingOrder } from '../../stack/modern';
import { ToastPlate } from '../../toast-plate/modern';
import { usePrevious, useClickOutside } from '@alfalab/hooks';

const styles = {"toastPlate":"toast__toastPlate_uykqw","title":"toast__title_uykqw","popoverInner":"toast__popoverInner_uykqw","block":"toast__block_uykqw","fixed":"toast__fixed_uykqw","enter":"toast__enter_uykqw","enterActive":"toast__enterActive_uykqw","exit":"toast__exit_uykqw","exitActive":"toast__exitActive_uykqw"};
require('./index.css');

const CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};
const DefaultToastPlate = forwardRef((props, ref) => (React.createElement(ToastPlate, { ref: ref, ...props })));
const Toast = forwardRef(({ anchorElement, position, offset, open, autoCloseDelay = 3000, className, titleClassName, bottomOffset, style = {}, block, zIndex = stackingOrder.TOAST, ToastPlate = DefaultToastPlate, onMouseEnter, onMouseLeave, onTouchStart, onClose, getPortalContainer, useAnchorWidth, ...restProps }, ref) => {
    const plateRef = useRef(null);
    const timerId = useRef(0);
    const prevOpen = usePrevious(open);
    const startTimer = useCallback(() => {
        clearTimeout(timerId.current);
        timerId.current = window.setTimeout(onClose, autoCloseDelay);
    }, [autoCloseDelay, onClose]);
    const stopTimer = useCallback(() => {
        clearTimeout(timerId.current);
    }, []);
    const handleMouseEnter = useCallback((event) => {
        stopTimer();
        if (onMouseEnter) {
            onMouseEnter(event);
        }
    }, [onMouseEnter, stopTimer]);
    const handleMouseLeave = useCallback((event) => {
        startTimer();
        if (onMouseLeave) {
            onMouseLeave(event);
        }
    }, [onMouseLeave, startTimer]);
    const handleTouchStart = useCallback((event) => {
        stopTimer();
        if (onTouchStart) {
            onTouchStart(event);
        }
    }, [onTouchStart, stopTimer]);
    const handleClickOutside = useCallback(() => {
        onClose();
        stopTimer();
    }, [onClose, stopTimer]);
    useClickOutside(plateRef, handleClickOutside);
    useEffect(() => {
        if (open !== prevOpen && open) {
            startTimer();
        }
    }, [open, prevOpen, startTimer, stopTimer]);
    const props = {
        block,
        titleClassName: cn(titleClassName, styles.title),
        onClose,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        ref: mergeRefs([ref, plateRef]),
    };
    if (anchorElement) {
        return (React.createElement(Popover, { open: open, anchorElement: anchorElement, position: position, offset: offset, popperClassName: styles.popoverInner, className: cn({ [styles.block]: block }), transition: { timeout: 150 }, getPortalContainer: getPortalContainer, zIndex: zIndex, useAnchorWidth: useAnchorWidth },
            React.createElement(ToastPlate, { ...restProps, style: style, className: className, ...props })));
    }
    return (React.createElement(Stack, { value: zIndex }, (computedZIndex) => (React.createElement(Portal, { getPortalContainer: getPortalContainer },
        React.createElement(CSSTransition, { unmountOnExit: true, in: open, timeout: 150, classNames: CSS_TRANSITION_CLASS_NAMES },
            React.createElement(ToastPlate, { ...restProps, className: cn(styles.fixed, styles.toastPlate, className), style: {
                    ...style,
                    bottom: bottomOffset && `${bottomOffset}px`,
                    zIndex: computedZIndex,
                }, ...props }))))));
});

export { Toast };
