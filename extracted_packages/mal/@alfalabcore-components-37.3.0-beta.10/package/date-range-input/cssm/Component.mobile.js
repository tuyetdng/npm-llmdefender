var components_dateRangeInput_Component = require('./Component-540e1474.js');
var React = require('react');
var coreComponentsCalendar = require('../../calendar/cssm');
require('react-merge-refs');
require('classnames');
require('date-fns/isValid');
require('../../icon-button/cssm');
require('../../input/cssm');
require('../../popover/cssm');
require('@alfalab/hooks');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils/format.js');
require('date-fns/parse');
require('./components/date-range-input/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var DateRangeInputMobile = function (props) { return (React__default.default.createElement(components_dateRangeInput_Component.DateRangeInput, components_dateRangeInput_Component.__assign({ Calendar: coreComponentsCalendar.CalendarMobile, view: 'mobile' }, props))); };

exports.DateRangeInputMobile = DateRangeInputMobile;
