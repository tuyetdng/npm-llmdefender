var Component = require('./Component.js');
var utils_format = require('./utils/format.js');
var utils_nativeSupports = require('./utils/native-supports.js');
require('react');
require('react-merge-refs');
require('../../input/cssm');
require('./index.module.css');
require('date-fns/format');
require('date-fns/isValid');
require('date-fns/parse');



exports.DateInput = Component.DateInput;
exports.DATE_FORMAT = utils_format.DATE_FORMAT;
exports.DATE_MASK = utils_format.DATE_MASK;
exports.NATIVE_DATE_FORMAT = utils_format.NATIVE_DATE_FORMAT;
exports.format = utils_format.format;
exports.formatDate = utils_format.formatDate;
exports.isCompleteDateInput = utils_format.isCompleteDateInput;
exports.isValid = utils_format.isValid;
exports.parseDateString = utils_format.parseDateString;
exports.isInputDateSupported = utils_nativeSupports.isInputDateSupported;
