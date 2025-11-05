import React, { useEffect } from 'react';
import cn from 'classnames';
import computeScrollIntoView from 'compute-scroll-into-view';

const styles = {"container":"tabs__container_1lf44","fullWidthScroll":"tabs__fullWidthScroll_1lf44"};
require('./index.css');

/**
 * Дополнительная прокрутка при клике на не поместившийся таб
 */
const ADDITIONAL_SCROLLLEFT_VALUE = 40;
const ScrollableContainer = ({ containerClassName, children, activeChild, fullWidthScroll, }) => {
    useEffect(() => {
        if (activeChild) {
            const actions = computeScrollIntoView(activeChild, {
                scrollMode: 'if-needed',
                block: 'nearest',
                inline: 'nearest',
            });
            // TODO: animate?
            actions.forEach(({ el, left }, index) => {
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
    return (React.createElement("div", { className: cn(styles.container, containerClassName, {
            [styles.fullWidthScroll]: fullWidthScroll,
        }) }, children));
};

export { ScrollableContainer };
