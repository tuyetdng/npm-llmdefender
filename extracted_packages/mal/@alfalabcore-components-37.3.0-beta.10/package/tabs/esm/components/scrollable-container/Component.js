import React, { useEffect } from 'react';
import cn from 'classnames';
import computeScrollIntoView from 'compute-scroll-into-view';

var styles = {"container":"tabs__container_1lf44","fullWidthScroll":"tabs__fullWidthScroll_1lf44"};
require('./index.css');

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
var ADDITIONAL_SCROLLLEFT_VALUE = 40;
var ScrollableContainer = function (_a) {
    var _b;
    var containerClassName = _a.containerClassName, children = _a.children, activeChild = _a.activeChild, fullWidthScroll = _a.fullWidthScroll;
    useEffect(function () {
        if (activeChild) {
            var actions = computeScrollIntoView(activeChild, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
            });
            // TODO: animate?
            actions.forEach(function (_a, index) {
                var el = _a.el, left = _a.left;
                if (index === 0)
                    return;
                // eslint-disable-next-line no-param-reassign
                el.scrollLeft =
                    el.scrollLeft > left
                        ? left - ADDITIONAL_SCROLLLEFT_VALUE
                        : left + ADDITIONAL_SCROLLLEFT_VALUE;
            });
        }
    }, [activeChild]);
    return (React.createElement("div", { className: cn(styles.container, containerClassName, (_b = {},
            _b[styles.fullWidthScroll] = fullWidthScroll,
            _b)) }, children));
};

export { ScrollableContainer };
