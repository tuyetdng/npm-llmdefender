var React = require('react');
var cn = require('classnames');
var coreComponentsCheckbox = require('../../../../checkbox/cssm');
var CheckmarkMIcon = require('@alfalab/icons-glyph/CheckmarkMIcon');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var BaseCheckmark = function (_a) {
    var _b;
    var selected = _a.selected, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className, multiple = _a.multiple;
    var checkmarkClassNames = cn__default.default(styles__default.default.checkmark, className, (_b = {},
        _b[styles__default.default.multiple] = multiple,
        _b[styles__default.default.single] = !multiple,
        _b[styles__default.default.selected] = selected,
        _b));
    return multiple ? (React__default.default.createElement(coreComponentsCheckbox.Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: function (event) { return event.stopPropagation(); } })) : (React__default.default.createElement(CheckmarkMIcon.CheckmarkMIcon, { className: checkmarkClassNames }));
};

exports.BaseCheckmark = BaseCheckmark;
