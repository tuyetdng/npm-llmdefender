import React, { forwardRef, useRef, useContext } from 'react';
import mergeRefs from 'react-merge-refs';
import cn from 'classnames';
import { Comment } from '../../comment/modern';
import { useFocus } from '@alfalab/hooks';
import { Addon } from './components/addon/component.js';
import { Amount } from './components/amount/component.js';
import { AmountTitle } from './components/amount-title/component.js';
import { Category } from './components/category/component.js';
import { g as getDataTestId } from './getDataTestId-7d6c8fa8.js';
import { Footer } from './components/footer/component.js';
import { FooterButton } from './components/footer-button/component.js';
import { FooterText } from './components/footer-text/component.js';
import { Graphics } from './components/graphics/component.js';
import { Typography } from '../../typography/modern';
import '../../amount/modern';
import '../../button/modern';

const styles$3 = {"component":"pure-cell__component_11qkg","horizontal":"pure-cell__horizontal_11qkg"};
require('./components/content/index.css');

const Content = ({ children, dataTestId }) => {
    const { direction } = useContext(PureCellContext);
    return (React.createElement("section", { className: cn(styles$3.component, { [styles$3.horizontal]: direction === 'horizontal' }), "data-test-id": getDataTestId(dataTestId, 'content') }, children));
};

const styles$2 = {"component":"pure-cell__component_qk3dg","vertical":"pure-cell__vertical_qk3dg","reverse":"pure-cell__reverse_qk3dg"};
require('./components/main/index.css');

const Main = ({ children, isReverse, dataTestId }) => {
    const { direction = 'horizontal' } = useContext(PureCellContext);
    return (React.createElement("div", { className: cn(styles$2.component, styles$2[direction], {
            [styles$2.reverse]: isReverse,
        }), "data-test-id": getDataTestId(dataTestId, 'main') }, children));
};

const styles$1 = {"horizontal":"pure-cell__horizontal_e7qoj","rowLimit1":"pure-cell__rowLimit1_e7qoj","rowLimit2":"pure-cell__rowLimit2_e7qoj","component":"pure-cell__component_e7qoj","vertical":"pure-cell__vertical_e7qoj","title":"pure-cell__title_e7qoj","value":"pure-cell__value_e7qoj"};
require('./components/text/index.css');

const Text = ({ children, value, rowLimit, view = 'component', titleColor, valueColor, dataTestId, }) => {
    const { direction = 'horizontal' } = useContext(PureCellContext);
    const className = rowLimit && styles$1[`rowLimit${rowLimit}`];
    return (React.createElement("div", { className: cn(styles$1.component, {
            [styles$1.vertical]: direction !== 'horizontal',
        }) },
        React.createElement("span", { className: styles$1.title }, typeof children === 'string' ? (React.createElement(Typography.Text, { view: view, color: titleColor, className: className, "data-test-id": getDataTestId(dataTestId, 'text') }, children)) : (children)),
        value !== undefined && (React.createElement("span", { className: styles$1.value }, typeof value === 'string' ? (React.createElement(Typography.Text, { view: view, color: valueColor, className: className, "data-test-id": getDataTestId(dataTestId, 'text') }, value)) : (value)))));
};

const styles = {"component":"pure-cell__component_1ifaa","horizontal":"pure-cell__horizontal_1ifaa","vertical":"pure-cell__vertical_1ifaa","button":"pure-cell__button_1ifaa","link":"pure-cell__link_1ifaa","none":"pure-cell__none_1ifaa","airy":"pure-cell__airy_1ifaa","defaultPadding":"pure-cell__defaultPadding_1ifaa","compact":"pure-cell__compact_1ifaa","tiny":"pure-cell__tiny_1ifaa","left":"pure-cell__left_1ifaa","right":"pure-cell__right_1ifaa","both":"pure-cell__both_1ifaa","focused":"pure-cell__focused_1ifaa"};
require('./index.css');

/* eslint-disable react/jsx-no-constructed-context-values */
// eslint-disable-next-line @typescript-eslint/no-redeclare
const PureCellContext = React.createContext({});
const PureCellComponent = forwardRef(({ className, dataTestId, onClick, href, tag: Component = (href && 'a') || (onClick && 'button') || 'section', children, horizontalPadding = 'none', verticalPadding = 'none', direction = 'horizontal', ...restProps }, ref) => {
    const cellRef = useRef(null);
    const [focused] = useFocus(cellRef, 'keyboard');
    const addClasses = {
        [styles.component]: true,
        [styles.focused]: focused,
        [styles[direction]]: true,
        [styles.defaultPadding]: verticalPadding === 'default',
        [styles[verticalPadding]]: verticalPadding !== 'default',
        [styles[horizontalPadding]]: true,
    };
    if (href) {
        const { target } = restProps;
        // Для совместимости с react-router-dom, меняем href на to
        const hrefProps = { [typeof Component === 'string' ? 'href' : 'to']: href };
        return (React.createElement(Component, { rel: target === '_blank' ? 'noreferrer noopener' : undefined, ...restProps, ...hrefProps, ref: mergeRefs([cellRef, ref]), className: cn(styles.link, addClasses, className), "data-test-id": dataTestId, onClick: onClick },
            React.createElement(PureCellContext.Provider, { value: { direction } }, children)));
    }
    if (onClick) {
        return (React.createElement(Component, { ...restProps, ref: mergeRefs([cellRef, ref]), className: cn(styles.button, addClasses, className), "data-test-id": dataTestId, onClick: onClick },
            React.createElement(PureCellContext.Provider, { value: { direction } }, children)));
    }
    return (React.createElement(Component, { ref: ref, tabIndex: 0, className: cn(addClasses, className), "data-test-id": dataTestId },
        React.createElement(PureCellContext.Provider, { value: { direction } }, children)));
});
/**
 * Универсальный конструктор для сборки любой ячейки.
 *
 * [Макет](https://www.figma.com/file/KlFOLLkKO8rtvvQE3RXuhq/Click-Library?node-id=43525%3A240018)
 */
const PureCell = Object.assign(PureCellComponent, {
    Main,
    Graphics,
    Content,
    Text,
    Amount,
    AmountTitle,
    Addon,
    Footer,
    ExtraSubtitle: FooterText,
    FooterButton,
    Comment,
    Category,
});

export { Content as C, Main as M, PureCell as P, Text as T, PureCellContext as a };
