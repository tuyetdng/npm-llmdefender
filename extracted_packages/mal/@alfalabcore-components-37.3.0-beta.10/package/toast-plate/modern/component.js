import React, { forwardRef, useCallback } from 'react';
import cn from 'classnames';
import { Badge } from '../../badge/modern';
import { IconButton } from '../../icon-button/modern';
import { AlertCircleMIcon } from '@alfalab/icons-glyph/AlertCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CrossMIcon } from '@alfalab/icons-glyph/CrossMIcon';

const defaultColors = {"component":"toast-plate__component_bb3vb","closeButtonWrapper":"toast-plate__closeButtonWrapper_bb3vb"};
require('./default.css');

const styles = {"component":"toast-plate__component_ms9s6","hasCloser":"toast-plate__hasCloser_ms9s6","contentWrap":"toast-plate__contentWrap_ms9s6","block":"toast-plate__block_ms9s6","content":"toast-plate__content_ms9s6","hasActionButton":"toast-plate__hasActionButton_ms9s6","actionSection":"toast-plate__actionSection_ms9s6","leftAddons":"toast-plate__leftAddons_ms9s6","title":"toast-plate__title_ms9s6","children":"toast-plate__children_ms9s6","closeButtonWrapper":"toast-plate__closeButtonWrapper_ms9s6","closeButton":"toast-plate__closeButton_ms9s6"};
require('./index.css');

const invertedColors = {"component":"toast-plate__component_swozi","closeButtonWrapper":"toast-plate__closeButtonWrapper_swozi"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const iconDefaultComponents = {
    negative: React.createElement(CrossCircleMIcon, { className: styles.badgeIcon }),
    positive: React.createElement(CheckmarkCircleMIcon, { className: styles.badgeIcon }),
    attention: React.createElement(AlertCircleMIcon, { className: styles.badgeIcon }),
};
const ToastPlate = forwardRef(({ dataTestId, className, titleClassName, contentClassName, actionSectionClassName, hasCloser, leftAddons, badge, title, children, actionButton, block, onClose, getBadgeIcons, colors = 'default', ...restProps }, ref) => {
    const needRenderLeftAddons = Boolean(leftAddons || badge);
    const iconComponents = getBadgeIcons
        ? getBadgeIcons(iconDefaultComponents)
        : iconDefaultComponents;
    const handleClose = useCallback((event) => {
        if (onClose) {
            onClose(event);
        }
    }, [onClose]);
    return (React.createElement("div", { className: cn(styles.component, colorStyles[colors].component, { [styles.block]: block, [styles.hasCloser]: hasCloser }, className), ref: ref, "data-test-id": dataTestId, ...restProps },
        React.createElement("div", { className: styles.contentWrap },
            React.createElement("div", { className: cn(contentClassName, styles.content, {
                    [styles.hasCloser]: hasCloser,
                    [styles.hasActionButton]: !!actionButton,
                }) },
                needRenderLeftAddons && (React.createElement("div", { className: styles.leftAddons }, leftAddons || (React.createElement(Badge, { view: 'icon', content: badge && iconComponents[badge], iconColor: badge, className: styles.badge, dataTestId: 'badge' })))),
                React.createElement("div", null,
                    title && (React.createElement("div", { className: cn(titleClassName, styles.title) }, title)),
                    children && React.createElement("div", { className: styles.children }, children))),
            actionButton && (React.createElement("div", { className: cn(actionSectionClassName, styles.actionSection, {
                    [styles.hasCloser]: hasCloser,
                }) }, actionButton)),
            hasCloser && (React.createElement("div", { className: cn(styles.closeButtonWrapper, colorStyles[colors].closeButtonWrapper) },
                React.createElement(IconButton, { icon: CrossMIcon, colors: colors === 'default' ? 'inverted' : 'default', className: cn(styles.closeButton), onClick: handleClose, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C' }))))));
});

export { ToastPlate };
