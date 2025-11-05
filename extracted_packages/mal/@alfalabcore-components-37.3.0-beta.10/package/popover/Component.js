var React = require('react');
var mergeRefs = require('react-merge-refs');
var reactPopper = require('react-popper');
var reactTransitionGroup = require('react-transition-group');
var resizeObserver = require('@juggle/resize-observer');
var cn = require('classnames');
var maxSize = require('popper-max-size-modifier');
var coreComponentsPortal = require('../portal');
var coreComponentsStack = require('../stack');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var maxSize__default = /*#__PURE__*/_interopDefaultCompat(maxSize);

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

var styles = {"component":"popover__component_1r7wg","inner":"popover__inner_1r7wg","scrollableContent":"popover__scrollableContent_1r7wg","arrow":"popover__arrow_1r7wg","arrowShift":"popover__arrowShift_1r7wg","enter":"popover__enter_1r7wg","enterActive":"popover__enterActive_1r7wg","exit":"popover__exit_1r7wg","exitActive":"popover__exitActive_1r7wg"};
require('./index.css');

var DEFAULT_TRANSITION = {
    timeout: 150,
};
var CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};
var availableHieghtModifier = {
    name: 'availableHeight',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['maxSize'],
    fn: function (_a) {
        var _b = _a.state, modifiersData = _b.modifiersData, popper = _b.elements.popper;
        var height = modifiersData.maxSize.height;
        var content = popper.querySelector(".".concat(styles.scrollableContent));
        if (content && !content.style.maxHeight) {
            content.style.maxHeight = "".concat(height, "px");
        }
    },
};
/**
 * Минимальный размер anchorElement,
 * при котором возможно смещение стрелочки относительно центра
 */
