var tslib_es6 = require('./tslib.es6-0e9bf404.js');
var React = require('react');
var components_arrow_Component = require('./components/arrow/Component.js');
var components_baseSelect_Component = require('./Component-246be813.js');
var components_field_Component = require('./components/field/Component.js');
var components_optgroup_Component = require('./components/optgroup/Component.js');
var components_option_Component = require('./components/option/Component.js');
var components_optionsList_Component = require('./components/options-list/Component.js');
require('classnames');
require('@alfalab/icons-glyph/ChevronDownMIcon');
require('./components/arrow/index.module.css');
require('react-merge-refs');
require('@juggle/resize-observer');
require('downshift');
require('../../popover/cssm');
require('@alfalab/hooks');
require('./utils.js');
require('./components/native-select/Component.js');
require('./components/base-select/index.module.css');
require('../../form-control/cssm');
require('./components/field/index.module.css');
require('./components/optgroup/index.module.css');
require('./components/base-select-mobile/checkmark/Component.js');
require('../../badge/cssm');
require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
require('@alfalab/icons-glyph/CheckmarkMIcon');
require('./components/base-select-mobile/checkmark/index.module.css');
require('./components/checkmark/Component.js');
require('../../checkbox/cssm');
require('./components/checkmark/index.module.css');
require('./components/option/index.module.css');
require('../../scrollbar/cssm');
require('./components/options-list/index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var Select = React.forwardRef(function (_a, ref) {
    var _b = _a.Arrow, Arrow = _b === void 0 ? components_arrow_Component.Arrow : _b, _c = _a.Field, Field = _c === void 0 ? components_field_Component.Field : _c, _d = _a.OptionsList, OptionsList = _d === void 0 ? components_optionsList_Component.OptionsList : _d, _e = _a.Optgroup, Optgroup = _e === void 0 ? components_optgroup_Component.Optgroup : _e, _f = _a.Option, Option = _f === void 0 ? components_option_Component.Option : _f, restProps = tslib_es6.__rest(_a, ["Arrow", "Field", "OptionsList", "Optgroup", "Option"]);
    return (React__default.default.createElement(components_baseSelect_Component.BaseSelect, tslib_es6.__assign({ ref: ref, Option: Option, Field: Field, Optgroup: Optgroup, OptionsList: OptionsList, Arrow: Arrow }, restProps)));
});

exports.Select = Select;
