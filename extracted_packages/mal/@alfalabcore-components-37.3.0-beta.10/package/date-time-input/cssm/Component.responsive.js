var components_dateTimeInput_Component = require('./Component-b91f18e8.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component_desktop = require('./Component.desktop.js');
var Component_mobile = require('./Component.mobile.js');
require('react-merge-refs');
require('classnames');
require('../../calendar/cssm');
require('../../icon-button/cssm');
require('../../input/cssm');
require('../../popover/cssm');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils/format.js');
require('date-fns/isValid');
require('date-fns/parse');
require('./components/date-time-input/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var DateTimeInputResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = components_dateTimeInput_Component.__rest(_a, ["breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(Component_desktop.DateTimeInputDesktop, components_dateTimeInput_Component.__assign({}, restProps))) : (React__default.default.createElement(Component_mobile.DateTimeInputMobile, components_dateTimeInput_Component.__assign({}, restProps)));
};

exports.DateTimeInputResponsive = DateTimeInputResponsive;
