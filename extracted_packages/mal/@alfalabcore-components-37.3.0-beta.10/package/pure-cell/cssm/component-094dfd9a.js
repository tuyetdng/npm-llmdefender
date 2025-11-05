var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsComment = require('../../comment/cssm');
var hooks = require('@alfalab/hooks');
var components_addon_component = require('./components/addon/component.js');
var components_amount_component = require('./components/amount/component.js');
var components_amountTitle_component = require('./components/amount-title/component.js');
var components_category_component = require('./components/category/component.js');
var getDataTestId = require('./getDataTestId-5c876d98.js');
var components_footer_component = require('./components/footer/component.js');
var components_footerButton_component = require('./components/footer-button/component.js');
var components_footerText_component = require('./components/footer-text/component.js');
var components_graphics_component = require('./components/graphics/component.js');
var styles$1 = require('./components/main/index.module.css');
var coreComponentsTypography = require('../../typography/cssm');
var styles$2 = require('./components/text/index.module.css');
var styles$3 = require('./index.module.css');
var styles = require('./components/content/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default$1 = /*#__PURE__*/_interopDefaultCompat(styles$1);
var styles__default$2 = /*#__PURE__*/_interopDefaultCompat(styles$2);
var styles__default$3 = /*#__PURE__*/_interopDefaultCompat(styles$3);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Content = function (_a) {
    var _b;
    var children = _a.children, dataTestId = _a.dataTestId;
    var direction = React.useContext(PureCellContext).direction;
    return (React__default.default.createElement("section", { className: cn__default.default(styles__default.default.component, (_b = {}, _b[styles__default.default.horizontal] = direction === 'horizontal', _b)), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'content') }, children));
};

var Main = function (_a) {
    var _b;
    var children = _a.children, isReverse = _a.isReverse, dataTestId = _a.dataTestId;
    var _c = React.useContext(PureCellContext).direction, direction = _c === void 0 ? 'horizontal' : _c;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default$1.default.component, styles__default$1.default[direction], (_b = {},
            _b[styles__default$1.default.reverse] = isReverse,
            _b)), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'main') }, children));
};

var Text = function (_a) {
    var _b;
    var children = _a.children, value = _a.value, rowLimit = _a.rowLimit, _c = _a.view, view = _c === void 0 ? 'component' : _c, titleColor = _a.titleColor, valueColor = _a.valueColor, dataTestId = _a.dataTestId;
    var _d = React.useContext(PureCellContext).direction, direction = _d === void 0 ? 'horizontal' : _d;
    var className = rowLimit && styles__default$2.default["rowLimit".concat(rowLimit)];
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default$2.default.component, (_b = {},
            _b[styles__default$2.default.vertical] = direction !== 'horizontal',
            _b)) },
        React__default.default.createElement("span", { className: styles__default$2.default.title }, typeof children === 'string' ? (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: view, color: titleColor, className: className, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'text') }, children)) : (children)),
        value !== undefined && (React__default.default.createElement("span", { className: styles__default$2.default.value }, typeof value === 'string' ? (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: view, color: valueColor, className: className, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'text') }, value)) : (value)))));
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
var PureCellContext = React__default.default.createContext({});
var PureCellComponent = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var className = _a.className, dataTestId = _a.dataTestId, onClick = _a.onClick, href = _a.href, _d = _a.tag, Component = _d === void 0 ? (href && 'a') || (onClick && 'button') || 'section' : _d, children = _a.children, _e = _a.horizontalPadding, horizontalPadding = _e === void 0 ? 'none' : _e, _f = _a.verticalPadding, verticalPadding = _f === void 0 ? 'none' : _f, _g = _a.direction, direction = _g === void 0 ? 'horizontal' : _g, restProps = tslib_es6.__rest(_a, ["className", "dataTestId", "onClick", "href", "tag", "children", "horizontalPadding", "verticalPadding", "direction"]);
    var cellRef = React.useRef(null);
    var focused = hooks.useFocus(cellRef, 'keyboard')[0];
    var addClasses = (_b = {},
        _b[styles__default$3.default.component] = true,
        _b[styles__default$3.default.focused] = focused,
        _b[styles__default$3.default[direction]] = true,
        _b[styles__default$3.default.defaultPadding] = verticalPadding === 'default',
        _b[styles__default$3.default[verticalPadding]] = verticalPadding !== 'default',
        _b[styles__default$3.default[horizontalPadding]] = true,
        _b);
    if (href) {
        var target = restProps.target;
        // Для совместимости с react-router-dom, меняем href на to
        var hrefProps = (_c = {}, _c[typeof Component === 'string' ? 'href' : 'to'] = href, _c);
        return (React__default.default.createElement(Component, tslib_es6.__assign({ rel: target === '_blank' ? 'noreferrer noopener' : undefined }, restProps, hrefProps, { ref: mergeRefs__default.default([cellRef, ref]), className: cn__default.default(styles__default$3.default.link, addClasses, className), "data-test-id": dataTestId, onClick: onClick }),
            React__default.default.createElement(PureCellContext.Provider, { value: { direction: direction } }, children)));
    }
    if (onClick) {
        return (React__default.default.createElement(Component, tslib_es6.__assign({}, restProps, { ref: mergeRefs__default.default([cellRef, ref]), className: cn__default.default(styles__default$3.default.button, addClasses, className), "data-test-id": dataTestId, onClick: onClick }),
            React__default.default.createElement(PureCellContext.Provider, { value: { direction: direction } }, children)));
    }
    return (React__default.default.createElement(Component, { ref: ref, tabIndex: 0, className: cn__default.default(addClasses, className), "data-test-id": dataTestId },
        React__default.default.createElement(PureCellContext.Provider, { value: { direction: direction } }, children)));
});
/**
 * Универсальный конструктор для сборки любой ячейки.
 *
 * [Макет](https://www.figma.com/file/KlFOLLkKO8rtvvQE3RXuhq/Click-Library?node-id=43525%3A240018)
 */
var PureCell = Object.assign(PureCellComponent, {
    Main: Main,
    Graphics: components_graphics_component.Graphics,
    Content: Content,
    Text: Text,
    Amount: components_amount_component.Amount,
    AmountTitle: components_amountTitle_component.AmountTitle,
    Addon: components_addon_component.Addon,
    Footer: components_footer_component.Footer,
    ExtraSubtitle: components_footerText_component.FooterText,
    FooterButton: components_footerButton_component.FooterButton,
    Comment: coreComponentsComment.Comment,
    Category: components_category_component.Category,
});

exports.Content = Content;
exports.Main = Main;
exports.PureCell = PureCell;
exports.PureCellContext = PureCellContext;
exports.Text = Text;
