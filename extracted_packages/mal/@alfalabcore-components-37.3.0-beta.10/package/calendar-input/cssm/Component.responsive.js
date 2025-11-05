var components_calendarInput_Component = require('./Component-fde0c12c.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component_desktop = require('./Component.desktop.js');
var Component_mobile = require('./Component.mobile.js');
require('react-merge-refs');
require('classnames');
require('../../calendar/cssm');
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

var CalendarInputResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = components_calendarInput_Component.__rest(_a, ["breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(Component_desktop.CalendarInputDesktop, components_calendarInput_Component.__assign({}, restProps))) : (React__default.default.createElement(Component_mobile.CalendarInputMobile, components_calendarInput_Component.__assign({}, restProps)));
};

exports.CalendarInputResponsive = CalendarInputResponsive;
