var components_dateRangeInput_Component = require('./Component-540e1474.js');
var React = require('react');
require('react-merge-refs');
require('classnames');
require('date-fns/isValid');
require('../../calendar/cssm');
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

var DateRangeInputDesktop = function (props) { return (React__default.default.createElement(components_dateRangeInput_Component.DateRangeInput, components_dateRangeInput_Component.__assign({}, props))); };

exports.DateRangeInputDesktop = DateRangeInputDesktop;
