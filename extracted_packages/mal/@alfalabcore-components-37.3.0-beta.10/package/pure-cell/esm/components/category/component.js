import React from 'react';
import { Typography } from '../../../../typography/esm';
import { g as getDataTestId } from '../../getDataTestId-9131c0fb.js';

var styles = {"component":"pure-cell__component_9cmgz","categoryName":"pure-cell__categoryName_9cmgz","categoryPercent":"pure-cell__categoryPercent_9cmgz","rightAddon":"pure-cell__rightAddon_9cmgz"};
require('./index.css');

var Category = function (_a) {
    var categoryName = _a.categoryName, categoryPercent = _a.categoryPercent, rightAddons = _a.rightAddons, dataTestId = _a.dataTestId;
    return (React.createElement("div", { className: styles.component, "data-test-id": 'cell-pure-category' },
        React.createElement(Typography.Text, { view: 'primary-small', color: 'secondary', dataTestId: getDataTestId(dataTestId, 'category-name'), className: styles.categoryName }, categoryName),
        categoryPercent !== undefined && (React.createElement(Typography.Text, { tag: 'div', view: 'primary-small', color: 'secondary', className: styles.categoryPercent, dataTestId: getDataTestId(dataTestId, 'category-percent') },
            categoryPercent,
            "%")),
        rightAddons !== undefined && (React.createElement("div", { className: styles.rightAddon, "data-test-id": getDataTestId(dataTestId, 'category-right-addon') }, rightAddons))));
};

export { Category };
