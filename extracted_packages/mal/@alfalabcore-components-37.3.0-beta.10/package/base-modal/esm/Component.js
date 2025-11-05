import React, { forwardRef, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import FocusLock from 'react-focus-lock';
import mergeRefs from 'react-merge-refs';
import { CSSTransition } from 'react-transition-group';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import { Backdrop } from '../../backdrop/esm';
import { Portal } from '../../portal/esm';
import { stackingOrder, Stack } from '../../stack/esm';
import { isScrolledToTop, isScrolledToBottom, handleContainer, restoreContainerStyles, hasScrollbar, getScrollbarSize } from './utils.js';
import './matches-polyfill.js';
import '../../global-store/esm';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var styles = {"component":"base-modal__component_y2un1","wrapper":"base-modal__wrapper_y2un1","content":"base-modal__content_y2un1","hidden":"base-modal__hidden_y2un1","backdrop":"base-modal__backdrop_y2un1","appear":"base-modal__appear_y2un1","enter":"base-modal__enter_y2un1","appearActive":"base-modal__appearActive_y2un1","enterActive":"base-modal__enterActive_y2un1","exit":"base-modal__exit_y2un1","exitActive":"base-modal__exitActive_y2un1","exitDone":"base-modal__exitDone_y2un1"};
require('./index.css');

// eslint-disable-next-line @typescript-eslint/no-redeclare
var BaseModalContext = React.createContext({
    hasFooter: false,
    hasHeader: false,
    hasScroll: false,
    headerHighlighted: false,
    footerHighlighted: false,
    headerOffset: 0,
    setHeaderOffset: function () { return null; },
    contentRef: function () { return null; },
    setHasHeader: function () { return null; },
    setHasFooter: function () { return null; },
    onClose: function () { return null; },
});
var BaseModal = forwardRef(function (_a, ref) {
    var open = _a.open, container = _a.container, children = _a.children, _b = _a.scrollHandler, scrollHandler = _b === void 0 ? 'wrapper' : _b, _c = _a.Backdrop, Backdrop$1 = _c === void 0 ? Backdrop : _c, _d = _a.backdropProps, backdropProps = _d === void 0 ? {} : _d, _e = _a.transitionProps, transitionProps = _e === void 0 ? {} : _e, disableBackdropClick = _a.disableBackdropClick, _f = _a.disableAutoFocus, disableAutoFocus = _f === void 0 ? false : _f, _g = _a.disableFocusLock, disableFocusLock = _g === void 0 ? false : _g, _h = _a.disableEscapeKeyDown, disableEscapeKeyDown = _h === void 0 ? false : _h, _j = _a.disableRestoreFocus, disableRestoreFocus = _j === void 0 ? false : _j, _k = _a.disableBlockingScroll, disableBlockingScroll = _k === void 0 ? false : _k, _l = _a.keepMounted, keepMounted = _l === void 0 ? false : _l, className = _a.className, contentClassName = _a.contentClassName, wrapperClassName = _a.wrapperClassName, onBackdropClick = _a.onBackdropClick, onClose = _a.onClose, onEscapeKeyDown = _a.onEscapeKeyDown, onMount = _a.onMount, onUnmount = _a.onUnmount, dataTestId = _a.dataTestId, _m = _a.zIndex, zIndex = _m === void 0 ? stackingOrder.MODAL : _m, _o = _a.componentRef, componentRef = _o === void 0 ? null : _o;
    var _p = useState(null), exited = _p[0], setExited = _p[1];
    var _q = useState(false), hasScroll = _q[0], setHasScroll = _q[1];
    var _r = useState(false), hasHeader = _r[0], setHasHeader = _r[1];
    var _s = useState(false), hasFooter = _s[0], setHasFooter = _s[1];
    var _t = useState(false), headerHighlighted = _t[0], setHeaderHighlighted = _t[1];
    var _u = useState(false), footerHighlighted = _u[0], setFooterHighlighted = _u[1];
    var _v = useState(0), headerOffset = _v[0], setHeaderOffset = _v[1];
    var componentNodeRef = useRef(null);
    var wrapperRef = useRef(null);
    var scrollableNodeRef = useRef(null);
    var contentNodeRef = useRef(null);
    var restoreContainerStylesRef = useRef(null);
    var mouseDownTarget = useRef();
    var resizeObserverRef = useRef();
    var checkToHasScrollBar = function () {
        if (scrollableNodeRef.current) {
            var scrollExists = hasScrollbar(scrollableNodeRef.current);
            setFooterHighlighted(scrollExists);
            setHasScroll(scrollExists);
        }
    };
    var isExited = exited || exited === null;
    var shouldRender = keepMounted || open || !isExited;
    var getContainer = useCallback(function () { return (container ? container() : document.body); }, [container]);
    var addResizeHandle = useCallback(function () {
        if (!resizeObserverRef.current)
            return;
        if (scrollableNodeRef.current) {
            resizeObserverRef.current.observe(scrollableNodeRef.current);
        }
        if (contentNodeRef.current) {
            resizeObserverRef.current.observe(contentNodeRef.current);
        }
    }, []);
    var removeResizeHandle = useCallback(function () { var _a; return (_a = resizeObserverRef.current) === null || _a === void 0 ? void 0 : _a.disconnect(); }, []);
    var contentRef = useCallback(function (node) {
        if (node !== null) {
            contentNodeRef.current = node;
            if (resizeObserverRef.current) {
                resizeObserverRef.current.observe(node);
            }
            checkToHasScrollBar();
        }
    }, []);
    var handleScroll = useCallback(function () {
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
    var handleClose = useCallback(function (event, reason) {
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
    var handleBackdropMouseDown = function (event) {
        var _a;
        var clickedOnScrollbar = false;
        var clientWidth = (_a = event.target) === null || _a === void 0 ? void 0 : _a.clientWidth;
        if (event.clientX && clientWidth) {
            // Устанавливаем смещение для абсолютно спозиционированного скроллбара в OSX в 17px.
            var offset = getScrollbarSize() === 0 ? 17 : 0;
            clickedOnScrollbar = event.clientX + offset > clientWidth;
        }
        if (!disableBackdropClick && !clickedOnScrollbar) {
            mouseDownTarget.current = event.target;
        }
    };
    var handleBackdropMouseUp = function (event) {
        if (!disableBackdropClick &&
            event.target === wrapperRef.current &&
            mouseDownTarget.current === wrapperRef.current) {
            handleClose(event, 'backdropClick');
        }
        mouseDownTarget.current = undefined;
    };
    var handleKeyDown = useCallback(function (event) {
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
    var getScrollHandler = useCallback(function () {
        if (scrollHandler === 'wrapper')
            return wrapperRef.current;
        if (scrollHandler === 'content')
            return componentNodeRef.current;
        return scrollHandler.current || wrapperRef.current;
    }, [scrollHandler]);
    var handleEntered = useCallback(function (node, isAppearing) {
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
    var handleExited = useCallback(function (node) {
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
    useEffect(function () {
        if (open && isExited) {
            if (!disableBlockingScroll) {
                var el_1 = getContainer();
                handleContainer(el_1);
                restoreContainerStylesRef.current = function () {
                    restoreContainerStylesRef.current = null;
                    restoreContainerStyles(el_1);
                };
            }
            setExited(false);
        }
    }, [getContainer, open, disableBlockingScroll, isExited]);
    useEffect(function () {
        var ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        resizeObserverRef.current = new ResizeObserver$1(checkToHasScrollBar);
        return function () {
            if (restoreContainerStylesRef.current) {
                restoreContainerStylesRef.current();
            }
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, []);
    var contextValue = useMemo(function () { return ({
        hasHeader: hasHeader,
        hasFooter: hasFooter,
        hasScroll: hasScroll,
        headerHighlighted: headerHighlighted,
        footerHighlighted: footerHighlighted,
        headerOffset: headerOffset,
        setHeaderOffset: setHeaderOffset,
        contentRef: contentRef,
        setHasHeader: setHasHeader,
        setHasFooter: setHasFooter,
        onClose: handleClose,
    }); }, [
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
    return (React.createElement(Stack, { value: zIndex }, function (computedZIndex) {
        var _a;
        return (React.createElement(Portal, { getPortalContainer: container, immediateMount: true },
            React.createElement(BaseModalContext.Provider, { value: contextValue },
                React.createElement(FocusLock, { autoFocus: !disableAutoFocus, disabled: disableFocusLock || !open, returnFocus: !disableRestoreFocus },
                    Backdrop$1 && (React.createElement(Backdrop$1, __assign({}, backdropProps, { className: cn(backdropProps.className, styles.backdrop), open: open, style: {
                            zIndex: computedZIndex,
                        } }))),
                    React.createElement("div", { role: 'dialog', className: cn(styles.wrapper, wrapperClassName, (_a = {},
                            _a[styles.hidden] = !open && isExited,
                            _a)), ref: mergeRefs([ref, wrapperRef]), onKeyDown: handleKeyDown, onMouseDown: handleBackdropMouseDown, onMouseUp: handleBackdropMouseUp, 
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        tabIndex: 0, "data-test-id": dataTestId, style: {
                            zIndex: computedZIndex,
                        } },
                        React.createElement(CSSTransition, __assign({ appear: true, timeout: 200, classNames: styles }, transitionProps, { in: open, onEntered: handleEntered, onExited: handleExited }),
                            React.createElement("div", { className: cn(styles.component, className), ref: mergeRefs([componentRef, componentNodeRef]) },
                                React.createElement("div", { className: cn(styles.content, contentClassName) }, children))))))));
    }));
});

export { BaseModal, BaseModalContext };
