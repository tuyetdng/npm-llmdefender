import React, { forwardRef, useState, useRef, useCallback, useEffect, useContext } from 'react';
import { use100vh } from 'react-div-100vh';
import { useSwipeable } from 'react-swipeable';
import cn from 'classnames';
import { BaseModal, BaseModalContext } from '../../base-modal/modern';
import { Footer } from './components/footer/Component.js';
import { Typography } from '../../typography/modern';
import { SwipeableBackdrop } from './components/swipeable-backdrop/Component.js';
import { Backer } from './components/backer/Component.js';
import { Closer } from './components/closer/Component.js';
import '../../backdrop/modern';
import '../../icon-button/modern';
import '@alfalab/icons-glyph/ArrowBackMIcon';
import '@alfalab/icons-glyph/CrossMIcon';

const getDataTestId = (dataTestId, element) => {
    const elementPart = element ? `-${element.toLowerCase()}` : '';
    return dataTestId ? `${dataTestId}${elementPart}` : undefined;
};

const styles$1 = {"headerWrapper":"bottom-sheet__headerWrapper_1rnrb","header":"bottom-sheet__header_1rnrb","sticky":"bottom-sheet__sticky_1rnrb","highlighted":"bottom-sheet__highlighted_1rnrb","justifyEnd":"bottom-sheet__justifyEnd_1rnrb","addon":"bottom-sheet__addon_1rnrb","addonFixed":"bottom-sheet__addonFixed_1rnrb","addonLeft":"bottom-sheet__addonLeft_1rnrb","addonRight":"bottom-sheet__addonRight_1rnrb","title":"bottom-sheet__title_1rnrb","titleCenter":"bottom-sheet__titleCenter_1rnrb","titleLeft":"bottom-sheet__titleLeft_1rnrb","trimTitle":"bottom-sheet__trimTitle_1rnrb","titleBigIndentHorizontal":"bottom-sheet__titleBigIndentHorizontal_1rnrb","titleIndentRight":"bottom-sheet__titleIndentRight_1rnrb","titleIndentLeft":"bottom-sheet__titleIndentLeft_1rnrb"};
require('./components/header/index.css');

const Header = ({ title, headerClassName, addonClassName, closerClassName, backerClassName, leftAddons, rightAddons, bottomAddons, hasCloser, hasBacker, titleAlign, trimTitle, sticky, dataTestId, onBack, }) => {
    const { headerHighlighted, setHasHeader, setHeaderOffset } = useContext(BaseModalContext);
    const hasLeftPart = hasBacker || leftAddons || titleAlign === 'center';
    const hasRightPart = hasCloser || rightAddons || titleAlign === 'center';
    const hasHeaderContent = title || hasBacker || hasCloser;
    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);
    useEffect(() => {
        setHeaderOffset(HEADER_OFFSET);
    }, [setHeaderOffset]);
    const getTitleIndent = () => {
        const titleAlignedCenter = titleAlign === 'center';
        const hasLeftPart = hasBacker || leftAddons;
        const hasRightPart = hasCloser || rightAddons;
        return cn({
            [styles$1.titleBigIndentHorizontal]: !sticky && titleAlignedCenter && (hasLeftPart || hasRightPart),
            [styles$1.titleIndentLeft]: !sticky && !titleAlignedCenter && hasLeftPart,
            [styles$1.titleIndentRight]: !sticky && !titleAlignedCenter && hasRightPart,
        });
    };
    return (React.createElement("div", { className: cn(styles$1.headerWrapper, headerClassName, {
            [styles$1.highlighted]: headerHighlighted && sticky,
            [styles$1.sticky]: sticky,
        }), "data-test-id": getDataTestId(dataTestId) },
        React.createElement("div", { className: cn(styles$1.header, headerClassName, {
                [styles$1.justifyEnd]: !title,
            }) },
            hasLeftPart && (React.createElement("div", { className: cn(styles$1.addon, addonClassName, {
                    [styles$1.addonFixed]: !sticky,
                    [styles$1.addonLeft]: !sticky,
                }) }, hasBacker ? (React.createElement(Backer, { className: backerClassName, onClick: onBack, dataTestId: getDataTestId(dataTestId, 'backer') })) : (leftAddons))),
            hasHeaderContent && (React.createElement(Typography.Text, { view: 'primary-large', weight: 'bold', className: cn(styles$1.title, getTitleIndent(), {
                    [styles$1.titleCenter]: titleAlign === 'center',
                    [styles$1.titleLeft]: titleAlign === 'left',
                    [styles$1.trimTitle]: trimTitle,
                }), color: 'primary', dataTestId: getDataTestId(dataTestId, 'title') }, title)),
            hasRightPart && (React.createElement("div", { className: cn(styles$1.addon, addonClassName, {
                    [styles$1.addonFixed]: !sticky,
                    [styles$1.addonRight]: !sticky,
                }) }, hasCloser ? (React.createElement(Closer, { className: closerClassName, dataTestId: getDataTestId(dataTestId, 'closer') })) : (rightAddons)))),
        bottomAddons));
};

