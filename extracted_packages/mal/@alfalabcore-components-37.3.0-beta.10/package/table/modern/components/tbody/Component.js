import React from 'react';
import cn from 'classnames';

const styles = {"component":"table__component_1bpoe"};
require('./index.css');

const TBody = ({ className, children, dataTestId, ...restProps }) => (React.createElement("tbody", { className: cn(styles.component, className), "data-test-id": dataTestId, ...restProps }, children));

export { TBody };
