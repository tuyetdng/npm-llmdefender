import React, { useState, useRef, useCallback, useEffect, Fragment } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Popover } from '../../popover/modern';

const defaultColors = {"hint":"tooltip__hint_l2sts","arrow":"tooltip__arrow_l2sts"};
require('./default.css');

const styles = {"component":"tooltip__component_a14el","popper":"tooltip__popper_a14el","hint":"tooltip__hint_a14el","target":"tooltip__target_a14el","overlap":"tooltip__overlap_a14el"};
require('./index.css');

const invertedColors = {"tooltip":"tooltip__tooltip_1fs6l","arrow":"tooltip__arrow_1fs6l","hint":"tooltip__hint_1fs6l"};
require('./inverted.css');

const colorStyles = {
    default: defaultColors,
    inverted: invertedColors,
};
const TooltipDesktop = ({ children, content, trigger = 'hover', onCloseDelay = 300, onOpenDelay = 300, dataTestId, open: forcedOpen, offset = [0, 16], position, contentClassName, arrowClassName, popoverClassName, updatePopover, targetClassName, zIndex, onClose, onOpen, getPortalContainer, view = 'tooltip', targetRef = null, fallbackPlacements, preventOverflow = true, availableHeight = false, anchor = null, colors = 'default', useAnchorWidth, }) => {
    const [visible, setVisible] = useState(!!forcedOpen);
    const [target, setTarget] = useState(null);
    const contentRef = useRef(null);
    const timer = useRef(0);
    const show = forcedOpen === undefined ? visible : forcedOpen;
    const open = () => {
        if (!show) {
            setVisible(true);
            if (onOpen) {
                onOpen();
            }
        }
    };
    const close = useCallback(() => {
        if (show) {
            setVisible(false);
            if (onClose) {
                onClose();
            }
        }
    }, [onClose, show]);
    const toggle = () => {
        if (show) {
            close();
        }
        else {
            open();
        }
    };
    const clickedOutside = useCallback((node) => {
        if (target && target.contains(node)) {
            return false;
        }
        if (contentRef.current && contentRef.current.contains(node)) {
            return false;
        }
        return true;
    }, [target]);
    useEffect(() => {
        const handleBodyClick = (event) => {
            const eventTarget = event.target;
            if (clickedOutside(eventTarget)) {
                close();
            }
        };
        document.body.addEventListener('click', handleBodyClick);
        return () => {
            document.body.removeEventListener('click', handleBodyClick);
            clearTimeout(timer.current);
        };
    }, [clickedOutside, close]);
    const handleTargetClick = () => {
        toggle();
    };
    const handleMouseOver = () => {
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            open();
        }, onOpenDelay);
    };
    const handleMouseOut = () => {
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            close();
        }, onCloseDelay);
    };
    const handleTouchStart = (event) => {
        const eventTarget = event.target;
        clearTimeout(timer.current);
        if (clickedOutside(eventTarget)) {
            timer.current = window.setTimeout(() => {
                close();
            }, onCloseDelay);
        }
        else {
            open();
        }
    };
    const onClickProps = { onClick: handleTargetClick };
    const onHoverProps = {
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onTouchStart: handleTouchStart,
    };
    const getTargetProps = () => {
        const props = {
            className: cn(styles.target, targetClassName),
        };
        switch (trigger) {
            case 'click':
                return {
                    ...props,
                    ...onClickProps,
                };
            case 'hover':
                return {
                    ...props,
                    ...onHoverProps,
                };
            default:
                return {};
        }
    };
    const getContentProps = () => {
        const props = {
            ref: contentRef,
            'data-test-id': dataTestId,
            className: cn(styles.component, contentClassName),
        };
        switch (trigger) {
            case 'hover':
                return {
                    ...props,
                    ...onHoverProps,
                };
            default:
                return props;
        }
    };
    return (React.createElement(Fragment, null,
        React.createElement("div", { ref: mergeRefs([targetRef, setTarget]), ...getTargetProps() },
            children.props.disabled && React.createElement("div", { className: styles.overlap }),
            children),
        React.createElement(Popover, { anchorElement: anchor || target, open: show, getPortalContainer: getPortalContainer, arrowClassName: cn(arrowClassName, styles.arrow, colorStyles[colors].arrow), popperClassName: cn(styles.popper, styles[view], colorStyles[colors][view]), className: popoverClassName, offset: offset, withArrow: true, position: position, update: updatePopover, zIndex: zIndex, fallbackPlacements: fallbackPlacements, preventOverflow: preventOverflow, availableHeight: availableHeight, useAnchorWidth: useAnchorWidth },
            React.createElement("div", { ...getContentProps() }, content))));
};

export { TooltipDesktop };
