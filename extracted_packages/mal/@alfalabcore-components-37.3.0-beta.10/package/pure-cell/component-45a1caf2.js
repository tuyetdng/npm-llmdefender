var tslib_es6 = require('./tslib.es6-36bf03a1.js');
var React = require('react');
var mergeRefs = require('react-merge-refs');
var cn = require('classnames');
var coreComponentsComment = require('../comment');
var hooks = require('@alfalab/hooks');
var components_addon_component = require('./components/addon/component.js');
var components_amount_component = require('./components/amount/component.js');
var components_amountTitle_component = require('./components/amount-title/component.js');
var components_category_component = require('./components/category/component.js');
var getDataTestId = require('./getDataTestId-3093bcb2.js');
var components_footer_component = require('./components/footer/component.js');
var components_footerButton_component = require('./components/footer-button/component.js');
var components_footerText_component = require('./components/footer-text/component.js');
var components_graphics_component = require('./components/graphics/component.js');
var coreComponentsTypography = require('../typography');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var mergeRefs__default = /*#__PURE__*/_interopDefaultCompat(mergeRefs);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles$3 = {"component":"pure-cell__component_11qkg","horizontal":"pure-cell__horizontal_11qkg"};
require('./components/content/index.css');

var Content = function (_a) {
    var _b;
    var children = _a.children, dataTestId = _a.dataTestId;
    var direction = React.useContext(PureCellContext).direction;
    return (React__default.default.createElement("section", { className: cn__default.default(styles$3.component, (_b = {}, _b[styles$3.horizontal] = direction === 'horizontal', _b)), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'content') }, children));
};

var styles$2 = {"component":"pure-cell__component_qk3dg","vertical":"pure-cell__vertical_qk3dg","reverse":"pure-cell__reverse_qk3dg"};
require('./components/main/index.css');

var Main = function (_a) {
    var _b;
    var children = _a.children, isReverse = _a.isReverse, dataTestId = _a.dataTestId;
    var _c = React.useContext(PureCellContext).direction, direction = _c === void 0 ? 'horizontal' : _c;
    return (React__default.default.createElement("div", { className: cn__default.default(styles$2.component, styles$2[direction], (_b = {},
            _b[styles$2.reverse] = isReverse,
            _b)), "data-test-id": getDataTestId.getDataTestId(dataTestId, 'main') }, children));
};

var styles$1 = {"horizontal":"pure-cell__horizontal_e7qoj","rowLimit1":"pure-cell__rowLimit1_e7qoj","rowLimit2":"pure-cell__rowLimit2_e7qoj","component":"pure-cell__component_e7qoj","vertical":"pure-cell__vertical_e7qoj","title":"pure-cell__title_e7qoj","value":"pure-cell__value_e7qoj"};
require('./components/text/index.css');

var Text = function (_a) {
    var _b;
    var children = _a.children, value = _a.value, rowLimit = _a.rowLimit, _c = _a.view, view = _c === void 0 ? 'component' : _c, titleColor = _a.titleColor, valueColor = _a.valueColor, dataTestId = _a.dataTestId;
    var _d = React.useContext(PureCellContext).direction, direction = _d === void 0 ? 'horizontal' : _d;
    var className = rowLimit && styles$1["rowLimit".concat(rowLimit)];
    return (React__default.default.createElement("div", { className: cn__default.default(styles$1.component, (_b = {},
            _b[styles$1.vertical] = direction !== 'horizontal',
            _b)) },
        React__default.default.createElement("span", { className: styles$1.title }, typeof children === 'string' ? (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: view, color: titleColor, className: className, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'text') }, children)) : (children)),
        value !== undefined && (React__default.default.createElement("span", { className: styles$1.value }, typeof value === 'string' ? (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: view, color: valueColor, className: className, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'text') }, value)) : (value)))));
};

var styles = {"component":"pure-cell__component_1ifaa","horizontal":"pure-cell__horizontal_1ifaa","vertical":"pure-cell__vertical_1ifaa","button":"pure-cell__button_1ifaa","link":"pure-cell__link_1ifaa","none":"pure-cell__none_1ifaa","airy":"pure-cell__airy_1ifaa","defaultPadding":"pure-cell__defaultPadding_1ifaa","compact":"pure-cell__compact_1ifaa","tiny":"pure-cell__tiny_1ifaa","left":"pure-cell__left_1ifaa","right":"pure-cell__right_1ifaa","both":"pure-cell__both_1ifaa","focused":"pure-cell__focused_1ifaa"};
require('./index.css');

// eslint-disable-next-line @typescript-eslint/no-redeclare
var PureCellContext = React__default.default.createContext({});
var PureCellComponent = React.forwardRef(function (_a, ref) {
    var _b, _c;
    var className = _a.className, dataTestId = _a.dataTestId, onClick = _a.onClick, href = _a.href, _d = _a.tag, Component = _d === void 0 ? (href && 'a') || (onClick && 'button') || 'section' : _d, children = _a.children, _e = _a.horizontalPadding, horizontalPadding = _e === void 0 ? 'none' : _e, _f = _a.verticalPadding, verticalPadding = _f === void 0 ? 'none' : _f, _g = _a.direction, direction = _g === void 0 ? 'horizontal' : _g, restProps = tslib_es6.__rest(_a, ["className", "dataTestId", "onClick", "href", "tag", "children", "horizontalPadding", "verticalPadding", "direction"]);
    var cellRef = React.useRef(null);
    var focused = hooks.useFocus(cellRef, 'keyboard')[0];
    var addClasses = (_b = {},
        _b[styles.component] = true,
        _b[styles.focused] = focused,
        _b[styles[direction]] = true,
        _b[styles.defaultPadding] = verticalPadding === 'default',
        _b[styles[verticalPadding]] = verticalPadding !== 'default',
        _b[styles[horizontalPadding]] = true,
        _b);
    if (href) {
        var target = restProps.target;
        // Для совместимости с react-router-dom, меняем href на to
        var hrefProps = (_c = {}, _c[typeof Component === 'string' ? 'href' : 'to'] = href, _c);
        return (React__default.default.createElement(Component, tslib_es6.__assign({ rel: target === '_blank' ? 'noreferrer noopener' : undefined }, restProps, hrefProps, { ref: mergeRefs__default.default([cellRef, ref]), className: cn__default.default(styles.link, addClasses, className), "data-test-id": dataTestId, onClick: onClick }),
            React__default.default.createElement(PureCellContext.Provider, { value: { direction: direction } }, children)));
    }
    if (onClick) {
        return (React__default.default.createElement(Component, tslib_es6.__assign({}, restProps, { ref: mergeRefs__default.default([cellRef, ref]), className: cn__default.default(styles.button, addClasses, className), "data-test-id": dataTestId, onClick: onClick }),
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
