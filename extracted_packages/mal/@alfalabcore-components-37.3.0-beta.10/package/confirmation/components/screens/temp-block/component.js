var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../../../../typography');
var context = require('../../../context.js');
var utils = require('../../../utils.js');
var components_countdownLoader_component = require('../../countdown-loader/component.js');
var components_header_component = require('../../header/component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"confirmation__component_1ydrb","center":"confirmation__center_1ydrb","typographyTheme":"confirmation__typographyTheme_1ydrb","description":"confirmation__description_1ydrb","countdownWrap":"confirmation__countdownWrap_1ydrb","loader":"confirmation__loader_1ydrb"};
require('./index.css');

var TempBlock = function (_a) {
    var _b, _c;
    var mobile = _a.mobile;
    var _d = React.useContext(context.ConfirmationContext), alignContent = _d.alignContent, texts = _d.texts, tempBlockDuration = _d.tempBlockDuration, onChangeScreen = _d.onChangeScreen, onTempBlockFinished = _d.onTempBlockFinished;
    var _e = utils.useCountdown(tempBlockDuration), timeLeft = _e[0], startTimer = _e[1];
    React.useEffect(function () {
        startTimer();
    }, [startTimer]);
    React.useEffect(function () {
        if (timeLeft === 0 && onTempBlockFinished) {
            onTempBlockFinished();
        }
    }, [timeLeft, onChangeScreen, onTempBlockFinished]);
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, styles[alignContent]) },
        React__default.default.createElement(components_header_component.Header, { mobile: mobile }, texts.tempBlockTitle),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default(styles.description, (_b = {}, _b[styles.typographyTheme] = !mobile, _b)) }, texts.tempBlockDescription),
        React__default.default.createElement("div", { className: cn__default.default(styles.countdownWrap, (_c = {}, _c[styles.typographyTheme] = !mobile, _c)) },
            React__default.default.createElement(components_countdownLoader_component.CountdownLoader, { progress: 1 - timeLeft / tempBlockDuration, className: styles.loader }),
            utils.formatMsAsMinutes(timeLeft))));
};

exports.TempBlock = TempBlock;
