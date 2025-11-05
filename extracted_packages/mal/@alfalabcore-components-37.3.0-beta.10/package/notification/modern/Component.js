import React, { forwardRef, useRef, useState, useCallback, useEffect, Fragment } from 'react';
import mergeRefs from 'react-merge-refs';
import { useSwipeable } from 'react-swipeable';
import cn from 'classnames';
import elementClosest from 'element-closest';
import { Portal } from '../../portal/modern';
import { Stack, stackingOrder } from '../../stack/modern';
import { ToastPlate } from '../../toast-plate/modern';
import { useClickOutside } from './utils/index.js';

const styles = {"notificationComponent":"notification__notificationComponent_9opt2","isVisible":"notification__isVisible_9opt2","isClosing":"notification__isClosing_9opt2","toastContent":"notification__toastContent_9opt2","actionSection":"notification__actionSection_9opt2"};
require('./index.css');

const notificationClassNameSelector = `.${styles.notificationComponent}`;
const Notification = forwardRef(({ className, actionSectionClassName, children, visible, offset = 108, hasCloser = true, autoCloseDelay = 5000, usePortal = true, zIndex = stackingOrder.TOAST, style, onClose, onCloseTimeout, onMouseEnter, onMouseLeave, onClickOutside, ...restProps }, ref) => {
    const notificationRef = useRef(null);
    const autoCloseTimeoutRef = useRef(0);
    const closeTimeoutRef = useRef(0);
    const [isClosing, setIsClosing] = useState(false);
    const startAutoCloseTimer = useCallback(() => {
        if (autoCloseDelay !== null) {
            autoCloseTimeoutRef.current = window.setTimeout(() => {
                if (onCloseTimeout) {
                    onCloseTimeout();
                }
            }, autoCloseDelay);
        }
    }, [autoCloseDelay, onCloseTimeout]);
    const stopAutoCloseTimer = useCallback(() => {
        clearTimeout(autoCloseTimeoutRef.current);
    }, []);
    useEffect(() => () => {
        clearTimeout(closeTimeoutRef.current);
    }, []);
    useEffect(() => {
        elementClosest(window);
    }, []);
    useEffect(() => {
        if (visible) {
            startAutoCloseTimer();
        }
        return () => {
            stopAutoCloseTimer();
        };
    }, [startAutoCloseTimer, stopAutoCloseTimer, visible]);
    const handleMouseEnter = useCallback((event) => {
        stopAutoCloseTimer();
        if (onMouseEnter) {
            onMouseEnter(event);
        }
    }, [onMouseEnter, stopAutoCloseTimer]);
    const handleMouseLeave = useCallback((event) => {
        stopAutoCloseTimer();
        startAutoCloseTimer();
        if (onMouseLeave) {
            onMouseLeave(event);
        }
    }, [onMouseLeave, startAutoCloseTimer, stopAutoCloseTimer]);
    const handleOutsideClick = useCallback((event) => {
        const isTargetNotification = !!event.target.closest(notificationClassNameSelector);
        /*
         * проверка isTargetNotification нужна для предотвращения срабатывания handleOutsideClick
         * при клике на другие нотификации, если их несколько на странице
         */
        if (onClickOutside && visible && !isTargetNotification) {
            onClickOutside(event);
        }
    }, [onClickOutside, visible]);
    useClickOutside(notificationRef, handleOutsideClick);
    const swipeableHandlers = useSwipeable({
        onSwiped: ({ dir }) => {
            if (onClose && ['Left', 'Right', 'Up'].includes(dir)) {
                setIsClosing(true);
                closeTimeoutRef.current = window.setTimeout(() => {
                    setIsClosing(false);
                    onClose();
                }, 100);
            }
        },
        delta: 100,
    });
    const Wrapper = usePortal ? Portal : Fragment;
    return (React.createElement(Stack, { value: zIndex }, (computedZIndex) => (React.createElement(Wrapper, null,
        React.createElement("div", { ...swipeableHandlers },
            React.createElement(ToastPlate, { className: cn(styles.notificationComponent, {
                    [styles.isVisible]: visible,
                    [styles.isClosing]: isClosing,
                }, className), contentClassName: styles.toastContent, actionSectionClassName: cn(actionSectionClassName, styles.actionSection), style: {
                    top: offset,
                    zIndex: computedZIndex,
                    ...style,
                }, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, ref: mergeRefs([ref, notificationRef]), role: visible ? 'alert' : undefined, hasCloser: hasCloser, onClose: onClose, ...restProps }, children))))));
});

export { Notification };
