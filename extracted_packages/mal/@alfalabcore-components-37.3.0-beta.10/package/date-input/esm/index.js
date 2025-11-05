export { DateInput } from './Component.js';
export { DATE_FORMAT, DATE_MASK, NATIVE_DATE_FORMAT, format, formatDate, isCompleteDateInput, isValid, parseDateString } from './utils/format.js';
export { isInputDateSupported } from './utils/native-supports.js';
import 'react';
import 'react-merge-refs';
import '../../input/esm';
import 'date-fns/format';
import 'date-fns/isValid';
import 'date-fns/parse';
