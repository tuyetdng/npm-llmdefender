import React from 'react';
import cn from 'classnames';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const styles = {"component":"pure-cell__component_1dpzp","top":"pure-cell__top_1dpzp","center":"pure-cell__center_1dpzp","bottom":"pure-cell__bottom_1dpzp"};
require('./index.css');

const Graphics = ({ children, dataTestId, verticalAlign = 'top' }) => (React.createElement("section", { className: cn(styles.component, styles[verticalAlign]), "data-test-id": getDataTestId(dataTestId, 'graphics') }, children));

export { Graphics };
