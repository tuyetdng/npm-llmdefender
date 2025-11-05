import React, { forwardRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import cn from 'classnames';
import { Portal } from '../../portal/modern';
import { Stack, stackingOrder } from '../../stack/modern';
import { Notification } from './components/notification/component.js';

const styles = {"component":"notification-manager__component_1biwf","notification":"notification-manager__notification_1biwf","enter":"notification-manager__enter_1biwf","enterActive":"notification-manager__enterActive_1biwf","exit":"notification-manager__exit_1biwf","exitActive":"notification-manager__exitActive_1biwf"};
require('./index.css');

const CSS_TRANSITION_CLASS_NAMES = {
    enter: styles.enter,
    enterActive: styles.enterActive,
    exit: styles.exit,
    exitActive: styles.exitActive,
};
const NotificationManager = forwardRef(({ notifications, className, dataTestId, zIndex = stackingOrder.TOAST, style = {}, onRemoveNotification, ...restProps }, ref) => (React.createElement(Stack, { value: zIndex }, (computedZIndex) => (React.createElement(Portal, null,
    React.createElement("div", { className: cn(styles.component, className), ref: ref, "data-test-id": dataTestId, style: {
            zIndex: computedZIndex,
            ...style,
        }, ...restProps },
        React.createElement(TransitionGroup, null, notifications.map((element) => (React.createElement(CSSTransition, { key: element.props.id, timeout: 400, classNames: CSS_TRANSITION_CLASS_NAMES, unmountOnExit: true },
            React.createElement(Notification, { element: element, className: styles.notification, onRemoveNotification: onRemoveNotification })))))))))));

export { NotificationManager };
