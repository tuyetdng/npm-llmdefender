var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var views_popover = require('./views/popover.js');
var views_static = require('./views/static.js');
require('classnames');
require('date-fns/startOfMonth');
require('../../calendar-input/cssm');
require('../../date-input/cssm');
require('./components/divider/Component.js');
require('./components/divider/index.module.css');
require('./hooks.js');
require('date-fns/addMonths');
require('date-fns/isEqual');
require('date-fns/max');
require('date-fns/min');
require('date-fns/subMonths');
require('./views/index.module.css');
require('date-fns/endOfMonth');
require('../../calendar/cssm');
require('./utils.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var CalendarRange = function (_a) {
    var _b = _a.calendarPosition, calendarPosition = _b === void 0 ? 'static' : _b, restProps = tslib_es6.__rest(_a, ["calendarPosition"]);
    var View = calendarPosition === 'popover' ? views_popover.CalendarRangePopover : views_static.CalendarRangeStatic;
    return React__default.default.createElement(View, tslib_es6.__assign({}, restProps));
};

exports.CalendarRange = CalendarRange;
