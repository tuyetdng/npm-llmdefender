var React = require('react');
var cn = require('classnames');
var coreComponentsCheckbox = require('../../../checkbox');
var CheckmarkMIcon = require('@alfalab/icons-glyph/CheckmarkMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"checkmark":"select__checkmark_wzibi","single":"select__single_wzibi","selected":"select__selected_wzibi"};
require('./index.css');

var BaseCheckmark = function (_a) {
    var _b;
    var selected = _a.selected, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className, multiple = _a.multiple;
    var checkmarkClassNames = cn__default.default(styles.checkmark, className, (_b = {},
        _b[styles.multiple] = multiple,
        _b[styles.single] = !multiple,
        _b[styles.selected] = selected,
        _b));
    return multiple ? (React__default.default.createElement(coreComponentsCheckbox.Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: function (event) { return event.stopPropagation(); } })) : (React__default.default.createElement(CheckmarkMIcon.CheckmarkMIcon, { className: checkmarkClassNames }));
};

exports.BaseCheckmark = BaseCheckmark;
