var tslib_es6 = require('./tslib.es6-bbd6cd2a.js');
var React = require('react');
var coreComponentsSelect = require('../../select/cssm');
var field_Component = require('./field/Component.js');
var option_Component = require('./option/Component.js');
require('classnames');
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

var PickerButtonMobile = React.forwardRef(function (_a, ref) {
    var options = _a.options, label = _a.label, _b = _a.Option, Option = _b === void 0 ? option_Component.Option : _b, _c = _a.Optgroup, Optgroup = _c === void 0 ? coreComponentsSelect.Optgroup : _c, view = _a.view, loading = _a.loading, _d = _a.variant, variant = _d === void 0 ? 'default' : _d, leftAddons = _a.leftAddons, rightAddons = _a.rightAddons, size = _a.size, bottomSheetProps = _a.bottomSheetProps, showArrow = _a.showArrow, restProps = tslib_es6.__rest(_a, ["options", "label", "Option", "Optgroup", "view", "loading", "variant", "leftAddons", "rightAddons", "size", "bottomSheetProps", "showArrow"]);
    return (React__default.default.createElement(coreComponentsSelect.SelectMobile, tslib_es6.__assign({}, restProps, { label: label, Option: Option, bottomSheetProps: tslib_es6.__assign({ title: label, stickyHeader: true }, bottomSheetProps), Field: field_Component.Field, Optgroup: Optgroup, size: size === 'm' ? 'm' : 's', closeOnSelect: true, fieldProps: {
            view: view,
            loading: loading,
            /** size у select, button несовместимы */
            buttonSize: size,
            buttonVariant: variant,
            leftAddons: leftAddons,
            rightAddons: rightAddons,
            showArrow: showArrow,
        }, ref: ref, options: options, selected: [] })));
});

exports.PickerButtonMobile = PickerButtonMobile;
