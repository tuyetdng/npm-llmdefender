import { _ as __assign } from './tslib.es6-1d201b00.js';
import React, { forwardRef, useState, useRef, useCallback, useEffect, useContext } from 'react';
import { use100vh } from 'react-div-100vh';
import { useSwipeable } from 'react-swipeable';
import cn from 'classnames';
import { BaseModal, BaseModalContext } from '../../base-modal/esm';
import { Footer } from './components/footer/Component.js';
import { Typography } from '../../typography/esm';
import { SwipeableBackdrop } from './components/swipeable-backdrop/Component.js';
import { Backer } from './components/backer/Component.js';
import { Closer } from './components/closer/Component.js';
import '../../backdrop/esm';
import '../../icon-button/esm';
import '@alfalab/icons-glyph/ArrowBackMIcon';
import '@alfalab/icons-glyph/CrossMIcon';

var getDataTestId = function (dataTestId, element) {
    var elementPart = element ? "-".concat(element.toLowerCase()) : '';
    return dataTestId ? "".concat(dataTestId).concat(elementPart) : undefined;
};

var styles$1 = {"headerWrapper":"bottom-sheet__headerWrapper_1rnrb","header":"bottom-sheet__header_1rnrb","sticky":"bottom-sheet__sticky_1rnrb","highlighted":"bottom-sheet__highlighted_1rnrb","justifyEnd":"bottom-sheet__justifyEnd_1rnrb","addon":"bottom-sheet__addon_1rnrb","addonFixed":"bottom-sheet__addonFixed_1rnrb","addonLeft":"bottom-sheet__addonLeft_1rnrb","addonRight":"bottom-sheet__addonRight_1rnrb","title":"bottom-sheet__title_1rnrb","titleCenter":"bottom-sheet__titleCenter_1rnrb","titleLeft":"bottom-sheet__titleLeft_1rnrb","trimTitle":"bottom-sheet__trimTitle_1rnrb","titleBigIndentHorizontal":"bottom-sheet__titleBigIndentHorizontal_1rnrb","titleIndentRight":"bottom-sheet__titleIndentRight_1rnrb","titleIndentLeft":"bottom-sheet__titleIndentLeft_1rnrb"};
require('./components/header/index.css');

var Header = function (_a) {
    var _b, _c, _d, _e, _f;
    var title = _a.title, headerClassName = _a.headerClassName, addonClassName = _a.addonClassName, closerClassName = _a.closerClassName, backerClassName = _a.backerClassName, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, bottomAddons = _a.bottomAddons, hasCloser = _a.hasCloser, hasBacker = _a.hasBacker, titleAlign = _a.titleAlign, trimTitle = _a.trimTitle, sticky = _a.sticky, dataTestId = _a.dataTestId, onBack = _a.onBack;
    var _g = useContext(BaseModalContext), headerHighlighted = _g.headerHighlighted, setHasHeader = _g.setHasHeader, setHeaderOffset = _g.setHeaderOffset;
    var hasLeftPart = hasBacker || leftAddons || titleAlign === 'center';
    var hasRightPart = hasCloser || rightAddons || titleAlign === 'center';
    var hasHeaderContent = title || hasBacker || hasCloser;
    useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    useEffect(function () {
        setHeaderOffset(HEADER_OFFSET);
    }, [setHeaderOffset]);
    var getTitleIndent = function () {
        var _a;
        var titleAlignedCenter = titleAlign === 'center';
        var hasLeftPart = hasBacker || leftAddons;
        var hasRightPart = hasCloser || rightAddons;
        return cn((_a = {},
            _a[styles$1.titleBigIndentHorizontal] = !sticky && titleAlignedCenter && (hasLeftPart || hasRightPart),
            _a[styles$1.titleIndentLeft] = !sticky && !titleAlignedCenter && hasLeftPart,
            _a[styles$1.titleIndentRight] = !sticky && !titleAlignedCenter && hasRightPart,
            _a));
    };
    return (React.createElement("div", { className: cn(styles$1.headerWrapper, headerClassName, (_b = {},
            _b[styles$1.highlighted] = headerHighlighted && sticky,
            _b[styles$1.sticky] = sticky,
            _b)), "data-test-id": getDataTestId(dataTestId) },
        React.createElement("div", { className: cn(styles$1.header, headerClassName, (_c = {},
                _c[styles$1.justifyEnd] = !title,
                _c)) },
            hasLeftPart && (React.createElement("div", { className: cn(styles$1.addon, addonClassName, (_d = {},
                    _d[styles$1.addonFixed] = !sticky,
                    _d[styles$1.addonLeft] = !sticky,
                    _d)) }, hasBacker ? (React.createElement(Backer, { className: backerClassName, onClick: onBack, dataTestId: getDataTestId(dataTestId, 'backer') })) : (leftAddons))),
            hasHeaderContent && (React.createElement(Typography.Text, { view: 'primary-large', weight: 'bold', className: cn(styles$1.title, getTitleIndent(), (_e = {},
                    _e[styles$1.titleCenter] = titleAlign === 'center',
                    _e[styles$1.titleLeft] = titleAlign === 'left',
                    _e[styles$1.trimTitle] = trimTitle,
                    _e)), color: 'primary', dataTestId: getDataTestId(dataTestId, 'title') }, title)),
            hasRightPart && (React.createElement("div", { className: cn(styles$1.addon, addonClassName, (_f = {},
                    _f[styles$1.addonFixed] = !sticky,
                    _f[styles$1.addonRight] = !sticky,
                    _f)) }, hasCloser ? (React.createElement(Closer, { className: closerClassName, dataTestId: getDataTestId(dataTestId, 'closer') })) : (rightAddons)))),
        bottomAddons));
};

