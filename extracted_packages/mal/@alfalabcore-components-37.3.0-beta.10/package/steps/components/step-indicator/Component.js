var React = require('react');
var cn = require('classnames');
var coreComponentsBadge = require('../../../badge');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"steps__component_u45nl"};
require('./index.css');

var StepIndicator = function (_a) {
    var content = _a.content, iconColor = _a.iconColor, className = _a.className;
    return (React__default.default.createElement(coreComponentsBadge.Badge, { size: 'l', view: 'icon', iconColor: iconColor, className: cn__default.default(styles.component, className), content: content }));
};

exports.StepIndicator = StepIndicator;
