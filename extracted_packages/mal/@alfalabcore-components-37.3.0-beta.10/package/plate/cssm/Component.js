var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsIconButton = require('../../icon-button/cssm');
var hooks = require('@alfalab/hooks');
var ChevronDownMIcon = require('@alfalab/icons-glyph/ChevronDownMIcon');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');
var components_buttonList_component = require('./components/button-list/component.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

/* eslint-disable complexity */
var Plate = React.forwardRef(function (_a, ref) {
    var _b, _c, _d, _e;
    var hasCloser = _a.hasCloser, _f = _a.foldable, foldableProp = _f === void 0 ? false : _f, foldedProp = _a.folded, _g = _a.defaultFolded, defaultFolded = _g === void 0 ? true : _g, _h = _a.rounded, rounded = _h === void 0 ? true : _h, _j = _a.limitContentWidth, limitContentWidth = _j === void 0 ? true : _j, leftAddons = _a.leftAddons, subAddons = _a.subAddons, children = _a.children, buttons = _a.buttons, title = _a.title, _k = _a.titleView, titleView = _k === void 0 ? 'bold' : _k, _l = _a.view, view = _l === void 0 ? 'common' : _l, _m = _a.border, border = _m === void 0 ? view !== 'custom' : _m, _o = _a.shadow, shadow = _o === void 0 ? view === 'custom' : _o, className = _a.className, buttonsClassName = _a.buttonsClassName, contentClassName = _a.contentClassName, subAddonsClassName = _a.subAddonsClassName, dataTestId = _a.dataTestId, onClick = _a.onClick, onClose = _a.onClose, onToggle = _a.onToggle, rowLimit = _a.rowLimit;
    var plateRef = React.useRef(null);
    var contentRef = React.useRef(null);
    var subAddonsRef = React.useRef(null);
    var focused = hooks.useFocus(plateRef, 'keyboard')[0];
    var _p = React.useState(false), isHidden = _p[0], setIsHidden = _p[1];
    var _q = React.useState(defaultFolded), foldedState = _q[0], setFoldedState = _q[1];
    var uncontrolled = foldedProp === undefined;
    var foldable = !!title && !!children && foldableProp;
    var folded = uncontrolled ? foldedState : foldedProp;
    var hasButtons = !!buttons && typeof buttons !== 'boolean';
    var hasContent = children || hasButtons;
    var hasSubAddons = !!subAddons && typeof subAddons !== 'boolean';
    var hasAnyAddons = leftAddons || subAddons || foldable || hasCloser;
    var rowLimitStyles = rowLimit && styles__default.default["rowLimit".concat(rowLimit)];
    var handleClick = React.useCallback(function (event) {
        var target = event.target;
        var eventInsideComponent = plateRef.current && plateRef.current.contains(target);
        var eventInsideContent = contentRef.current && contentRef.current.contains(target);
        var eventInsideSubAddons = subAddonsRef.current && subAddonsRef.current.contains(target);
        var clickSimilarKeys = ['Enter', ' '].includes(event.key);
        var shouldChangeIsFolded = eventInsideComponent &&
            !eventInsideContent &&
            !eventInsideSubAddons &&
            (event.type === 'click' || clickSimilarKeys);
        if (foldable && shouldChangeIsFolded) {
            if (uncontrolled) {
                setFoldedState(!foldedState);
            }
            if (onToggle) {
                onToggle(event, { folded: !(uncontrolled ? foldedState : foldedProp) });
            }
        }
        if (onClick) {
            onClick(event);
        }
    }, [foldable, onClick, uncontrolled, onToggle, foldedState, foldedProp]);
    var handleClose = React.useCallback(function (event) {
        setIsHidden(true);
        if (onClose) {
            onClose(event);
        }
    }, [onClose]);
    return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, styles__default.default[view], (_b = {},
            _b[styles__default.default.foldable] = foldable,
            _b[styles__default.default.focused] = focused,
            _b[styles__default.default.isHidden] = hasCloser && isHidden,
            _b[styles__default.default.isFolded] = foldable && folded,
            _b[styles__default.default.rounded] = rounded,
            _b[styles__default.default.rect] = !rounded,
            _b[styles__default.default.noBorder] = !border,
            _b[styles__default.default.shadow] = shadow,
            _b), className), onClick: handleClick, onKeyDown: handleClick, role: 'alert', ref: mergeRefs__default.default([plateRef, ref]), 
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex: foldable ? 0 : -1, "data-test-id": dataTestId },
        React__default.default.createElement("div", { className: styles__default.default.inner },
            leftAddons && React__default.default.createElement("div", { className: styles__default.default.leftAddons }, leftAddons),
            React__default.default.createElement("div", { className: cn__default.default(styles__default.default.contentContainer, contentClassName, (_c = {},
                    _c[styles__default.default.withoutTitle] = !title && hasAnyAddons,
                    _c[styles__default.default.limitWidth] = limitContentWidth,
                    _c)) },
                title && React__default.default.createElement("div", { className: styles__default.default[titleView] }, title),
                hasContent && (React__default.default.createElement("div", { ref: contentRef, className: cn__default.default(styles__default.default.content, (_d = {},
                        _d[styles__default.default.isFolded] = foldable && folded,
                        _d)) },
                    children && (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.description, rowLimitStyles) }, children)),
                    hasButtons && (React__default.default.createElement("div", { className: styles__default.default.footer },
                        React__default.default.createElement(components_buttonList_component.ButtonList, { buttons: buttons, containerClassName: buttonsClassName, buttonClassName: cn__default.default(styles__default.default.button, buttonsClassName) })))))),
            hasSubAddons && (React__default.default.createElement("div", { ref: subAddonsRef, className: styles__default.default.subAddons },
                React__default.default.createElement(components_buttonList_component.ButtonList, { buttons: subAddons, containerClassName: subAddonsClassName, buttonClassName: styles__default.default.button }))),
            foldable && (React__default.default.createElement("div", { className: styles__default.default.rightAddons },
                React__default.default.createElement("div", { className: cn__default.default(styles__default.default.folder, (_e = {},
                        _e[styles__default.default.isFolded] = folded,
                        _e)) },
                    React__default.default.createElement(ChevronDownMIcon.ChevronDownMIcon, null)))),
            hasCloser && !foldable && (React__default.default.createElement("div", { className: styles__default.default.rightAddons },
                React__default.default.createElement(coreComponentsIconButton.IconButton, { className: styles__default.default.closer, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', icon: CrossMIcon.CrossMIcon, size: 'xxs', onClick: handleClose }))))));
});
/* eslint-enable complexity */
/**
 * Для отображения в сторибуке
 */
Plate.defaultProps = {
    foldable: false,
    defaultFolded: true,
    view: 'common',
};

exports.Plate = Plate;
