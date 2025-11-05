var React = require('react');
var coreComponentsTypography = require('../../../typography');
var getDataTestId = require('../../getDataTestId-3093bcb2.js');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultCompat(React);

var styles = {"component":"pure-cell__component_9cmgz","categoryName":"pure-cell__categoryName_9cmgz","categoryPercent":"pure-cell__categoryPercent_9cmgz","rightAddon":"pure-cell__rightAddon_9cmgz"};
require('./index.css');

var Category = function (_a) {
    var categoryName = _a.categoryName, categoryPercent = _a.categoryPercent, rightAddons = _a.rightAddons, dataTestId = _a.dataTestId;
    return (React__default.default.createElement("div", { className: styles.component, "data-test-id": 'cell-pure-category' },
        React__default.default.createElement(coreComponentsTypography.Typography.Text, { view: 'primary-small', color: 'secondary', dataTestId: getDataTestId.getDataTestId(dataTestId, 'category-name'), className: styles.categoryName }, categoryName),
        categoryPercent !== undefined && (React__default.default.createElement(coreComponentsTypography.Typography.Text, { tag: 'div', view: 'primary-small', color: 'secondary', className: styles.categoryPercent, dataTestId: getDataTestId.getDataTestId(dataTestId, 'category-percent') },
            categoryPercent,
            "%")),
        rightAddons !== undefined && (React__default.default.createElement("div", { className: styles.rightAddon, "data-test-id": getDataTestId.getDataTestId(dataTestId, 'category-right-addon') }, rightAddons))));
};

exports.Category = Category;
