var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../typography');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"list-header__component_1ncwd","description":"list-header__description_1ncwd","filled":"list-header__filled_1ncwd"};
require('./index.css');

var ListHeader = function (_a) {
    var _b;
    var title = _a.title, description = _a.description, _c = _a.filled, filled = _c === void 0 ? true : _c, className = _a.className, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("div", { "data-test-id": dataTestId, className: cn__default.default(styles.component, (_b = {}, _b[styles.filled] = filled, _b), className) },
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'secondary-large' }, title),
        description && (React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'secondary-large', className: cn__default.default(styles.description) }, ", ".concat(description)))));
};

exports.ListHeader = ListHeader;
