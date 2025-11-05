import React from 'react';
import cn from 'classnames';

const styles = {"component":"loader__component_1u243","blink":"loader__blink_1u243"};
require('./index.css');

const Loader = ({ className, dataTestId }) => (React.createElement("div", { className: cn(styles.component, className), "data-test-id": dataTestId },
    React.createElement("div", null),
    React.createElement("div", null),
    React.createElement("div", null)));

export { Loader };
