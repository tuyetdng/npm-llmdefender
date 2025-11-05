var components_calendarInput_Component = require('./Component-389869c1.js');
var React = require('react');
require('react-merge-refs');
require('classnames');
require('../calendar');
require('../date-input');
require('../popover');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils.js');
require('date-fns/format');
require('date-fns/isSameDay');
require('date-fns/parse');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var CalendarInputDesktop = function (props) { return (React__default.default.createElement(components_calendarInput_Component.CalendarInput, components_calendarInput_Component.__assign({}, props))); };

exports.CalendarInputDesktop = CalendarInputDesktop;
