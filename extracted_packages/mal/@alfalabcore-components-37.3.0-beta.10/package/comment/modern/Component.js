import React from 'react';
import cn from 'classnames';
import { Typography } from '../../typography/modern';

const styles = {"component":"comment__component_1z0ix","rowLimit2":"comment__rowLimit2_1z0ix","rowLimit5":"comment__rowLimit5_1z0ix"};
require('./index.css');

const Comment = ({ className, dataTestId, children, rowLimit }) => {
    const textClassName = rowLimit && styles[`rowLimit${rowLimit}`];
    return (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
        React.createElement(Typography.Text, { tag: 'div', view: 'component', className: textClassName, color: 'primary' }, children)));
};

export { Comment };
