import React, { useContext } from 'react';
import cn from 'classnames';
import { Button } from '../../../../../button/esm';
import { Link } from '../../../../../link/esm';
import { Typography } from '../../../../../typography/esm';
import { ConfirmationContext } from '../../../context.js';
import { Header } from '../../header/component.js';
import '../../../utils.js';

var styles = {"component":"confirmation__component_vwyxz","center":"confirmation__center_vwyxz","text":"confirmation__text_vwyxz","typographyTheme":"confirmation__typographyTheme_vwyxz","phonesWrap":"confirmation__phonesWrap_vwyxz","phoneWrap":"confirmation__phoneWrap_vwyxz","phoneLink":"confirmation__phoneLink_vwyxz","hintButton":"confirmation__hintButton_vwyxz","phoneContentMobile":"confirmation__phoneContentMobile_vwyxz"};
require('./index.css');

var Hint = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var mobile = _a.mobile;
    var _h = useContext(ConfirmationContext), alignContent = _h.alignContent, texts = _h.texts, onChangeScreen = _h.onChangeScreen, onChangeState = _h.onChangeState;
    var handleReturnButtonClick = function () {
        onChangeScreen('INITIAL');
        onChangeState('INITIAL');
    };
    return (React.createElement("div", { className: cn(styles.component, styles[alignContent]) },
        React.createElement(Header, { mobile: mobile }, "\u041D\u0435\u00A0\u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435?"),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.text, (_b = {}, _b[styles.typographyTheme] = !mobile, _b)) }, "\u0415\u0441\u043B\u0438 \u0443\u00A0\u0432\u0430\u0441 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430, \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043D\u0430\u043C \u0438\u043B\u0438 \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u0432\u00A0\u043B\u044E\u0431\u043E\u0435 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0431\u0430\u043D\u043A\u0430."),
        React.createElement("div", { className: styles.phonesWrap },
            React.createElement("div", { className: cn(styles.phoneWrap, (_c = {}, _c[styles.phoneContentMobile] = mobile, _c)) },
                React.createElement(Link, { href: 'tel:+78002000000', underline: false, className: styles.phoneLink }, "8 800 200-00-00"),
                React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.text, (_d = {}, _d[styles.typographyTheme] = !mobile, _d)) }, mobile
                    ? 'Для\u00A0 звонков по\u00A0России'
                    : ' \u2014\u00A0для звонков по\u00A0России')),
            React.createElement("div", { className: cn(styles.phoneWrap, (_e = {}, _e[styles.phoneContentMobile] = mobile, _e)) },
                React.createElement(Link, { href: 'tel:+74957888878', underline: false, className: styles.phoneLink }, "+7 495 78-888-78"),
                React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.text, (_f = {}, _f[styles.typographyTheme] = !mobile, _f)) }, mobile
                    ? 'В\u00A0Москве и\u00A0за\u00A0границей'
                    : ' \u2014\u00A0в\u00A0Москве и\u00A0за\u00A0границей'))),
        React.createElement(Typography.Text, { view: 'primary-medium', color: 'primary', className: cn(styles.text, (_g = {}, _g[styles.typographyTheme] = !mobile, _g)) }, "\u0415\u0441\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u043D\u0435\u00A0\u043C\u0435\u043D\u044F\u043B\u0441\u044F, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043F\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043D \u0441\u0435\u0440\u0432\u0438\u0441 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442."),
        React.createElement(Button, { size: mobile ? 'xs' : 's', view: 'secondary', onClick: handleReturnButtonClick, className: styles.hintButton }, texts.hintButton)));
};

export { Hint };