const styles = {"modal":"bottom-sheet__modal_1hse9","component":"bottom-sheet__component_1hse9","withTransition":"bottom-sheet__withTransition_1hse9","scrollableContainer":"bottom-sheet__scrollableContainer_1hse9","marker":"bottom-sheet__marker_1hse9","content":"bottom-sheet__content_1hse9","noHeader":"bottom-sheet__noHeader_1hse9","noFooter":"bottom-sheet__noFooter_1hse9","scrollLocked":"bottom-sheet__scrollLocked_1hse9","appear":"bottom-sheet__appear_1hse9","enter":"bottom-sheet__enter_1hse9","appearActive":"bottom-sheet__appearActive_1hse9","enterActive":"bottom-sheet__enterActive_1hse9","enterDone":"bottom-sheet__enterDone_1hse9","appearDone":"bottom-sheet__appearDone_1hse9","exit":"bottom-sheet__exit_1hse9","exitActive":"bottom-sheet__exitActive_1hse9"};
require('./index.css');

const TIMEOUT = 300;
const SWIPE_CLOSE_VELOCITY = 0.4;
const MIN_BACKDROP_OPACITY = 0.2;
const HEADER_HEIGHT = 56;
const MARKET_HEIGHT = 24;
/* Верхний отступ шторки, если она открыта на максимальную высоту */
const HEADER_OFFSET = 24;
const CLOSE_OFFSET = 0.2;
const BottomSheet = forwardRef(({ open, title, actionButton, contentClassName, containerClassName, containerProps, headerClassName, footerClassName, addonClassName, closerClassName, backerClassName, modalClassName, modalWrapperClassName, className, leftAddons, rightAddons, bottomAddons, hasCloser, hasBacker, titleAlign = 'left', trimTitle, stickyHeader, stickyFooter = true, initialHeight = 'default', hideOverlay, hideHeader, disableOverlayClick, disableBlockingScroll, children, zIndex, transitionProps = {}, dataTestId, swipeable = true, backdropProps, onClose, onBack, }, ref) => {
    const [sheetOffset, setSheetOffset] = useState(0);
    const [backdropOpacity, setBackdropOpacity] = useState(1);
    const [scrollLocked, setScrollLocked] = useState(false);
    const sheetHeight = useRef(0);
    const scrollableContainer = useRef(null);
    const scrollableContainerScrollValue = useRef(0);
    const emptyHeader = !hasCloser && !hasBacker && !leftAddons && !rightAddons && !title;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    const fullHeight = use100vh();
    const targetHeight = `${fullHeight - HEADER_OFFSET}px`;
    const headerProps = {
        title,
        headerClassName,
        addonClassName,
        closerClassName,
        backerClassName,
        leftAddons,
        rightAddons,
        bottomAddons,
        hasCloser,
        hasBacker,
        titleAlign,
        trimTitle,
        sticky: stickyHeader,
        dataTestId: getDataTestId(dataTestId, 'header'),
        onBack,
    };
    const getBackdropOpacity = (offset) => {
        if (sheetHeight.current === 0)
            return MIN_BACKDROP_OPACITY;
        const opacity = 1 - (1 - MIN_BACKDROP_OPACITY) * (offset / sheetHeight.current);
        return Number(opacity.toFixed(2));
    };
    const getSheetOffset = (deltaY) => {
        let offset = deltaY > 0 ? 0 : -deltaY;
        offset -= scrollableContainerScrollValue.current;
        return Math.floor(Math.max(0, offset));
    };
    /**
     * Если контент внутри шторки скроллится - то шторка не должна свайпаться
     * Если шапка внутри шторки зафиксирована - то шторка должна свайпаться только в области шапки
     */
    const shouldSkipSwiping = (offsetY) => {
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
    const handleBackdropSwipedDown = ({ velocity }) => {
        if (velocity > SWIPE_CLOSE_VELOCITY) {
            onClose();
        }
    };
    const handleSheetSwipedDown = ({ velocity, initial }) => {
        const offsetY = initial[1];
        if (shouldSkipSwiping(offsetY)) {
            return;
        }
        const shouldClose = sheetOffset > sheetHeight.current * CLOSE_OFFSET || velocity > SWIPE_CLOSE_VELOCITY;
        if (shouldClose) {
            onClose();
        }
        else {
            setSheetOffset(0);
            setBackdropOpacity(1);
        }
    };
    const handleSheetSwiped = () => {
        setScrollLocked(false);
        scrollableContainerScrollValue.current = 0;
    };
    const handleSheetSwiping = ({ deltaY, initial }) => {
        const offsetY = initial[1];
        if (shouldSkipSwiping(offsetY)) {
            return;
        }
        const offset = getSheetOffset(deltaY);
        const opacity = getBackdropOpacity(offset);
        setSheetOffset(offset);
        setBackdropOpacity(opacity);
        /**
         * Если шторка начинает свайпаться, то блокируем скролл внутри нее
         */
        if (offset > 0) {
            setScrollLocked(true);
        }
    };
    const backdropSwipeablehandlers = useSwipeable({
        onSwipedDown: handleBackdropSwipedDown,
        delta: 100,
        trackMouse: swipeable,
    });
    const sheetSwipeablehandlers = useSwipeable({
        onSwiping: handleSheetSwiping,
        onSwipedDown: handleSheetSwipedDown,
        onSwiped: handleSheetSwiped,
        delta: 5,
        trackMouse: swipeable,
    });
    const handleExited = useCallback((node) => {
        setBackdropOpacity(1);
        if (transitionProps.onExited) {
            transitionProps.onExited(node);
        }
    }, [transitionProps]);
    const handleEntered = useCallback((node, isAppearing) => {
        if (!sheetHeight.current) {
            sheetHeight.current = node.getBoundingClientRect().height;
        }
        setBackdropOpacity(1);
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
    }, [transitionProps]);
    useEffect(() => {
        if (!open) {
            setSheetOffset(0);
        }
    }, [open]);
    const getSwipeStyles = () => ({
        transform: sheetOffset ? `translateY(${sheetOffset}px)` : '',
    });
    const getHeightStyles = () => ({
        height: initialHeight === 'full' ? targetHeight : 'unset',
        maxHeight: targetHeight,
    });
    return (React.createElement(BaseModal, { open: open, ref: ref, dataTestId: dataTestId, zIndex: zIndex, onClose: onClose, scrollHandler: scrollableContainer, Backdrop: SwipeableBackdrop, backdropProps: {
            ...backdropProps,
            opacity: backdropOpacity,
            handlers: swipeable ? backdropSwipeablehandlers : false,
            opacityTimeout: TIMEOUT,
            invisible: initialHeight === 'full' ? false : hideOverlay,
        }, disableBackdropClick: hideOverlay ? true : disableOverlayClick, className: cn(styles.modal, modalClassName), wrapperClassName: modalWrapperClassName, disableBlockingScroll: disableBlockingScroll, transitionProps: {
            appear: true,
            timeout: TIMEOUT,
            classNames: styles,
            ...transitionProps,
            onExited: handleExited,
            onEntered: handleEntered,
        } },
        React.createElement("div", { style: { ...getHeightStyles() } },
            React.createElement("div", { className: cn(styles.component, className, {
                    [styles.withTransition]: !sheetOffset,
                }), style: {
                    ...getSwipeStyles(),
                    ...getHeightStyles(),
                }, ...sheetSwipeablehandlers },
                React.createElement("div", { ...containerProps, className: cn(styles.scrollableContainer, containerProps?.className, containerClassName, {
                        [styles.scrollLocked]: scrollLocked,
                    }), ref: scrollableContainer },
                    swipeable && React.createElement("div", { className: cn(styles.marker) }),
                    !hideHeader && !emptyHeader && React.createElement(Header, { ...headerProps }),
                    React.createElement("div", { className: cn(styles.content, contentClassName, {
                            [styles.noHeader]: hideHeader || emptyHeader,
                            [styles.noFooter]: !actionButton,
                        }) }, children),
                    actionButton && (React.createElement(Footer, { sticky: stickyFooter, className: footerClassName }, actionButton)))))));
});

export { BottomSheet as B, CLOSE_OFFSET as C, HEADER_OFFSET as H, Header as a };
