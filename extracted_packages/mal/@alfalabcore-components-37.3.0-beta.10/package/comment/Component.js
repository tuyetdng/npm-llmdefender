var React = require('react');
var cn = require('classnames');
var coreComponentsTypography = require('../typography');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var cn__default = /*#__PURE__*/_interopDefaultCompat(cn);

var styles = {"component":"comment__component_1z0ix","rowLimit2":"comment__rowLimit2_1z0ix","rowLimit5":"comment__rowLimit5_1z0ix"};
require('./index.css');

var Comment = function (_a) {
    var className = _a.className, dataTestId = _a.dataTestId, children = _a.children, rowLimit = _a.rowLimit;
    var textClassName = rowLimit && styles["rowLimit".concat(rowLimit)];
    return (React__default.default.createElement("div", { className: cn__default.default(styles.component, className), "data-test-id": dataTestId },
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { tag: 'div', view: 'component', className: textClassName, color: 'primary' }, children)));
};

exports.Comment = Comment;
