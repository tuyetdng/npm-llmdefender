import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { Link } from '../../link/modern';
import { ArrowDownMBlackIcon } from '@alfalab/icons-classic/ArrowDownMBlackIcon';
import { ArrowUpMBlackIcon } from '@alfalab/icons-classic/ArrowUpMBlackIcon';

const styles = {"collapse":"collapse__collapse_1ohnz","content":"collapse__content_1ohnz","expandedContent":"collapse__expandedContent_1ohnz","expandedLabel":"collapse__expandedLabel_1ohnz"};
require('./index.css');

const Collapse = forwardRef(({ expanded, collapsedLabel, expandedLabel, children, className, expandedContentClassName, id, onTransitionEnd, onExpandedChange, defaultExpanded = false, dataTestId, }, ref) => {
    const uncontrolled = expanded === undefined;
    const contentRef = useRef(null);
    const contentCaseRef = useRef(null);
    const [expandedState, setExpandedState] = useState(uncontrolled ? defaultExpanded : expanded);
    const isExpanded = uncontrolled ? expandedState : expanded;
    const recalculate = useCallback(() => {
        let contentHeight;
        if (!contentCaseRef.current || !contentRef.current) {
            return;
        }
        if (isExpanded) {
            contentHeight = contentCaseRef.current.offsetHeight;
        }
        else {
            contentHeight = 0;
        }
        contentRef.current.style.height = `${contentHeight}px`;
    }, [isExpanded]);
    const handleTransitionEnd = useCallback(() => {
        if (onTransitionEnd)
            onTransitionEnd(isExpanded);
    }, [isExpanded, onTransitionEnd]);
    const handleExpandedChange = useCallback(() => {
        if (uncontrolled) {
            setExpandedState(!isExpanded);
        }
        if (onExpandedChange)
            onExpandedChange(!isExpanded);
    }, [isExpanded, onExpandedChange, uncontrolled]);
    useEffect(() => {
        const handleResize = debounce(() => recalculate(), 300);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [recalculate]);
    useEffect(() => {
        const ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        const observer = new ResizeObserver$1(recalculate);
        if (contentCaseRef.current) {
            observer.observe(contentCaseRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [recalculate]);
    useEffect(() => recalculate(), [isExpanded, recalculate]);
    const ToggledIcon = isExpanded ? ArrowUpMBlackIcon : ArrowDownMBlackIcon;
    return (React.createElement("div", { ref: ref, className: cn(className, styles.collapse), id: id, "data-test-id": dataTestId },
        React.createElement("div", { ref: contentRef, className: cn(styles.content, expandedContentClassName, {
                [styles.expandedContent]: isExpanded,
            }), onTransitionEnd: handleTransitionEnd },
            React.createElement("div", { ref: contentCaseRef }, children)),
        (expandedLabel || collapsedLabel) && (React.createElement(Link, { className: cn({ [styles.expandedLabel]: isExpanded }), pseudo: true, onClick: handleExpandedChange, rightAddons: React.createElement(ToggledIcon, null) }, isExpanded ? expandedLabel : collapsedLabel))));
});

export { Collapse };
