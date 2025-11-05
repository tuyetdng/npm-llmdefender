import React from 'react';
import { Typography } from '../../../../typography/modern';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const styles = {"component":"pure-cell__component_9cmgz","categoryName":"pure-cell__categoryName_9cmgz","categoryPercent":"pure-cell__categoryPercent_9cmgz","rightAddon":"pure-cell__rightAddon_9cmgz"};
require('./index.css');

const Category = ({ categoryName, categoryPercent, rightAddons, dataTestId, }) => (React.createElement("div", { className: styles.component, "data-test-id": 'cell-pure-category' },
    React.createElement(Typography.Text, { view: 'primary-small', color: 'secondary', dataTestId: getDataTestId(dataTestId, 'category-name'), className: styles.categoryName }, categoryName),
    categoryPercent !== undefined && (React.createElement(Typography.Text, { tag: 'div', view: 'primary-small', color: 'secondary', className: styles.categoryPercent, dataTestId: getDataTestId(dataTestId, 'category-percent') },
        categoryPercent,
        "%")),
    rightAddons !== undefined && (React.createElement("div", { className: styles.rightAddon, "data-test-id": getDataTestId(dataTestId, 'category-right-addon') }, rightAddons))));

export { Category };
