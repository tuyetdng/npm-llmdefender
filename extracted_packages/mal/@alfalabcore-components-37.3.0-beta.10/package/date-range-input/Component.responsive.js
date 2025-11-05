var components_dateRangeInput_Component = require('./Component-e6ef3114.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component_desktop = require('./Component.desktop.js');
var Component_mobile = require('./Component.mobile.js');
require('react-merge-refs');
require('classnames');
require('date-fns/isValid');
require('../calendar');
require('../icon-button');
require('../input');
require('../popover');
require('@alfalab/icons-glyph/CalendarMIcon');
require('./utils/format.js');
require('date-fns/parse');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var DateRangeInputResponsive = function (_a) {
    var _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = components_dateRangeInput_Component.__rest(_a, ["breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(Component_desktop.DateRangeInputDesktop, components_dateRangeInput_Component.__assign({}, restProps))) : (React__default.default.createElement(Component_mobile.DateRangeInputMobile, components_dateRangeInput_Component.__assign({}, restProps)));
};

exports.DateRangeInputResponsive = DateRangeInputResponsive;
