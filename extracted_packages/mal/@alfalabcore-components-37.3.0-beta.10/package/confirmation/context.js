var React = require('react');
var utils = require('./utils.js');

var mockFn = function () { return undefined; };
var ConfirmationContext = React.createContext({
    alignContent: 'left',
    texts: {},
    state: 'INITIAL',
    screen: 'INITIAL',
    requiredCharAmount: 5,
    countdownDuration: utils.ONE_MINUTE,
    timeLeft: utils.ONE_MINUTE,
    tempBlockDuration: utils.ONE_DAY,
    phone: '',
    onTempBlockFinished: mockFn,
    onInputFinished: mockFn,
    onChangeState: mockFn,
    onSmsRetryClick: mockFn,
    onChangeScreen: mockFn,
    onFatalErrorOkButtonClick: mockFn,
});

exports.ConfirmationContext = ConfirmationContext;
