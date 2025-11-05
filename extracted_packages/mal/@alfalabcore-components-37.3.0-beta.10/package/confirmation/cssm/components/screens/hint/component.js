var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../../../button/cssm');
var coreComponentsLink = require('../../../../../link/cssm');
var coreComponentsTypography = require('../../../../../typography/cssm');
var context = require('../../../context.js');
var components_header_component = require('../../header/component.js');
var styles = require('./index.module.css');
require('../../../utils.js');
require('../../header/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Hint = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var mobile = _a.mobile;
    var _h = React.useContext(context.ConfirmationContext), alignContent = _h.alignContent, texts = _h.texts, onChangeScreen = _h.onChangeScreen, onChangeState = _h.onChangeState;
    var handleReturnButtonClick = function () {
        onChangeScreen('INITIAL');
        onChangeState('INITIAL');
    };
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, styles__default.default[alignContent]) },
        React__default.default.createElement(components_header_component.Header, { mobile: mobile }, "\u041D\u0435\u00A0\u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435?"),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default(styles__default.default.text, (_b = {}, _b[styles__default.default.typographyTheme] = !mobile, _b)) }, "\u0415\u0441\u043B\u0438 \u0443\u00A0\u0432\u0430\u0441 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430, \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u0435 \u043D\u0430\u043C \u0438\u043B\u0438 \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u0432\u00A0\u043B\u044E\u0431\u043E\u0435 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0431\u0430\u043D\u043A\u0430."),
        React__default.default.createElement("div", { className: styles__default.default.phonesWrap },
            React__default.default.createElement("div", { className: cn__default.default(styles__default.default.phoneWrap, (_c = {}, _c[styles__default.default.phoneContentMobile] = mobile, _c)) },
                React__default.default.createElement(coreComponentsLink.Link, { href: 'tel:+78002000000', underline: false, className: styles__default.default.phoneLink }, "8 800 200-00-00"),
                React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default(styles__default.default.text, (_d = {}, _d[styles__default.default.typographyTheme] = !mobile, _d)) }, mobile
                    ? 'Для\u00A0 звонков по\u00A0России'
                    : ' \u2014\u00A0для звонков по\u00A0России')),
            React__default.default.createElement("div", { className: cn__default.default(styles__default.default.phoneWrap, (_e = {}, _e[styles__default.default.phoneContentMobile] = mobile, _e)) },
                React__default.default.createElement(coreComponentsLink.Link, { href: 'tel:+74957888878', underline: false, className: styles__default.default.phoneLink }, "+7 495 78-888-78"),
                React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default(styles__default.default.text, (_f = {}, _f[styles__default.default.typographyTheme] = !mobile, _f)) }, mobile
                    ? 'В\u00A0Москве и\u00A0за\u00A0границей'
                    : ' \u2014\u00A0в\u00A0Москве и\u00A0за\u00A0границей'))),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default(styles__default.default.text, (_g = {}, _g[styles__default.default.typographyTheme] = !mobile, _g)) }, "\u0415\u0441\u043B\u0438 \u043D\u043E\u043C\u0435\u0440 \u043D\u0435\u00A0\u043C\u0435\u043D\u044F\u043B\u0441\u044F, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043F\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043D \u0441\u0435\u0440\u0432\u0438\u0441 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442."),
        React__default.default.createElement(coreComponentsButton.Button, { size: mobile ? 'xs' : 's', view: 'secondary', onClick: handleReturnButtonClick, className: styles__default.default.hintButton }, texts.hintButton)));
};

exports.Hint = Hint;
