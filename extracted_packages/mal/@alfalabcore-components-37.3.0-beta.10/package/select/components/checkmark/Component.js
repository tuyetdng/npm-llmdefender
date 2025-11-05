var React = require('react');
var cn = require('classnames');
var coreComponentsBadge = require('../../../badge');
var coreComponentsCheckbox = require('../../../checkbox');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"checkmark":"select__checkmark_1advo","single":"select__single_1advo","selected":"select__selected_1advo","before":"select__before_1advo","multiple":"select__multiple_1advo","after":"select__after_1advo","colorIcon":"select__colorIcon_1advo"};
require('./index.css');

var Checkmark = function (_a) {
    var _b;
    var selected = _a.selected, _c = _a.disabled, disabled = _c === void 0 ? false : _c, className = _a.className, multiple = _a.multiple, _d = _a.position, position = _d === void 0 ? 'before' : _d;
    var single = !multiple || position === 'after';
    var checkmarkClassNames = cn__default.default(styles.checkmark, className, styles[position], (_b = {},
        _b[styles.multiple] = !single,
        _b[styles.single] = single,
        _b[styles.selected] = selected,
        _b));
    var handleCheckboxClick = React.useCallback(function (event) { return event.stopPropagation(); }, []);
    return single ? (React__default.default.createElement("div", { className: checkmarkClassNames },
        React__default.default.createElement(coreComponentsBadge.Badge, { className: styles.after, view: 'icon', size: 'm', iconColor: 'positive', content: React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, { className: styles.colorIcon }) }))) : (React__default.default.createElement(coreComponentsCheckbox.Checkbox, { checked: selected, disabled: disabled, className: checkmarkClassNames, size: 'm', onClick: handleCheckboxClick }));
};

exports.Checkmark = Checkmark;
