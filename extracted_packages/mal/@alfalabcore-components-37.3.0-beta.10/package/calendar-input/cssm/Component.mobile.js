var components_calendarInput_Component = require('./Component-fde0c12c.js');
var React = require('react');
var coreComponentsCalendar = require('../../calendar/cssm');
require('react-merge-refs');
require('classnames');
require('../../date-input/cssm');
require('../../popover/cssm');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils.js');
require('date-fns/format');
require('date-fns/isSameDay');
require('date-fns/parse');
require('./components/calendar-input/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var CalendarInputMobile = function (props) { return (React__default.default.createElement(components_calendarInput_Component.CalendarInput, components_calendarInput_Component.__assign({ Calendar: coreComponentsCalendar.CalendarMobile, view: 'mobile' }, props))); };

exports.CalendarInputMobile = CalendarInputMobile;
