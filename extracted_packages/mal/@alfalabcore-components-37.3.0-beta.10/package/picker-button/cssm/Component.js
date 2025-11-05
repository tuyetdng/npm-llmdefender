var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsSelect = require('../../select/cssm');
var field_Component = require('./field/Component.js');
var option_Component = require('./option/Component.js');
var styles = require('./index.module.css');
require('../../button/cssm');
require('./utils/index.js');
require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('@alfalab/icons-glyph/MoreMIcon');
require('@alfalab/icons-glyph/MoreSIcon');
require('./field/index.module.css');
require('./option/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var SIDE_POSITIONS = ['right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'];
var PickerButtonDesktop = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.OptionsList, OptionsList = _c === void 0 ? coreComponentsSelect.OptionsList : _c, _d = _a.Optgroup, Optgroup = _d === void 0 ? coreComponentsSelect.Optgroup : _d, _e = _a.Option, Option = _e === void 0 ? option_Component.Option : _e, view = _a.view, loading = _a.loading, _f = _a.size, size = _f === void 0 ? 'm' : _f, _g = _a.variant, variant = _g === void 0 ? 'default' : _g, className = _a.className, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, popperClassName = _a.popperClassName, optionsListClassName = _a.optionsListClassName, optionClassName = _a.optionClassName, showArrow = _a.showArrow, restProps = tslib_es6.__rest(_a, ["OptionsList", "Optgroup", "Option", "view", "loading", "size", "variant", "className", "leftAddons", "rightAddons", "popperClassName", "optionsListClassName", "optionClassName", "showArrow"]);
    var isSideGap = !!restProps.popoverPosition && SIDE_POSITIONS.includes(restProps.popoverPosition);
    return (React__default.default.createElement(coreComponentsSelect.BaseSelect, tslib_es6.__assign({}, restProps, { optionProps: { Checkmark: null }, ref: ref, Option: Option, Field: field_Component.Field, size: size === 'm' ? 'm' : 's', fieldProps: {
            view: view,
            loading: loading,
            /** size у select, button несовместимы */
            buttonSize: size,
            buttonVariant: variant,
            leftAddons: leftAddons,
            rightAddons: rightAddons,
            showArrow: showArrow,
        }, Optgroup: Optgroup, OptionsList: OptionsList, className: cn__default.default(styles__default.default.container, className), popperClassName: cn__default.default('cc-picker-button', styles__default.default.optionsPopover, popperClassName, (_b = {},
            _b[styles__default.default.sideGap] = isSideGap,
            _b)), optionsListClassName: cn__default.default(styles__default.default.optionsListContainer, optionsListClassName), optionClassName: cn__default.default(styles__default.default.option, optionClassName), selected: [], closeOnSelect: true })));
});

exports.PickerButtonDesktop = PickerButtonDesktop;
