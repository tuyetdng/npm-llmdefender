import { _ as __rest, a as __assign, N as Notification } from './component-5a5d6474.js';
import React, { forwardRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { Portal } from '../../portal/esm';
import { stackingOrder, Stack } from '../../stack/esm';

var styles = {"component":"notification-manager__component_1biwf","notification":"notification-manager__notification_1biwf","enter":"notification-manager__enter_1biwf","enterActive":"notification-manager__enterActive_1biwf","exit":"notification-manager__exit_1biwf","exitActive":"notification-manager__exitActive_1biwf"};
require('./index.css');

var CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};
var NotificationManager = forwardRef(function (_a, ref) {
    var notifications = _a.notifications, className = _a.className, dataTestId = _a.dataTestId, _b = _a.zIndex, zIndex = _b === void 0 ? stackingOrder.TOAST : _b, _c = _a.style, style = _c === void 0 ? {} : _c, onRemoveNotification = _a.onRemoveNotification, restProps = __rest(_a, ["notifications", "className", "dataTestId", "zIndex", "style", "onRemoveNotification"]);
    return (React.createElement(Stack, { value: zIndex }, function (computedZIndex) { return (React.createElement(Portal, null,
        React.createElement("div", __assign({ className: cn(styles.component, className), ref: ref, "data-test-id": dataTestId, style: __assign({ zIndex: computedZIndex }, style) }, restProps),
            React.createElement(TransitionGroup, null, notifications.map(function (element) { return (React.createElement(CSSTransition, { key: element.props.id, timeout: 400, classNames: CSS_TRANSITION_CLASS_NAMES, unmountOnExit: true },
                React.createElement(Notification, { element: element, className: styles.notification, onRemoveNotification: onRemoveNotification }))); }))))); }));
});

export { NotificationManager };
