var React = require('react');
var coreComponentsButton = require('../../../../button/cssm');
var CrossCircleMIcon = require('@alfalab/icons-glyph/CrossCircleMIcon');
var components_countdown_component = require('../countdown/component.js');
var components_countdownLoader_component = require('../countdown-loader/component.js');
var styles = require('./index.module.css');
require('classnames');
require('@alfalab/hooks');
require('@alfalab/utils');
require('../countdown/index.module.css');
require('../countdown-loader/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Overlimit = function (_a) {
    var _b = _a.duration, duration = _b === void 0 ? 60000 : _b, buttonRetryText = _a.buttonRetryText, hasFatalError = _a.hasFatalError, onOverlimitRepeatSms = _a.onOverlimitRepeatSms, onOverlimitCountdownFinished = _a.onOverlimitCountdownFinished, text = _a.text, title = _a.title;
    var timerId = React.useRef(0);
    var start = React.useRef(0);
    var _c = React.useState(false), isBlockingOver = _c[0], setIsBlockingOver = _c[1];
    var _d = React.useState(0), timePassed = _d[0], setTimePassed = _d[1];
    var stopTimer = React.useCallback(function () {
        window.clearInterval(timerId.current);
    }, []);
    var updateProgress = React.useCallback(function () {
        var passed = Date.now() - start.current;
        if (passed >= duration) {
            setIsBlockingOver(true);
            if (onOverlimitCountdownFinished) {
                onOverlimitCountdownFinished();
            }
            stopTimer();
        }
        else {
            setTimePassed(passed);
        }
    }, [duration, onOverlimitCountdownFinished, stopTimer]);
    var startTimer = React.useCallback(function () {
        start.current = Date.now();
        updateProgress();
        timerId.current = window.setInterval(updateProgress, 50);
    }, [updateProgress]);
    var handleRepeatSmsButtonClick = React.useCallback(function (event) {
        setIsBlockingOver(false);
        if (onOverlimitRepeatSms) {
            onOverlimitRepeatSms(event);
        }
        startTimer();
    }, [onOverlimitRepeatSms, startTimer]);
    React.useEffect(function () {
        startTimer();
        return function () {
            stopTimer();
        };
    }, [startTimer, stopTimer]);
    var progress = timePassed / duration;
    return (React__default.default.createElement("div", { className: styles__default.default.component },
        hasFatalError && (React__default.default.createElement("div", { className: styles__default.default.alertIcon },
            React__default.default.createElement(CrossCircleMIcon.CrossCircleMIcon, { "data-test-id": 'alert-icon', width: 64, height: 64 }))),
        React__default.default.createElement("span", { className: styles__default.default.title }, title),
        React__default.default.createElement("div", { className: styles__default.default.description },
            React__default.default.createElement("div", null, text),
            isBlockingOver ? (React__default.default.createElement(coreComponentsButton.Button, { size: 'xs', view: 'secondary', onClick: handleRepeatSmsButtonClick, className: styles__default.default.getCodeButton }, buttonRetryText)) : (React__default.default.createElement("div", { className: styles__default.default.countdown },
                React__default.default.createElement(components_countdownLoader_component.CountdownLoader, { progress: progress, className: styles__default.default.loader }),
                React__default.default.createElement("div", { className: styles__default.default.timePassed }, components_countdown_component.formatMsAsMinutes(duration - timePassed)))))));
};

exports.Overlimit = Overlimit;
