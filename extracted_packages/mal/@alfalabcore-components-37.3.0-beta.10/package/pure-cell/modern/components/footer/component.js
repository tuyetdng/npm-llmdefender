import React from 'react';
import cn from 'classnames';
import { g as getDataTestId } from '../../getDataTestId-7d6c8fa8.js';

const styles = {"component":"pure-cell__component_3hz1g","none":"pure-cell__none_3hz1g","default":"pure-cell__default_3hz1g"};
require('./index.css');

const Footer = ({ children, footerPadding = 'default', dataTestId }) => (React.createElement("footer", { className: cn(styles.component, styles[footerPadding]), "data-test-id": getDataTestId(dataTestId, 'footer') }, children));

export { Footer };
