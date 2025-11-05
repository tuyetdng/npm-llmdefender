var components_dateRangeInput_Component = require('./Component-e6ef3114.js');
var React = require('react');
var coreComponentsCalendar = require('../calendar');
require('react-merge-refs');
require('classnames');
require('date-fns/isValid');
require('../icon-button');
require('../input');
require('../popover');
require('@alfalab/hooks');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils/format.js');
require('date-fns/parse');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var DateRangeInputMobile = function (props) { return (React__default.default.createElement(components_dateRangeInput_Component.DateRangeInput, components_dateRangeInput_Component.__assign({ Calendar: coreComponentsCalendar.CalendarMobile, view: 'mobile' }, props))); };

exports.DateRangeInputMobile = DateRangeInputMobile;
