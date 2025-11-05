var tslib_es6 = require('./tslib.es6-59eeb8c3.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component = require('./Component.js');
var Component_mobile = require('./Component.mobile.js');
require('classnames');
require('../select');
require('./field/Component.js');
require('../button');
require('./utils/index.js');
require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('@alfalab/icons-glyph/MoreMIcon');
require('@alfalab/icons-glyph/MoreSIcon');
require('./option/Component.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var PickerButtonResponsive = React.forwardRef(function (_a, ref) {
    var OptionsList = _a.OptionsList, onScroll = _a.onScroll, footer = _a.footer, swipeable = _a.swipeable, bottomSheetProps = _a.bottomSheetProps, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = tslib_es6.__rest(_a, ["OptionsList", "onScroll", "footer", "swipeable", "bottomSheetProps", "breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(Component.PickerButtonDesktop, tslib_es6.__assign({ ref: ref, OptionsList: OptionsList, onScroll: onScroll }, restProps))) : (React__default.default.createElement(Component_mobile.PickerButtonMobile, tslib_es6.__assign({ ref: ref, footer: footer, swipeable: swipeable, bottomSheetProps: bottomSheetProps }, restProps)));
});

exports.PickerButtonResponsive = PickerButtonResponsive;
