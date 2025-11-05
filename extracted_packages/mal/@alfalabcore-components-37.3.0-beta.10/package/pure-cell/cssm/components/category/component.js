var React = require('react');
var coreComponentsTypography = require('../../../../typography/cssm');
var getDataTestId = require('../../getDataTestId-5c876d98.js');
var styles = require('./index.module.css');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);
var styles__default = /*#__PURE__*/_interopDefaultCompat(styles);

var Category = function (_a) {
    var categoryName = _a.categoryName, categoryPercent = _a.categoryPercent, rightAddons = _a.rightAddons, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("div", { className: styles__default.default.component, "data-test-id": 'cell-pure-category' },
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-small', color: 'secondary', dataTestId: getDataTestId.getDataTestId(dataTestId, 'category-name'), className: styles__default.default.categoryName }, categoryName),
        categoryPercent !== undefined && (React__default.default.createElement(coreComponentsTypography.Typography.Text, { tag: 'div', view: 'primary-small', color: 'secondary', className: styles__default.default.categoryPercent, dataTestId: getDataTestId.getDataTestId(dataTestId, 'category-percent') },
            categoryPercent,
            "%")),
        rightAddons !== undefined && (React__default.default.createElement("div", { className: styles__default.default.rightAddon, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'category-right-addon') }, rightAddons))));
};

exports.Category = Category;
