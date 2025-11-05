var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../../../button/cssm');
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

var FatalError = function (_a) {
    var _b;
    var mobile = _a.mobile;
    var _c = React.useContext(context.ConfirmationContext), alignContent = _c.alignContent, texts = _c.texts, onFatalErrorOkButtonClick = _c.onFatalErrorOkButtonClick;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, styles__default.default[alignContent]) },
        React__default.default.createElement(components_header_component.Header, { mobile: mobile }, texts.fatalErrorTitle),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default((_b = {}, _b[styles__default.default.typographyTheme] = !mobile, _b)) }, texts.fatalErrorDescription),
        React__default.default.createElement(coreComponentsButton.Button, { size: mobile ? 'xs' : 's', view: 'secondary', onClick: onFatalErrorOkButtonClick, className: styles__default.default.button }, texts.fatalErrorButton)));
};

exports.FatalError = FatalError;
