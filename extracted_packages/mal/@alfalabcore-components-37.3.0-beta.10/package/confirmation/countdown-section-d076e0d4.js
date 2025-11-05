var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../button');
var coreComponentsLoader = require('../loader');
var coreComponentsTypography = require('../typography');
var context = require('./context.js');
var utils = require('./utils.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"confirmation__component_pteqq","typographyTheme":"confirmation__typographyTheme_pteqq","phone":"confirmation__phone_pteqq","compact":"confirmation__compact_pteqq","loaderWrap":"confirmation__loaderWrap_pteqq","left":"confirmation__left_pteqq","center":"confirmation__center_pteqq","codeInput":"confirmation__codeInput_pteqq","smsComeLink":"confirmation__smsComeLink_pteqq","countdownContainer":"confirmation__countdownContainer_pteqq","countdownMobile":"confirmation__countdownMobile_pteqq","countdownLoaderMobile":"confirmation__countdownLoaderMobile_pteqq","getCodeButton":"confirmation__getCodeButton_pteqq","getCodeButtonMobile":"confirmation__getCodeButtonMobile_pteqq","containerInput":"confirmation__containerInput_pteqq"};
require('./components/screens/initial/index.css');

var CountdownSection = function (_a) {
    var _b, _c;
    var codeSendHintVisible = _a.codeSendHintVisible, timePassed = _a.timePassed, processing = _a.processing, mobile = _a.mobile, handleSmsRetryClick = _a.handleSmsRetryClick;
    var _d = React.useContext(context.ConfirmationContext), state = _d.state, texts = _d.texts, timeLeft = _d.timeLeft, blockSmsRetry = _d.blockSmsRetry;
    var renderText = function (text) {
        var _a;
        return (React__default.default.createElement(coreComponentsTypography.Typography.Text, { className: cn__default.default(styles.countdownContainer, (_a = {},
                _a[styles.countdownMobile] = mobile,
                _a[styles.typographyTheme] = !mobile,
                _a)), view: mobile ? 'primary-small' : 'primary-medium', tag: 'div' }, text));
    };
    if (codeSendHintVisible)
        return renderText(texts.codeSended);
    if (processing) {
        return (React__default.default.createElement("div", { className: cn__default.default(styles.loaderWrap, styles.countdownContainer, (_b = {},
                _b[styles.countdownLoaderMobile] = mobile,
                _b[styles.typographyTheme] = !mobile,
                _b)) },
            React__default.default.createElement(coreComponentsLoader.Loader, null),
            React__default.default.createElement("span", { className: styles.loaderText }, state === 'CODE_CHECKING' ? texts.codeChecking : texts.codeSending)));
    }
    if (blockSmsRetry)
        return renderText(texts.noAttemptsLeft);
    if (timePassed) {
        return (React__default.default.createElement(coreComponentsButton.Button, { size: mobile ? 'xs' : 'xxs', view: 'secondary', onClick: handleSmsRetryClick, className: cn__default.default(styles.getCodeButton, (_c = {}, _c[styles.getCodeButtonMobile] = mobile, _c)) }, texts.buttonRetry));
    }
    return renderText("".concat(texts.countdown, " ").concat(utils.formatMsAsMinutes(timeLeft)));
};

exports.CountdownSection = CountdownSection;
exports.styles = styles;
