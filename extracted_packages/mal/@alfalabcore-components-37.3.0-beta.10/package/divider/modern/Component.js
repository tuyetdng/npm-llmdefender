import React from 'react';
import cn from 'classnames';

const styles = {"component":"divider__component_1bs2b"};
require('./index.css');

const Divider = ({ className, dataTestId }) => (React.createElement("hr", { className: cn(styles.component, className), "data-test-id": dataTestId }));

export { Divider };
