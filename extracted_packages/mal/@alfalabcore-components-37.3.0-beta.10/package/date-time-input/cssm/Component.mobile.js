var components_dateTimeInput_Component = require('./Component-b91f18e8.js');
var React = require('react');
var coreComponentsCalendar = require('../../calendar/cssm');
require('react-merge-refs');
require('classnames');
require('../../icon-button/cssm');
require('../../input/cssm');
require('../../popover/cssm');
require('@alfalab/hooks');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils/format.js');
require('date-fns/isValid');
require('date-fns/parse');
require('./components/date-time-input/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var DateTimeInputMobile = function (props) { return (React__default.default.createElement(components_dateTimeInput_Component.DateTimeInput, components_dateTimeInput_Component.__assign({ Calendar: coreComponentsCalendar.CalendarMobile, view: 'mobile' }, props))); };

exports.DateTimeInputMobile = DateTimeInputMobile;
