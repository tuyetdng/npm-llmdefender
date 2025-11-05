var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../../../../../typography/cssm');
var context = require('../../../context.js');
var utils = require('../../../utils.js');
var components_countdownLoader_component = require('../../countdown-loader/component.js');
var components_header_component = require('../../header/component.js');
var styles = require('./index.module.css');
require('../../countdown-loader/index.module.css');
require('../../header/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

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
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.component, styles__default.default[alignContent]) },
        React__default.default.createElement(components_header_component.Header, { mobile: mobile }, texts.tempBlockTitle),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default(styles__default.default.description, (_b = {}, _b[styles__default.default.typographyTheme] = !mobile, _b)) }, texts.tempBlockDescription),
        React__default.default.createElement("div", { className: cn__default.default(styles__default.default.countdownWrap, (_c = {}, _c[styles__default.default.typographyTheme] = !mobile, _c)) },
            React__default.default.createElement(components_countdownLoader_component.CountdownLoader, { progress: 1 - timeLeft / tempBlockDuration, className: styles__default.default.loader }),
            utils.formatMsAsMinutes(timeLeft))));
};

exports.TempBlock = TempBlock;
