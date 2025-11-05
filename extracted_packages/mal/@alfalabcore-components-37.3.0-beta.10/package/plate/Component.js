var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsIconButton = require('../icon-button');
var hooks = require('@alfalab/hooks');
var ChevronDownMIcon = require('@alfalab/icons-glyph/ChevronDownMIcon');
var CrossMIcon = require('@alfalab/icons-glyph/CrossMIcon');
var components_buttonList_component = require('./components/button-list/component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"plate__component_23ygs","foldable":"plate__foldable_23ygs","focused":"plate__focused_23ygs","inner":"plate__inner_23ygs","rounded":"plate__rounded_23ygs","noBorder":"plate__noBorder_23ygs","shadow":"plate__shadow_23ygs","common":"plate__common_23ygs","negative":"plate__negative_23ygs","positive":"plate__positive_23ygs","attention":"plate__attention_23ygs","custom":"plate__custom_23ygs","rect":"plate__rect_23ygs","isHidden":"plate__isHidden_23ygs","leftAddons":"plate__leftAddons_23ygs","rightAddons":"plate__rightAddons_23ygs","subAddons":"plate__subAddons_23ygs","bold":"plate__bold_23ygs","light":"plate__light_23ygs","content":"plate__content_23ygs","isFolded":"plate__isFolded_23ygs","contentContainer":"plate__contentContainer_23ygs","withoutTitle":"plate__withoutTitle_23ygs","limitWidth":"plate__limitWidth_23ygs","description":"plate__description_23ygs","footer":"plate__footer_23ygs","closer":"plate__closer_23ygs","folder":"plate__folder_23ygs","button":"plate__button_23ygs","rowLimit1":"plate__rowLimit1_23ygs","rowLimit2":"plate__rowLimit2_23ygs","rowLimit3":"plate__rowLimit3_23ygs"};
require('./index.css');

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
    var rowLimitStyles = rowLimit && styles["rowLimit".concat(rowLimit)];
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
    React__default.default.createElement("div", { className: cn__default.default(styles.component, styles[view], (_b = {},
            _b[styles.foldable] = foldable,
            _b[styles.focused] = focused,
            _b[styles.isHidden] = hasCloser && isHidden,
            _b[styles.isFolded] = foldable && folded,
            _b[styles.rounded] = rounded,
            _b[styles.rect] = !rounded,
            _b[styles.noBorder] = !border,
            _b[styles.shadow] = shadow,
            _b), className), onClick: handleClick, onKeyDown: handleClick, role: 'alert', ref: mergeRefs__default.default([plateRef, ref]), 
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
        tabIndex: foldable ? 0 : -1, "data-test-id": dataTestId },
        React__default.default.createElement("div", { className: styles.inner },
            leftAddons && React__default.default.createElement("div", { className: styles.leftAddons }, leftAddons),
            React__default.default.createElement("div", { className: cn__default.default(styles.contentContainer, contentClassName, (_c = {},
                    _c[styles.withoutTitle] = !title && hasAnyAddons,
                    _c[styles.limitWidth] = limitContentWidth,
                    _c)) },
                title && React__default.default.createElement("div", { className: styles[titleView] }, title),
                hasContent && (React__default.default.createElement("div", { ref: contentRef, className: cn__default.default(styles.content, (_d = {},
                        _d[styles.isFolded] = foldable && folded,
                        _d)) },
                    children && (React__default.default.createElement("div", { className: cn__default.default(styles.description, rowLimitStyles) }, children)),
                    hasButtons && (React__default.default.createElement("div", { className: styles.footer },
                        React__default.default.createElement(components_buttonList_component.ButtonList, { buttons: buttons, containerClassName: buttonsClassName, buttonClassName: cn__default.default(styles.button, buttonsClassName) })))))),
            hasSubAddons && (React__default.default.createElement("div", { ref: subAddonsRef, className: styles.subAddons },
                React__default.default.createElement(components_buttonList_component.ButtonList, { buttons: subAddons, containerClassName: subAddonsClassName, buttonClassName: styles.button }))),
            foldable && (React__default.default.createElement("div", { className: styles.rightAddons },
                React__default.default.createElement("div", { className: cn__default.default(styles.folder, (_e = {},
                        _e[styles.isFolded] = folded,
                        _e)) },
                    React__default.default.createElement(ChevronDownMIcon.ChevronDownMIcon, null)))),
            hasCloser && !foldable && (React__default.default.createElement("div", { className: styles.rightAddons },
                React__default.default.createElement(coreComponentsIconButton.IconButton, { className: styles.closer, "aria-label": '\u0437\u0430\u043A\u0440\u044B\u0442\u044C', icon: CrossMIcon.CrossMIcon, size: 'xxs', onClick: handleClose }))))));
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
