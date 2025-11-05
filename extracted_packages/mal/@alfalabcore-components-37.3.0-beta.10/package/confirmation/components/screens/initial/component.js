var React = require('react');
var cn = require('classnames');
var coreComponentsButton = require('../../../../button');
var coreComponentsCodeInput = require('../../../../code-input');
var coreComponentsLink = require('../../../../link');
var coreComponentsTypography = require('../../../../typography');
var hooks = require('@alfalab/hooks');
var context = require('../../../context.js');
var components_header_component = require('../../header/component.js');
var components_screens_initial_countdownSection = require('../../../countdown-section-d076e0d4.js');
require('../../../utils.js');
require('../../../../loader');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var CODE_SEND_HINT_VISIBLE_DURATION = 2000;
var Initial = function (_a) {
    var _b;
    var mobile = _a.mobile;
    var _c = React.useContext(context.ConfirmationContext), state = _c.state, alignContent = _c.alignContent, texts = _c.texts, requiredCharAmount = _c.requiredCharAmount, timeLeft = _c.timeLeft, phone = _c.phone, clearCodeOnError = _c.clearCodeOnError, onChangeState = _c.onChangeState, onInputFinished = _c.onInputFinished, onChangeScreen = _c.onChangeScreen, onSmsRetryClick = _c.onSmsRetryClick;
    var prevState = hooks.usePrevious(state);
    var inputRef = React.useRef(null);
    var _d = React.useState(false), codeSendHintVisible = _d[0], setCodeSendHintVisible = _d[1];
    var timerId = React.useRef(0);
    var handleInputComplete = function (code) {
        onInputFinished(code);
    };
    var handleSmsHintLinkClick = function () {
        onChangeScreen('HINT');
    };
    var handleInputChange = function () {
        if (state === 'CODE_ERROR') {
            onChangeState('INITIAL');
        }
    };
    var handleSmsRetryClick = function () {
        if (inputRef.current) {
            inputRef.current.reset();
        }
        onSmsRetryClick();
    };
    var handleErrorAnimationEnd = function () {
        if (clearCodeOnError && state !== 'INITIAL') {
            onChangeState('INITIAL');
        }
    };
    var clearTimer = React.useCallback(function () {
        window.clearTimeout(timerId.current);
    }, []);
    React.useEffect(function () {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        return function () {
            clearTimer();
        };
    }, [clearTimer]);
    React.useEffect(function () {
        if (!inputRef.current) {
            return;
        }
        if (state === 'CODE_ERROR' && prevState !== 'CODE_ERROR') {
            inputRef.current.focus(requiredCharAmount - 1);
        }
        if (prevState === 'CODE_SENDING' && state !== 'CODE_SENDING') {
            inputRef.current.focus();
        }
    }, [prevState, state, requiredCharAmount]);
    React.useLayoutEffect(function () {
        if (prevState === 'CODE_SENDING' && state !== 'CODE_SENDING') {
            setCodeSendHintVisible(true);
            clearTimer();
            timerId.current = window.setTimeout(function () {
                setCodeSendHintVisible(false);
            }, CODE_SEND_HINT_VISIBLE_DURATION);
        }
    }, [prevState, state, clearTimer]);
    var getCodeInputError = function () {
        if (state === 'CODE_ERROR') {
            return texts.codeError || true;
        }
        return false;
    };
    var processing = ['CODE_CHECKING', 'CODE_SENDING'].includes(state);
    var timePassed = timeLeft === 0;
    return (React__default.default.createElement("div", { className: cn__default.default(components_screens_initial_countdownSection.styles.component, components_screens_initial_countdownSection.styles[alignContent]) },
        React__default.default.createElement(components_header_component.Header, { mobile: mobile }, texts.title),
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-medium', color: 'primary', className: cn__default.default(components_screens_initial_countdownSection.styles.phone, (_b = {}, _b[components_screens_initial_countdownSection.styles.typographyTheme] = !mobile, _b)) },
            "\u041A\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 ",
            phone),
        React__default.default.createElement(coreComponentsCodeInput.CodeInput, { disabled: processing, error: getCodeInputError(), ref: inputRef, fields: requiredCharAmount, className: cn__default.default(components_screens_initial_countdownSection.styles.containerInput, components_screens_initial_countdownSection.styles.codeInput), onComplete: handleInputComplete, onChange: handleInputChange, clearCodeOnError: clearCodeOnError, onErrorAnimationEnd: handleErrorAnimationEnd }),
        React__default.default.createElement(components_screens_initial_countdownSection.CountdownSection, { processing: processing, timePassed: timePassed, codeSendHintVisible: codeSendHintVisible, handleSmsRetryClick: handleSmsRetryClick, mobile: mobile }),
        mobile ? (React__default.default.createElement(coreComponentsButton.Button, { onClick: handleSmsHintLinkClick, view: 'link', size: 'xs' }, texts.linkToHint)) : (React__default.default.createElement(coreComponentsLink.Link, { onClick: handleSmsHintLinkClick, className: components_screens_initial_countdownSection.styles.smsComeLink, view: mobile ? 'primary' : 'secondary', pseudo: true }, texts.linkToHint))));
};

exports.Initial = Initial;
