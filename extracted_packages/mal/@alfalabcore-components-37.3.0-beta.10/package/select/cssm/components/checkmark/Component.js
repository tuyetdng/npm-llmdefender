var React = require('react');
var cn = require('classnames');
var coreComponentsBadge = require('../../../../badge/cssm');
var coreComponentsCheckbox = require('../../../../checkbox/cssm');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Checkmark = function (_a) {
    var _b;
    var selected = _a.selected, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className, multiple = _a.multiple, _d = _a.position, position = _d === void 0 ? 'before' : _d;
    var single = !multiple || position === 'after';
    var checkmarkClassNames = cn__default.default(styles__default.default.checkmark, className, styles__default.default[position], (_b = {},
        _b[styles__default.default.multiple] = !single,
        _b[styles__default.default.single] = single,
        _b[styles__default.default.selected] = selected,
        _b));
    var handleCheckboxClick = React.useCallback(function (event) { return event.stopPropagation(); }, []);
    return single ? (React__default.default.createElement("div", { className: checkmarkClassNames },
        React__default.default.createElement(coreComponentsBadge.Badge, { className: styles__default.default.after, view: 'icon', size: 'm', iconColor: 'positive', content: React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, { className: styles__default.default.colorIcon }) }))) : (React__default.default.createElement(coreComponentsCheckbox.Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: handleCheckboxClick }));
};

exports.Checkmark = Checkmark;