var MIN_ARROW_SHIFT_SIZE = 75;
var Popover = React.forwardRef(function (_a, ref) {
    var children = _a.children, getPortalContainer = _a.getPortalContainer, _b = _a.transition, transition = _b === void 0 ? DEFAULT_TRANSITION : _b, anchorElement = _a.anchorElement, useAnchorWidth = _a.useAnchorWidth, _c = _a.offset, offset = _c === void 0 ? [0, 0] : _c, _d = _a.withArrow, withArrow = _d === void 0 ? false : _d, _e = _a.withTransition, withTransition = _e === void 0 ? true : _e, _f = _a.position, position = _f === void 0 ? 'left' : _f, preventFlip = _a.preventFlip, popperClassName = _a.popperClassName, arrowClassName = _a.arrowClassName, className = _a.className, open = _a.open, dataTestId = _a.dataTestId, update = _a.update, _g = _a.transitionDuration, transitionDuration = _g === void 0 ? "".concat(transition.timeout, "ms") : _g, _h = _a.zIndex, zIndex = _h === void 0 ? coreComponentsStack.stackingOrder.POPOVER : _h, fallbackPlacements = _a.fallbackPlacements, _j = _a.preventOverflow, preventOverflow = _j === void 0 ? true : _j, _k = _a.availableHeight, availableHeight = _k === void 0 ? false : _k;
    var _l = React.useState(anchorElement), referenceElement = _l[0], setReferenceElement = _l[1];
    var _m = React.useState(null), popperElement = _m[0], setPopperElement = _m[1];
    var _o = React.useState(null), arrowElement = _o[0], setArrowElement = _o[1];
    var _p = React.useState(false), arrowShift = _p[0], setArrowShift = _p[1];
    var updatePopperRef = React.useRef();
    var popperModifiers = React.useMemo(function () {
        var modifiers = [{ name: 'offset', options: { offset: offset } }];
        if (withArrow) {
            modifiers.push({ name: 'arrow', options: { element: arrowElement } });
        }
        if (preventFlip) {
            modifiers.push({ name: 'flip', options: { fallbackPlacements: [] } });
        }
        if (fallbackPlacements) {
            modifiers.push({ name: 'flip', options: { fallbackPlacements: fallbackPlacements } });
        }
        if (preventOverflow) {
            modifiers.push({ name: 'preventOverflow', options: { mainAxis: false } });
        }
        if (availableHeight) {
            modifiers.push(__assign(__assign({}, maxSize__default.default), { options: {} }));
            modifiers.push(__assign(__assign({}, availableHieghtModifier), { options: {} }));
        }
        return modifiers;
    }, [
        offset,
        withArrow,
        preventFlip,
        fallbackPlacements,
        preventOverflow,
        availableHeight,
        arrowElement,
    ]);
    var _q = reactPopper.usePopper(referenceElement, popperElement, {
        placement: position,
        modifiers: popperModifiers,
    }), popperStyles = _q.styles, attributes = _q.attributes, updatePopper = _q.update;
    if (updatePopper) {
        updatePopperRef.current = updatePopper;
    }
    React.useEffect(function () {
        setReferenceElement(anchorElement);
    }, [anchorElement]);
    React.useEffect(function () {
        if (updatePopper) {
            updatePopper();
        }
    }, [updatePopper, arrowElement, children]);
    React.useEffect(function () {
        if (update && !update.current && updatePopper) {
            // eslint-disable-next-line no-param-reassign
            update.current = updatePopper;
        }
    });
    React.useEffect(function () {
        if (useAnchorWidth) {
            var updatePopoverWidth = function () { var _a; return (_a = updatePopperRef.current) === null || _a === void 0 ? void 0 : _a.call(updatePopperRef); };
            var ResizeObserver_1 = window.ResizeObserver || resizeObserver.ResizeObserver;
            var observer_1 = new ResizeObserver_1(updatePopoverWidth);
            if (anchorElement) {
                observer_1.observe(anchorElement);
            }
            return function () {
                observer_1.disconnect();
            };
        }
        return function () { return ({}); };
    }, [anchorElement, useAnchorWidth]);
    /**
     * По дизайну, если у тултипа позиционирование -start/-end, то стрелочка немного сдвигается вбок.
     * Но если anchorElement слишком маленький, то стрелочка сдвигаться не должна.
     */
    React.useEffect(function () {
        var shiftedPosition = position.includes('-start') || position.includes('-end');
        if (shiftedPosition && referenceElement) {
            var _a = referenceElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            var size = position.includes('left') || position.includes('right') ? height : width;
            if (size >= MIN_ARROW_SHIFT_SIZE) {
                setArrowShift(true);
            }
        }
    }, [referenceElement, position]);
    var renderContent = function (computedZIndex, style) {
        var _a, _b;
        var _c;
        return (React__default.default.createElement("div", __assign({ ref: mergeRefs__default.default([ref, setPopperElement]), style: __assign(__assign({ zIndex: computedZIndex, width: useAnchorWidth ? referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.offsetWidth : undefined }, popperStyles.popper), (((_c = popperStyles.popper) === null || _c === void 0 ? void 0 : _c.transform) ? null : { visibility: 'hidden' })), "data-test-id": dataTestId, className: cn__default.default(styles.component, className, (_a = {},
                _a[styles.arrowShift] = arrowShift,
                _a)) }, attributes.popper),
            React__default.default.createElement("div", { className: cn__default.default(styles.inner, popperClassName), style: style },
                React__default.default.createElement("div", { className: cn__default.default((_b = {}, _b[styles.scrollableContent] = availableHeight, _b)) }, children),
                withArrow && (React__default.default.createElement("div", { ref: setArrowElement, style: popperStyles.arrow, className: cn__default.default(styles.arrow, arrowClassName) })))));
    };
    return (React__default.default.createElement(coreComponentsStack.Stack, { value: zIndex }, function (computedZIndex) { return (React__default.default.createElement(coreComponentsPortal.Portal, { getPortalContainer: getPortalContainer }, withTransition ? (React__default.default.createElement(reactTransitionGroup.CSSTransition, __assign({ unmountOnExit: true, classNames: CSS_TRANSITION_CLASS_NAMES }, transition, { in: open }), renderContent(computedZIndex, { transitionDuration: transitionDuration }))) : (open && renderContent(computedZIndex)))); }));
});

exports.Popover = Popover;
