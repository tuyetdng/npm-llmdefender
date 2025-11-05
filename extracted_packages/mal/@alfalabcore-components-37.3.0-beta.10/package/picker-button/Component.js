var tslib_es6 = require('./tslib.es6-59eeb8c3.js');
var React = require('react');
var cn = require('classnames');
var coreComponentsSelect = require('../select');
var field_Component = require('./field/Component.js');
var option_Component = require('./option/Component.js');
require('../button');
require('./utils/index.js');
require('@alfalab/icons-glyph/ChevronDownCompactSIcon');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('@alfalab/icons-glyph/MoreMIcon');
require('@alfalab/icons-glyph/MoreSIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"container":"picker-button__container_1haon","optionsPopover":"picker-button__optionsPopover_1haon","sideGap":"picker-button__sideGap_1haon","optionsListContainer":"picker-button__optionsListContainer_1haon","option":"picker-button__option_1haon"};
require('./index.css');

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
        }, Optgroup: Optgroup, OptionsList: OptionsList, className: cn__default.default(styles.container, className), popperClassName: cn__default.default('cc-picker-button', styles.optionsPopover, popperClassName, (_b = {},
            _b[styles.sideGap] = isSideGap,
            _b)), optionsListClassName: cn__default.default(styles.optionsListContainer, optionsListClassName), optionClassName: cn__default.default(styles.option, optionClassName), selected: [], closeOnSelect: true })));
});

exports.PickerButtonDesktop = PickerButtonDesktop;
