import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import cn from 'classnames';
import debounce from 'lodash.debounce';
import { Link } from '../../link/esm';
import { ArrowDownMBlackIcon } from '@alfalab/icons-classic/ArrowDownMBlackIcon';
import { ArrowUpMBlackIcon } from '@alfalab/icons-classic/ArrowUpMBlackIcon';

var styles = {"collapse":"collapse__collapse_1ohnz","content":"collapse__content_1ohnz","expandedContent":"collapse__expandedContent_1ohnz","expandedLabel":"collapse__expandedLabel_1ohnz"};
require('./index.css');

var Collapse = forwardRef(function (_a, ref) {
    var _b, _c;
    var expanded = _a.expanded, collapsedLabel = _a.collapsedLabel, expandedLabel = _a.expandedLabel, children = _a.children, className = _a.className, expandedContentClassName = _a.expandedContentClassName, id = _a.id, onTransitionEnd = _a.onTransitionEnd, onExpandedChange = _a.onExpandedChange, _d = _a.defaultExpanded, defaultExpanded = _d === void 0 ? false : _d, dataTestId = _a.dataTestId;
    var uncontrolled = expanded === undefined;
    var contentRef = useRef(null);
    var contentCaseRef = useRef(null);
    var _e = useState(uncontrolled ? defaultExpanded : expanded), expandedState = _e[0], setExpandedState = _e[1];
    var isExpanded = uncontrolled ? expandedState : expanded;
    var recalculate = useCallback(function () {
        var contentHeight;
        if (!contentCaseRef.current || !contentRef.current) {
            return;
        }
        if (isExpanded) {
            contentHeight = contentCaseRef.current.offsetHeight;
        }
        else {
            contentHeight = 0;
        }
        contentRef.current.style.height = "".concat(contentHeight, "px");
    }, [isExpanded]);
    var handleTransitionEnd = useCallback(function () {
        if (onTransitionEnd)
            onTransitionEnd(isExpanded);
    }, [isExpanded, onTransitionEnd]);
    var handleExpandedChange = useCallback(function () {
        if (uncontrolled) {
            setExpandedState(!isExpanded);
        }
        if (onExpandedChange)
            onExpandedChange(!isExpanded);
    }, [isExpanded, onExpandedChange, uncontrolled]);
    useEffect(function () {
        var handleResize = debounce(function () { return recalculate(); }, 300);
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, [recalculate]);
    useEffect(function () {
        var ResizeObserver$1 = window.ResizeObserver || ResizeObserver;
        var observer = new ResizeObserver$1(recalculate);
        if (contentCaseRef.current) {
            observer.observe(contentCaseRef.current);
        }
        return function () {
            observer.disconnect();
        };
    }, [recalculate]);
    useEffect(function () { return recalculate(); }, [isExpanded, recalculate]);
    var ToggledIcon = isExpanded ? ArrowUpMBlackIcon : ArrowDownMBlackIcon;
    return (React.createElement("div", { ref: ref, className: cn(className, styles.collapse), id: id, "data-test-id": dataTestId },
        React.createElement("div", { ref: contentRef, className: cn(styles.content, expandedContentClassName, (_b = {},
                _b[styles.expandedContent] = isExpanded,
                _b)), onTransitionEnd: handleTransitionEnd },
            React.createElement("div", { ref: contentCaseRef }, children)),
        (expandedLabel || collapsedLabel) && (React.createElement(Link, { className: cn((_c = {}, _c[styles.expandedLabel] = isExpanded, _c)), pseudo: true, onClick: handleExpandedChange, rightAddons: React.createElement(ToggledIcon, null) }, isExpanded ? expandedLabel : collapsedLabel))));
});

export { Collapse };
