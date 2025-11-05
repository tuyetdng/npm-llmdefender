var React = require('react');
var resizeObserver = require('@juggle/resize-observer');
var cn = require('classnames');
var debounce = require('lodash.debounce');
var coreComponentsLink = require('../link');
var ArrowDownMBlackIcon = require('@alfalab/icons-classic/ArrowDownMBlackIcon');
var ArrowUpMBlackIcon = require('@alfalab/icons-classic/ArrowUpMBlackIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var debounce__default = /*#__PURE__*/_interopDefaultCompat(debounce);

var styles = {"collapse":"collapse__collapse_1ohnz","content":"collapse__content_1ohnz","expandedContent":"collapse__expandedContent_1ohnz","expandedLabel":"collapse__expandedLabel_1ohnz"};
require('./index.css');

var Collapse = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var expanded = _a.expanded, collapsedLabel = _a.collapsedLabel, expandedLabel = _a.expandedLabel, children = _a.children, className = _a.className, expandedContentClassName = _a.expandedContentClassName, id = _a.id, onTransitionEnd = _a.onTransitionEnd, onExpandedChange = _a.onExpandedChange, _d = _a.defaultExpanded, defaultExpanded = _d === void 0 ? false : _d, dataTestId = _a.dataTestId;
    var uncontrolled = expanded === undefined;
    var contentRef = React.useRef(null);
    var contentCaseRef = React.useRef(null);
    var _e = React.useState(uncontrolled ? defaultExpanded : expanded), expandedState = _e[0], setExpandedState = _e[1];
    var isExpanded = uncontrolled ? expandedState : expanded;
    var recalculate = React.useCallback(function () {
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
    var handleTransitionEnd = React.useCallback(function () {
        if (onTransitionEnd)
            onTransitionEnd(isExpanded);
    }, [isExpanded, onTransitionEnd]);
    var handleExpandedChange = React.useCallback(function () {
        if (uncontrolled) {
            setExpandedState(!isExpanded);
        }
        if (onExpandedChange)
            onExpandedChange(!isExpanded);
    }, [isExpanded, onExpandedChange, uncontrolled]);
    React.useEffect(function () {
        var handleResize = debounce__default.default(function () { return recalculate(); }, 300);
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, [recalculate]);
    React.useEffect(function () {
        var ResizeObserver = window.ResizeObserver || resizeObserver.ResizeObserver;
        var observer = new ResizeObserver(recalculate);
        if (contentCaseRef.current) {
            observer.observe(contentCaseRef.current);
        }
        return function () {
            observer.disconnect();
        };
    }, [recalculate]);
    React.useEffect(function () { return recalculate(); }, [isExpanded, recalculate]);
    var ToggledIcon = isExpanded ? ArrowUpMBlackIcon.ArrowUpMBlackIcon : ArrowDownMBlackIcon.ArrowDownMBlackIcon;
    return (React__default.default.createElement("div", { ref: ref, className: cn__default.default(className, styles.collapse), id: id, "data-test-id": dataTestId },
        React__default.default.createElement("div", { ref: contentRef, className: cn__default.default(styles.content, expandedContentClassName, (_b = {},
                _b[styles.expandedContent] = isExpanded,
                _b)), onTransitionEnd: handleTransitionEnd },
            React__default.default.createElement("div", { ref: contentCaseRef }, children)),
        (expandedLabel || collapsedLabel) && (React__default.default.createElement(coreComponentsLink.Link, { className: cn__default.default((_c = {}, _c[styles.expandedLabel] = isExpanded, _c)), pseudo: true, onClick: handleExpandedChange, rightAddons: React__default.default.createElement(ToggledIcon, null) }, isExpanded ? expandedLabel : collapsedLabel))));
});

exports.Collapse = Collapse;
