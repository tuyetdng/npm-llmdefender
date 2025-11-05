var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../../button');
var coreComponentsTypography = require('../../../../typography');
var context = require('../../../context.js');
var components_header_component = require('../../header/component.js');
require('../../../utils.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"confirmation__component_1n8wj","typographyTheme":"confirmation__typographyTheme_1n8wj","left":"confirmation__left_1n8wj","center":"confirmation__center_1n8wj","button":"confirmation__button_1n8wj"};
require('./index.css');

var FatalError = function (_a) {
    var _b;
    var mobile = _a.mobile;
    var _c = React.useContext(context.ConfirmationContext), alignContent = _c.alignContent, texts = _c.texts, onFatalErrorOkButtonClick = _c.onFatalErrorOkButtonClick;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, styles[alignContent]) },
        React__default.default.createElement(components_header_component.Header, { mobile: mobile }, texts.fatalErrorTitle),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default((_b = {}, _b[styles.typographyTheme] = !mobile, _b)) }, texts.fatalErrorDescription),
        React__default.default.createElement(coreComponentsButton.Button, { size: mobile ? 'xs' : 's', view: 'secondary', onClick: onFatalErrorOkButtonClick, className: styles.button }, texts.fatalErrorButton)));
};

exports.FatalError = FatalError;
