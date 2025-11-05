var Component_responsive = require('./Component.responsive.js');
var utils = require('./utils.js');
require('./Component-fde0c12c.js');
require('react');
require('react-merge-refs');
require('classnames');
require('../../calendar/cssm');
require('../../date-input/cssm');
require('../../popover/cssm');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./components/calendar-input/index.module.css');
require('@alfalab/hooks');
require('./Component.desktop.js');
require('date-fns/format');
require('date-fns/isSameDay');
require('date-fns/parse');
require('./Component.mobile.js');



exports.CalendarInput = Component_responsive.CalendarInputResponsive;
exports.DATE_FORMAT = utils.DATE_FORMAT;
exports.DATE_MASK = utils.DATE_MASK;
exports.IS_BROWSER = utils.IS_BROWSER;
exports.NATIVE_DATE_FORMAT = utils.NATIVE_DATE_FORMAT;
exports.SUPPORTS_INPUT_TYPE_DATE = utils.SUPPORTS_INPUT_TYPE_DATE;
exports.formatDate = utils.formatDate;
exports.isInputDateSupported = utils.isInputDateSupported;
exports.isValidInputValue = utils.isValidInputValue;
exports.parseDateString = utils.parseDateString;
