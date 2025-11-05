var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../../../button/cssm');
var coreComponentsLoader = require('../../../../../loader/cssm');
var coreComponentsTypography = require('../../../../../typography/cssm');
var context = require('../../../context.js');
var utils = require('../../../utils.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var CountdownSection = function (_a) {
    var _b, _c;
    var codeSendHintVisible = _a.codeSendHintVisible, timePassed = _a.timePassed, processing = _a.processing, mobile = _a.mobile, handleSmsRetryClick = _a.handleSmsRetryClick;
    var _d = React.useContext(context.ConfirmationContext), state = _d.state, texts = _d.texts, timeLeft = _d.timeLeft, blockSmsRetry = _d.blockSmsRetry;
    var renderText = function (text) {
        var _a;
        return (React__default.default.createElement(coreComponentsTypography.Typography.Text, { className: cn__default.default(styles__default.default.countdownContainer, (_a = {},
                _a[styles__default.default.countdownMobile] = mobile,
                _a[styles__default.default.typographyTheme] = !mobile,
                _a)), view: mobile ? 'primary-small' : 'primary-medium', tag: 'div' }, text));
    };
    if (codeSendHintVisible)
        return renderText(texts.codeSended);
    if (processing) {
        return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.loaderWrap, styles__default.default.countdownContainer, (_b = {},
                _b[styles__default.default.countdownLoaderMobile] = mobile,
                _b[styles__default.default.typographyTheme] = !mobile,
                _b)) },
            React__default.default.createElement(coreComponentsLoader.Loader, null),
            React__default.default.createElement("span", { className: styles__default.default.loaderText }, state === 'CODE_CHECKING' ? texts.codeChecking : texts.codeSending)));
    }
    if (blockSmsRetry)
        return renderText(texts.noAttemptsLeft);
    if (timePassed) {
        return (React__default.default.createElement(coreComponentsButton.Button, { size: mobile ? 'xs' : 'xxs', view: 'secondary', onClick: handleSmsRetryClick, className: cn__default.default(styles__default.default.getCodeButton, (_c = {}, _c[styles__default.default.getCodeButtonMobile] = mobile, _c)) }, texts.buttonRetry));
    }
    return renderText("".concat(texts.countdown, " ").concat(utils.formatMsAsMinutes(timeLeft)));
};

exports.CountdownSection = CountdownSection;
