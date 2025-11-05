var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var reactDiv100vh = require('react-div-100vh');
var reactSwipeable = require('react-swipeable');
var cn = require('classnames');
var coreComponentsBaseModal = require('../../base-modal/cssm');
var components_footer_Component = require('./components/footer/Component.js');
var coreComponentsTypography = require('../../typography/cssm');
var components_swipeableBackdrop_Component = require('./components/swipeable-backdrop/Component.js');
var styles$1 = require('./index.module.css');
var components_backer_Component = require('./components/backer/Component.js');
var components_closer_Component = require('./components/closer/Component.js');
var styles = require('./components/header/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default$1 = /*#__PURE__*/_interopDefaultCompat(styles$1);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var getDataTestId = function (dataTestId, element) {
    var elementPart = element ? "-".concat(element.toLowerCase()) : '';
    return dataTestId ? "".concat(dataTestId).concat(elementPart) : undefined;
};

var Header = function (_a) {
    var _b, _c, _d, _e, _f;
    var title = _a.title, headerClassName = _a.headerClassName, addonClassName = _a.addonClassName, closerClassName = _a.closerClassName, backerClassName = _a.backerClassName, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, bottomAddons = _a.bottomAddons, hasCloser = _a.hasCloser, hasBacker = _a.hasBacker, titleAlign = _a.titleAlign, trimTitle = _a.trimTitle, sticky = _a.sticky, dataTestId = _a.dataTestId, onBack = _a.onBack;
    var _g = React.useContext(coreComponentsBaseModal.BaseModalContext), headerHighlighted = _g.headerHighlighted, setHasHeader = _g.setHasHeader, setHeaderOffset = _g.setHeaderOffset;
    var hasLeftPart = hasBacker || leftAddons || titleAlign === 'center';
    var hasRightPart = hasCloser || rightAddons || titleAlign === 'center';
    var hasHeaderContent = title || hasBacker || hasCloser;
    React.useEffect(function () {
        setHasHeader(true);
    }, [setHasHeader]);
    React.useEffect(function () {
        setHeaderOffset(HEADER_OFFSET);
    }, [setHeaderOffset]);
    var getTitleIndent = function () {
        var _a;
        var titleAlignedCenter = titleAlign === 'center';
        var hasLeftPart = hasBacker || leftAddons;
        var hasRightPart = hasCloser || rightAddons;
        return cn__default.default((_a = {},
            _a[styles__default.default.titleBigIndentHorizontal] = !sticky && titleAlignedCenter && (hasLeftPart || hasRightPart),
            _a[styles__default.default.titleIndentLeft] = !sticky && !titleAlignedCenter && hasLeftPart,
            _a[styles__default.default.titleIndentRight] = !sticky && !titleAlignedCenter && hasRightPart,
            _a));
    };
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.headerWrapper, headerClassName, (_b = {},
            _b[styles__default.default.highlighted] = headerHighlighted && sticky,
            _b[styles__default.default.sticky] = sticky,
            _b)), "data-test-id": getDataTestId(dataTestId) },
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.header, headerClassName, (_c = {},
                _c[styles__default.default.justifyEnd] = !title,
                _c)) },
            hasLeftPart && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.addon, addonClassName, (_d = {},
                    _d[styles__default.default.addonFixed] = !sticky,
                    _d[styles__default.default.addonLeft] = !sticky,
                    _d)) }, hasBacker ? (React__default.default.createElement(components_backer_Component.Backer, { className: backerClassName, onClick: onBack, dataTestId: getDataTestId(dataTestId, 'backer') })) : (leftAddons))),
            hasHeaderContent && (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-large', weight: 'bold', className: cn__default.default(styles__default.default.title, getTitleIndent(), (_e = {},
                    _e[styles__default.default.titleCenter] = titleAlign === 'center',
                    _e[styles__default.default.titleLeft] = titleAlign === 'left',
                    _e[styles__default.default.trimTitle] = trimTitle,
                    _e)), color: 'primary', dataTestId: getDataTestId(dataTestId, 'title') }, title)),
            hasRightPart && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.addon, addonClassName, (_f = {},
                    _f[styles__default.default.addonFixed] = !sticky,
                    _f[styles__default.default.addonRight] = !sticky,
                    _f)) }, hasCloser ? (React__default.default.createElement(components_closer_Component.Closer, { className: closerClassName, dataTestId: getDataTestId(dataTestId, 'closer') })) : (rightAddons)))),
        bottomAddons));
};

