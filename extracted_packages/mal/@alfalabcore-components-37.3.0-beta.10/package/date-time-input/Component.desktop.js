var components_dateTimeInput_Component = require('./Component-d871952b.js');
var React = require('react');
require('react-merge-refs');
require('classnames');
require('../calendar');
require('../icon-button');
require('../input');
require('../popover');
require('@alfalab/hooks');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils/format.js');
require('date-fns/isValid');
require('date-fns/parse');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var DateTimeInputDesktop = function (props) { return (React__default.default.createElement(components_dateTimeInput_Component.DateTimeInput, components_dateTimeInput_Component.__assign({}, props))); };

exports.DateTimeInputDesktop = DateTimeInputDesktop;
