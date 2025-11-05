var React = require('react');
var cn = require('classnames');
var coreComponentsBadge = require('../../../../../badge/cssm');
var CheckmarkCircleMIcon = require('@alfalab/icons-glyph/CheckmarkCircleMIcon');
var CheckmarkMIcon = require('@alfalab/icons-glyph/CheckmarkMIcon');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Checkmark = function (_a) {
    var _b;
    var selected = _a.selected, className = _a.className;
    return (React__default.default.createElement("div", { className: cn__default.default(styles__default.default.checkmark, className, (_b = {},
            _b[styles__default.default.selected] = selected,
            _b)) },
        React__default.default.createElement(CheckmarkMIcon.CheckmarkMIcon, { className: styles__default.default.displayIcon }),
        React__default.default.createElement(coreComponentsBadge.Badge, { className: styles__default.default.displayBadge, view: 'icon', size: 'm', iconColor: 'positive', content: React__default.default.createElement(CheckmarkCircleMIcon.CheckmarkCircleMIcon, null) })));
};

exports.Checkmark = Checkmark;
