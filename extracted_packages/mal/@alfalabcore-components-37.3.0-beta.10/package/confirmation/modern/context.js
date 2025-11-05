import { createContext } from 'react';
import { ONE_MINUTE, ONE_DAY } from './utils.js';

const mockFn = () => undefined;
const ConfirmationContext = createContext({
    alignContent: 'left',
    texts: {},
    state: 'INITIAL',
    screen: 'INITIAL',
    requiredCharAmount: 5,
    countdownDuration: ONE_MINUTE,
    timeLeft: ONE_MINUTE,
    tempBlockDuration: ONE_DAY,
    phone: '',
    onTempBlockFinished: mockFn,
    onInputFinished: mockFn,
    onChangeState: mockFn,
    onSmsRetryClick: mockFn,
    onChangeScreen: mockFn,
    onFatalErrorOkButtonClick: mockFn,
});

export { ConfirmationContext };
