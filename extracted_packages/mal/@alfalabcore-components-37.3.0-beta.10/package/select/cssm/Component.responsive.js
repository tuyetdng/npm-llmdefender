var tslib_es6 = require('./tslib.es6-0e9bf404.js');
var React = require('react');
var hooks = require('@alfalab/hooks');
var Component = require('./Component.js');
require('classnames');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('./components/arrow/index.module.css');
require('./Component-246be813.js');
var presets_useSelectWithApply_optionsListWithApply_Component = require('./Component-a6199ac9.js');
require('../../form-control/cssm');
require('./components/field/index.module.css');
require('./components/optgroup/index.module.css');
require('../../badge/cssm');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('./components/base-select-mobile/checkmark/index.module.css');
require('../../checkbox/cssm');
require('./components/checkmark/index.module.css');
require('./components/option/index.module.css');
require('./components/options-list/Component.js');
require('react-virtual');
require('../../scrollbar/cssm');
require('./components/virtual-options-list/index.module.css');
require('./components/base-checkmark/index.module.css');
require('./components/base-option/index.module.css');
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
require('../../popover/cssm');
require('./components/native-select/Component.js');
require('./components/base-select/index.module.css');
require('../../bottom-sheet/cssm');
require('../../modal/cssm/mobile');
require('./components/base-option/Component.js');
require('./components/base-checkmark/Component.js');
require('../../skeleton/cssm');
require('./presets/useSelectWithLoading/index.module.css');
require('./presets/useLazyLoading/index.module.css');
require('./intersection-observer-9ec5cf59.js');
require('../../button/cssm');
require('./presets/useSelectWithApply/options-list-with-apply/index.module.css');
require('./components/base-select-mobile/options-list/Component.js');
require('../../base-modal/cssm');
require('./components/base-select-mobile/options-list/index.module.css');
require('./components/base-select-mobile/index.module.css');
require('./components/options-list/index.module.css');

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
