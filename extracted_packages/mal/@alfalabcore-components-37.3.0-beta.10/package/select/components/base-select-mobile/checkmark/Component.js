var React = require('react');
var cn = require('classnames');
var coreComponentsBadge = require('../../../../badge');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
var CheckmarkMIcon = require('@alfalab/icons-glyph/CheckmarkMIcon');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"checkmark":"select__checkmark_6kgqw","selected":"select__selected_6kgqw","displayIcon":"select__displayIcon_6kgqw","displayBadge":"select__displayBadge_6kgqw"};
require('./index.css');

var Checkmark = function (_a) {
    var _b;
    var selected = _a.selected, className = _a.className;
    return (React__default.default.createElement("div", { className: cn__default.default(styles.checkmark, className, (_b = {},
            _b[styles.selected] = selected,
            _b)) },
        React__default.default.createElement(CheckmarkMIcon.CheckmarkMIcon, { className: styles.displayIcon }),
        React__default.default.createElement(coreComponentsBadge.Badge, { className: styles.displayBadge, view: 'icon', size: 'm', iconColor: 'positive', content: React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, null) })));
};

exports.Checkmark = Checkmark;
