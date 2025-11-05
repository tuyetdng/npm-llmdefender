import React, { forwardRef, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import FocusLock from 'react-focus-lock';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import { Backdrop } from '../../backdrop/modern';
import { Portal } from '../../portal/modern';
import { Stack, stackingOrder } from '../../stack/modern';
import { isScrolledToTop, isScrolledToBottom, handleContainer, restoreContainerStyles, hasScrollbar, getScrollbarSize } from './utils.js';
import './matches-polyfill.js';
import '../../global-store/modern';

const styles = {"component":"base-modal__component_y2un1","wrapper":"base-modal__wrapper_y2un1","content":"base-modal__content_y2un1","hidden":"base-modal__hidden_y2un1","backdrop":"base-modal__backdrop_y2un1","appear":"base-modal__appear_y2un1","enter":"base-modal__enter_y2un1","appearActive":"base-modal__appearActive_y2un1","enterActive":"base-modal__enterActive_y2un1","exit":"base-modal__exit_y2un1","exitActive":"base-modal__exitActive_y2un1","exitDone":"base-modal__exitDone_y2un1"};
require('./index.css');

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// eslint-disable-next-line @typescript-eslint/no-redeclare
const BaseModalContext = React.createContext({
    hasFooter: false,
    hasHeader: false,
    hasScroll: false,
    headerHighlighted: false,
    footerHighlighted: false,
    headerOffset: 0,
    setHeaderOffset: () => null,
    contentRef: () => null,
    setHasHeader: () => null,
    setHasFooter: () => null,
    onClose: () => null,
});
const BaseModal = forwardRef(({ open, container, children, scrollHandler = 'wrapper', Backdrop: Backdrop$1 = Backdrop, backdropProps = {}, transitionProps = {}, disableBackdropClick, disableAutoFocus = false, disableFocusLock = false, disableEscapeKeyDown = false, disableRestoreFocus = false, disableBlockingScroll = false, keepMounted = false, className, contentClassName, wrapperClassName, onBackdropClick, onClose, onEscapeKeyDown, onMount, onUnmount, dataTestId, zIndex = stackingOrder.MODAL, componentRef = null, }, ref) => {
    const [exited, setExited] = useState(null);
    const [hasScroll, setHasScroll] = useState(false);
    const [hasHeader, setHasHeader] = useState(false);
    const [hasFooter, setHasFooter] = useState(false);
    const [headerHighlighted, setHeaderHighlighted] = useState(false);
    const [footerHighlighted, setFooterHighlighted] = useState(false);
    const [headerOffset, setHeaderOffset] = useState(0);
    const componentNodeRef = useRef(null);
    const wrapperRef = useRef(null);
    const scrollableNodeRef = useRef(null);
    const contentNodeRef = useRef(null);
    const restoreContainerStylesRef = useRef(null);
    const mouseDownTarget = useRef();
    const resizeObserverRef = useRef();
    const checkToHasScrollBar = () => {
        if (scrollableNodeRef.current) {
            const scrollExists = hasScrollbar(scrollableNodeRef.current);
            setFooterHighlighted(scrollExists);
            setHasScroll(scrollExists);
        }
    };
    const isExited = exited || exited === null;
    const shouldRender = keepMounted || open || !isExited;
    const getContainer = useCallback(() => (container ? container() : document.body), [container]);
    const addResizeHandle = useCallback(() => {
        if (!resizeObserverRef.current)
            return;
        if (scrollableNodeRef.current) {
            resizeObserverRef.current.observe(scrollableNodeRef.current);
        }
        if (contentNodeRef.current) {
            resizeObserverRef.current.observe(contentNodeRef.current);
        }
    }, []);
    const removeResizeHandle = useCallback(() => resizeObserverRef.current?.disconnect(), []);
    const contentRef = useCallback((node) => {
        if (node !== null) {
            contentNodeRef.current = node;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.observe(node);
            }
            checkToHasScrollBar();
        }
    }, []);
    const handleScroll = useCallback(() => {
        if (!scrollableNodeRef.current || !componentNodeRef.current)
            return;
        if (hasHeader) {
            setHeaderHighlighted(!isScrolledToTop(scrollableNodeRef.current) &&
                componentNodeRef.current.getBoundingClientRect().top - headerOffset <= 0);
        }
        if (hasFooter) {
            setFooterHighlighted(!isScrolledToBottom(scrollableNodeRef.current) &&
                componentNodeRef.current.getBoundingClientRect().bottom >=
                    window.innerHeight);
        }
    }, [hasFooter, hasHeader, headerOffset]);
    const handleClose = useCallback((event, reason) => {
        if (onClose) {
            onClose(event, reason);
        }
        if (reason === 'backdropClick' && onBackdropClick) {
            onBackdropClick(event);
        }
        if (reason === 'escapeKeyDown' && onEscapeKeyDown) {
            onEscapeKeyDown(event);
        }
        return null;
    }, [onBackdropClick, onClose, onEscapeKeyDown]);
    const handleBackdropMouseDown = (event) => {
        let clickedOnScrollbar = false;
        const clientWidth = event.target?.clientWidth;
        if (event.clientX && clientWidth) {
            // Устанавливаем смещение для абсолютно спозиционированного скроллбара в OSX в 17px.
            const offset = getScrollbarSize() === 0 ? 17 : 0;
            clickedOnScrollbar = event.clientX + offset > clientWidth;
        }
        if (!disableBackdropClick && !clickedOnScrollbar) {
            mouseDownTarget.current = event.target;
        }
    };
    const handleBackdropMouseUp = (event) => {
        if (!disableBackdropClick &&
            event.target === wrapperRef.current &&
            mouseDownTarget.current === wrapperRef.current) {
            handleClose(event, 'backdropClick');
        }
        mouseDownTarget.current = undefined;
    };
    const handleKeyDown = useCallback((event) => {
        /*
         * Чтобы сохранить дефолтное поведение элементов и событий форм,
         * обработчик не устанавливает event.preventDefault()
         */
        if (event.key !== 'Escape') {
            return;
        }
        // Если есть обработчик escape на body
        event.stopPropagation();
        if (!disableEscapeKeyDown && handleClose) {
            handleClose(event, 'escapeKeyDown');
        }
    }, [disableEscapeKeyDown, handleClose]);
    const getScrollHandler = useCallback(() => {
        if (scrollHandler === 'wrapper')
            return wrapperRef.current;
        if (scrollHandler === 'content')
            return componentNodeRef.current;
        return scrollHandler.current || wrapperRef.current;
    }, [scrollHandler]);
    const handleEntered = useCallback((node, isAppearing) => {
        scrollableNodeRef.current = getScrollHandler();
        addResizeHandle();
        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
        if (onMount)
            onMount();
    }, [addResizeHandle, getScrollHandler, handleScroll, onMount, transitionProps]);
    const handleExited = useCallback((node) => {
        removeResizeHandle();
        setExited(true);
        if (scrollableNodeRef.current) {
            scrollableNodeRef.current.removeEventListener('scroll', handleScroll);
        }
        if (transitionProps.onExited) {
            transitionProps.onExited(node);
        }
        if (onUnmount)
            onUnmount();
        if (restoreContainerStylesRef.current) {
            restoreContainerStylesRef.current();
        }
    }, [handleScroll, onUnmount, removeResizeHandle, transitionProps]);
    useEffect(() => {
        if (open && isExited) {
            if (!disableBlockingScroll) {
                const el = getContainer();
                handleContainer(el);
                restoreContainerStylesRef.current = () => {
                    restoreContainerStylesRef.current = null;
                    restoreContainerStyles(el);
                };
            }
            setExited(false);
        }
    }, [getContainer, open, disableBlockingScroll, isExited]);
    useEffect(() => {
        const ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        resizeObserverRef.current = new ResizeObserver$1(checkToHasScrollBar);
        return () => {
            if (restoreContainerStylesRef.current) {
                restoreContainerStylesRef.current();
            }
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, []);
    const contextValue = useMemo(() => ({
        hasHeader,
        hasFooter,
        hasScroll,
        headerHighlighted,
        footerHighlighted,
        headerOffset,
        setHeaderOffset,
        contentRef,
        setHasHeader,
        setHasFooter,
        onClose: handleClose,
    }), [
        contentRef,
        hasHeader,
        hasFooter,
        hasScroll,
        headerHighlighted,
        footerHighlighted,
        headerOffset,
        setHeaderOffset,
        handleClose,
    ]);
    if (!shouldRender)
        return null;
    return (React.createElement(Stack, { value: zIndex }, (computedZIndex) => (React.createElement(Portal, { getPortalContainer: container, immediateMount: true },
        React.createElement(BaseModalContext.Provider, { value: contextValue },
            React.createElement(FocusLock, { autoFocus: !disableAutoFocus, disabled: disableFocusLock || !open, returnFocus: !disableRestoreFocus },
                Backdrop$1 && (React.createElement(Backdrop$1, { ...backdropProps, className: cn(backdropProps.className, styles.backdrop), open: open, style: {
                        zIndex: computedZIndex,
                    } })),
                React.createElement("div", { role: 'dialog', className: cn(styles.wrapper, wrapperClassName, {
                        [styles.hidden]: !open && isExited,
                    }), ref: mergeRefs([ref, wrapperRef]), onKeyDown: handleKeyDown, onMouseDown: handleBackdropMouseDown, onMouseUp: handleBackdropMouseUp, 
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex: 0, "data-test-id": dataTestId, style: {
                        zIndex: computedZIndex,
                    } },
                    React.createElement(CSSTransition, { appear: true, timeout: 200, classNames: styles, ...transitionProps, in: open, onEntered: handleEntered, onExited: handleExited },
                        React.createElement("div", { className: cn(styles.component, className), ref: mergeRefs([componentRef, componentNodeRef]) },
                            React.createElement("div", { className: cn(styles.content, contentClassName) }, children))))))))));
});

export { BaseModal, BaseModalContext };
