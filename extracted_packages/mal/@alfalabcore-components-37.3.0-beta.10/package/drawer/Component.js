var React = require('react');
var reactTransitionGroup = require('react-transition-group');
var cn = require('classnames');
var coreComponentsBaseModal = require('../base-modal');
var coreComponentsScrollbar = require('../scrollbar');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

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
function __rest(s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var styles = {"component":"drawer__component_1ezay","rightPlacement":"drawer__rightPlacement_1ezay","leftPlacement":"drawer__leftPlacement_1ezay","content":"drawer__content_1ezay","simplebar":"drawer__simplebar_1ezay","enterRight":"drawer__enterRight_1ezay","enterLeft":"drawer__enterLeft_1ezay","contentEnter":"drawer__contentEnter_1ezay","backdropEnter":"drawer__backdropEnter_1ezay","enterActive":"drawer__enterActive_1ezay","backdropEnterActive":"drawer__backdropEnterActive_1ezay","backdropEnterDone":"drawer__backdropEnterDone_1ezay","contentEnterActive":"drawer__contentEnterActive_1ezay","exit":"drawer__exit_1ezay","backdropExit":"drawer__backdropExit_1ezay","contentExit":"drawer__contentExit_1ezay","exitActiveRight":"drawer__exitActiveRight_1ezay","exitActiveLeft":"drawer__exitActiveLeft_1ezay","backdropExitActive":"drawer__backdropExitActive_1ezay","backdropExitDone":"drawer__backdropExitDone_1ezay","contentExitActive":"drawer__contentExitActive_1ezay"};
require('./index.css');

var ANIMATION_DURATION = 600;
var DrawerContext = coreComponentsBaseModal.BaseModalContext;
var backdropProps = {
    classNames: {
        enter: styles.backdropEnter,
        appear: styles.backdropEnter,
        enterActive: styles.backdropEnterActive,
        appearActive: styles.backdropEnterActive,
        enterDone: styles.backdropEnterDone,
        appearDone: styles.backdropEnterDone,
        exit: styles.backdropExit,
        exitActive: styles.backdropExitActive,
        exitDone: styles.backdropExitDone,
    },
    timeout: ANIMATION_DURATION,
};
var contentProps = {
    classNames: {
        enter: styles.contentEnter,
        appear: styles.contentEnter,
        enterActive: styles.contentEnterActive,
        appearActive: styles.contentEnterActive,
        exit: styles.contentExit,
        exitActive: styles.contentExitActive,
    },
    timeout: ANIMATION_DURATION,
};
var Drawer = React.forwardRef(function (_a, ref) {
    var _b;
    var open = _a.open, className = _a.className, children = _a.children, contentTransitionProps = _a.contentTransitionProps, _c = _a.nativeScrollbar, nativeScrollbar = _c === void 0 ? true : _c, _d = _a.placement, placement = _d === void 0 ? 'right' : _d, scrollbarProps = _a.scrollbarProps, restProps = __rest(_a, ["open", "className", "children", "contentTransitionProps", "nativeScrollbar", "placement", "scrollbarProps"]);
    var isRightPlacement = placement === 'right';
    var isLeftPlacement = placement === 'left';
    var transitionProps = React.useMemo(function () {
        var _a, _b;
        var enterClassName = cn__default.default((_a = {},
            _a[styles.enterRight] = isRightPlacement,
            _a[styles.enterLeft] = isLeftPlacement,
            _a));
        var exitClassName = cn__default.default((_b = {},
            _b[styles.exitActiveRight] = isRightPlacement,
            _b[styles.exitActiveLeft] = isLeftPlacement,
            _b));
        return __assign({ classNames: {
                enter: enterClassName,
                appear: enterClassName,
                enterActive: styles.enterActive,
                appearActive: styles.enterActive,
                exit: styles.exit,
                exitActive: exitClassName,
            }, timeout: ANIMATION_DURATION }, restProps.transitionProps);
    }, [restProps.transitionProps, isLeftPlacement, isRightPlacement]);
    var renderWithNativeScrollbar = function () { return React__default.default.createElement("div", { className: styles.content }, children); };
    var renderWithCustomScrollbar = function () { return (React__default.default.createElement(coreComponentsScrollbar.Scrollbar, __assign({}, scrollbarProps, { className: cn__default.default(styles.simplebar, scrollbarProps === null || scrollbarProps === void 0 ? void 0 : scrollbarProps.className) }), children)); };
    return (React__default.default.createElement(coreComponentsBaseModal.BaseModal, __assign({}, restProps, { scrollHandler: 'content', ref: ref, open: open, className: cn__default.default(styles.component, className, (_b = {},
            _b[styles.rightPlacement] = isRightPlacement,
            _b[styles.leftPlacement] = isLeftPlacement,
            _b)), transitionProps: transitionProps, backdropProps: __assign(__assign({}, backdropProps), restProps.backdropProps) }),
        React__default.default.createElement(reactTransitionGroup.CSSTransition, __assign({}, __assign(__assign({}, contentProps), contentTransitionProps), { appear: true, in: open }), nativeScrollbar ? renderWithNativeScrollbar() : renderWithCustomScrollbar())));
});

exports.ANIMATION_DURATION = ANIMATION_DURATION;
exports.Drawer = Drawer;
exports.DrawerContext = DrawerContext;
