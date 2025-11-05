import { _ as __rest, a as __assign } from './tslib.es6-2c2ee2fa.js';
import React, { forwardRef, useRef, useContext } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Comment } from '../../comment/esm';
import { useFocus } from '@alfalab/hooks';
import { Addon } from './components/addon/component.js';
import { Amount } from './components/amount/component.js';
import { AmountTitle } from './components/amount-title/component.js';
import { Category } from './components/category/component.js';
import { g as getDataTestId } from './getDataTestId-9131c0fb.js';
import { Footer } from './components/footer/component.js';
import { FooterButton } from './components/footer-button/component.js';
import { FooterText } from './components/footer-text/component.js';
import { Graphics } from './components/graphics/component.js';
import { Typography } from '../../typography/esm';
import '../../amount/esm';
import '../../button/esm';

var styles$3 = {"component":"pure-cell__component_11qkg","horizontal":"pure-cell__horizontal_11qkg"};
require('./components/content/index.css');

var Content = function (_a) {
    var _b;
    var children = _a.children, dataTestId = _a.dataTestId;
    var direction = useContext(PureCellContext).direction;
    return (React.createElement("section", { className: cn(styles$3.component, (_b = {}, _b[styles$3.horizontal] = direction === 'horizontal', _b)), "data-test-id": getDataTestId(dataTestId, 'content') }, children));
};

var styles$2 = {"component":"pure-cell__component_qk3dg","vertical":"pure-cell__vertical_qk3dg","reverse":"pure-cell__reverse_qk3dg"};
require('./components/main/index.css');

var Main = function (_a) {
    var _b;
    var children = _a.children, isReverse = _a.isReverse, dataTestId = _a.dataTestId;
    var _c = useContext(PureCellContext).direction, direction = _c === void 0 ? 'horizontal' : _c;
    return (React.createElement("div", { className: cn(styles$2.component, styles$2[direction], (_b = {},
            _b[styles$2.reverse] = isReverse,
            _b)), "data-test-id": getDataTestId(dataTestId, 'main') }, children));
};

var styles$1 = {"horizontal":"pure-cell__horizontal_e7qoj","rowLimit1":"pure-cell__rowLimit1_e7qoj","rowLimit2":"pure-cell__rowLimit2_e7qoj","component":"pure-cell__component_e7qoj","vertical":"pure-cell__vertical_e7qoj","title":"pure-cell__title_e7qoj","value":"pure-cell__value_e7qoj"};
require('./components/text/index.css');

var Text = function (_a) {
    var _b;
    var children = _a.children, value = _a.value, rowLimit = _a.rowLimit, _c = _a.view, view = _c === void 0 ? 'component' : _c, titleColor = _a.titleColor, valueColor = _a.valueColor, dataTestId = _a.dataTestId;
    var _d = useContext(PureCellContext).direction, direction = _d === void 0 ? 'horizontal' : _d;
    var className = rowLimit && styles$1["rowLimit".concat(rowLimit)];
    return (React.createElement("div", { className: cn(styles$1.component, (_b = {},
            _b[styles$1.vertical] = direction !== 'horizontal',
            _b)) },
        React.createElement("span", { className: styles$1.title }, typeof children === 'string' ? (React.createElement(Typography.Text, { view: view, color: titleColor, className: className, "data-test-id": getDataTestId(dataTestId, 'text') }, children)) : (children)),
        value !== undefined && (React.createElement("span", { className: styles$1.value }, typeof value === 'string' ? (React.createElement(Typography.Text, { view: view, color: valueColor, className: className, "data-test-id": getDataTestId(dataTestId, 'text') }, value)) : (value)))));
};

var styles = {"component":"pure-cell__component_1ifaa","horizontal":"pure-cell__horizontal_1ifaa","vertical":"pure-cell__vertical_1ifaa","button":"pure-cell__button_1ifaa","link":"pure-cell__link_1ifaa","none":"pure-cell__none_1ifaa","airy":"pure-cell__airy_1ifaa","defaultPadding":"pure-cell__defaultPadding_1ifaa","compact":"pure-cell__compact_1ifaa","tiny":"pure-cell__tiny_1ifaa","left":"pure-cell__left_1ifaa","right":"pure-cell__right_1ifaa","both":"pure-cell__both_1ifaa","focused":"pure-cell__focused_1ifaa"};
require('./index.css');

// eslint-disable-next-line @typescript-eslint/no-redeclare
var PureCellContext = React.createContext({});
var PureCellComponent = forwardRef(function (_a, ref) {
    var _b, _c;
    var className = _a.className, dataTestId = _a.dataTestId, onClick = _a.onClick, href = _a.href, _d = _a.tag, Component = _d === void 0 ? (href && 'a') || (onClick && 'button') || 'section' : _d, children = _a.children, _e = _a.horizontalPadding, horizontalPadding = _e === void 0 ? 'none' : _e, _f = _a.verticalPadding, verticalPadding = _f === void 0 ? 'none' : _f, _g = _a.direction, direction = _g === void 0 ? 'horizontal' : _g, restProps = __rest(_a, ["className", "dataTestId", "onClick", "href", "tag", "children", "horizontalPadding", "verticalPadding", "direction"]);
    var cellRef = useRef(null);
    var focused = useFocus(cellRef, 'keyboard')[0];
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
        return (React.createElement(Component, __assign({ rel: target === '_blank' ? 'noreferrer noopener' : undefined }, restProps, hrefProps, { ref: mergeRefs([cellRef, ref]), className: cn(styles.link, addClasses, className), "data-test-id": dataTestId, onClick: onClick }),
            React.createElement(PureCellContext.Provider, { value: { direction: direction } }, children)));
    }
    if (onClick) {
        return (React.createElement(Component, __assign({}, restProps, { ref: mergeRefs([cellRef, ref]), className: cn(styles.button, addClasses, className), "data-test-id": dataTestId, onClick: onClick }),
            React.createElement(PureCellContext.Provider, { value: { direction: direction } }, children)));
    }
    return (React.createElement(Component, { ref: ref, tabIndex: 0, className: cn(addClasses, className), "data-test-id": dataTestId },
        React.createElement(PureCellContext.Provider, { value: { direction: direction } }, children)));
});
/**
 * Универсальный конструктор для сборки любой ячейки.
 *
 * [Макет](https://www.figma.com/file/KlFOLLkKO8rtvvQE3RXuhq/Click-Library?node-id=43525%3A240018)
 */
var PureCell = Object.assign(PureCellComponent, {
    Main: Main,
    Graphics: Graphics,
    Content: Content,
    Text: Text,
    Amount: Amount,
    AmountTitle: AmountTitle,
    Addon: Addon,
    Footer: Footer,
    ExtraSubtitle: FooterText,
    FooterButton: FooterButton,
    Comment: Comment,
    Category: Category,
});

export { Content as C, Main as M, PureCell as P, Text as T, PureCellContext as a };