var styles = {"modal":"bottom-sheet__modal_1hse9","component":"bottom-sheet__component_1hse9","withTransition":"bottom-sheet__withTransition_1hse9","scrollableContainer":"bottom-sheet__scrollableContainer_1hse9","marker":"bottom-sheet__marker_1hse9","content":"bottom-sheet__content_1hse9","noHeader":"bottom-sheet__noHeader_1hse9","noFooter":"bottom-sheet__noFooter_1hse9","scrollLocked":"bottom-sheet__scrollLocked_1hse9","appear":"bottom-sheet__appear_1hse9","enter":"bottom-sheet__enter_1hse9","appearActive":"bottom-sheet__appearActive_1hse9","enterActive":"bottom-sheet__enterActive_1hse9","enterDone":"bottom-sheet__enterDone_1hse9","appearDone":"bottom-sheet__appearDone_1hse9","exit":"bottom-sheet__exit_1hse9","exitActive":"bottom-sheet__exitActive_1hse9"};
require('./index.css');

var TIMEOUT = 300;
var SWIPE_CLOSE_VELOCITY = 0.4;
var MIN_BACKDROP_OPACITY = 0.2;
var HEADER_HEIGHT = 56;
var MARKET_HEIGHT = 24;
/* Верхний отступ шторки, если она открыта на максимальную высоту */
var HEADER_OFFSET = 24;
var CLOSE_OFFSET = 0.2;
var BottomSheet = forwardRef(function (_a, ref) {
    var _b, _c, _d;
    var open = _a.open, title = _a.title, actionButton = _a.actionButton, contentClassName = _a.contentClassName, containerClassName = _a.containerClassName, containerProps = _a.containerProps, headerClassName = _a.headerClassName, footerClassName = _a.footerClassName, addonClassName = _a.addonClassName, closerClassName = _a.closerClassName, backerClassName = _a.backerClassName, modalClassName = _a.modalClassName, modalWrapperClassName = _a.modalWrapperClassName, className = _a.className, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, bottomAddons = _a.bottomAddons, hasCloser = _a.hasCloser, hasBacker = _a.hasBacker, _e = _a.titleAlign, titleAlign = _e === void 0 ? 'left' : _e, trimTitle = _a.trimTitle, stickyHeader = _a.stickyHeader, _f = _a.stickyFooter, stickyFooter = _f === void 0 ? true : _f, _g = _a.initialHeight, initialHeight = _g === void 0 ? 'default' : _g, hideOverlay = _a.hideOverlay, hideHeader = _a.hideHeader, disableOverlayClick = _a.disableOverlayClick, disableBlockingScroll = _a.disableBlockingScroll, children = _a.children, zIndex = _a.zIndex, _h = _a.transitionProps, transitionProps = _h === void 0 ? {} : _h, dataTestId = _a.dataTestId, _j = _a.swipeable, swipeable = _j === void 0 ? true : _j, backdropProps = _a.backdropProps, onClose = _a.onClose, onBack = _a.onBack;
    var _k = useState(0), sheetOffset = _k[0], setSheetOffset = _k[1];
    var _l = useState(1), backdropOpacity = _l[0], setBackdropOpacity = _l[1];
    var _m = useState(false), scrollLocked = _m[0], setScrollLocked = _m[1];
    var sheetHeight = useRef(0);
    var scrollableContainer = useRef(null);
    var scrollableContainerScrollValue = useRef(0);
    var emptyHeader = !hasCloser && !hasBacker && !leftAddons && !rightAddons && !title;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    var fullHeight = use100vh();
    var targetHeight = "".concat(fullHeight - HEADER_OFFSET, "px");
    var headerProps = {
        title: title,
        headerClassName: headerClassName,
        addonClassName: addonClassName,
        closerClassName: closerClassName,
        backerClassName: backerClassName,
        leftAddons: leftAddons,
        rightAddons: rightAddons,
        bottomAddons: bottomAddons,
        hasCloser: hasCloser,
        hasBacker: hasBacker,
        titleAlign: titleAlign,
        trimTitle: trimTitle,
        sticky: stickyHeader,
        dataTestId: getDataTestId(dataTestId, 'header'),
        onBack: onBack,
    };
    var getBackdropOpacity = function (offset) {
        if (sheetHeight.current === 0)
            return MIN_BACKDROP_OPACITY;
        var opacity = 1 - (1 - MIN_BACKDROP_OPACITY) * (offset / sheetHeight.current);
        return Number(opacity.toFixed(2));
    };
    var getSheetOffset = function (deltaY) {
        var offset = deltaY > 0 ? 0 : -deltaY;
        offset -= scrollableContainerScrollValue.current;
        return Math.floor(Math.max(0, offset));
    };
    /**
     * Если контент внутри шторки скроллится - то шторка не должна свайпаться
     * Если шапка внутри шторки зафиксирована - то шторка должна свайпаться только в области шапки
     */
    var shouldSkipSwiping = function (offsetY) {
        if (!swipeable)
            return true;
        if (!scrollableContainer.current ||
            (stickyHeader && offsetY <= HEADER_HEIGHT + HEADER_OFFSET) ||
            (!stickyHeader && offsetY <= MARKET_HEIGHT + HEADER_OFFSET)) {
            return false;
        }
        if (!scrollableContainerScrollValue.current) {
            scrollableContainerScrollValue.current = Math.floor(scrollableContainer.current.scrollTop);
        }
        return scrollableContainer.current.scrollTop > 0;
    };
    var handleBackdropSwipedDown = function (_a) {
        var velocity = _a.velocity;
        if (velocity > SWIPE_CLOSE_VELOCITY) {
            onClose();
        }
    };
    var handleSheetSwipedDown = function (_a) {
        var velocity = _a.velocity, initial = _a.initial;
        var offsetY = initial[1];
        if (shouldSkipSwiping(offsetY)) {
            return;
        }
        var shouldClose = sheetOffset > sheetHeight.current * CLOSE_OFFSET || velocity > SWIPE_CLOSE_VELOCITY;
        if (shouldClose) {
            onClose();
        }
        else {
            setSheetOffset(0);
            setBackdropOpacity(1);
        }
    };
    var handleSheetSwiped = function () {
        setScrollLocked(false);
        scrollableContainerScrollValue.current = 0;
    };
    var handleSheetSwiping = function (_a) {
        var deltaY = _a.deltaY, initial = _a.initial;
        var offsetY = initial[1];
        if (shouldSkipSwiping(offsetY)) {
            return;
        }
        var offset = getSheetOffset(deltaY);
        var opacity = getBackdropOpacity(offset);
        setSheetOffset(offset);
        setBackdropOpacity(opacity);
        /**
         * Если шторка начинает свайпаться, то блокируем скролл внутри нее
         */
        if (offset > 0) {
            setScrollLocked(true);
        }
    };
    var backdropSwipeablehandlers = useSwipeable({
        onSwipedDown: handleBackdropSwipedDown,
        delta: 100,
        trackMouse: swipeable,
    });
    var sheetSwipeablehandlers = useSwipeable({
        onSwiping: handleSheetSwiping,
        onSwipedDown: handleSheetSwipedDown,
        onSwiped: handleSheetSwiped,
        delta: 5,
        trackMouse: swipeable,
    });
    var handleExited = useCallback(function (node) {
        setBackdropOpacity(1);
        if (transitionProps.onExited) {
            transitionProps.onExited(node);
        }
    }, [transitionProps]);
    var handleEntered = useCallback(function (node, isAppearing) {
        if (!sheetHeight.current) {
            sheetHeight.current = node.getBoundingClientRect().height;
        }
        setBackdropOpacity(1);
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
    }, [transitionProps]);
    useEffect(function () {
        if (!open) {
            setSheetOffset(0);
        }
    }, [open]);
    var getSwipeStyles = function () { return ({
        transform: sheetOffset ? "translateY(".concat(sheetOffset, "px)") : '',
    }); };
    var getHeightStyles = function () { return ({
        height: initialHeight === 'full' ? targetHeight : 'unset',
        maxHeight: targetHeight,
    }); };
    return (React.createElement(BaseModal, { open: open, ref: ref, dataTestId: dataTestId, zIndex: zIndex, onClose: onClose, scrollHandler: scrollableContainer, Backdrop: SwipeableBackdrop, backdropProps: __assign(__assign({}, backdropProps), { opacity: backdropOpacity, handlers: swipeable ? backdropSwipeablehandlers : false, opacityTimeout: TIMEOUT, invisible: initialHeight === 'full' ? false : hideOverlay }), disableBackdropClick: hideOverlay ? true : disableOverlayClick, className: cn(styles.modal, modalClassName), wrapperClassName: modalWrapperClassName, disableBlockingScroll: disableBlockingScroll, transitionProps: __assign(__assign({ appear: true, timeout: TIMEOUT, classNames: styles }, transitionProps), { onExited: handleExited, onEntered: handleEntered }) },
        React.createElement("div", { style: __assign({}, getHeightStyles()) },
            React.createElement("div", __assign({ className: cn(styles.component, className, (_b = {},
                    _b[styles.withTransition] = !sheetOffset,
                    _b)), style: __assign(__assign({}, getSwipeStyles()), getHeightStyles()) }, sheetSwipeablehandlers),
                React.createElement("div", __assign({}, containerProps, { className: cn(styles.scrollableContainer, containerProps === null || containerProps === void 0 ? void 0 : containerProps.className, containerClassName, (_c = {},
                        _c[styles.scrollLocked] = scrollLocked,
                        _c)), ref: scrollableContainer }),
                    swipeable && React.createElement("div", { className: cn(styles.marker) }),
                    !hideHeader && !emptyHeader && React.createElement(Header, __assign({}, headerProps)),
                    React.createElement("div", { className: cn(styles.content, contentClassName, (_d = {},
                            _d[styles.noHeader] = hideHeader || emptyHeader,
                            _d[styles.noFooter] = !actionButton,
                            _d)) }, children),
                    actionButton && (React.createElement(Footer, { sticky: stickyFooter, className: footerClassName }, actionButton)))))));
});

export { BottomSheet as B, CLOSE_OFFSET as C, HEADER_OFFSET as H, Header as a };
