var tslib_es6 = require('./tslib.es6-febad92e.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component = require('./Component.js');
require('classnames');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('./Component-f670e03e.js');
var presets_useSelectWithApply_optionsListWithApply_Component = require('./Component-2e5231ae.js');
require('../form-control');
require('../badge');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('../checkbox');
require('./components/options-list/Component.js');
require('react-virtual');
require('../scrollbar');
require('./components/arrow/Component.js');
require('./components/field/Component.js');
require('./utils.js');
require('./components/optgroup/Component.js');
require('./components/option/Component.js');
require('./components/base-select-mobile/checkmark/Component.js');
require('./components/checkmark/Component.js');
require('react-merge-refs');
require('@juggle/resize-observer');
require('downshift');
require('../popover');
require('./components/native-select/Component.js');
require('../bottom-sheet');
require('../modal/mobile');
require('./components/base-option/Component.js');
require('./components/base-checkmark/Component.js');
require('../skeleton');
require('./intersection-observer-0f86c9db.js');
require('../button');
require('./components/base-select-mobile/options-list/Component.js');
require('../base-modal');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var SelectResponsive = React.forwardRef(function (_a, ref) {
    var footer = _a.footer, swipeable = _a.swipeable, bottomSheetProps = _a.bottomSheetProps, OptionsList = _a.OptionsList, onScroll = _a.onScroll, fieldProps = _a.fieldProps, _b = _a.breakpoint, breakpoint = _b === void 0 ? 1024 : _b, restProps = tslib_es6.__rest(_a, ["footer", "swipeable", "bottomSheetProps", "OptionsList", "onScroll", "fieldProps", "breakpoint"]);
    var view = hooks.useMedia([
        ['mobile', "(max-width: ".concat(breakpoint - 1, "px)")],
        ['desktop', "(min-width: ".concat(breakpoint, "px)")],
    ], 'desktop')[0];
    return view === 'desktop' ? (React__default.default.createElement(Component.Select, tslib_es6.__assign({ OptionsList: OptionsList, onScroll: onScroll }, restProps, { ref: ref, fieldProps: fieldProps }))) : (React__default.default.createElement(presets_useSelectWithApply_optionsListWithApply_Component.SelectMobile, tslib_es6.__assign({ footer: footer, swipeable: swipeable, bottomSheetProps: bottomSheetProps, fieldProps: fieldProps }, restProps, { ref: ref })));
});

exports.SelectResponsive = SelectResponsive;
