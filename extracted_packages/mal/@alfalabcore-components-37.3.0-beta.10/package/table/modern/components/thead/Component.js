import React from 'react';
import cn from 'classnames';

const styles = {"component":"table__component_5ojpo","row":"table__row_5ojpo"};
require('./index.css');

const THead = ({ className, rowClassName, children, dataTestId, ...restProps }) => (React.createElement("thead", { className: cn(styles.component, className), "data-test-id": dataTestId, ...restProps },
    React.createElement("tr", { className: cn(styles.row, rowClassName) }, children)));

export { THead };
