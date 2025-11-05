var React = require('react');
var cn = require('classnames');
var coreComponentsBadge = require('../../badge/cssm');
var coreComponentsIconButton = require('../../icon-button/cssm');
var AlertCircleMIcon = require('@alfalab/icons-glyph/AlertCircleMIcon');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
var CrossCircleMIcon = require('@alfalab/icons-glyph/CrossCircleMIcon');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');
var defaultColors = require('./default.module.css');
var styles = require('./index.module.css');
var invertedColors = require('./inverted.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var defaultColors__default = /*#__PURE__*/_interopDefaultCompat(defaultColors);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);
var invertedColors__default = /*#__PURE__*/_interopDefaultCompat(invertedColors);

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

var colorStyles = {
    default: defaultColors__default.default,
    inverted: invertedColors__default.default,
};
var iconDefaultComponents = {
    negative: React__default.default.createElement(CrossCircleMIcon.CrossCircleMIcon, { className: styles__default.default.badgeIcon }),
    positive: React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, { className: styles__default.default.badgeIcon }),
    attention: React__default.default.createElement(AlertCircleMIcon.AlertCircleMIcon, { className: styles__default.default.badgeIcon }),
};
var ToastPlate = React.forwardRef(function (_a, ref) {
    var _b, _c, _d;
    var dataTestId = _a.dataTestId, className = _a.className, titleClassName = _a.titleClassName, contentClassName = _a.contentClassName, actionSectionClassName = _a.actionSectionClassName, hasCloser = _a.hasCloser, leftAddons = _a.leftAddons, badge = _a.badge, title = _a.title, children = _a.children, actionButton = _a.actionButton, block = _a.block, onClose = _a.onClose, getBadgeIcons = _a.getBadgeIcons, _e = _a.colors, colors = _e === void 0 ? 'default' : _e, restProps = __rest(_a, ["dataTestId", "className", "titleClassName", "contentClassName", "actionSectionClassName", "hasCloser", "leftAddons", "badge", "title", "children", "actionButton", "block", "onClose", "getBadgeIcons", "colors"]);
    var needRenderLeftAddons = Boolean(leftAddons || badge);
    var iconComponents = getBadgeIcons
        ? getBadgeIcons(iconDefaultComponents)
        : iconDefaultComponents;
    var handleClose = React.useCallback(function (event) {
        if (onClose) {
            onClose(event);
        }
    }, [onClose]);
    return (React__default.default.createElement("div", __assign({ className: cn__default.default(styles__default.default.component, colorStyles[colors].component, (_b = {}, _b[styles__default.default.block] = block, _b[styles__default.default.hasCloser] = hasCloser, _b), className), ref: ref, "data-test-id": dataTestId }, restProps),
        React__default.default.createElement("div", { className: styles__default.default.contentWrap },
            React__default.default.createElement("div", { className: cn__default.default(contentClassName, styles__default.default.content, (_c = {},
                    _c[styles__default.default.hasCloser] = hasCloser,
                    _c[styles__default.default.hasActionButton] = !!actionButton,
                    _c)) },
                needRenderLeftAddons && (React__default.default.createElement("div", { className: styles__default.default.leftAddons }, leftAddons || (React__default.default.createElement(coreComponentsBadge.Badge, { view: 'icon', content: badge && iconComponents[badge], iconColor: badge, className: styles__default.default.badge, dataTestId: 'badge' })))),
                React__default.default.createElement("div", null,
                    title && (React__default.default.createElement("div", { className: cn__default.default(titleClassName, styles__default.default.title) }, title)),
                    children && React__default.default.createElement("div", { className: styles__default.default.children }, children))),
            actionButton && (React__default.default.createElement("div", { className: cn__default.default(actionSectionClassName, styles__default.default.actionSection, (_d = {},
                    _d[styles__default.default.hasCloser] = hasCloser,
                    _d)) }, actionButton)),
            hasCloser && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.closeButtonWrapper, colorStyles[colors].closeButtonWrapper) },
                React__default.default.createElement(coreComponentsIconButton.IconButton, { icon: CrossMIcon.CrossMIcon, colors: colors === 'default' ? 'inverted' : 'default', className: cn__default.default(styles__default.default.closeButton), onClick: handleClose, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C' }))))));
});

exports.ToastPlate = ToastPlate;