var TIMEOUT = 300;
var SWIPE_CLOSE_VELOCITY = 0.4;
var MIN_BACKDROP_OPACITY = 0.2;
var HEADER_HEIGHT = 56;
var MARKET_HEIGHT = 24;
/* Верхний отступ шторки, если она открыта на максимальную высоту */
var HEADER_OFFSET = 24;
var CLOSE_OFFSET = 0.2;
var BottomSheet = React.forwardRef(function (_a, ref) {
    var _b, _c, _d;
    var open = _a.open, title = _a.title, actionButton = _a.actionButton, contentClassName = _a.contentClassName, containerClassName = _a.containerClassName, containerProps = _a.containerProps, headerClassName = _a.headerClassName, footerClassName = _a.footerClassName, addonClassName = _a.addonClassName, closerClassName = _a.closerClassName, backerClassName = _a.backerClassName, modalClassName = _a.modalClassName, modalWrapperClassName = _a.modalWrapperClassName, className = _a.className, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, bottomAddons = _a.bottomAddons, hasCloser = _a.hasCloser, hasBacker = _a.hasBacker, _e = _a.titleAlign, titleAlign = _e === void 0 ? 'left' : _e, trimTitle = _a.trimTitle, stickyHeader = _a.stickyHeader, _f = _a.stickyFooter, stickyFooter = _f === void 0 ? true : _f, _g = _a.initialHeight, initialHeight = _g === void 0 ? 'default' : _g, hideOverlay = _a.hideOverlay, hideHeader = _a.hideHeader, disableOverlayClick = _a.disableOverlayClick, disableBlockingScroll = _a.disableBlockingScroll, children = _a.children, zIndex = _a.zIndex, _h = _a.transitionProps, transitionProps = _h === void 0 ? {} : _h, dataTestId = _a.dataTestId, _j = _a.swipeable, swipeable = _j === void 0 ? true : _j, backdropProps = _a.backdropProps, onClose = _a.onClose, onBack = _a.onBack;
    var _k = React.useState(0), sheetOffset = _k[0], setSheetOffset = _k[1];
    var _l = React.useState(1), backdropOpacity = _l[0], setBackdropOpacity = _l[1];
    var _m = React.useState(false), scrollLocked = _m[0], setScrollLocked = _m[1];
    var sheetHeight = React.useRef(0);
    var scrollableContainer = React.useRef(null);
    var scrollableContainerScrollValue = React.useRef(0);
    var emptyHeader = !hasCloser && !hasBacker && !leftAddons && !rightAddons && !title;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    var fullHeight = reactDiv100vh.use100vh();
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
    var backdropSwipeablehandlers = reactSwipeable.useSwipeable({
        onSwipedDown: handleBackdropSwipedDown,
        delta: 100,
        trackMouse: swipeable,
    });
    var sheetSwipeablehandlers = reactSwipeable.useSwipeable({
        onSwiping: handleSheetSwiping,
        onSwipedDown: handleSheetSwipedDown,
        onSwiped: handleSheetSwiped,
        delta: 5,
        trackMouse: swipeable,
    });
    var handleExited = React.useCallback(function (node) {
        setBackdropOpacity(1);
        if (transitionProps.onExited) {
            transitionProps.onExited(node);
        }
    }, [transitionProps]);
    var handleEntered = React.useCallback(function (node, isAppearing) {
        if (!sheetHeight.current) {
            sheetHeight.current = node.getBoundingClientRect().height;
        }
        setBackdropOpacity(1);
        if (transitionProps.onEntered) {
            transitionProps.onEntered(node, isAppearing);
        }
    }, [transitionProps]);
    React.useEffect(function () {
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
    return (React__default.default.createElement(coreComponentsBaseModal.BaseModal, { open: open, ref: ref, dataTestId: dataTestId, zIndex: zIndex, onClose: onClose, scrollHandler: scrollableContainer, Backdrop: components_swipeableBackdrop_Component.SwipeableBackdrop, backdropProps: tslib_es6.__assign(tslib_es6.__assign({}, backdropProps), { opacity: backdropOpacity, handlers: swipeable ? backdropSwipeablehandlers : false, opacityTimeout: TIMEOUT, invisible: initialHeight === 'full' ? false : hideOverlay }), disableBackdropClick: hideOverlay ? true : disableOverlayClick, className: cn__default.default(styles__default$1.default.modal, modalClassName), wrapperClassName: modalWrapperClassName, disableBlockingScroll: disableBlockingScroll, transitionProps: tslib_es6.__assign(tslib_es6.__assign({ appear: true, timeout: TIMEOUT, classNames: styles__default$1.default }, transitionProps), { onExited: handleExited, onEntered: handleEntered }) },
        React__default.default.createElement("div", { style: tslib_es6.__assign({}, getHeightStyles()) },
            React__default.default.createElement("div", tslib_es6.__assign({ className: cn__default.default(styles__default$1.default.component, className, (_b = {},
                    _b[styles__default$1.default.withTransition] = !sheetOffset,
                    _b)), style: tslib_es6.__assign(tslib_es6.__assign({}, getSwipeStyles()), getHeightStyles()) }, sheetSwipeablehandlers),
                React__default.default.createElement("div", tslib_es6.__assign({}, containerProps, { className: cn__default.default(styles__default$1.default.scrollableContainer, containerProps === null || containerProps === void 0 ? void 0 : containerProps.className, containerClassName, (_c = {},
                        _c[styles__default$1.default.scrollLocked] = scrollLocked,
                        _c)), ref: scrollableContainer }),
                    swipeable && React__default.default.createElement("div", { className: cn__default.default(styles__default$1.default.marker) }),
                    !hideHeader && !emptyHeader && React__default.default.createElement(Header, tslib_es6.__assign({}, headerProps)),
                    React__default.default.createElement("div", { className: cn__default.default(styles__default$1.default.content, contentClassName, (_d = {},
                            _d[styles__default$1.default.noHeader] = hideHeader || emptyHeader,
                            _d[styles__default$1.default.noFooter] = !actionButton,
                            _d)) }, children),
                    actionButton && (React__default.default.createElement(components_footer_Component.Footer, { sticky: stickyFooter, className: footerClassName }, actionButton)))))));
});

exports.BottomSheet = BottomSheet;
exports.CLOSE_OFFSET = CLOSE_OFFSET;
exports.HEADER_OFFSET = HEADER_OFFSET;
exports.Header = Header;
